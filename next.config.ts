import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mnaimrbgcupayvznxreg.supabase.co",
      },
    ],
  },
};

export default nextConfig;