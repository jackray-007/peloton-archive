# How to Add Products to lib/products.ts

## Location

Add new products inside the `products` array, which starts at **line 11** and ends at **line 214**.

## Where to Add

You can add new products in two places:

### Option 1: Add at the End (Recommended)
Add your new product **before the closing bracket `];`** on line 214.

**Example:**
```typescript
  {
    id: '12',
    name: 'Cofidis 2023 Race Jersey',
    // ... rest of product
  },
  // 👇 ADD YOUR NEW PRODUCT HERE 👇
  {
    id: '13',  // Use the next available number
    name: 'Your New Product Name',
    // ... rest of fields
  },
];  // ← This closing bracket is on line 214
```

### Option 2: Add Anywhere in the Array
You can add products anywhere in the array, just make sure:
- Each product is separated by a comma `,`
- The product object is wrapped in curly braces `{ }`
- The last product before the closing `];` has a comma

## Step-by-Step Instructions

1. **Open** `lib/products.ts`
2. **Find** the last product (currently ends around line 213)
3. **Add a comma** after the last product's closing brace `},`
4. **Paste** your new product code (from the admin panel)
5. **Make sure** the new product has:
   - A unique `id` (use the next number, e.g., '13', '14', etc.)
   - A comma after the closing brace `},`
6. **Save** the file
7. **Refresh** your browser to see the new product

## Example - Adding Product ID 13

```typescript
  {
    id: '12',
    name: 'Cofidis 2023 Race Jersey',
    team: 'Cofidis',
    category: 'jersey',
    year: 2023,
    condition: 'excellent',
    price: 169.99,
    image: getImageUrl(undefined, 'https://images.unsplash.com/photo-1502744688674-c619d1586c6a?w=600&h=800&fit=crop&q=80'),
    images: [getImageUrl(undefined, 'https://images.unsplash.com/photo-1502744688674-c619d1586c6a?w=600&h=800&fit=crop&q=80')],
    description: 'Authentic Cofidis race jersey from 2023 season. Excellent condition.',
    size: 'M',
    inStock: true,
    featured: false,
    tour: 'world-tour',
  },
  // 👇 NEW PRODUCT GOES HERE 👇
  {
    id: '13',
    name: 'Your New Product',
    team: 'Team Name',
    // ... rest of your product data
  },
];  // ← Array ends here
```

## Important Notes

- **Unique IDs**: Each product must have a unique `id`. Use sequential numbers: '13', '14', '15', etc.
- **Commas**: Every product except the last one needs a comma after the closing brace `},`
- **Formatting**: Keep the same indentation (2 spaces) for consistency
- **Image URLs**: Use the URLs from the upload page, or external URLs

## Quick Reference

- **File**: `lib/products.ts`
- **Array starts**: Line 11 (`export const products: Product[] = [`)
- **Array ends**: Line 214 (`];`)
- **Current products**: 12 products (IDs 1-12)
- **Next available ID**: '13'


