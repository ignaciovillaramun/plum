/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/profile',
      },
    ];
  },
};

module.exports = nextConfig;
