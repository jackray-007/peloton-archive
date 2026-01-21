'use client';

import { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'default' | 'minimal';
}

export default function NewsletterSignup({ variant = 'default' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail('');
    
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-b border-black/20 pb-1 focus-within:border-black/40 transition-colors">
        <Mail className="w-4 h-4 text-black/40" strokeWidth={1.5} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="flex-1 text-xs font-light text-black placeholder:text-black/40 bg-transparent border-none outline-none tracking-tight min-w-0"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-xs font-light text-black/60 hover:text-black transition-colors tracking-wider uppercase disabled:opacity-50"
        >
          {isSubmitting ? '...' : isSubmitted ? '✓' : 'Subscribe'}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-4 border-b border-black/20 pb-2 focus-within:border-black/40 transition-colors">
        <Mail className="w-4 h-4 text-black/40" strokeWidth={1.5} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 text-sm font-light text-black placeholder:text-black/40 bg-transparent border-none outline-none tracking-tight"
        />
        <button
          type="submit"
          disabled={isSubmitting || isSubmitted}
          className="inline-flex items-center text-xs font-light text-black/60 hover:text-black transition-colors tracking-wider uppercase group disabled:opacity-50"
        >
          {isSubmitting ? 'Subscribing...' : isSubmitted ? 'Subscribed' : 'Subscribe'}
          {!isSubmitting && !isSubmitted && (
            <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
          )}
        </button>
      </div>
      {isSubmitted && (
        <p className="text-xs font-light text-black/50 tracking-tight">
          Thank you for subscribing. Check your email for confirmation.
        </p>
      )}
    </form>
  );
}


