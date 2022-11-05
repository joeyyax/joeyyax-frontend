/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  poweredByHeader: false,
  images: {
    domains: ["cdn.sanity.io", "res.cloudinary.com", "picsum.photos"],
  },
  eslint: {
    dirs: ["."],
  },
}

module.exports = nextConfig
