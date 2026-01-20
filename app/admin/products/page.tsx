'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/lib/products';
import { Product } from '@/types';

export default function ProductsAdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    team: '',
    category: 'jersey',
    year: new Date().getFullYear(),
    condition: 'new',
    price: 0,
    originalPrice: undefined,
    image: '',
    images: [],
    description: '',
    size: 'M',
    inStock: true,
    featured: false,
    tour: 'world-tour',
  });

  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin';
    
    if (password === correctPassword) {
      setAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setPassword('');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      team: '',
      category: 'jersey',
      year: new Date().getFullYear(),
      condition: 'new',
      price: 0,
      originalPrice: undefined,
      image: '',
      images: [],
      description: '',
      size: 'M',
      inStock: true,
      featured: false,
      tour: 'world-tour',
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEdit = (product: Product) => {
    setFormData({
      id: product.id,
      name: product.name,
      team: product.team,
      category: product.category,
      year: product.year,
      condition: product.condition,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      images: product.images || [],
      description: product.description,
      size: product.size,
      inStock: product.inStock,
      featured: product.featured,
      tour: product.tour,
    });
    setEditingId(product.id);
    setIsAdding(false);
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    // For now, we'll show instructions to update lib/products.ts
    const productCode = generateProductCode(formData, editingId || 'new');
    navigator.clipboard.writeText(productCode);
    alert('Product code copied to clipboard! Paste it into lib/products.ts');
    resetForm();
  };

  const generateProductCode = (data: Partial<Product>, id: string) => {
    const newId = editingId || `'${Date.now()}'`;
    const imagesArray = data.images && data.images.length > 0
      ? `['${data.images.join("', '")}']`
      : `['${data.image}']`;
    
    return `{
    id: ${newId},
    name: '${data.name}',
    team: '${data.team}',
    category: '${data.category}',
    year: ${data.year},
    condition: '${data.condition}',
    price: ${data.price},${data.originalPrice ? `\n    originalPrice: ${data.originalPrice},` : ''}
    image: '${data.image}',
    images: ${imagesArray},
    description: '${data.description?.replace(/'/g, "\\'")}',
    size: '${data.size}',
    inStock: ${data.inStock},
    featured: ${data.featured},
    tour: '${data.tour}',
  },`;
  };

  if (!authenticated) {
    return (
      <>
        <Navbar />
        <main className="pt-16">
          <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="max-w-md w-full px-6">
              <div className="text-center mb-8">
                <Lock className="w-12 h-12 text-black/40 mx-auto mb-4" strokeWidth={1.5} />
                <h1 className="text-3xl font-light tracking-tighter text-black mb-2">
                  Admin Access
                </h1>
                <p className="text-sm font-light text-black/50 tracking-tight">
                  Enter password to access product management
                </p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-black/20 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/40 transition-colors"
                    autoFocus
                  />
                  {passwordError && (
                    <p className="text-xs font-light text-black/50 mt-2 tracking-tight">
                      {passwordError}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all"
                >
                  Access Admin
                </button>
              </form>
              <p className="text-xs font-light text-black/30 mt-6 text-center tracking-tight">
                Default password: "admin" (change in .env.local)
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="min-h-screen bg-white">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
            <div className="max-w-6xl">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <Link
                    href="/admin/upload"
                    className="inline-flex items-center text-xs text-black/50 hover:text-black font-light tracking-wider uppercase mb-4 transition-colors group"
                  >
                    <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" strokeWidth={1.5} />
                    Back to Upload
                  </Link>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black leading-tight">
                    Products
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  {!isAdding && !editingId && (
                    <button
                      onClick={() => {
                        resetForm();
                        setIsAdding(true);
                      }}
                      className="inline-flex items-center px-6 py-3 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all"
                    >
                      <Plus className="w-4 h-4 mr-2" strokeWidth={1.5} />
                      Add Product
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-xs font-light text-black/50 hover:text-black tracking-wider uppercase border-b border-black/20 hover:border-black/40 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Add/Edit Form */}
              {(isAdding || editingId) && (
                <div className="border border-black/20 bg-black/5 p-8 mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-light text-black tracking-tight uppercase">
                      {editingId ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button
                      onClick={resetForm}
                      className="p-2 text-black/40 hover:text-black transition-colors"
                    >
                      <X className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-black/20 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/40 transition-colors"
                        placeholder="e.g., Ineos Grenadiers 2024 Race Jersey"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                        Team *
                      </label>
                      <input
                        type="text"
                        value={formData.team}
                        onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                        className="w-full px-4 py-3 border border-black/20 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/40 transition-colors"
                        placeholder="e.g., Ineos Grenadiers"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className="w-full px-4 py-3 border border-black/20 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/40 transition-colors"
                      >
                        <option value="jersey">Jersey</option>
                        <option value="bibs">Bibs</option>
                        <option value="shorts">Shorts</option>
                        <option value="gloves">Gloves</option>
                        <option value="socks">Socks</option>
                        <option value="accessories">Accessories</option>
                        <option value="equipment">Equipment</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                        Year *
                      </label>
                      <input
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-black/20 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/40 transition-colors"
                        min="2000"
                        max={new Date().getFullYear() + 1}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                        Condition *
                      </label>
                      <select
                        value={formData.condition}
                        onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
                        className="w-full px-4 py-3 border border-black/20 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/40 transition-colors"
                      >
                        <option value="new">New</option>
                        <option value="like-new">Like New</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                        Size
                      </label>
                      <input
                        type="text"
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        className="w-full px-4 py-3 border border-black/20 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/40 transition-colors"
                        placeholder="e.g., M, L, One Size"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                        className="w-full px-4 py-3 border border-black/20 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/40 transition-colors"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                        Original Price ($) - Optional
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.originalPrice || ''}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                        className="w-full px-4 py-3 border border-black/20 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/40 transition-colors"
                        min="0"
                        placeholder="Leave empty if no sale"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                        Tour Level *
                      </label>
                      <select
                        value={formData.tour}
                        onChange={(e) => setFormData({ ...formData, tour: e.target.value as any })}
                        className="w-full px-4 py-3 border border-black/20 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/40 transition-colors"
                      >
                        <option value="world-tour">World Tour</option>
                        <option value="pro-tour">Pro Tour</option>
                        <option value="continental">Continental</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                        Main Image URL *
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="flex-1 px-4 py-3 border border-black/20 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/40 transition-colors"
                          placeholder="/images/products/1-1234567890.jpg or https://..."
                        />
                        <Link
                          href="/admin/images"
                          className="px-4 py-3 border border-black/20 text-black hover:border-black/40 font-light text-xs tracking-wider uppercase transition-all whitespace-nowrap"
                        >
                          Browse Images
                        </Link>
                      </div>
                      <p className="text-xs font-light text-black/40 mt-2 tracking-tight">
                        Use image URLs from the image library or external URLs
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                        Additional Images (comma-separated URLs)
                      </label>
                      <input
                        type="text"
                        value={formData.images?.join(', ') || ''}
                        onChange={(e) => setFormData({ ...formData, images: e.target.value ? e.target.value.split(',').map(url => url.trim()) : [] })}
                        className="w-full px-4 py-3 border border-black/20 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/40 transition-colors"
                        placeholder="/images/products/1-1234567890.jpg, /images/products/1-1234567891.jpg"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border border-black/20 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/40 transition-colors resize-none"
                        placeholder="Product description..."
                      />
                    </div>

                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.inStock}
                          onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                          className="w-4 h-4 border-black/20"
                        />
                        <span className="text-xs font-light text-black/60 tracking-wider uppercase">
                          In Stock
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                          className="w-4 h-4 border-black/20"
                        />
                        <span className="text-xs font-light text-black/60 tracking-wider uppercase">
                          Featured
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-6">
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center px-6 py-3 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all"
                    >
                      <Save className="w-4 h-4 mr-2" strokeWidth={1.5} />
                      {editingId ? 'Update Product' : 'Generate Code'}
                    </button>
                    <button
                      onClick={resetForm}
                      className="px-6 py-3 border border-black/20 text-black hover:border-black/40 font-light text-sm tracking-wider uppercase transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Products List */}
              <div className="space-y-4">
                <h2 className="text-xs font-light text-black/60 tracking-wider uppercase mb-6">
                  All Products ({products.length})
                </h2>
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border border-black/10 p-6 hover:border-black/20 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-sm font-light text-black tracking-tight">
                            {product.name}
                          </h3>
                          {product.featured && (
                            <span className="text-[10px] text-black/40 font-light tracking-wider uppercase border border-black/10 px-2 py-0.5">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-light text-black/50 tracking-tight mb-2">
                          {product.team} • {product.year} • {product.category}
                        </p>
                        <p className="text-xs font-light text-black/60 tracking-tight">
                          ${product.price} {product.originalPrice && `(was $${product.originalPrice})`} • {product.condition} • {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-black/40 hover:text-black transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

