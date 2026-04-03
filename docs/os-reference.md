# OS Reference

Paths, app names, and postconfig patterns for each supported OS.

---

## macOS

### Paths
- Desktop: `/Users/user/Desktop/`
- Documents: `/Users/user/Documents/`
- Downloads: `/Users/user/Downloads/`
- Home: `/Users/user/`
- Applications: `/Applications/`
- Temp: `/tmp/`

### App Names
| Category | App Name |
|----------|----------|
| Text Editor | TextEdit |
| Spreadsheet | Microsoft Excel / Numbers |
| Word Processor | Microsoft Word / Pages |
| Presentation | Microsoft PowerPoint / Keynote |
| Browser | Safari / Google Chrome |
| Terminal | Terminal |
| File Manager | Finder |
| PDF Viewer | Preview |
| Image Editor | Preview |
| Code Editor | Visual Studio Code |
| Email | Mail |
| Calendar | Calendar |
| Notes | Notes |

### Postconfig (bash)
```bash
# Install font
cp /path/to/font.ttf ~/Library/Fonts/

# Create directory
mkdir -p ~/Desktop/project

# Set default app
# (use duti or open -a)

# Install Homebrew package
brew install package_name
```

---

## Windows

**Note: The Windows VM user is `User`.**

### Paths
- Desktop: `C:\\Users\\User\\Desktop\\`
- Documents: `C:\\Users\\User\\Documents\\`
- Downloads: `C:\\Users\\User\\Downloads\\`
- Home: `C:\\Users\\User\\`
- Program Files: `C:\\Program Files\\`
- Temp: `C:\\Users\\User\\AppData\\Local\\Temp\\`

### App Names
| Category | App Name |
|----------|----------|
| Text Editor | Notepad |
| Spreadsheet | Microsoft Excel |
| Word Processor | Microsoft Word |
| Presentation | Microsoft PowerPoint |
| Browser | Microsoft Edge / Google Chrome |
| Terminal | PowerShell / Command Prompt |
| File Manager | File Explorer |
| PDF Viewer | Microsoft Edge |
| Image Editor | Paint |
| Code Editor | Visual Studio Code |
| Email | Outlook |
| Calendar | Outlook |
| Notes | Sticky Notes |

### Postconfig (PowerShell)
```powershell
# Install font
Copy-Item "C:\path\to\font.ttf" "C:\Windows\Fonts\"

# Create directory
New-Item -ItemType Directory -Force -Path "C:\Users\user\Desktop\project"

# Set environment variable
[Environment]::SetEnvironmentVariable("VAR", "value", "User")

# Install with winget
winget install --id Package.Name --silent
```

---

## Ubuntu

### Paths
- Desktop: `/home/user/Desktop/`
- Documents: `/home/user/Documents/`
- Downloads: `/home/user/Downloads/`
- Home: `/home/user/`
- Applications: `/usr/share/applications/`
- Temp: `/tmp/`

### App Names
| Category | App Name |
|----------|----------|
| Text Editor | gedit / nano |
| Spreadsheet | LibreOffice Calc |
| Word Processor | LibreOffice Writer |
| Presentation | LibreOffice Impress |
| Browser | Firefox |
| Terminal | GNOME Terminal |
| File Manager | Nautilus (Files) |
| PDF Viewer | Evince (Document Viewer) |
| Image Editor | GIMP |
| Code Editor | Visual Studio Code |
| Email | Thunderbird |
| Calendar | GNOME Calendar |
| Notes | gedit |

### Postconfig (bash)
```bash
# Install font
mkdir -p ~/.local/share/fonts
cp /path/to/font.ttf ~/.local/share/fonts/
fc-cache -f

# Create directory
mkdir -p ~/Desktop/project

# Install package
sudo apt-get update && sudo apt-get install -y package_name

# Set environment variable
echo 'export VAR="value"' >> ~/.bashrc
```

---

## Cross-OS App Mapping

| Function | macOS | Windows | Ubuntu |
|----------|-------|---------|--------|
| Spreadsheet | Excel / Numbers | Excel | LibreOffice Calc |
| Word Processor | Word / Pages | Word | LibreOffice Writer |
| Presentation | PowerPoint / Keynote | PowerPoint | LibreOffice Impress |
| Text Editor | TextEdit | Notepad | gedit |
| Browser | Safari | Edge | Firefox |
| Terminal | Terminal (bash) | PowerShell | GNOME Terminal (bash) |
| File Manager | Finder | File Explorer | Nautilus |
