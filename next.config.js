/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wakatime.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      }
    ],
    minimumCacheTTL: 60,
  },
  // Removing the optimizeCss experimental feature
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = withContentlayer(nextConfig);
