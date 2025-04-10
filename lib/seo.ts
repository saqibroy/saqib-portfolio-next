// src/lib/seo.ts
export const defaultSEOConfig = {
  title: 'Saqib - Modern Web Developer',
  description:
    'A modern web developer focused on performance and accessibility, creating innovative and user-centric web solutions.',
  keywords: [
    'web development',
    'performance optimization',
    'accessibility',
    'React',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: 'Saqib' }],
  creator: 'Saqib',
  publisher: 'Saqib',
  generator: 'Next.js',
  applicationName: 'Saqib Portfolio',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'dark',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-website.com',
    siteName: 'Saqib Portfolio',
    title: 'Saqib - Modern Web Developer',
    description: 'A modern web developer focused on performance and accessibility',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saqib - Modern Web Developer',
    description: 'A modern web developer focused on performance and accessibility',
    creator: '@your_twitter_handle',
  },
};
