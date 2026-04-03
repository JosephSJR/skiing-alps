# Common Mistakes Reference (From 250+ Audited Tasks)

## Critical Severity
| Error | How to Avoid |
|-------|-------------|
| ignore_blanks not set to false when adding paragraphs | Set to false whenever prompt adds, removes, or restructures paragraphs |
| Missing evaluator options for prompt requirements | Enable only the options that match what your prompt requests |
| Gold file identical to starting file (forgot to save) | Always Ctrl+S (Cmd+S on Mac) before transferring from VM |
| expected.dest missing _Gold suffix | Always: expected.dest = filename_Gold.ext, result.dest = filename.ext |
| Empty config or evaluator blocks submitted | Always fill these in; check all OSes |
| expected.path uses starting file URL instead of ground truth | ALWAYS verify expected.path differs from config download URL |
| Evaluator missing checks for stated prompt requirements | Map each subproblem to an evaluator check |
| Golden file content does not match prompt instructions | Verify golden file subproblem-by-subproblem |
| CDS URL expired in config | Test config URL before submission. If 403/404, contact project leads |
| Mac golden file saved in .pages/.key/.numbers format | Export as .docx/.pptx/.xlsx from Pages/Keynote/Numbers via File > Export To |
| Prompt says "dropdown" for data validation | OSWorld can't verify dropdown rendering. Say "list with values X, Y, Z" instead |
| Data validation uses "between" range operator | OSWorld can't distinguish between/not-between. Use custom formula: `=AND(cell>=min,cell<=max)` |

## High Severity
| Error | How to Avoid |
|-------|-------------|
| prompt_changed marked FALSE when prompt was modified | If you changed ANYTHING, mark as TRUE |
| Subproblems list UI actions instead of goals | Each subproblem = a verifiable outcome, not "click File" but "save with new name" |
| Skeleton prompt used without rewriting | Always rewrite for naturalness even if skeleton looks acceptable |
| Paths not pointing to Desktop folder | Ubuntu: /home/user/Desktop/ | Windows: C:\Users\User\Desktop\ | macOS: /Users/user/Desktop/ |
| Typos in ground truth files | Triple-check spelling in your completed file |
| Wrong Task Initializer name for OS | Use exact Task Project Name; change it when switching OSes |
| Shared golden file URL across OSes | Each OS must have its own golden file |
| Wrong evaluator function name for OS | Verify function names against documentation for each OS |
| Wrong window_name for Mac | Office for Mac: include file extension. Pages/Keynote: no extension |

## Medium Severity  
| Error | How to Avoid |
|-------|-------------|
| Vague prompt_changes_made description | Write detailed, specific descriptions of every change (50+ chars min) |
| Wrong complexity for number of subproblems | Match exactly: 2-3 = Medium, 4-5 = Hard, 6+ = Very Hard |
| Typos in subproblem column/field names | Cross-check all names against the actual file. Copy-paste from source |
