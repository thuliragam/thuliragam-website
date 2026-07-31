import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "sonner";

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
    "Microgreens",
    "Herbal Powders",
    "Natural Spices",
    "Dehydrated Vegetables",
    "Healthy Food",
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

  robots: {
    index: true,
    follow: true,
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
      </body>
    </html>
  );
}