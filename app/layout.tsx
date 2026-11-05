
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "sonner";
import WhatsAppButton from "./components/WhatsAppButton";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CartProvider } from "./components/cart/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.thuliragam.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
    verification: {
    google: "4rzNjNN_AvW2oC6hfsHt9VqvdBSXWb0E7qJqxnqV73s",
  },

  title: {
    default:
      "Thuliragam | Premium Fresh Microgreens",
    template: "%s | Thuliragam",
  },

  description:
    "Discover premium fresh microgreens, nutrient-rich microgreen powders, natural spices and dehydrated vegetables from Thuliragam, Coimbatore. Grow Healthier Tomorrow.",

  keywords: [
    "Thuliragam",
    "Microgreens Coimbatore",
    "Fresh Microgreens",
    "Microgreens Supplier",
    "Buy Microgreens",
    "Microgreen Varieties",
    "Microgreen Powder",
    "Fresh Healthy Greens",
    "Natural Spices",
    "Dehydrated Vegetables",
    "Plant Based Nutrition",
    "Healthy Food",
    "Superfoods",
    "Coimbatore",
    "Tamil Nadu",
  ],

  authors: [
    {
      name: "Thuliragam",
    },
  ],

  creator: "Thuliragam",
  publisher: "Thuliragam",
  themeColor: "#2E7D32",
  category: "Food",

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
    canonical: "/",
  },

  openGraph: {
    title:
      "Thuliragam | Premium Fresh Microgreens & Natural Foods",

    description:
      "Explore premium fresh microgreens, microgreen powders, natural spices and dehydrated vegetables from Thuliragam.",

    url: siteUrl,
    siteName: "Thuliragam",
    locale: "en_IN",
    type: "website",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thuliragam Premium Microgreens",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Thuliragam | Premium Fresh Microgreens & Natural Foods",

    description:
      "Premium fresh microgreens, microgreen powders and natural foods. Grow Healthier Tomorrow.",

    images: ["/images/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Thuliragam",
    url: "https://www.thuliragam.in",
    logo: "https://www.thuliragam.in/logo.png",
    email: "thuliragam.in@gmail.com",
    telephone: "+91 9677799226",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <CartProvider>
          {children}
        </CartProvider>

        <WhatsAppButton />

        <ScrollToTop />

        <Toaster
          position="top-right"
          richColors
          closeButton
        />

        <GoogleAnalytics gaId="G-DVRZX2HY7X" />
      </body>
    </html>
  );
}
