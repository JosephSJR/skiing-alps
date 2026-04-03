# Skiing Alps Automation

Automate Skiing Alps task creation using Claude Code CLI.

## Quick Start

1. Open this folder in your terminal
2. Run `claude` to start Claude Code
3. Type `/full-pipeline` and paste your skeleton prompt + metadata
4. Follow the interactive steps

## Slash Commands

| Command | What it does |
|---------|-------------|
| `/full-pipeline` | Run the complete task pipeline |
| `/prompt-rewrite` | Rewrite a skeleton prompt |
| `/feasibility` | Check feasibility across OSes |
| `/subproblems` | Decompose into subproblems |
| `/complexity` | Rate task complexity |
| `/config-gen` | Generate config JSONs for all 3 OSes |
| `/evaluator-gen` | Generate evaluator JSONs (after VM work) |
| `/cross-os` | Cross-OS consistency check |
| `/pre-submit` | Final pre-submission audit |

## Folder Structure

- `tasks/` — One folder per task you're working on
- `output/` — Final JSONs ready to submit
- `docs/` — Reference docs for comparators, OS paths, checklists
- `templates/` — JSON templates for configs and evaluators
