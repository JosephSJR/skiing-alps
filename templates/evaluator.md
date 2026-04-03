# Evaluator JSON Templates

## Spreadsheet Evaluator (compare_table)

For spreadsheet tasks, the evaluator uses the `compare_table` function with a rules-based system wrapped in the `evaluator` object.

### Windows
```json
{
  "evaluator": {
    "postconfig": [
      {
        "type": "activate_window",
        "parameters": {
          "window_name": "<filename> - Excel",
          "strict": true
        }
      },
      {
        "type": "sleep",
        "parameters": {
          "seconds": 0.5
        }
      },
      {
        "type": "execute",
        "parameters": {
          "command": [
            "python",
            "-c",
            "import pyautogui; import time; pyautogui.hotkey(\"ctrl\", \"s\"); time.sleep(0.5); pyautogui.press(\"enter\");"
          ]
        }
      },
      {
        "type": "sleep",
        "parameters": {
          "seconds": 1.0
        }
      }
    ],
    "func": "compare_table",
    "result": {
      "type": "vm_file",
      "path": "C:\\Users\\User\\Desktop\\<filename>.xlsx",
      "dest": "<filename>.xlsx"
    },
    "expected": {
      "type": "cloud_file",
      "path": "<GROUND_TRUTH_CDS_URL>",
      "dest": "<filename>_Gold.xlsx"
    },
    "options": {
      "rules": [
        { "type": "sheet_data", "sheet_idx0": "RN<SheetName>", "sheet_idx1": "EN<SheetName>", "precision": 10 }
      ]
    }
  }
}
```

### Ubuntu
```json
{
  "evaluator": {
    "postconfig": [
      {
        "type": "activate_window",
        "parameters": {
          "window_name": "<filename>.xlsx - LibreOffice Calc",
          "strict": true
        }
      },
      {
        "type": "sleep",
        "parameters": {
          "seconds": 0.5
        }
      },
      {
        "type": "execute",
        "parameters": {
          "command": [
            "python",
            "-c",
            "import subprocess; import time; subprocess.Popen(['xdotool', 'key', 'ctrl+s']); time.sleep(2)"
          ]
        }
      },
      {
        "type": "sleep",
        "parameters": {
          "seconds": 1.0
        }
      }
    ],
    "func": "compare_table",
    "result": {
      "type": "vm_file",
      "path": "/home/user/Desktop/<filename>.xlsx",
      "dest": "<filename>.xlsx"
    },
    "expected": {
      "type": "cloud_file",
      "path": "<GROUND_TRUTH_CDS_URL>",
      "dest": "<filename>_Gold.xlsx"
    },
    "options": {
      "rules": [
        { "type": "sheet_data", "sheet_idx0": "RN<SheetName>", "sheet_idx1": "EN<SheetName>", "precision": 10 }
      ]
    }
  }
}
```

### macOS
```json
{
  "evaluator": {
    "postconfig": [
      {
        "type": "activate_window",
        "parameters": {
          "window_name": "<filename>.xlsx",
          "strict": true
        }
      },
      {
        "type": "sleep",
        "parameters": {
          "seconds": 0.5
        }
      },
      {
        "type": "execute",
        "parameters": {
          "command": [
            "python",
            "-c",
            "import subprocess; import time; subprocess.run(['osascript', '-e', 'tell application \"Microsoft Excel\" to activate']); time.sleep(1); import pyautogui; pyautogui.hotkey('command', 's')"
          ]
        }
      },
      {
        "type": "sleep",
        "parameters": {
          "seconds": 1.0
        }
      }
    ],
    "func": "compare_table",
    "result": {
      "type": "vm_file",
      "path": "/Users/user/Desktop/<filename>.xlsx",
      "dest": "<filename>.xlsx"
    },
    "expected": {
      "type": "cloud_file",
      "path": "<GROUND_TRUTH_CDS_URL>",
      "dest": "<filename>_Gold.xlsx"
    },
    "options": {
      "rules": [
        { "type": "sheet_data", "sheet_idx0": "RN<SheetName>", "sheet_idx1": "EN<SheetName>", "precision": 10 }
      ]
    }
  }
}
```

