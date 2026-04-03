# Subproblem Decomposition

Break a rewritten prompt into atomic, verifiable subproblems.

## Instructions

Given a rewritten prompt, decompose it into subproblems:

1. **Read the prompt** and identify every distinct action or state change
2. **Create subproblems** where each one is:
   - One atomic action (not compound)
   - Independently verifiable (you can check it without checking others)
   - Ordered in logical execution sequence
3. **For each subproblem**, note:
   - What comparator(s) could verify it (see `docs/comparators.md`)
   - Whether it differs across OSes

### Output format:

```
Subproblem 1: [description]
  Comparator: [suggested comparator]
  OS-specific: Yes/No — [details if yes]

Subproblem 2: [description]
  Comparator: [suggested comparator]
  OS-specific: Yes/No — [details if yes]
...
```

### Rules:
- Don't create subproblems for things the config/postconfig handles (e.g., "open the app")
- Each subproblem = one thing the MODEL must do, not setup
- If a prompt says "create a table with 5 columns", that's ONE subproblem, not five

$ARGUMENTS
