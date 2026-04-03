# Prompt Rewrite

Rewrite a skeleton prompt into a clear, unambiguous, grounded task prompt while preserving the original intent exactly.

## Instructions

The user will provide a skeleton prompt and optional metadata. Your job:

1. **Read the skeleton** carefully. Identify:
   - What app(s) are involved
   - What the end state should be
   - Any ambiguous references (e.g., "the file", "the spreadsheet")
   - Count the **core requests** (distinct things the task asks the model to do/produce)

2. **Rewrite** following these rules:

### Rules

- **Intent is sacred.** Preserve every core request from the skeleton — same number, same type, same meaning.
- Only improve three things: **naturalness** (add backstory, conversational tone), **clarity** (resolve ambiguous references to exact elements/values/locations), and **verifiability** (ensure every request can be tested by an evaluator).
- Never add, remove, or alter what the task is asking for. Do not change the target values, elements, or outcomes.
- Feasibility removals happen ONLY in Step 2 (Feasibility Check), not during the rewrite.
- If the skeleton has only 1 core request, you MAY add a second one to meet the minimum 2 subproblems — this is the only exception to "don't add requests."
- Do NOT use AI tools (ChatGPT etc.) for written portions — this gets flagged.
- Do NOT include instructions on HOW to do it — only WHAT the end state should be.
- Remove ambiguity — every noun must refer to exactly one thing.
- Include explicit file paths, sheet names, cell references where applicable.
- Specify exact values, colors, dimensions when the skeleton implies them.
- Use imperative mood ("Create a file...", "Set the value of cell A1 to...").
- The prompt must be self-contained — achievable without seeing the skeleton.
- `prompt_changes_made` must be 50+ characters, describe every specific change, and include "Preserved all X Core Requests."

### Team Rules (from `docs/team-rules.md`)

Apply these during rewrite when relevant:
- **Spreadsheet numbers**: Say "plain numbers" or just "numbers". NEVER write "no commas".
- **Rounding**: If the task involves rounding, add "trailing zeros are acceptable" or rephrase as "have the values at an exact precision of X decimal places".
- **Freeze row/pane**: Remove any freeze row/pane requirements from the prompt entirely.
- **Paragraphs + tables in documents**: If the doc has both, append interleave language — but ensure it does NOT contradict any positional references in the paragraph text (e.g., "Table 1 below"). If paragraph text references a table's position, either remove the positional reference or constrain the interleave language to match (e.g., "place each table right after its describing paragraph").
- **Data validation — no "dropdown"**: NEVER use the word "dropdown" in prompts. OSWorld cannot verify dropdown rendering. Say "a list with values X, Y, Z" instead.
- **Data validation — no "between" ranges**: OSWorld cannot distinguish "between" from "not between" for decimal/whole-number validations. Replace with custom formula validations: e.g., `=AND(B6>=0,B6<=20)` instead of "decimal between 0 and 20". For whole numbers add `INT()`: `=AND(B8>=7,B8<=206,B8=INT(B8))`. For decimal precision add `ROUND()`: `=AND(B7>=0,B7<=25,B7=ROUND(B7,2))`.

3. **Show the rewritten prompt** along with:
   - A list of changes made (what was clarified, what backstory was added, etc.)
   - Confirmation: "Preserved all X Core Requests."
   - Ask for approval or revision.

4. If the user provides feedback, revise and show again.

### Example

**Skeleton:** "Make a spreadsheet that calculates tax"

**Rewrite:** "I'm preparing my quarterly tax estimates and need a quick calculator. Create a spreadsheet named 'tax_calculator.xlsx' on the Desktop with a single sheet named 'Tax Calculator'. Cell A1 should contain the label 'Income', B1 should contain the label 'Tax Rate', and C1 should contain the label 'Tax Owed'. Cell A2 should be left empty for income input, B2 should contain the value 0.25, and C2 should contain a formula that multiplies A2 by B2."

**Changes:** Added backstory for naturalness. Resolved "spreadsheet" to explicit filename 'tax_calculator.xlsx' on Desktop. Resolved "calculates tax" to specific cells, labels, values, and formula. Preserved all 1 Core Requests (create a tax calculation spreadsheet). Added a second implicit subproblem (formula in C2) for verifiability.

$ARGUMENTS
