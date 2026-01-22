import { Metadata } from 'next';
import { products, getProductsByTeam } from '@/lib/products';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://peloton-archive.vercel.app';

function getTeamNameFromSlug(slug: string): string | null {
  const teams = Array.from(new Set(products.map(p => p.team)));
  const team = teams.find(t => t.toLowerCase().replace(/\s+/g, '-') === slug);
  return team || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const teamName = getTeamNameFromSlug(slug);

  if (!teamName) {
    return {
      title: 'Team Not Found | The Peloton Archive',
      description: 'The team collection you are looking for does not exist.',
    };
  }

  const teamProducts = getProductsByTeam(teamName);
  const featuredProduct = teamProducts[0];
  const tour = featuredProduct?.tour;
  const tourType = tour === 'world-tour' ? 'World Tour' : tour === 'pro-tour' ? 'Pro Tour' : '';

  const keywords = [
    teamName,
    `${teamName} cycling kit`,
    `${teamName} cycling jersey`,
    `${teamName} cycling bibs`,
    `${teamName} cycling equipment`,
    `${teamName} cycling gear`,
    `${teamName} collection`,
    tourType,
    `${tourType} ${teamName}`,
    'cycling kits',
    'cycling jerseys',
    'cycling bibs',
    'authentic cycling gear',
    'professional cycling',
    'pro cycling',
    'world tour cycling',
    'pro tour cycling',
    'cycling collectibles',
    'cycling merchandise',
    'cycling apparel',
  ].filter(Boolean);

  const description = `Shop authentic ${teamName} ${tourType ? `${tourType} ` : ''}cycling kits, jerseys, bibs, and equipment. ${teamProducts.length} ${teamProducts.length === 1 ? 'item' : 'items'} available. Authentic professional cycling gear from The Peloton Archive.`;

  return {
    title: `${teamName} Cycling Kits & Equipment | The Peloton Archive`,
    description,
    keywords,
    authors: [{ name: 'The Peloton Archive' }],
    openGraph: {
      title: `${teamName} Cycling Kits & Equipment`,
      description,
      url: `${baseUrl}/teams/${slug}`,
      siteName: 'The Peloton Archive',
      type: 'website',
      locale: 'en_US',
      images: featuredProduct?.image ? [
        {
          url: featuredProduct.image.startsWith('http') 
            ? featuredProduct.image 
            : `${baseUrl}${featuredProduct.image}`,
          width: 1200,
          height: 1200,
          alt: `${teamName} cycling kit`,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${teamName} Cycling Kits & Equipment`,
      description,
      images: featuredProduct?.image ? [
        featuredProduct.image.startsWith('http') 
          ? featuredProduct.image 
          : `${baseUrl}${featuredProduct.image}`
      ] : [],
      creator: '@pelotonarchive',
    },
    alternates: {
      canonical: `${baseUrl}/teams/${slug}`,
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
