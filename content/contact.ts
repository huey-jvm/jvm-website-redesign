export type RouteKey = "contracting" | "health-system" | "careers" | "other";

const mainLine = { phone: "210-504-4707", phoneHref: "tel:+12105044707" };
const office = { street: "7550 W I-10, Suite 800", locality: "San Antonio", region: "TX", regionName: "Texas", postalCode: "78229" };

export const contact = {
  office: {
    label: "Texas Office",
    ...office,
    lines: [office.street, `${office.locality}, ${office.region} ${office.postalCode}`],
    ...mainLine,
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([office.street, office.locality, office.region, office.postalCode].join(" "))}`,
  },
  compliance: {
    label: "Ethics and Compliance Department",
    purpose: "Mailing address",
    lines: ["118 Broadway, Suite 525", "San Antonio, TX 78205"],
    ...mainLine,
  },
  emails: {
    general: "info@jvmsolutions.net",
    bd: "BD@jvmsolutions.net",
    credentialing: "credentialing@jvmsolutions.net",
  },
  responseTime: "one business day",
  social: [
    { name: "Facebook", href: "https://www.facebook.com/JVMSolutions", pendingCheck: true },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/jvmsolutions", pendingCheck: true },
  ],
  careersPortal: "https://jvmsolutions.isolvedhire.com/jobs/",
  routes: {
    contracting: { label: "I'm a contracting or program officer", to: "BD@jvmsolutions.net", reads: "Business Development" },
    "health-system": { label: "I represent a health system", to: "BD@jvmsolutions.net", reads: "Business Development" },
    careers: { label: "I'm looking for work", to: "info@jvmsolutions.net", reads: "the JVM team" },
    other: { label: "Something else", to: "info@jvmsolutions.net", reads: "the JVM team" },
  } satisfies Record<RouteKey, { label: string; to: string; reads: string }>,
} as const;
