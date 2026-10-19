import Link from "next/link";
import Image from "@/components/ui/Image";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { Slot } from "./Slot";
export function ServiceDirectory() {
  return <ol className="service-directory">
    {services.map((service, index) => <li key={service.slug}>
      <Link href={`/services/${service.slug}`} className="service-entry group">
        <span className="service-number tabular" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
        <div className="service-entry-image relative aspect-[3/2] overflow-hidden bg-ink-100">
          {service.cardPhoto ? <Image src={service.cardPhoto} alt="" fill sizes="(min-width: 1024px) 260px, 100vw" className="object-cover" /> : service.cardImage ? <Slot id={service.cardImage} className="h-full w-full" sizes="(min-width: 1024px) 260px, 100vw" /> : null}
        </div>
        <div className="service-entry-copy">
          <p className="mb-3 text-eyebrow font-semibold uppercase tracking-widest text-gold-700">{service.lead ? "Our core capability" : "Integrated expertise"}</p>
          <h2 className="text-h3 md:text-h2-sm">{service.name}</h2>
          <p className="mt-3 max-w-[54ch] text-body text-ink-700">{service.teaser}</p>
          <span className="mt-5 inline-flex items-center gap-3 text-body-sm font-semibold">Explore {service.short}<ArrowUpRight aria-hidden className="size-4" /></span>
        </div>
        <ArrowUpRight aria-hidden className="service-entry-arrow size-7" />
      </Link>
    </li>)}
  </ol>;
}
