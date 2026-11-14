import { PageSkeleton } from "@/components/site/PageSkeleton";
import samples from "@/components/site/skeletons/home.json";

// Keep the initial route silhouette on the server. Skullet is loaded only
// by photos and maps that actually need an interactive loading state.
export default function Loading() {
  return <PageSkeleton samples={samples} name="home" />;
}
