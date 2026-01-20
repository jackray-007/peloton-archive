# 💳 Stripe Payment Setup Guide

## ✅ What's Been Implemented

- ✅ Stripe packages installed
- ✅ Checkout API route created
- ✅ Session retrieval API route
- ✅ Success page
- ✅ Cancel page
- ✅ Cart integrated with Stripe

## 🔑 Setup Steps

### Step 1: Create Stripe Account

1. **Go to**: https://stripe.com
2. **Sign up** for a free account
3. **Complete** account setup

### Step 2: Get Your API Keys

1. **Go to**: https://dashboard.stripe.com/apikeys
2. **Copy** your keys:
   - **Publishable Key** (starts with `pk_test_...` or `pk_live_...`)
   - **Secret Key** (starts with `sk_test_...` or `sk_live_...`)

### Step 3: Add Keys to Environment Variables

#### For Local Development:

1. **Create** `.env.local` file in your project root:
   ```bash
   cd /Users/Jack/Downloads/peloton-archive
   touch .env.local
   ```

2. **Add** these variables:
   ```env
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

#### For Vercel Deployment:

1. **Go to**: Vercel Dashboard → Your Project → Settings → Environment Variables
2. **Add** these variables:
   - `STRIPE_SECRET_KEY` = `sk_test_...` (or `sk_live_...` for production)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_test_...` (or `pk_live_...` for production)
   - `NEXT_PUBLIC_SITE_URL` = `https://your-site.vercel.app`

### Step 4: Test Mode vs Live Mode

**Test Mode** (Development):
- Use `pk_test_...` and `sk_test_...`
- Use test card numbers (see below)
- No real charges

**Live Mode** (Production):
- Use `pk_live_...` and `sk_live_...`
- Real payments
- Requires account verification

---

## 🧪 Testing

### Test Card Numbers

Use these in **Test Mode**:

**Successful Payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/34`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

**Declined Payment:**
- Card: `4000 0000 0000 0002`

**Requires Authentication:**
- Card: `4000 0025 0000 3155`

**More test cards**: https://stripe.com/docs/testing

---

## 🚀 How It Works

1. **User clicks "Proceed to Checkout"** in cart
2. **API creates Stripe Checkout session** with cart items
3. **User redirected to Stripe** secure checkout page
4. **User enters payment** details
5. **Stripe processes payment**
6. **User redirected back** to success/cancel page

---

## 📋 Features Included

✅ Secure payment processing
✅ Shipping address collection
✅ Automatic shipping calculation (free over $200)
✅ Order confirmation
✅ Success/cancel pages
✅ Session tracking

---

## 🔒 Security Notes

- **Never commit** `.env.local` to git (already in .gitignore)
- **Use test keys** for development
- **Switch to live keys** only when ready for production
- **Secret key** stays on server (never exposed to client)

---

## 💰 Pricing

**Stripe Fees:**
- 2.9% + $0.30 per successful card charge
- No monthly fees
- No setup fees
- Free for first $1M in revenue (if you're a startup)

---

## 🐛 Troubleshooting

**Error: "Stripe secret key not found"**
- Make sure `.env.local` exists
- Check variable names are correct
- Restart dev server after adding env vars

**Error: "Invalid API key"**
- Verify you copied the full key
- Check if you're using test keys in test mode
- Make sure no extra spaces

**Checkout page not loading**
- Check browser console for errors
- Verify `NEXT_PUBLIC_SITE_URL` is set correctly
- Make sure Stripe keys are valid

---

## 📚 Next Steps

After setup:
1. Test with test card numbers
2. Verify success/cancel pages work
3. Check email confirmations (if configured)
4. Switch to live keys when ready

---

## 🆘 Need Help?

- **Stripe Docs**: https://stripe.com/docs
- **Stripe Support**: https://support.stripe.com
- **Test Cards**: https://stripe.com/docs/testing

