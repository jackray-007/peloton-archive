'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-black/60 font-light tracking-tight max-w-2xl mb-16">
            Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-black/10 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-black/10 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-black/10 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-black/10 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-5 h-5 text-black/60" strokeWidth={1.5} />
                    <h3 className="text-lg font-light text-black tracking-tight">Email</h3>
                  </div>
                  <p className="text-sm text-black/70 font-light tracking-tight">
                    support@pelotonarchive.com
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Phone className="w-5 h-5 text-black/60" strokeWidth={1.5} />
                    <h3 className="text-lg font-light text-black tracking-tight">Phone</h3>
                  </div>
                  <p className="text-sm text-black/70 font-light tracking-tight">
                    +1 (555) 123-4567
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-black/60" strokeWidth={1.5} />
                    <h3 className="text-lg font-light text-black tracking-tight">Address</h3>
                  </div>
                  <p className="text-sm text-black/70 font-light tracking-tight leading-relaxed">
                    123 Cycling Street<br />
                    San Francisco, CA 94102<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}


