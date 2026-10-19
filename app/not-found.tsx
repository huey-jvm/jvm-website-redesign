import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/site/Section";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <Section surface="cream" className="min-h-[60vh]">
      <Eyebrow tone="light">JVM Solutions / 404</Eyebrow>
      <h1 className="mt-3 text-cinema-sm md:text-display">Page Not Found</h1>
      <p className="prose-measure mt-4 text-body text-ink-700">The page you asked for is not here. It may have moved when the site was rebuilt.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/" variant="primary">Go to the homepage</Button>
        <Button href="/contracting" variant="secondary">Go to contracting</Button>
      </div>
    </Section>
  );
}
