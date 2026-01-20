import { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsContent from './products-content';

export const metadata: Metadata = {
  title: 'Shop Cycling Kits & Equipment',
  description: 'Browse our collection of authentic World Tour and Pro Tour cycling kits, jerseys, bibs, and equipment. Filter by team, category, year, condition, and more.',
  keywords: [
    'cycling kits',
    'cycling jerseys',
    'cycling bibs',
    'cycling equipment',
    'world tour cycling',
    'pro tour cycling',
    'authentic cycling gear',
  ],
  openGraph: {
    title: 'Shop Cycling Kits & Equipment | The Peloton Archive',
    description: 'Browse our collection of authentic World Tour and Pro Tour cycling kits, jerseys, bibs, and equipment.',
    type: 'website',
  },
};

function Loading() {
  return (
    <div className="min-h-screen bg-white pt-16 flex items-center justify-center">
      <p className="text-lg text-black/50 font-light">Loading products...</p>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsContent />
    </Suspense>
  );
}
