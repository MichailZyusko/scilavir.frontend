/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://scilavir-backend.vercel.app/:path*'
      }
    ]
  }
}

module.exports = nextConfig
