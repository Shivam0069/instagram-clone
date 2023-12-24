/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        hostname: "upload.wikimedia.org",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // For server-side rendering support
    if (isServer) {
      config.externals.push("minifaker");
    }

    return config;
  },
};

module.exports = nextConfig;
