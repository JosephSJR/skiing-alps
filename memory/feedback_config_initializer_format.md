---
name: Config JSON is an initializer launch config, not full metadata
description: The config JSON pasted into the Computer Use step is a simple launch command, not the full task metadata format
type: feedback
---

The config JSON for the Computer Use step is a **task initializer input** — a simple launch config, not the full metadata format with os/task_description/applications/pre_installed_files.

**Why:** The platform's Computer Use step expects a JSON with `config` array containing launch commands. The task description (prompt) goes in a separate UI field. The old full-metadata format was wrong for this step.

**How to apply:** For chrome_office tasks, the config just launches Chrome with `--remote-debugging-port=1337`. The Chrome path differs per OS:
- Windows: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- Ubuntu: `google-chrome`
- macOS: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`

The agent opens the Office app themselves. Do not include the Office app in the launch config.
