'use client';

import { useState } from 'react';
import { Mail, Bell } from 'lucide-react';

interface EmailNotificationsProps {
  productId?: string;
  productName?: string;
  type?: 'restock' | 'price-drop' | 'new-arrival';
}

export default function EmailNotifications({ productId, productName, type = 'restock' }: EmailNotificationsProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to an API
    alert(`You'll be notified via email when ${type === 'restock' ? 'this product is back in stock' : type === 'price-drop' ? 'the price drops' : 'new products arrive'}`);
    setSubscribed(true);
    setEmail('');
  };

  const messages = {
    restock: {
      title: 'Notify Me When Back in Stock',
      description: 'Get an email when this product is available again',
    },
    'price-drop': {
      title: 'Price Drop Alert',
      description: 'Get notified if the price of this product decreases',
    },
    'new-arrival': {
      title: 'New Arrivals',
      description: 'Be the first to know about new products',
    },
  };

  const message = messages[type];

  return (
    <div className="border border-black/10 p-6 bg-black/5">
      <div className="flex items-start gap-4 mb-4">
        <Bell className="w-5 h-5 text-black/60 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
        <div className="flex-1">
          <h3 className="text-sm font-light text-black tracking-tight mb-1">{message.title}</h3>
          <p className="text-xs text-black/60 font-light tracking-tight">{message.description}</p>
        </div>
      </div>
      {!subscribed ? (
        <form onSubmit={handleSubscribe} className="flex items-center gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-2 border border-black/10 text-xs font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white hover:bg-black/90 font-light text-xs tracking-wider uppercase transition-all flex items-center gap-2"
          >
            <Mail className="w-3 h-3" strokeWidth={1.5} />
            Notify
          </button>
        </form>
      ) : (
        <div className="text-xs font-light text-black/60 tracking-tight">
          ✓ You'll be notified via email
        </div>
      )}
    </div>
  );
}


