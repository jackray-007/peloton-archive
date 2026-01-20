'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types';

interface RecentlyViewedContextType {
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
  clearRecentlyViewed: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) {
      try {
        const productIds = JSON.parse(saved);
        if (productIds.length > 0) {
          import('@/lib/products').then(({ products }) => {
            const viewed = productIds.map((id: string) => products.find((p: Product) => p.id === id)).filter(Boolean);
            if (viewed.length > 0) {
              setRecentlyViewed(viewed);
            }
          });
        }
      } catch (e) {
        console.error('Error loading recently viewed:', e);
      }
    }
  }, []);

  useEffect(() => {
    // Only save if there are items or if localStorage already has data
    if (recentlyViewed.length > 0 || localStorage.getItem('recentlyViewed')) {
      const ids = recentlyViewed.map(p => p.id);
      localStorage.setItem('recentlyViewed', JSON.stringify(ids));
    }
  }, [recentlyViewed]);

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      // Check if product already exists at the front
      if (prev.length > 0 && prev[0].id === product.id) {
        return prev; // Already at front, no need to update
      }
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 10); // Keep last 10
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed, clearRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}

