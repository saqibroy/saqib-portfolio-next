import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from 'next/font/google';
import { GeistMono } from "geist/font/mono";
import { portfolioContent } from '@/content/portfolio';
import "./globals.css";

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import { ThemeProvider } from '@/components/site/ThemeProvider';
import { JsonLd } from '@/components/seo/JsonLd';

const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-source-sans', display: 'swap' });
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-source-serif', display: 'swap' });

// Moved viewport and themeColor to their own exports as per Next.js 14+ recommendations
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};

const { profile } = portfolioContent;
const siteUrl = 'https://ssohail.com';

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
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${profile.name} — ${profile.positioning}`,
    description: profile.proposition,
    url: siteUrl,
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
    <html lang="en" suppressHydrationWarning className={`${sourceSans.variable} ${sourceSerif.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://github.com" />
        <link rel="preconnect" href="https://linkedin.com" />
      </head>
      <body>
        <ThemeProvider>
          <JsonLd data={[
            {
              '@context': 'https://schema.org', '@type': 'Person', name: profile.name, url: siteUrl,
              jobTitle: profile.positioning, email: profile.email, address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
              sameAs: [profile.githubUrl, profile.linkedinUrl],
            },
            { '@context': 'https://schema.org', '@type': 'WebSite', name: `${profile.name} Portfolio`, url: siteUrl, inLanguage: 'en' },
          ]} />
          <a className="skip-link" href="#main-content">Skip to main content</a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
