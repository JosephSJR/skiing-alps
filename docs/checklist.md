# Pre-Submission Checklist

Run through every item before submitting. Mark pass or fail.

---

## PROMPT
- [ ] Is the prompt natural, specific, and verifiable?
- [ ] Are all Core Requests preserved (same number and type)?
- [ ] Are prompt changes documented in detail (50+ characters)?
- [ ] Edge Case Checklist verified (duplicate text, etc.)?
- [ ] Skeleton rewritten (not used verbatim)?
- [ ] No "dropdown" language? (must say "list with values X, Y, Z")
- [ ] No decimal/whole-number "between" range validations? (must use custom formula like `=AND(cell>=min,cell<=max)`)
- [ ] If interleave language is present, does it NOT contradict positional references in paragraph text?

## SUBPROBLEMS
- [ ] Subproblems are distinct goals (not UI steps)?
- [ ] All column/field names verified against actual file?
- [ ] Complexity matches: 2-3 = Med, 4-5 = Hard, 6+ = Very Hard?
- [ ] Minimum of 2 subproblems?

## CONFIG
- [ ] CDS URL tested and not expired?
- [ ] Task Initializer matches Task Project Name?
- [ ] File path uses correct OS pattern (`/home/user/Desktop/` vs `C:\Users\User\Desktop\` vs `/Users/user/Desktop/`)?

## EVALUATOR
- [ ] Returns 1 (pass) when run?
- [ ] `expected.path` = ground truth URL?
- [ ] `expected.dest` has `_Gold` suffix; `result.dest` does NOT?
- [ ] Each subproblem mapped to an evaluator check?
- [ ] `ignore_blanks` = false if adding/removing paragraphs?
- [ ] Postconfig uses correct save shortcut for OS (`Ctrl+S` on Ubuntu/Windows, `Cmd+S` on macOS)?

## UBUNTU
- [ ] Task Initializer uses `libreoffice_*`? (or Chrome launch for chrome_office tasks)
- [ ] `window_name` includes extension (e.g. `report.pptx - LibreOffice Impress`)?
- [ ] Saved as `.docx`/`.pptx`/`.xlsx` (NOT `.odt`/`.odp`/`.ods`)?
- [ ] Separate golden file uploaded for Ubuntu?

## WINDOWS
- [ ] Task Initializer uses `word`/`powerpoint`/`excel`? (or Chrome launch for chrome_office tasks)
- [ ] `window_name` omits extension (e.g. `report - PowerPoint`)?
- [ ] `activate_window` postconfig tested?
- [ ] VS Code uses full path for launch command?
- [ ] Separate golden file uploaded for Windows?

## macOS
- [ ] Task Initializer uses `keynote`/`pages`/`numbers` (Apple apps) or `word`/`powerpoint`/`excel` (MS Office for Mac)?
- [ ] `window_name` uses `filename.ext` for Office for Mac (e.g. `report.pptx`) or `filename` only for Apple apps (e.g. `report`)?
- [ ] Exported as `.docx`/`.pptx`/`.xlsx` (NOT `.pages`/`.key`/`.numbers`)?
- [ ] `osascript` + `pyautogui.hotkey("command", "s")` used in postconfig (not standard `activate_window`)?
- [ ] File path uses `/Users/user/Desktop/`?
- [ ] Separate golden file uploaded for macOS?

## CROSS-OS
- [ ] All required OSes pass (evaluator returns 1)?
- [ ] Separate golden file URLs per OS — none shared?
- [ ] Correct `window_name` format verified per OS?
- [ ] Correct Task Initializer verified per OS?

## NAVIGATION EVIDENCE (for Chrome/browser tasks)
- [ ] `navigation_steps.md` has first-person text block of steps taken?
- [ ] Navigation GIF or screenshots captured?
- [ ] All URLs listed?

## DELIVERABLES
- [ ] `rewritten_prompt.md`
- [ ] `feasibility.md`
- [ ] `subproblems.md`
- [ ] `config_<os>.json` for each required OS
- [ ] `evaluator_<os>.json` for each required OS
- [ ] `VM_walkthrough.md`
- [ ] `navigation_steps.md` (for Chrome/browser tasks)
- [ ] `prompt_changes_made.txt`
