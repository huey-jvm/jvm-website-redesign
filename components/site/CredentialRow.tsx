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
  const vehicle = credential.slug === "stars-iii";
  return (
    <li className={`credential-detail${vehicle ? " credential-detail--vehicle surface-dark" : ""}`}>
      <BadgeCheck aria-hidden className="credential-watermark" strokeWidth={0.65} />
      <div className="credential-heading flex items-center gap-3">
        <span className="credential-seal grid size-11 shrink-0 place-items-center"><BadgeCheck aria-hidden className="size-6" strokeWidth={1.5} /></span>
        <span className="credential-category text-eyebrow font-semibold uppercase tracking-widest">{vehicle ? "Contract vehicle" : "Small business certification"}</span>
      </div>
      <div className="credential-copy min-w-0 flex-1">
        <h2><TitleFigures>{credential.name}</TitleFigures></h2>
        <p className="credential-description mt-3 text-body">{credential.meaning}</p>
        <dl className="credential-facts mt-6 space-y-3 text-body-sm">
          <div><dt className="text-caption">Issued by</dt><dd className="mt-1">{credential.issuer ?? <Placeholder id="P15" inline />}</dd></div>
          {credential.period ? (<div><dt className="text-caption">Period</dt><dd className="mt-1">{credential.period}</dd></div>) : null}
        </dl>
      </div>
      <div className="credential-action text-body-sm font-semibold">
            {evidence ? (
              evidence.startsWith("http") ? <ExternalLink href={evidence} className="min-h-11">View supporting record<span className="sr-only"> for {credential.name}</span></ExternalLink> : <Link href={evidence} className="inline-flex min-h-11 items-center gap-3 hover:underline focus-visible:underline underline-offset-4">{credential.evidenceLabel ?? `About ${credential.name}`}<ArrowRight aria-hidden className="size-4 shrink-0" /></Link>
            ) : (
              credential.slug === "iso-9001" ? <Placeholder id="P15" inline /> : <span>Evidence required for publication</span>
            )}
      </div>
    </li>
  );
}
