import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RotateCcw, Clock, Shield, Mail } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="min-h-screen bg-white">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-12 leading-tight">
                Returns
              </h1>

              <div className="space-y-16">
                {/* Return Policy */}
                <section>
                  <h2 className="text-2xl font-light text-black mb-8 tracking-tight uppercase">Return Policy</h2>
                  <div className="space-y-6 text-sm font-light text-black/70 tracking-tight leading-relaxed">
                    <p>
                      We offer a 30-day return policy on all items in original condition with tags attached. Items must be unworn and in the same condition as when you received them.
                    </p>
                    <p>
                      Due to the collectible nature of our products, we cannot accept returns on items that have been worn, damaged, or altered in any way.
                    </p>
                  </div>
                </section>

                {/* How to Return */}
                <section className="border-t border-black/10 pt-12">
                  <h2 className="text-2xl font-light text-black mb-8 tracking-tight uppercase">How to Return</h2>
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 border border-black/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-light text-black">1</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-light text-black mb-2 tracking-tight uppercase">Contact Us</h3>
                        <p className="text-sm font-light text-black/70 tracking-tight leading-relaxed">
                          Email us at{' '}
                          <a href="mailto:returns@pelotonarchive.com" className="text-black hover:text-black/60 transition-colors border-b border-black/20 hover:border-black/40">
                            returns@pelotonarchive.com
                          </a>{' '}
                          with your order number and reason for return.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 border border-black/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-light text-black">2</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-light text-black mb-2 tracking-tight uppercase">Receive Authorization</h3>
                        <p className="text-sm font-light text-black/70 tracking-tight leading-relaxed">
                          We'll send you a return authorization and shipping instructions within 1-2 business days.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 border border-black/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-light text-black">3</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-light text-black mb-2 tracking-tight uppercase">Ship Your Return</h3>
                        <p className="text-sm font-light text-black/70 tracking-tight leading-relaxed">
                          Package the item securely and ship it back using the provided return label. We recommend using a tracked shipping method.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 border border-black/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-light text-black">4</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-light text-black mb-2 tracking-tight uppercase">Receive Refund</h3>
                        <p className="text-sm font-light text-black/70 tracking-tight leading-relaxed">
                          Once we receive and inspect your return, we'll process your refund within 5-7 business days.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Refunds */}
                <section className="border-t border-black/10 pt-12">
                  <h2 className="text-2xl font-light text-black mb-8 tracking-tight uppercase">Refunds</h2>
                  <div className="space-y-4 text-sm font-light text-black/70 tracking-tight leading-relaxed">
                    <p>
                      Refunds will be issued to the original payment method. Shipping costs are non-refundable unless the item is defective or we made an error.
                    </p>
                    <p>
                      International returns may be subject to customs fees, which are the responsibility of the customer.
                    </p>
                  </div>
                </section>

                {/* Exchanges */}
                <section className="border-t border-black/10 pt-12">
                  <h2 className="text-2xl font-light text-black mb-8 tracking-tight uppercase">Exchanges</h2>
                  <p className="text-sm font-light text-black/70 tracking-tight leading-relaxed mb-4">
                    We currently do not offer direct exchanges. To exchange an item, please return the original item and place a new order for the desired size or product.
                  </p>
                </section>

                {/* Contact */}
                <section className="border-t border-black/10 pt-12">
                  <h2 className="text-2xl font-light text-black mb-8 tracking-tight uppercase">Questions?</h2>
                  <p className="text-sm font-light text-black/70 tracking-tight leading-relaxed">
                    For return inquiries, please contact us at{' '}
                    <a href="mailto:returns@pelotonarchive.com" className="text-black hover:text-black/60 transition-colors border-b border-black/20 hover:border-black/40">
                      returns@pelotonarchive.com
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


