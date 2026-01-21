import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Truck, Clock, Shield, Globe } from 'lucide-react';

export default function ShippingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="min-h-screen bg-white">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-12 leading-tight">
                Shipping
              </h1>

              <div className="space-y-16">
                {/* Shipping Options */}
                <section>
                  <h2 className="text-2xl font-light text-black mb-8 tracking-tight uppercase">Shipping Options</h2>
                  <div className="space-y-8">
                    <div className="border-b border-black/10 pb-8">
                      <div className="flex items-start gap-4 mb-4">
                        <Truck className="w-5 h-5 text-black/60 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div>
                          <h3 className="text-sm font-light text-black mb-2 tracking-tight uppercase">Standard Shipping</h3>
                          <p className="text-sm font-light text-black/70 tracking-tight leading-relaxed mb-2">
                            Free on orders over $200. $15 for orders under $200.
                          </p>
                          <p className="text-xs font-light text-black/50 tracking-tight">
                            Delivery: 5-7 business days
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-black/10 pb-8">
                      <div className="flex items-start gap-4 mb-4">
                        <Clock className="w-5 h-5 text-black/60 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div>
                          <h3 className="text-sm font-light text-black mb-2 tracking-tight uppercase">Express Shipping</h3>
                          <p className="text-sm font-light text-black/70 tracking-tight leading-relaxed mb-2">
                            $25 flat rate for expedited delivery.
                          </p>
                          <p className="text-xs font-light text-black/50 tracking-tight">
                            Delivery: 2-3 business days
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start gap-4 mb-4">
                        <Globe className="w-5 h-5 text-black/60 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div>
                          <h3 className="text-sm font-light text-black mb-2 tracking-tight uppercase">International Shipping</h3>
                          <p className="text-sm font-light text-black/70 tracking-tight leading-relaxed mb-2">
                            Available worldwide. Shipping costs calculated at checkout.
                          </p>
                          <p className="text-xs font-light text-black/50 tracking-tight">
                            Delivery: 7-14 business days (varies by location)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Processing Time */}
                <section className="border-t border-black/10 pt-12">
                  <h2 className="text-2xl font-light text-black mb-8 tracking-tight uppercase">Processing Time</h2>
                  <p className="text-sm font-light text-black/70 tracking-tight leading-relaxed mb-4">
                    All orders are processed within 1-2 business days. You will receive a shipping confirmation email with tracking information once your order has shipped.
                  </p>
                </section>

                {/* Tracking */}
                <section className="border-t border-black/10 pt-12">
                  <h2 className="text-2xl font-light text-black mb-8 tracking-tight uppercase">Order Tracking</h2>
                  <p className="text-sm font-light text-black/70 tracking-tight leading-relaxed mb-4">
                    Once your order ships, you'll receive a tracking number via email. You can track your package using the provided tracking link.
                  </p>
                </section>

                {/* Contact */}
                <section className="border-t border-black/10 pt-12">
                  <h2 className="text-2xl font-light text-black mb-8 tracking-tight uppercase">Questions?</h2>
                  <p className="text-sm font-light text-black/70 tracking-tight leading-relaxed">
                    For shipping inquiries, please contact us at{' '}
                    <a href="mailto:shipping@pelotonarchive.com" className="text-black hover:text-black/60 transition-colors border-b border-black/20 hover:border-black/40">
                      shipping@pelotonarchive.com
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


