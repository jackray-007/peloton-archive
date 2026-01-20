import { Product } from '@/types';

interface StructuredDataProps {
  type: 'product' | 'organization' | 'breadcrumb' | 'website';
  data?: Product | any;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export default function StructuredData({ type, data, breadcrumbs }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://peloton-archive.vercel.app';

  const getStructuredData = () => {
    switch (type) {
      case 'product':
        if (!data) return null;
        return {
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: data.name,
          description: data.description,
          image: data.image?.startsWith('http') 
            ? data.image 
            : `${baseUrl}${data.image}`,
          brand: {
            '@type': 'Brand',
            name: data.team,
          },
          offers: {
            '@type': 'Offer',
            url: `${baseUrl}/products/${data.id}`,
            priceCurrency: 'USD',
            price: data.price.toString(),
            availability: data.inStock 
              ? 'https://schema.org/InStock' 
              : 'https://schema.org/OutOfStock',
            itemCondition: `https://schema.org/${data.condition === 'new' ? 'NewCondition' : 'UsedCondition'}`,
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.5',
            reviewCount: '12',
          },
        };

      case 'organization':
        return {
          '@context': 'https://schema.org/',
          '@type': 'Organization',
          name: 'The Peloton Archive',
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          description: 'Authentic World Tour and Pro Tour cycling kits, jerseys, bibs, and equipment',
          sameAs: [
            // Add your social media links here
            // 'https://www.instagram.com/pelotonarchive',
            // 'https://www.twitter.com/pelotonarchive',
            // 'https://www.facebook.com/pelotonarchive',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            email: 'info@pelotonarchive.com',
            // availableLanguage: 'English',
          },
        };

      case 'breadcrumb':
        if (!breadcrumbs) return null;
        return {
          '@context': 'https://schema.org/',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: `${baseUrl}${crumb.url}`,
          })),
        };

      case 'website':
        return {
          '@context': 'https://schema.org/',
          '@type': 'WebSite',
          name: 'The Peloton Archive',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/products?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();
  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

