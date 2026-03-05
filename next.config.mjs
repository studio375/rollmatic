/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.dominio.com",
        pathname: "/wp-content/uploads/**", // This is for WP
      },
    ],
  },
};

export default nextConfig;
