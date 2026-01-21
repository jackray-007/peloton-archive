'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { Heart, Eye } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import ProductQuickView from './ProductQuickView';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isNew = product.year === new Date().getFullYear() || product.year === new Date().getFullYear() - 1;
  const isLimited = product.condition === 'new' && product.price > 300;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  return (
    <>
      <div className="group relative bg-white overflow-hidden">
        <Link href={`/products/${product.id}`} className="block">
          {/* Image - Full width, no border */}
          <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              loading="lazy"
              quality={85}
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {isNew && (
                <div className="bg-white text-black px-2 py-1 text-[10px] font-light tracking-wider uppercase">
                  New
                </div>
              )}
              {isLimited && (
                <div className="bg-black text-white px-2 py-1 text-[10px] font-light tracking-wider uppercase">
                  Limited
                </div>
              )}
            </div>
            
            {product.originalPrice && (
              <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-[10px] font-light tracking-wider uppercase">
                Sale
              </div>
            )}
            
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white text-sm font-light tracking-wide uppercase">Out of Stock</span>
              </div>
            )}

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleQuickView}
                  className="p-2 bg-white/90 hover:bg-white transition-colors"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button
                  onClick={handleWishlistClick}
                  className={`p-2 transition-colors ${
                    isInWishlist(product.id)
                      ? 'bg-black text-white'
                      : 'bg-white/90 hover:bg-white'
                  }`}
                  title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </Link>

        {/* Content - Minimal, editorial style */}
        <div className="pt-6 pb-2">
          <div className="mb-3">
            <h3 className="text-sm font-light text-black/80 group-hover:text-black transition-colors tracking-tight uppercase mb-1">
              {product.team}
            </h3>
            <p className="text-xs text-black/50 font-light tracking-wide uppercase">
              {product.name}
            </p>
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              {product.originalPrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-light text-black tracking-tight">${product.price}</span>
                  <span className="text-xs text-black/40 line-through font-light">${product.originalPrice}</span>
                </div>
              ) : (
                <span className="text-sm font-light text-black tracking-tight">${product.price}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-black/40 font-light tracking-wider uppercase border border-black/10 px-2 py-0.5">
                {product.condition}
              </span>
              {product.tour && (
                <span className="text-[10px] text-black/60 font-light tracking-wider uppercase border border-black/20 px-2 py-0.5">
                  {product.tour === 'world-tour' ? 'WT' : 'PT'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <ProductQuickView product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
    </>
  );
}
