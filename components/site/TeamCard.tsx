import Image from "next/image";
import { Placeholder } from "@/components/ui/Placeholder";

export function TeamCard({ name, role, note, image, email }: { name: string; role: string; note?: string; image?: string; email?: string }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-container border border-ink-200 bg-white">
      <div className="relative aspect-square w-full bg-ink-100">
        {image ? (
          <Image src={image} alt={`Portrait of ${name}`} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
        ) : (
          <div className="flex h-full items-center justify-center p-4">
            <Placeholder id="P16" what={`Portrait of ${name}`} who="JVM supplies" className="w-full" />
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="truncate text-h4 text-ink-950" title={name}>{name}</h3>
        <p className="mt-1 text-body-sm text-ink-700">{role}</p>
        {note ? <p className="mt-1 text-body-sm text-ink-500">{note}</p> : null}
        {email ? <a href={`mailto:${email}`} className="link-underline mt-3 inline-block text-body-sm font-semibold text-gold-700 after:bg-current">{email}</a> : null}
      </div>
    </div>
  );
}
