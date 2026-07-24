import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { portfolioContent } from '@/content/portfolio';
import "./globals.css";

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Moved viewport and themeColor to their own exports as per Next.js 14+ recommendations
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};

const { profile } = portfolioContent;

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.positioning}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.proposition,
  keywords: [
    'Senior Frontend Engineer',
    'Senior Full-Stack Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Django',
    'FastAPI',
    'Accessibility',
    'Performance',
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(profile.website),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${profile.name} — ${profile.positioning}`,
    description: profile.proposition,
    url: profile.website,
    siteName: `${profile.name} Portfolio`,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `${profile.name} — ${profile.positioning}`,
    description: profile.proposition,
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
  // Removed viewport and themeColor from here
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.className} ${GeistMono.className}`}>
      <head>
        <link rel="preconnect" href="https://github.com" />
        <link rel="preconnect" href="https://linkedin.com" />
      </head>
      <body className="bg-gray-900 text-white antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
