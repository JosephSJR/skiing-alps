# Cross-OS Reference Guide

## File Paths
| OS      | Pattern                              | Example                                      |
|---------|--------------------------------------|----------------------------------------------|
| Ubuntu  | /home/user/Desktop/<filename>        | /home/user/Desktop/report.docx               |
| Windows | C:\Users\User\Desktop\<filename>     | C:\Users\User\Desktop\report.docx            |
| macOS   | /Users/user/Desktop/<filename>       | /Users/user/Desktop/report.docx              |

**NOTE:** Some Windows VMs use `Docker` instead of `User`. Always verify with `Copy as path` in File Explorer.

## Window Names
| OS      | App              | Pattern                                    | Example                                |
|---------|------------------|--------------------------------------------|----------------------------------------|
| Ubuntu  | Writer           | filename.ext - LibreOffice Writer          | report.docx - LibreOffice Writer       |
| Ubuntu  | Impress          | filename.ext - LibreOffice Impress         | slides.pptx - LibreOffice Impress      |
| Ubuntu  | Calc             | filename.ext - LibreOffice Calc            | data.xlsx - LibreOffice Calc           |
| Windows | Word             | filename - Word (NO extension)             | report - Word                          |
| Windows | PowerPoint       | filename - PowerPoint (NO extension)       | slides - PowerPoint                    |
| Windows | Excel            | filename - Excel (NO extension)            | data - Excel                           |
| macOS   | Office apps      | filename.ext (with extension)              | report.docx                            |
| macOS   | Pages/Keynote    | filename (no extension)                    | report                                 |

## Task Initializers
| OS      | App         | Initializer                                          |
|---------|-------------|------------------------------------------------------|
| Ubuntu  | Writer      | libreoffice_writer                                   |
| Ubuntu  | Impress     | libreoffice_impress                                  |
| Ubuntu  | Calc        | libreoffice_calc                                     |
| Ubuntu  | Chrome+App  | chrome-office (skeleton says chrome_office)           |
| Ubuntu  | VS Code     | vscode                                               |
| Windows | Word        | word                                                 |
| Windows | PowerPoint  | powerpoint                                           |
| Windows | Excel       | excel                                                |
| Windows | Chrome+App  | chrome-office                                        |
| Windows | VS Code     | vscode                                               |
| macOS   | Keynote     | keynote                                              |
| macOS   | Pages       | pages                                                |
| macOS   | Numbers     | numbers                                              |
| macOS   | Word (Mac)  | word                                                 |

**CRITICAL:** For multi-app tasks (Chrome + Office), ALWAYS use `chrome-office` regardless of OS.

## Save Formats (Ubuntu/macOS)
| App               | CORRECT Format | WRONG Format |
|-------------------|---------------|--------------|
| LibreOffice Writer | .docx         | .odt         |
| LibreOffice Impress| .pptx         | .odp         |
| LibreOffice Calc  | .xlsx          | .ods         |
| Pages             | .docx (Export) | .pages       |
| Keynote           | .pptx (Export) | .key         |
| Numbers           | .xlsx (Export) | .numbers     |

## Save Shortcuts
| OS              | Shortcut |
|-----------------|----------|
| Ubuntu/Windows  | Ctrl+S   |
| macOS           | Cmd+S    |

## VS Code Paths
| OS      | Launch Path                                                              |
|---------|--------------------------------------------------------------------------|
| Ubuntu  | code                                                                     |
| Windows | C:\Users\User\AppData\Local\Programs\Microsoft VS Code\code.exe         |
| macOS   | /usr/local/bin/code or /Applications/Visual Studio Code.app/...          |

## VS Code Settings Paths
| OS      | Path                                                                     |
|---------|--------------------------------------------------------------------------|
| Ubuntu  | ~/.config/Code/User/settings.json                                        |
| Windows | C:\Users\User\AppData\Roaming\Code\User\settings.json                   |
| macOS   | /Users/user/Library/Application Support/Code/User/settings.json          |
