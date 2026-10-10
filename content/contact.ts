/**
 * The one source for every address, phone, email and routing rule on the site.
 * In version 1.1 this record moves to the CMS `contactDetails` singleton. Until then it is edited here.
 */
export type RouteKey = "contracting" | "health-system" | "careers" | "other";

export const contact = {
  office: {
    label: "Texas Office",
    lines: ["7550 W I-10, Suite 800", "San Antonio, TX 78229"],
    phone: "210-504-4707",
    phoneHref: "tel:+12105044707",
    fax: "210-764-5854",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=7550+W+I-10+Suite+800+San+Antonio+TX+78229",
    placeholder: { id: "P4", what: "Confirm which address is the office and which fax is live", who: "JVM, B1" },
  },
  compliance: {
    label: "Ethics and Compliance Department",
    lines: ["118 Broadway, Suite 525", "San Antonio, TX 78205"],
    phone: "210-504-4707",
    phoneHref: "tel:+12105044707",
  },
  emails: {
    general: "info@jvmsolutions.net",
    bd: "BD@jvmsolutions.net",
    credentialing: "credentialing@jvmsolutions.net",
    stars3: "stars3@jvmsolutions.net",
  },
  responseTime: "two business days",
  responseTimePlaceholder: { id: "P10", what: "A realistic response time and the owner of each inbox", who: "JVM, B7" },
  social: [
    { name: "Facebook", href: "https://www.facebook.com/JVMSolutions" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/jvmsolutions" },
  ],
  careersPortal: "https://jvmsolutions.isolvedhire.com/jobs/",
  routes: {
    contracting: { label: "I'm a contracting or program officer", to: "BD@jvmsolutions.net", reads: "Business Development" },
    "health-system": { label: "I represent a health system", to: "BD@jvmsolutions.net", reads: "Business Development" },
    careers: { label: "I'm looking for work", to: "info@jvmsolutions.net", reads: "the JVM team" },
    other: { label: "Something else", to: "info@jvmsolutions.net", reads: "the JVM team" },
  } satisfies Record<RouteKey, { label: string; to: string; reads: string }>,
} as const;
