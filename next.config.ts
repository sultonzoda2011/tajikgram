import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Разрешает все https хосты
      },
      {
        protocol: "http",
        hostname: "**", // Разрешает все http хосты
      },
    ],
  },
};

export default nextConfig;
