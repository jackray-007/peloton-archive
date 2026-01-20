import Link from 'next/link';
import { products, getProductsByTeam } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

// Generate static paths for all teams
export async function generateStaticParams() {
  const teams = Array.from(new Set(products.map(p => p.team)));
  return teams.map(team => ({
    slug: team.toLowerCase().replace(/\s+/g, '-'),
  }));
}

function getTeamNameFromSlug(slug: string): string | null {
  const teams = Array.from(new Set(products.map(p => p.team)));
  const team = teams.find(t => t.toLowerCase().replace(/\s+/g, '-') === slug);
  return team || null;
}

export default function TeamCollectionPage({ params }: { params: { slug: string } }) {
  const teamName = getTeamNameFromSlug(params.slug);
  
  if (!teamName) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-light text-black mb-4 tracking-tight">Team Not Found</h2>
            <p className="text-sm text-black/50 font-light mb-8">The team collection you're looking for doesn't exist.</p>
            <Link
              href="/teams"
              className="inline-flex items-center px-8 py-4 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all"
            >
              Back to Teams
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const teamProducts = getProductsByTeam(teamName);
  const featuredProduct = teamProducts[0];
  const tour = featuredProduct?.tour;

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="min-h-screen bg-white">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
            {/* Back Button */}
            <Link
              href="/teams"
              className="inline-flex items-center text-xs text-black/50 hover:text-black font-light tracking-wider uppercase mb-12 transition-colors group"
            >
              <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" strokeWidth={1.5} />
              All Teams
            </Link>

            {/* Team Header */}
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-6">
                {tour && (
                  <span className="text-[10px] text-black/60 font-light tracking-wider uppercase border border-black/20 px-3 py-1">
                    {tour === 'world-tour' ? 'World Tour' : tour === 'pro-tour' ? 'Pro Tour' : 'Continental'}
                  </span>
                )}
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-4 leading-tight">
                {teamName}
              </h1>
              <p className="text-sm text-black/50 font-light tracking-tight">
                {teamProducts.length} {teamProducts.length === 1 ? 'item' : 'items'} in collection
              </p>
            </div>

            {/* Products Grid */}
            {teamProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
                {teamProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-sm text-black/50 font-light">No products available for this team.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

