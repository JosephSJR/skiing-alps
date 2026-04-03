# Skiing Alps — Complete Project Knowledge Base
# Last Updated: March 2026
# Source: Full task walkthrough of task 69bc921cf6b3f2d10d466ef9

---

## 1. PROJECT OVERVIEW

### What is Skiing Alps?
Skiing Alps is an Outlier/Remotasks project that trains and evaluates AI agents on their ability to complete realistic, multi-step desktop tasks. The project uses the OSWorld environment: a virtual machine (VM) running a real OS (Ubuntu, Windows, or macOS) where AI agents interact with desktop applications just like a human would.

### What Does an Attempter Do?
As an Attempter, you provide three key components for each task:

| Component | What You Do | Why It Matters |
|-----------|-------------|----------------|
| **Prompt Analysis** | Validate the LLM-generated prompt for naturalness, feasibility, and verifiability. Break it into subproblems and assign complexity. | Poorly written prompts lead to ambiguous tasks that AI agents cannot learn from. |
| **Ground Truth Creation** | Manually complete the task yourself in a VM and save the result as the expected output file. | This file is the answer key. If it is wrong, every agent submission will be scored incorrectly. |
| **Config & Evaluator** | Validate the LLM-generated config (environment setup) and evaluator (verification logic) JSON blocks. | Broken evaluators mean valid agent work gets rejected, or invalid work gets accepted. |

### Platform URL
- Task interface: `app.outlier.ai/expert/tasks`
- Onboarding: `app.outlier.ai/en/expert/project-onboarding/`
- Community: Outlier Community tab

### Pay Rate
- $29.50/hr (observed from task screenshots)
- Tasks have a 3-hour time limit

---

## 2. THE THREE GOLDEN RULES (Violation = Rejection)

1. **NATURALNESS** — Prompts must read like real human requests, not robotic instructions
2. **VERIFIABILITY** — Every change the prompt asks for must be measurable by an evaluator function
3. **SAVE YOUR WORK** — Always Cmd+S (Mac) / Ctrl+S (Ubuntu/Windows) in the VM before uploading. An unsaved file = invalid task.

**AI TOOL BAN:** Using ChatGPT or any AI tool for written portions = account flag + removal.

---

## 3. THE 12-STEP WORKFLOW

| Step | Action | Key Focus |
|------|--------|-----------|
| 1 | Evaluate Prompt | Rewrite for naturalness. Preserve Core Requests. |
| 2 | Check Feasibility | Feasible or Infeasible. Try to fix before marking Infeasible. |
| 3 | Break into Subproblems | Distinct subgoals of the prompt (NOT UI steps). |
| 4 | Assign Complexity | 2-3 subs = Medium, 4-5 = Hard, 6+ = Very Hard. |
| 5 | Launch Environment | Note the OS. Ubuntu and Windows paths differ. |
| 6 | Confirm Task Project Name | Must match OS (LibreOffice Impress for Ubuntu, PowerPoint for Windows, etc.). |
| 7 | Test Config | CDS URL valid? File downloads and opens in the correct app? Paths point to Desktop? |
| 8 | Create Ground Truth | Complete ALL prompt requirements. Save as MS Office format on Ubuntu (.docx/.pptx/.xlsx). |
| 9 | Get Ground Truth URL | Transfer from VM, upload to Asset Upload, copy CDS URL. |
| 10 | Test Evaluator | Must return 1. Map every subproblem to an evaluator check. |
| 10.5 | Evaluator Coverage Verification | Map each subproblem → evaluator function + option |
| 11 | Repeat for Other OSes | Separate golden file per OS. Verify function names per platform. |
| 12 | Submit | Run the Pre-Submission Checklist. |

---

## 4. PROMPT WRITING RULES

### Naturalness Rules
- Write like a real person, not a task list. Add context and backstory.
- Maintain the same NUMBER and TYPE of Core Requests from the skeleton.
- Adjust targets to fit the actual file content (e.g., actual slide numbers, real text in the document).
- If a Core Request is infeasible, you may remove it. Keep the rest.
- You may target a range instead of the entire file to keep tasking time reasonable.

