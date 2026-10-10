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

export const starsIII = {
  slug: "stars-iii",
  name: "GSA 8(a) STARS III",
  role: "Prime",
  contractNumber: "47QTCB22D0653",
  orderingStart: "2 July 2021",
  basePeriodEnd: "1 July 2026",
  optionEnd: "1 July 2029",
  currentEnd: undefined as string | undefined,
  currentEndPlaceholder: { id: "P5", what: "The current ordering period end date, and whether the option to 1 July 2029 was exercised", who: "JVM, B2" },
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
  gsaUrl: "https://www.gsa.gov/stars3",
  gsaContact: { org: "The Small Business GWAC Center", email: "S3@gsa.gov", phone: "(877) 327-8732" },
  jvmEmail: "stars3@jvmsolutions.net",
  description:
    "GSA 8(a) STARS III is a multiple-award, indefinite-delivery, indefinite-quantity governmentwide acquisition contract designed to provide federal agencies with IT services and IT services-based solutions. It is designated Best in Class, and it gives agencies an easy to use, streamlined procurement route to 8(a) prime contractors, with an emphasis on emerging technology and performance outside the continental United States.",
} as const;

export const subcontractVehicles: Vehicle[] = [
  { slug: "cio-sp3", name: "NIH CIO-SP3", role: "Subcontractor", scope: [], status: "pending-confirmation", currentEndPlaceholder: { id: "P6", what: "Current vehicle name (CIO-SP3 or its successor) and period of performance", who: "JVM, B3" } },
  { slug: "va-vector", name: "VA VECTOR", role: "Subcontractor", scope: [], status: "pending-confirmation", currentEndPlaceholder: { id: "P6", what: "Period of performance", who: "JVM, B3" } },
  { slug: "gsa-schedule-70", name: "GSA Schedule 70", role: "Subcontractor", scope: [], status: "pending-confirmation", currentEndPlaceholder: { id: "P6", what: "Current vehicle name (Schedule 70 or the consolidated Multiple Award Schedule) and period of performance", who: "JVM, B3" } },
];

export type PastPerformance = {
  title: string;
  agency: string;
  role: "Prime" | "Subcontractor";
  period: string;
  scope: string;
  cpars?: string;
  publishable: boolean;
};

/** Empty until JVM supplies publishable records (P7). The page withholds itself in production while this is empty. */
export const pastPerformance: PastPerformance[] = [];
