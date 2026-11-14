import { UserRound } from "lucide-react";
import Image from "@/components/ui/Image";
import { team } from "@/content/team";

export function AboutLeadership() {
  const founder = team[0];
  return <div className="about-leadership">
    <div className="grid items-start gap-8 md:grid-cols-[12rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)]">
      {founder.image ? <div className="photo-portrait relative aspect-[3/4] w-full max-w-xs"><Image src={founder.image} alt={`Portrait of ${founder.name}`} fill quality={90} sizes="(min-width:1280px) 240px,(min-width:768px) 192px,320px" className="object-cover object-top" /></div> : null}
      <div><h3 className="text-h3">{founder.name}</h3><p className="mt-2 text-body font-medium text-gold-700">{founder.role}</p><p className="mt-1 text-body-sm text-ink-500">{founder.note}</p><div className="mt-6 space-y-4">{founder.bio.map(p => <p key={p.slice(0, 24)} className="text-body text-ink-700">{p}</p>)}</div></div>
    </div>
    <h3 id="meet-our-team" className="mt-12 text-h3">Meet Our Team</h3><div role="region" aria-labelledby="meet-our-team" tabIndex={0} className="mt-6 grid grid-flow-col auto-cols-[min(80vw,20rem)] gap-6 overflow-x-auto overscroll-x-contain snap-x snap-proximity pb-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700 lg:grid-flow-row lg:auto-cols-auto lg:grid-cols-3 lg:overflow-visible lg:pb-0">{team.slice(1).map(member => <div key={member.slug} className="min-w-0 snap-start">
      {member.image ? <div className="photo-portrait relative aspect-[3/4]"><Image src={member.image} alt={`Portrait of ${member.name}`} style={member.slug === "huey" ? { width: "145%", height: "145%", left: "-17%" } : undefined} fill quality={90} sizes="(min-width:1280px) 360px, (min-width:1024px) 30vw, (min-width:400px) 320px, 80vw" className="object-cover object-top" /></div> : <div className="photo-portrait grid aspect-[3/4] w-full place-items-center border border-cream-border bg-cream text-gold-700" aria-label={`Portrait pending for ${member.name}`}><UserRound aria-hidden className="size-16" /></div>}
      <div><h4 className="mt-4 text-h4">{member.name}</h4>{member.role ? <p className="mt-2 text-body-sm text-ink-700">{member.role}</p> : null}</div>
    </div>)}</div>
  </div>;
}
