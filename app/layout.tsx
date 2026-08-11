import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seven Events Photobooth | Premium Photo Booth Rental",
  description: "Elevate your event with our premium photobooth. Instant prints, endless fun, and memories that linger. Book your event today!",
  keywords: "photobooth, photo booth rental, event photography, weddings, corporate events",
  openGraph: {
    title: "Seven Events Photobooth",
    description: "Make your event unforgettable with our premium photobooth experience",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://www.booqable.com/embed.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
