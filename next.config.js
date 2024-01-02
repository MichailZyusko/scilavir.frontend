/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hljgruyjewkbrmyedjik.supabase.co',
        pathname: '**',
      },
    ],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  env: {
    NEXT_PUBLIC_BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
  },
};

module.exports = nextConfig;
