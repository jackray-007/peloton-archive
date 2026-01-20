'use client';

import { useState, useEffect } from 'react';
import { Upload, X, Check, Image as ImageIcon, Lock, Search } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/lib/products';

export default function UploadPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [productSearch, setProductSearch] = useState('');

  // Check authentication on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default password is 'admin' - change this in production!
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
    setSelectedProduct('');
    setFiles([]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setErrors(['Please select at least one file']);
      return;
    }

    if (!selectedProduct) {
      setErrors(['Please select a product']);
      return;
    }

    setUploading(true);
    setErrors([]);
    setUploaded([]);

    const uploadPromises = files.map(async (file, index) => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('productId', selectedProduct);
        // For multiple images, add index to filename
        if (files.length > 1) {
          formData.append('imageIndex', index.toString());
        }

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const data = await response.json();
        return { url: data.url, filename: data.filename };
      } catch (error) {
        throw new Error(`Error uploading ${file.name}: ${error}`);
      }
    });

    try {
      const results = await Promise.all(uploadPromises);
      setUploaded(results.map(r => r.url));
      
      // Generate code snippet to update product
      const product = products.find(p => p.id === selectedProduct);
      const imageUrls = results.map(r => r.url);
      
      // Show success with copyable code
      setFiles([]);
    } catch (error: any) {
      setErrors([error.message]);
    } finally {
      setUploading(false);
    }
  };

  const filteredProducts = productSearch
    ? products.filter(p => 
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.team.toLowerCase().includes(productSearch.toLowerCase())
      )
    : products;

  const selectedProductData = products.find(p => p.id === selectedProduct);

  // Show login form if not authenticated
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
                  Enter password to access upload page
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
                  Access Upload Page
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

  // Show upload interface if authenticated
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="min-h-screen bg-white">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
            <div className="max-w-4xl">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black leading-tight mb-4">
                    Upload Images
                  </h1>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/admin/images"
                      className="text-xs font-light text-black/50 hover:text-black tracking-wider uppercase border-b border-black/20 hover:border-black/40 transition-colors"
                    >
                      Image Library →
                    </Link>
                    <Link
                      href="/admin/products"
                      className="text-xs font-light text-black/50 hover:text-black tracking-wider uppercase border-b border-black/20 hover:border-black/40 transition-colors"
                    >
                      Manage Products →
                    </Link>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs font-light text-black/50 hover:text-black tracking-wider uppercase border-b border-black/20 hover:border-black/40 transition-colors"
                >
                  Logout
                </button>
              </div>

              <div className="space-y-8">
                {/* Product Selection */}
                <div>
                  <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-3">
                    Select Product
                  </label>
                  
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" strokeWidth={1.5} />
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Search products by name or team..."
                      className="w-full pl-10 pr-4 py-3 border border-black/20 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/40 transition-colors"
                    />
                  </div>

                  {/* Product List */}
                  <div className="border border-black/20 max-h-64 overflow-y-auto">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => setSelectedProduct(product.id)}
                        className={`w-full text-left px-4 py-3 border-b border-black/5 last:border-0 transition-colors ${
                          selectedProduct === product.id
                            ? 'bg-black text-white'
                            : 'bg-white hover:bg-black/5 text-black'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-sm font-light tracking-tight ${selectedProduct === product.id ? 'text-white' : 'text-black'}`}>
                              {product.name}
                            </p>
                            <p className={`text-xs font-light tracking-tight mt-1 ${selectedProduct === product.id ? 'text-white/70' : 'text-black/50'}`}>
                              {product.team} • ${product.price}
                            </p>
                          </div>
                          {selectedProduct === product.id && (
                            <Check className="w-4 h-4 text-white" strokeWidth={1.5} />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedProductData && (
                    <div className="mt-4 p-4 border border-black/20 bg-black/5">
                      <p className="text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                        Selected Product
                      </p>
                      <p className="text-sm font-light text-black tracking-tight">
                        {selectedProductData.name}
                      </p>
                      <p className="text-xs font-light text-black/50 tracking-tight mt-1">
                        Product ID: {selectedProductData.id}
                      </p>
                    </div>
                  )}
                </div>

                {/* File Upload Area */}
                <div>
                  <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-3">
                    Select Images
                  </label>
                  <div className="border-2 border-dashed border-black/20 p-12 text-center hover:border-black/40 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                      disabled={!selectedProduct}
                    />
                    <label
                      htmlFor="file-upload"
                      className={`cursor-pointer flex flex-col items-center ${!selectedProduct ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Upload className="w-8 h-8 text-black/40 mb-4" strokeWidth={1.5} />
                      <span className="text-sm font-light text-black/60 tracking-tight mb-2">
                        {selectedProduct ? 'Click to select images or drag and drop' : 'Select a product first'}
                      </span>
                      <span className="text-xs font-light text-black/40 tracking-tight">
                        PNG, JPG, WEBP up to 10MB
                      </span>
                    </label>
                  </div>
                </div>

                {/* Selected Files */}
                {files.length > 0 && (
                  <div>
                    <h3 className="text-xs font-light text-black/60 tracking-wider uppercase mb-4">
                      Selected Files ({files.length})
                    </h3>
                    <div className="space-y-3">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-black/10 bg-black/5"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <ImageIcon className="w-5 h-5 text-black/40 flex-shrink-0" strokeWidth={1.5} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-light text-black tracking-tight truncate">
                                {file.name}
                              </p>
                              <p className="text-xs font-light text-black/40 tracking-tight">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="p-2 text-black/40 hover:text-black transition-colors"
                          >
                            <X className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                {files.length > 0 && selectedProduct && (
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full py-4 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" strokeWidth={1.5} />
                        Upload {files.length} {files.length === 1 ? 'Image' : 'Images'} for {selectedProductData?.name}
                      </>
                    )}
                  </button>
                )}

                {/* Success Messages */}
                {uploaded.length > 0 && selectedProductData && (
                  <div className="border border-black/20 bg-black/5 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Check className="w-5 h-5 text-black" strokeWidth={1.5} />
                      <h3 className="text-sm font-light text-black tracking-tight uppercase">
                        Upload Successful
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-light text-black/60 tracking-wider uppercase mb-2">
                          Image URLs
                        </p>
                        <div className="space-y-2">
                          {uploaded.map((url, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <code className="flex-1 text-xs font-light text-black/60 tracking-tight bg-white px-2 py-1 border border-black/10">
                                {url}
                              </code>
                              <button
                                onClick={() => navigator.clipboard.writeText(url)}
                                className="text-xs font-light text-black/40 hover:text-black tracking-tight uppercase border-b border-black/20 hover:border-black/40 transition-colors"
                              >
                                Copy
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-black/10 pt-4">
                        <p className="text-xs font-light text-black/60 tracking-wider uppercase mb-3">
                          Update Product Code
                        </p>
                        <div className="bg-white border border-black/10 p-4">
                          <p className="text-xs font-light text-black/40 tracking-tight mb-2">
                            Copy this code and replace the image URLs in <code className="bg-black/5 px-1">lib/products.ts</code> for product ID {selectedProductData.id}:
                          </p>
                          <pre className="text-xs font-light text-black/70 tracking-tight overflow-x-auto">
{`image: '${uploaded[0]}',${uploaded.length > 1 ? `\nimages: [\n  '${uploaded.join("',\n  '")}'\n],` : ''}`}
                          </pre>
                          <button
                            onClick={() => {
                              const code = `image: '${uploaded[0]}',${uploaded.length > 1 ? `\nimages: [\n  '${uploaded.join("',\n  '")}'\n],` : ''}`;
                              navigator.clipboard.writeText(code);
                            }}
                            className="mt-3 text-xs font-light text-black/40 hover:text-black tracking-tight uppercase border-b border-black/20 hover:border-black/40 transition-colors"
                          >
                            Copy Code
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Messages */}
                {errors.length > 0 && (
                  <div className="border border-black/20 bg-black/5 p-6">
                    <h3 className="text-sm font-light text-black tracking-tight uppercase mb-2">
                      Errors
                    </h3>
                    <ul className="space-y-1">
                      {errors.map((error, index) => (
                        <li key={index} className="text-xs font-light text-black/60 tracking-tight">
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Instructions */}
                <div className="border-t border-black/10 pt-8 mt-12">
                  <h3 className="text-xs font-light text-black/60 tracking-wider uppercase mb-4">
                    How It Works
                  </h3>
                  <div className="space-y-3 text-sm font-light text-black/70 tracking-tight leading-relaxed">
                    <p>
                      <strong className="text-black">1. Select Product:</strong> Choose the product you want to upload images for from the list above.
                    </p>
                    <p>
                      <strong className="text-black">2. Upload Images:</strong> Select one or more images. They'll be automatically named with the product ID.
                    </p>
                    <p>
                      <strong className="text-black">3. Copy Code:</strong> After upload, copy the generated code snippet and paste it into <code className="bg-black/5 px-1">lib/products.ts</code> to update the product's image URLs.
                    </p>
                    <p>
                      <strong className="text-black">4. Save & Refresh:</strong> Save the file and refresh your browser to see the new images.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
