import { outcomes } from "./outcomes";

export type AssetKind = "photo" | "texture" | "illustration" | "diagram";
export type Asset = { id: string; path: string; alt: string; kind: AssetKind; where: string[] };

const dir = "/images/generated";

export const illustrationShape = { width: 768, height: 512 } as const;

export const outcomeIllustrationId = (outcomeId: string) => `IL-${String(outcomes.findIndex((o) => o.id === outcomeId) + 1).padStart(2, "0")}`;

const outcomeIllustrations: Asset[] = outcomes.map((o) => ({
  id: outcomeIllustrationId(o.id),
  path: `/images/illustrations/${outcomeIllustrationId(o.id).toLowerCase()}-${o.id}.png`,
  alt: "",
  kind: "illustration",
  where: ["/"],
}));


export const assets: Asset[] = [
  { id: "AS-16", path: "/images/revision/facilities.svg", alt: "Diagram connecting facilities operations, maintenance and follow-through", kind: "diagram", where: ["/services/facilities-management"] },
  { id: "AS-01", path: "/images/revision/technology.svg", alt: "Diagram connecting systems, support and security", kind: "diagram", where: ["/", "/services"] },
  { id: "AS-02", path: "/images/revision/logistics.svg", alt: "Diagram connecting planning, inventory and delivery", kind: "diagram", where: ["/", "/services"] },
  { id: "AS-03", path: "/images/revision/conference-team.webp", alt: "JVM representatives at a small business conference", kind: "photo", where: [] },
  { id: "AS-06", path: "/images/revision/workplace-team.webp", alt: "", kind: "photo", where: ["/services/healthcare-operations"] },
  { id: "AS-07", path: "/images/revision/technology.svg", alt: "", kind: "diagram", where: ["/services/health-it"] },
  { id: "AS-08", path: "/images/revision/logistics.svg", alt: "", kind: "diagram", where: ["/services/logistics"] },
  { id: "AS-09", path: "/images/revision/conference-team.webp", alt: "", kind: "photo", where: ["/services/management-support"] },
  { id: "AS-10", path: `${dir}/as-10-shift.png`, alt: "", kind: "texture", where: [] },
  { id: "AS-11", path: `${dir}/as-11-contracting-banner.jpg`, alt: "", kind: "photo", where: [] },
  { id: "AS-12", path: `${dir}/as-12-capability.jpg`, alt: "A blank sheet of paper and a fountain pen on a dark desk", kind: "photo", where: [] },
  { id: "AS-13", path: `${dir}/as-05-cream-grain.png`, alt: "", kind: "texture", where: ["/about"] },
  { id: "AS-14", path: `/images/revision/quality-team-enhanced.png`, alt: "", kind: "photo", where: ["/about/quality-compliance"] },
  { id: "AS-15a", path: `/images/revision/team-visit.webp`, alt: "JVM colleagues during a workplace visit", kind: "photo", where: ["/careers"] },
  { id: "AS-15b", path: "/images/revision/clinical-team-enhanced.png", alt: "A group of professionals together in a clinical workplace", kind: "photo", where: ["/careers"] },
  { id: "AS-15c", path: "/images/keith/workplace-team.webp", alt: "Five people together in a rehabilitation and exercise space", kind: "photo", where: ["/careers"] },
];

assets.push(...outcomeIllustrations);

export const getAsset = (id: string) => assets.find((a) => a.id === id);
