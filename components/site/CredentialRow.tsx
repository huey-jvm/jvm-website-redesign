import { TitleFigures } from "@/components/ui/TitleFigures";
import type { Credential } from "@/content/credentials";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { ExternalLink } from "@/components/ui/ExternalLink";
import Link from "next/link";
import { showPlaceholders } from "@/lib/placeholders";
import { Placeholder } from "@/components/ui/Placeholder";

export function CredentialRow({ credential }: { credential: Credential }) {
  const evidence = credential.evidenceHref;
  if (!evidence && !showPlaceholders) return null;
  return (
    <li className="credential-detail flex min-w-0 flex-col rounded-container border border-ink-200 border-t-[3px] border-t-gold-500 bg-white p-5 md:p-8">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-control bg-gold-200/30 text-gold-700"><BadgeCheck aria-hidden className="size-6" /></span>
        <span className="text-eyebrow font-semibold uppercase tracking-widest text-gold-700">{credential.slug === "stars-iii" ? "Contract vehicle" : "Small business certification"}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-h4 text-ink-950"><TitleFigures>{credential.name}</TitleFigures></h2>
        <p className="mt-3 text-body text-ink-700">{credential.meaning}</p>
        <dl className="mt-6 space-y-3 text-body-sm">
          <div><dt className="text-caption text-ink-500">Issued by</dt><dd className="mt-1 text-ink-900">{credential.issuer ?? <Placeholder id="P15" inline />}</dd></div>
          {credential.period ? (<div><dt className="text-caption text-ink-500">Period</dt><dd className="mt-1 text-ink-900">{credential.period}</dd></div>) : null}
        </dl>
      </div>
      <div className="mt-6 border-t border-ink-200 pt-3 text-body-sm font-semibold text-gold-700">
            {evidence ? (
              evidence.startsWith("http") ? <ExternalLink href={evidence} className="min-h-11">View supporting record<span className="sr-only"> for {credential.name}</span></ExternalLink> : <Link href={evidence} className="inline-flex min-h-11 items-center gap-3 hover:underline focus-visible:underline underline-offset-4">{credential.evidenceLabel ?? `About ${credential.name}`}<ArrowRight aria-hidden className="size-4 shrink-0" /></Link>
            ) : (
              credential.slug === "iso-9001" ? <Placeholder id="P15" inline /> : <span>Evidence required for publication</span>
            )}
      </div>
    </li>
  );
}
