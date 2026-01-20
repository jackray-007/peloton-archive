'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package, CheckCircle, Truck, MapPin } from 'lucide-react';

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock tracking data
    setTrackingInfo({
      orderNumber,
      status: 'shipped',
      estimatedDelivery: '2024-01-25',
      trackingNumber: '1Z999AA10123456784',
      carrier: 'UPS',
      steps: [
        { status: 'ordered', date: '2024-01-20', completed: true },
        { status: 'processing', date: '2024-01-21', completed: true },
        { status: 'shipped', date: '2024-01-22', completed: true },
        { status: 'in-transit', date: '2024-01-23', completed: true },
        { status: 'delivered', date: '2024-01-25', completed: false },
      ],
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-4">
            Track Your Order
          </h1>
          <p className="text-lg text-black/60 font-light tracking-tight max-w-2xl mb-16">
            Enter your order number to track your shipment.
          </p>

          <div className="max-w-2xl">
            <form onSubmit={handleTrack} className="mb-12">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Order Number"
                  required
                  className="flex-1 px-4 py-3 border border-black/10 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all"
                >
                  Track
                </button>
              </div>
            </form>

            {trackingInfo && (
              <div className="border border-black/10 p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-light text-black tracking-tight mb-4">Order #{trackingInfo.orderNumber}</h2>
                  <div className="flex items-center gap-4 text-sm font-light text-black/60 tracking-tight">
                    <span>Status: <strong className="text-black">{trackingInfo.status}</strong></span>
                    <span>•</span>
                    <span>Estimated Delivery: {trackingInfo.estimatedDelivery}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {trackingInfo.steps.map((step: any, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-black text-white' : 'bg-black/10 text-black/30'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4" strokeWidth={1.5} />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-current" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-light text-black tracking-tight capitalize mb-1">
                          {step.status.replace('-', ' ')}
                        </div>
                        <div className="text-xs font-light text-black/50 tracking-tight">
                          {step.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-black/10">
                  <div className="flex items-center gap-3 text-sm font-light text-black/60 tracking-tight">
                    <Truck className="w-4 h-4" strokeWidth={1.5} />
                    <span>Tracking Number: {trackingInfo.trackingNumber}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-light text-black/60 tracking-tight mt-2">
                    <MapPin className="w-4 h-4" strokeWidth={1.5} />
                    <span>Carrier: {trackingInfo.carrier}</span>
                  </div>
                </div>
              </div>
            )}

            {!trackingInfo && (
              <div className="border border-black/10 p-12 text-center">
                <Package className="w-16 h-16 text-black/20 mx-auto mb-6" strokeWidth={1} />
                <p className="text-sm text-black/60 font-light tracking-tight">
                  Enter your order number above to track your shipment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

