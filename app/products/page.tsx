import { Metadata } from 'next';
import { Suspense } from 'react';
import { getProducts } from '@/lib/products';
import ProductsContent from './products-content';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://peloton-archive.vercel.app';

export const metadata: Metadata = {
  title: 'Shop Pro & World Tour Cycling Kits | The Peloton Archive',
  description: 'Browse authentic World Tour and Pro Tour cycling kits, jerseys, bibs, and equipment. Shop professional cycling gear from top teams like Ineos Grenadiers, Jumbo-Visma, UAE Team Emirates, and more. Filter by team, category, year, and condition.',
  keywords: [
    'cycling kits',
    'cycling jerseys',
    'cycling bibs',
    'cycling equipment',
    'world tour cycling',
    'pro tour cycling',
    'authentic cycling gear',
    'professional cycling',
    'pro cycling',
    'world tour cycling kits',
    'pro tour cycling kits',
    'cycling collectibles',
    'cycling merchandise',
    'cycling apparel',
    'authentic cycling apparel',
    'Ineos Grenadiers',
    'Jumbo-Visma',
    'UAE Team Emirates',
    'cycling gear',
    'cycling clothing',
  ],
  authors: [{ name: 'The Peloton Archive' }],
  openGraph: {
    title: 'Shop Pro & World Tour Cycling Kits | The Peloton Archive',
    description: 'Browse authentic World Tour and Pro Tour cycling kits, jerseys, bibs, and equipment from top professional cycling teams.',
    url: `${baseUrl}/products`,
    siteName: 'The Peloton Archive',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'The Peloton Archive - Authentic Cycling Kits',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop Pro & World Tour Cycling Kits | The Peloton Archive',
    description: 'Browse authentic World Tour and Pro Tour cycling kits, jerseys, bibs, and equipment from top professional cycling teams.',
    images: [`${baseUrl}/og-image.jpg`],
    creator: '@pelotonarchive',
  },
  alternates: {
    canonical: `${baseUrl}/products`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

function Loading() {
  return (
    <div className="min-h-screen bg-white pt-16 flex items-center justify-center">
      <p className="text-lg text-black/50 font-light">Loading products...</p>
    </div>
  );
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <Suspense fallback={<Loading />}>
      <ProductsContent initialProducts={products} />
    </Suspense>
  );
}
