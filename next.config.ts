import type { NextConfig } from "next";
import { legacyRedirects } from "./content/redirects";

const pagesBasePath = process.env.PAGES_BASE_PATH ?? "";
const isStaticExport = process.env.STATIC_EXPORT === "true" || Boolean(pagesBasePath);

const server: NextConfig = {
  async redirects() {
    return legacyRedirects.map((r) => ({ source: r.source, destination: r.destination, permanent: true }));
  },
  async headers() {
    return [
      {
        source: "/images/optimized/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

const staticExport: NextConfig = {
  output: "export",
  basePath: pagesBasePath,
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: pagesBasePath, NEXT_PUBLIC_STATIC_EXPORT: "true" },
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  ...(isStaticExport ? staticExport : server),
};

export default nextConfig;
