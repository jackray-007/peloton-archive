import Link from 'next/link';
import { getProductById, products } from '@/lib/products';
import ProductContent from './product-content';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Generate static params for all products for better SEO
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-light text-black mb-4 tracking-tight">Product Not Found</h2>
            <p className="text-sm text-black/50 font-light mb-8">The product you're looking for doesn't exist.</p>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all"
            >
              Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return <ProductContent product={product} />;
}
