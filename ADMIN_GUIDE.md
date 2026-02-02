# Peloton Archive – Admin Guide (No Coding)

Your partner can add products and photos from the browser. No code or repo access needed.

## Where to go

- **Admin URL:** `https://yoursite.com/admin/upload` or `https://yoursite.com/admin/products`
- **Password:** Set in Vercel (or locally in `.env.local`) as `NEXT_PUBLIC_ADMIN_PASSWORD`. Default is `admin` (change in production).

## Adding a new product

1. Go to **Admin → Products** (or `/admin/products`).
2. Log in with the admin password.
3. Click **Add Product**.
4. Fill in:
   - **Product name** (e.g. “Ineos Grenadiers 2024 Race Jersey”)
   - **Team**
   - **Category** (Jersey, Bibs, Gloves, etc.)
   - **Year**, **Condition**, **Size**
   - **Price** (and optional **Original price** for sales)
   - **Main image URL** (see “Adding photos” below)
   - **Description**
   - **In stock** / **Featured** checkboxes
5. Click **Add Product**. The product appears on the site immediately.

## Adding photos

### Option A: Upload for an existing product

1. Go to **Admin → Upload** (`/admin/upload`).
2. Log in.
3. **Select a product** from the list (search by name or team).
4. Click the upload area and choose one or more images (PNG, JPG, WEBP, up to 10MB).
5. Click **Upload**. The product’s images are updated on the site automatically.

### Option B: New product with photos

1. **Upload first:** Go to **Admin → Upload**, select any product (or create a placeholder product in Products), upload the image(s). Copy the image URL(s) shown after upload.
2. **Create product:** Go to **Admin → Products** → **Add Product**, fill in details, and paste the image URL into **Main image URL** (and add more in **Additional images** if needed).
3. If you used a placeholder product, you can delete it from the Products list after creating the real one.

### Option C: Image library

1. Go to **Admin → Image Library** (`/admin/images`).
2. You can bulk-upload images (they get URLs).
3. Use **Assign to product** to set an image as the main image for a product. The site updates right away.

## Deleting or editing a product

- **Products** page: use **Edit** (pencil) to change fields and **Update Product**, or **Delete** (trash) to remove the product from the site.

## One-time setup (you, not your partner)

1. **Vercel Blob (recommended for production)**  
   - In Vercel: Project → Storage → Create Database/Blob → connect “Blob”.  
   - This creates `BLOB_READ_WRITE_TOKEN`.  
   - Without this, uploads work only locally (files in `public/images/products/`); on Vercel they won’t persist.

2. **Admin password**  
   - In Vercel: Project → Settings → Environment Variables.  
   - Add `NEXT_PUBLIC_ADMIN_PASSWORD` with a strong password (and optionally `NEXT_PUBLIC_SITE_URL` = `https://pelotonarchive.com`).

After that, your partner only needs the admin URL and password to add products and photos with no coding.
