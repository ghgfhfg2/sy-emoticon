/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "imgix",
    path: "/",
  },
});

module.exports = nextConfig;
