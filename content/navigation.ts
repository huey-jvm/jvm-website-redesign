export type NavItem = { label: string; href: string; description?: string; lead?: boolean };
export type NavGroup = { label: string; href?: string; items?: NavItem[] };

export const primaryNav: NavGroup[] = [
  {
    label: "Services",
    items: [
      { label: "Healthcare Operations", href: "/services/healthcare-operations", description: "Clinical and operational professionals, program and case management, credentialing", lead: true },
      { label: "Health IT", href: "/services/health-it", description: "IT services under GSA 8(a) STARS III" },
      { label: "Logistics and Facilities", href: "/services/logistics-facilities", description: "Supply chain, transportation, facilities" },
      { label: "Management and Administration Support", href: "/services/management-support", description: "Operations and administrative support" },
      { label: "All services", href: "/services" },
    ],
  },
  { label: "Why JVM", href: "/why-jvm" },
  {
    label: "Contracting",
    items: [
      { label: "Contracting overview", href: "/contracting", description: "Identifiers, vehicles and how to reach us" },
      { label: "GSA 8(a) STARS III", href: "/contracting/stars-iii", description: "Our prime contract vehicle" },
      { label: "Certifications and Set-Asides", href: "/contracting/certifications", description: "8(a), EDWOSB, SDVOSB, HUBZone, ISO 9001" },
      { label: "Past Performance", href: "/contracting/past-performance", description: "Contracts and task orders" },
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
    items: [
      { label: "Healthcare Operations", href: "/services/healthcare-operations" },
      { label: "Health IT", href: "/services/health-it" },
      { label: "Logistics and Facilities", href: "/services/logistics-facilities" },
      { label: "Management and Administration Support", href: "/services/management-support" },
    ],
  },
  {
    heading: "Contracting",
    items: [
      { label: "Contracting overview", href: "/contracting" },
      { label: "GSA 8(a) STARS III", href: "/contracting/stars-iii" },
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
