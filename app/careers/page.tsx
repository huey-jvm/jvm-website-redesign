import { teamPhoto } from "@/content/team";
import { statements } from "@/content/statements";
import { ImageHero } from "@/components/site/ImageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { CredentialMark } from "@/components/site/CredentialMark";
import { CTABand } from "@/components/site/CTABand";
import { Button } from "@/components/ui/Button";
import { credentials } from "@/content/credentials";
import { contact } from "@/content/contact";
import { pageMetadata } from "@/lib/seo";
import { Slot } from "@/components/site/Slot";

export const metadata = pageMetadata("Careers", "Join a veteran-led healthcare operations company. We hire veterans, healthcare professionals and experienced professionals who want their work to matter.", "/careers");

const audiences = [
  { title: "Veterans", image: "AS-15a", body: "JVM appreciates the personal sacrifices of our veterans in serving our country. We recognise and value the leadership, character and discipline you bring, and we help you find where the skills you have acquired fit best in a civilian career." },
  { title: "Healthcare Professionals", image: "AS-15b", body: "We are committed to giving our clients more, with the most qualified and compassionate professionals in the industry. Your work is not just a job, it is a calling, and you deserve to get the most out of your profession. Our healthcare roles cover a wide array of specialty areas." },
  { title: "Experienced Professionals", image: "AS-15c", body: "Our success is a direct result of our people. We have the right people in the right places making the right decisions for our clients. Join us to share your expertise in solving our commercial and government clients' hardest operational problems." },
];

export default function CareersPage() {
  const whv = credentials.find((c) => c.slug === "we-hire-vets")!;
  return (
    <>
      <ImageHero
        eyebrow="Careers"
        title="Work That Matters to the People It Serves"
        lead="JVM is an equal opportunity employer. If your work is a calling, you will find people here who feel the same."
        crumbs={[{ label: "Careers" }]}
        image={teamPhoto}
      />

      <Section>

        <ul>
          {audiences.map((a) => (
            <li key={a.title} className="career-audience">
              <Slot id={a.image} className="aspect-[3/2] w-full rounded-container" sizes="(min-width: 1024px) 33vw, 100vw" />
              <div>
                <h2 title={a.title} className="text-h2-sm md:text-h2">{a.title}</h2>
                <p className="mt-3 text-body text-ink-700">{a.body}</p>
              </div>
            </li>
          ))}
        </ul>

      </Section>

      <Section surface="cream">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          {whv.evidenceHref ? <CredentialMark credential={whv} /> : null}
          <div>
            <h2 className="text-h3">We Hire Veterans</h2>
            <p className="mt-2 max-w-[65ch] text-body text-ink-700">{whv.evidenceHref ? `Recognised by the ${whv.issuer} in ${whv.period}. ` : ""}Veteran status is a strength here, not a line on a form.</p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeader align="center" eyebrow="Open roles" title="View Current Openings" lead="Applications are handled on our careers portal, hosted by iSolved." />
          <Button href={contact.careersPortal} external variant="primary">View open roles on iSolved</Button>
          <p className="mt-3 text-body-sm text-ink-500">Opens the JVM careers portal in a new tab.</p>
          <p className="mt-2 text-body text-ink-700">Openings are posted on our careers portal as they arise.</p>
        </div>
      </Section>

      <Section surface="ink50">
        <p className="prose-measure text-body-sm text-ink-700">
          {`${statements.companyName} is an Equal Opportunity Employer. All qualified applicants receive consideration for employment without regard to race, colour, religion, sex, sexual orientation, gender identity, national origin, disability or protected veteran status. Questions about a role or the application process can be sent to `}
          <a href={`mailto:${contact.emails.general}`} className="link-underline font-semibold text-gold-700 after:bg-current">{contact.emails.general}</a>.
        </p>
      </Section>
      <CTABand title="Not Sure Which Role Fits?" body="Tell us about your background and we will point you to the right opening." route="careers" />
    </>
  );
}
