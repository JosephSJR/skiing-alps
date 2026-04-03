# "Failed to run verifier" — Diagnostic Checklist

Run through these in order. The first one that fails is usually your problem.

## 1. JSON Format
- Is the evaluator wrapped in an array `[...]`? Even a single evaluator block must be `[{...}]` not `{...}`
- Is the JSON valid? No trailing commas, no comments, all strings double-quoted
- Paste it into a JSON validator (jsonlint.com) to be sure

## 2. Postconfig
- Is the `window_name` exactly right for this OS?
  - Ubuntu: `filename.xlsx - LibreOffice Calc`
  - Windows: `filename - Excel` (no extension)
  - macOS: `filename.xlsx` (just the filename with extension)
- Is the postconfig using the right save shortcut? (`ctrl+s` on Ubuntu/Windows, `command+s` on macOS)
- For Windows: is `pygetwindow` being used? The standard `activate_window` often fails
- For macOS: is the `osascript` workaround being used? Standard `activate_window` doesn't work on Mac

## 3. File Paths
- Does `result.path` use the correct OS pattern?
  - Ubuntu: `/home/user/Desktop/filename.ext`
  - Windows: `C:\\Users\\User\\Desktop\\filename.ext` (double backslashes in JSON, user is User)
  - macOS: `/Users/user/Desktop/filename.ext`
- Does the filename in `result.path` match exactly what the config downloaded?

## 4. Ground Truth
- Is `expected.path` the CDS URL from your UPLOADED ground truth (after VM work)?
- Is it definitely NOT the starting file URL from the config?
- Did you re-upload after redoing the task? If so, the CDS URL changed — use the new one
- Does `expected.dest` have the `_Gold` suffix?
- Does `result.dest` NOT have the `_Gold` suffix?

## 5. compare_table Specific
- Is `sheet_idx1` using the `"EI<n>"` string format? (e.g., `"EI0"` for first sheet, `"EI1"` for second)
- Is `sheet_idx0` a plain integer? (e.g., `0` for first sheet)
- Is `precision` set to `15`?
- Are you targeting the correct sheet index? If you added/removed/reordered sheets in the ground truth, the index may have changed
- If using `style` rules, did you only include props that your prompt explicitly asks for?

## 6. Comparator Function Name
- Is the `func` value exactly `"compare_table"`? (not `compare_tables`, not `compare_xlsx`, not `cell_value_match`)
- Does it match what the platform suggested in the Verifier Function field?

## 7. Platform Workaround
- Remember the known issue: the evaluator step sometimes comes before the upload step
- If you're stuck, use the workaround: paste generic template JSONs → go to upload step → upload ground truth → copy CDS URL → go BACK to evaluator step → paste real JSONs with the correct URL → run

## Quick Reference — Window Names by OS

| OS | Window Name Pattern |
|---|---|
| Ubuntu | `filename.xlsx - LibreOffice Calc` |
| Windows | `filename - Excel` (no extension) |
| macOS | `filename.xlsx` (just filename with ext) |

## 8. Data Validation Issues
- Does the prompt say "dropdown"? OSWorld CANNOT verify dropdown rendering — it can only check "list" type. Rewrite prompt to say "list with values X, Y, Z"
- Does the prompt use "between" for decimal/whole-number range? OSWorld CANNOT distinguish "between" from "not between" operators — leads to false positives. Replace with custom formula validation: `=AND(cell>=min,cell<=max)`
- For whole numbers, add `INT()`: `=AND(B8>=7,B8<=206,B8=INT(B8))`
- For decimal precision, add `ROUND()`: `=AND(B7>=0,B7<=25,B7=ROUND(B7,2))`
- List validations with inline comma-separated values ARE safe and verifiable

## Quick Reference — Path Patterns

| OS | User | Desktop Path |
|---|---|---|
| Ubuntu | `user` | `/home/user/Desktop/` |
| Windows | `User` | `C:\\Users\\User\\Desktop\\` |
| macOS | `user` | `/Users/user/Desktop/` |
