'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Gift } from 'lucide-react';

export default function GiftCardsPage() {
  const [amount, setAmount] = useState(50);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');

  const handlePurchase = () => {
    alert(`Gift card purchase functionality would be integrated with payment processing. Amount: $${amount}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-4">
            Gift Cards
          </h1>
          <p className="text-lg text-black/60 font-light tracking-tight max-w-2xl mb-16">
            Give the gift of premium cycling gear. Digital gift cards are delivered instantly via email.
          </p>

          <div className="max-w-2xl">
            <div className="border border-black/10 p-8 mb-8">
              <div className="flex items-center gap-4 mb-8">
                <Gift className="w-8 h-8 text-black/40" strokeWidth={1.5} />
                <div>
                  <h2 className="text-2xl font-light text-black tracking-tight mb-1">Digital Gift Card</h2>
                  <p className="text-sm text-black/60 font-light tracking-tight">
                    Never expires • Instant delivery • Perfect for any cycling enthusiast
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                    Amount
                  </label>
                  <div className="grid grid-cols-4 gap-3 mb-3">
                    {[25, 50, 100, 200].map((value) => (
                      <button
                        key={value}
                        onClick={() => setAmount(value)}
                        className={`px-4 py-3 border text-sm font-light tracking-tight transition-colors ${
                          amount === value
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black/70 border-black/10 hover:border-black/30'
                        }`}
                      >
                        ${value}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    min="10"
                    max="1000"
                    className="w-full px-4 py-3 border border-black/10 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                    Recipient Email
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-black/10 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors"
                    placeholder="recipient@email.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-black/10 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors resize-none"
                    placeholder="Add a personal message..."
                  />
                </div>

                <button
                  onClick={handlePurchase}
                  className="w-full px-8 py-4 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all"
                >
                  Purchase Gift Card - ${amount}
                </button>
              </div>
            </div>

            <div className="space-y-4 text-sm text-black/60 font-light tracking-tight">
              <h3 className="text-lg font-light text-black tracking-tight mb-4">How It Works</h3>
              <ul className="space-y-2">
                <li>• Gift cards are delivered instantly via email</li>
                <li>• Never expire - use anytime</li>
                <li>• Can be used for any purchase on our site</li>
                <li>• Perfect for birthdays, holidays, or any occasion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}


