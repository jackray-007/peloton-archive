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
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920')] bg-cover bg-center opacity-10 bg-fixed"></div>
          <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
            <div className="max-w-4xl">
              <div className="mb-8">
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter mb-6 leading-[0.9]">
                  The Peloton<br />Archive
                </h1>
              </div>
              <p className="text-lg sm:text-xl text-white/70 font-light tracking-tight max-w-2xl mb-12 leading-relaxed">
                Authentic cycling kits and equipment from the world's top teams. 
                Rare collectibles and current season gear for the discerning cyclist.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-black hover:bg-white/90 font-light text-sm tracking-wider uppercase transition-all group"
                >
                  Shop Collection
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/teams"
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white hover:border-white/40 font-light text-sm tracking-wider uppercase transition-all"
                >
                  Browse Teams
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        {featuredProducts.length > 0 && (
          <section className="py-12 sm:py-20 bg-white">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
              <div className="mb-12">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tighter text-black mb-4">
                  Featured
                </h2>
                <p className="text-sm text-black/50 font-light tracking-tight max-w-2xl">
                  Curated selection of premium cycling kits and equipment
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Team Collections Preview */}
        <section className="py-12 sm:py-20 bg-white border-t border-black/5">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mb-12">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tighter text-black mb-4">
                Team Collections
              </h2>
              <p className="text-sm text-black/50 font-light tracking-tight max-w-2xl mb-8">
                Explore authentic kits from the world's premier cycling teams
              </p>
              <Link
                href="/teams"
                className="inline-flex items-center text-xs text-black/50 hover:text-black font-light tracking-wider uppercase border-b border-black/20 hover:border-black/40 transition-colors"
              >
                View All Teams
                <ArrowRight className="w-3 h-3 ml-2" strokeWidth={1.5} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from(new Set(products.map(p => p.team))).slice(0, 8).map((team) => {
                const teamProducts = products.filter(p => p.team === team);
                const featuredProduct = teamProducts[0];
                return (
                  <Link
                    key={team}
                    href={`/teams/${team.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group"
                  >
                    <div className="relative aspect-square bg-gray-50 overflow-hidden mb-4">
                      {featuredProduct && (
                        <Image
                          src={featuredProduct.image}
                          alt={`${team} collection`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          loading="lazy"
                          quality={85}
                        />
                      )}
                    </div>
                    <h3 className="text-sm font-light text-black tracking-tight group-hover:underline">
                      {team}
                    </h3>
                    <p className="text-xs text-black/50 font-light tracking-tight mt-1">
                      {teamProducts.length} {teamProducts.length === 1 ? 'item' : 'items'}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="py-12 sm:py-20 bg-white border-t border-black/5">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
              <div className="mb-12">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tighter text-black mb-4">
                  Recently Viewed
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
                {recentlyViewed.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
