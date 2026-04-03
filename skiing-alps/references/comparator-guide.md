# Evaluator Comparator Reference

## Comparator Selection Guide

### PPTX Tasks
| Prompt Asks For         | Comparator          | Key Option                    |
|------------------------|---------------------|-------------------------------|
| Change text            | compare_pptx_files  | examine_text: true            |
| Change fonts           | compare_pptx_files  | examine_font_* options        |
| Change text color      | compare_pptx_files  | examine_color_rgb: true       |
| Change background      | compare_pptx_files  | examine_background_color: true|
| Add transitions        | check_transition    | transition_type per slide     |
| Bold/italic/underline  | compare_pptx_files  | examine_font_bold/italic/underline: true |
| Font size changes      | compare_pptx_files  | examine_font_size: true       |
| Font family changes    | compare_pptx_files  | examine_font_name: true       |
| Text alignment         | compare_pptx_files  | examine_alignment: true       |
| Speaker notes          | compare_pptx_files  | examine_note: true            |
| Strikethrough          | compare_pptx_files  | examine_strike_through: true  |
| Bullet/list changes    | compare_pptx_files  | examine_bullets: true         |

### DOCX Tasks
| Prompt Asks For         | Comparator          | Key Option / Note             |
|------------------------|---------------------|-------------------------------|
| Change text            | compare_docx_files  | ignore_blanks: false if adding paragraphs |
| Modify tables          | compare_docx_tables + compare_docx_files | Use BOTH |
| Change font name       | compare_font_names  | Checks every run's font.name  |
| Add page numbers       | has_page_numbers_in_footers | Checks footer for digit  |
| "Don't modify other content" | Use BOTH funcs | e.g. compare_docx_tables + compare_docx_files |

### XLSX Tasks
| Prompt Asks For         | Comparator          | Key Option                    |
|------------------------|---------------------|-------------------------------|
| Change cell data       | compare_table       | rules: [{type: "sheet_data"}] |
| Data validation (list) | compare_table       | rules: [{type: "data_validation"}] — inline list values only, NOT dropdown |
| Data validation (range)| compare_table       | rules: [{type: "data_validation"}] — use custom formula, NOT between operator |

### Chrome Tasks
| Prompt Asks For         | Comparator                    | Note                    |
|------------------------|-------------------------------|-------------------------|
| Check active tab       | is_expected_active_tab        | _approximate for params |
| Verify extension       | is_expected_installed_extensions | Extension ID subset  |

### VS Code Tasks
| Prompt Asks For         | Comparator              | Note                          |
|------------------------|-------------------------|-------------------------------|
| Change settings        | check_json_settings     | Key-value pairs               |
| Install extension      | is_extension_installed  | Full CLI path on Windows      |

### OS Tasks
| Prompt Asks For         | Comparator              | Note                          |
|------------------------|-------------------------|-------------------------------|
| GNOME settings         | exact_match + gsettings get | Include exact expected output |

## CRITICAL Rules
1. **enable ONLY options matching prompt** — Over-enabling = false negatives
2. **ignore_blanks = false** when prompt adds/removes/restructures paragraphs
3. **expected.dest MUST have _Gold suffix** — e.g. myfile_Gold.pptx
4. **result.dest must NOT have _Gold suffix** — e.g. myfile.pptx
5. **expected.path = ground truth CDS URL** — NEVER the starting file URL
6. **Every subproblem must map to an evaluator check**

## NOT Verifiable (Never Include in Prompts)
- PPTX: animation timelines, video/audio playback, theme-only changes
- DOCX: font size, font color, font alignment, heading styles, comments, track changes, margins/columns, table positioning
- XLSX: charts, conditional formatting, sparklines, cell comments, gradient themes, **"dropdown" rendering** (openpyxl `showDropDown` is inverted — use "list" type instead), **"between"/"not between" operator** (unreliable in OSWorld — use custom formula instead), **DV operator field** (unreliable in production)
- Chrome: visual themes, tab pinning/grouping, password manager, extension settings
- VS Code: visual appearance, cursor state, debug state, Git state
