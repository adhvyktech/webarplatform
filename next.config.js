/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Permissions-Policy',
              value: 'camera=*',
            },
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;