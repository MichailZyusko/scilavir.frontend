/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['hljgruyjewkbrmyedjik.supabase.co']
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL
  },
}

module.exports = nextConfig
