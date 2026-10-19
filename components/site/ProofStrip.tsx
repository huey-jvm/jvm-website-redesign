import { credentials, proofStripSlugs } from "@/content/credentials";
import { CredentialMark } from "./CredentialMark";

export function ProofStrip() {
  const marks = proofStripSlugs.map((s) => credentials.find((c) => c.slug === s)).filter(Boolean);
  if (!marks.length) return null;
  return (
    <section aria-labelledby="credentials-title" className="surface-dark bg-ink-950 pb-10 md:pb-12">
      <div className="container-content @container">
        <div className="grid grid-cols-1 items-center gap-4 border-t border-gold-500 pt-6 @[56rem]:grid-cols-12 @[56rem]:gap-8">
          <h2 id="credentials-title" className="font-sans text-eyebrow font-semibold uppercase text-gold-500 @[56rem]:col-span-3">Certifications and Contract Vehicles</h2>
          <ul className="grid grid-cols-2 gap-3 @[40rem]:grid-cols-4 @[40rem]:gap-4 @[56rem]:col-span-9">
            {marks.map((c) => (
              <li key={c!.slug} className="flex">
                <CredentialMark credential={c!} size="md" fill />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