### Key Notes
- `sheet_idx0`: `"RN<SheetName>"` — looks up sheet by name in the **result** file (e.g., `"RNAnalysis"`, `"RNSheet1"`)
- `sheet_idx1`: `"EN<SheetName>"` — looks up sheet by name in the **expected/gold** file (e.g., `"ENAnalysis"`, `"ENSheet1"`)
- Alternative index formats: `0` (integer), `"RI0"` (result index), `"EI0"` (expected index) — but name-based (`RN`/`EN`) is preferred
- `precision`: Always `10` for tight numeric comparison
- `expected.type`: Must be `"cloud_file"` (NOT `"cloud"`)
- `expected.dest`: Must have `_Gold` suffix
- `result.dest`: Must NOT have `_Gold` suffix
- `postconfig`: Must be a structured array of steps, NOT a Python string
- Window name patterns: Windows = `"filename - Excel"` (no ext), Ubuntu = `"filename.xlsx - LibreOffice Calc"`, macOS = `"filename.xlsx"`
- For tasks editing an existing file with multiple sheets, include a `sheet_data` rule for EVERY sheet
- For multiple funcs: use parallel arrays for func, result, expected, options + `"conj": "and"` or `"or"`

---

## Document Evaluator (compare_docx_files / compare_docx_tables)

Uses the same `evaluator` wrapper with parallel arrays for multiple funcs.

### Both paragraphs and tables (Windows example)
```json
{
  "evaluator": {
    "postconfig": [
      {
        "type": "activate_window",
        "parameters": {
          "window_name": "<filename> - Word",
          "strict": true
        }
      },
      {
        "type": "sleep",
        "parameters": {
          "seconds": 0.5
        }
      },
      {
        "type": "execute",
        "parameters": {
          "command": [
            "python",
            "-c",
            "import pyautogui; import time; pyautogui.hotkey(\"ctrl\", \"s\"); time.sleep(0.5); pyautogui.press(\"enter\");"
          ]
        }
      },
      {
        "type": "sleep",
        "parameters": {
          "seconds": 0.5
        }
      }
    ],
    "func": ["compare_docx_files", "compare_docx_tables"],
    "conj": "and",
    "result": [
      { "type": "vm_file", "path": "C:\\Users\\User\\Desktop\\<filename>.docx", "dest": "<filename>.docx" },
      { "type": "vm_file", "path": "C:\\Users\\User\\Desktop\\<filename>.docx", "dest": "<filename>.docx" }
    ],
    "expected": [
      { "type": "cloud_file", "path": "<CDS_URL>", "dest": "<filename>_Gold.docx" },
      { "type": "cloud_file", "path": "<CDS_URL>", "dest": "<filename>_Gold.docx" }
    ],
    "options": [
      { "ignore_blanks": false, "delete_empty_lines": true },
      {}
    ]
  }
}
```

### Window name patterns for documents
- Windows: `"<filename> - Word"` (no extension)
- Ubuntu: `"<filename>.docx - LibreOffice Writer"` (with extension)
- macOS: `"<filename>.docx"` (just filename with extension)

---

## Navigation Evaluators (Chrome tasks)

There is NO dedicated navigation evaluator for chrome_office tasks. The spreadsheet/document output IS the verification — if the agent extracted the correct data from the web, the output file will match the ground truth.

For pure Chrome tasks (not chrome_office), these comparators exist:
- `is_expected_active_tab` — checks the current active tab URL
- `is_expected_installed_extensions` — checks installed extensions

---

## Notes

- The evaluator must ALWAYS use the `{ "evaluator": { ... } }` wrapper format
- Replace all `<PLACEHOLDER>` values with actual data
- See `docs/comparators.md` for the full comparator reference
- See `docs/osworld-evaluator-source.md` for source-level details
