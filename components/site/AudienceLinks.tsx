import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Handshake } from "lucide-react";
import { contact } from "@/content/contact";

export function AudienceLinks() {
  const partnerFields = ["First and last name", "Title", "Email", "Phone number", "Company name", "Capabilities", "NAICS codes", "Certifications", "Contract vehicles"];
  const partnerHref = `mailto:${contact.emails.general}?subject=${encodeURIComponent("Partner/vendor enquiry - Deja Dillon")}&body=${encodeURIComponent(partnerFields.map(field => `${field}: `).join("\n"))}`;
  return <>
    <svg className="partner-art" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        {[0, 60, 120, 180, 240].map(offset => <path key={offset} d={`M ${1000+offset} -100 C ${650+offset} 180, ${1600+offset} 280, ${1050+offset} 600 S ${650+offset} 1000, ${1000+offset} 1100`} />)}
        <path d="M-100 720C250 400 400 880 800 560S1300 300 1700 600" />
        <path d="M-100 755C250 435 400 915 800 595S1300 335 1700 635" />
      </g>
      <g fill="currentColor"><circle cx="800" cy="560" r="5"/><circle cx="1050" cy="600" r="5"/></g>
    </svg>
    <div className="partner-content">
      <div className="partner-heading"><h2>Partner With Us</h2><p>Bring your experience, capabilities and ideas to JVM. Find your place in the mission.</p></div>
      <div className="partner-paths">
        <section className="partner-path">
          <BriefcaseBusiness className="partner-icon" aria-hidden="true" strokeWidth={1.4}/>
          <h3>Join Our Team</h3>
          <p>Put your experience to work for people and the mission. Explore your next career step with JVM.</p>
          <Link href="/careers" className="partner-action">Join Our Team<ArrowUpRight aria-hidden="true" className="size-5"/></Link>
        </section>
        <section id="partners" className="partner-path scroll-mt-28">
          <Handshake className="partner-icon" aria-hidden="true" strokeWidth={1.4}/>
          <h3>Become a Partner</h3>
          <p>Bring your company’s capabilities to the conversation. Deja Dillon is your contact for partner and vendor enquiries.</p>
          <a href={partnerHref} className="partner-action">Email Deja about a partnership<ArrowUpRight aria-hidden="true" className="size-5"/></a>
        </section>
      </div>
      <aside className="partner-checklist" aria-labelledby="partner-checklist-title">
        <div><h3 id="partner-checklist-title">Start the conversation</h3><p>Partner enquiries: please include these details in your email.</p></div>
        <ul>{partnerFields.map(field => <li key={field}>{field}</li>)}</ul>
      </aside>
    </div>
  </>;
}
