import Image from "@/components/ui/Image";
import { ArrowUpRight } from "lucide-react";
import { withBasePath } from "@/lib/base-path";

const photos = [
  { src: "clinical-team", title: "Alongside healthcare professionals", alt: "Four people together in a clinical workplace, including three wearing scrubs" },
  { src: "workplace-team", title: "Connecting in the workplace", alt: "A group of five people together in a rehabilitation and exercise space" },
  { src: "conference-booth", title: "Representing JVM", alt: "JVM representatives at a branded conference booth" },
];

export function TeamGallery() {
  return (
    <div>
      <p className="text-eyebrow text-gold-700">People / Places / Connections</p>
      <h2 className="mt-3 text-h2-sm md:text-h2">A Closer Look at JVM</h2>
      <p className="mt-4 max-w-[65ch] text-body text-ink-700">A few moments from our team’s workplaces and professional events.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {photos.map((photo, index) => (
          <figure key={photo.src} className="border-b border-ink-200 pb-5">
            <a href={withBasePath(`/images/keith/${photo.src}.webp`)} target="_blank" rel="noopener noreferrer" className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
                <Image src={`/images/keith/${photo.src}.webp`} alt={photo.alt} fill style={{ objectPosition: photo.src === "clinical-team" ? "center top" : "center" }} sizes="(min-width: 768px) 30vw, 100vw" className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03] group-focus-visible:scale-[1.03] motion-reduce:transform-none" />
              </div>
              <span className="sr-only">View full photograph (opens in a new tab)</span>
            </a>
            <figcaption className="mt-4 flex items-start gap-3">
              <span aria-hidden className="text-caption text-gold-700">0{index + 1}</span>
              <p className="flex-1 text-body-sm font-semibold text-ink-900">{photo.title}</p>
              <ArrowUpRight aria-hidden className="size-4 shrink-0 text-gold-700" />
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
