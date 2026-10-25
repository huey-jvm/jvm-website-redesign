import { Cpu } from "lucide-react";
import Image from "@/components/ui/Image";
import { team } from "@/content/team";

export function AboutLeadership() {
  const founder = team[0];
  return <div className="about-leadership">
    <div className="grid items-start gap-8 md:grid-cols-[12rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)]">
      {founder.image ? <div className="relative aspect-[3/4] w-full max-w-xs overflow-hidden border-b-[3px] border-gold-500"><Image src={founder.image} alt={`Portrait of ${founder.name}`} fill quality={90} sizes="(min-width:1280px) 240px,(min-width:768px) 192px,320px" className="object-cover object-top" /></div> : null}
      <div><h3 className="text-h3">{founder.name}</h3><p className="mt-2 text-body font-medium text-gold-700">{founder.role}</p><p className="mt-1 text-body-sm text-ink-500">{founder.note}</p><div className="mt-6 space-y-4">{founder.bio.map(p => <p key={p.slice(0, 24)} className="text-body text-ink-700">{p}</p>)}</div></div>
    </div>
    {team.slice(1).map(member => <div key={member.slug} className="mt-10 flex items-start gap-4 border-y border-ink-200 py-6 md:gap-6">
      {member.image ? <div className="relative h-24 w-[4.5rem] shrink-0 overflow-hidden rounded-control"><Image src={member.image} alt={`Portrait of ${member.name}`} fill quality={90} sizes="72px" className="object-cover object-top" /></div> : <span className="grid size-12 shrink-0 place-items-center rounded-control bg-gold-200/25 text-gold-700"><Cpu aria-hidden className="size-6" /></span>}
      <div><h3 className="text-h4">{member.name}</h3><p className="mt-2 text-body-sm text-ink-700">{member.role}</p></div>
    </div>)}
  </div>;
}
