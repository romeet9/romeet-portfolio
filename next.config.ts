import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow high-quality rendering for the crisp UI mockups (Next 16 requires
    // whitelisting any quality other than the default 75).
    qualities: [75, 90, 95, 100],
  },
};

export default nextConfig;
