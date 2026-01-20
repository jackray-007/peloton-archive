'use client';

import { useState, useEffect } from 'react';
import { Upload, X, Check, Image as ImageIcon, Lock, Search, Copy, Trash2, Link as LinkIcon, Grid, List } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/lib/products';

export default function ImagesAdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Array<{ url: string; filename: string; productId?: string }>>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [assigningToProduct, setAssigningToProduct] = useState<string | null>(null);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setAuthenticated(true);
      loadUploadedImages();
    }
  }, []);

  const loadUploadedImages = async () => {
    // In a real app, this would fetch from an API
    // For now, we'll scan the products to find uploaded images
    const imageUrls: Array<{ url: string; filename: string; productId?: string }> = [];
    
    products.forEach(product => {
      if (product.image && product.image.startsWith('/images/products/')) {
        const filename = product.image.split('/').pop() || '';
        imageUrls.push({ url: product.image, filename, productId: product.id });
      }
      if (product.images) {
        product.images.forEach(img => {
          if (img.startsWith('/images/products/')) {
            const filename = img.split('/').pop() || '';
            imageUrls.push({ url: img, filename, productId: product.id });
          }
        });
      }
    });
    
    setUploadedImages(imageUrls);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin';
    
    if (password === correctPassword) {
      setAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setPasswordError('');
      loadUploadedImages();
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setPassword('');
    setFiles([]);
    setUploadedImages([]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleBulkUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setErrors([]);
    const uploaded: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error(`Failed to upload ${file.name}`);

        const data = await response.json();
        uploaded.push(data.url);
        setUploadedImages(prev => [...prev, { url: data.url, filename: data.filename }]);
      } catch (error) {
        setErrors(prev => [...prev, `Failed to upload ${file.name}`]);
      }
    }

    setFiles([]);
    setUploading(false);
    
    if (uploaded.length > 0) {
      alert(`Successfully uploaded ${uploaded.length} image(s)!`);
    }
  };

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Image URL copied to clipboard!');
  };

  const copyImageCode = (url: string) => {
    const code = `getImageUrl('${url}', 'fallback-url-here')`;
    navigator.clipboard.writeText(code);
    alert('Image code copied! Paste into products.ts');
  };

  const assignToProduct = (imageUrl: string) => {
    setAssigningToProduct(imageUrl);
  };

  const handleProductAssignment = (productId: string, imageUrl: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const code = `// Update product ${productId} (${product.name})
image: getImageUrl('${imageUrl}', '${product.image}'),
images: [
  getImageUrl('${imageUrl}', '${product.image}'),
  ...${product.images ? JSON.stringify(product.images) : '[]'}
],`;
      navigator.clipboard.writeText(code);
      alert(`Code copied! Update product ${productId} in lib/products.ts`);
    }
    setAssigningToProduct(null);
  };

  const filteredImages = uploadedImages.filter(img => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      img.filename.toLowerCase().includes(search) ||
      img.url.toLowerCase().includes(search) ||
      (img.productId && products.find(p => p.id === img.productId)?.name.toLowerCase().includes(search))
    );
  });

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
                  Enter password to access image library
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
                  <div className="flex items-center gap-4 mb-4">
                    <Link
                      href="/admin/upload"
                      className="text-xs text-black/50 hover:text-black font-light tracking-wider uppercase transition-colors group"
                    >
                      ← Upload
                    </Link>
                    <Link
                      href="/admin/products"
                      className="text-xs text-black/50 hover:text-black font-light tracking-wider uppercase transition-colors"
                    >
                      Products →
                    </Link>
                  </div>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black leading-tight">
                    Image Library
                  </h1>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs font-light text-black/50 hover:text-black tracking-wider uppercase border-b border-black/20 hover:border-black/40 transition-colors"
                >
                  Logout
                </button>
              </div>

              {/* Bulk Upload Section */}
              <div className="border border-black/20 bg-black/5 p-8 mb-12">
                <h2 className="text-2xl font-light text-black tracking-tight uppercase mb-6">
                  Bulk Upload Images
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                      Select Multiple Images
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="w-full px-4 py-3 border border-black/20 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/40 transition-colors"
                    />
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-light text-black/60 tracking-wider uppercase">
                        Selected Files ({files.length})
                      </p>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white border border-black/10">
                            <span className="text-sm font-light text-black tracking-tight">{file.name}</span>
                            <button
                              onClick={() => removeFile(index)}
                              className="p-1 text-black/40 hover:text-black transition-colors"
                            >
                              <X className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleBulkUpload}
                    disabled={files.length === 0 || uploading}
                    className={`w-full py-4 font-light text-sm tracking-wider uppercase transition-all flex items-center justify-center space-x-2 ${
                      files.length === 0 || uploading
                        ? 'bg-black/10 text-black/30 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-black/90'
                    }`}
                  >
                    <Upload className="w-4 h-4" strokeWidth={1.5} />
                    <span>{uploading ? 'Uploading...' : `Upload ${files.length} Image${files.length !== 1 ? 's' : ''}`}</span>
                  </button>

                  {errors.length > 0 && (
                    <div className="p-4 bg-red-50 border border-red-200">
                      <p className="text-xs font-light text-red-600 tracking-tight mb-2">Errors:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {errors.map((error, index) => (
                          <li key={index} className="text-xs font-light text-red-600 tracking-tight">{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Library */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black/40" strokeWidth={1.5} />
                      <input
                        type="text"
                        placeholder="Search images..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-black/20 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/40 transition-colors"
                      />
                    </div>
                    <div className="flex items-center gap-2 border border-black/10">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}
                      >
                        <Grid className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}
                      >
                        <List className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs font-light text-black/50 tracking-tight">
                    {filteredImages.length} image{filteredImages.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredImages.map((img, index) => {
                      const product = img.productId ? products.find(p => p.id === img.productId) : null;
                      return (
                        <div key={index} className="group relative aspect-square bg-black/5 overflow-hidden border border-black/10 hover:border-black/30 transition-colors">
                          <img
                            src={img.url}
                            alt={img.filename}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => copyImageUrl(img.url)}
                                className="p-2 bg-white text-black hover:bg-white/90 transition-colors"
                                title="Copy URL"
                              >
                                <Copy className="w-4 h-4" strokeWidth={1.5} />
                              </button>
                              <button
                                onClick={() => assignToProduct(img.url)}
                                className="p-2 bg-white text-black hover:bg-white/90 transition-colors"
                                title="Assign to Product"
                              >
                                <LinkIcon className="w-4 h-4" strokeWidth={1.5} />
                              </button>
                            </div>
                          </div>
                          {product && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
                              <p className="text-[10px] font-light tracking-tight truncate">{product.name}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredImages.map((img, index) => {
                      const product = img.productId ? products.find(p => p.id === img.productId) : null;
                      return (
                        <div key={index} className="flex items-center gap-4 p-4 border border-black/10 hover:border-black/30 transition-colors">
                          <div className="w-20 h-20 bg-black/5 overflow-hidden flex-shrink-0">
                            <img src={img.url} alt={img.filename} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-light text-black tracking-tight truncate">{img.filename}</p>
                            <p className="text-xs font-light text-black/50 tracking-tight truncate">{img.url}</p>
                            {product && (
                              <p className="text-xs font-light text-black/40 tracking-tight mt-1">Used by: {product.name}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => copyImageUrl(img.url)}
                              className="p-2 text-black/40 hover:text-black transition-colors"
                              title="Copy URL"
                            >
                              <Copy className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                            <button
                              onClick={() => assignToProduct(img.url)}
                              className="p-2 text-black/40 hover:text-black transition-colors"
                              title="Assign to Product"
                            >
                              <LinkIcon className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {filteredImages.length === 0 && (
                <div className="text-center py-12 border border-black/10">
                  <ImageIcon className="w-12 h-12 text-black/20 mx-auto mb-4" strokeWidth={1.5} />
                  <p className="text-black/60 text-sm font-light tracking-tight">
                    {searchTerm ? 'No images found matching your search.' : 'No images uploaded yet. Use bulk upload above.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Product Assignment Modal */}
      {assigningToProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-light text-black tracking-tight uppercase">
                Assign Image to Product
              </h3>
              <button
                onClick={() => setAssigningToProduct(null)}
                className="p-2 text-black/40 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
            <div className="mb-6">
              <img src={assigningToProduct} alt="Preview" className="w-full h-64 object-contain bg-black/5" />
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {products.map(product => (
                <button
                  key={product.id}
                  onClick={() => handleProductAssignment(product.id, assigningToProduct)}
                  className="w-full text-left p-4 border border-black/10 hover:border-black/30 hover:bg-black/5 transition-colors"
                >
                  <p className="text-sm font-light text-black tracking-tight">{product.name}</p>
                  <p className="text-xs font-light text-black/50 tracking-tight mt-1">{product.team} • {product.year}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

