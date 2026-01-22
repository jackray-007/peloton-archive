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
      title: 'Product Not Found | The Peloton Archive',
      description: 'The product you are looking for does not exist.',
    };
  }

  const productImage = product.image?.startsWith('http') 
    ? product.image 
    : `${baseUrl}${product.image}`;

  // Enhanced SEO keywords for pro/world tour cycling kits
  const tourType = product.tour === 'world-tour' ? 'World Tour' : product.tour === 'pro-tour' ? 'Pro Tour' : '';
  const categoryKeywords = product.category === 'jersey' 
    ? ['cycling jersey', 'pro cycling jersey', 'world tour jersey', 'cycling kit jersey', 'authentic cycling jersey']
    : product.category === 'bibs'
    ? ['cycling bibs', 'cycling shorts', 'pro cycling bibs', 'world tour bibs', 'cycling kit bibs']
    : ['cycling equipment', 'pro cycling equipment', 'cycling gear'];

  const keywords = [
    product.name,
    product.team,
    `${product.team} ${product.year}`,
    `${product.team} cycling kit`,
    `${product.team} ${product.category}`,
    product.category,
    ...categoryKeywords,
    'cycling kit',
    'authentic cycling gear',
    'professional cycling',
    'pro cycling',
    'world tour cycling',
    'pro tour cycling',
    tourType,
    `${tourType} cycling kit`,
    `${tourType} ${product.category}`,
    'authentic cycling apparel',
    'cycling collectibles',
    'cycling merchandise',
    product.condition,
    `${product.condition} condition`,
    'cycling apparel',
    'cycling clothing',
  ].filter(Boolean);

  const description = `Buy authentic ${product.team} ${product.year} ${product.category} - ${product.description}. ${tourType ? `${tourType} ` : ''}Professional cycling gear in ${product.condition} condition. $${product.price}. Authentic cycling kits and equipment from The Peloton Archive.`;

  return {
    title: `${product.name} - ${product.team} ${product.year} | The Peloton Archive`,
    description,
    keywords,
    authors: [{ name: 'The Peloton Archive' }],
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
          alt: `${product.name} - ${product.team} ${product.year}`,
        },
      ],
      type: 'product',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - ${product.team} ${product.year}`,
      description: product.description,
      images: [productImage],
      creator: '@pelotonarchive',
    },
    alternates: {
      canonical: `${baseUrl}/products/${product.id}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

