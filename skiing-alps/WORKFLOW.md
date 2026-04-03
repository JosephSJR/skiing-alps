# Claude Code Workflow for Skiing Alps Tasks

## Quick Start
```bash
cd skiing-alps
claude  # Launch Claude Code in this directory
```

## Workflow Commands

### 1. Start a New Task
```
claude "New task. Here's the skeleton: [PASTE SKELETON]. 
The verifier is [compare_docx_files]. Task Project Name is [chrome_office].
Starting file: [yes/no]. CDS URL: [paste if yes].
Please analyze this and give me:
1. Feasibility assessment
2. Core requests identified  
3. Rewritten natural prompt
4. Subproblems
5. Complexity rating
6. prompt_changes_made text"
```

### 2. Generate Ground Truth Content (DOCX)
```
claude "Based on my rewritten prompt in tasks/task-001/notes.md, 
generate the ground truth .docx file content using the docx npm library.
Save to tasks/task-001/ground-truth/"
```

### 3. Generate Evaluator JSONs
```
claude "Generate evaluator JSONs for all 3 OSes.
Filename: quantum_computing_breakthroughs
Extension: docx
Function: compare_docx_files
Windows CDS: scale-cds://...
Ubuntu CDS: scale-cds://...
Options needed: examine_text=true, ignore_blanks=false"
```

### 4. Run Pre-Submission Validation
```
claude "Run the pre-submission checklist on tasks/task-001/"
```

## Per-Task Folder Structure
```
tasks/task-001/
├── notes.md                    # All task info (use template)
├── prompt-rewritten.txt        # Final prompt text (copy to UI)
├── prompt-changes-made.txt     # Changes description (copy to UI)
├── subproblems.txt             # Subproblem text (copy to UI)
├── ground-truth/
│   ├── create-doc.js           # Script to generate the .docx
│   └── output.docx             # Generated document
├── evaluator-windows.json      # Windows evaluator JSON
├── evaluator-ubuntu.json       # Ubuntu evaluator JSON
└── evaluator-macos.json        # macOS evaluator JSON
```

## Common Claude Code Prompts

### Prompt Rewriting
```
claude "Rewrite this skeleton prompt for naturalness following the rules 
in references/prompt-rewriting-rules.md. The skeleton is: [PASTE].
Make sure it's deterministic, time-invariant, and every request is verifiable.
Check against the NOT Verifiable list in references/comparator-guide.md."
```

### Subproblem Check
```
claude "Review these subproblems against the prompt. Check that:
1. Every prompt requirement maps to at least one subproblem
2. No subproblem is a UI action (must be a goal)
3. Each subproblem is self-contained
4. Complexity matches count (2-3=Med, 4-5=Hard, 6+=VHard)
Prompt: [PASTE]
Subproblems: [PASTE]"
```

### Evaluator Option Selection
```
claude "Given this prompt, which compare_pptx_files options should I enable?
Remember: only enable what the prompt asks for. Over-enabling = false negatives.
Prompt: [PASTE]
Reference: references/comparator-guide.md"
```

### Cross-OS Verification
```
claude "Verify my evaluator JSONs have correct cross-OS differences:
- Different CDS URLs per OS
- Correct window_name format per OS  
- Correct file paths per OS
- Correct Task Initializer per OS
Reference: references/cross-os-reference.md
Windows: [PASTE JSON]
Ubuntu: [PASTE JSON]"
```

## Tips for Speed
1. **Copy the skeleton** into notes.md first — Claude Code can then read it
2. **Generate all outputs at once** — prompt, subproblems, evaluators in one go
3. **Use the evaluator generator script** for quick JSON generation
4. **Always run the validator** before submitting
5. **Keep CDS URLs in notes.md** — easy to reference later
6. **Pre-generate ground truth content** — paste into VM instead of typing

## What Claude Code CANNOT Do
- Launch or interact with the VM
- Upload files to Asset Upload
- Click Execute Verifier
- Transfer files in/out of VM
- Verify visual appearance in the VM

These must be done manually in the Outlier task UI.
