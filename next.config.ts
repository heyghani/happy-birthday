import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  agentRules: false,
  images: {
    // Vercel image optimization returns 402 on this project, so serve the files directly.
    unoptimized: true,
  },
};

export default nextConfig;
