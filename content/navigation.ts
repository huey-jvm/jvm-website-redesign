import { certificationSummary } from "./credentials";
import { services } from "./services";
import { pastPerformance, starsShown } from "./vehicles";

export type NavItem = { label: string; href: string; description?: string; lead?: boolean };
export type NavGroup = { label: string; href?: string; items?: NavItem[] };

const serviceDescriptions: Record<string, string> = {
  "healthcare-operations": "Clinical and operational professionals, program and case management, credentialing",
  "health-it": "Software, systems integration, service desk and cybersecurity",
  "logistics-facilities": "Supply chain, transportation, facilities",
  "management-support": "Operations and administrative support",
};

const serviceItems: NavItem[] = services.map((s) => ({ label: s.name, href: `/services/${s.slug}`, description: serviceDescriptions[s.slug], lead: s.lead }));

export const primaryNav: NavGroup[] = [
  {
    label: "Services",
    items: [
      ...serviceItems,
      { label: "All services", href: "/services" },
    ],
  },
  { label: "Why JVM", href: "/why-jvm" },
  {
    label: "Contracting",
    items: [
      { label: "Contracting overview", href: "/contracting", description: "Identifiers, vehicles and how to reach us" },
      ...(starsShown ? [{ label: "GSA 8(a) STARS III", href: "/contracting/stars-iii", description: "Our prime contract vehicle" }] : []),
      { label: "Certifications and Set-Asides", href: "/contracting/certifications", description: certificationSummary },
      ...(pastPerformance.length ? [{ label: "Past Performance", href: "/contracting/past-performance", description: "Contracts and task orders" }] : []),
      { label: "Capability Statement", href: "/contracting/capability-statement", description: "One page summary to download" },
    ],
  },
  {
    label: "About",
    items: [
      { label: "About JVM", href: "/about", description: "Mission, vision, values, leadership" },
      { label: "Quality and Compliance", href: "/about/quality-compliance", description: "ISO 9001 and Joint Commission" },
    ],
  },
  { label: "Careers", href: "/careers" },
];

export const footerColumns: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Services",
    items: serviceItems,
  },
  {
    heading: "Contracting",
    items: [
      { label: "Contracting overview", href: "/contracting" },
      ...(starsShown ? [{ label: "GSA 8(a) STARS III", href: "/contracting/stars-iii" }] : []),
      { label: "Certifications and Set-Asides", href: "/contracting/certifications" },
      { label: "Capability Statement", href: "/contracting/capability-statement" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "Why JVM", href: "/why-jvm" },
      { label: "About JVM", href: "/about" },
      { label: "Quality and Compliance", href: "/about/quality-compliance" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Use", href: "/legal/terms" },
  { label: "Accessibility", href: "/legal/accessibility" },
  { label: "SMS Consent", href: "/legal/sms-consent" },
];
