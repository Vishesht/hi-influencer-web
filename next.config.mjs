/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
  },
  webpack: (config, { dev }) => {
    if (config.cache && !dev) {
      config.cache = Object.freeze({
        type: "memory",
      });
    }

    // Optional: Add polyfills for older browsers
    config.resolve.fallback = {
      ...config.resolve.fallback,
      // Include any polyfills you may need, e.g., for 'crypto'
      crypto: require.resolve("crypto-browserify"),
    };

    // Important: return the modified config
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Additional config to improve compatibility
  experimental: {
    modern: true,
  },
};

export default nextConfig;
