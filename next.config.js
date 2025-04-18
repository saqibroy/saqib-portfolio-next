/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["wakatime.com"],
    minimumCacheTTL: 60,
  },
  // Removing the optimizeCss experimental feature
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = nextConfig
