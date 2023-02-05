/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DJANGO_URL: process.env.DJANGO_URL,
  },
};

module.exports = nextConfig;
