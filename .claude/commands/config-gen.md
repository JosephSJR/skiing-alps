# Config Generation

Generate config JSONs for all feasible OSes.

## Instructions

Given a rewritten prompt and subproblems, generate config JSONs for macOS, Windows, and Ubuntu.

### For each OS:

1. **Read** `templates/config.md` for the JSON template
2. **Read** `docs/os-reference.md` for OS-specific paths, app names, and postconfig patterns
3. **Fill in** the template:
   - Set the correct OS name and version
   - Map app names to OS equivalents
   - Convert all file paths to OS format
   - Write postconfig commands in the correct shell (bash vs PowerShell)
   - List pre-installed files with correct paths

### Pre-installed files:
- These are files the VM starts with BEFORE the model begins
- Include any files the prompt references as "given" or "existing"
- Use CDS URLs (placeholder if not yet uploaded): `{{CDS_URL_filename}}`

### Postconfig:
- Commands that set up the VM environment
- Install fonts, create directories, set preferences
- Must be idempotent (safe to run multiple times)

### Save to:
- `tasks/<task-id>/config_macos.json`
- `tasks/<task-id>/config_windows.json`
- `tasks/<task-id>/config_ubuntu.json`

$ARGUMENTS
