# OSWorld Evaluator — Source Code Reference

Derived from reading the OSWorld source at `osworld-ref/desktop_env/evaluators/metrics/`.

---

## data_validation (table.py, lines 573-621)

The evaluator reads `sheet.data_validations.dataValidation` via openpyxl, then for each validation object checks if it matches ANY entry in `dv_props` using `_match_value_to_rule`.

### Available attributes to check

These are the openpyxl `DataValidation` object attributes:

| Attribute | Type | What it is |
|-----------|------|------------|
| `ranges` | MultiCellRange | Which cells the validation applies to (e.g., "B3") |
| `type` | str | Validation type: "list", "whole", "decimal", "date", "time", "textLength", "custom" |
| `formula1` | str | First formula/value (e.g., list items "2024,2025,2026" or custom formula) |
| `formula2` | str | Second formula/value (upper bound for between/notBetween) |
| `operator` | str | Operator: "between", "notBetween", "equal", "notEqual", "greaterThan", etc. |
| `allowBlank` | bool | Whether blank values are allowed |
| `showDropDown` | bool | **INVERTED in openpyxl!** `showDropDown=True` HIDES the dropdown. This is a known openpyxl/OOXML quirk. |
| `showInputMessage` | bool | Show input prompt when cell is selected |
| `showErrorMessage` | bool | Show error alert on invalid input |
| `error` | str | Error alert message text |
| `errorTitle` | str | Error alert title |
| `errorStyle` | str | Error style: "stop", "warning", "information" |
| `prompt` | str | Input message text |
| `promptTitle` | str | Input message title |
| `imeMode` | str | IME mode |

### Matching logic

The evaluator iterates all validations on the sheet. For each validation, it checks if it matches ANY `dv_props` entry. A `dv_props` entry matches if ALL of its attribute rules pass `_match_value_to_rule`.

**Important:** The logic is `len(data_validators) >= len(dv_props)` AND every validator must match at least one prop. This means:
- Extra validations on the sheet are OK
- But every validator must match something in dv_props

### _match_value_to_rule methods (utils.py, lines 712-765)

| Method | What it does | Example |
|--------|-------------|---------|
| `eq` | Exact equality | `{"method": "eq", "ref": "list"}` |
| `ne` | Not equal | `{"method": "ne", "ref": ""}` |
| `le`, `lt`, `ge`, `gt` | Comparison operators | `{"method": "ge", "ref": 0}` |
| `re` | Regex match | `{"method": "re", "ref": "2024.*2028"}` |
| `re.IGNORECASE` | Case-insensitive regex | `{"method": "re.IGNORECASE", "ref": "jan"}` |
| `approx:N` | Within threshold N | `{"method": "approx:0.01", "ref": 3.14}` |
| `str_list_eq` | Compare comma-separated list | `{"method": "str_list_eq", "ref": ["2024","2025"]}` |
| `str_set_eq` | Compare as set (unordered) | `{"method": "str_set_eq", "ref": ["A","B"]}` |
| `range.XX` | Range check (e.g., `range.ee` for `<=` both) | `{"method": "range.ee", "ref": [0, 20]}` |

### Key limitations confirmed by source code

1. **`showDropDown` is INVERTED** — openpyxl reads the OOXML `showDropDown` flag, which is `true` to HIDE the dropdown (counterintuitive). This makes checking for "is a dropdown" unreliable.

2. **`operator` CAN be checked** — The source does support checking `operator` via `_match_value_to_rule`. However, the reviewer says this doesn't work properly in practice on the OSWorld platform. The source supports `eq` matching on `operator`, but in production the operator check is unreliable.

3. **`formula1` is the best check for lists** — For list validations, `formula1` contains the comma-separated values (e.g., `"2024,2025,2026,2027,2028"`). Use `str_list_eq` or `eq` to match.

4. **`type` + `formula1` is the reliable combo** — Check `type` equals `"list"` or `"custom"` AND `formula1` matches the expected values/formula.

