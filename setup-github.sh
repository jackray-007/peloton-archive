#!/bin/bash

echo "🚀 GitHub Setup Script"
echo "======================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the peloton-archive directory"
    echo "   Current directory: $(pwd)"
    exit 1
fi

# Check if remote already exists
if git remote get-url origin &>/dev/null; then
    echo "⚠️  GitHub remote already exists!"
    read -p "Do you want to update it? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Cancelled."
        exit 0
    fi
    git remote remove origin
fi

# Get GitHub username
echo "📝 Please enter your GitHub username:"
read -r GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo "❌ Username cannot be empty!"
    exit 1
fi

# Get repository name (optional, defaults to peloton-archive)
echo ""
echo "📝 Enter repository name (or press Enter for 'peloton-archive'):"
read -r REPO_NAME
REPO_NAME=${REPO_NAME:-peloton-archive}

# Confirm
echo ""
echo "📋 Summary:"
echo "   Username: $GITHUB_USER"
echo "   Repository: $REPO_NAME"
echo "   URL: https://github.com/$GITHUB_USER/$REPO_NAME.git"
echo ""
read -p "Is this correct? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled. Run the script again to start over."
    exit 0
fi

# Add remote
echo ""
echo "🔗 Adding GitHub remote..."
git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git" 2>/dev/null || git remote set-url origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"

# Set branch to main
echo "🌿 Setting branch to main..."
git branch -M main

# Check if repository exists
echo ""
echo "🔍 Checking if repository exists on GitHub..."
if git ls-remote --exit-code origin &>/dev/null; then
    echo "✅ Repository found!"
else
    echo ""
    echo "⚠️  Repository not found on GitHub!"
    echo ""
    echo "Please create it first:"
    echo "1. Go to: https://github.com/new"
    echo "2. Repository name: $REPO_NAME"
    echo "3. Don't check 'Initialize with README'"
    echo "4. Click 'Create repository'"
    echo ""
    read -p "Have you created the repository? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Please create the repository first, then run this script again."
        exit 0
    fi
fi

# Push
echo ""
echo "📤 Pushing to GitHub..."
echo ""
echo "⚠️  When prompted for password, use a Personal Access Token!"
echo "   Get one at: https://github.com/settings/tokens"
echo "   (Select 'repo' scope when creating)"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Your code is on GitHub!"
    echo ""
    echo "🌐 View your repository:"
    echo "   https://github.com/$GITHUB_USER/$REPO_NAME"
    echo ""
    echo "🚀 Next step: Deploy to Vercel"
    echo "   1. Go to: https://vercel.com/new"
    echo "   2. Sign in with GitHub"
    echo "   3. Import your repository"
    echo "   4. Click 'Deploy'"
    echo ""
else
    echo ""
    echo "❌ Push failed. Common issues:"
    echo "   - Repository doesn't exist (create it first)"
    echo "   - Wrong username"
    echo "   - Need to use Personal Access Token (not password)"
    echo ""
    echo "Get help: https://github.com/settings/tokens"
fi

