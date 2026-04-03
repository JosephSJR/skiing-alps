# Debug Evaluator

Diagnose why an evaluator JSON is failing on the platform.

## Instructions

1. **Find the evaluator JSON** — Look in `tasks/<date>/<task-id>/` for the evaluator file for the OS that's failing. Read it.

2. **Run through every check in `docs/troubleshooting.md`** and report PASS/FAIL:

### Automated checks (validate from the JSON):
- [ ] **JSON Format**: Is it wrapped in `[...]`? Is it valid JSON?
- [ ] **Array wrapper**: Even single blocks must be `[{...}]`
- [ ] **func name**: Is `func` exactly `"compare_table"` (or whatever the task specifies)?
- [ ] **result.path**: Does it match the correct OS path pattern? (Ubuntu: `/home/user/`, Windows: `C:\\Users\\Docker\\`, macOS: `/Users/user/`)
- [ ] **result.dest**: Does it NOT have `_Gold` suffix?
- [ ] **expected.dest**: Does it HAVE the `_Gold` suffix?
- [ ] **expected.path**: Is it a CDS URL (starts with `scale-cds://`)? Is it NOT the same as the config's pre_installed_files URL?
- [ ] **sheet_idx0**: Is it a plain integer?
- [ ] **sheet_idx1**: Is it a string in `"EI<n>"` format?
- [ ] **precision**: Is it set to `15`?
- [ ] **Filename match**: Does `result.path` filename match the config's `pre_installed_files` filename?

### Manual checks (flag as MANUAL CHECK NEEDED):
- [ ] **Ground truth re-upload**: Did the user re-upload after redoing the task? CDS URL may have changed.
- [ ] **Sheet index correct**: Is the target sheet at the expected index in the ground truth file?
- [ ] **Postconfig window name**: Is the window name pattern correct for this OS?
- [ ] **Platform workaround**: Has the user tried the paste-generic-then-replace workaround?

### Data validation checks (flag as FAIL if found):
- [ ] **Dropdown language**: Does the prompt say "dropdown"? OSWorld can't verify this — must say "list"
- [ ] **Between operator**: Does the prompt use "between" for decimal/whole-number validation? Must use custom formula instead
- [ ] **Custom formula format**: If using custom formula validation, is the formula exact and deterministic?

3. **Cross-reference the config JSON** — Read the matching config file. Verify:
   - The filename in `result.path` matches `pre_installed_files[0].path`
   - The CDS URL in `expected.path` is DIFFERENT from `pre_installed_files[0].url`

4. **Report results** as a checklist with PASS/FAIL/MANUAL CHECK NEEDED for each item.

5. **Ask the user** for the exact error message if they haven't provided it. Different errors point to different causes:
   - "Unrecognized sheet index" → wrong `sheet_idx0` or `sheet_idx1` format
   - "Failed to run verifier" → usually JSON format, path, or ground truth issue
   - "Error processing cell" → sheet index exists but data doesn't match expectations

$ARGUMENTS
