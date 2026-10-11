import { Button } from "@/components/ui/Button";
import { Section } from "./Section";
import { OpenWidgetButton } from "./OpenWidgetButton";

export function CTABand({ title = "Ready to Talk About Your Mission?", body, secondaryHref, secondaryLabel, surface = "cream", route }: { title?: string; body?: string;  surface?: "cream" | "dark"; route?: "contracting" | "health-system" | "careers" | "other" } & ({ secondaryHref: string; secondaryLabel: string } | { secondaryHref?: undefined; secondaryLabel?: undefined })) {
  const tone = surface === "dark" ? "dark" : "light";
  return (
    <Section surface={surface} backdrop={surface === "cream" ? "AS-05" : undefined}>
      <div className="cta-content flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className={surface === "dark" ? "text-h2-sm text-cream md:text-h2" : "text-h2-sm md:text-h2"}>{title}</h2>
          {body ? <p className={surface === "dark" ? "mt-2 max-w-[60ch] text-body text-ink-200" : "mt-2 max-w-[60ch] text-body text-ink-700"}>{body}</p> : null}
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3 lg:max-w-prose lg:justify-end">
          <OpenWidgetButton tone={tone} route={route} />
          {secondaryHref ? <Button href={secondaryHref} variant="secondary" tone={tone}>{secondaryLabel}</Button> : null}
        </div>
      </div>
    </Section>
  );
}
