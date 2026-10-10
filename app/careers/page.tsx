import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { CredentialMark } from "@/components/site/CredentialMark";
import { CTABand } from "@/components/site/CTABand";
import { Button } from "@/components/ui/Button";
import { credentials } from "@/content/credentials";
import { contact } from "@/content/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Careers", "Join a veteran-led healthcare operations company. We hire veterans, healthcare professionals and experienced professionals who want their work to matter.", "/careers");

const audiences = [
  { title: "Veterans", body: "JVM appreciates the personal sacrifices of our veterans in serving our country. We recognise and value the leadership, character and discipline you bring, and we help you find where the skills you have acquired fit best in a civilian career." },
  { title: "Healthcare Professionals", body: "We are committed to giving our clients more, with the most qualified and compassionate professionals in the industry. Your work is not just a job, it is a calling, and you deserve to get the most out of your profession. Our healthcare roles cover a wide array of specialty areas." },
  { title: "Experienced Professionals", body: "Our success is a direct result of our people. We have the right people in the right places making the right decisions for our clients. Join us to share your expertise in solving our commercial and government clients' hardest operational problems." },
];

export default function CareersPage() {
  const whv = credentials.find((c) => c.slug === "we-hire-vets")!;
  return (
    <>
      <PageHero eyebrow="Careers" title="Success Begins With the Right Team" lead="JVM is an equal opportunity employer and a recognised veteran employer. If your work is a calling, you will find people here who feel the same." crumbs={[{ label: "Careers" }]} />
      <div className="container-content">
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-container bg-ink-100 md:aspect-[21/9]">
          <Image src="/images/team/team-walking.jpg" alt="The JVM Solutions team walking together" fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>

      <Section>
        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {audiences.map((a) => (
            <li key={a.title} className="rounded-container border border-ink-200 bg-white p-6">
              <h2 className="truncate text-h3" title={a.title}>{a.title}</h2>
              <p className="mt-3 text-body text-ink-700">{a.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="cream" tight>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <CredentialMark credential={whv} />
          <div>
            <h2 className="text-h3">We Hire Veterans</h2>
            <p className="mt-2 max-w-[65ch] text-body text-ink-700">Recognised by the Texas Workforce Commission for our commitment to hiring veterans. Veteran status is a strength here, not a line on a form.</p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeader align="center" eyebrow="Open roles" title="View Current Openings" lead="Applications are handled on our careers portal, hosted by iSolved." />
          <Button href={contact.careersPortal} external variant="primary" size="lg" icon={<ArrowUpRight className="size-5" />} iconTrailing className="max-w-full whitespace-normal text-center">View open roles on iSolved</Button>
          <p className="mt-3 text-body-sm text-ink-500">Opens the JVM careers portal in a new tab.</p>
          <p className="mt-2 text-body text-ink-700">Openings are posted on our careers portal as they arise.</p>
        </div>
      </Section>

      <Section surface="ink50" tight>
        <p className="prose-measure text-body-sm text-ink-700">
          {`Johnson Venture Management Solutions, Inc. is an Equal Opportunity Employer. All qualified applicants receive consideration for employment without regard to race, colour, religion, sex, sexual orientation, gender identity, national origin, disability or protected veteran status. Questions about a role or the application process can be sent to `}
          <a href={`mailto:${contact.emails.general}`} className="link-underline font-semibold text-gold-700 after:bg-current">{contact.emails.general}</a>.
        </p>
      </Section>
      <CTABand title="Not Sure Which Role Fits?" body="Tell us about your background and we will point you to the right opening." route="careers" />
    </>
  );
}
