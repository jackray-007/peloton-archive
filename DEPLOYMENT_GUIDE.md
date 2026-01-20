# 🚀 Deployment Guide - Auto-Deploy with Vercel

This guide will help you publish your site and set up automatic deployments so that every time you push changes to GitHub, your site updates automatically.

## Option 1: Vercel (Recommended - Best for Next.js)

Vercel is made by the creators of Next.js and offers the best integration. It's free for personal projects.

### Step 1: Push Your Code to GitHub

1. **Create a GitHub repository** (if you haven't already):
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it (e.g., `peloton-archive`)
   - Don't initialize with README (you already have one)
   - Click "Create repository"

2. **Push your code to GitHub**:
   ```bash
   cd /Users/Jack/Downloads/peloton-archive
   
   # Add all files
   git add .
   
   # Commit your changes
   git commit -m "Initial commit with all features"
   
   # Add GitHub as remote (replace YOUR_USERNAME and REPO_NAME)
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Sign up for Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up"
   - Choose "Continue with GitHub" (recommended)

2. **Import your project**:
   - Click "Add New..." → "Project"
   - Find your `peloton-archive` repository
   - Click "Import"

3. **Configure deployment**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - Click "Deploy"

4. **Wait for deployment**:
   - Vercel will build and deploy your site
   - You'll get a URL like: `peloton-archive.vercel.app`
   - This happens automatically!

### Step 3: Set Up Auto-Deployments

**It's already set up!** Every time you:
1. Make changes in Cursor
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Vercel automatically detects the push and redeploys your site
4. Your live site updates in 1-2 minutes!

### Step 4: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `pelotonarchive.com`)
4. Follow the DNS configuration instructions

---

## Option 2: Netlify (Alternative)

Netlify also offers great Next.js support and auto-deployments.

### Steps:

1. **Push to GitHub** (same as Step 1 above)

2. **Sign up for Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Sign up" → "GitHub"

3. **Deploy**:
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`
   - Click "Deploy site"

4. **Auto-deployments**: Automatically enabled!

---

## Quick Workflow After Setup

Once deployed, your daily workflow is:

```bash
# 1. Make changes in Cursor
# 2. Save files

# 3. Commit and push
git add .
git commit -m "Added new feature"
git push

# 4. Wait 1-2 minutes
# 5. Your site is updated! 🎉
```

---

## Environment Variables (If Needed)

If you add environment variables later (like API keys):

1. **In Vercel**:
   - Go to Project → Settings → Environment Variables
   - Add your variables
   - Redeploy

2. **In your code**:
   - Use `process.env.YOUR_VARIABLE`
   - Add to `.env.local` for local development

---

## Preview Deployments

Vercel automatically creates preview deployments for:
- Every pull request
- Every branch push

This lets you test changes before merging to main!

---

## Troubleshooting

### Build Fails?
- Check the build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Run `npm run build` locally to test

### Site Not Updating?
- Make sure you pushed to the correct branch (usually `main`)
- Check Vercel dashboard for deployment status
- Wait a few minutes - deployments take 1-2 minutes

### Need to Rollback?
- Go to Vercel dashboard → Deployments
- Find the previous working deployment
- Click "..." → "Promote to Production"

---

## Current Status

✅ Your project is ready to deploy!
✅ All features are integrated
✅ Git repository is initialized

**Next Step**: Push to GitHub and connect to Vercel!

