import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { cn } from "@/lib/cn";
import { Slot } from "./Slot";

export function ServiceCard({ service, image, slot, className, horizontal = false, headingLevel: Tag = "h3" }: { service: Service; image?: string; slot?: string; className?: string; horizontal?: boolean; headingLevel?: "h2" | "h3" }) {
  const frame = cn("relative w-full overflow-hidden bg-ink-100", horizontal ? "aspect-[3/2] md:aspect-auto md:w-5/12 md:shrink-0" : "aspect-[3/2]");
  const sizes = horizontal ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 1024px) 33vw, 100vw";
  const zoom = "object-cover transition-transform duration-200 ease-move group-hover/card:scale-[1.03] motion-reduce:group-hover/card:scale-100";
  return (
    <Link
      href={`/services/${service.slug}`}
      aria-label={service.name}
      className={cn(
        "group/card @container flex h-full overflow-hidden rounded-container border border-ink-200 bg-white transition-transform duration-150 ease-move hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
        horizontal ? "flex-col md:flex-row" : "flex-col",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700",
        className,
      )}
    >
      {image ? (
        <div className={frame}>
          <Image src={image} alt="" fill sizes={sizes} className={zoom} />
        </div>
      ) : slot ? (
        <Slot id={slot} className={frame} sizes={sizes} imgClassName={zoom} />
      ) : null}
      <div className="flex flex-1 flex-col p-4 @[20rem]:p-6 @[35rem]:p-8">
        <p className="text-eyebrow font-semibold uppercase text-gold-700">{service.lead ? "Our core" : "Service"}</p>
        <Tag className={cn("mt-2 text-h4 text-ink-950 group-hover/card:text-gold-700 @[20rem]:text-h3 @[35rem]:text-h2-sm", horizontal ? "" : "line-clamp-2 min-h-[2.6em]")} title={service.name}>{service.name}</Tag>
        <p className={cn("mt-2 text-body-sm text-ink-700 @[20rem]:text-body", horizontal ? "line-clamp-3" : "line-clamp-2")}>{service.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-body-sm font-semibold text-ink-900">
          Explore {service.short}
          <ArrowRight aria-hidden className="size-4 transition-transform duration-150 ease group-hover/card:translate-x-1 motion-reduce:group-hover/card:translate-x-0" />
        </span>
      </div>
    </Link>
  );
}
