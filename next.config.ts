import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nuxt.vitaline.uz",
        pathname: "**", // Разрешить любой путь
      },
      {
        protocol: "https",
        hostname: "dev.vitaline.uz",
        pathname: "**", // Разрешить любой путь
      },
    ],
  },
};

export default nextConfig;
