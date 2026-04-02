import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/trip-east-coast',
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
