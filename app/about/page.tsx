import { Award, Users, Heart, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="min-h-[60vh] bg-black text-white flex items-center">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12 w-full py-20">
            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter mb-6 leading-tight">
                About The<br />Peloton Archive
              </h1>
              <p className="text-lg text-white/70 font-light tracking-tight max-w-2xl leading-relaxed">
                Preserving cycling heritage, one kit at a time
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-32 bg-white">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
            <div className="max-w-4xl">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-12 leading-tight">
                Our Story
              </h2>
              <div className="space-y-6">
                <p className="text-sm text-black/70 font-light tracking-tight leading-relaxed">
                  The Peloton Archive was born from a shared passion for professional cycling and the desire 
                  to preserve the rich heritage of the sport. As cycling enthusiasts ourselves, we recognized 
                  that authentic team kits and equipment hold immense value—not just as collectibles, but as 
                  tangible pieces of cycling history.
                </p>
                <p className="text-sm text-black/70 font-light tracking-tight leading-relaxed">
                  We started by collecting World Tour and Pro Tour kits from our favorite teams, carefully 
                  curating each piece to ensure authenticity and quality. What began as a personal collection 
                  has grown into a trusted marketplace where cycling enthusiasts can discover rare, authentic 
                  cycling gear from the world's top teams.
                </p>
                <p className="text-sm text-black/70 font-light tracking-tight leading-relaxed">
                  Every item in our archive is verified for authenticity. We work directly with teams, 
                  collectors, and trusted sources to bring you the finest selection of cycling kits and 
                  equipment. Our mission is to connect passionate cyclists with the gear that represents 
                  the pinnacle of the sport.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-32 bg-black text-white">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-center mb-20 leading-tight">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16">
              <div>
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-light text-white mb-4 tracking-wider uppercase">Authenticity</h3>
                <p className="text-xs text-white/60 font-light tracking-tight leading-relaxed">
                  Every item is verified and guaranteed authentic. We stand behind every product we sell.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-6">
                  <Award className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-light text-white mb-4 tracking-wider uppercase">Quality</h3>
                <p className="text-xs text-white/60 font-light tracking-tight leading-relaxed">
                  We carefully curate our collection to ensure only the finest pieces make it to our archive.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-light text-white mb-4 tracking-wider uppercase">Passion</h3>
                <p className="text-xs text-white/60 font-light tracking-tight leading-relaxed">
                  We're cyclists too. Our love for the sport drives everything we do.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-light text-white mb-4 tracking-wider uppercase">Community</h3>
                <p className="text-xs text-white/60 font-light tracking-tight leading-relaxed">
                  Building connections between cycling enthusiasts and preserving the sport's heritage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 bg-white">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
            <div className="max-w-4xl">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-8 leading-tight">
                Join Our<br />Community
              </h2>
              <p className="text-sm text-black/50 font-light tracking-tight max-w-2xl mb-12 leading-relaxed">
                Follow us for updates on new arrivals, rare finds, and cycling heritage stories
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-8 py-4 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all group"
                >
                  Follow on Instagram
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-8 py-4 border border-black/20 text-black hover:border-black/40 font-light text-sm tracking-wider uppercase transition-all"
                >
                  Subscribe to Newsletter
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
