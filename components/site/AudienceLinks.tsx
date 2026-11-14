import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Handshake } from "lucide-react";
import { contact } from "@/content/contact";

export function AudienceLinks() {
  const partnerFields = ["First and last name", "Title", "Email", "Phone number", "Company name", "Capabilities", "NAICS codes", "Certifications", "Contract vehicles"];
  const partnerHref = `mailto:${contact.emails.general}?subject=${encodeURIComponent("Partner/vendor enquiry - Deja Dillon")}&body=${encodeURIComponent(partnerFields.map(field => `${field}: `).join("\n"))}`;
  return <>
    <div className="partner-content">
      <div className="partner-heading"><h2>Partner With Us</h2><p>Bring your experience, capabilities and ideas to JVM. Find your place in the mission.</p></div>
      <div className="partner-paths">
        <section className="partner-path">
          <BriefcaseBusiness className="partner-icon" aria-hidden="true"/>
          <h3>Join Our Team</h3>
          <p>Put your experience to work for people and the mission. Explore your next career step with JVM.</p>
          <Link href="/careers" className="partner-action">Explore careers<ArrowUpRight aria-hidden="true" className="size-5"/></Link>
        </section>
        <section id="partners" className="partner-path scroll-mt-28">
          <Handshake className="partner-icon" aria-hidden="true"/>
          <h3>Become a Partner</h3>
          <p>Bring your company’s capabilities to the conversation. Deja Dillon is your contact for partner and vendor enquiries.</p>
          <a href={partnerHref} className="partner-action">Email Deja about a partnership<ArrowUpRight aria-hidden="true" className="size-5"/></a>
        </section>
      </div>
      <aside className="partner-checklist" aria-labelledby="partner-checklist-title">
        <div><h3 id="partner-checklist-title">Start the conversation</h3><p>For partner enquiries, send us an email with these details:</p></div>
        <ul>{partnerFields.map(field => <li key={field}>{field}</li>)}</ul>
      </aside>
    </div>
  </>;
}
