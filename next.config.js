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
    // Add this section to handle the static site generation
    exportPathMap: async function (
      defaultPathMap,
      { dev, dir, outDir, distDir, buildId }
    ) {
      return {
        '/': { page: '/' },
        '/ar-experience': { page: '/ARExperience' },
      };
    },
  };
  
  module.exports = nextConfig;