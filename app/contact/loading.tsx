import { PageSkeleton } from "@/components/site/PageSkeleton";
import samples from "@/components/site/skeletons/contact.json";

export default function Loading() {
  return <PageSkeleton samples={samples} name="contact" />;
}
