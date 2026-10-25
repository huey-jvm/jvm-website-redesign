import { CapabilityLibrary } from "@/components/site/CapabilityLibrary";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { InPageNav } from "@/components/site/InPageNav";
import { CTABand } from "@/components/site/CTABand";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { services, getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { ContractSummary } from "@/components/site/ContractSummary";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata(s.name, s.summary, `/services/${s.slug}`);
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const navSections = [
    ...service.sections.map((s) => ({ id: s.id, label: s.title })),
    ...(service.lead ? [{ id: "commercial", label: "Commercial health systems" }] : []),
    { id: "documents", label: "Capability statements" },
  ];

  return (
    <>
      <PageHero eyebrow="Services" title={service.name} lead={service.intro} backdrop={service.bannerImage} crumbs={[{ label: "Services", href: "/services" }, { label: service.name }]}>
        {service.placeholders?.map((p) => <div key={p.id} className="mt-6 max-w-xl"><Placeholder id={p.id} what={p.what} who={p.who} /></div>)}
      </PageHero>

      <Section surface="light" className="service-body">
        <div className="document-layout grid grid-cols-1 gap-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12">
          <InPageNav sections={navSections} />
          <div className="min-w-0 space-y-8">
            {service.sections.map((sec, index) => (
              <section key={sec.id} id={sec.id} className="service-chapter scroll-mt-28">
                <p className="mb-5 text-eyebrow text-gold-700">{String(index + 1).padStart(2, "0")} / {service.short}</p>
                <h2 className="text-h2-sm md:text-h2">{sec.title}</h2>
                <div className={sec.id === "stars-iii" ? "mt-5 grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]" : undefined}>
                  <div>
                    <p className="prose-measure mt-4 text-body leading-relaxed text-ink-700">{sec.body}</p>
                    {sec.delivers?.length ? (
                      <ul className="service-capabilities mt-8 grid grid-cols-1 gap-3 text-body text-ink-900">
                        {sec.delivers.map((delivery) => (
                          <li key={delivery.title}>
                            <div className="service-capability p-5 md:p-6">
                              <h3 className="text-h4 font-medium">{delivery.title}</h3>
                              <p className="mt-3 max-w-[78ch] text-body-sm leading-relaxed text-ink-700 md:text-body">{delivery.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {sec.id === "stars-iii" ? (
                      <div className="mt-5"><Button href="/contracting/stars-iii" variant="secondary" icon={<ArrowRight className="size-4" />} iconTrailing>Read about STARS III</Button></div>
                    ) : null}
                  </div>
                  {sec.id === "stars-iii" ? <ContractSummary /> : null}
                </div>
              </section>
            ))}

            {service.lead ? (
              <section id="commercial" className="commercial-health-card chapter-section scroll-mt-28 rounded-container p-6 md:p-8">
                <Eyebrow tone="light">For commercial health systems</Eyebrow>
                <h2 className="mt-3 text-h2-sm md:text-h2">The Same Model, in Your Terms</h2>
                <p className="prose-measure mt-4 text-body text-ink-700">
                  Health systems outside government face the same pressures: access, throughput, staffing continuity and compliance. We bring the same credentialed professionals, the same program and case management discipline, scoped to your network, your payer mix and your patient population.
                </p>
                <Button href="/contact" variant="tertiary" className="max-w-full whitespace-normal text-left mt-5" icon={<ArrowRight className="size-4" />} iconTrailing>Talk to us about your system</Button>
              </section>
            ) : null}


          </div>
        </div>
        <section id="documents" className="scroll-mt-28 pt-12 md:pt-16 lg:pt-24">
          <CapabilityLibrary service={service.slug} />
        </section>
      <CTABand embedded route={service.slug === "healthcare-operations" ? "health-system" : "contracting"} />
      </Section>


    </>
  );
}
