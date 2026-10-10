import { credentials, proofStripSlugs } from "@/content/credentials";
import { CredentialMark } from "./CredentialMark";

export function ProofStrip() {
  const marks = proofStripSlugs.map((s) => credentials.find((c) => c.slug === s)).filter(Boolean);
  return (
    <section aria-label="Certifications and contract vehicles" className="border-y-2 border-gold-500 bg-cream py-6">
      <div className="container-content">
        <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {marks.map((c) => (
            <li key={c!.slug}>
              <CredentialMark credential={c!} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
