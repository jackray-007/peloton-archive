'use client';

import { useState, useMemo, useEffect } from 'react';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Filter, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedTour, setSelectedTour] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  const categories = ['all', 'jersey', 'bibs', 'shorts', 'gloves', 'socks', 'accessories', 'equipment'];
  const teams = Array.from(new Set(products.map(p => p.team))).sort();
  const tours = ['all', 'world-tour', 'pro-tour', 'continental'];
  const conditions = ['all', 'new', 'like-new', 'excellent', 'good', 'fair'];
  const years = Array.from(new Set(products.map(p => p.year))).sort((a, b) => b - a);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
      const teamMatch = selectedTeam === 'all' || product.team === selectedTeam;
      const tourMatch = selectedTour === 'all' || product.tour === selectedTour;
      const conditionMatch = selectedCondition === 'all' || product.condition === selectedCondition;
      const yearMatch = selectedYear === 'all' || product.year.toString() === selectedYear;
      const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;
      const stockMatch = !inStockOnly || product.inStock;
      const featuredMatch = !featuredOnly || product.featured;
      
      let searchMatch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        searchMatch = 
          product.name.toLowerCase().includes(query) ||
          product.team.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query);
      }
      
      return categoryMatch && teamMatch && tourMatch && conditionMatch && yearMatch && priceMatch && stockMatch && featuredMatch && searchMatch;
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'oldest':
        filtered.sort((a, b) => a.year - b.year);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [selectedCategory, selectedTeam, selectedTour, selectedCondition, selectedYear, priceRange, inStockOnly, featuredOnly, searchQuery, sortBy]);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="min-h-screen bg-white">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
            {/* Header */}
            <div className="mb-16">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-4">
                Shop
              </h1>
              <p className="text-sm text-black/50 font-light tracking-tight max-w-2xl mb-6">
                Discover authentic cycling kits and equipment from the world's top teams
              </p>
              
              {/* Search Bar */}
              <div className="max-w-md mb-4">
                <input
                  type="text"
                  placeholder="Search products, teams, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-black/10 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors placeholder-black/30"
                />
              </div>

              {searchQuery && (
                <p className="text-xs font-light text-black/40 tracking-tight mb-4">
                  Search results for: "{searchQuery}"
                </p>
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Sidebar Filters - Desktop */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <h2 className="text-xs font-light text-black mb-8 tracking-wider uppercase">Filters</h2>

                  {/* Category Filter */}
                  <div className="mb-8">
                    <h3 className="text-xs font-light text-black/60 mb-4 tracking-wider uppercase">Category</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`block w-full text-left text-xs font-light tracking-tight uppercase transition-colors relative group ${
                            selectedCategory === category
                              ? 'text-black'
                              : 'text-black/50 hover:text-black'
                          }`}
                        >
                          {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                          {selectedCategory === category && (
                            <span className="absolute bottom-0 left-0 w-full h-px bg-black"></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Team Filter */}
                  <div className="mb-8">
                    <h3 className="text-xs font-light text-black/60 mb-4 tracking-wider uppercase">Team</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      <button
                        onClick={() => setSelectedTeam('all')}
                        className={`block w-full text-left text-xs font-light tracking-tight transition-colors relative group ${
                          selectedTeam === 'all'
                            ? 'text-black'
                            : 'text-black/50 hover:text-black'
                        }`}
                      >
                        All Teams
                        {selectedTeam === 'all' && (
                          <span className="absolute bottom-0 left-0 w-full h-px bg-black"></span>
                        )}
                      </button>
                      {teams.map(team => (
                        <button
                          key={team}
                          onClick={() => setSelectedTeam(team)}
                          className={`block w-full text-left text-xs font-light tracking-tight transition-colors relative group ${
                            selectedTeam === team
                              ? 'text-black'
                              : 'text-black/50 hover:text-black'
                          }`}
                        >
                          {team}
                          {selectedTeam === team && (
                            <span className="absolute bottom-0 left-0 w-full h-px bg-black"></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tour Filter */}
                  <div className="mb-8">
                    <h3 className="text-xs font-light text-black/60 mb-4 tracking-wider uppercase">Tour Level</h3>
                    <div className="space-y-2">
                      {tours.map(tour => (
                        <button
                          key={tour}
                          onClick={() => setSelectedTour(tour)}
                          className={`block w-full text-left text-xs font-light tracking-tight uppercase transition-colors relative group ${
                            selectedTour === tour
                              ? 'text-black'
                              : 'text-black/50 hover:text-black'
                          }`}
                        >
                          {tour === 'all' ? 'All Tours' : tour.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          {selectedTour === tour && (
                            <span className="absolute bottom-0 left-0 w-full h-px bg-black"></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Condition Filter */}
                  <div className="mb-8">
                    <h3 className="text-xs font-light text-black/60 mb-4 tracking-wider uppercase">Condition</h3>
                    <div className="space-y-2">
                      {conditions.map(condition => (
                        <button
                          key={condition}
                          onClick={() => setSelectedCondition(condition)}
                          className={`block w-full text-left text-xs font-light tracking-tight capitalize transition-colors relative group ${
                            selectedCondition === condition
                              ? 'text-black'
                              : 'text-black/50 hover:text-black'
                          }`}
                        >
                          {condition === 'all' ? 'All Conditions' : condition.replace('-', ' ')}
                          {selectedCondition === condition && (
                            <span className="absolute bottom-0 left-0 w-full h-px bg-black"></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Year Filter */}
                  <div className="mb-8">
                    <h3 className="text-xs font-light text-black/60 mb-4 tracking-wider uppercase">Year</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      <button
                        onClick={() => setSelectedYear('all')}
                        className={`block w-full text-left text-xs font-light tracking-tight transition-colors relative group ${
                          selectedYear === 'all'
                            ? 'text-black'
                            : 'text-black/50 hover:text-black'
                        }`}
                      >
                        All Years
                        {selectedYear === 'all' && (
                          <span className="absolute bottom-0 left-0 w-full h-px bg-black"></span>
                        )}
                      </button>
                      {years.map(year => (
                        <button
                          key={year}
                          onClick={() => setSelectedYear(year.toString())}
                          className={`block w-full text-left text-xs font-light tracking-tight transition-colors relative group ${
                            selectedYear === year.toString()
                              ? 'text-black'
                              : 'text-black/50 hover:text-black'
                          }`}
                        >
                          {year}
                          {selectedYear === year.toString() && (
                            <span className="absolute bottom-0 left-0 w-full h-px bg-black"></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="mb-8">
                    <h3 className="text-xs font-light text-black/60 mb-4 tracking-wider uppercase">Price Range</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="1000"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: parseFloat(e.target.value) || 0 })}
                          className="w-full px-3 py-2 border border-black/10 text-xs font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors"
                          placeholder="Min"
                        />
                        <span className="text-xs font-light text-black/40">-</span>
                        <input
                          type="number"
                          min="0"
                          max="1000"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: parseFloat(e.target.value) || 1000 })}
                          className="w-full px-3 py-2 border border-black/10 text-xs font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors"
                          placeholder="Max"
                        />
                      </div>
                      <div className="text-xs font-light text-black/40 tracking-tight">
                        ${priceRange.min} - ${priceRange.max}
                      </div>
                    </div>
                  </div>

                  {/* Stock & Featured Filters */}
                  <div className="mb-8 space-y-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="w-4 h-4 border-black/20 text-black focus:ring-black/20"
                      />
                      <span className="text-xs font-light text-black/70 group-hover:text-black tracking-tight transition-colors">
                        In Stock Only
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={featuredOnly}
                        onChange={(e) => setFeaturedOnly(e.target.checked)}
                        className="w-4 h-4 border-black/20 text-black focus:ring-black/20"
                      />
                      <span className="text-xs font-light text-black/70 group-hover:text-black tracking-tight transition-colors">
                        Featured Only
                      </span>
                    </label>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedTeam('all');
                      setSelectedTour('all');
                      setSelectedCondition('all');
                      setSelectedYear('all');
                      setPriceRange({ min: 0, max: 1000 });
                      setInStockOnly(false);
                      setFeaturedOnly(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-xs font-light text-black/50 hover:text-black tracking-wider uppercase border-b border-black/20 hover:border-black/40 transition-colors pb-1"
                  >
                    Clear All Filters
                  </button>
                </div>
              </aside>

              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-6">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-black/10 text-black/70 hover:text-black transition-colors"
                >
                  <Filter className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-xs font-light tracking-wider uppercase">Filters</span>
                </button>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden border border-black/10 p-6 mb-8 bg-white">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xs font-light text-black tracking-wider uppercase">Filters</h2>
                    <button onClick={() => setShowFilters(false)} className="text-black/50 hover:text-black">
                      <X className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <h3 className="text-xs font-light text-black/60 mb-3 tracking-wider uppercase">Category</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`text-left px-3 py-2 text-xs font-light tracking-tight uppercase transition-colors border ${
                            selectedCategory === category
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-black/50 border-black/10 hover:border-black/30'
                          }`}
                        >
                          {category === 'all' ? 'All' : category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Team Filter */}
                  <div className="mb-6">
                    <h3 className="text-xs font-light text-black/60 mb-3 tracking-wider uppercase">Team</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      <button
                        onClick={() => setSelectedTeam('all')}
                        className={`block w-full text-left px-3 py-2 text-xs font-light tracking-tight transition-colors border ${
                          selectedTeam === 'all'
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black/50 border-black/10 hover:border-black/30'
                        }`}
                      >
                        All Teams
                      </button>
                      {teams.map(team => (
                        <button
                          key={team}
                          onClick={() => setSelectedTeam(team)}
                          className={`block w-full text-left px-3 py-2 text-xs font-light tracking-tight transition-colors border ${
                            selectedTeam === team
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-black/50 border-black/10 hover:border-black/30'
                          }`}
                        >
                          {team}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tour Filter */}
                  <div className="mb-6">
                    <h3 className="text-xs font-light text-black/60 mb-3 tracking-wider uppercase">Tour Level</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {tours.map(tour => (
                        <button
                          key={tour}
                          onClick={() => setSelectedTour(tour)}
                          className={`text-left px-3 py-2 text-xs font-light tracking-tight uppercase transition-colors border ${
                            selectedTour === tour
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-black/50 border-black/10 hover:border-black/30'
                          }`}
                        >
                          {tour === 'all' ? 'All' : tour.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Condition Filter */}
                  <div className="mb-6">
                    <h3 className="text-xs font-light text-black/60 mb-3 tracking-wider uppercase">Condition</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {conditions.map(condition => (
                        <button
                          key={condition}
                          onClick={() => setSelectedCondition(condition)}
                          className={`text-left px-3 py-2 text-xs font-light tracking-tight capitalize transition-colors border ${
                            selectedCondition === condition
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-black/50 border-black/10 hover:border-black/30'
                          }`}
                        >
                          {condition === 'all' ? 'All' : condition.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Year Filter */}
                  <div className="mb-6">
                    <h3 className="text-xs font-light text-black/60 mb-3 tracking-wider uppercase">Year</h3>
                    <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                      <button
                        onClick={() => setSelectedYear('all')}
                        className={`px-3 py-2 text-xs font-light tracking-tight transition-colors border ${
                          selectedYear === 'all'
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black/50 border-black/10 hover:border-black/30'
                        }`}
                      >
                        All
                      </button>
                      {years.map(year => (
                        <button
                          key={year}
                          onClick={() => setSelectedYear(year.toString())}
                          className={`px-3 py-2 text-xs font-light tracking-tight transition-colors border ${
                            selectedYear === year.toString()
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-black/50 border-black/10 hover:border-black/30'
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="mb-6">
                    <h3 className="text-xs font-light text-black/60 mb-3 tracking-wider uppercase">Price Range</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="1000"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: parseFloat(e.target.value) || 0 })}
                          className="flex-1 px-3 py-2 border border-black/10 text-xs font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors"
                          placeholder="Min"
                        />
                        <span className="text-xs font-light text-black/40">-</span>
                        <input
                          type="number"
                          min="0"
                          max="1000"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: parseFloat(e.target.value) || 1000 })}
                          className="flex-1 px-3 py-2 border border-black/10 text-xs font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors"
                          placeholder="Max"
                        />
                      </div>
                      <div className="text-xs font-light text-black/40 tracking-tight">
                        ${priceRange.min} - ${priceRange.max}
                      </div>
                    </div>
                  </div>

                  {/* Stock & Featured Filters */}
                  <div className="mb-6 space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="w-4 h-4 border-black/20 text-black focus:ring-black/20"
                      />
                      <span className="text-xs font-light text-black/70 tracking-tight">
                        In Stock Only
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={featuredOnly}
                        onChange={(e) => setFeaturedOnly(e.target.checked)}
                        className="w-4 h-4 border-black/20 text-black focus:ring-black/20"
                      />
                      <span className="text-xs font-light text-black/70 tracking-tight">
                        Featured Only
                      </span>
                    </label>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedTeam('all');
                      setSelectedTour('all');
                      setSelectedCondition('all');
                      setSelectedYear('all');
                      setPriceRange({ min: 0, max: 1000 });
                      setInStockOnly(false);
                      setFeaturedOnly(false);
                      setSearchQuery('');
                    }}
                    className="w-full px-4 py-2 text-xs font-light text-black/50 hover:text-black tracking-wider uppercase border border-black/10 hover:border-black/30 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Products Grid */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-xs text-black/50 font-light tracking-tight">
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-light text-black/60 tracking-wider uppercase">Sort:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-black/10 text-xs font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors"
                    >
                      <option value="default">Default</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="name-asc">Name: A-Z</option>
                      <option value="name-desc">Name: Z-A</option>
                      <option value="featured">Featured First</option>
                    </select>
                  </div>
                </div>
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-sm text-black/50 font-light mb-6">No products found matching your filters.</p>
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedTeam('all');
                        setSelectedTour('all');
                        setSelectedCondition('all');
                        setSelectedYear('all');
                        setPriceRange({ min: 0, max: 1000 });
                        setInStockOnly(false);
                        setFeaturedOnly(false);
                        setSearchQuery('');
                      }}
                      className="text-xs text-black/70 hover:text-black font-light tracking-wider uppercase border-b border-black/20 hover:border-black/40 transition-colors"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
