import Link from 'next/link';
import { X, ArrowRight, ShoppingCart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CheckoutCancelPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
          <div className="max-w-2xl mx-auto text-center">
            {/* Cancel Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <X className="w-10 h-10 text-black/40" strokeWidth={2} />
              </div>
              <h1 className="text-4xl sm:text-5xl font-light tracking-tighter text-black mb-4">
                Payment Cancelled
              </h1>
              <p className="text-lg text-black/60 font-light tracking-tight mb-8">
                Your payment was cancelled. No charges were made.
              </p>
            </div>

            {/* Message */}
            <div className="border border-black/10 p-8 mb-8">
              <p className="text-sm text-black/70 font-light tracking-tight leading-relaxed mb-4">
                Your items are still in your cart. You can complete your purchase anytime.
              </p>
              <p className="text-sm text-black/50 font-light tracking-tight">
                If you experienced any issues, please contact our support team.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cart"
                className="inline-flex items-center justify-center px-8 py-4 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all group"
              >
                <ShoppingCart className="w-4 h-4 mr-2" strokeWidth={1.5} />
                Return to Cart
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 border border-black/20 text-black hover:border-black/40 font-light text-sm tracking-wider uppercase transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

