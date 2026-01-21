'use client';

import { useWishlist } from '@/contexts/WishlistContext';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-4">
                Wishlist
              </h1>
              <p className="text-lg text-black/60 font-light tracking-tight">
                {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
              </p>
            </div>
            {wishlist.length > 0 && (
              <button
                onClick={clearWishlist}
                className="text-xs font-light text-black/50 hover:text-black tracking-wider uppercase border-b border-black/20 hover:border-black/40 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-black/20 mx-auto mb-6" strokeWidth={1} />
              <h2 className="text-3xl font-light text-black tracking-tight mb-4">Your wishlist is empty</h2>
              <p className="text-black/60 mb-8 max-w-md mx-auto">
                Start adding products you love to your wishlist. Click the heart icon on any product to save it.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all group"
              >
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}


