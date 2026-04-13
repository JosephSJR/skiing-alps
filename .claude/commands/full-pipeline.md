# Full Pipeline

Run the complete Skiing Alps task pipeline from skeleton prompt to final submission.

## Arguments Format

The user provides arguments as: `<task-id> <skeleton prompt text>`

Example: `/full-pipeline TASK-042 Create a spreadsheet that tracks monthly expenses...`

The first word is the task ID. Everything after it is the skeleton prompt.

## Step 0 — Task Setup (DO THIS FIRST, AUTOMATICALLY)

Parse `$ARGUMENTS`:
- Extract the **task ID** (first word)
- Extract the **skeleton prompt** (everything after the first word)

Then **immediately** (no asking the user):

1. Get today's date in `YYYY-MM-DD` format
2. Create the task folder: `tasks/<date>/<task-id>/`
3. Create `tasks/<date>/<task-id>/skeleton_prompt.md` with this content:

```markdown
# Skeleton Prompt

**Task ID:** <task-id>
**Date:** <date>
**Status:** In Progress

---

<skeleton prompt text exactly as provided>
```

4. Confirm to the user:
> "Created task folder: `tasks/<date>/<task-id>/`
> Skeleton prompt saved to `skeleton_prompt.md`"

Then proceed to Step 1.

## Step 1 — Prompt Rewrite

Using the skeleton prompt saved in Step 0, rewrite it following the Prompt Rewriting rules in CLAUDE.md.

**Critical:** The rewrite preserves the skeleton's intent exactly. Only improve naturalness, clarity, and verifiability. Do NOT fix feasibility issues here — that happens in Step 2. Do NOT add, remove, or alter core requests (unless the skeleton has only 1, in which case you may add a second to meet the minimum).

Count core requests, show the rewritten prompt, list changes made (including "Preserved all X Core Requests."), and ask for approval before continuing.

**Save to file:** `tasks/<date>/<task-id>/rewritten_prompt.md` with:
- The rewritten prompt text
- Core request count
- A "Why the Skeleton Needed Changes" section explaining the problems with the original
- A numbered changes table (change, category: naturalness/clarity/verifiability, why)
- **CRITICAL: The changes table must account for EVERY difference between the skeleton and rewritten prompt.** This includes additions (e.g., file name/path added), removals (e.g., expectation sentence removed), and modifications (e.g., capitalization changes). If you diff the skeleton vs the rewrite and find a difference not listed in the table, the audit will fail.

**Also generate `tasks/<date>/<task-id>/prompt_changes_made.txt`** and **show its full content in the response** so the user can immediately copy-paste it into the UI "Why was the prompt Changed" field. Do NOT just save it silently.

## Step 1.5 — Execute & Validate Prompt

After rewriting the prompt and getting user approval, **actually perform the task yourself** to validate that the prompt is correct, complete, and feasible.

**What to do:**
1. Read the rewritten prompt as if you are a model seeing it for the first time
2. Execute every instruction in the prompt hands-on. **The output files must look exactly like a human built them in the real app — not like a script dumped values into a file.** That means real formulas, real structure, real styles, not hardcoded computed results.
   - **Spreadsheet tasks (.xlsx):**
     - Use `openpyxl` (or drive LibreOffice/Excel directly). **Never use pandas to write the final file** — pandas flattens formulas to plain values and strips styles.
     - If the prompt says to compute something (sum, average, lookup, conditional, etc.), the cell MUST contain the actual Excel formula (e.g., `=SUM(B2:B10)`, `=VLOOKUP(...)`, `=IF(...)`) — not the pre-computed number.
     - Preserve and author real structure: merged cells, column widths, number formats, conditional formatting, data validation (as list/custom formula per team rules), named ranges, cell styles, borders, fills.
     - When opening an existing file to modify it, load with `openpyxl.load_workbook(path)` (default `data_only=False`) so existing formulas survive. Never round-trip through pandas.
     - After saving, re-open the file and verify: formulas are still formulas (check `cell.value` starts with `=`), styles survived, and the file opens cleanly in LibreOffice/Excel.
   - **Document tasks (.docx):**
     - Use `python-docx` (or drive Word/LibreOffice Writer directly). Produce real docx structure: headings with heading styles, real tables (not tab-separated text), real bullet/numbered lists, real bold/italic runs, real page breaks, real headers/footers.
     - Never emit a plain-text file renamed to `.docx`. Never paste a whole table as one text blob.
     - Match the exact paragraph/table order the prompt describes, and respect any interleave language.
   - **Browser/Chrome tasks:** use browser automation tools to navigate to the URLs, extract data, and perform the required actions. Capture screenshots and the GIF as described below.
   - **Multi-app tasks:** execute each app's portion with the rules above.
