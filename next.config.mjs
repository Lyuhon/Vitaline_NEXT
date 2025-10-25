import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true,

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
};

export default withNextIntl(nextConfig);