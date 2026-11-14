import { purpose } from "@/content/purpose";

export function FounderQuote({ quote }: { quote: string }) {
  return <figure className="border-l-2 border-gold-500 pl-5 md:pl-8">
    <blockquote className="font-editorial max-w-[48ch] text-lead font-medium leading-relaxed text-ink-900 md:text-h2-sm">
      <p>“{quote}”</p>
    </blockquote>
    <figcaption className="mt-5 text-body-sm text-ink-700">
      <span className="font-semibold text-ink-950">{purpose.author}</span>
      <span className="mt-1 block">{purpose.role}</span>
    </figcaption>
  </figure>;
}
