# Comparator Deprecation Status & Cross-Platform Bugs

Source: Table Comparison Rule Refinement spreadsheet (reviewer annotations).

---

## DEPRECATED Comparators (DO NOT USE)

These are marked deprecated and should never appear in evaluator JSONs.

### Tables

| Comparator | Type | Why Deprecated |
|-----------|------|----------------|
| `compare_table` | `sheet_fuzzy` | False positives — ignore_chars strips characters artificially inflating RapidFuzz scores to 100% |
| `compare_table` | `chart` (all props) | Charts are infeasible cross-platform. LibreOffice shifts anchors, DPI scaling differs, dimension values mismatch |
| `compare_table` | `style` → `font_color` | Causes Ubuntu verifier to completely fail and not even run after the second try |
| `compare_table` | `style` → `fgcolor` | Extreme confusion and overlap with bgcolor when dealing with conditional formatting |
| `compare_table` | `freeze` | Freeze pane check is broken cross-platform. See Outlier community guidance |
| `compare_table` | `row_props`/`col_props` → `auto_size` | Doesn't persist after save/re-open; Excel and Calc record this differently in XML |
| `compare_table` | `row_props`/`col_props` → `min`/`max` | XML representation depends on whether columns were set individually or as a group |
| `compare_table` | `data_validation` → `showDropDown` | Logic is backwards (true = HIDE). Excel doesn't save it when checked by default |
| `compare_table` | `data_validation` → `imeMode` | Irrelevant control method input |
| `compare_conference_city_in_order` | N/A | Hardcoded to C2:C22 — fails if data shifts |

### Docs

| Comparator | Why Deprecated |
|-----------|----------------|
| `compare_docx_files` → `fuzzy_match` | False positives from hidden control characters (zero-width spaces, soft hyphens) across OSes |

---

## SAFE Comparators (Confirmed Working)

### Tables — compare_table

| Type | Props | Status | Notes |
|------|-------|--------|-------|
| `sheet_name` | — | **Safe** | Watch for LibreOffice leaving default empty sheets (Sheet2, Sheet3) |
| `sheet_data` | — | **Safe** | Always use `precision: 10`. Pandas NaN = empty cell = "N/A" string (all treated as equal) |
| `sheet_print` | — | **Safe** | Watch CRLF vs LF differences |
| `style` | `font_name` | **Safe** | But cross-platform font substitution will cause false negatives (Calibri→Carlito on Ubuntu) |
| `style` | `font_family` | **Safe** | No known bugs |
| `style` | `font_bold` | **Safe** | No known bugs |
| `style` | `font_italic` | **Safe** | No known bugs |
| `style` | `font_underline` | **Safe** | No known bugs |
| `style` | `font_size` | **Safe** | Minor fractional DPI differences possible Ubuntu vs Windows |
| `style` | `fill_type` | **Safe** | No known bugs |
| `style` | `bgcolor` | **Safe** | But OpenPyXL bgColor/fgColor parsing bug exists — always specify hex code in prompt, define ALL cell colors (including no-fill cells) |
| `style` | `hyperlink` | **Safe** | No known bugs |
| `style` | `merge` | **Safe** | No known bugs |
| `style` | `number_format` | **Caution** | OS locale differences (comma vs period, date format) cause mismatches. Also gives false positive when cell is number/text vs general |
| `zoom` | — | **Safe** | Defaults to 100.0 if zoomScale not explicitly defined in XML |
| `filter` | — | **Safe** | No known bugs |
| `data_validation` | `ranges`, `type`, `formula1` | **Safe** | Watch literal string quotes for inline lists. LibreOffice may use different syntax for cell references |
| `data_validation` | `errorTitle`, `error`, `errorStyle` | **Safe** | Sequential ordering flaw if multiple DV rules exist in different order |
| `data_validation` | `showInputMessage`, `showErrorMessage` | **Safe** | Same ordering flaw |
| `data_validation` | `prompt`, `promptTitle` | **Safe** | Same ordering flaw |
| `row_props`/`col_props` | `hidden` | **Safe** | No known bugs |
| `row_props`/`col_props` | `collapsed` | **Safe** | No known bugs |
| `pivot_table` | `show_total` | **Safe** | XML caching sequence may differ cross-platform |
| `pivot_table` | `location` | **Safe** | Same caching caveat |
| `pivot_table` | `filter` | **Safe** | Same caching caveat |
| `pivot_table` | `col_fields`, `row_fields`, `data_fields` | **Safe** | Same caching caveat |
| `check_cell` | — | **Safe** | Rarely used; fails silently on wrong coordinate format |

