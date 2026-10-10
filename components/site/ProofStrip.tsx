import { credentials, proofStripSlugs } from "@/content/credentials";
import { CredentialMark } from "./CredentialMark";

export function ProofStrip() {
  const marks = proofStripSlugs.map((s) => credentials.find((c) => c.slug === s)).filter(Boolean);
  return (
    <section aria-labelledby="credentials-title" className="border-y-2 border-gold-500 bg-cream py-8 md:py-10">
      <div className="container-content">
        <div className="mb-6 text-center md:mb-8">
          <p className="text-eyebrow font-semibold uppercase text-gold-700">Credentials</p>
          <h2 id="credentials-title" className="mt-2 text-h3 text-ink-950">Certifications and Contract Vehicles</h2>
        </div>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {marks.map((c) => (
            <li key={c!.slug} className="flex">
              <CredentialMark credential={c!} fill />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
