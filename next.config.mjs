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

export default nextConfig;
