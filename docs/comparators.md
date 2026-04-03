# Comparator Reference

Complete list of available comparators for evaluator JSONs.

---

## compare_table (Spreadsheets)

The primary comparator for spreadsheet tasks. Uses a **rules-based system** where you pass an array of rule objects in `options.rules`.

### Evaluator JSON Structure

```json
[
  {
    "type": "single",
    "postconfig": "<OS_SPECIFIC_POSTCONFIG>",
    "result": {
      "type": "vm_file",
      "path": "<OS_PATH>/<filename>",
      "dest": "<filename>"
    },
    "expected": {
      "type": "cloud",
      "path": "<GROUND_TRUTH_CDS_URL>",
      "dest": "<name_no_ext>_Gold.<ext>"
    },
    "func": "compare_table",
    "options": {
      "rules": [
        { "type": "sheet_data", "sheet_idx0": 0, "sheet_idx1": "EI0", "precision": 10 }
      ]
    }
  }
]
```

### Rule Types

| Rule Type | What It Checks | Key Parameters |
|-----------|---------------|----------------|
| `sheet_name` | Sheet names match in order | none |
| `sheet_data` | Cell values (numeric + text) | `sheet_idx0`, `sheet_idx1`, `precision` |
| `sheet_print` | Printed text representation | `sheet_idx0`, `sheet_idx1`, `ignore_case` |
| `sheet_fuzzy` | Range-based fuzzy matching | `rules` array with `includes`/`exact_match`/`fuzzy_match` |
| `style` | Cell formatting | `sheet_idx0`, `sheet_idx1`, `props` array |
| `freeze` | Freeze pane settings | `sheet_idx0`, `sheet_idx1` |
| `zoom` | Sheet zoom level | `sheet_idx`, `method`, `ref` |
| `data_validation` | Data validation rules | `sheet_idx`, `dv_props` |
| `row_props` / `col_props` | Row height, column width | none |
| `filter` | Filter ranges and sort order | none |
| `pivot_table` | Pivot table definitions | none |
| `chart` | Chart title, legend, type, axes | `chart_props` array |
| `check_cell` | Specific cell value/style | coordinate-based matching |

### Rule Details

#### `sheet_name`
Checks that sheet names match in the same order. No extra params.
```json
{ "type": "sheet_name" }
```

#### `sheet_data`
Checks cell values (numeric + text). **Always set `precision: 10`** (team rule — tightest numeric comparison).
- `sheet_idx0`: integer — the sheet index in the result file (0-based)
- `sheet_idx1`: string — the sheet index in the expected/gold file, prefixed with "EI" (e.g., "EI0", "EI1")
- `precision`: integer — decimal precision for numeric comparison. **Always 10.**
```json
{ "type": "sheet_data", "sheet_idx0": 0, "sheet_idx1": "EI0", "precision": 10 }
```

#### `sheet_print`
Checks printed text representation.
- `sheet_idx0`, `sheet_idx1`: same as sheet_data
- `ignore_case`: boolean
```json
{ "type": "sheet_print", "sheet_idx0": 0, "sheet_idx1": "EI0", "ignore_case": false }
```

#### `sheet_fuzzy`
Range-based fuzzy cell matching.
- `rules`: array with `includes`/`exact_match`/`fuzzy_match`
```json
{ "type": "sheet_fuzzy", "rules": [...] }
```

#### `style`
Checks cell formatting. Available `props`: `number_format`, `font_name`, `font_color`, `font_bold`, `font_italic`, `font_underline`, `font_size`, `fill_type`, `bgcolor`, `fgcolor`, `hyperlink`, `merge`.
```json
{ "type": "style", "sheet_idx0": 0, "sheet_idx1": "EI0", "props": ["bgcolor", "font_bold"] }
```

#### `freeze`
Checks freeze pane settings. **NOTE: Team rules say remove freeze requirements from prompts — evaluators are faulty with this check.**
```json
{ "type": "freeze", "sheet_idx0": 0, "sheet_idx1": "EI0" }
```

#### `zoom`
Checks sheet zoom level.
```json
{ "type": "zoom", "sheet_idx": 0, "method": "exact", "ref": 100 }
```

#### `data_validation`
Checks data validation rules.
```json
{ "type": "data_validation", "sheet_idx": 0, "dv_props": [...] }
```

