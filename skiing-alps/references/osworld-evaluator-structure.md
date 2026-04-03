# OSWorld Evaluator Deep-Dive: Instructions for Claude Code Project Update

## Critical Discovery: The Correct Evaluator JSON Structure

Based on analysis of the OSWorld repository (https://github.com/xlang-ai/OSWorld), the Skiing Alps
platform is built on OSWorld's evaluation framework. The evaluator JSON has a SPECIFIC structure
that differs from what we were using. This explains why our verifiers failed to run.

## The CORRECT Evaluator JSON Structure

### postconfig is an ARRAY of objects, NOT a string

**WRONG (what we were using):**
```json
{
  "postconfig": "activate_window('filename - Word')"
}
```

**CORRECT (from OSWorld source code):**
```json
{
  "postconfig": [
    {
      "type": "activate_window",
      "parameters": {
        "window_name": "filename.docx - LibreOffice Writer",
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
          "import pyautogui; pyautogui.hotkey('ctrl', 's');"
        ]
      }
    },
    {
      "type": "sleep",
      "parameters": {
        "seconds": 0.5
      }
    }
  ]
}
```

### expected and result have a "type" field

**WRONG:**
```json
{
  "expected": {
    "path": "scale-cds://...",
    "dest": "filename_Gold.docx"
  },
  "result": {
    "dest": "filename.docx"
  }
}
```

**CORRECT:**
```json
{
  "expected": {
    "type": "cloud_file",
    "path": "scale-cds://...",
    "dest": "filename_Gold.docx"
  },
  "result": {
    "type": "vm_file",
    "path": "/home/user/Desktop/filename.docx",
    "dest": "filename.docx"
  }
}
```

### Key type values:
- `"type": "cloud_file"` — for expected (ground truth downloaded from CDS/cloud)
- `"type": "vm_file"` — for result (file on the VM's filesystem)

## Complete Correct Evaluator Template (Ubuntu/LibreOffice Writer)

```json
{
  "func": "compare_docx_files",
  "expected": {
    "type": "cloud_file",
    "path": "<CDS_URL>",
    "dest": "filename_Gold.docx"
  },
  "result": {
    "type": "vm_file",
    "path": "/home/user/Desktop/filename.docx",
    "dest": "filename.docx"
  },
  "options": {
    "examine_text": true,
    "ignore_blanks": false
  },
  "postconfig": [
    {
      "type": "activate_window",
      "parameters": {
        "window_name": "filename.docx - LibreOffice Writer",
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
          "import pyautogui; pyautogui.hotkey('ctrl', 's');"
        ]
      }
    },
    {
      "type": "sleep",
      "parameters": {
        "seconds": 0.5
      }
    }
  ]
}
```

## Complete Correct Evaluator Template (Windows/Word)

```json
{
  "func": "compare_docx_files",
  "expected": {
    "type": "cloud_file",
    "path": "<CDS_URL>",
    "dest": "filename_Gold.docx"
  },
  "result": {
    "type": "vm_file",
    "path": "C:\\Users\\User\\Desktop\\filename.docx",
    "dest": "filename.docx"
  },
  "options": {
    "examine_text": true,
    "ignore_blanks": false
  },
  "postconfig": [
    {
      "type": "activate_window",
      "parameters": {
        "window_name": "filename - Word",
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
          "import pyautogui; pyautogui.hotkey('ctrl', 's');"
        ]
      }
    },
    {
      "type": "sleep",
      "parameters": {
        "seconds": 0.5
      }
    }
  ]
}
```

## postconfig Action Types Available

| Type | Parameters | Description |
|------|-----------|-------------|
| `activate_window` | `window_name`, `strict` (bool) | Brings window to front |
| `sleep` | `seconds` (float) | Wait between actions |
| `execute` | `command` (array of strings) | Run a shell command |

## The Evaluation Pipeline (from OSWorld source)

The evaluation flow is:
1. **postconfig** runs first — activates window, saves file
2. **getter** downloads/locates the expected and result files
3. **comparator** (the `func`) compares expected vs result
4. **score** returns 0 or 1

## Config JSON Structure (Task Setup)

The config JSON that sets up the task environment also follows a specific structure:

```json
{
  "config": [
    {
      "type": "download",
      "parameters": {
        "files": [
          {
            "url": "<CDS_URL_of_starting_file>",
            "path": "/home/user/Desktop/filename.docx"
          }
        ]
      }
    },
    {
      "type": "open",
      "parameters": {
        "path": "/home/user/Desktop/filename.docx"
      }
    }
  ]
}
```

For tasks with NO starting file (create from scratch), config would be minimal or empty.

## Available Comparator Functions (from OSWorld metrics)

From `desktop_env/evaluators/metrics/general.py`:
- `compare_text_file` — plain text comparison
- `compare_docx_files` — Word document comparison with options
- `compare_pptx_files` — PowerPoint comparison with examine_* options
- `compare_table` — Spreadsheet comparison with rules
- `check_json` / `check_json_settings` — JSON/settings comparison
- `exact_match` — exact string match
- `is_expected_active_tab` — Chrome tab verification
- `is_expected_installed_extensions` — Extension verification
- `check_accessibility_tree` — UI element verification

## Key Options for compare_docx_files

From OSWorld examples:
- `examine_text` (bool) — compare text content
- `ignore_blanks` (bool) — ignore blank line differences
- `word_number_split_by_tabstop` (int) — tab-based word splitting
- `index` (int) — specific section index to compare

## Instructions for Claude Code: Update the Project

Run these updates on the skiing-alps project:

1. **Update `scripts/generate-evaluator.js`** — Change postconfig from string format to array-of-objects format
2. **Update `references/comparator-guide.md`** — Add the correct JSON structure with `type` fields
3. **Add new file `references/evaluator-structure.md`** — Contains the complete correct structure documentation
4. **Update `templates/task-template.md`** — Include correct evaluator template
5. **Update `WORKFLOW.md`** — Reference the correct structure

### Specific Claude Code Command:
```
claude "Read references/osworld-evaluator-structure.md and update the following files:
1. scripts/generate-evaluator.js — change postconfig to use array format with type/parameters objects, add 'type: cloud_file' to expected and 'type: vm_file' to result
2. references/comparator-guide.md — add a section showing the correct JSON structure
3. templates/task-template.md — update the evaluator template section
This is critical — our verifiers were failing because we used string postconfig instead of array format."
```
