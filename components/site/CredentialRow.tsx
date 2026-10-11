import { TitleFigures } from "@/components/ui/TitleFigures";
import type { Credential } from "@/content/credentials";
import { CredentialMark } from "./CredentialMark";
import { ExternalLink } from "@/components/ui/ExternalLink";
import Link from "next/link";
import { showPlaceholders } from "@/lib/placeholders";
import { Placeholder } from "@/components/ui/Placeholder";

export function CredentialRow({ credential }: { credential: Credential }) {
  const evidence = credential.evidenceHref;
  if (!evidence && !showPlaceholders) return null;
  return (
    <li className="@container grid grid-cols-1 gap-4 border-b border-ink-200 py-6 last:border-b-0 @[42rem]:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] @[42rem]:gap-6">
      <div className="w-40"><CredentialMark credential={credential} fill /></div>
      <div className="min-w-0">
        <h2 className="text-h4 text-ink-950"><TitleFigures>{credential.name}</TitleFigures></h2>
        <p className="mt-1 text-body text-ink-700">{credential.meaning}</p>
        <dl className="mt-3 grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-x-4 gap-y-1 text-body-sm">
          <dt className="text-ink-500">Issued by</dt><dd className="text-ink-900">{credential.issuer ?? <Placeholder id="P15" inline />}</dd>
          {credential.period ? (<><dt className="text-ink-500">Period</dt><dd className="text-ink-900">{credential.period}</dd></>) : null}
          <dt className="text-ink-500">Evidence</dt>
          <dd className="text-ink-900">
            {evidence ? (
              evidence.startsWith("http") ? <ExternalLink href={evidence} className="min-h-11 text-gold-700">View the record</ExternalLink> : <Link href={evidence} className="link-underline inline-flex min-h-11 items-center text-gold-700 after:bg-current">{credential.evidenceLabel ?? `About ${credential.name}`}</Link>
            ) : (
              credential.slug === "iso-9001" ? <Placeholder id="P15" inline /> : <span>Evidence required for publication</span>
            )}
          </dd>
        </dl>
      </div>
    </li>
  );
}