**OSWorld Limitations (CRITICAL):**
- **Cannot verify "dropdown" rendering** — openpyxl's `showDropDown` attribute is INVERTED (true = HIDE dropdown, an OOXML quirk). Never use the word "dropdown" in prompts; just describe allowed values as a list.
- **Cannot distinguish "between" vs "not between" operators** — The `operator` attribute check is unreliable in production OSWorld. This means "between 0 and 20" and "not between 0 and 20" are indistinguishable, leading to false positives.
- **Fix for range validations:** Replace all decimal/whole-number "between" validations with **custom formula** validations. Use exact formulas the evaluator can match deterministically:
  - Decimal range: `=AND(B6>=0,B6<=20)` instead of "decimal between 0 and 20"
  - Whole number range: `=AND(B8>=7,B8<=206,B8=INT(B8))` instead of "whole number between 7 and 206"
  - Decimal with precision: `=AND(B7>=0,B7<=25,B7=ROUND(B7,2))` for "decimal between 0-25 with 2 decimal places"
- **Lists are safe** — "list" type validations with inline comma-separated values CAN be verified reliably via `type: "list"` + `formula1` match.
- **Error/input messages are safe** — `errorTitle`, `error`, `errorStyle`, `promptTitle`, `prompt`, `showErrorMessage`, `showInputMessage` all work reliably.

**Evaluator `dv_props` format** (each entry is a dict of attribute rules):
```json
{
  "type": "data_validation",
  "sheet_idx": 0,
  "dv_props": [
    {
      "type": {"method": "eq", "ref": "list"},
      "formula1": {"method": "eq", "ref": "\"2024,2025,2026,2027,2028\""},
      "ranges": {"method": "eq", "ref": "B3"}
    },
    {
      "type": {"method": "eq", "ref": "custom"},
      "formula1": {"method": "eq", "ref": "AND(B6>=0,B6<=20)"},
      "showErrorMessage": {"method": "eq", "ref": true},
      "errorTitle": {"method": "eq", "ref": "Invalid yield"},
      "error": {"method": "eq", "ref": "Enter 0–20 only"},
      "errorStyle": {"method": "eq", "ref": "stop"}
    }
  ]
}
```
See `docs/osworld-evaluator-source.md` for full attribute list and matching methods.

#### `row_props` / `col_props`
Checks row height / column width. No extra params.
```json
{ "type": "row_props" }
{ "type": "col_props" }
```

#### `filter`
Checks filter ranges and sort order. No extra params.
```json
{ "type": "filter" }
```

#### `pivot_table`
Checks pivot table definitions. No extra params.
```json
{ "type": "pivot_table" }
```

#### `chart`
Checks chart structure (title, legend, type, axis titles). **NOTE: Team rules say chart CREATION tasks are infeasible — skip and flag.**
```json
{ "type": "chart", "chart_props": [...] }
```

#### `check_cell`
Checks specific cell value/style by coordinate.
```json
{ "type": "check_cell" }
```

### Common Patterns

**Cell data only (most common):**
```json
"rules": [{ "type": "sheet_data", "sheet_idx0": 0, "sheet_idx1": "EI0", "precision": 10 }]
```

**Cell data + background color:**
```json
"rules": [
  { "type": "sheet_data", "sheet_idx0": 0, "sheet_idx1": "EI0", "precision": 10 },
  { "type": "style", "sheet_idx0": 0, "sheet_idx1": "EI0", "props": ["bgcolor"] }
]
```

**Cell data + full formatting:**
```json
"rules": [
  { "type": "sheet_data", "sheet_idx0": 0, "sheet_idx1": "EI0", "precision": 10 },
  { "type": "style", "sheet_idx0": 0, "sheet_idx1": "EI0", "props": ["font_bold", "font_size", "bgcolor", "number_format"] }
]
```

**Multiple sheets:**
```json
"rules": [
  { "type": "sheet_name" },
  { "type": "sheet_data", "sheet_idx0": 0, "sheet_idx1": "EI0", "precision": 10 },
  { "type": "sheet_data", "sheet_idx0": 1, "sheet_idx1": "EI1", "precision": 10 }
]
```

### Important Notes for Spreadsheet Tasks

**For tasks creating spreadsheets from scratch:**
- Do NOT use the style check — use `sheet_data` only
- Never use "float" or "integer" in prompts — always say "number"
- For date/number formatting, use either: "Ensure dates are written as text strings in MM/DD/YYYY" or "Format dates as date values displayed as MM/DD/YYYY"

