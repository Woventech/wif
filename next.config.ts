import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    // se serve topLevelAwait o altre opzioni
    config.experiments = { topLevelAwait: true, ...config.experiments };
    return config;
  },
};

export default nextConfig;
