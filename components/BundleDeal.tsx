'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Product } from '@/types';

interface BundleDealProps {
  products: Product[];
  discount: number; // Percentage discount
}

export default function BundleDeal({ products, discount }: BundleDealProps) {
  const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
  const discountedPrice = totalPrice * (1 - discount / 100);
  const savings = totalPrice - discountedPrice;

  return (
    <div className="border border-black/10 p-8 bg-black/5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-light text-black tracking-tight mb-2">Complete the Look</h3>
          <p className="text-sm text-black/60 font-light tracking-tight">
            Bundle {products.length} items and save {discount}%
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-light text-black tracking-tight">${discountedPrice.toFixed(2)}</div>
          <div className="text-sm text-black/40 line-through">${totalPrice.toFixed(2)}</div>
          <div className="text-xs text-black/60 font-light tracking-tight mt-1">Save ${savings.toFixed(2)}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="group">
            <div className="relative aspect-square bg-black/5 overflow-hidden mb-2">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <p className="text-xs font-light text-black/70 tracking-tight line-clamp-1">{product.name}</p>
            <p className="text-xs font-light text-black/50 tracking-tight">${product.price}</p>
          </Link>
        ))}
      </div>

      <button className="w-full py-3 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2">
        <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
        Add Bundle to Cart
      </button>
    </div>
  );
}

