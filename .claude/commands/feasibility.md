# Feasibility Check

Check whether a task is feasible on each target OS.

## Instructions

Given a rewritten prompt (or skeleton prompt), evaluate feasibility on all three OSes:

### For each OS (macOS, Windows, Ubuntu):

1. **App availability**: Do the required applications exist on this OS?
   - Check `docs/os-reference.md` for the OS-specific app names
   - If an app doesn't exist on an OS, flag it

2. **File format support**: Are the file formats supported by the OS's apps?
   - e.g., `.numbers` is macOS-only, `.xlsx` works everywhere

3. **Feature parity**: Can the specific features used in the task be done on all OSes?
   - e.g., some Excel features don't exist in LibreOffice Calc

4. **Path validity**: Are all file paths valid for the OS?

5. **Known infeasible patterns** (from `docs/team-rules.md`):
   - **Chart creation in spreadsheets**: Charts cannot be reliably evaluated — flag as infeasible
   - **Changing/live data sources**: If the task relies on data that changes over time (live stock prices, weather, real-time APIs), flag as infeasible. Either alter to use a static snapshot or mark infeasible.
   - **Data validation with "dropdown"**: OSWorld cannot verify dropdown rendering — rewrite to use "list" language instead. Flag if prompt says "dropdown".
   - **Data validation with "between" range**: OSWorld cannot distinguish "between" from "not between" operators — rewrite to use custom formula validations. Flag if prompt uses decimal/whole-number between-range validations.

### Output format:

```
macOS:   ✅ Feasible / ❌ Not feasible — [reason]
Windows: ✅ Feasible / ❌ Not feasible — [reason]
Ubuntu:  ✅ Feasible / ❌ Not feasible — [reason]
```

If any OS is not feasible, suggest alternatives or modifications.

6. **Custom prompt check**: For each feasible OS, determine if a custom/OS-specific prompt is needed or if the default rewritten prompt works.

| OS | Custom prompt needed? | Reasoning |
|---|---|---|

Common reasons for needing a custom prompt: different app names, different save workflows, OS-specific UI steps. If Yes, generate the variant prompt for that OS's config JSON.

$ARGUMENTS
