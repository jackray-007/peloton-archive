'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts, products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext';

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const { recentlyViewed } = useRecentlyViewed();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section - Full screen, minimal, editorial */}
        <section className="relative min-h-screen flex items-center justify-center bg-black text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920')] bg-cover bg-center opacity-10"></div>
          <div className="relative max-w-[1920px] mx-auto px-6 lg:px-12 w-full">
            <div className="max-w-4xl">
              <div className="mb-8">
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter mb-6 leading-[0.9]">
                  The Peloton<br />Archive
                </h1>
              </div>
              <p className="text-lg sm:text-xl text-white/70 font-light tracking-tight max-w-2xl mb-12 leading-relaxed">
                Authentic World Tour & Pro Tour cycling kits and equipment. 
                Curated for the discerning cyclist.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-black hover:bg-white/90 font-light text-sm tracking-wider uppercase transition-all group"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white hover:border-white/40 font-light text-sm tracking-wider uppercase transition-all"
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Team Collections Preview */}
        <section className="py-32 bg-white border-t border-black/5">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
            <div className="mb-20">
              <div className="flex items-end justify-between mb-6">
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black">
                  Teams
                </h2>
                <Link
                  href="/teams"
                  className="text-xs text-black/60 hover:text-black font-light tracking-wider uppercase border-b border-black/20 hover:border-black/40 transition-colors pb-1"
                >
                  View All
                </Link>
              </div>
              <p className="text-sm text-black/50 font-light tracking-tight max-w-2xl">
                Explore collections from the world's most prestigious cycling teams.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 lg:gap-8">
              {Array.from(new Set(products.map(p => p.team))).slice(0, 6).map((team) => {
                const teamProduct = products.find(p => p.team === team);
                return (
                  <Link
                    key={team}
                    href={`/teams/${team.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group block"
                  >
                    <div className="relative aspect-square bg-gray-50 overflow-hidden mb-4">
                      <Image
                        src={teamProduct?.image || ''}
                        alt={team}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                      />
                    </div>
                    <p className="text-xs font-light text-black/70 group-hover:text-black transition-colors tracking-tight uppercase">
                      {team}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Products - Editorial layout */}
        <section className="py-32 bg-white">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
            <div className="mb-20">
              <div className="flex items-end justify-between mb-6">
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black">
                  Featured
                </h2>
                <Link
                  href="/products"
                  className="text-xs text-black/60 hover:text-black font-light tracking-wider uppercase border-b border-black/20 hover:border-black/40 transition-colors pb-1"
                >
                  View All
                </Link>
              </div>
              <p className="text-sm text-black/50 font-light tracking-tight max-w-2xl">
                A curated selection of premium cycling kits from the world's most prestigious teams.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Editorial Section - Minimal CTA */}
        <section className="py-32 bg-black text-white">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
            <div className="max-w-4xl">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter mb-8 leading-tight">
                Join the<br />Archive
              </h2>
              <p className="text-lg text-white/70 font-light tracking-tight max-w-2xl mb-12 leading-relaxed">
                Connect with fellow cycling enthusiasts. Stay updated on new arrivals and exclusive collections.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white hover:border-white/40 font-light text-sm tracking-wider uppercase transition-all group"
              >
                Explore Collection
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
