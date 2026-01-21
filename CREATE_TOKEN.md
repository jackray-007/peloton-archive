# 🔑 Create GitHub Personal Access Token

GitHub no longer accepts passwords. You need a **Personal Access Token**.

## Step-by-Step:

### 1. Create the Token

1. **Go to**: https://github.com/settings/tokens
2. **Click**: "Generate new token" → "Generate new token (classic)"
3. **Note**: Name it "Peloton Archive" (or any name)
4. **Expiration**: Choose 90 days (or No expiration)
5. **Select scopes**: Check ✅ **`repo`** (this is important!)
6. **Scroll down** and click: "Generate token"
7. **COPY THE TOKEN** - it starts with `ghp_...` 
   - ⚠️ You won't see it again! Copy it now!

### 2. Use the Token

When you run `git push`, use:
- **Username**: `jackray-007`
- **Password**: Paste your token (the `ghp_...` code)

---

## Alternative: Use Token in URL (Easier!)

Instead of entering it each time, you can put it in the URL:

```bash
git remote set-url origin https://ghp_YOUR_TOKEN_HERE@github.com/jackray-007/peloton-archive.git
```

Replace `YOUR_TOKEN_HERE` with your actual token.

Then just run:
```bash
git push -u origin main
```

---

## Quick Steps:

1. **Get token**: https://github.com/settings/tokens
2. **Copy token** (starts with `ghp_...`)
3. **Run these commands**:

```bash
# Replace YOUR_TOKEN with the actual token
git remote set-url origin https://YOUR_TOKEN@github.com/jackray-007/peloton-archive.git
git push -u origin main
```

---

## Need Help?

If you get stuck, just tell me what step you're on!


