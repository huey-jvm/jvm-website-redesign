import { Button } from "@/components/ui/Button";
import { Section } from "./Section";
import { OpenWidgetButton } from "./OpenWidgetButton";
import { statements } from "@/content/statements";

export function CTABand({ title = "Ready to Talk About Your Mission?", body = statements.conversationPrompt, secondaryHref, secondaryLabel, surface = "cream", route }: { title?: string; body?: string; secondaryHref?: string; secondaryLabel?: string; surface?: "cream" | "dark"; route?: "contracting" | "health-system" | "careers" | "other" }) {
  const tone = surface === "dark" ? "dark" : "light";
  return (
    <Section surface={surface} tight backdrop={surface === "cream" ? "AS-05" : undefined}>
      <div className="cta-content flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className={surface === "dark" ? "section-title text-h2-sm text-cream md:text-h2" : "section-title text-h2-sm md:text-h2"}>{title}</h2>
          {body ? <p className={surface === "dark" ? "mt-2 max-w-[60ch] text-body text-ink-200" : "mt-2 max-w-[60ch] text-body text-ink-700"}>{body}</p> : null}
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3 lg:max-w-prose lg:justify-end">
          <OpenWidgetButton tone={tone} route={route} />
          {secondaryHref ? <Button href={secondaryHref} variant="secondary" tone={tone}>{secondaryLabel ?? "Learn more"}</Button> : null}
        </div>
      </div>
    </Section>
  );
}
