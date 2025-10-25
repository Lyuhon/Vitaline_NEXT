import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,

  compiler: {
    // removeConsole: process.env.NODE_ENV === 'production',
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nuxt.vitaline.uz",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "dev.vitaline.uz",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "retail.vitaline.uz",
        pathname: "**",
      },
    ],
  },

  // ДОБАВЛЯЕМ КОНФИГУРАЦИЮ ДЛЯ next-intl
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

// ВАЖНО: добавляем конфигурацию для next-intl
export default nextConfig;