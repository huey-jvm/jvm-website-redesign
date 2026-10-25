import { PageSkeleton } from "@/components/site/PageSkeleton";
import samples from "@/components/site/skeletons/home.json";

export default function Loading() {
  return <PageSkeleton samples={samples} name="home" />;
}
