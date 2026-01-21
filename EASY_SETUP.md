# 🎯 Easiest Way to Push to GitHub

## Option 1: Run the Setup Script (Recommended!)

I've created a script that does everything for you. Just run:

```bash
cd /Users/Jack/Downloads/peloton-archive
./setup-github.sh
```

The script will:
- ✅ Ask for your GitHub username
- ✅ Ask for repository name (or use default)
- ✅ Set everything up automatically
- ✅ Guide you through creating the repo if needed
- ✅ Push your code

**Just type your answers when prompted!**

---

## Option 2: Manual Method (If Script Doesn't Work)

### Step 1: Create Repository
1. Go to: **https://github.com/new**
2. Name: `peloton-archive`
3. Don't check "Initialize with README"
4. Click "Create repository"

### Step 2: Copy These Commands One at a Time

Open terminal and type each command separately (don't paste all at once):

**Command 1:**
```bash
cd /Users/Jack/Downloads/peloton-archive
```

**Command 2** (replace YOUR_USERNAME):
```bash
git remote add origin https://github.com/YOUR_USERNAME/peloton-archive.git
```

**Command 3:**
```bash
git branch -M main
```

**Command 4:**
```bash
git push -u origin main
```

---

## How to Paste in Terminal (Mac)

**Method 1:** Right-click in terminal → "Paste"

**Method 2:** `Cmd+V` (sometimes needs to be enabled in terminal settings)

**Method 3:** Type manually (the script method is easier!)

---

## Need a Personal Access Token?

When `git push` asks for password:

1. Go to: **https://github.com/settings/tokens**
2. Click: **"Generate new token"** → **"Generate new token (classic)"**
3. Name: "Cursor"
4. Check: ✅ **`repo`**
5. Click: **"Generate token"**
6. Copy the token (starts with `ghp_...`)
7. Use it as your password

---

## Quick Test

Try the script first - it's the easiest:

```bash
./setup-github.sh
```

If you get any errors, just tell me what they say!


