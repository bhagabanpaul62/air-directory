/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // For development - accept any domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    // Keep specific domains for production reference
    domains: [
      "images.unsplash.com",
      "www.flylax.com",
      "plus.unsplash.com",
      "bgs.skywings.com",
    ],
  },
};

export default nextConfig;
