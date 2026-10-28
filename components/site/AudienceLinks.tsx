import Link from "next/link";
import { contact } from "@/content/contact";
export function AudienceLinks() {
  const paths = [
    { title: "Talk About Your Mission", body: "Tell us about your operational needs and explore how JVM can help.", href: "/contact" },
    { title: "Become a Partner", body: "Connect with our business development team to discuss working together.", href: `mailto:${contact.emails.bd}?subject=Partnership%20enquiry` },
    { title: "Join Our Team", body: "Explore work where your experience supports people and the mission.", href: "/careers" },
  ];
  return <div><h2 className="text-h2-sm md:text-h2">Work With Us</h2><p className="mt-3 max-w-prose text-body text-ink-700">A mission to support, an opportunity to collaborate, or your next career step.</p><div className="mt-8 grid gap-5 md:grid-cols-3">{paths.map(item => <div key={item.title} className="flex flex-col rounded-container border border-cream-border bg-white p-6"><h3 className="text-h3">{item.title}</h3><p className="mt-3 text-body text-ink-700">{item.body}</p><Link href={item.href} className="mt-auto inline-flex min-h-11 items-center pt-5 font-semibold text-gold-700 underline underline-offset-4">{item.href.startsWith("mailto:") ? "Email Business Development" : item.title}</Link></div>)}</div></div>;
}
