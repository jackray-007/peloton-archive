#!/bin/bash

echo "🔑 GitHub Push with Personal Access Token"
echo "=========================================="
echo ""
echo "You need a Personal Access Token to push to GitHub."
echo ""
echo "📝 Steps:"
echo "1. Go to: https://github.com/settings/tokens"
echo "2. Click: 'Generate new token' → 'Generate new token (classic)'"
echo "3. Name: 'Peloton Archive'"
echo "4. Check: ✅ 'repo' scope"
echo "5. Click: 'Generate token'"
echo "6. COPY THE TOKEN (starts with ghp_...)"
echo ""
read -p "Have you created and copied the token? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Please create the token first, then run this script again."
    echo "Link: https://github.com/settings/tokens"
    exit 0
fi

echo ""
echo "📋 Paste your token here (it starts with ghp_...):"
read -r TOKEN

if [ -z "$TOKEN" ]; then
    echo "❌ Token cannot be empty!"
    exit 1
fi

echo ""
echo "🔗 Updating remote URL with token..."
git remote set-url origin "https://${TOKEN}@github.com/jackray-007/peloton-archive.git"

echo ""
echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Your code is on GitHub!"
    echo ""
    echo "🌐 View your repository:"
    echo "   https://github.com/jackray-007/peloton-archive"
    echo ""
    echo "🚀 Next: Deploy to Vercel at https://vercel.com/new"
else
    echo ""
    echo "❌ Push failed. Check:"
    echo "   - Token is correct"
    echo "   - Token has 'repo' scope"
    echo "   - Repository exists on GitHub"
fi


