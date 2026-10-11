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
import { Slot, presentAsset } from "@/components/site/Slot";

export const metadata = pageMetadata(
  "Why JVM",
  "From staffing vendor to integrated operations partner. The value proposition, five outcomes and four differentiators behind every JVM engagement.",
  "/why-jvm",
);

const nav = [
  { id: "shift", label: "The shift" },
  { id: "value", label: "Value proposition" },
  { id: "outcomes", label: "Five outcomes" },
  { id: "differentiators", label: "Differentiators" },
];

export default function WhyPage() {
  const shiftArt = presentAsset("AS-10");
  return (
    <>
      <PageHero
        eyebrow="Why JVM"
        title="Partner, Not Vendor"
        lead={statements.tagline}
        crumbs={[{ label: "Why JVM" }]}
      />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
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
              <div className="mt-6 rounded-container bg-cream p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-control border border-cream-border bg-white p-6">
                    <Eyebrow tone="muted">From</Eyebrow>
                    <h3 className="mt-2 text-h4 text-ink-950">
                      {theShift.from.title}
                    </h3>
                    <p className="mt-2 text-body-sm text-ink-700">
                      {theShift.from.body}
                    </p>
                  </div>
                  <div className="rounded-control border border-cream-border bg-white p-6">
                    <Eyebrow tone="light">To</Eyebrow>
                    <h3 className="mt-2 text-h4">{theShift.to.title}</h3>
                    <p className="mt-2 text-body-sm text-ink-900">
                      {theShift.to.body}
                    </p>
                  </div>
                </div>
                {shiftArt ? (
                  <Slot
                    id={shiftArt.id}
                    className="mt-6 hidden aspect-[2/1] w-full overflow-hidden rounded-control lg:block"
                    sizes="(min-width: 1024px) 30vw, 100vw"
                  />
                ) : null}
              </div>
            </section>

            <section id="value" className="chapter-section scroll-mt-28">
              <h2 className="text-h2-sm md:text-h2">
                {valueProposition.title}
              </h2>
              <p className="prose-measure mt-4 text-body text-ink-700">
                {valueProposition.intro}
              </p>

              <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {valueProposition.pillars.map((p) => (
                  <li
                    key={p.title}
                    className="@container rounded-container border border-ink-200 bg-white"
                  >
                    <div className="p-4 @[20rem]:p-6 @[35rem]:p-8">
                      <h3 title={p.title} className="truncate text-h3">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-body text-ink-700">{p.body}</p>
                    </div>
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

              <ol className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {differentiators.map((d) => (
                  <li
                    key={d.n}
                    className="@container rounded-container border border-ink-200 bg-white"
                  >
                    <div className="p-4 @[20rem]:p-6 @[35rem]:p-8">
                      <span className="font-sans text-h2 font-medium leading-none text-gold-700 tabular">
                        {d.n}
                      </span>
                      <h3
                        title={d.title}
                        className="mt-3 truncate text-h4 @[20rem]:text-h3 @[35rem]:text-h2-sm"
                      >
                        {d.title}
                      </h3>
                      <p className="mt-2 text-body text-ink-700">{d.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </Section>
      <CTABand
        title="See It Applied to Your Facility"
        body="Tell us about the mission and we will show you where the outcomes land."
      />
    </>
  );
}
