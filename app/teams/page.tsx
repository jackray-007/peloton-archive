import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

// Get unique teams with their product counts and featured image
function getTeamCollections() {
  const teamsMap = new Map();
  
  products.forEach(product => {
    if (!teamsMap.has(product.team)) {
      teamsMap.set(product.team, {
        name: product.team,
        count: 0,
        featuredImage: product.image,
        tour: product.tour,
      });
    }
    const team = teamsMap.get(product.team);
    team.count++;
  });
  
  return Array.from(teamsMap.values()).sort((a, b) => b.count - a.count);
}

export default function TeamsPage() {
  const teams = getTeamCollections();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="min-h-screen bg-white">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
            {/* Header */}
            <div className="mb-20">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-4">
                Team Collections
              </h1>
              <p className="text-sm text-black/50 font-light tracking-tight max-w-2xl">
                Explore authentic cycling kits and equipment from the world's most prestigious teams
              </p>
            </div>

            {/* Teams Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
              {teams.map((team) => (
                <Link
                  key={team.name}
                  href={`/teams/${encodeURIComponent(team.name.toLowerCase().replace(/\s+/g, '-'))}`}
                  className="group block"
                >
                  <div className="bg-white overflow-hidden">
                    {/* Team Image */}
                    <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden mb-6">
                      <Image
                        src={team.featuredImage}
                        alt={team.name}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      {team.tour && (
                        <div className="absolute top-4 right-4">
                          <span className="text-[10px] text-white font-light tracking-wider uppercase bg-black/60 backdrop-blur-sm px-3 py-1 border border-white/20">
                            {team.tour === 'world-tour' ? 'WT' : 'PT'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Team Info */}
                    <div>
                      <h3 className="text-sm font-light text-black group-hover:text-black/60 transition-colors tracking-tight uppercase mb-2">
                        {team.name}
                      </h3>
                      <p className="text-xs text-black/50 font-light tracking-tight">
                        {team.count} {team.count === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


