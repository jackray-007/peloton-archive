# Placeholder Images Setup Guide

## Overview
All jersey and bib products are now configured to use placeholder images until you upload the actual kit images.

## Image Paths
- **Jerseys**: `/images/products/jersey-placeholder.jpg`
- **Bib Shorts**: `/images/products/bib-placeholder.jpg`

## How to Upload Your Placeholder Images

### Option 1: Direct File Upload (Recommended)
1. Save your white jersey image as `jersey-placeholder.jpg`
2. Save your black bib shorts image as `bib-placeholder.jpg`
3. Copy both files to: `public/images/products/`

### Option 2: Using Admin Upload
1. Go to `/admin/upload`
2. Select any product (doesn't matter which one)
3. Upload your white jersey image
4. After upload, rename the file to `jersey-placeholder.jpg` in the `public/images/products/` folder
5. Repeat for the black bib shorts image → rename to `bib-placeholder.jpg`

### Option 3: Using Terminal
```bash
cd /Users/Jack/Downloads/peloton-archive
# Copy your images to the products folder
cp /path/to/your/white-jersey.jpg public/images/products/jersey-placeholder.jpg
cp /path/to/your/black-bibs.jpg public/images/products/bib-placeholder.jpg
```

## Products Updated

### Jerseys (using jersey-placeholder.jpg):
- Jumbo-Visma 2023 Yellow Jersey
- Quick-Step Alpha Vinyl 2023 Jersey
- Bora-Hansgrohe 2023 Race Jersey
- Trek-Segafredo 2024 Race Jersey
- AG2R Citroën 2023 Jersey
- Lotto Dstny 2024 Jersey
- Cofidis 2023 Race Jersey

**Note:** Ineos Grenadiers 2024 Race Jersey (ID: 1) still uses its uploaded image.

### Bib Shorts (using bib-placeholder.jpg):
- UAE Team Emirates 2024 Bib Shorts
- Team DSM 2024 Bib Shorts

## After Uploading
Once you've placed the images in `public/images/products/`:
1. Refresh your browser
2. All jersey products will show the white jersey placeholder
3. All bib products will show the black bib shorts placeholder

## Replacing with Real Images Later
When you're ready to add real kit images:
1. Upload images through `/admin/upload` or `/admin/images`
2. Update the product in `lib/products.ts` to use the new image path
3. The placeholder system makes it easy to swap images later!

