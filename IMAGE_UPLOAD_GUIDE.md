# Image Upload Guide

## How to Upload Images

1. **Navigate to Upload Page**
   - Go to `/admin/upload` in your browser
   - Or visit: `http://localhost:3001/admin/upload`

2. **Upload Images**
   - Optionally enter a Product ID (e.g., "1" for product ID 1)
   - Click the upload area or drag and drop images
   - Select one or multiple images (PNG, JPG, WEBP up to 10MB each)
   - Click "Upload" button

3. **Get Image URLs**
   - After upload, you'll see the image URLs
   - Copy the URLs (they'll look like `/images/products/1-1234567890.jpg`)

4. **Update Product Data**
   - Open `lib/products.ts`
   - Find the product you want to update
   - Replace the `image` and `images` URLs with your uploaded image URLs
   - Example:
     ```typescript
     image: '/images/products/1-1234567890.jpg',
     images: [
       '/images/products/1-1234567890.jpg',
       '/images/products/1-1234567891.jpg'
     ],
     ```

## File Storage

- Images are saved to: `public/images/products/`
- Files are named: `{productId}-{timestamp}.{extension}`
- If no product ID is provided: `upload-{timestamp}.{extension}`

## Supported Formats

- PNG
- JPG/JPEG
- WEBP

## File Size Limit

- Maximum 10MB per file

## Notes

- Images are stored locally in the `public` folder
- The `public/images/products/` folder is in `.gitignore` by default
- To track images in git, remove the ignore rules from `.gitignore`
- For production, consider using cloud storage (AWS S3, Cloudinary, etc.)

