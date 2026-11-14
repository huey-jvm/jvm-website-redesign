import { PageSkeleton } from "@/components/site/PageSkeleton";
import samples from "@/components/site/skeletons/why-jvm.json";

export default function Loading() {
  return <PageSkeleton samples={samples} name="why-jvm" />;
}
