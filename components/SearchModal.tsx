'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && products.length === 0) {
      fetch('/api/products').then((res) => (res.ok ? res.json() : [])).then((data) => setProducts(Array.isArray(data) ? data : []));
    }
  }, [isOpen, products.length]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    const searchTerm = query.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.team.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    setResults(filtered.slice(0, 8));
  }, [query, products]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="absolute top-0 left-0 right-0 bg-white border-b border-black/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Search className="w-5 h-5 text-black/40" strokeWidth={1.5} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, teams, categories..."
              className="flex-1 text-sm font-light text-black placeholder:text-black/40 bg-transparent border-none outline-none tracking-tight"
            />
            <button
              onClick={onClose}
              className="p-1 text-black/40 hover:text-black transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          {query && (
            <div className="max-h-[60vh] overflow-y-auto">
              {results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-4 hover:bg-black/5 transition-colors group"
                    >
                      <div className="relative w-16 h-20 bg-gray-50 flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-light text-black/50 tracking-tight uppercase mb-1">
                          {product.team}
                        </p>
                        <p className="text-sm font-light text-black group-hover:text-black/60 transition-colors tracking-tight line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-xs font-light text-black/60 mt-1">
                          ${product.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                  {results.length === 8 && (
                    <Link
                      href={`/products?search=${encodeURIComponent(query)}`}
                      onClick={onClose}
                      className="block text-center text-xs font-light text-black/50 hover:text-black tracking-wider uppercase py-4 border-t border-black/10 transition-colors"
                    >
                      View All Results
                    </Link>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-sm font-light text-black/50 tracking-tight">
                    No products found for "{query}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


