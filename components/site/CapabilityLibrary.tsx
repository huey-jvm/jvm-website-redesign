import Image from "@/components/ui/Image";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { capabilityDocuments } from "@/content/capabilities";

export function CapabilityLibrary({ service }: { service: string }) {
  const documents = capabilityDocuments.filter((doc) => doc.service === service);
  return (
    <div className="capability-library">
      <div className="mb-7 flex items-start gap-3">
        <FileText aria-hidden className="mt-1 size-6 shrink-0 text-gold-700" />
        <div>
          <h2 className="text-h2-sm text-ink-950">{documents.length === 1 ? "Capability Statement" : "Capability Statements"}</h2>
          <p className="mt-3 max-w-[65ch] text-body text-ink-700">View the statement in your browser or save a copy for your team.</p>
        </div>
      </div>
      <ul className={`grid gap-5 ${service && documents.length === 1 ? "" : "xl:grid-cols-2"}`}>
        {documents.map((doc) => (
          <li key={doc.id} className="capability-document grid grid-cols-[5rem_minmax(0,1fr)] gap-4 border border-cream-border bg-white p-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6 sm:p-6">
            <div className="self-start border border-ink-200 bg-ink-50 p-1 shadow-sm">
              <Image src={doc.preview} alt={`${doc.title} capability statement cover`} width={420} height={544} className="h-auto w-full" sizes="112px" />
            </div>
            <div className="min-w-0">
              <p className="text-caption font-semibold uppercase tracking-wider text-gold-700">PDF · {doc.pages} pages · {doc.size}</p>
              <h3 className="mt-2 text-h3 text-ink-950">{doc.title}</h3>
              <p className="mt-2 text-body-sm text-ink-700">{doc.description}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                <a href={doc.href} aria-label={`View PDF: ${doc.title} capability statement (opens in a new tab)`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-body-sm font-semibold text-ink-900 underline underline-offset-4">View PDF<span className="sr-only">: {doc.title} (opens in a new tab)</span><ArrowUpRight aria-hidden className="size-4" /></a>
                <a href={doc.href} download className="inline-flex min-h-11 items-center gap-2 text-body-sm font-semibold text-gold-700 underline underline-offset-4">Download<span className="sr-only"> {doc.title} capability statement</span><Download aria-hidden className="size-4" /></a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
