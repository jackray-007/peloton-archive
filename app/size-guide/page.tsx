import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SizeGuidePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="min-h-screen bg-white">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-12 leading-tight">
                Size Guide
              </h1>

              <div className="space-y-16">
                {/* Jerseys */}
                <section>
                  <h2 className="text-2xl font-light text-black mb-8 tracking-tight uppercase">Jerseys</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-black/10">
                          <th className="text-left py-4 px-4 text-xs font-light text-black/60 tracking-wider uppercase">Size</th>
                          <th className="text-left py-4 px-4 text-xs font-light text-black/60 tracking-wider uppercase">Chest (cm)</th>
                          <th className="text-left py-4 px-4 text-xs font-light text-black/60 tracking-wider uppercase">Waist (cm)</th>
                          <th className="text-left py-4 px-4 text-xs font-light text-black/60 tracking-wider uppercase">Fit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-black/5">
                          <td className="py-4 px-4 text-sm font-light text-black tracking-tight">XS</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">84-88</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">70-74</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">Race</td>
                        </tr>
                        <tr className="border-b border-black/5">
                          <td className="py-4 px-4 text-sm font-light text-black tracking-tight">S</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">88-92</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">74-78</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">Race</td>
                        </tr>
                        <tr className="border-b border-black/5">
                          <td className="py-4 px-4 text-sm font-light text-black tracking-tight">M</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">92-96</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">78-82</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">Race</td>
                        </tr>
                        <tr className="border-b border-black/5">
                          <td className="py-4 px-4 text-sm font-light text-black tracking-tight">L</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">96-100</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">82-86</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">Race</td>
                        </tr>
                        <tr className="border-b border-black/5">
                          <td className="py-4 px-4 text-sm font-light text-black tracking-tight">XL</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">100-104</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">86-90</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">Race</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Bib Shorts */}
                <section>
                  <h2 className="text-2xl font-light text-black mb-8 tracking-tight uppercase">Bib Shorts</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-black/10">
                          <th className="text-left py-4 px-4 text-xs font-light text-black/60 tracking-wider uppercase">Size</th>
                          <th className="text-left py-4 px-4 text-xs font-light text-black/60 tracking-wider uppercase">Waist (cm)</th>
                          <th className="text-left py-4 px-4 text-xs font-light text-black/60 tracking-wider uppercase">Inseam (cm)</th>
                          <th className="text-left py-4 px-4 text-xs font-light text-black/60 tracking-wider uppercase">Fit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-black/5">
                          <td className="py-4 px-4 text-sm font-light text-black tracking-tight">XS</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">70-74</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">76-78</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">Race</td>
                        </tr>
                        <tr className="border-b border-black/5">
                          <td className="py-4 px-4 text-sm font-light text-black tracking-tight">S</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">74-78</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">78-80</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">Race</td>
                        </tr>
                        <tr className="border-b border-black/5">
                          <td className="py-4 px-4 text-sm font-light text-black tracking-tight">M</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">78-82</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">80-82</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">Race</td>
                        </tr>
                        <tr className="border-b border-black/5">
                          <td className="py-4 px-4 text-sm font-light text-black tracking-tight">L</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">82-86</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">82-84</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">Race</td>
                        </tr>
                        <tr className="border-b border-black/5">
                          <td className="py-4 px-4 text-sm font-light text-black tracking-tight">XL</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">86-90</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">84-86</td>
                          <td className="py-4 px-4 text-sm font-light text-black/70 tracking-tight">Race</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Notes */}
                <section className="border-t border-black/10 pt-12">
                  <h2 className="text-sm font-light text-black mb-6 tracking-wider uppercase">Notes</h2>
                  <div className="space-y-4 text-sm font-light text-black/70 tracking-tight leading-relaxed">
                    <p>
                      All measurements are in centimeters. Professional cycling kits are designed with a race-fit, meaning they are form-fitting for optimal aerodynamics and performance.
                    </p>
                    <p>
                      If you're between sizes, we recommend sizing up for comfort or down for a more aerodynamic fit, depending on your preference.
                    </p>
                    <p>
                      For questions about sizing, please contact us and we'll be happy to assist.
                    </p>
                  </div>
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

