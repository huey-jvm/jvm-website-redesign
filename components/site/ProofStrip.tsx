import { credentials, proofStripSlugs } from "@/content/credentials";
import { CredentialMark } from "./CredentialMark";

export function ProofStrip({ embedded = false }: { embedded?: boolean }) {
  const marks = proofStripSlugs.map((s) => credentials.find((c) => c.slug === s)).filter(Boolean);
  const Tag = embedded ? "div" : "section";
  return (
    <Tag aria-labelledby="credentials-title" className={embedded ? "hero-credentials border-t border-gold-500 bg-ink-950 py-6" : "border-y-2 border-gold-500 bg-cream py-8 md:py-10"}>
      <div className={embedded ? undefined : "container-content"}>
        <div className="mb-4">
          <h2 id="credentials-title" className={embedded ? "text-h4 text-cream" : "text-h3 text-ink-950"}>Certifications and Contract Vehicles</h2>
        </div>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {marks.map((c) => (
            <li key={c!.slug} className="flex">
              <CredentialMark credential={c!} size={embedded ? "sm" : "md"} fill />
            </li>
          ))}
        </ul>
      </div>
    </Tag>
  );
}
