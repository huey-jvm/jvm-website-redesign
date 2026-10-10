import type { ReactNode } from "react";

const pattern = /([\w.+-]+@[\w-]+\.[\w.-]+)|(\b1-800-\d{3}-\d{4}\b|\b\d{3}-\d{3}-\d{4}\b)/g;

/** Turns email addresses and phone numbers inside plain prose into mailto: and tel: links. */
export function linkify(text: string, className = "link-underline font-semibold text-gold-700 after:bg-current"): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(pattern)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(text.slice(last, idx));
    const token = m[0];
    if (m[1]) out.push(<a key={idx} href={`mailto:${token}`} className={className}>{token}</a>);
    else out.push(<a key={idx} href={`tel:+1${token.replace(/\D/g, "").replace(/^1/, "")}`} className={className}>{token}</a>);
    last = idx + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
