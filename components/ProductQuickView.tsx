'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingCart, Heart, Share2, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const images = product.images || [product.image];

  if (!isOpen) return null;

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: `${window.location.origin}/products/${product.id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/products/${product.id}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Image */}
            <div>
              <div className="relative aspect-square bg-black/5 overflow-hidden mb-4">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square overflow-hidden border transition-all ${
                        selectedImage === index ? 'border-black' : 'border-black/10'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 12.5vw"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <h2 className="text-3xl font-light text-black tracking-tight mb-2">{product.name}</h2>
              <p className="text-sm text-black/60 font-light tracking-tight mb-4">{product.team} • {product.year}</p>

              <div className="mb-6">
                {product.originalPrice ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-medium text-black">${product.price}</span>
                    <span className="text-lg text-black/40 line-through">${product.originalPrice}</span>
                  </div>
                ) : (
                  <span className="text-2xl font-medium text-black">${product.price}</span>
                )}
              </div>

              <p className="text-sm text-black/70 leading-relaxed mb-6 font-light tracking-tight">{product.description}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="font-light text-black/70 tracking-wider uppercase w-20">Condition:</span>
                  <span className="font-light text-black tracking-tight capitalize">{product.condition}</span>
                </div>
                {product.size && (
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="font-light text-black/70 tracking-wider uppercase w-20">Size:</span>
                    <span className="font-light text-black tracking-tight">{product.size}</span>
                  </div>
                )}
                <div className="flex items-center space-x-4 text-sm">
                  <span className="font-light text-black/70 tracking-wider uppercase w-20">Stock:</span>
                  <span className={`font-light tracking-tight ${product.inStock ? 'text-black' : 'text-black/50'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Link
                  href={`/products/${product.id}`}
                  className="flex-1 px-6 py-3 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all text-center"
                >
                  View Full Details
                </Link>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-3 border transition-colors ${
                    isInWishlist(product.id)
                      ? 'border-black bg-black text-white'
                      : 'border-black/10 text-black/70 hover:border-black/30'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} strokeWidth={1.5} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 border border-black/10 text-black/70 hover:border-black/30 transition-colors"
                >
                  <Share2 className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


