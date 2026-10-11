import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteAnalytics } from "@/components/site/Analytics";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ContactWidget } from "@/components/site/ContactWidget";
import { SkipLink } from "@/components/site/SkipLink";
import { AnnouncementBanner } from "@/components/site/AnnouncementBanner";
import { announcement } from "@/content/announcements";
import { primaryNav } from "@/content/navigation";
import { statements } from "@/content/statements";
import { organizationJsonLd, siteUrl } from "@/lib/seo";
import { withBasePath } from "@/lib/base-path";

const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-sc-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/cormorant-sc-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const inter = localFont({
  src: [{ path: "./fonts/inter-latin-variable.woff2", weight: "400 600", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${statements.shortName} | ${statements.category}`, template: `%s | ${statements.shortName}` },
  description: statements.positioning,
  applicationName: statements.shortName,
  openGraph: { siteName: statements.shortName, type: "website", locale: "en_US", images: [{ url: "/og-default.png", width: 1200, height: 630, alt: statements.shortName }] },
  twitter: { card: "summary_large_image" },
  robots: process.env.NEXT_PUBLIC_NOINDEX === "true" ? { index: false, follow: false } : { index: true, follow: true },
  icons: { icon: withBasePath("/favicon.ico") },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col pb-14 md:pb-0">
        <SkipLink />
        <AnnouncementBanner announcement={announcement} />
        <Header nav={primaryNav} />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <ContactWidget />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
        {process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" ? null : <SiteAnalytics />}
      </body>
    </html>
  );
}