### Recommended evaluator patterns

#### List validation (reliable)
```json
{
  "type": {"method": "eq", "ref": "list"},
  "formula1": {"method": "eq", "ref": "\"2024,2025,2026,2027,2028\""},
  "ranges": {"method": "eq", "ref": "B3"}
}
```

**Note on formula1 quoting:** For inline lists, openpyxl may or may not include surrounding quotes. Test with both `"\"2024,2025\"" ` and `"2024,2025"`. The `str_list_eq` method may be more robust.

#### Custom formula validation (reliable)
```json
{
  "type": {"method": "eq", "ref": "custom"},
  "formula1": {"method": "eq", "ref": "AND(B6>=0,B6<=20)"},
  "ranges": {"method": "eq", "ref": "B6"}
}
```

#### Error alert check (reliable)
```json
{
  "showErrorMessage": {"method": "eq", "ref": true},
  "errorTitle": {"method": "eq", "ref": "Invalid yield"},
  "error": {"method": "eq", "ref": "Enter 0–20 only"},
  "errorStyle": {"method": "eq", "ref": "stop"}
}
```

#### Input message check (reliable)
```json
{
  "showInputMessage": {"method": "eq", "ref": true},
  "promptTitle": {"method": "eq", "ref": "Row to inspect"},
  "prompt": {"method": "eq", "ref": "Use 7–206 only"}
}
```

---

## compare_docx_files (docs.py, lines 159-280)

### Options
| Option | Default | What it does |
|--------|---------|-------------|
| `ignore_blanks` | `true` | If true, joins all paragraphs and compares as one string |
| `ignore_case` | `false` | Case-insensitive comparison |
| `ignore_order` | `false` | Sort paragraphs before comparing |
| `content_only` | `false` | Fuzzy ratio of concatenated text |
| `fuzzy_match` | `false` | Use fuzzy matching instead of exact |
| `delete_empty_lines` | `false` | Remove empty paragraphs before comparing |

### Key behavior
- When `ignore_blanks=false`: compares paragraph-by-paragraph, lengths must match exactly
- When `delete_empty_lines=true`: strips empty paragraphs first (prevents whitespace failures)
- **Tables are NOT included** in paragraph comparison — they're separate objects in python-docx

## compare_docx_tables (docs.py, lines 307-337)

- Compares table count, then row/column count, then cell text (`.strip()`)
- **No options** — just exact match on cell text
- Cannot check relative position of tables vs paragraphs

---

## compare_table rules summary (table.py)

| Rule type | Compares against | Notes |
|-----------|-----------------|-------|
| `sheet_name` | expected file | Sheet names must match in order |
| `sheet_data` | expected file | Cell values via pandas, with precision rounding |
| `sheet_print` | expected file | Printed text (CSV export) comparison |
| `sheet_fuzzy` | expected file | Range-based fuzzy matching |
| `style` | expected file | Cell formatting (font, color, etc.) |
| `freeze` | expected file | Freeze pane settings (uses xSplit/ySplit, not topLeftCell) |
| `zoom` | ref value | Direct value check with method (eq, ge, etc.) |
| `data_validation` | dv_props list | Checks validation attributes against rules |
| `row_props` / `col_props` | expected file | Row height / column width |
| `filter` | expected file | AutoFilter settings |
| `pivot_table` | expected file | Pivot table definitions |
| `chart` | expected file | Chart properties |
| `sparkline` | expected file | Sparkline definitions |
| `check_cell` | ref values | Single cell value/style check |

---

## zoom check details (table.py, lines 550-571)

Reads `sheet.sheet_view.zoomScale` (defaults to 100 if None). Uses `_match_value_to_rule` with `method` and `ref`.

Example evaluator rule:
```json
{ "type": "zoom", "sheet_idx": 0, "method": "eq", "ref": 130 }
```
