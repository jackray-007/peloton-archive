'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, Heart } from 'lucide-react';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useWishlist } from '@/contexts/WishlistContext';

// Mock cart data - in a real app, this would come from a context/store
const mockCartItems = [
  {
    product: {
      id: '1',
      name: 'Ineos Grenadiers 2024 Race Jersey',
      team: 'Ineos Grenadiers',
      price: 249.99,
      image: 'https://placehold.co/200x200/ef4444/ffffff?text=Ineos',
      inStock: true,
    } as Product,
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addToWishlist } = useWishlist();

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.product.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.product.id !== id));
  };

  const saveForLater = (product: Product) => {
    addToWishlist(product);
    removeItem(product.id);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setIsProcessing(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          metadata: {
            // Add any additional metadata here
          },
        }),
      });

      const data = await response.json();

      if (data.error) {
        alert(`Error: ${data.error}`);
        setIsProcessing(false);
        return;
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to create checkout session');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {cartItems.length === 0 ? (
          <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
              <ShoppingCart className="w-16 h-16 text-black/10 mx-auto mb-6" strokeWidth={1.5} />
              <h2 className="text-3xl font-light text-black mb-4 tracking-tight">Your cart is empty</h2>
              <p className="text-sm text-black/50 font-light mb-8">Start adding some cycling gear to your cart!</p>
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all group"
              >
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="min-h-screen bg-white py-20">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-16">Cart</h1>

              <div className="grid lg:grid-cols-3 gap-16">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-8">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="border-b border-black/10 pb-8">
                      <div className="flex flex-col sm:flex-row gap-8">
                        <Link href={`/products/${item.product.id}`} className="relative w-full sm:w-40 h-40 bg-gray-50 overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 160px"
                          />
                        </Link>
                        <div className="flex-1">
                          <Link href={`/products/${item.product.id}`}>
                            <h3 className="text-sm font-light text-black hover:text-black/60 transition-colors tracking-tight uppercase mb-2">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-black/50 font-light tracking-tight uppercase mb-4">{item.product.team}</p>
                          <p className="text-lg font-light text-black tracking-tight mb-6">${item.product.price}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-black/20">
                              <button
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="px-4 py-2 hover:bg-black/5 transition-colors text-black/60 hover:text-black"
                              >
                                <Minus className="w-3 h-3" strokeWidth={1.5} />
                              </button>
                              <span className="px-6 py-2 min-w-[50px] text-center text-sm font-light text-black">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="px-4 py-2 hover:bg-black/5 transition-colors text-black/60 hover:text-black"
                              >
                                <Plus className="w-3 h-3" strokeWidth={1.5} />
                              </button>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => saveForLater(item.product)}
                                className="text-black/40 hover:text-black transition-colors"
                                title="Save for Later"
                              >
                                <Heart className="w-4 h-4" strokeWidth={1.5} />
                              </button>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="text-black/40 hover:text-black transition-colors"
                                title="Remove"
                              >
                                <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 border border-black/10 p-8">
                    <h2 className="text-xs font-light text-black mb-8 tracking-wider uppercase">Order Summary</h2>
                    <div className="space-y-4 mb-8 pb-8 border-b border-black/10">
                      <div className="flex justify-between text-sm text-black/60 font-light">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-black/60 font-light">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      {subtotal < 200 && (
                        <p className="text-xs text-black/40 font-light">
                          Add ${(200 - subtotal).toFixed(2)} more for free shipping
                        </p>
                      )}
                    </div>
                    <div className="mb-8">
                      <div className="flex justify-between text-lg font-light text-black tracking-tight">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleCheckout}
                      disabled={cartItems.length === 0}
                      className={`w-full py-4 font-light text-sm tracking-wider uppercase transition-all mb-4 ${
                        cartItems.length === 0
                          ? 'bg-black/10 text-black/30 cursor-not-allowed'
                          : 'bg-black text-white hover:bg-black/90'
                      }`}
                    >
                      {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                    </button>
                    <Link
                      href="/products"
                      className="block text-center text-xs text-black/50 hover:text-black font-light tracking-wider uppercase transition-colors"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
