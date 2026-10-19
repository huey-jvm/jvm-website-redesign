import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";
import Image from "@/components/ui/Image";
import { ArrowRight } from "lucide-react";
import { leadEyebrow } from "@/content/services";
import type { Service } from "@/content/services";
import { cn } from "@/lib/cn";
import { Slot } from "./Slot";

type Layout = "stack" | "horizontal" | "row" | "feature" | "cinema";

export function ServiceCard({ service, image, slot, className, horizontal = false, layout, headingLevel: Tag = "h3" }: { service: Service; image?: string; slot?: string; className?: string; horizontal?: boolean; layout?: Layout; headingLevel?: "h2" | "h3" }) {
  if (layout === "cinema") {
    return (
      <Link
        href={`/services/${service.slug}`}
        className={cn(
          "group/card @container surface-dark relative isolate block h-full overflow-hidden rounded-container border border-ink-800 bg-ink-900",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
          className?.includes("aspect") ? "aspect-[4/3]" : "aspect-[4/3] lg:aspect-auto",
          className,
        )}
      >
        {image ? (
          <Image src={image} alt="" fill sizes={service.lead ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"} className="-z-20 object-cover" />
        ) : slot ? (
          <div aria-hidden className="absolute inset-0 -z-20"><Slot id={slot} className="size-full" sizes="(min-width: 1024px) 50vw, 100vw" /></div>
        ) : null}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/10" />
        <div className="flex h-full flex-col justify-end p-5 @[28rem]:p-8">
          <Eyebrow tone="dark">{service.lead ? leadEyebrow : "Service"}</Eyebrow>
          <Tag title={service.name} className={cn("mt-2 text-cream transition-colors duration-150 ease-hover group-hover/card:text-gold-500 group-focus-visible/card:text-gold-500 group-focus-visible/card:transition-none", service.lead ? "text-h3 @[28rem]:text-h1" : "text-h4 @[20rem]:text-h3")}>{service.name}</Tag>
          <p className={cn("mt-2 max-w-[48ch] text-body-sm text-ink-200", service.lead ? "@[28rem]:text-body" : "line-clamp-2")}>{service.teaser}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-body-sm font-semibold text-cream">
            Explore {service.short}
            <ArrowRight aria-hidden className="size-4 transition-transform duration-150 ease-hover group-hover/card:translate-x-1 group-focus-visible/card:translate-x-1 group-focus-visible/card:transition-none motion-reduce:group-hover/card:translate-x-0 motion-reduce:group-focus-visible/card:translate-x-0" />
          </span>
        </div>
      </Link>
    );
  }
  const mode: Layout = layout ?? (horizontal ? "horizontal" : "stack");
  const frame = cn(
    "card-media relative w-full overflow-hidden bg-ink-100",
    mode === "horizontal" && "aspect-[3/2] @[35rem]:aspect-auto @[35rem]:w-5/12 @[35rem]:shrink-0",
    mode === "row" && "aspect-[3/2] @[22rem]:aspect-auto @[22rem]:w-1/3 @[22rem]:shrink-0",
    mode === "feature" && "aspect-[3/2] lg:aspect-auto lg:min-h-64 lg:flex-1",
    mode === "stack" && "aspect-[3/2]",
  );
  const sizes = mode === "feature" ? "(min-width: 1024px) 50vw, 100vw" : mode === "row" ? "(min-width: 1024px) 17vw, 40vw" : service.lead ? "(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 20vw, (min-width: 768px) 50vw, 100vw";
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group/card @container block h-full overflow-hidden rounded-container border border-ink-200 bg-white",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700",
        className,
      )}
    >
      <div className={cn("flex h-full", mode === "horizontal" ? "flex-col @[35rem]:flex-row" : mode === "row" ? "flex-col @[22rem]:flex-row" : "flex-col")}>
      {image ? (
        <div className={frame}>
          <Image src={image} alt="" fill sizes={sizes} className="object-cover" />
        </div>
      ) : slot ? (
        <Slot id={slot} className={frame} sizes={sizes} />
      ) : null}
      <div className={cn("flex min-w-0 flex-col p-4 @[20rem]:p-6", mode === "feature" ? "@[35rem]:p-8" : mode === "row" ? "flex-1 @[28rem]:px-6 @[28rem]:py-5" : "flex-1 @[35rem]:p-8")}>
        <Eyebrow tone="light">{service.lead ? leadEyebrow : "Service"}</Eyebrow>
        <Tag title={service.name} className={cn("mt-2 text-h4 text-ink-950 transition-colors duration-150 ease-hover group-hover/card:text-gold-700 group-focus-visible/card:text-gold-700 group-focus-visible/card:transition-none", mode === "row" ? "@[28rem]:text-h3" : "@[20rem]:text-h3 @[35rem]:text-h2-sm")}>{service.name}</Tag>
        <p className="mt-2 text-body-sm text-ink-700 @[20rem]:text-body">{service.teaser}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-body-sm font-semibold text-ink-900">
          Explore {service.short}
          <ArrowRight aria-hidden className="size-4 transition-transform duration-150 ease-hover group-hover/card:translate-x-1 group-focus-visible/card:translate-x-1 group-focus-visible/card:transition-none motion-reduce:group-hover/card:translate-x-0 motion-reduce:group-focus-visible/card:translate-x-0" />
        </span>
      </div>
      </div>
    </Link>
  );
}
