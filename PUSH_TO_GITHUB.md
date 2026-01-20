# 🚀 Push to GitHub - Simple Steps

Since the Source Control panel isn't showing, let's use the terminal method. It's actually easier!

## Step 1: Create GitHub Repository

1. **Open your browser** and go to: **https://github.com/new**
2. **Repository name**: `peloton-archive` (or any name you like)
3. **Description** (optional): "Premium cycling kits and equipment e-commerce site"
4. **Choose**: Public or Private
5. **DO NOT** check "Initialize with README" (we already have files)
6. **Click**: "Create repository"

## Step 2: Copy the Repository URL

After creating the repo, GitHub will show you a page with commands. You'll see a URL like:
```
https://github.com/YOUR_USERNAME/peloton-archive.git
```

**Copy that URL** - you'll need it in the next step!

## Step 3: Push Your Code

Open the terminal in Cursor (View → Terminal, or press `` Ctrl+` ``) and run:

```bash
cd /Users/Jack/Downloads/peloton-archive

# Replace YOUR_USERNAME with your actual GitHub username
# Replace peloton-archive with your repo name if different
git remote add origin https://github.com/YOUR_USERNAME/peloton-archive.git
git branch -M main
git push -u origin main
```

**Example** (if your username is "jacksmith" and repo is "peloton-archive"):
```bash
git remote add origin https://github.com/jacksmith/peloton-archive.git
git branch -M main
git push -u origin main
```

## Step 4: Enter GitHub Credentials

When you run `git push`, you'll be asked for:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your regular password)

### How to Create a Personal Access Token:

1. Go to: **https://github.com/settings/tokens**
2. Click: **"Generate new token"** → **"Generate new token (classic)"**
3. **Name it**: "Cursor Access" (or any name)
4. **Select scopes**: Check `repo` (this gives full repository access)
5. **Click**: "Generate token"
6. **Copy the token** (you won't see it again!)
7. **Use this token as your password** when pushing

## Step 5: Verify It Worked

After pushing, go to: **https://github.com/YOUR_USERNAME/peloton-archive**

You should see all your files! 🎉

---

## Next: Deploy to Vercel

Once your code is on GitHub:

1. Go to: **https://vercel.com/new**
2. Click: **"Continue with GitHub"**
3. Find: **peloton-archive** repository
4. Click: **"Import"**
5. Click: **"Deploy"** (don't change any settings)
6. Wait 1-2 minutes
7. **Your site is live!** ✨

---

## Need Help?

If you get any errors, just paste them here and I'll help you fix them!

