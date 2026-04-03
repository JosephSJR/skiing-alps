# Prompt Rewriting Rules

## The Three Golden Rules (Violation = Rejection)
1. **NATURALNESS** — Must sound like a real person, not a task list
2. **VERIFIABILITY** — Every change must be testable by an evaluator function
3. **TIME-INVARIANCE** — Same output expected regardless of when task is run

## Naturalness Checklist
- [ ] Add context/backstory (WHY the person needs this)
- [ ] Use conversational tone ("Can you...", "I need...", "Hey, I'm working on...")
- [ ] Remove robotic language ("In the document, change X to Y")
- [ ] Keep specific targets (slide numbers, cell references, exact values)
- [ ] Maintain same NUMBER and TYPE of Core Requests from skeleton

## Verifiability Checklist
- [ ] No vague words: "some", "appropriate", "relevant", "a few", "such as"
- [ ] No open-ended tasks: "write 2-3 sentences summarizing" (how many? what content?)
- [ ] Every value is exact: colors have hex codes, fonts have names, numbers are precise
- [ ] Every location is specific: slide number, cell reference, paragraph number
- [ ] Template-driven where possible: provide exact text to insert/copy

## Time-Invariance Checklist
- [ ] No live web fetching required (embed data in prompt if needed)
- [ ] No "current" or "today" or "real-time" data
- [ ] Historical/static data only
- [ ] All required content provided directly in the prompt

## Determinism Checklist
- [ ] Only ONE valid output is possible
- [ ] No "such as" allowing multiple valid interpretations
- [ ] Exact text strings provided for any text that must appear
- [ ] If summarizing, provide the exact summary text (don't let agent write it)

## Edge Cases to Check Before Finalizing
1. Is any referenced text already formatted as requested? (e.g., text already bold)
2. Does any referenced text appear more than once? Add location context
3. For cell references: is "A4=A2" a value or a formula? Be explicit
4. For Chrome/browser tasks: specify exact settings values, not just "enable protection"
5. No real-time queries (weather, stock prices, live data) = FAIL

## BAD vs GOOD Examples
| BAD (Robot-like) | GOOD (Natural) |
|---|---|
| "In the document, find Apple and replace with Orange and bold it." | "I have decided to rebrand this memo. Can you swap every mention of Apple with Orange and make sure each instance is bolded? We need this for the client meeting tomorrow." |
| "Make this document look more professional." | "Change the body font to Noto Sans, 12pt, and set all headings to bold, 14pt." |
| "Add some text at the very start of the document" | "Insert a new paragraph as the first line of the document body, after the header: Confidential Draft" |
| "Write 2-3 sentences summarizing the paper" | "Copy the first two sentences of the abstract exactly as they appear" |

## prompt_changes_made Requirements
- MINIMUM 50 characters
- Must reference SPECIFIC changes and rationale
- BAD: "Just minor tweaks to make it sound natural."
- BAD: "asd"
- GOOD: "Rewrote skeleton for naturalness. Changed target from all slides to slides 2-5. Removed infeasible Core Request (insert watermark) since LibreOffice Impress does not support this natively. Added context backstory about teacher preparing class materials."
