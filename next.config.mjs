/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.githubassets.com",
      },
    ],
    qualities: [75, 85, 90, 95, 100],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
