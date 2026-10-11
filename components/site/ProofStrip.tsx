import { credentials, proofStripSlugs } from "@/content/credentials";
import { CredentialMark } from "./CredentialMark";

export function ProofStrip() {
  const marks = proofStripSlugs.map((s) => credentials.find((c) => c.slug === s)).filter(Boolean);
  if (!marks.length) return null;
  return (
    <section aria-labelledby="credentials-title" className="border-y-2 border-gold-500 bg-cream py-8 md:py-10">
      <div className="container-content @container">
        <h2 id="credentials-title" className="mb-4 text-h3 text-ink-950">Certifications and Contract Vehicles</h2>
        <ul className="grid grid-cols-2 gap-3 @[40rem]:grid-cols-4 @[40rem]:gap-4">
          {marks.map((c) => (
            <li key={c!.slug} className="flex">
              <CredentialMark credential={c!} size="md" fill />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
