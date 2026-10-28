"use client";

import { useState } from "react";
import Link from "next/link";
import { Activity, MonitorCog, Boxes, ClipboardList, ArrowRight, Network } from "lucide-react";

const areas = [
  { name: "Healthcare", icon: Activity, slug: "healthcare-operations", role: "People ready to deliver care", description: "Clinical services, credentialing and case management bring the right professionals and coordination into the care setting.", outcome: "Access to care", anchor: "access", connection: "Supported by reliable systems, available supplies and coordinated administration." },
  { name: "IT", icon: MonitorCog, slug: "health-it", role: "Systems that support the people", description: "Systems integration, service desk support and cybersecurity help keep the technology behind healthcare operations reliable.", outcome: "Healthcare operations", anchor: "operations", connection: "Connects clinical work with the tools and information teams need." },
  { name: "Logistics", icon: Boxes, slug: "logistics", role: "Resources in the right place", description: "Supply chain, inventory, transportation and facilities management support the places where care is delivered.", outcome: "Mission readiness", anchor: "readiness", connection: "Keeps facilities and resources aligned with clinical and operational needs." },
  { name: "Facilities", icon: ClipboardList, slug: "facilities-management", role: "Places ready for the mission", description: "Facilities operations, maintenance coordination and clear follow-through support the places your teams rely on.", outcome: "Patient and veteran experience", anchor: "experience", connection: "Brings planning and administrative support alongside healthcare, technology and logistics." },
];

export function OperationsExplorer() {
  const [selected, setSelected] = useState(0);
  const area = areas[selected];
  return (
    <div className="operations-explorer mt-8 overflow-hidden border border-ink-200">
      <div className="p-5 md:p-8">
        <p className="text-eyebrow text-gold-700">Explore the connection</p>
        <h3 className="mt-3 text-h3 text-ink-950">Four areas. One coordinated mission.</h3>
        <p className="mt-2 text-body-sm text-ink-700">Choose an area to see what it contributes and how it connects.</p>
        <div role="group" aria-label="Explore service areas" className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {areas.map((item, index) => {
            const Icon = item.icon;
            return <button key={item.slug} type="button" aria-pressed={selected === index} aria-controls="operations-detail" onClick={() => setSelected(index)} className="operations-choice flex min-h-28 flex-col items-start justify-between gap-4 border p-4 text-left font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700">
              <Icon aria-hidden className="size-6" />
              <span className="text-body-sm">{item.name}</span>
            </button>;
          })}
        </div>
        <div className="operations-bridge flex items-center gap-4 pt-6" aria-hidden="true">
          <span className="h-px flex-1 bg-ink-300" />
          <span className="flex items-center gap-2 text-body-sm font-semibold text-ink-700"><Network className="size-5" />One accountable partner</span>
          <span className="h-px flex-1 bg-ink-300" />
        </div>
      </div>
      <div id="operations-detail" role="region" aria-label="Selected service contribution" aria-live="polite" aria-atomic="true" className="bg-ink-950 p-5 text-cream md:p-8">
        <div key={area.slug} className="operations-detail-content grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-eyebrow text-gold-500">{area.name}</p>
            <h4 className="mt-3 text-h3 text-cream">{area.role}</h4>
            <p className="mt-3 text-body-sm text-ink-200">{area.description}</p>
            <Link href={`/services/${area.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-body-sm font-semibold text-gold-500 underline decoration-transparent underline-offset-4 hover:decoration-current focus-visible:decoration-current">Explore {area.name}<ArrowRight aria-hidden className="size-4" /></Link>
          </div>
          <div className="border-t border-ink-700 pt-5 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
            <p className="text-eyebrow text-gold-500">Working together</p>
            <p className="mt-3 text-body-sm text-ink-200">{area.connection}</p>
            <p className="mt-5 text-body-sm text-ink-200">Supports</p>
            <Link href={`#${area.anchor}`} className="mt-1 inline-flex min-h-11 items-center gap-2 text-body-sm font-semibold text-cream underline underline-offset-4">{area.outcome}<ArrowRight aria-hidden className="size-4 shrink-0" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
