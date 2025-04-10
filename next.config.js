/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['wakatime.com'],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

module.exports = nextConfig; 