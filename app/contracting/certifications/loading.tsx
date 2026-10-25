import { PageSkeleton } from "@/components/site/PageSkeleton";
import samples from "@/components/site/skeletons/certifications.json";

export default function Loading() {
  return <PageSkeleton samples={samples} name="certifications" />;
}
