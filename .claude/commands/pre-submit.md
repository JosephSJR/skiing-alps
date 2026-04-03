# Pre-Submission Audit

Run the final checklist before submitting task JSONs.

## Instructions

Run every check in `docs/checklist.md` against the task's config and evaluator JSONs.

### Checklist categories:

1. **Prompt quality**
   - No ambiguity
   - No HOW instructions (only WHAT)
   - Self-contained and grounded

2. **Config completeness**
   - All feasible OSes have configs
   - Paths use correct OS format
   - Postconfig commands are valid for the OS shell
   - Pre-installed files have valid CDS URLs (no placeholders)

3. **Evaluator completeness**
   - All feasible OSes have evaluators
   - Every subproblem has at least one comparator
   - All CDS URLs are real (no placeholders)
   - Scoring weights sum to 1.0
   - Comparators use correct OS-specific paths

4. **Cross-OS consistency**
   - Run the cross-OS check (same as `/cross-os`)

5. **Team rules compliance** (from `docs/team-rules.md`)
   - Prompt does NOT say "no commas" for spreadsheet numbers (should say "plain numbers")
   - If rounding is involved, prompt mentions "trailing zeros are acceptable" or "exact precision of X decimal places"
   - No freeze row/pane requirements remain in the prompt
   - If doc has paragraphs + tables, interleave language is present
   - No chart creation tasks (should have been flagged infeasible)
   - No live/changing data sources (should have been flagged infeasible)
   - No "dropdown" language in prompts (should say "list with values X, Y, Z")
   - No decimal/whole-number "between" validations (should use custom formula validations like `=AND(cell>=min,cell<=max)`)
   - Data validation prompts use exact custom formula strings that the evaluator can match
   - All `compare_docx_files` comparators have `delete_empty_lines: true` when using `ignore_blanks: false`
   - All `sheet_data` comparators have `precision: 15`

6. **Final validation**
   - JSONs are valid (parseable)
   - No duplicate keys
   - No empty arrays or objects that should have content

### Output:
```
Pre-Submission Audit:
  ✅ Prompt quality
  ✅ Config completeness (3/3 OSes)
  ❌ Evaluator completeness — [issue]
  ✅ Cross-OS consistency
  ✅ JSON validation

Status: READY / NOT READY
Issues to fix:
  1. [issue]
```

If all checks pass, copy final JSONs to `output/<task-id>/`.

$ARGUMENTS
