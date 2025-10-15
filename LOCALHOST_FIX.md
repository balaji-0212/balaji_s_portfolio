# 🔧 Localhost Fix - Portfolio Not Loading

## ❌ Problem Identified

You were running the server from `C:\Windows\System32` instead of your portfolio directory!

**Wrong Directory:**
```
C:\Windows\System32> python -m http.server 8000
```
This shows Windows system files, not your portfolio.

**Correct Directory:**
```
D:\Balaji_S_Portfolio> python -m http.server 8000
```
This shows your portfolio website.

---

## ✅ CORRECT COMMANDS (Copy These Exactly)

### Windows Command Prompt:

```cmd
cd /d D:\Balaji_S_Portfolio
python -m http.server 8000
```

### Windows PowerShell:

```powershell
cd D:\Balaji_S_Portfolio
python -m http.server 8000
```

---

## 🎯 Step-by-Step Instructions

### 1. Open Command Prompt or PowerShell

**Command Prompt:**
- Press `Win + R`
- Type `cmd`
- Press Enter

**PowerShell:**
- Press `Win + X`
- Select "Windows PowerShell" or "Terminal"

### 2. Navigate to Portfolio Directory

```cmd
cd /d D:\Balaji_S_Portfolio
```

**Important:** Use `/d` flag to change drives in Command Prompt!

### 3. Verify You're in the Right Directory

```cmd
dir
```

You should see these files:
- index.html
- about.html
- projects.html
- certificates.html
- resume.html
- contact.html
- assets/ folder
- README.md

### 4. Start the Server

```cmd
python -m http.server 8000
```

You should see:
```
Serving HTTP on :: port 8000 (http://[::]:8000/) ...
```

### 5. Open Your Browser

Open any browser and go to:
```
http://localhost:8000
```

OR

```
http://127.0.0.1:8000
```

---

## 🔍 Troubleshooting

### Issue 1: "Cannot find the path specified"

**Solution:** Make sure you use `/d` flag:
```cmd
cd /d D:\Balaji_S_Portfolio
```

### Issue 2: Still seeing directory listing

**Check current directory:**
```cmd
cd
```

Should show: `D:\Balaji_S_Portfolio`

If not, run:
```cmd
cd /d D:\Balaji_S_Portfolio
```

### Issue 3: Port 8000 already in use

**Use a different port:**
```cmd
python -m http.server 8080
```

Then open: `http://localhost:8080`

### Issue 4: Python not found

**Check Python installation:**
```cmd
python --version
```

If not installed, download from: https://www.python.org/downloads/

---

## 📝 Quick Test Checklist

Once you open `http://localhost:8000`, you should see:

- [ ] **Hero Section** with "Hi, I'm Balaji S"
- [ ] **Dark theme** (black background, cyan/purple accents)
- [ ] **Navigation menu** at the top
- [ ] **Download Resume** button
- [ ] **Footer** at the bottom

If you see a **directory listing** (list of folders), you're in the wrong directory!

---

## ✅ Alternative Method: Using File Explorer

### Method 1: Right-click in Folder

1. Open File Explorer
2. Navigate to `D:\Balaji_S_Portfolio`
3. Hold `Shift` + Right-click in empty space
4. Select "Open PowerShell window here" or "Open command window here"
5. Run: `python -m http.server 8000`
6. Open browser: `http://localhost:8000`

### Method 2: VS Code Terminal

1. Open VS Code
2. Open folder: `D:\Balaji_S_Portfolio`
3. Open Terminal (Ctrl + `)
4. Run: `python -m http.server 8000`
5. Open browser: `http://localhost:8000`

---

## 🎯 Expected Result

When you open `http://localhost:8000`, you should see:

```
┌─────────────────────────────────────────┐
│  Balaji.S                    [Menu]     │
├─────────────────────────────────────────┤
│                                         │
│     Hi, I'm Balaji S                    │
│     Data Analyst & Developer            │
│                                         │
│     [Download Resume]                   │
│                                         │
└─────────────────────────────────────────┘
```

**NOT** a directory listing like:
```
Index of /
- folder1/
- folder2/
- file1.html
```

---

## 🚀 Once It's Working

### Test These Pages:
1. Home: `http://localhost:8000/`
2. About: `http://localhost:8000/about.html`
3. Projects: `http://localhost:8000/projects.html`
4. Certificates: `http://localhost:8000/certificates.html`
5. Resume: `http://localhost:8000/resume.html`
6. Contact: `http://localhost:8000/contact.html`

### Then Deploy:
1. Stop server (Ctrl + C)
2. Go to: https://app.netlify.com/drop
3. Drag `D:\Balaji_S_Portfolio` folder
4. Your site is LIVE! 🎉

---

## 📞 Still Not Working?

### Share This Information:

1. **Current directory:**
   ```cmd
   cd
   ```

2. **Files in directory:**
   ```cmd
   dir
   ```

3. **Server output:**
   ```
   (Copy the terminal output after running python -m http.server 8000)
   ```

4. **Browser URL:**
   ```
   (What URL are you opening?)
   ```

5. **What you see:**
   ```
   (Screenshot or description of what appears in browser)
   ```

---

## ✅ Summary

**CORRECT COMMANDS:**
```cmd
cd /d D:\Balaji_S_Portfolio
python -m http.server 8000
```

**OPEN BROWSER:**
```
http://localhost:8000
```

**EXPECTED:** Your portfolio website with dark theme
**NOT EXPECTED:** Directory listing

**Your portfolio is complete and ready - just need to run from the correct directory!** 🚀
