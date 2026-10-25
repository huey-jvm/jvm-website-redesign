import { ErrorState } from "@/components/site/ErrorState";

export const metadata = { title: "Page unavailable", robots: { index: false, follow: true } };

export default function NotFound() {
  return <ErrorState />;
}
