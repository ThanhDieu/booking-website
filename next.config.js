/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/callback',
        destination: '/callback',
      },
      {
        source: '/callback/:code*',
        destination: '/callback?code=:code*',
      },
    ];
  },

  serverRuntimeConfig: {
    open: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
