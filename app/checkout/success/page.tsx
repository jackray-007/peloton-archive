'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight, Package } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/checkout/session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setOrderDetails(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching order details:', err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
              <h1 className="text-4xl sm:text-5xl font-light tracking-tighter text-black mb-4">
                Order Confirmed
              </h1>
              <p className="text-lg text-black/60 font-light tracking-tight mb-8">
                Thank you for your purchase! Your order has been received and is being processed.
              </p>
            </div>

            {/* Order Details */}
            {loading ? (
              <div className="py-12">
                <p className="text-sm text-black/50 font-light">Loading order details...</p>
              </div>
            ) : orderDetails ? (
              <div className="border border-black/10 p-8 mb-8 text-left">
                <h2 className="text-sm font-light text-black mb-6 tracking-wider uppercase">Order Details</h2>
                <div className="space-y-3 text-sm font-light text-black/70">
                  {orderDetails.customer && (
                    <>
                      <div>
                        <span className="text-black/50">Email:</span> {orderDetails.customer.email}
                      </div>
                      {orderDetails.customer.name && (
                        <div>
                          <span className="text-black/50">Name:</span> {orderDetails.customer.name}
                        </div>
                      )}
                    </>
                  )}
                  {sessionId && (
                    <div>
                      <span className="text-black/50">Order ID:</span> {sessionId}
                    </div>
                  )}
                  <div>
                    <span className="text-black/50">Status:</span>{' '}
                    <span className="text-black font-medium capitalize">
                      {orderDetails.paymentStatus === 'paid' ? 'Paid' : orderDetails.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Next Steps */}
            <div className="space-y-4">
              <p className="text-sm text-black/60 font-light tracking-tight mb-6">
                You will receive an email confirmation shortly with your order details and tracking information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/order-tracking"
                  className="inline-flex items-center justify-center px-8 py-4 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all group"
                >
                  <Package className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Track Your Order
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
      </div>
      <Footer />
    </>
  );
}

