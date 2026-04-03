# Skiing Alps Task Automation Skill

## Overview
This skill automates the repetitive parts of Skiing Alps (Outlier/Remotasks) attempter tasks. It handles prompt rewriting, subproblem generation, evaluator JSON creation, cross-OS config generation, and pre-submission validation.

## What This Skill Automates
1. **Prompt Rewriting** — Takes skeleton prompt → produces natural, deterministic, verifiable prompt
2. **Subproblem Generation** — Breaks prompt into verifiable goals (not UI steps)
3. **Complexity Assignment** — 2-3=Medium, 4-5=Hard, 6+=Very Hard
4. **Evaluator JSON Generation** — For all 3 OSes with correct paths, window names, options
5. **Cross-OS Config Generation** — Correct paths, initializers, window names per OS
6. **Ground Truth Document Creation** — Generates .docx/.pptx/.xlsx content programmatically
7. **Pre-Submission Checklist Validation** — Catches common mistakes before submit

## What Must Be Done Manually in the VM
- Launching the VM and verifying file content
- Saving ground truth files (Ctrl+S / Cmd+S)
- Transferring files in/out of VM
- Uploading to Asset Upload and copying CDS URLs
- Running the Execute Verifier button

## Usage
```bash
# Start a new task
claude "New skiing alps task. Skeleton: [paste skeleton]. App: [pptx/docx/xlsx]. Starting file: [yes/no]"

# Generate evaluator for specific OS
claude "Generate evaluator JSON for Windows. CDS URL: [url]. Filename: [name]"

# Run pre-submission checklist
claude "Run pre-submission checklist for task in ./tasks/task-001/"
```
