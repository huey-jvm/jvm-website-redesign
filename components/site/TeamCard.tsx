import { showPlaceholders } from "@/lib/placeholders";
import Image from "@/components/ui/Image";

export function TeamCard({ name, role, note, image, email }: { name: string; role: string; note?: string; image?: string; email?: string }) {
  return (
    <div className="@container flex flex-col overflow-hidden border-t-2 border-gold-500 bg-ink-50">
      {image || showPlaceholders ? <div className="relative aspect-square w-full bg-ink-100">
        {image ? (
          <Image src={image} alt={`Portrait of ${name}`} fill quality={90} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
        ) : (
          <div className="flex h-full items-center justify-center p-4">
            <p role="note" className="text-body-sm text-ink-700">Portrait of {name} needed from JVM. Register entry required.</p>
          </div>
        )}
      </div> : null}
      <div className="p-4 @[20rem]:p-6 @[35rem]:p-8">
        <h3 title={name} className="text-h4 text-ink-950">{name}</h3>
        <p className="mt-1 text-body-sm text-ink-700">{role}</p>
        {note ? <p className="mt-1 text-body-sm text-ink-500">{note}</p> : null}
        {email ? <a href={`mailto:${email}`} className="link-underline mt-1 inline-flex min-h-11 items-center text-body-sm font-semibold text-gold-700 after:bg-current">{email}</a> : null}
      </div>
    </div>
  );
}
