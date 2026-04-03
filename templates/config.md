# Config JSON Templates

The config JSON is a **launch command initializer** — it tells OSWorld what application(s) to open before the task starts. It is NOT a full task metadata object.

## Format

```json
{
  "config": [
    {
      "type": "launch",
      "parameters": {
        "command": ["<APP_PATH_OR_COMMAND>", "<ARG1>", "<ARG2>"]
      }
    }
  ]
}
```

## Chrome Tasks (chrome_office)

For tasks that start with Chrome navigation:

### Windows
```json
{
  "config": [
    {
      "type": "launch",
      "parameters": {
        "command": [
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
          "--remote-debugging-port=1337"
        ]
      }
    }
  ]
}
```

### Ubuntu
```json
{
  "config": [
    {
      "type": "launch",
      "parameters": {
        "command": [
          "google-chrome",
          "--remote-debugging-port=1337"
        ]
      }
    }
  ]
}
```

### macOS
```json
{
  "config": [
    {
      "type": "launch",
      "parameters": {
        "command": [
          "open",
          "-a",
          "Google Chrome",
          "--args",
          "--remote-debugging-port=1337"
        ]
      }
    }
  ]
}
```

## Spreadsheet Tasks (editing existing file)

For tasks that open an existing spreadsheet:

### Windows (Excel)
```json
{
  "config": [
    {
      "type": "launch",
      "parameters": {
        "command": [
          "C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE",
          "C:\\Users\\User\\Desktop\\<filename>.xlsx"
        ]
      }
    }
  ]
}
```

### Ubuntu (LibreOffice Calc)
```json
{
  "config": [
    {
      "type": "launch",
      "parameters": {
        "command": [
          "libreoffice",
          "--calc",
          "/home/user/Desktop/<filename>.xlsx"
        ]
      }
    }
  ]
}
```

### macOS (Excel)
```json
{
  "config": [
    {
      "type": "launch",
      "parameters": {
        "command": [
          "open",
          "-a",
          "Microsoft Excel",
          "/Users/user/Desktop/<filename>.xlsx"
        ]
      }
    }
  ]
}
```

## Document Tasks (editing existing file)

### Windows (Word)
```json
{
  "config": [
    {
      "type": "launch",
      "parameters": {
        "command": [
          "C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE",
          "C:\\Users\\User\\Desktop\\<filename>.docx"
        ]
      }
    }
  ]
}
```

### Ubuntu (LibreOffice Writer)
```json
{
  "config": [
    {
      "type": "launch",
      "parameters": {
        "command": [
          "libreoffice",
          "--writer",
          "/home/user/Desktop/<filename>.docx"
        ]
      }
    }
  ]
}
```

### macOS (Word)
```json
{
  "config": [
    {
      "type": "launch",
      "parameters": {
        "command": [
          "open",
          "-a",
          "Microsoft Word",
          "/Users/user/Desktop/<filename>.docx"
        ]
      }
    }
  ]
}
```

## Notes

- The config ONLY launches apps — task description, pre-installed files, and evaluation are handled separately in the Skiing Alps platform UI
- Replace all `<PLACEHOLDER>` values with actual data
- Windows user is `User` (capital U)
- Chrome tasks always need `--remote-debugging-port=1337`
- For tasks creating files from scratch (no existing file to open), just launch the starting app (e.g., Chrome for chrome_office tasks)
