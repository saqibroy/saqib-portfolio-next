import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Inter } from 'next/font/google';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Saqib Sohail - Full Stack Developer",
  description: "Full stack developer and software engineer specializing in modern web technologies. Experienced in React, TypeScript, Node.js, and more.",
  keywords: ["Full Stack Developer", "React", "TypeScript", "Node.js", "Next.js", "Web Development", "Software Engineer"],
  authors: [{ name: "Saqib Sohail" }],
  creator: "Saqib Sohail",
  publisher: "Saqib Sohail",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ssohail.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Saqib Sohail - Full Stack Developer",
    description: "Full stack developer and software engineer specializing in modern web technologies.",
    url: 'https://saqibroy.vercel.app',
    siteName: "Saqib Sohail Portfolio",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Saqib Sohail - Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Saqib Sohail - Full Stack Developer",
    description: "Full stack developer and software engineer specializing in modern web technologies.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' },
    ],
  },
  manifest: '/site.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.className} ${GeistMono.className} ${inter.className}`}>
      <head>
        <link rel="preconnect" href="https://wakatime.com" />
        <link rel="preconnect" href="https://github.com" />
        <link rel="preconnect" href="https://linkedin.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-gray-900 text-white antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}