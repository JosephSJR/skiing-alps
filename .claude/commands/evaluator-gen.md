# Evaluator Generation

Generate evaluator JSONs for all feasible OSes using ground truth CDS URLs.

## Instructions

The user has completed VM work and will provide CDS URLs for ground truth files. Generate evaluator JSONs for each OS.

### Prerequisites:
- Subproblems must be defined (run `/subproblems` first if not)
- CDS URLs must be provided by the user
- Config JSONs should already exist

### For each OS:

1. **Read** `templates/evaluator.md` for the JSON template
2. **Read** `docs/comparators.md` for available comparators and their parameters
3. **Map each subproblem** to one or more comparators:
   - Choose the most specific comparator available
   - Set appropriate thresholds (e.g., image similarity ≥ 0.85)
   - Use OS-specific file paths
4. **Set scoring weights**:
   - Weights across ALL comparators must sum to 1.0
   - Weight by importance — core actions get higher weight
   - Trivial checks (file exists) get lower weight
5. **Insert CDS URLs** for ground truth files

### Team Rules (from `docs/team-rules.md`):
- **Document paragraph checks**: When using `compare_docx_files` for paragraph-by-paragraph comparison, MUST set `ignore_blanks: false` AND `delete_empty_lines: true`.
- **Document paragraph order doesn't matter**: Use `ignore_blanks: true`.
- **Documents with BOTH paragraphs AND tables**: Use `compare_docx_files` for paragraph order AND `compare_docx_tables` for table order as separate comparators. Cannot check relative order of tables vs paragraphs.
- **Spreadsheet `sheet_data`**: Always set `precision: 15`.
- **Data validation**: OSWorld CANNOT verify "dropdown" rendering (openpyxl `showDropDown` is inverted) and CANNOT reliably check `operator` (between vs not-between). Prompts must use "list" (not "dropdown") and custom formula validations (not between-range). Use `dv_props` with `type`+`formula1`+`ranges` for verification. Error/input messages (`errorTitle`, `error`, `promptTitle`, `prompt`) ARE reliable. See `docs/comparators.md` and `docs/osworld-evaluator-source.md` for full patterns and attribute list.

### Comparator Selection Guide:
- File created? → `file_exists`
- File content must match exactly? → `exact_match` + CDS URL
- Spreadsheet cell value? → `cell_value_match` + sheet/cell/value
- Visual appearance? → `image_similarity` + CDS URL + threshold
- Text contains specific string? → `text_contains` + expected string
- Need to run a command to check? → `command_output` + command + expected

### Save to:
- `tasks/<task-id>/evaluator_macos.json`
- `tasks/<task-id>/evaluator_windows.json`
- `tasks/<task-id>/evaluator_ubuntu.json`

$ARGUMENTS
