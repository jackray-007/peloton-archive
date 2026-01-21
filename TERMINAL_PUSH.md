# 🚀 Push to GitHub Using Terminal (Easiest Method!)

## Quick 3-Step Process

### Step 1: Create Repository on GitHub

1. **Open**: https://github.com/new
2. **Repository name**: `peloton-archive`
3. **Visibility**: Public or Private (your choice)
4. **IMPORTANT**: Don't check "Initialize with README"
5. **Click**: "Create repository"

### Step 2: Get Your GitHub Username

Look at the URL after creating the repo. It will be:
```
https://github.com/YOUR_USERNAME/peloton-archive
```

**Write down YOUR_USERNAME** - you'll need it!

### Step 3: Run These Commands

Open Terminal in Cursor:
- Press `` Ctrl+` `` (backtick key, above Tab)
- Or: View → Terminal

Then copy and paste these commands (replace YOUR_USERNAME):

```bash
cd /Users/Jack/Downloads/peloton-archive
git remote add origin https://github.com/YOUR_USERNAME/peloton-archive.git
git branch -M main
git push -u origin main
```

**Example** (if username is "jacksmith"):
```bash
cd /Users/Jack/Downloads/peloton-archive
git remote add origin https://github.com/jacksmith/peloton-archive.git
git branch -M main
git push -u origin main
```

### Step 4: Enter Credentials

When prompted:
- **Username**: Your GitHub username
- **Password**: You need a **Personal Access Token** (not regular password)

#### Create Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click: **"Generate new token"** → **"Generate new token (classic)"**
3. **Name**: "Cursor" (or any name)
4. **Expiration**: 90 days (or No expiration)
5. **Select scopes**: Check ✅ **`repo`** (gives full repo access)
6. Click: **"Generate token"**
7. **COPY THE TOKEN** (starts with `ghp_...`) - you won't see it again!
8. **Use this token as your password** when pushing

---

## ✅ Done!

After pushing, visit: `https://github.com/YOUR_USERNAME/peloton-archive`

You should see all your files! 🎉

---

## Next: Deploy to Vercel

1. Go to: **https://vercel.com/new**
2. Sign in with GitHub
3. Import `peloton-archive` repository
4. Click "Deploy"
5. Wait 1-2 minutes
6. **Your site is live!** ✨

---

## Troubleshooting

**Error: "remote origin already exists"**
```bash
git remote remove origin
# Then run the git remote add command again
```

**Error: "Authentication failed"**
- Make sure you're using a Personal Access Token, not your password
- Token must have `repo` scope checked

**Need help?** Just paste the error message and I'll help!


