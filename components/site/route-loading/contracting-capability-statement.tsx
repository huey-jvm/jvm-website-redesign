import { PageSkeleton } from "@/components/site/PageSkeleton";
import samples from "@/components/site/skeletons/capability-statement.json";

export default function Loading() {
  return <PageSkeleton samples={samples} name="capability-statement" />;
}
