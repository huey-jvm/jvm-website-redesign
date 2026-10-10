import type { Credential } from "@/content/credentials";
import { CredentialMark } from "./CredentialMark";
import { ExternalLink } from "@/components/ui/ExternalLink";
import Link from "next/link";
import { Placeholder } from "@/components/ui/Placeholder";

export function CredentialRow({ credential }: { credential: Credential }) {
  const evidence = credential.evidenceHref;
  return (
    <li className="grid grid-cols-1 gap-4 border-b border-ink-200 py-6 last:border-b-0 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-6">
      <div><CredentialMark credential={credential} /></div>
      <div className="min-w-0">
        <h2 className="text-h4 text-ink-950">{credential.name}</h2>
        <p className="mt-1 text-body text-ink-700">{credential.meaning}</p>
        <dl className="mt-3 grid grid-cols-[7rem_minmax(0,1fr)] gap-x-4 gap-y-1 text-body-sm">
          <dt className="text-ink-500">Issued by</dt><dd className="text-ink-900">{credential.issuer}</dd>
          {credential.period ? (<><dt className="text-ink-500">Period</dt><dd className="text-ink-900">{credential.period}</dd></>) : null}
          <dt className="text-ink-500">Evidence</dt>
          <dd className="text-ink-900">
            {evidence ? (
              evidence.startsWith("http") ? <ExternalLink href={evidence} className="text-gold-700">View the record</ExternalLink> : <Link href={evidence} className="link-underline text-gold-700 after:bg-current">Learn more</Link>
            ) : (
              <Placeholder id="P15" inline>Certificate link pending</Placeholder>
            )}
          </dd>
        </dl>
      </div>
    </li>
  );
}
