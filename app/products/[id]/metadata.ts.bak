import { Metadata } from 'next';
import { getProductById } from '@/lib/products';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://peloton-archive.vercel.app';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  const productImage = product.image?.startsWith('http') 
    ? product.image 
    : `${baseUrl}${product.image}`;

  return {
    title: `${product.name} - ${product.team} ${product.year}`,
    description: `${product.description} | ${product.team} ${product.year} ${product.category}. ${product.condition} condition. $${product.price}.`,
    keywords: [
      product.name,
      product.team,
      product.category,
      `${product.team} ${product.year}`,
      'cycling kit',
      'cycling jersey',
      'cycling bibs',
      'authentic cycling gear',
      product.condition,
    ],
    openGraph: {
      title: `${product.name} - ${product.team} ${product.year}`,
      description: product.description,
      url: `${baseUrl}/products/${product.id}`,
      siteName: 'The Peloton Archive',
      images: [
        {
          url: productImage,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
      type: 'product',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - ${product.team} ${product.year}`,
      description: product.description,
      images: [productImage],
    },
    alternates: {
      canonical: `${baseUrl}/products/${product.id}`,
    },
  };
}

