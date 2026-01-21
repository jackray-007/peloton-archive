import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/checkout/', '/cart', '/account/'],
    },
    sitemap: 'https://peloton-archive.vercel.app/sitemap.xml',
  };
}
