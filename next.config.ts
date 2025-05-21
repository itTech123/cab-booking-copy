import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.ignoreWarnings = [/./]; // Ignores all Webpack warnings
    return config;
  },
};

export default nextConfig;
