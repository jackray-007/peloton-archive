'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, Package, Heart, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-12">
            My Account
          </h1>

          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-3 text-sm font-light tracking-tight transition-colors flex items-center gap-3 ${
                    activeTab === 'orders' ? 'bg-black text-white' : 'text-black/70 hover:bg-black/5'
                  }`}
                >
                  <Package className="w-4 h-4" strokeWidth={1.5} />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full text-left px-4 py-3 text-sm font-light tracking-tight transition-colors flex items-center gap-3 ${
                    activeTab === 'wishlist' ? 'bg-black text-white' : 'text-black/70 hover:bg-black/5'
                  }`}
                >
                  <Heart className="w-4 h-4" strokeWidth={1.5} />
                  Wishlist
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 text-sm font-light tracking-tight transition-colors flex items-center gap-3 ${
                    activeTab === 'profile' ? 'bg-black text-white' : 'text-black/70 hover:bg-black/5'
                  }`}
                >
                  <User className="w-4 h-4" strokeWidth={1.5} />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-4 py-3 text-sm font-light tracking-tight transition-colors flex items-center gap-3 ${
                    activeTab === 'settings' ? 'bg-black text-white' : 'text-black/70 hover:bg-black/5'
                  }`}
                >
                  <Settings className="w-4 h-4" strokeWidth={1.5} />
                  Settings
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-light text-black tracking-tight mb-8">Order History</h2>
                  <div className="border border-black/10 p-8">
                    <p className="text-sm text-black/60 font-light tracking-tight">
                      You haven't placed any orders yet. Start shopping to see your order history here.
                    </p>
                    <Link
                      href="/products"
                      className="inline-flex items-center justify-center mt-6 px-6 py-3 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-light text-black tracking-tight mb-8">Wishlist</h2>
                  <Link
                    href="/wishlist"
                    className="inline-flex items-center justify-center px-6 py-3 border border-black/10 text-black hover:border-black/30 font-light text-sm tracking-wider uppercase transition-all"
                  >
                    View Wishlist
                  </Link>
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-light text-black tracking-tight mb-8">Profile Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-black/10 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-black/10 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <button className="px-6 py-3 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-light text-black tracking-tight mb-8">Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 border-black/20 text-black" />
                        <span className="text-sm font-light text-black/70 tracking-tight">
                          Email notifications for new arrivals
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 border-black/20 text-black" />
                        <span className="text-sm font-light text-black/70 tracking-tight">
                          Price drop alerts
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 border-black/20 text-black" />
                        <span className="text-sm font-light text-black/70 tracking-tight">
                          Restock notifications
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}