**For tasks editing existing spreadsheets:**
- You may include style check, but ONLY if every new/edited field has explicit data type and format enforcement in the prompt
- If any field is missing format enforcement, skip the style check

**macOS Numbers notes:**
- Numbers uses different default formats from Excel — specify exact format strings
- Golden file must be created in Numbers on Mac VM and exported as .xlsx
- Numbers doesn't support all Excel chart types — if unavailable, mark infeasible or switch to Excel for Mac

---

## compare_docx_files (Document Paragraphs)

Checks paragraph content and order in Word/docx files.

```json
{
  "type": "compare_docx_files",
  "path": "<FILE_PATH>",
  "ground_truth_url": "<CDS_URL>",
  "ignore_blanks": false,
  "delete_empty_lines": true
}
```

**Note:** Always pair `ignore_blanks: false` with `delete_empty_lines: true` to prevent failures from extra whitespace (see `docs/team-rules.md`). Use `ignore_blanks: true` only when paragraph order doesn't matter.

---

## compare_docx_tables (Document Tables)

Checks table content and order in Word/docx files.

```json
{
  "type": "compare_docx_tables",
  "path": "<FILE_PATH>",
  "ground_truth_url": "<CDS_URL>"
}
```

**Note:** Use alongside `compare_docx_files` when a document has both paragraphs and tables. These check order independently — cannot verify relative order of tables vs paragraphs.

---

## file_exists

Checks that a file exists at the specified path.

```json
{
  "type": "file_exists",
  "path": "/Users/user/Desktop/output.txt"
}
```

**Use when**: You just need to verify a file was created, regardless of content.

---

## exact_match

Byte-for-byte comparison of a file against ground truth.

```json
{
  "type": "exact_match",
  "path": "/Users/user/Desktop/output.txt",
  "ground_truth_url": "https://cds.example.com/files/abc123"
}
```

**Use when**: The file content must be identical to ground truth (text files, CSVs).

---

## text_contains

Checks that a file contains a specific string.

```json
{
  "type": "text_contains",
  "path": "/Users/user/Desktop/notes.txt",
  "expected_text": "Meeting scheduled for Monday",
  "case_sensitive": true
}
```

**Parameters**:
- `expected_text`: The string to search for
- `case_sensitive`: (optional, default true)

**Use when**: Partial content match is sufficient (e.g., checking a paragraph was added).

---

## image_similarity

Visual comparison of an image/screenshot against ground truth.

```json
{
  "type": "image_similarity",
  "path": "/Users/user/Desktop/chart.png",
  "ground_truth_url": "https://cds.example.com/files/def456",
  "threshold": 0.85
}
```

**Parameters**:
- `threshold`: Minimum similarity score (0.0 to 1.0). Recommended: 0.85+

**Use when**: Visual appearance matters (charts, formatted documents, UI elements).

---

## command_output

Runs a shell command and checks its output.

```json
{
  "type": "command_output",
  "command": "cat /Users/user/Desktop/output.txt | wc -l",
  "expected_output": "10",
  "comparison": "exact"
}
```

**Parameters**:
- `command`: Shell command to execute
- `expected_output`: Expected stdout
- `comparison`: "exact", "contains", or "regex"

**Use when**: The result is best verified programmatically (line counts, file permissions, installed packages).

---

## fuzzy_match

Content comparison with tolerance for minor differences.

```json
{
  "type": "fuzzy_match",
  "path": "/Users/user/Desktop/essay.txt",
  "ground_truth_url": "https://cds.example.com/files/ghi789",
  "threshold": 0.90
}
```

**Parameters**:
- `threshold`: Minimum similarity (0.0 to 1.0)

**Use when**: Content should be similar but minor formatting differences are acceptable.

---

## Comparator Selection Priority

Use the **most specific** comparator available:

1. `compare_table` — for spreadsheet tasks (rules-based, most comprehensive)
2. `compare_docx_files` / `compare_docx_tables` — for Word document tasks
3. `exact_match` — for files that must match exactly
4. `text_contains` — for partial text verification
5. `command_output` — for programmatic checks
6. `image_similarity` — for visual checks
7. `fuzzy_match` — when exact match is too strict
8. `file_exists` — only when existence is all that matters
