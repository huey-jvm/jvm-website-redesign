import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { services } from "@/content/services";
import { pastPerformance, starsShown } from "@/content/vehicles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "/", "/services", ...services.map((s) => `/services/${s.slug}`), "/why-jvm",
    "/contracting", ...(starsShown ? ["/contracting/stars-iii"] : []), "/contracting/certifications",
    ...(pastPerformance.length ? ["/contracting/past-performance"] : []),
    "/about", "/about/quality-compliance", "/careers", "/contact",
    "/legal/privacy", "/legal/terms", "/legal/accessibility", "/legal/sms-consent",
  ];
  return paths.map((p) => ({ url: `${siteUrl}${p}`, lastModified: now, changeFrequency: p === "/" ? "weekly" : "monthly", priority: p === "/" ? 1 : 0.7 }));
}
