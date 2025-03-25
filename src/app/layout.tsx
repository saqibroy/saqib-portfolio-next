import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: 'Saqib - Modern Web Developer',
    template: '%s | Saqib Portfolio'
  },
  description: 'A modern web developer focused on performance and accessibility, creating innovative and user-centric web solutions.',
  metadataBase: new URL('https://your-website.com'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-website.com',
    siteName: 'Saqib Portfolio',
    title: 'Saqib - Modern Web Developer',
    description: 'A modern web developer focused on performance and accessibility'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saqib - Modern Web Developer',
    description: 'A modern web developer focused on performance and accessibility',
    creator: '@your_twitter_handle'
  },
  keywords: [
    'web development', 
    'performance optimization', 
    'accessibility', 
    'React', 
    'Next.js', 
    'TypeScript'
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${GeistSans.className} ${GeistMono.className}`}
    >
      <body 
        className="antialiased bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white selection:bg-blue-200 selection:text-blue-900"
      >
        {children}
      </body>
    </html>
  );
}