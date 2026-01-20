# 🔧 Use System Terminal Instead

Since Cursor's terminal isn't working, use your Mac's built-in Terminal app!

## Quick Steps:

### Method 1: Open Terminal App

1. **Press**: `Cmd + Space` (Spotlight search)
2. **Type**: `Terminal`
3. **Press**: Enter
4. **Terminal app opens!**

### Method 2: From Finder

1. **Open**: Finder
2. **Go to**: Applications → Utilities
3. **Double-click**: Terminal

---

## Then Run These Commands:

Once Terminal is open, type these commands **one at a time**:

**Command 1:**
```
cd /Users/Jack/Downloads/peloton-archive
```

**Command 2:**
```
./setup-github.sh
```

Press Enter after each command!

---

## If Script Doesn't Work:

Use these commands instead (replace YOUR_USERNAME):

**Command 1:**
```
cd /Users/Jack/Downloads/peloton-archive
```

**Command 2** (replace YOUR_USERNAME with your actual GitHub username):
```
git remote add origin https://github.com/YOUR_USERNAME/peloton-archive.git
```

**Command 3:**
```
git branch -M main
```

**Command 4:**
```
git push -u origin main
```

---

## Pasting in System Terminal:

- **Right-click** → "Paste"
- Or: `Cmd + V`

---

## Need Help?

If you get stuck, just tell me:
1. What error message you see
2. Which step you're on
3. I'll help you fix it!

