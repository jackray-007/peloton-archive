'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SizeRecommendationPage() {
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    height: '',
    weight: '',
  });
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chest = parseFloat(measurements.chest);
    const waist = parseFloat(measurements.waist);

    if (!chest || !waist) {
      alert('Please enter your measurements');
      return;
    }

    // Simple size recommendation logic
    let size = '';
    if (chest <= 88 && waist <= 74) {
      size = 'XS';
    } else if (chest <= 92 && waist <= 78) {
      size = 'S';
    } else if (chest <= 96 && waist <= 82) {
      size = 'M';
    } else if (chest <= 100 && waist <= 86) {
      size = 'L';
    } else {
      size = 'XL';
    }

    setRecommendedSize(size);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-4">
            Size Recommendation
          </h1>
          <p className="text-lg text-black/60 font-light tracking-tight max-w-2xl mb-16">
            Enter your measurements to get a personalized size recommendation for our cycling kits.
          </p>

          <div className="max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-8 mb-12">
              <div>
                <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                  Chest Measurement (cm)
                </label>
                <input
                  type="number"
                  value={measurements.chest}
                  onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
                  className="w-full px-4 py-3 border border-black/10 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors"
                  placeholder="e.g., 92"
                  required
                />
                <p className="text-xs font-light text-black/40 mt-2 tracking-tight">
                  Measure around the fullest part of your chest
                </p>
              </div>

              <div>
                <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                  Waist Measurement (cm)
                </label>
                <input
                  type="number"
                  value={measurements.waist}
                  onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                  className="w-full px-4 py-3 border border-black/10 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors"
                  placeholder="e.g., 78"
                  required
                />
                <p className="text-xs font-light text-black/40 mt-2 tracking-tight">
                  Measure around your natural waistline
                </p>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all"
              >
                Get Recommendation
              </button>
            </form>

            {recommendedSize && (
              <div className="p-8 bg-black/5 border border-black/10 mb-8">
                <h3 className="text-2xl font-light text-black tracking-tight mb-4">
                  Recommended Size: {recommendedSize}
                </h3>
                <p className="text-sm text-black/70 font-light tracking-tight leading-relaxed mb-6">
                  Based on your measurements, we recommend size <strong>{recommendedSize}</strong>. 
                  Please note that our kits are designed for a performance "race fit." If you prefer 
                  a more relaxed fit, consider sizing up.
                </p>
                <Link
                  href="/size-guide"
                  className="inline-flex items-center text-xs font-light text-black/60 hover:text-black tracking-wider uppercase border-b border-black/20 hover:border-black/40 transition-colors"
                >
                  View Full Size Guide
                  <ArrowRight className="w-3 h-3 ml-1" strokeWidth={1.5} />
                </Link>
              </div>
            )}

            <div className="p-8 bg-black/5 border border-black/10">
              <h3 className="text-lg font-light text-black tracking-tight mb-4">
                How to Measure
              </h3>
              <ul className="space-y-3 text-sm text-black/70 font-light tracking-tight">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span><strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape level.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span><strong>Waist:</strong> Measure around your natural waistline, typically the narrowest part of your torso.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span><strong>Fit Note:</strong> Our kits are designed for a snug, aerodynamic fit. If you're between sizes, we recommend sizing up for comfort.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

