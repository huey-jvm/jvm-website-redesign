import { PageSkeleton } from "@/components/site/PageSkeleton";
import samples from "@/components/site/skeletons/quality-compliance.json";

export default function Loading() {
  return <PageSkeleton samples={samples} name="quality-compliance" />;
}
