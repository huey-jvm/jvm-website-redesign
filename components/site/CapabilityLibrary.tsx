import { ArrowUpRight } from "lucide-react";
import { capabilityDocuments } from "@/content/capabilities";
import { Button } from "@/components/ui/Button";
import { withBasePath } from "@/lib/base-path";

export function CapabilityLibrary({ service, heading = true }: { service?: string; heading?: boolean }) {
  const documents = capabilityDocuments.filter(doc => !service || doc.service === service);
  const Title = heading ? "h3" : "h2";
  return (
    <div className="capability-library">
      {heading ? <h2 className="mb-6 text-h2-sm text-ink-950">{documents.length === 1 ? "Capability Statement" : "Capability Statements"}</h2> : null}
      <ul className="border-t border-cream-border">
        {documents.map(doc => (
          <li key={doc.id} className="flex flex-col items-start justify-between gap-4 border-b border-cream-border py-6 sm:flex-row sm:items-center">
            <Title className="text-h3 text-ink-950">{doc.title}</Title>
            <div className="flex flex-wrap gap-3">
              <Button href={withBasePath(doc.href)} external variant="secondary" icon={<ArrowUpRight className="size-4" />} iconTrailing aria-label={`Preview PDF: ${doc.title} capability statement (opens in a new tab)`}>Preview PDF</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
