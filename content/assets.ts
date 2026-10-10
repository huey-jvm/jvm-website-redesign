export type AssetKind = "photo" | "texture";
export type Asset = { id: string; path: string; alt: string; kind: AssetKind; where: string[] };

const dir = "/images/generated";

const ctaPages = [
  "/", "/services", "/services/healthcare-operations", "/services/health-it", "/services/logistics-facilities", "/services/management-support",
  "/why-jvm", "/contracting", "/contracting/stars-iii", "/contracting/certifications", "/contracting/capability-statement",
  "/about", "/about/quality-compliance", "/careers",
];

export const assets: Asset[] = [
  { id: "AS-01", path: `${dir}/as-01-health-it-card.jpg`, alt: "A clinical workstation on wheels parked in a quiet hospital corridor", kind: "photo", where: ["/", "/services"] },
  { id: "AS-02", path: `${dir}/as-02-logistics-card.jpg`, alt: "Sealed cartons on shelving in a clean medical supply storeroom", kind: "photo", where: ["/", "/services"] },
  { id: "AS-03", path: `${dir}/as-03-management-card.jpg`, alt: "A planning board and closed binders in a tidy operations office", kind: "photo", where: ["/", "/services"] },
  { id: "AS-04", path: `${dir}/as-04-gold-contours.png`, alt: "", kind: "texture", where: ["/"] },
  { id: "AS-05", path: `${dir}/as-05-cream-grain.png`, alt: "", kind: "texture", where: ctaPages },
  { id: "AS-06", path: `${dir}/as-06-healthcare-banner.jpg`, alt: "", kind: "photo", where: ["/services/healthcare-operations"] },
  { id: "AS-07", path: `${dir}/as-07-health-it-banner.jpg`, alt: "", kind: "photo", where: ["/services/health-it"] },
  { id: "AS-08", path: `${dir}/as-08-logistics-banner.jpg`, alt: "", kind: "photo", where: ["/services/logistics-facilities"] },
  { id: "AS-09", path: `${dir}/as-09-management-banner.jpg`, alt: "", kind: "photo", where: ["/services/management-support"] },
  { id: "AS-10", path: `${dir}/as-10-shift.png`, alt: "", kind: "texture", where: ["/why-jvm"] },
  { id: "AS-11", path: `${dir}/as-11-contracting-banner.jpg`, alt: "", kind: "photo", where: ["/contracting"] },
  { id: "AS-12", path: `${dir}/as-12-capability.jpg`, alt: "A blank sheet of paper and a fountain pen on a dark desk", kind: "photo", where: ["/contracting/capability-statement"] },
  { id: "AS-13", path: `${dir}/as-05-cream-grain.png`, alt: "", kind: "texture", where: ["/about"] },
  { id: "AS-14", path: `${dir}/as-14-quality-banner.jpg`, alt: "", kind: "photo", where: ["/about/quality-compliance"] },
  { id: "AS-15a", path: `${dir}/as-15a-veterans.jpg`, alt: "A folded uniform jacket without insignia beside a civilian blazer on a chair", kind: "photo", where: ["/careers"] },
  { id: "AS-15b", path: `${dir}/as-15b-healthcare.jpg`, alt: "A stethoscope and a lanyard on a clean nurses station counter", kind: "photo", where: ["/careers"] },
  { id: "AS-15c", path: `${dir}/as-15c-professionals.jpg`, alt: "A closed laptop, a notebook and a coffee on a desk by a window", kind: "photo", where: ["/careers"] },
];

export const getAsset = (id: string) => assets.find((a) => a.id === id);
