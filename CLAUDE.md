# Skiing Alps Automation — Claude Code Brain

## What This Project Is

You are helping a **Scale AI contractor** build high-quality Skiing Alps tasks. Each task involves:

1. Taking a skeleton prompt + metadata
2. Rewriting the prompt to be clear, unambiguous, and grounded
3. Decomposing into subproblems with complexity ratings
4. Generating **config JSONs** (one per OS: macOS, Windows, Ubuntu)
5. Generating **evaluator JSONs** (one per OS, after ground truth is created)
6. Running a pre-submission checklist

## Key Terminology

- **Skeleton prompt**: The raw task description before rewriting
- **Config JSON**: A launch command initializer — tells OSWorld what app(s) to open before the task starts
- **Evaluator JSON**: Defines how to score the task — comparators, ground truth CDS URLs, scoring rubric
- **CDS URL**: Cloud storage URL for ground truth files (uploaded via VM)
- **Postconfig**: Shell/PowerShell commands that run inside the VM before the task starts
- **Comparator**: A function that checks one aspect of the result (e.g., file exists, cell value matches)
- **Subproblem**: One atomic step the model must complete to solve the task
- **Complexity**: easy / medium / hard — based on number of subproblems and reasoning required

## Workflow Overview

```
/prompt-rewrite   → Step 1: Rewrite the skeleton prompt
/feasibility      → Step 2: Check feasibility across OSes
/subproblems      → Step 3: Decompose into subproblems
/complexity       → Step 4: Rate complexity
/config-gen       → Steps 6-7: Generate config JSONs for all 3 OSes
                  → PAUSE: You do VM work (create ground truth, upload, get CDS URLs)
/evaluator-gen    → Step 10: Generate evaluator JSONs for all 3 OSes
/cross-os         → Step 11: Cross-OS consistency check
/pre-submit       → Step 12: Final pre-submission audit
/full-pipeline    → Runs all steps in sequence
```

## Critical Rules

### Prompt Rewriting (Step 1)
- **Intent is sacred.** Preserve every core request from the skeleton — same number, same type, same meaning.
- Only improve three things: **naturalness** (add backstory, conversational tone), **clarity** (resolve ambiguous references to exact elements/values/locations), and **verifiability** (ensure every request can be tested by an evaluator).
- Never add, remove, or alter what the task is asking for. Do not change the target values, elements, or outcomes.
- Feasibility removals happen ONLY in Step 2, not during the rewrite.
- If the skeleton has only 1 core request, you MAY add a second one to meet the minimum 2 subproblems — this is the only exception to "don't add requests."
- Do NOT use AI tools (ChatGPT etc.) for written portions — this gets flagged.
- Do NOT include instructions on HOW to do it — only WHAT the end state should be.
- Remove ambiguity — every noun must refer to exactly one thing.
- Include explicit file paths, sheet names, cell references where applicable.
- The prompt must be achievable by a model that has never seen the skeleton.
- `prompt_changes_made` must be 50+ characters, describe every specific change, and include "Preserved all X Core Requests."

### Config JSON Rules
- Each OS gets its own config JSON
- Config is a **launch command initializer**, not full task metadata — see `templates/config.md` for the correct format
- Always consult `osworld-ref/` source code (especially `osworld-ref/desktop_env/` and `osworld-ref/evaluation_examples/`) for correct config structure and app launch commands
- Chrome tasks always need `--remote-debugging-port=1337`
- When a task edits an existing file, the config must include a download step to get the file onto the VM
- OS-specific app paths:
  - Windows: `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`, `C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE` (**Windows user is `User`**)
  - Ubuntu: `google-chrome`, `libreoffice --calc`
  - macOS: `open -a "Google Chrome"`, `open -a "Microsoft Excel"`

### Evaluator JSON Rules
- Evaluator must be a **JSON array** `[{...}]` — even for a single block
- For spreadsheets: use `compare_table` with rules-based system (see `docs/comparators.md` and `templates/evaluator.md`)
- For documents: use `compare_docx_files` / `compare_docx_tables`
- CDS URLs must be real (provided by the user after VM work)
- `expected.dest` must have `_Gold` suffix; `result.dest` must NOT
- `sheet_idx0` is a plain integer; `sheet_idx1` is `"EI<n>"` string format

