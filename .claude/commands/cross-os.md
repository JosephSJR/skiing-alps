# Cross-OS Consistency Check

Verify consistency across all OS configs and evaluators.

## Instructions

Compare the config and evaluator JSONs across macOS, Windows, and Ubuntu.

### Check configs:
1. Same task description / prompt across all OSes
2. Equivalent pre-installed files (same content, OS-appropriate paths)
3. Postconfig commands achieve the same end state
4. App names are correctly mapped per OS

### Check evaluators:
1. Same number of subproblems across all OSes
2. Equivalent comparators (same type, adjusted for OS paths)
3. Scoring weights are identical across OSes
4. CDS URLs are OS-specific where needed (e.g., different ground truth for different apps)
5. Thresholds are consistent

### Common issues to flag:
- Path format mismatch (forward vs backslash)
- Missing OS variant (e.g., evaluator exists for macOS but not Ubuntu)
- Different comparator types for the same subproblem across OSes
- Weight sums ≠ 1.0

### Output:
```
Cross-OS Check Results:
  Configs:    ✅ Consistent / ❌ Issues found
  Evaluators: ✅ Consistent / ❌ Issues found

Issues:
  - [issue description]
  - [issue description]
```

$ARGUMENTS
