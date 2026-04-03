# Task: [TASK_ID]
# Created: [DATE]

## Input from Skeleton
```
Skeleton Prompt: [PASTE HERE]
File name: [PASTE]
Locally downloadable URL: [PASTE]
CDS file URL: [PASTE]
Verifier function: [PASTE]
Task Project Name: [PASTE]
```

## Step 1: Prompt Analysis
- **Core Requests identified:** [LIST THEM]
- **Feasibility:** Yes / No (reason: )
- **Has starting file:** Yes / No
- **Real-time data required:** Yes / No (if yes, FAIL)
- **Time-invariant:** Yes / No

## Step 2: Rewritten Prompt
```
[PASTE YOUR REWRITTEN PROMPT HERE]
```

## Step 3: Prompt Changes Made
```
[50+ CHAR DESCRIPTION OF CHANGES]
```

## Step 4: Subproblems
1. [SUBPROBLEM 1]
2. [SUBPROBLEM 2]
3. [SUBPROBLEM 3]
4. [SUBPROBLEM 4 if needed]

**Complexity:** Medium (2-3) / Hard (4-5) / Very Hard (6+)

## Step 5: Ground Truth Notes
- What to create: [DESCRIPTION]
- Key values to verify: [LIST]
- Special characters/formatting: [LIST]

## Step 6: CDS URLs (from Asset Upload)
- **Windows:** [CDS URL]
- **Ubuntu:** [CDS URL]
- **macOS:** [CDS URL]

## Step 7: Evaluator Coverage Map
```
SP1: [description] → func: [name] | option: [option=true/false]
SP2: [description] → func: [name] | option: [option=true/false]
SP3: [description] → func: [name] | option: [option=true/false]
SP4: [description] → func: [name] | option: [option=true/false]
```

## Step 8: Pre-Submission Checklist
- [ ] Prompt: Natural, specific, verifiable, time-invariant?
- [ ] prompt_changes_made has 50+ chars with specifics?
- [ ] Subproblems are goals (not UI steps)?
- [ ] Complexity matches subproblem count?
- [ ] CDS URLs valid (not expired/403)?
- [ ] Separate golden files per OS?
- [ ] expected.path = ground truth URL (NOT starting file)?
- [ ] expected.dest has _Gold suffix?
- [ ] result.dest does NOT have _Gold suffix?
- [ ] Options match only what prompt asks?
- [ ] ignore_blanks=false if adding/removing paragraphs?
- [ ] Window names correct per OS?
- [ ] Task Initializer correct per OS?
- [ ] Evaluator returns 1 on all OSes?
- [ ] All subproblems mapped to evaluator checks?
