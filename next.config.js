/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'localhost', 'file://'],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/profile',
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

module.exports = nextConfig;
