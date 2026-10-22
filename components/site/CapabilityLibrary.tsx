import { Download, Eye } from "lucide-react";
import { capabilityDocuments } from "@/content/capabilities";
import { Button } from "@/components/ui/Button";

export function CapabilityLibrary({ service }: { service?: string }) {
  const documents = capabilityDocuments.filter(doc => !service || doc.service === service);
  return (
    <div className="capability-library">
      <h2 className="mb-6 text-h2-sm text-ink-950">{documents.length === 1 ? "Capability Statement" : "Capability Statements"}</h2>
      <ul className="border-t border-cream-border">
        {documents.map(doc => (
          <li key={doc.id} className="flex flex-col items-start justify-between gap-4 border-b border-cream-border py-6 sm:flex-row sm:items-center">
            <h3 className="text-h3 text-ink-950">{doc.title}</h3>
            <div className="flex flex-wrap gap-3">
              <Button href={doc.href} target="_blank" rel="noopener noreferrer" variant="secondary" icon={<Eye className="size-4" />} aria-label={`Preview PDF: ${doc.title} capability statement (opens in a new tab)`}>Preview PDF</Button>
            <Button href={doc.href} download variant="primary" icon={<Download className="size-4" />} aria-label={`Download PDF: ${doc.title} capability statement`}>Download PDF</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
