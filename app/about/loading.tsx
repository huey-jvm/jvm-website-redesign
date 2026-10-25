import { PageSkeleton } from "@/components/site/PageSkeleton";
import samples from "@/components/site/skeletons/about.json";

export default function Loading() {
  return <PageSkeleton samples={samples} name="about" />;
}
