import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "admin.rollmatic.com",
        pathname: "/wp-content/uploads/**", // This is for WP
      },
    ],
  },
};


export default withNextIntl(nextConfig);
