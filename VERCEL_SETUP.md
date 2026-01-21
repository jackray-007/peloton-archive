# 🚀 Deploy to Vercel - Step by Step

Your code is on GitHub! Now let's make it live on the internet.

## Step-by-Step Guide:

### Step 1: Go to Vercel

1. **Open your browser**
2. **Go to**: https://vercel.com/new
3. **Click**: "Continue with GitHub" (or "Sign Up" if you don't have an account)

### Step 2: Authorize Vercel

1. **GitHub will ask** to authorize Vercel
2. **Click**: "Authorize Vercel" (or "Install" if prompted)
3. **Select**: "Only select repositories" → Choose `peloton-archive`
   - OR: "All repositories" (if you're comfortable with that)
4. **Click**: "Install" or "Authorize"

### Step 3: Import Your Project

1. **You'll see a list** of your GitHub repositories
2. **Find**: `peloton-archive` (or `jackray-007/peloton-archive`)
3. **Click**: "Import" next to it

### Step 4: Configure (Usually Auto-Detected)

Vercel should auto-detect:
- **Framework Preset**: Next.js ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `.next` ✅
- **Install Command**: `npm install` ✅

**Don't change anything** - just verify these are correct!

### Step 5: Deploy!

1. **Click**: "Deploy" button (usually at the bottom)
2. **Wait**: 1-2 minutes while it builds
3. **Watch**: The build progress in real-time

### Step 6: Your Site is Live! 🎉

1. **When done**, you'll see: "Congratulations! Your project has been deployed"
2. **You'll get a URL** like: `peloton-archive.vercel.app`
3. **Click the URL** to see your live site!

---

## What Happens Next:

### Automatic Deployments

Every time you push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will:
- ✅ Detect the push
- ✅ Build your site
- ✅ Deploy automatically
- ✅ Update your live site in 1-2 minutes

### Preview Deployments

- Every branch gets its own preview URL
- Every pull request gets a preview
- Test changes before merging!

---

## Custom Domain (Optional)

Want your own domain? (e.g., `pelotonarchive.com`)

1. In Vercel dashboard → Your project
2. Go to: **Settings** → **Domains**
3. Add your domain
4. Follow DNS instructions

---

## Need Help?

If you see any errors:
- Check the build logs in Vercel
- Make sure all dependencies are in `package.json`
- Let me know what error you see!

---

## Quick Checklist:

- [ ] Go to https://vercel.com/new
- [ ] Sign in with GitHub
- [ ] Import `peloton-archive` repository
- [ ] Click "Deploy"
- [ ] Wait 1-2 minutes
- [ ] Visit your live site! ✨


