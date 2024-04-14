/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        port: '',
      },
    ],
  },
  transpilePackages: ['@mui/x-charts'],
};

export default nextConfig;
