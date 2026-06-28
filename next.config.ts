import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["playwright", "chromium-bidi"],
};

export default nextConfig;
