import { services } from "./services";
import { starsShown } from "./vehicles";

export type NavItem = { label: string; href: string; description?: string; lead?: boolean };
export type NavGroup = { label: string; href?: string; items?: NavItem[] };

const serviceDescriptions: Record<string, string> = {
  "healthcare-operations": "Clinical and operational professionals, program and case management, credentialing",
  "health-it": "Software, systems integration, service desk and cybersecurity",
  "logistics": "Supply chain, inventory and transportation",
  "facilities-management": "Facilities operations and maintenance coordination",
  "management-support": "Operations and administrative support",
};

const serviceItems: NavItem[] = services.map((s) => ({ label: s.name, href: `/services/${s.slug}`, description: serviceDescriptions[s.slug], lead: s.lead }));

export const primaryNav: NavGroup[] = [
  { label: "About JVM", href: "/about" },
  { label: "Services", items: [
    { label: "All Services", href: "/services" }, ...serviceItems,
    { label: "Capability Statements", href: "/contracting/capability-statement" },
    { label: "Administrative Support", href: "/services/management-support" },
  ] },
  { label: "Contract Vehicles", href: "/contracting" },
  { label: "Work With Us", href: "/work-with-us" },
  { label: "Quality", href: "/about/quality-compliance" },
];

export const footerColumns: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Services",
    items: serviceItems,
  },
  {
    heading: "Contracting",
    items: [
      { label: "Capability Statements", href: "/contracting/capability-statement" },
      { label: "Contracting overview", href: "/contracting" },
      ...(starsShown ? [{ label: "GSA 8(a) STARS III", href: "/contracting/stars-iii" }] : []),
      { label: "Certifications and Set-Asides", href: "/contracting/certifications" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "Why JVM", href: "/why-jvm" },
      { label: "About JVM", href: "/about" },
      { label: "Quality and Compliance", href: "/about/quality-compliance" },
      { label: "Join Our Team", href: "/careers" },
      { label: "Work With Us", href: "/work-with-us" },
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
