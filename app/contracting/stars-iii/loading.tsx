import { PageSkeleton } from "@/components/site/PageSkeleton";
import samples from "@/components/site/skeletons/stars-iii.json";

export default function Loading() {
  return <PageSkeleton samples={samples} name="stars-iii" />;
}
