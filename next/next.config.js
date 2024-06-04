/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
  images: {
    domains: [
      "cdn.sanity.io",
      "res.cloudinary.com",
      "sdbooth2-production.s3.amazonaws.com",
      "s3.us-west-1.amazonaws.com",
      "storage.googleapis.com",
      "replicate.delivery",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { defaultLoaders }) => {
    config.resolve.alias["@shared"] = path.join(process.cwd(), "../shared");
    config.resolve.alias["@"] = path.join(process.cwd(), ".");
    return config;
  },
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
