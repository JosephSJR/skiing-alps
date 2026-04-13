# What Cannot Be Checked

OSWorld evaluators have hard limits. If a task requires verifying any of these, it is **infeasible** or needs a workaround. Use this list during `/feasibility` and `/evaluator-gen`.

---

## Documents (DOCX/ODT)

| Category | Feature | Why It Can't Be Checked |
|----------|---------|------------------------|
| Document Flow & Layout | Element Placement | Cannot tell if a table, image, or chart is located directly under a specific paragraph |
| | Page Layout | Cannot verify margins, page orientation (Landscape vs. Portrait), or column layouts |
| Text Formatting & Color | General Text Color | Cannot check standard font colors (e.g., if a warning paragraph is colored red) |
| | Basic Styling | Cannot check for standard bold, italic, or underline formatting (outside of a few hyper-specific rules) |
| | Heading Styles | Cannot distinguish between structural headings (e.g., "Heading 1") and normal body text made to look large |
| Table Structure & Design | Merged Cells | Cannot tell if table cells are properly merged or broken, as long as the raw text matches |
| | Visual Design | Cannot check table borders (thick, dashed, invisible) or cell background shading |
| Lists & Bullet Points | List Formatting | Cannot distinguish between a properly formatted Word list and someone manually typing numbers and spaces |
| Links, Headers & Extras | Hyperlinks | Cannot check the actual underlying URL destination (only reads the display text) |
| | Headers & Footers | Cannot compare standard header/footer text, like company names or confidentiality watermarks |
| | Word Metadata | Completely ignores Word comments and pending Track Changes |

## Tables / Spreadsheets

| Category | Feature | Why It Can't Be Checked |
|----------|---------|------------------------|
| Data & Cell Contents | Empty Cells ("") | Cannot accurately compare truly blank cells without accidentally converting them to the literal text "None" |
| | Error Values (#N/A) | Struggles to differentiate between a user typing "N/A", a formula #N/A error, and a blank cell due to Pandas NaN conversions |
| Charts & Visuals | Chart Styling | Cannot verify chart colors, specific axis labels, titles, or exact visual formatting (relies entirely on raw data links) |
| | Images & Shapes | Completely ignores inserted pictures (logos), text boxes, arrows, and SmartArt |
| | Chart Placement | Struggles to confirm the exact physical pixel location of floating charts over the grid |
| | Pivot Table | Also passes if both files have no Pivot Tables at all |
| | Data Validation (split ranges) | If a user applies the same dropdown to A1:A5 then A6:A10 separately, the strict range check "A1:A10" will fail — two separate DV objects are created |
| Logic & Automation | Macros (VBA) | Cannot detect, read, or compare VBA code, macros, or active form buttons |
| | External Data | Cannot verify Power Query connections, SQL links, or live web data feeds |
| Print & Page Layout | Print Area | Cannot verify if a specific "Print Area" was set up |
| | Page Setup | Cannot check margins, "Fit to 1 Page" settings, or Landscape/Portrait print orientations |
| | Print Headers/Footers | Cannot check for page numbers, dates, or titles set in the print headers |
| Security | Sheet Protection | Cannot tell if cells are locked/hidden or if the workbook requires a password to edit |

---

## Implications for Task Design

1. **Never ask the model to do something we can't verify** — if it's on this list, either rewrite the requirement or remove it during `/feasibility`.
2. **Document tasks**: Stick to paragraph text content (`compare_docx_files`) and table cell text (`compare_docx_tables`). Don't rely on visual styling, element positioning, or heading hierarchy.
3. **Spreadsheet tasks**: Stick to cell values (`sheet_data`), sheet names (`sheet_name`), and the safe subset of style props. Don't ask for chart styling, image insertion, or macro creation.
4. **Data Validation**: Use `list` type (safe) or `custom` formula (safe). Avoid `between`/`notBetween` operators. Be aware of split-range DV issues.
