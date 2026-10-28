import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { InPageNav } from "@/components/site/InPageNav";
import { CTABand } from "@/components/site/CTABand";
import { outcomes, outcomesIntro } from "@/content/outcomes";
import {
  differentiators,
  differentiatorsIntro,
  theShift,
  valueProposition,
} from "@/content/differentiators";
import { statements } from "@/content/statements";
import { pageMetadata } from "@/lib/seo";
import { OperationsExplorer } from "@/components/site/OperationsExplorer";
import { ArrowRight } from "lucide-react";

export const metadata = pageMetadata(
  "Why JVM",
  "From fragmented support to integrated operations partner. The value proposition, five outcomes and four differentiators behind every JVM engagement.",
  "/why-jvm",
);

const nav = [
  { id: "shift", label: "The shift" },
  { id: "value", label: "Value proposition" },
  { id: "outcomes", label: "Five outcomes" },
  { id: "differentiators", label: "Differentiators" },
];

export default function WhyPage() {
  return (
    <>
      <PageHero
        eyebrow="Why JVM"
        title="Partner, Not Vendor"
        lead={statements.tagline}
        crumbs={[{ label: "Why JVM" }]}
      />
      <Section>
        <div className="document-layout grid grid-cols-1 gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <InPageNav
            sections={[
              ...nav,
              ...outcomes.map((o) => ({ id: o.id, label: o.title })),
            ]}
          />
          <div className="min-w-0 space-y-16">
            <section id="shift" className="chapter-section scroll-mt-28">
              <h2 className="text-h2-sm md:text-h2">The Shift</h2>
              <p className="prose-measure mt-4 text-body text-ink-700">
                {theShift.intro}
              </p>
              <div className="shift mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-10">
                <div className="shift-from flex flex-col items-start border-t border-ink-200 py-6">
                  <Eyebrow tone="muted">The starting point</Eyebrow>
                  <h3 className="mt-4 text-h3 text-ink-700">{theShift.from.title}</h3>
                  <p className="mt-4 text-body-sm leading-relaxed text-ink-700">{theShift.from.body}</p>
                  <span aria-hidden className="shift-arrow mt-6 grid size-11 place-items-center rounded-pill border border-gold-500/60 text-gold-700 lg:mt-auto lg:translate-y-2"><ArrowRight className="size-5 rotate-90 lg:rotate-0" /></span>
                </div>
                <div className="shift-to rounded-container border-t-[3px] border-gold-500 bg-ink-950 p-6 text-cream md:p-8">
                  <Eyebrow tone="dark">The JVM approach</Eyebrow>
                  <h3 className="mt-4 max-w-[24ch] text-h2-sm text-cream">{theShift.to.title}</h3>
                  <span aria-hidden className="mt-5 block h-0.5 w-12 bg-gold-500" />
                  <p className="mt-5 text-body-sm leading-relaxed text-ink-200">{theShift.to.body}</p>
                </div>
              </div>
              <OperationsExplorer />
            </section>

            <section id="value" className="chapter-section scroll-mt-28">
              <h2 className="text-h2-sm md:text-h2">
                {valueProposition.title}
              </h2>
              <p className="prose-measure mt-4 text-body text-ink-700">
                {valueProposition.intro}
              </p>

              <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
                {valueProposition.pillars.map((p) => (
                  <li key={p.title} className="border-t-2 border-gold-500 pt-5">
                    <h3 className="text-h3">{p.title}</h3>
                    <p className="mt-2 text-body text-ink-700">{p.body}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section id="outcomes" className="chapter-section scroll-mt-28">
              <h2 className="text-h2-sm md:text-h2">Five Outcomes We Sell</h2>
              <p className="prose-measure mt-4 text-body text-ink-700">
                {outcomesIntro}
              </p>
              <div className="mt-8 space-y-10">
                {outcomes.map((o) => (
                  <section
                    key={o.id}
                    id={o.id}
                    className="chapter-section scroll-mt-28 border-l-2 border-gold-500 pl-6"
                  >
                    <h3 className="text-h3">{o.title}</h3>
                    <p className="prose-measure mt-2 text-body text-ink-700">
                      {o.body}
                    </p>
                  </section>
                ))}
              </div>
            </section>

            <section
              id="differentiators"
              className="chapter-section scroll-mt-28"
            >
              <h2 className="text-h2-sm md:text-h2">
                Our Competitive Differentiators
              </h2>
              <p className="prose-measure mt-4 text-body text-ink-700">
                {differentiatorsIntro}
              </p>

              <ol className="differentiators mt-8 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
                {differentiators.map((d) => (
                  <li key={d.n} className="flex flex-col border-l border-ink-200 pl-6">
                    <span className="font-sans text-h1-sm font-medium leading-none text-gold-700 tabular">
                      {String(d.n).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-h3">{d.title}</h3>
                    <p className="mt-2 text-body text-ink-700">{d.body}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      <CTABand embedded
        title="See It Applied to Your Facility"
        body="Tell us about the mission and we will show you where the outcomes land."
      />
      </Section>

    </>
  );
}
