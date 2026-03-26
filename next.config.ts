import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during builds in production
  // (catches errors during development, but don't block builds)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during builds in production
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
