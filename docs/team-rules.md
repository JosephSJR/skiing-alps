# Team Rules

Hard-won rules from production experience. These override defaults when there's a conflict.

---

## Spreadsheet Rules

### Numbers Formatting
When the prompt involves numbers in spreadsheets, say values should be entered as "plain numbers" or just "numbers". **NEVER** say "no commas" — this causes issues on Ubuntu.

### Rounding / Precision
When a task involves rounding, the prompt **MUST** state "trailing zeros are acceptable" or rephrase as "have the values at an exact precision of X decimal places". This is mandatory.

### sheet_data Precision
For every evaluator that uses `sheet_data`, set `precision: 15`. Always.

### Chart Creation
If a task requests creating charts in spreadsheets, **skip it and flag as infeasible**. Charts cannot be reliably evaluated.

### Freeze Row / Pane
If a task asks to freeze a row or pane, **remove this requirement from the prompt**. The evaluators are faulty with this check.

---

## Document Rules (Word / LibreOffice Writer)

### Paragraph-to-Paragraph Checks
When checking document content paragraph by paragraph, the evaluator **MUST** use `ignore_blanks: false` AND `delete_empty_lines: true`. The `delete_empty_lines` prevents failures from extra whitespace between paragraphs. If paragraph order doesn't matter, use `ignore_blanks: true`.

### Documents with BOTH Paragraphs AND Tables
The evaluator can check paragraph order (`compare_docx_files`) and table order (`compare_docx_tables`) independently, but **CANNOT** check the order of tables relative to paragraphs. When a prompt involves both, append language like: "Maintain the original sequence of paragraphs and the original sequence of tables. However, you may interleave the two groups in any order." Make sure this still sounds natural. If a table had a title paragraph, modify the prompt to make that title the first row of the table, or delete the title.

---

## Data Validation Rules (OSWorld Limitations)

### No "Dropdown" Language
OSWorld cannot verify whether a data validation renders as a dropdown widget — it can only check the validation type is "list" with specific values. **NEVER** use the word "dropdown" in prompts. Instead say "a list with values X, Y, Z" or "the allowed values must be X, Y, Z".

### No "Between" Range Validations
OSWorld cannot distinguish "between" from "not between" operators for decimal or whole-number validations. This leads to false positives. **Replace all between-range validations with custom formula validations:**
- Decimal range: Prompt says "use a custom formula validation `=AND(B6>=0,B6<=20)`" instead of "decimal between 0 and 20"
- Whole number range: `=AND(B8>=7,B8<=206,B8=INT(B8))` instead of "whole number between 7 and 206"
- Decimal with precision: `=AND(B7>=0,B7<=25,B7=ROUND(B7,2))` for range + decimal place enforcement

### List Validations Are Safe
Inline list validations (comma-separated values, not named ranges) CAN be verified reliably. Use these freely.

---

## Style Checking Rules

### bgcolor Requires Full Specification
When using `bgcolor` in style evaluators, you must define colors for ALL cells being checked — including cells that should have no fill. Always specify hex codes in the prompt (not color names or the color picker checkbox). LibreOffice checks color differently depending on how it was added.

### Never Use font_color or fgcolor
`font_color` causes the Ubuntu verifier to completely fail. `fgcolor` has extreme confusion with bgcolor in conditional formatting. Both are deprecated.

### Never Use sheet_fuzzy or fuzzy_match
These produce false positives. `sheet_fuzzy` artificially inflates RapidFuzz scores by stripping characters. `fuzzy_match` for docx is affected by hidden control characters across OSes.

### Pivot Tables Pass Without Data
The pivot_table comparator will pass even if both files have no pivot tables. Always combine with `sheet_data` to verify the pivot output values exist.

---

## Data Feasibility

### Changing Data Sources
Double check that tasks are based on historical data or data that will **NOT** change in the future. If the source data changes constantly (live stock prices, weather, etc.), the task is infeasible — either alter it to use a static snapshot or mark as infeasible.

---

## Where These Rules Apply

| Rule | Applied In |
|------|-----------|
| Numbers formatting ("plain numbers") | `/prompt-rewrite` |
| Rounding / trailing zeros | `/prompt-rewrite` |
| Freeze row removal | `/prompt-rewrite` |
| Paragraph + table interleave language | `/prompt-rewrite` |
| Chart creation → infeasible | `/feasibility` |
| Changing data sources → infeasible | `/feasibility` |
| No "dropdown" language | `/prompt-rewrite`, `/feasibility` |
| Between → custom formula | `/prompt-rewrite`, `/feasibility` |
| List validations (inline, safe) | `/evaluator-gen` |
| `delete_empty_lines: true` for docx | `/evaluator-gen`, `templates/evaluator.md` |
| `precision: 15` for sheet_data | `/evaluator-gen`, `templates/evaluator.md` |
| Paragraph + table dual comparators | `/evaluator-gen` |
| bgcolor requires full hex specification | `/prompt-rewrite`, `/evaluator-gen` |
| Never use font_color, fgcolor, sheet_fuzzy, fuzzy_match | `/evaluator-gen`, `/pre-submit` |
| Pivot tables need sheet_data backup | `/evaluator-gen` |
| All of the above | `/pre-submit` (verification) |
