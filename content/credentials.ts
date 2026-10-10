export type Credential = {
  slug: string;
  name: string;
  meaning: string;
  issuer: string;
  period?: string;
  evidenceHref?: string;
  image?: string;
  wide?: boolean;
};

/**
 * Image files come from `download-assets.ps1` one folder up. Run it, then copy the downloaded
 * `assets/` folder into `site/public/assets/` and the paths below resolve. Until then each mark
 * renders as a text tile, which is honest rather than broken. The four ISO quality marks are a
 * flattened composite on the old site, so `iso-9001` has no image until the registrar's files arrive (P17).
 */
export const credentials: Credential[] = [
  { slug: "sba-8a", name: "SBA 8(a) Certified", meaning: "Eligible for sole source and competitive 8(a) set-aside awards.", issuer: "U.S. Small Business Administration", evidenceHref: "https://sam.gov/", image: "/assets/03-credentials/sba-8a.png" },
  { slug: "edwosb", name: "EDWOSB", meaning: "Economically Disadvantaged Woman-Owned Small Business.", issuer: "U.S. Small Business Administration", evidenceHref: "https://sam.gov/", image: "/assets/03-credentials/edwosb.png", wide: true },
  { slug: "sdvosb", name: "SDVOSB", meaning: "Service-Disabled Veteran-Owned Small Business.", issuer: "U.S. Small Business Administration", evidenceHref: "https://sam.gov/", image: "/assets/03-credentials/sdvosb.jpg" },
  { slug: "hubzone", name: "HUBZone Certified", meaning: "Historically Underutilized Business Zone certification.", issuer: "U.S. Small Business Administration", evidenceHref: "https://sam.gov/", image: "/assets/03-credentials/hubzone.jpg" },
  { slug: "stars-iii", name: "GSA 8(a) STARS III Prime", meaning: "Prime contractor on the GSA 8(a) STARS III governmentwide acquisition contract.", issuer: "U.S. General Services Administration", period: "Ordering through the current contract end date", evidenceHref: "/contracting/stars-iii", image: "/assets/04-vehicles/vehicle-mark-4.jpg" },
  { slug: "iso-9001", name: "ISO 9001:2015", meaning: "Certified quality management system.", issuer: "Accredited registrar (ANAB, IAF, TÜV Rheinland)", evidenceHref: undefined },
  { slug: "vip", name: "National Center VIP Graduate", meaning: "Veteran Institute for Procurement graduate.", issuer: "National Center for Veteran Institute for Procurement", image: "/assets/03-credentials/vip-graduate.jpg" },
  { slug: "we-hire-vets", name: "We Hire Vets 2024", meaning: "Recognised for veteran hiring.", issuer: "Texas Workforce Commission", image: "/assets/04-vehicles/vehicle-mark-1.png" },
];

export const proofStripSlugs = ["sba-8a", "edwosb", "sdvosb", "hubzone", "stars-iii", "iso-9001"];
