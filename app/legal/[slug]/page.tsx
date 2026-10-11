import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { InPageNav } from "@/components/site/InPageNav";
import { Placeholder } from "@/components/ui/Placeholder";
import { legalPages, getLegalPage } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";
import { linkify } from "@/lib/linkify";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) return {};
  return pageMetadata(page.title, page.description, `/legal/${page.slug}`);
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();
  return (
    <>
      <PageHero eyebrow="Legal" title={page.title} lead={page.description} crumbs={[{ label: page.title }]}>
        <p className="mt-4 text-caption text-ink-500">Last updated {page.updated}</p>
        {page.draft ? <div className="mt-4 max-w-xl"><Placeholder id="P12"><p className="text-body-sm text-ink-900">Developer draft for JVM’s review. Approved text replaces this page before launch.</p></Placeholder></div> : null}
      </PageHero>
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <InPageNav sections={page.sections.map((s) => ({ id: s.id, label: s.title }))} />
          <div className="min-w-0 space-y-10">
            {page.sections.map((s) => (
              <section key={s.id} id={s.id} className="chapter-section scroll-mt-28">
                <h2 className="text-h3">{s.title}</h2>
                {s.paragraphs.map((p) => <p key={p.slice(0, 32)} className="prose-measure mt-3 text-body text-ink-700">{linkify(p)}</p>)}
                {s.list ? <ul className="prose-measure mt-3 list-disc space-y-1 pl-5 text-body text-ink-700">{s.list.map((l) => <li key={l}>{l}</li>)}</ul> : null}
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
