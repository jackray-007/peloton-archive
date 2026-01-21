#!/bin/bash
# Script to push to GitHub after repository is created

echo "🚀 Ready to push to GitHub!"
echo ""
echo "If you haven't created the GitHub repository yet:"
echo "1. Go to: https://github.com/new"
echo "2. Name it: peloton-archive (or your preferred name)"
echo "3. Don't initialize with README"
echo "4. Click 'Create repository'"
echo ""
read -p "Have you created the GitHub repository? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter your GitHub username: " GITHUB_USER
    read -p "Enter your repository name (default: peloton-archive): " REPO_NAME
    REPO_NAME=${REPO_NAME:-peloton-archive}
    
    echo ""
    echo "📤 Pushing to GitHub..."
    
    git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git 2>/dev/null || git remote set-url origin https://github.com/$GITHUB_USER/$REPO_NAME.git
    git branch -M main
    git push -u origin main
    
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "Next step: Go to https://vercel.com/new and import your repository!"
else
    echo "Please create the repository first, then run this script again."
fi