3. Document what happened during execution:
   - Did every step work as described?
   - Were any instructions ambiguous when you actually tried to follow them?
   - Did you have to make assumptions the prompt didn't cover?
   - Did any data lookups return unexpected results (zero rows, missing columns, etc.)?
   - **Did the resulting file look human-authored?** Open it and check: formulas are live, styles are present, structure is real. If not, redo it before moving on.

**After execution, re-evaluate the prompt:**
- If execution revealed **no issues**: confirm the prompt is validated and proceed
- If execution revealed **ambiguities or gaps**: rewrite the affected parts of the prompt, update `rewritten_prompt.md` and regenerate `prompt_changes_made.txt`, then show the user what changed and why
- If execution revealed **infeasibility**: flag it (this feeds into Step 2's feasibility check)

**Save to file:** `tasks/<date>/<task-id>/execution_validation.md` with:
- What you executed and how
- Issues discovered (if any)
- Prompt changes made as a result (if any)
- Confirmation that the prompt accurately describes an achievable task

**The output artifacts from this execution become the basis for the VM walkthrough and ground truth in later steps — so they must be production-quality, human-authored-looking files, not script dumps.**

**Navigation evidence (for Chrome/browser tasks):**
During execution, create a `tasks/<date>/<task-id>/navigation_steps/` folder and:
1. **Take screenshots** of every website/page visited during execution — save as evidence
2. **Write `navigation_steps.txt`** — a single block paragraph (no bullets, no numbered lists) written in first person describing every URL visited and action taken. Example: "I opened Chrome and went to patents.google.com/patent/US8398692B2, on the page I found the title at the top, then looked at the right sidebar where it shows the Inventor, Current Assignee..."
3. This text gets pasted into the UI "Navigation Steps" field and the screenshots get uploaded to the "Files/PDFs Used" field

## Step 2 — Feasibility Check
For each OS (macOS, Windows, Ubuntu), verify:
- The required apps exist on that OS
- The file formats are supported
- The task is achievable with the available tools

Flag any OS where the task is NOT feasible and explain why. **This is where feasibility removals or adjustments happen** — not in Step 1.

**Custom prompt check:** For each feasible OS, determine whether the task needs a custom/OS-specific prompt or if the default rewritten prompt works for all. Record as a table:

| OS | Custom prompt needed? | Reasoning |
|---|---|---|

Common reasons a custom prompt IS needed: different app names (e.g., "use LibreOffice Writer" vs "use Microsoft Word"), different save workflows (e.g., "File > Save As > .xlsx" on Ubuntu vs "Ctrl+S" on Windows), OS-specific UI differences that would confuse the model.

If custom prompt = Yes, generate the OS-specific prompt variant and use it in that OS's config JSON instead of the default.

**Save to file:** `tasks/<date>/<task-id>/feasibility.md` with the per-OS results table, team rules checks, and custom prompt check table.

## Step 3 — Subproblem Decomposition
Break the rewritten prompt into atomic subproblems. Each subproblem should be:
- One clear action
- Independently verifiable
- Ordered logically

**CRITICAL: Every distinct instruction in the rewritten prompt must map to at least one subproblem.** Re-read the prompt sentence by sentence and verify nothing is missing — including "open the file", "save the file", file locations, etc. If the prompt says to do it, there must be a subproblem for it.

## Step 4 — Complexity Rating
Based on the subproblems, rate the task:
- **Easy**: 1-2 subproblems, straightforward actions
- **Medium**: 3-5 subproblems, some reasoning required
- **Hard**: 6+ subproblems, multi-step reasoning, cross-app work

**Save Steps 3+4 to file:** `tasks/<date>/<task-id>/subproblems.md` with the subproblem table and complexity rating.

## Step 5 — Config Generation
Generate config JSONs for all feasible OSes. Use templates from `templates/config.md` and OS-specific paths from `docs/os-reference.md`.

Save to `tasks/<date>/<task-id>/config_<os>.json`.

## Step 5.5 — VM Walkthrough

Generate `tasks/<date>/<task-id>/VM_walkthrough.md` — a step-by-step guide for what to do inside each VM to create the ground truth. This file is derived from the subproblems and config, written in plain human language.

Structure:
- Split into sections: `## Ubuntu VM`, `## Windows VM`, `## macOS VM` (only include feasible OSes)
- For each OS, list the exact steps to perform (e.g., "Open the file, go to slide 3, change the background color to navy blue #000080")
- Include OS-specific instructions where they differ (e.g., save format differences)
- Add reminders:
  - Ubuntu LibreOffice must Save As .docx/.pptx/.xlsx format
  - macOS Pages/Keynote/Numbers must Export To MS Office format
  - Windows can just Ctrl+S
  - Save before transferring the file
  - Each OS needs its own separate ground truth file — never reuse across OSes

Also copy to `output/<task-id>/VM_walkthrough.md` for easy access.

## PAUSE — VM Work (Sequential: Windows → Ubuntu → macOS)

**VMs arrive one at a time**, not all at once. The order is Windows → Ubuntu → macOS.

For EACH VM as it arrives:
1. Give the user the config JSON + VM walkthrough section for that OS
2. User does the manual task in the VM
3. User uploads ground truth and provides CDS URL
4. **Immediately generate the evaluator for that OS** (don't wait for all VMs)
5. User submits the evaluator, verifies it works
6. Move to the next OS

Update `skeleton_prompt.md` status to `Awaiting Ground Truth`.

## Step 6 — Evaluator Generation (Per OS, as CDS URLs arrive)
When the user provides a CDS URL for an OS, immediately generate that OS's evaluator using `templates/evaluator.md` and `docs/comparators.md`.

**Format:** Must be a JSON array `[{type, postconfig, result, expected, func, options}]` — NOT the subproblems/comparators format. See `templates/evaluator.md`.

Save to `tasks/<date>/<task-id>/evaluator_<os>.json`.

## Step 7 — Cross-OS Check
Compare all configs and evaluators across OSes. Verify:
- Same number of subproblems
- Equivalent comparators (adjusted for OS-specific paths/apps)
- Consistent scoring weights

## Step 6.5 — Apply Team Rules to Evaluators
After generating evaluators, verify they comply with `docs/team-rules.md`:
- `compare_docx_files` comparators have `ignore_blanks: false` + `delete_empty_lines: true` (unless paragraph order doesn't matter)
- `sheet_data` comparators have `precision: 15`
- Documents with both paragraphs and tables use separate `compare_docx_files` + `compare_docx_tables` comparators

## Step 8 — Pre-Submission Audit
Run the checklist from `docs/checklist.md` AND verify team rules from `docs/team-rules.md`. Flag any issues. If all clear:
1. Copy ALL final deliverables to `output/<task-id>/`:
   - `rewritten_prompt.md`
   - `feasibility.md`
   - `subproblems.md`
   - `config_<os>.json` for each feasible OS
   - `evaluator_<os>.json` for each feasible OS
   - `VM_walkthrough.md`
2. Update `skeleton_prompt.md` status to `Submitted`

$ARGUMENTS