### Docs

| Comparator | Props | Status | Notes |
|-----------|-------|--------|-------|
| `compare_docx_files` | `ignore_blanks` | **Safe** | MS Word uses paragraph styles, LibreOffice uses empty paragraphs + \xa0 |
| `compare_docx_files` | `ignore_case` | **Safe** | Python .lower() locale-dependent; macOS ligatures may differ |
| `compare_docx_files` | `ignore_order` | **Caution** | Destroys duplicate lines via set() — if gold has 3 identical paragraphs and agent generates 1, it passes |
| `compare_docx_files` | `content_only` | **Safe** | Text in floating boxes/smart shapes may be skipped |
| `compare_docx_files` | `delete_empty_lines` | **Safe** | CRLF vs LF differences; always pair with `ignore_blanks: false` |
| `compare_docx_tables` | — | **Safe** | Merged cells parse differently (1 merged cell in Ubuntu = 2 cells in Windows). Cannot check table position in document |
| `compare_init_lines` | — | **Caution** | Brittle — trailing paragraph differences between Word and LibreOffice cause index failures |
| `check_file_exists` | — | **Safe** | Case sensitivity differs: Ubuntu is case-sensitive, Windows/Mac are not |
| `contains_page_break` | — | **Caution** | LibreOffice sometimes exports page breaks as section formatting, not w:br tags |

---

## Key Cross-Platform Bugs Summary

1. **Font substitution**: Windows=Calibri, Ubuntu=Carlito/Liberation Sans, macOS=Helvetica
2. **DPI/scaling**: Column widths, row heights, chart dimensions all differ due to different font metrics and DPI
3. **Line endings**: Windows=CRLF, Ubuntu/macOS=LF — affects sheet_print and CSV comparisons
4. **Empty sheets**: LibreOffice keeps default empty sheets (Sheet2, Sheet3); Excel may delete them
5. **bgColor/fgColor**: OpenPyXL has a known bug parsing these depending on pattern fill status
6. **Date locale**: Windows US = m/d/yyyy, some Ubuntu locales = dd/mm/yyyy; formula functions may be localized (DATE vs DATA)
7. **NaN handling**: Pandas treats empty cells, "N/A" strings, and #N/A errors all as NaN
8. **Data Validation ordering**: Sequential evaluation means different DV order = failure
9. **Pivot table XML**: Excel and LibreOffice construct pivot caches in different XML orders
10. **Chart anchoring**: LibreOffice shifts chart anchors by default padding pixels vs Excel

## bgcolor Usage Rules (from CB feedback)

When using `bgcolor` style check:
- You must define colors for ALL cells being checked (including cells that should have no fill)
- Always specify hex codes in the prompt (not color names or checkbox selections)
- LibreOffice checks color differently depending on how it was added (hex code vs color checkbox)
- Use hex code in prompt to ensure deterministic cross-platform behavior

## Data Validation Operator Workaround

The `between` and `notBetween` operators are **broken cross-platform**:
- Excel doesn't store the `between` operator in XML when selected by default (it's null)
- LibreOffice does store it explicitly
- This makes cross-platform verification impossible

**Workaround**: Always use `custom` type with explicit formula:
```
=AND(A1>=min, A1<=max)           -- instead of "between"
=OR(A1<min, A1>max)              -- instead of "not between"  
=AND(A1>=min, A1<=max, A1=INT(A1))  -- for whole number range
```
