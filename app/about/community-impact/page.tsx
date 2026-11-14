import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { FounderQuote } from "@/components/site/FounderQuote";
import { Button } from "@/components/ui/Button";
import { purpose } from "@/content/purpose";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Community Impact", purpose.community.body, "/about/community-impact");

export default function CommunityImpactPage() {
  return <>
    <PageHero className="content-sized" eyebrow="Community Impact" title={purpose.community.title} lead={purpose.community.body} crumbs={[{ label: "About", href: "/about" }, { label: "Community Impact" }]} />
    <Section className="content-sized">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <FounderQuote quote={purpose.quote} />
        <div>
          <h2 className="text-h2-sm">{purpose.careers.title}</h2>
          <p className="mt-5 max-w-[60ch] text-body leading-relaxed text-ink-700">{purpose.careers.belief}</p>
          <div className="mt-7 flex flex-wrap gap-3"><Button href="/about#story" variant="secondary">Read our founder’s message</Button><Button href="/careers" variant="tertiary">Explore careers at JVM</Button></div>
        </div>
      </div>
    </Section>
  </>;
}
