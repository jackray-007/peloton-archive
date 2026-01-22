import type { Metadata } from "next";
import "./globals.css";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";
import LiveChat from "@/components/LiveChat";
import ErrorBoundary from "@/components/ErrorBoundary";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://peloton-archive.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Peloton Archive | Authentic Cycling Kits & Equipment",
    template: "%s | The Peloton Archive"
  },
  description: "Shop authentic World Tour and Pro Tour cycling kits, jerseys, bibs, and equipment. Premium cycling gear from top teams like Ineos Grenadiers, Jumbo-Visma, UAE Team Emirates, and more. Rare collectibles and current season kits.",
  keywords: [
    "cycling kits",
    "cycling jerseys",
    "cycling bibs",
    "world tour cycling",
    "pro tour cycling",
    "cycling equipment",
    "authentic cycling gear",
    "Ineos Grenadiers",
    "Jumbo-Visma",
    "UAE Team Emirates",
    "cycling collectibles",
    "cycling apparel",
    "professional cycling",
    "cycling merchandise"
  ],
  authors: [{ name: "The Peloton Archive" }],
  creator: "The Peloton Archive",
  publisher: "The Peloton Archive",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "The Peloton Archive",
    title: "The Peloton Archive | Authentic Cycling Kits & Equipment",
    description: "Shop authentic World Tour and Pro Tour cycling kits, jerseys, bibs, and equipment from top teams.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "The Peloton Archive - Authentic Cycling Kits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Peloton Archive | Authentic Cycling Kits & Equipment",
    description: "Shop authentic World Tour and Pro Tour cycling kits, jerseys, bibs, and equipment from top teams.",
    images: [`${siteUrl}/og-image.jpg`],
    creator: "@pelotonarchive",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/logos/PA (1).png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/logos/PA (1).png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    // Add your verification codes here when you get them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          <WishlistProvider>
            <RecentlyViewedProvider>
              {children}
              <LiveChat />
            </RecentlyViewedProvider>
          </WishlistProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
