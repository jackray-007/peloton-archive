# The Peloton Archive

A premium e-commerce website for reselling authentic World Tour and Pro Tour cycling kits and equipment to enthusiasts.

## Features

- **Premium Design**: Modern, high-converting UI with smooth animations and responsive design
- **Product Catalog**: Browse cycling kits, jerseys, bibs, and equipment with advanced filtering
- **Product Details**: Detailed product pages with image galleries and comprehensive information
- **Shopping Cart**: Full cart functionality with quantity management
- **Trust Signals**: Authenticity guarantees, shipping information, and customer testimonials
- **Mobile Responsive**: Optimized for all device sizes

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
peloton-archive/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   └── about/             # About page
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
├── lib/                   # Utilities and data
│   └── products.ts        # Product data
└── types/                 # TypeScript types
    └── index.ts
```

## Features in Detail

### Homepage
- Hero section with compelling call-to-action
- Trust signals (authenticity, shipping, quality)
- Featured products showcase
- Why choose us section
- Newsletter signup

### Product Catalog
- Advanced filtering by category, team, and tour level
- Responsive grid layout
- Product cards with hover effects
- Search functionality (ready for implementation)

### Product Details
- High-quality image gallery
- Detailed product information
- Condition and size details
- Add to cart functionality
- Trust signals and guarantees

### Shopping Cart
- Add/remove items
- Quantity management
- Order summary with shipping calculation
- Free shipping threshold ($200)

## Customization

### Adding Products

Edit `lib/products.ts` to add new products. Each product should follow the `Product` interface defined in `types/index.ts`.

### Styling

The site uses Tailwind CSS. Customize colors and styles in:
- `app/globals.css` - Global styles and CSS variables
- Component files - Tailwind utility classes

### Images

Replace placeholder images with actual product photos. Update image paths in `lib/products.ts`.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with one click

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted with Node.js

## Future Enhancements

- [ ] User authentication and accounts
- [ ] Payment integration (Stripe, PayPal)
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Order tracking

## License

Private project - All rights reserved

## Contact

For inquiries about The Peloton Archive, please contact through the website.
