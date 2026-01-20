import Link from 'next/link';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';

export default function Footer() {
  return (
    <footer className="bg-black text-white/60 border-t border-white/5">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-light text-white mb-6 tracking-wider uppercase">The Peloton Archive</h3>
            <p className="text-sm text-white/50 font-light tracking-tight max-w-md leading-relaxed mb-8">
              Your premier destination for authentic World Tour and Pro Tour cycling kits and equipment. 
              Connecting enthusiasts with the gear of champions.
            </p>
            <div className="mb-8">
              <p className="text-xs font-light text-white/60 mb-4 tracking-wider uppercase">Newsletter</p>
              <NewsletterSignup variant="minimal" />
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <Mail className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-light text-white mb-6 tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/products" className="text-sm text-white/50 hover:text-white font-light tracking-tight transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=jersey" className="text-sm text-white/50 hover:text-white font-light tracking-tight transition-colors">
                  Jerseys
                </Link>
              </li>
              <li>
                <Link href="/products?category=bibs" className="text-sm text-white/50 hover:text-white font-light tracking-tight transition-colors">
                  Bib Shorts
                </Link>
              </li>
              <li>
                <Link href="/products?category=equipment" className="text-sm text-white/50 hover:text-white font-light tracking-tight transition-colors">
                  Equipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-light text-white mb-6 tracking-wider uppercase">Support</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-sm text-white/50 hover:text-white font-light tracking-tight transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-white/50 hover:text-white font-light tracking-tight transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-white/50 hover:text-white font-light tracking-tight transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-sm text-white/50 hover:text-white font-light tracking-tight transition-colors">
                  Size Guide
                </Link>
              </li>
                    <li>
                      <Link href="/contact" className="text-sm text-white/50 hover:text-white font-light tracking-tight transition-colors">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" className="text-sm text-white/50 hover:text-white font-light tracking-tight transition-colors">
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <Link href="/size-guide" className="text-sm text-white/50 hover:text-white font-light tracking-tight transition-colors">
                        Size Guide
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="text-sm text-white/50 hover:text-white font-light tracking-tight transition-colors">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/gift-cards" className="text-sm text-white/50 hover:text-white font-light tracking-tight transition-colors">
                        Gift Cards
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

        <div className="border-t border-white/5 pt-8">
          <p className="text-xs text-white/30 font-light tracking-tight">
            &copy; {new Date().getFullYear()} The Peloton Archive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