### Verifiability Rules
- NO vague language: "some," "appropriate," "relevant," "such as" = unverifiable
- NO open-ended tasks: "write 2-3 sentences summarizing" = non-deterministic
- Every value must be exact: specific colors, font names, numbers
- Every location must be specific: slide number, cell reference, paragraph number
- Template-driven where possible: provide exact text to copy/insert

### Time-Invariance Rules
- NO live web fetching (embed data in prompt if needed)
- NO "current," "today," "real-time" data
- Historical/static data only
- The same output must be expected whether the task runs today or in a year

### Determinism Rules
- Only ONE valid output should be possible
- No "such as" allowing multiple valid interpretations
- Provide exact text strings for any content that must appear
- If summarizing is needed, provide the exact summary text (don't let the agent write it)

### Real-Time Queries = FAIL
Any prompt requiring the agent to fetch live/real-time data must be marked as FAIL:
- ❌ "What is the current weather in Miami?"
- ❌ "What is the price of Tesla stock right now?"
- ✅ "What was the weather in Chicago on March 5, 2020?" (historical = OK)

### Edge Case Checklist
1. Is any referenced text already formatted as requested? (text already bold when prompt says "bold it")
2. Does any referenced text appear more than once on the same slide/page? Add location context.
3. For cell references in spreadsheets: is "A4=A2" the text value "A2" or a formula? Be explicit.
4. For Chrome/browser tasks: specify exact settings values (e.g., "Enhanced protection" not just "enable protection").

### BAD vs GOOD Prompt Examples
| BAD (Score: 2) | GOOD (Score: 5) |
|---|---|
| "In the document, find the word Apple and replace it with Orange and bold it." | "I have decided to rebrand this memo. Can you swap every mention of Apple with Orange and make sure each instance is bolded? We need this for the client meeting tomorrow." |
| "Make this document look more professional." | "Change the body font to Noto Sans, 12pt, and set all headings to bold, 14pt." |
| "Write 2-3 sentences summarizing the paper's main result" | "Copy the first two sentences of the abstract exactly as they appear" |

### prompt_changes_made Requirements
- **MINIMUM 50 characters** — submissions below this threshold will be flagged
- Must reference specific changes and rationale for each change
- BAD: "Just minor tweaks to make it sound natural."
- BAD: "asd"
- GOOD: "Rewrote skeleton for naturalness. Changed target from all slides to slides 2-5. Removed infeasible Core Request (insert watermark) since LibreOffice Impress does not support this natively. Preserved all 4 Core Requests. Added backstory about teacher preparing class materials."

---

## 5. SUBPROBLEM RULES

### What IS a Subproblem
A subproblem is a self-contained mini-task with a specific intermediate goal and a verifiable outcome.

### Rule 1: No Vague Language
Every subproblem must name the exact element, location, and value.
- ❌ "Make the headings bold." → Which headings?
- ✅ "Bold all four Heading 2 formatted headings in the document."

### Rule 2: Process Steps Are NOT Subproblems
Saving, closing, renaming, or exporting is workflow, not a verifiable agent outcome.
- ❌ "Save the file as water_boards_final.pptx."
- ❌ "Close LibreOffice after making the changes."

### Rule 3: Collective Self-Containment
All subproblems together must fully describe the prompt. Individual subproblems can reference previous ones, but must be specific when an element is introduced for the first time.
- First reference: Must be specific (e.g., "Change the font color of the 'Confidential' header on page 1 to dark red")
- Subsequent reference: Can be shorter if previously established

### Minimum: 2 subproblems per task
If the skeleton has only 1 goal, ADD a second request to the prompt.

### Complexity Assignment
| Complexity | Subproblems | Notes |
|-----------|-------------|-------|
| Medium | 2-3 | Most common. Aim for at least 2 subproblems. |
| Hard | 4-5 | Multi-faceted formatting or content changes. |
| Very Hard | 6+ | Complex cross-document or multi-application tasks. |

---

## 6. CROSS-OS REFERENCE

### File Paths
| OS | Pattern | Example |
|----|---------|---------|
| Ubuntu | /home/user/Desktop/<filename> | /home/user/Desktop/report.docx |
| Windows | C:\Users\User\Desktop\<filename> | C:\Users\User\Desktop\report.docx |
| macOS | /Users/user/Desktop/<filename> | /Users/user/Desktop/report.docx |

**WARNING:** Some Windows VMs use `Docker` instead of `User`. Always verify with `Copy as path` in File Explorer. Task 69bc921cf6b3f2d10d466ef9 used `C:\Users\Docker\Desktop\`.

### Window Names
| OS | App | Pattern | Example |
|----|-----|---------|---------|
| Ubuntu | Writer | filename.ext - LibreOffice Writer | report.docx - LibreOffice Writer |
| Ubuntu | Impress | filename.ext - LibreOffice Impress | slides.pptx - LibreOffice Impress |
| Ubuntu | Calc | filename.ext - LibreOffice Calc | data.xlsx - LibreOffice Calc |
| Windows | Word | filename - Word (**NO extension**) | report - Word |
| Windows | PowerPoint | filename - PowerPoint (**NO extension**) | slides - PowerPoint |
| Windows | Excel | filename - Excel (**NO extension**) | data - Excel |
| macOS | Office for Mac | filename.ext (with extension) | report.docx |
| macOS | Pages/Keynote | filename (no extension) | report |

### Task Initializers
| OS | App | Initializer |
|----|-----|-------------|
| Ubuntu | Writer | libreoffice_writer |
| Ubuntu | Impress | libreoffice_impress |
| Ubuntu | Calc | libreoffice_calc |
| Windows | Word | word |
| Windows | PowerPoint | powerpoint |
| Windows | Excel | excel |
| macOS | Keynote | keynote |
| macOS | Pages | pages |
| macOS | Numbers | numbers |
| macOS | Word for Mac | word |
| **Any OS** | **Chrome + Office** | **chrome-office** |
| Any OS | VS Code | vscode |

**CRITICAL:** For multi-app tasks (Chrome + Office app), ALWAYS use `chrome-office` regardless of OS. The skeleton's Task Project Name takes precedence — if it says `chrome_office`, use `chrome-office`.

### Multi-Application Tasks: Initializer Rule
When a task involves multiple applications (e.g., Chrome + LibreOffice Writer, or Chrome + Excel), the task initializer should **only launch Chrome**. Do not configure the initializer to launch all programs.
- ✅ `{ "launch": "chrome" }` — Even if the task also uses LibreOffice Writer, Excel, or Pages
- ❌ `{ "launch": ["chrome", "soffice"] }` — Do not launch all apps

### Save Formats (Ubuntu/macOS)
| App | CORRECT Format | WRONG Format |
|-----|---------------|--------------|
| LibreOffice Writer | .docx | .odt |
| LibreOffice Impress | .pptx | .odp |
| LibreOffice Calc | .xlsx | .ods |
| Pages | .docx (Export To > Word) | .pages |
| Keynote | .pptx (Export To > PowerPoint) | .key |
| Numbers | .xlsx (Export To > Excel) | .numbers |

### Save Shortcuts
| OS | Shortcut |
|----|----------|
| Ubuntu/Windows | Ctrl+S |
| macOS | Cmd+S |

---

## 7. GROUND TRUTH FILES

### Critical Rules
- **One ground truth file per OS** — Do NOT reuse across Ubuntu, Windows, and macOS
- **MS Office format on Ubuntu** — Writer: .docx, Impress: .pptx, Calc: .xlsx (use File > Save As)
- **MS Office format on macOS** — Pages/Keynote/Numbers: use File > Export To > Word/PowerPoint/Excel
- **Always save before transferring** — Ctrl+S / Cmd+S
- **Verify content matches prompt exactly** — Check subproblem by subproblem
- **Check for typos** — Audit found 'COMMISION' in golden files

### Ground Truth Quality Checklist
1. Did you complete ALL requests in the prompt, not just some?
2. Did you save the file (Ctrl+S / Cmd+S)?
3. Does the file look correct and professional?
4. If modifying text, did you check for typos?
5. Does your ground truth match the prompt EXACTLY?

### Why Separate Files Per OS
Font handling, text run splitting, and rendering differ between LibreOffice and Microsoft Office. A shared golden file causes false evaluator failures. macOS also renders fonts differently (San Francisco, Helvetica Neue).

---

## 8. EVALUATOR SETUP

### Pipeline
postconfig (save/activate) → getter (extract) → comparator (check) → score (0 or 1)

### Key Rules
| Rule | Details |
|------|---------|
| expected.dest | Must have _Gold suffix (e.g., myfile_Gold.pptx) |
| result.dest | Must NOT have _Gold suffix (e.g., myfile.pptx) |
| expected.path | Your ground truth CDS URL. **NEVER** the starting file URL (causes false pass). |
| Options flags | Enable **only** the options that match what the prompt asks for. Over-enabling = false negatives. |
| ignore_blanks (DOCX) | Set to **FALSE** when prompts add, remove, or restructure paragraphs. |
| Multiple funcs | If prompt says "don't modify other content," use both funcs (e.g., compare_docx_tables + compare_docx_files). |
| Coverage mapping | Every subproblem must map to at least one evaluator check. No check = incomplete evaluator. |

### Comparator Quick Reference

#### PPTX Tasks
| Prompt Asks For | Comparator | Key Option |
|----------------|------------|------------|
| Change text | compare_pptx_files | examine_text: true |
| Change fonts | compare_pptx_files | Enable specific examine_font_* options |
| Change text color | compare_pptx_files | examine_color_rgb: true |
| Change background | compare_pptx_files | examine_background_color: true |
| Add transitions | check_transition | transition_type per slide |
| Bold/italic/underline | compare_pptx_files | examine_font_bold/italic/underline: true |
| Font size | compare_pptx_files | examine_font_size: true |
| Font family | compare_pptx_files / compare_font_names | examine_font_name: true |
| Text alignment | compare_pptx_files | examine_alignment: true |
| Speaker notes | compare_pptx_files | examine_note: true |
| Bullet/list changes | compare_pptx_files | examine_bullets: true |
| Strikethrough | compare_pptx_files | examine_strike_through: true |

#### DOCX Tasks
| Prompt Asks For | Comparator | Key Option / Note |
|----------------|------------|-------------------|
| Change text | compare_docx_files | ignore_blanks: false if adding paragraphs |
| Modify tables | compare_docx_tables + compare_docx_files | Use BOTH to verify changed + unchanged |
| Change font name | compare_font_names | Checks every text run's font.name |
| Add page numbers | has_page_numbers_in_footers | Checks footer contains a digit |
| Line spacing | compare_line_spacing | — |

#### XLSX Tasks
| Prompt Asks For | Comparator | Key Option |
|----------------|------------|------------|
| Change cell data | compare_table | rules: [{type: "sheet_data"}] |

#### Chrome Tasks
| Prompt Asks For | Comparator | Note |
|----------------|------------|------|
| Check active tab | is_expected_active_tab | _approximate variant for tracking params |
| Verify extension | is_expected_installed_extensions | Extension ID subset check |

#### VS Code Tasks
| Prompt Asks For | Comparator | Note |
|----------------|------------|------|
| Change settings | check_json_settings | Key-value pairs in settings.json |
| Install extension | is_extension_installed | Use CLI path on Windows |

#### OS Tasks
| Prompt Asks For | Comparator | Note |
|----------------|------------|------|
| GNOME settings | exact_match + gsettings get | Include exact expected output |

### NOT Verifiable (Never Include in Prompts)
- **PPTX:** animation timelines, video/audio playback, theme-only changes
- **DOCX:** font size, font color (general), font alignment, heading styles, comments, track changes, margins/columns, table positioning
- **XLSX:** charts, conditional formatting visuals, sparklines, cell comments, gradient themes
- **Chrome:** visual themes, tab pinning/grouping, password manager, extension settings
- **VS Code:** visual appearance, cursor state, debug state, Git state

---

## 9. KNOWN EVALUATOR QUIRKS

### PowerPoint Run Splitting
LibreOffice Impress and Microsoft PowerPoint handle text runs differently. LibreOffice may split a single run into multiple runs, causing "Different number of runs" errors even when the visual output is identical.
**Workaround:** Recreate the golden file in the same application the evaluator expects.

### Windows activate_window Failures
The standard activate_window postconfig frequently fails on Windows, especially for PowerPoint.
**Symptoms:** Evaluator returns 0 but ground truth file is visually correct.
**Workaround:** Replace with pygetwindow-based command:
```python
import pygetwindow as gw; import pyautogui; import time; win = gw.getWindowsWithTitle("PowerPoint")[0]; pyautogui.press("alt"); win.restore() if win.isMinimized else None; win.activate(); time.sleep(1); pyautogui.hotkey("ctrl", "s");
```

### macOS activate_window Failures
The standard activate_window postconfig does not work on macOS.
**Workaround:**
```python
import subprocess; import time; subprocess.run(['osascript', '-e', 'tell application "Microsoft PowerPoint" to activate']); time.sleep(1); import pyautogui; pyautogui.hotkey('command', 's')
```

### PowerPoint Font Size Encoding for Chart Labels
Certain chart elements encode font sizes differently.
**Symptoms:** Evaluator returns 'Font size differs: None vs 228600'
**Workaround:** Test the specific font size in the evaluator before finalizing.

### LibreOffice Calc Style Comparison Strictness
compare_calc may check cell styles even when prompt only requests content changes.
**Workaround:** Check if there's an argument to disable style comparison.

### macOS Font Rendering Differences
macOS renders fonts differently from Ubuntu and Windows, particularly for system fonts like San Francisco, Helvetica Neue, and certain CJK fonts.
**Workaround:** Always create Mac golden files on the Mac VM. Never reuse Ubuntu or Windows golden files.

---

## 10. VS CODE TASK-SPECIFIC NOTES

### Launch Commands by OS
| OS | Command |
|----|---------|
| Ubuntu | `code` |
| Windows | `C:\Users\User\AppData\Local\Programs\Microsoft VS Code\code.exe` (full path) |
| macOS | `/usr/local/bin/code` or `/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code` |

### Extension Listing by OS
| OS | Command |
|----|---------|
| Ubuntu | `code --list-extensions` |
| Windows | `cmd.exe /c code --list-extensions` (pipes don't work in command arrays) |
| macOS | `code --list-extensions` (same as Ubuntu) |

### Settings File Paths
| OS | Path |
|----|------|
| Ubuntu | `~/.config/Code/User/settings.json` |
| Windows | `C:\Users\User\AppData\Roaming\Code\User\settings.json` |
| macOS | `/Users/user/Library/Application Support/Code/User/settings.json` |

### Default Value Handling
For settings where the default already matches the desired value, use:
```python
data.get('editor.bracketPairColorization.enabled', True) == True
```
This passes even if the setting is not explicitly declared in settings.json.

### VS Code Specific Rules
- No golden files needed — VS Code tasks verify settings/extensions, not file content
- Include activate_window + save shortcut in postconfig to flush changes
- For keybinding 'when' clause ordering: Use conj: 'or' with multiple check_json_keybindings

---

## 11. CDS URL VALIDATION

- Test your CDS URL before submission
- If URL returns 403 or 404 error, the key has expired
- Contact project leads for a refreshed URL
- If you encounter an expired URL in the skeleton prompt, do NOT proceed — flag it immediately

---

## 12. ONBOARDING QUIZ ANSWERS (15 Questions, Need 12/15 = 80%)

1. **C** — Use both `compare_docx_tables` and `compare_docx_files` when prompt modifies content AND says "Table 1 must remain untouched"
2. **B** — Ordinal strings (1st, 2nd, 3rd) for tied countries, since prompt says "copy the rank string exactly as written"
3. **B** — The new CDS URL from uploading ground truth in Step 9 goes into expected.path
4. **B** — Create a separate golden file on Windows, upload it, use Windows-specific CDS URL
5. **B** — `data.get("editor.bracketPairColorization.enabled", True) == True` for default values
6. **D** — Detailed 50+ character description of what was changed and why
7. **C** — Three separate subproblems (background, titles, speaker notes) — each a distinct goal
8. **B** — Enable only `examine_font_size` and `examine_font_bold` (only what prompt requests)
9. **B** — `ignore_blanks: false` because prompt adds new paragraphs
10. **C** — Check if CDS URL expired (403/404), contact project leads for refresh
11. **C** — Add location context to disambiguate (e.g., "the label displayed directly on the chart lines")
12. **B** — Ubuntu: `/home/user/Desktop/report.docx` | Windows: `C:\Users\User\Desktop\report.docx`
13. **B** — Windows activate_window postconfig is failing; replace with pygetwindow workaround
14. **B** — Use `is_expected_installed_extensions` on both OSes; verify function is documented before switching
15. **C** — Open golden file and check every slide title, including slides 2 and 5

---

## 13. TASK UI STRUCTURE (from screenshots)

The task interface at `app.outlier.ai/expert/tasks` has these sections in the sidebar:

1. **WELCOME - READ BEFORE STARTING** — Important information for Attempters
2. **Prompt Step 1** — "Write a prompt that meets the requirements of this project"
3. **Text Collection** — Collect text inputs (feasibility, prompt changes)
4. **Prompt Step 2** — "Collect text inputs from the user for a prompt"
5. **Text Collection** — Subproblems, complexity
6. **Asset Upload** — Upload ground truth files (one per OS)
7. **Instructions** — Read evaluator options reference, general instructions
8. **Windows Configuration & Changes**
   - Review Windows-specific requirements and document changes
   - **Computer Use** — Windows VM environment
   - Collect text inputs (evaluator quality, changes made)
9. **Ubuntu Configuration & Changes** (same structure as Windows)
   - Review Ubuntu-specific requirements
   - **Computer Use** — Ubuntu VM environment
   - Collect text inputs
10. **Final Checklist** — Quality confirmation, issue reporting

### Task Initializer in Computer Use Step
- **Task Project Name** field — enter the initializer name
- **Input** field — JSON config (usually `{}` for create-from-scratch tasks)
- **Execute Task Initializer** button — launches the app in the VM
- **Verifier** section below — paste evaluator JSON, click Execute Verifier

### Asset Upload Section
- Upload ground truth files here
- Click the **link/chain icon** next to each uploaded file to get its CDS URL
- Each OS needs its own uploaded file with a unique CDS URL

---

## 14. REAL TASK CASE STUDY: 69bc921cf6b3f2d10d466ef9

### Task Details
- **Type:** Create-from-scratch DOCX document
- **App:** Chrome + Word/LibreOffice Writer
- **Task Project Name:** chrome_office
- **Verifier:** compare_docx_files
- **Starting file:** None (blank)
- **Status:** Revision task (previous attempter scored 2/5 for Instruction Following)

### Why Previous Attempt Failed
1. **Prompt was not deterministic** — "write 2-3 sentences summarizing" allows multiple valid outputs
2. **"such as" allowed multiple interpretations** — of which quantitative figures to include
3. **Metadata fields not specified** — "extract metadata" doesn't say which fields
4. **Subproblems not self-contained** — Referenced things not in the prompt

### Our Fix
1. Embedded all paper data directly in the prompt (no live arXiv visits)
2. Changed "write 2-3 sentences summarizing" → "copy the first two sentences of the abstract exactly"
3. Specified exact template: quoted title, author et al., arXiv ID, submission date, journal ref
4. Made prompt time-invariant by removing web fetching dependency

### Verified Paper Metadata (from arXiv screenshots in VM)
| Paper | Title | First Author | Date | Journal Ref |
|-------|-------|-------------|------|-------------|
| 2207.06431 | Suppressing quantum errors by scaling a surface code logical qubit | Acharya | 13 Jul 2022 | Nature 614 (2023) 678-681 |
| 2408.13687 | Quantum error correction below the surface code threshold | Acharya | 24 Aug 2024 | Nature 638 (2025) 920-926 |
| 2312.03982 | Logical quantum processor based on reconfigurable atom arrays | Bluvstein | 7 Dec 2023 | Nature (2023) |
| 2406.02501 | The computational power of random quantum circuits in arbitrary geometries | DeCross | 4 Jun 2024 | Physical Review X 15, 021052 (2025) |
| 2306.14887 | Efficient tensor network simulation of IBM's Eagle kicked Ising experiment | Tindall | 26 Jun 2023 | PRX Quantum 5, 010308 (2024) |
| 2404.16728 | High-fidelity and Fault-tolerant Teleportation of a Logical Qubit using Transversal Gates and Lattice Surgery on a Trapped-ion Quantum Computer | Ryan-Anderson | 25 Apr 2024 | **None listed on arXiv** |

### CDS URLs Used
- **Windows:** `scale-cds://65cbc42b32ffab95dd54b864/4LCRt1HhgcHJPsX#s3/scale-cds-public-us-west-2`
- **Ubuntu:** `scale-cds://65cbc42b32ffab95dd54b864/3cRL_9_HVvo9Ohe#s3/scale-cds-public-us-west-2`

### Evaluator JSONs Used

**Windows:**
```json
{
  "func": "compare_docx_files",
  "expected": {
    "path": "scale-cds://65cbc42b32ffab95dd54b864/4LCRt1HhgcHJPsX#s3/scale-cds-public-us-west-2",
    "dest": "quantum_computing_breakthroughs_Gold.docx"
  },
  "result": {
    "dest": "quantum_computing_breakthroughs.docx"
  },
  "options": {
    "examine_text": true,
    "ignore_blanks": false
  },
  "postconfig": "activate_window('quantum_computing_breakthroughs - Word')"
}
```

**Ubuntu:**
```json
{
  "func": "compare_docx_files",
  "expected": {
    "path": "scale-cds://65cbc42b32ffab95dd54b864/3cRL_9_HVvo9Ohe#s3/scale-cds-public-us-west-2",
    "dest": "quantum_computing_breakthroughs_Gold.docx"
  },
  "result": {
    "dest": "quantum_computing_breakthroughs.docx"
  },
  "options": {
    "examine_text": true,
    "ignore_blanks": false
  },
  "postconfig": "activate_window('quantum_computing_breakthroughs.docx - LibreOffice Writer')"
}
```

### Issues Encountered
1. **Verifier failed to execute** on both Windows and Ubuntu — output was `{}` and "Failed to run verifier"
2. **Windows VM username was `Docker`** not `User` — path was `C:\Users\Docker\Desktop\`
3. **Paper 6 had no journal reference on arXiv** — had to handle missing field
4. **Paper 3 journal ref was just `Nature (2023)`** — no volume/page numbers
5. **Time-invariance checker flagged live arXiv fetching** — had to embed all data in prompt

### Lessons Learned
1. Always verify the actual VM username (Docker vs User)
2. Always check each arXiv page for journal ref — some don't have one
3. The verifier infrastructure can be broken — save and move on if stuck
4. Task Project Name from skeleton (`chrome_office`) must be respected — changing it may break the verifier
5. Embedding data in the prompt solves time-invariance issues
6. "copy the first two sentences exactly" is deterministic; "write 2-3 sentences summarizing" is not

---

## 15. COMMON MISTAKES (From 250+ Audited Tasks)

### Critical Severity
| Error | Freq | How to Avoid |
|-------|------|-------------|
| ignore_blanks not set to false when adding paragraphs | Med | Set to false whenever prompt adds/removes/restructures paragraphs |
| Missing evaluator options for prompt requirements | Med | Enable only options matching prompt. Map each subproblem to a check. |
| Gold file identical to starting file (forgot to save) | Low | Always Ctrl+S / Cmd+S before transferring from VM |
| expected.dest missing _Gold suffix | Low | Always: expected.dest = filename_Gold.ext |
| Empty config or evaluator blocks submitted | Low | Always fill these in; check all OSes |
| expected.path uses starting file URL instead of ground truth | Med | ALWAYS verify expected.path differs from config download URL |
| Evaluator missing checks for stated prompt requirements | High | Map each subproblem to evaluator check |
| Golden file content does not match prompt | Med | Verify golden file subproblem-by-subproblem |
| CDS URL expired | Low | Test URL before submission. If 403/404, contact leads. |
| Mac golden file in .pages/.key/.numbers format | Med | Export as .docx/.pptx/.xlsx via File > Export To |

### High Severity
| Error | Freq | How to Avoid |
|-------|------|-------------|
| prompt_changed marked FALSE when prompt was modified | High | If you changed ANYTHING, mark as TRUE |
| Subproblems list UI actions instead of goals | High | Each subproblem = a verifiable outcome |
| Skeleton prompt used without rewriting | High | Always rewrite for naturalness |
| Shared golden file URL across OSes | Med | Each OS must have its own golden file |
| Wrong evaluator function name for OS | Med | Verify against documentation per OS |
| Wrong Task Initializer name for OS | Med | Use exact name; change when switching OSes |
| Paths not pointing to Desktop | Med | Ubuntu: /home/user/Desktop/ etc. |
| Typos in ground truth files | Med | Triple-check spelling |

### Medium Severity
| Error | Freq | How to Avoid |
|-------|------|-------------|
| Vague prompt_changes_made description | V.High | Write detailed descriptions (50+ chars min) |
| Wrong complexity for number of subproblems | High | 2-3=Medium, 4-5=Hard, 6+=Very Hard |
| Typos in subproblem column/field names | Med | Copy-paste from source file |

---

## 16. EVALUATOR COVERAGE MAP TEMPLATE

```
Subproblem 1: [description] → func: [function name] | option: [option=true/false]
Subproblem 2: [description] → func: [function name] | option: [option=true/false]
Subproblem 3: [description] → func: [function name] | option: [option=true/false]
Subproblem 4: [description] → func: [function name] | option: [option=true/false]
```

If any subproblem has no evaluator coverage, the evaluator is **INCOMPLETE**. Add the missing check before submission.

### Top 3 Evaluator Failures (from audits)
1. Missing evaluator checks for prompt requirements (23% of flagged tasks)
2. Golden file does not match prompt (15%)
3. expected.path pointing to original file (8%)

---

## 17. PRE-SUBMISSION CHECKLIST

- [ ] **PROMPT:** Natural, specific, verifiable, time-invariant? prompt_changes_made has 50+ chars with specifics?
- [ ] **ANALYSIS:** Feasibility correct? Subproblems are goals (not steps)? Complexity matches subproblem count?
- [ ] **CONFIG:** CDS URL valid (not expired/403)? Paths point to Desktop? Task Initializer matches OS?
- [ ] **EVALUATOR:** Returns 1? Uses ground truth URL (NOT starting file)? Options match prompt? All subproblems mapped?
- [ ] **GROUND TRUTH:** File saved in VM? MS Office format on Ubuntu (.docx/.pptx/.xlsx)? Matches prompt exactly? No typos?
- [ ] **CROSS-OS:** Separate golden files per OS (all three)? Function names verified per platform? All OSes pass?
