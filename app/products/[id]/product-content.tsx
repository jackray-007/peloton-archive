'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Check, Truck, Shield, ArrowLeft } from 'lucide-react';
import { Product, getProductsByCategory } from '@/lib/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductReviews from '@/components/ProductReviews';
import ProductRecommendations from '@/components/ProductRecommendations';
import SocialShare from '@/components/SocialShare';
import EmailNotifications from '@/components/EmailNotifications';
import BundleDeal from '@/components/BundleDeal';
import { useWishlist } from '@/contexts/WishlistContext';
import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext';

interface ProductContentProps {
  product: Product;
}

export default function ProductContent({ product }: ProductContentProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  const images = product.images || [product.image];

  const handleAddToCart = () => {
    // This would integrate with a cart context
    alert(`Added ${quantity} ${product.name} to cart`);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="min-h-screen bg-white">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
            {/* Back Button */}
            <Link
              href="/products"
              className="inline-flex items-center text-xs text-black/50 hover:text-black font-light tracking-wider uppercase mb-12 transition-colors group"
            >
              <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" strokeWidth={1.5} />
              Back to Shop
            </Link>

            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Image Gallery */}
              <div>
                <div className="relative aspect-square bg-gray-50 overflow-hidden mb-6">
                  <Image
                    src={images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={90}
                  />
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative aspect-square bg-gray-50 overflow-hidden border transition-all ${
                          selectedImage === index ? 'border-black' : 'border-black/10'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} view ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 25vw, 12.5vw"
                          loading="lazy"
                          quality={75}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    {product.tour && (
                      <span className="text-[10px] text-black/60 font-light tracking-wider uppercase border border-black/20 px-3 py-1">
                        {product.tour === 'world-tour' ? 'World Tour' : product.tour === 'pro-tour' ? 'Pro Tour' : 'Continental'}
                      </span>
                    )}
                    <span className="text-[10px] text-black/60 font-light tracking-wider uppercase border border-black/20 px-3 py-1">
                      {product.condition}
                    </span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tighter text-black mb-4 leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-sm text-black/50 font-light tracking-tight uppercase mb-8">
                    {product.team} • {product.year}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-black/10">
                  {product.originalPrice ? (
                    <div className="flex items-baseline gap-4">
                      <span className="text-3xl font-light text-black tracking-tight">${product.price}</span>
                      <span className="text-lg text-black/40 line-through font-light">${product.originalPrice}</span>
                      <span className="text-[10px] text-black/60 font-light tracking-wider uppercase border border-black/20 px-2 py-1">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-light text-black tracking-tight">${product.price}</span>
                  )}
                </div>

                {/* Size Selector & Stock */}
                <div className="mb-8 space-y-4">
                  {product.size && (
                    <div>
                      <label className="block text-xs font-light text-black/60 tracking-wider uppercase mb-3">
                        Size
                      </label>
                      <div className="flex items-center gap-2 flex-wrap">
                        {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                          <button
                            key={size}
                            className={`px-4 py-2 border text-sm font-light tracking-tight transition-colors ${
                              product.size === size
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-black/70 border-black/10 hover:border-black/30'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      <Link
                        href="/size-guide"
                        className="text-xs text-black/50 hover:text-black underline mt-2 inline-block font-light tracking-tight"
                      >
                        Size Guide
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-light text-black/60 tracking-wider uppercase">Stock</span>
                    <span className={`text-sm font-light ${product.inStock ? 'text-black' : 'text-black/40'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8 pb-8 border-b border-black/10">
                  <h3 className="text-xs font-light text-black/60 tracking-wider uppercase mb-4">Description</h3>
                  <p className="text-sm text-black/70 font-light tracking-tight leading-relaxed">{product.description}</p>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="mb-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <label className="text-xs font-light text-black/60 tracking-wider uppercase">Quantity</label>
                    <div className="flex items-center border border-black/20">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 hover:bg-black/5 transition-colors text-black/60 hover:text-black"
                      >
                        −
                      </button>
                      <span className="px-6 py-2 min-w-[60px] text-center text-sm font-light text-black">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 hover:bg-black/5 transition-colors text-black/60 hover:text-black"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`w-full py-4 font-light text-sm tracking-wider uppercase transition-all flex items-center justify-center space-x-2 ${
                      product.inStock
                        ? 'bg-black text-white hover:bg-black/90'
                        : 'bg-black/10 text-black/30 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
                    <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </button>
                </div>

                {/* Trust Signals */}
                <div className="border-t border-black/10 pt-8 space-y-4">
                  <div className="flex items-center space-x-3 text-xs text-black/50 font-light tracking-tight">
                    <Truck className="w-4 h-4" strokeWidth={1.5} />
                    <span>Free shipping on orders over $200</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-black/50 font-light tracking-tight">
                    <Shield className="w-4 h-4" strokeWidth={1.5} />
                    <span>Authenticity guaranteed</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-black/50 font-light tracking-tight">
                    <Check className="w-4 h-4" strokeWidth={1.5} />
                    <span>30-day return policy</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-6 mt-8">
                  <button
                    onClick={() => {
                      if (isInWishlist(product.id)) {
                        removeFromWishlist(product.id);
                      } else {
                        addToWishlist(product);
                      }
                    }}
                    className={`flex items-center space-x-2 text-xs font-light tracking-wider uppercase transition-colors ${
                      isInWishlist(product.id) ? 'text-black' : 'text-black/50 hover:text-black'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} strokeWidth={1.5} />
                    <span>{isInWishlist(product.id) ? 'Saved' : 'Save'}</span>
                  </button>
                  <SocialShare url={`/products/${product.id}`} title={product.name} description={product.description} />
                </div>

                {/* Email Notifications */}
                {!product.inStock && (
                  <div className="mt-8">
                    <EmailNotifications productId={product.id} productName={product.name} type="restock" />
                  </div>
                )}

                {/* Bundle Deal - Show for jerseys */}
                {product.category === 'jersey' && (
                  <div className="mt-8">
                    {(() => {
                      const matchingBibs = getProductsByCategory('bibs').filter(p => p.team === product.team);
                      if (matchingBibs.length > 0) {
                        return (
                          <BundleDeal
                            products={[product, matchingBibs[0]]}
                            discount={15}
                          />
                        );
                      }
                      return null;
                    })()}
                  </div>
                )}

                {/* Reviews */}
                <div className="mt-8">
                  <ProductReviews productId={product.id} />
                </div>
              </div>
            </div>

            {/* Product Recommendations */}
            <section className="mt-24 pt-24 border-t border-black/10">
              <ProductRecommendations currentProduct={product} />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
