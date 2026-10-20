import { outcomes } from "./outcomes";
import { services } from "./services";

export type AssetKind = "photo" | "texture" | "illustration";
export type Asset = { id: string; path: string; alt: string; kind: AssetKind; where: string[] };

const dir = "/images/generated";

export const illustrationShape = { width: 1200, height: 750 } as const;

export const outcomeIllustrationId = (outcomeId: string) => `IL-${String(outcomes.findIndex((o) => o.id === outcomeId) + 1).padStart(2, "0")}`;

const outcomeIllustrations: Asset[] = outcomes.map((o) => ({
  id: outcomeIllustrationId(o.id),
  path: `${dir}/${outcomeIllustrationId(o.id).toLowerCase()}-${o.id}.png`,
  alt: "",
  kind: "illustration",
  where: ["/", ...services.filter((s) => s.relatedOutcomes.includes(o.id)).map((s) => `/services/${s.slug}`)],
}));


export const assets: Asset[] = [
  { id: "AS-01", path: "/images/services/technology.webp", alt: "Conceptual image of a clinician and analyst reviewing health technology", kind: "photo", where: ["/", "/services"] },
  { id: "AS-02", path: "/images/services/logistics.webp", alt: "Conceptual image of logistics professionals checking warehouse inventory", kind: "photo", where: ["/", "/services"] },
  { id: "AS-03", path: "/images/services/management.webp", alt: "Conceptual image of operations managers planning a project", kind: "photo", where: ["/", "/services"] },
  { id: "AS-06", path: "/images/services/healthcare.webp", alt: "", kind: "photo", where: ["/services/healthcare-operations"] },
  { id: "AS-07", path: "/images/services/technology.webp", alt: "", kind: "photo", where: ["/services/health-it"] },
  { id: "AS-08", path: "/images/services/logistics.webp", alt: "", kind: "photo", where: ["/services/logistics-facilities"] },
  { id: "AS-09", path: "/images/services/management.webp", alt: "", kind: "photo", where: ["/services/management-support"] },
  { id: "AS-10", path: `${dir}/as-10-shift.png`, alt: "", kind: "texture", where: [] },
  { id: "AS-11", path: `${dir}/as-11-contracting-banner.jpg`, alt: "", kind: "photo", where: ["/contracting"] },
  { id: "AS-12", path: `${dir}/as-12-capability.jpg`, alt: "A blank sheet of paper and a fountain pen on a dark desk", kind: "photo", where: [] },
  { id: "AS-13", path: `${dir}/as-05-cream-grain.png`, alt: "", kind: "texture", where: ["/about"] },
  { id: "AS-14", path: `${dir}/as-14-quality-banner.jpg`, alt: "", kind: "photo", where: ["/about/quality-compliance"] },
  { id: "AS-15a", path: `${dir}/as-15a-veterans.jpg`, alt: "A folded uniform jacket without insignia beside a civilian blazer on a chair", kind: "photo", where: ["/careers"] },
  { id: "AS-15b", path: "/images/keith/clinical-team.webp", alt: "A group of professionals together in a clinical workplace", kind: "photo", where: ["/careers"] },
  { id: "AS-15c", path: "/images/keith/workplace-team.webp", alt: "Five people together in a rehabilitation and exercise space", kind: "photo", where: ["/careers"] },
];

assets.push(...outcomeIllustrations);

export const getAsset = (id: string) => assets.find((a) => a.id === id);
