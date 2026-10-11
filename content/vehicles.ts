export type Vehicle = {
  slug: string;
  name: string;
  role: "Prime" | "Subcontractor";
  contractNumber?: string;
  orderingStart?: string;
  currentEnd?: string;
  currentEndPlaceholder?: { id: string; what: string; who: string };
  scope: string[];
  evidenceHref?: string;
  status: "current" | "pending-confirmation";
};

export type Listing = "pending" | "yes" | "no";

export const starsIII = {
  slug: "stars-iii",
  listed: "pending" as Listing,
  name: "GSA 8(a) STARS III",
  role: "Prime",
  contractNumber: "47QTCB22D0653",
  orderingStart: "2 July 2021",
  basePeriodEnd: "1 July 2026",
  optionEnd: "1 July 2029",
  performanceTail: "Performance on awarded task orders can extend five years beyond the ordering end date.",
  ceiling: "$50 billion",
  accessFee: "0.75%, the same as GSA Schedules",
  contractTypes: ["Firm Fixed Price (FFP)", "Time and Materials (T&M)", "Labor Hour", "A hybrid of any of the three"],
  scope: ["Software development", "IT operations and maintenance", "Systems design", "IT help desk support", "Information assurance", "Cybersecurity", "Artificial intelligence"],
  benefits: [
    "Pre-competed, easy to use contract with streamlined ordering procedures",
    "Directed awards allowed for orders up to the 8(a) competitive threshold",
    "Multiple award, indefinite delivery indefinite quantity (IDIQ) contract vehicle",
    "8(a) socioeconomic credit transferable to the agency",
    "Shortened procurement lead time",
    "Promotes contract compliance and reduces the risk of adverse audits",
    "Access to a pool of contractors with industry credentials",
    "Supports timely order award for optimal mission support",
  ],
  summary: "a Best in Class governmentwide acquisition contract for IT services",
  gsaUrl: "https://www.gsa.gov/stars3",
  gsaContact: { org: "the Small Business GWAC Center", email: "S3@gsa.gov", phone: "(877) 327-8732", phoneHref: "tel:+18773278732" },
  jvmEmail: "stars3@jvmsolutions.net",
  description:
    "GSA 8(a) STARS III is a multiple-award, indefinite-delivery, indefinite-quantity governmentwide acquisition contract designed to provide federal agencies with IT services and IT services-based solutions. It is designated Best in Class, and it gives agencies an easy to use, streamlined procurement route to 8(a) prime contractors, with an emphasis on emerging technology and performance outside the continental United States.",
} as const;

export const starsShown = starsIII.listed !== "no";
export const starsConfirmed = starsIII.listed === "yes";
export const starsOrdering = starsConfirmed
  ? { current: `Through ${starsIII.optionEnd}`, history: `Base period ${starsIII.orderingStart} to ${starsIII.basePeriodEnd}, option exercised to ${starsIII.optionEnd}.` }
  : { current: "Confirmation pending", history: undefined };

export const subcontractVehicles: Vehicle[] = [];

export const confirmedSubcontractVehicles = subcontractVehicles.filter((v) => v.status === "current" && v.currentEnd);

export type PastPerformance = {
  title: string;
  agency: string;
  role: "Prime" | "Subcontractor";
  period: string;
  scope: string;
  cpars?: string;
  publishable: boolean;
};

export const pastPerformance: PastPerformance[] = [];
