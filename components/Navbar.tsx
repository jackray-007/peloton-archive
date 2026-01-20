'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import SearchModal from './SearchModal';
import { useWishlist } from '@/contexts/WishlistContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(0);
  const { wishlist } = useWishlist();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled(prev => {
            // Only update if value actually changed
            if (prev !== scrolled) {
              return scrolled;
            }
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Set initial state
    const initialScrolled = window.scrollY > 20;
    setIsScrolled(initialScrolled);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-black/5 shadow-sm' 
          : 'bg-white/80 backdrop-blur-sm border-b border-black/5'
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center group">
            <span className="text-sm font-light text-black tracking-tight uppercase group-hover:opacity-70 transition-opacity">
              The Peloton Archive
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-10">
            <Link 
              href="/products" 
              className="text-xs font-light text-black/70 hover:text-black transition-colors tracking-wider uppercase relative group"
            >
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/teams" 
              className="text-xs font-light text-black/70 hover:text-black transition-colors tracking-wider uppercase relative group"
            >
              Teams
              <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/about" 
              className="text-xs font-light text-black/70 hover:text-black transition-colors tracking-wider uppercase relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/products?category=jersey" 
              className="text-xs font-light text-black/70 hover:text-black transition-colors tracking-wider uppercase relative group"
            >
              Jerseys
              <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/products?category=bibs" 
              className="text-xs font-light text-black/70 hover:text-black transition-colors tracking-wider uppercase relative group"
            >
              Bibs
              <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/products?category=equipment" 
              className="text-xs font-light text-black/70 hover:text-black transition-colors tracking-wider uppercase relative group"
            >
              Equipment
              <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Right side - Search, Cart, Menu */}
          <div className="flex items-center space-x-6">
            {/* Search */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-1 text-black/60 hover:text-black transition-colors group relative"
              aria-label="Search"
            >
              <Search className="w-4 h-4" strokeWidth={1.5} />
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
            </button>

            {/* Wishlist */}
            <Link 
              href="/wishlist" 
              className="relative p-1 text-black/60 hover:text-black transition-colors group"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-light">
                  {wishlist.length}
                </span>
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Cart */}
            <Link 
              href="/cart" 
              className="relative p-1 text-black/60 hover:text-black transition-colors group"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-light">
                  {cartCount}
                </span>
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-1 text-black/60 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <Menu className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Premium slide down */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-black/5 bg-white/98 backdrop-blur-md">
          <div className="px-6 py-8 space-y-6">
            <Link 
              href="/products" 
              className="block text-xs font-light text-black/70 hover:text-black transition-colors tracking-wider uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              href="/teams" 
              className="block text-xs font-light text-black/70 hover:text-black transition-colors tracking-wider uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Teams
            </Link>
            <Link 
              href="/about" 
              className="block text-xs font-light text-black/70 hover:text-black transition-colors tracking-wider uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/blog" 
              className="block text-xs font-light text-black/70 hover:text-black transition-colors tracking-wider uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/products?category=jersey" 
              className="block text-xs font-light text-black/70 hover:text-black transition-colors tracking-wider uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Jerseys
            </Link>
            <Link 
              href="/products?category=bibs" 
              className="block text-xs font-light text-black/70 hover:text-black transition-colors tracking-wider uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Bibs
            </Link>
            <Link 
              href="/products?category=equipment" 
              className="block text-xs font-light text-black/70 hover:text-black transition-colors tracking-wider uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Equipment
            </Link>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}