### Comparator Selection
- See `docs/comparators.md` for the full list and correct JSON format
- See `docs/comparator-status.md` for deprecation status, cross-platform bugs, and CB reviewer feedback
- See `docs/what-cannot-be-checked.md` for hard limits on what OSWorld cannot verify at all
- See `docs/osworld-evaluator-source.md` for source-level details on what OSWorld actually checks (derived from `osworld-ref/`)
- Always consult `osworld-ref/evaluation_examples/` for real evaluator examples and `osworld-ref/` source code when unsure about evaluator format or comparator behavior
- `compare_table`: For spreadsheet tasks — rules-based with `sheet_data`, `style`, etc.
- `compare_docx_files`: For document paragraph checks
- `compare_docx_tables`: For document table checks
- `file_exists`: Just checks the file is there
- `exact_match`: Byte-for-byte comparison with ground truth
- `text_contains`: For partial text matching in files
- `command_output`: Run a command and check its output
- `image_similarity`: For visual comparisons — threshold 0.85+

### Team Rules
- See `docs/team-rules.md` for the full list of hard-won production rules
- **Spreadsheets**: Say "plain numbers" never "no commas"; rounding must mention trailing zeros; `sheet_data` always gets `precision: 15`; charts are infeasible; freeze row/pane must be removed from prompts
- **Documents**: Paragraph checks need `ignore_blanks: false` + `delete_empty_lines: true`; docs with both paragraphs and tables need interleave language — but interleave language must NOT contradict positional references in paragraph text (e.g., "Table 1 below")
- **Data**: Tasks must use static/historical data — live data sources are infeasible
- **Data Validation (OSWorld limits)**: NEVER say "dropdown" in prompts (say "list with values X, Y, Z"); NEVER use decimal/whole-number "between" range validations (use custom formula like `=AND(cell>=min,cell<=max)` instead). OSWorld cannot verify dropdown rendering or distinguish between/not-between operators.

## Debugging Evaluator Failures
- See `docs/troubleshooting.md` for the full diagnostic checklist
- Use `/debug-evaluator` to automatically check an evaluator JSON against common failure patterns
- Most common causes: wrong JSON format (not wrapped in array), wrong file paths (Windows user is `Docker`), stale CDS URL after re-upload, wrong `sheet_idx1` format
- Window name patterns: Ubuntu = `file.xlsx - LibreOffice Calc`, Windows = `file - Excel`, macOS = `file.xlsx`

## Navigation Steps & Evidence (NEW)
For tasks involving Chrome/browser work, the task UI now requires:
1. **Navigation Steps** field — Step-by-step explanation of what URLs were visited and what actions were taken to access data. Write this BEFORE VM work based on the prompt's Chrome requirements.
2. **Files/PDFs Used** field — Upload screenshots of every website visited during task execution.

Generate `navigation_steps.md` as a deliverable during Step 5.5 (VM Walkthrough):
- **Actually perform the navigation in Chrome** using browser automation tools before writing the steps
- Record the navigation as a GIF using `gif_creator` and save to `navigation_steps/` folder in the task
- Write the steps as a **single first-person text block** (no bullets, no numbered lists) — e.g., "I opened Chrome and went to comtrade.un.org, which redirected me to..."
- Include all URLs visited
- Reference the GIF evidence file
- This is the same format as `prompt_changes_made.txt` — one pasteable paragraph for the UI field

## File Conventions
- Task folders go in `tasks/<task-id>/`
- Final JSONs go in `output/<task-id>/`
- Always name files: `config_macos.json`, `config_windows.json`, `config_ubuntu.json`
- Evaluators: `evaluator_macos.json`, `evaluator_windows.json`, `evaluator_ubuntu.json`
- Navigation: `navigation_steps.md`
- Prompt changes: `prompt_changes_made.txt`

### prompt_changes_made.txt (Required Deliverable)
Always generate `prompt_changes_made.txt` as a separate pasteable file for the UI "Why was the prompt Changed" field. Format:
- First line: `Prompt Changed? Yes`
- Then a single paragraph in **casual, natural language** — write it like you're explaining to a coworker what you changed, not writing a formal report. Use short punchy sentences, contractions, informal phrasing ("took out", "swapped", "put in" not "removed", "replaced", "added").
- No bullet points, no line breaks, no numbered lists — one continuous text block.
- Cover every change but don't over-explain. State what changed and a brief why, then move on.
- End with "Preserved all X Core Requests." and note what was kept identical.
- Must be 50+ characters (aim for 500-900 characters — thorough but not bloated).
- The user copy-pastes this directly into the UI field.
- **CRITICAL: Before writing this file, re-read both the skeleton and rewritten prompt side by side.** Every difference must be accounted for — additions, removals, rewordings, restructuring. Do NOT write from memory; do an actual diff. A missing change = audit failure.
