import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    const backendUrl =
      process.env.BACKEND_API_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL;

    // In production without a configured backend URL, do not rewrite to localhost
    if (!backendUrl) {
      if (process.env.NODE_ENV === "development") {
        return [
          {
            source: "/api/:path*",
            destination: "http://127.0.0.1:8000/api/:path*",
          },
        ];
      }
      return [];
    }

    const cleanBackendUrl = backendUrl.replace(/\/+$/, "");

    return [
      {
        source: "/api/:path*",
        destination: `${cleanBackendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

