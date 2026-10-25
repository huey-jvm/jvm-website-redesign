import { Mail, UserRound } from "lucide-react";
import Image from "@/components/ui/Image";

export function TeamContact({ name, role, note, image, email }: { name: string; role: string; note?: string; image?: string; email?: string }) {
  return <div className="team-contact flex items-start gap-4 rounded-container border border-ink-200 bg-white p-5 md:gap-5 md:p-6">
    {image ? <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-control"><Image src={image} alt={`Portrait of ${name}`} fill quality={90} sizes="80px" className="object-cover object-top" /></div> : <span className="grid size-12 shrink-0 place-items-center rounded-control bg-gold-200/25 text-gold-700"><UserRound aria-hidden className="size-6" /></span>}
    <div className="min-w-0"><h3 className="text-h4">{name}</h3><p className="mt-2 text-body-sm text-ink-700">{role}</p>{note ? <p className="mt-1 text-caption text-ink-500">{note}</p> : null}{email ? <a href={`mailto:${email}`} className="mt-3 inline-flex min-h-11 max-w-full items-center gap-2 text-body-sm font-semibold text-gold-700 hover:underline focus-visible:underline underline-offset-4"><Mail aria-hidden className="size-4 shrink-0" /><span className="min-w-0 break-words">{email}</span></a> : null}</div>
  </div>;
}
