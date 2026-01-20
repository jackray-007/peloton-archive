'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2 } from 'lucide-react';
import { products } from '@/lib/products';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ComparePage() {
  const [compareList, setCompareList] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('compareList');
    if (saved) {
      try {
        const productIds = JSON.parse(saved);
        const compared = productIds.map((id: string) => products.find((p: Product) => p.id === id)).filter(Boolean);
        setCompareList(compared);
      } catch (e) {
        console.error('Error loading compare list:', e);
      }
    }
  }, []);

  useEffect(() => {
    const ids = compareList.map(p => p.id);
    localStorage.setItem('compareList', JSON.stringify(ids));
  }, [compareList]);

  const removeFromCompare = (productId: string) => {
    setCompareList(prev => prev.filter(p => p.id !== productId));
  };

  if (compareList.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white pt-20">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-4">
              Compare Products
            </h1>
            <p className="text-lg text-black/60 font-light tracking-tight mb-8">
              No products to compare. Add products to compare from the product pages.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black">
              Compare Products
            </h1>
            <button
              onClick={() => setCompareList([])}
              className="text-xs font-light text-black/50 hover:text-black tracking-wider uppercase border-b border-black/20 hover:border-black/40 transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="text-left p-4 text-xs font-light text-black/60 tracking-wider uppercase">Product</th>
                  {compareList.map((product) => (
                    <th key={product.id} className="text-left p-4 w-64">
                      <div className="relative">
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute top-0 right-0 p-1 text-black/40 hover:text-black transition-colors"
                        >
                          <X className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                        <Link href={`/products/${product.id}`} className="block">
                          <div className="relative aspect-[3/4] bg-black/5 overflow-hidden mb-4">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="256px"
                            />
                          </div>
                          <h3 className="text-sm font-light text-black tracking-tight mb-1">{product.name}</h3>
                          <p className="text-xs text-black/60 font-light tracking-tight">{product.team}</p>
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black/5">
                  <td className="p-4 text-xs font-light text-black/60 tracking-wider uppercase">Price</td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4">
                      <div className="text-sm font-light text-black tracking-tight">
                        ${product.price}
                        {product.originalPrice && (
                          <span className="text-xs text-black/40 line-through ml-2">${product.originalPrice}</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="p-4 text-xs font-light text-black/60 tracking-wider uppercase">Team</td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4 text-sm font-light text-black tracking-tight">
                      {product.team}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="p-4 text-xs font-light text-black/60 tracking-wider uppercase">Year</td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4 text-sm font-light text-black tracking-tight">
                      {product.year}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="p-4 text-xs font-light text-black/60 tracking-wider uppercase">Condition</td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4 text-sm font-light text-black tracking-tight capitalize">
                      {product.condition}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="p-4 text-xs font-light text-black/60 tracking-wider uppercase">Size</td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4 text-sm font-light text-black tracking-tight">
                      {product.size || 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="p-4 text-xs font-light text-black/60 tracking-wider uppercase">Tour Level</td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4 text-sm font-light text-black tracking-tight">
                      {product.tour ? product.tour.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="p-4 text-xs font-light text-black/60 tracking-wider uppercase">Stock</td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4">
                      <span className={`text-sm font-light tracking-tight ${product.inStock ? 'text-black' : 'text-black/50'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

