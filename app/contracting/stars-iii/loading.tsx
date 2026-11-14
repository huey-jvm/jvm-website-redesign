import { PageSkeleton } from "@/components/site/PageSkeleton";
import samples from "@/components/site/skeletons/stars-iii.json";
import { starsShown } from "@/content/vehicles";

export default function Loading() {
  return starsShown ? <PageSkeleton samples={samples} name="stars-iii" /> : null;
}
