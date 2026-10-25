import { values } from "@/content/values";

export function AboutValues() {
  return <div className="about-values">
    <div className="grid gap-8 lg:grid-cols-[12rem_minmax(0,1fr)]">
      <div><h3 className="text-h2 text-gold-700">{values.rita.name}</h3><p className="mt-3 text-body-sm text-ink-700">{values.rita.description}</p></div>
      <ul className="grid gap-x-8 sm:grid-cols-2">
        {values.rita.items.map(value => <li key={value.title} className="flex items-start gap-4 border-t border-ink-200 py-6">
          <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-pill border border-gold-500/50 bg-gold-200/20 text-h4 font-medium text-gold-700">{value.title[0]}</span>
          <div><h4 className="text-h4">{value.title}</h4><p className="mt-2 text-body-sm text-ink-700">{value.line}</p></div>
        </li>)}
      </ul>
    </div>
    <div className="mt-10 rounded-container bg-ink-950 p-6 text-cream md:p-8">
      <div className="grid gap-4 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-8">
        <h3 className="text-h2 text-gold-500">{values.roar.name}</h3><p className="self-center text-body text-ink-200">{values.roar.description}</p>
      </div>
      <dl className="mt-8 grid gap-x-8 sm:grid-cols-2">
        {values.roar.items.map(value => <div key={value.title} className="border-t border-ink-700 py-5"><dt className="flex items-baseline gap-3 text-h4 text-cream"><span aria-hidden className="text-body-sm font-medium text-gold-500">{value.title[0]}</span>{value.title}</dt><dd className="mt-2 text-body-sm text-ink-200">{value.line}</dd></div>)}
      </dl>
    </div>
  </div>;
}
