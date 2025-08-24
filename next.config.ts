import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Настройка компиляции для современных браузеров
  compiler: {
    // Удаляет console.log в продакшене
    // removeConsole: process.env.NODE_ENV === 'production',
  },

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
      {
        protocol: "https",
        hostname: "retail.vitaline.uz",
        pathname: "**", // Разрешить любой путь
      },
    ],
  },
};

export default nextConfig;
