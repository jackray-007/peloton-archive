'use client';

import { useMemo } from 'react';
import { products } from '@/lib/products';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductRecommendationsProps {
  currentProduct: Product;
  limit?: number;
}

export default function ProductRecommendations({ currentProduct, limit = 4 }: ProductRecommendationsProps) {
  const recommendations = useMemo(() => {
    // Get products from same team
    const sameTeam = products.filter(p => p.team === currentProduct.team && p.id !== currentProduct.id);
    
    // Get products from same category
    const sameCategory = products.filter(
      p => p.category === currentProduct.category && p.id !== currentProduct.id && p.team !== currentProduct.team
    );
    
    // Get products from same tour level
    const sameTour = products.filter(
      p => p.tour === currentProduct.tour && p.id !== currentProduct.id && 
      p.team !== currentProduct.team && p.category !== currentProduct.category
    );
    
    // Combine and deduplicate
    const all = [...sameTeam, ...sameCategory, ...sameTour];
    const unique = Array.from(new Map(all.map(p => [p.id, p])).values());
    
    return unique.slice(0, limit);
  }, [currentProduct, limit]);

  if (recommendations.length === 0) return null;

  return (
    <div>
      <h2 className="text-4xl sm:text-5xl font-light tracking-tighter text-black mb-12">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

