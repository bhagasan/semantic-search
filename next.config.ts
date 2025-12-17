import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.pokemon.com',
        pathname: '/assets/cms2/img/pokedex/**',
      },
    ],
  },
};

export default nextConfig;
