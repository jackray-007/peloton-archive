import type { Metadata } from "next";
import "./globals.css";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";
import LiveChat from "@/components/LiveChat";

export const metadata: Metadata = {
  title: "The Peloton Archive",
  description: "Premium cycling kits and equipment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WishlistProvider>
          <RecentlyViewedProvider>
            {children}
            <LiveChat />
          </RecentlyViewedProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
