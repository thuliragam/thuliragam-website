import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "sonner";
import { GoogleAnalytics } from "@next/third-parties/google";


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

  title: {
    default:
      "Thuliragam | Premium Microgreens, Herbal Powders, Natural Spices & Dehydrated Vegetables",
    template: "%s | Thuliragam",
  },

  description:
    "Thuliragam offers premium microgreens, herbal powders, natural spices, and dehydrated vegetables. Fresh, hygienically processed, and naturally healthy.",

  keywords: [
  "Thuliragam",
  "Microgreens Coimbatore",
  "Fresh Microgreens",
  "Microgreens Supplier",
  "Herbal Powders",
  "Curry Leaf Powder",
  "Moringa Powder",
  "Amla Powder",
  "Natural Spices",
  "Organic Spices",
  "Dehydrated Vegetables",
  "Healthy Food",
  "Superfoods",
  "Organic Food Store",
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
  category: "Organic Food",

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
      "Thuliragam | Premium Microgreens, Herbal Powders, Natural Spices & Dehydrated Vegetables",

    description:
      "Thuliragam offers premium microgreens, herbal powders, natural spices, and dehydrated vegetables. Fresh, hygienically processed, and naturally healthy.",

    url: siteUrl,

    siteName: "Thuliragam",

    locale: "en_IN",

    type: "website",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thuliragam",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Thuliragam | Premium Microgreens, Herbal Powders, Natural Spices & Dehydrated Vegetables",

    description:
      "Fresh Microgreens, Herbal Powders, Natural Spices & Dehydrated Vegetables.",

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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

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