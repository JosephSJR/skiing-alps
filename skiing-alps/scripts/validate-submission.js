#!/usr/bin/env node
/**
 * Pre-Submission Checklist Validator
 * 
 * Usage: node validate-submission.js ./tasks/task-001/
 * 
 * Reads task files and checks for common mistakes.
 */

const fs = require('fs');
const path = require('path');

const taskDir = process.argv[2] || '.';

let errors = [];
let warnings = [];

function check(condition, message, severity = 'error') {
  if (!condition) {
    if (severity === 'error') errors.push(`❌ ${message}`);
    else warnings.push(`⚠️ ${message}`);
  }
}

// Check if evaluator files exist
const osConfigs = ['windows', 'ubuntu', 'macos'];

for (const os of osConfigs) {
  const evalFile = path.join(taskDir, `evaluator-${os}.json`);
  
  if (!fs.existsSync(evalFile)) {
    warnings.push(`⚠️ Missing evaluator file: evaluator-${os}.json`);
    continue;
  }

  const evaluator = JSON.parse(fs.readFileSync(evalFile, 'utf-8'));

  // Check expected.path
  check(
    evaluator.expected?.path && !evaluator.expected.path.includes('PASTE'),
    `[${os}] expected.path is missing or placeholder`
  );

  // Check expected.dest has _Gold suffix
  check(
    evaluator.expected?.dest?.includes('_Gold'),
    `[${os}] expected.dest missing _Gold suffix: ${evaluator.expected?.dest}`
  );

  // Check result.dest does NOT have _Gold suffix
  check(
    evaluator.result?.dest && !evaluator.result.dest.includes('_Gold'),
    `[${os}] result.dest should NOT have _Gold suffix: ${evaluator.result?.dest}`
  );

  // Check expected.path is not the starting file URL
  const notesFile = path.join(taskDir, 'notes.md');
  if (fs.existsSync(notesFile)) {
    const notes = fs.readFileSync(notesFile, 'utf-8');
    const cdsMatch = notes.match(/CDS file URL:\s*(.+)/);
    if (cdsMatch && evaluator.expected?.path === cdsMatch[1].trim()) {
      errors.push(`❌ [${os}] expected.path is the STARTING file URL, not the ground truth URL!`);
    }
  }

  // Check options
  if (evaluator.options) {
    const optionCount = Object.keys(evaluator.options).length;
    if (optionCount > 5) {
      warnings.push(`⚠️ [${os}] ${optionCount} options enabled — are you over-enabling?`);
    }
  }

  // Check ignore_blanks
  if (evaluator.options?.ignore_blanks === true) {
    warnings.push(`⚠️ [${os}] ignore_blanks=true — set to false if prompt adds/removes paragraphs`);
  }

  // Check different CDS URLs per OS
  for (const otherOs of osConfigs) {
    if (otherOs === os) continue;
    const otherFile = path.join(taskDir, `evaluator-${otherOs}.json`);
    if (fs.existsSync(otherFile)) {
      const otherEval = JSON.parse(fs.readFileSync(otherFile, 'utf-8'));
      if (evaluator.expected?.path === otherEval.expected?.path) {
        errors.push(`❌ [${os}] and [${otherOs}] share the same expected.path CDS URL!`);
      }
    }
  }
}

// Check notes.md for prompt_changes_made
const notesFile = path.join(taskDir, 'notes.md');
if (fs.existsSync(notesFile)) {
  const notes = fs.readFileSync(notesFile, 'utf-8');
  
  const changesMatch = notes.match(/Prompt Changes Made[\s\S]*?```\n([\s\S]*?)```/);
  if (changesMatch) {
    const changes = changesMatch[1].trim();
    check(changes.length >= 50, `prompt_changes_made is only ${changes.length} chars (need 50+)`);
    check(!changes.includes('Just minor tweaks'), 'prompt_changes_made is too vague');
    check(!changes.match(/^.{1,20}$/), 'prompt_changes_made is too short');
  }
}

// Print results
console.log('=== PRE-SUBMISSION VALIDATION ===\n');

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ All checks passed!\n');
} else {
  if (errors.length > 0) {
    console.log('ERRORS (must fix):');
    errors.forEach(e => console.log(`  ${e}`));
    console.log('');
  }
  if (warnings.length > 0) {
    console.log('WARNINGS (review):');
    warnings.forEach(w => console.log(`  ${w}`));
    console.log('');
  }
}

console.log(`Errors: ${errors.length} | Warnings: ${warnings.length}`);
process.exit(errors.length > 0 ? 1 : 0);
