import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";
import Image from "@/components/ui/Image";
import { ArrowRight } from "lucide-react";
import { leadEyebrow } from "@/content/services";
import type { Service } from "@/content/services";
import { cn } from "@/lib/cn";
import { Slot } from "./Slot";

export function ServiceCard({ service, image, slot, className, horizontal = false, headingLevel: Tag = "h3" }: { service: Service; image?: string; slot?: string; className?: string; horizontal?: boolean; headingLevel?: "h2" | "h3" }) {
  const frame = cn("relative w-full overflow-hidden bg-ink-100", horizontal ? "aspect-[3/2] @[35rem]:aspect-auto @[35rem]:w-5/12 @[35rem]:shrink-0" : "aspect-[3/2]");
  const sizes = service.lead ? "(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 20vw, (min-width: 768px) 50vw, 100vw";
  return (
    <Link
      href={`/services/${service.slug}`}
      aria-label={service.name}
      className={cn(
        "group/card @container flex h-full overflow-hidden rounded-container border border-ink-200 bg-white",
        horizontal ? "flex-col @[35rem]:flex-row" : "flex-col",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700",
        className,
      )}
    >
      {image ? (
        <div className={frame}>
          <Image src={image} alt="" fill sizes={sizes} className="object-cover" />
        </div>
      ) : slot ? (
        <Slot id={slot} className={frame} sizes={sizes} />
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col p-4 @[20rem]:p-6 @[35rem]:p-8">
        <Eyebrow tone="light">{service.lead ? leadEyebrow : "Service"}</Eyebrow>
        <Tag title={service.name} className="mt-2 truncate text-h4 text-ink-950 group-hover/card:text-gold-700 group-focus-visible/card:text-gold-700 @[20rem]:text-h3 @[35rem]:text-h2-sm">{service.name}</Tag>
        <p className="mt-2 line-clamp-2 text-body-sm text-ink-700 @[20rem]:text-body">{service.teaser}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-body-sm font-semibold text-ink-900">
          Explore {service.short}
          <ArrowRight aria-hidden className="size-4 transition-transform duration-150 ease-hover group-hover/card:translate-x-1 group-focus-visible/card:translate-x-1 group-focus-visible/card:transition-none motion-reduce:group-hover/card:translate-x-0 motion-reduce:group-focus-visible/card:translate-x-0" />
        </span>
      </div>
    </Link>
  );
}
