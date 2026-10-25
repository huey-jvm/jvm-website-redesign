import type { Metadata } from "next";
import { statements } from "@/content/statements";
import { contact } from "@/content/contact";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jvmsolutions.net";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${statements.shortName}`,
      description,
      url: path,
      siteName: statements.shortName,
      type: "website",
      images: [{ url: "/og-default.png", width: 1200, height: 630, alt: statements.shortName }],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: statements.companyName,
    alternateName: statements.shortName,
    url: siteUrl,
    logo: `${siteUrl}/images/brand/jvm-official.png`,
    email: contact.emails.general,
    telephone: contact.office.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.office.street,
      addressLocality: contact.office.locality,
      addressRegion: contact.office.region,
      postalCode: contact.office.postalCode,
      addressCountry: "US",
    },
    sameAs: contact.social.map((s) => s.href),
  };
}
