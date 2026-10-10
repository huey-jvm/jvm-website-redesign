import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const noindex = process.env.NEXT_PUBLIC_NOINDEX === "true";
  return {
    rules: noindex ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
