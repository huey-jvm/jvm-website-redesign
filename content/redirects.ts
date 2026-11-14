import { starsShown } from "./vehicles";
import redirects from "./legacy-redirects.json";

export const legacyRedirects: { source: string; destination: string }[] = [
  ...redirects,
  { source: "/gsa-8a-stars-iii", destination: starsShown ? "/contracting/stars-iii" : "/contracting" },
];
