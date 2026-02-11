import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vvmwizqlurbngruwobya.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
