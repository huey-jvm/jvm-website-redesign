import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-body-sm text-ink-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link href="/" className="link-underline after:bg-current hover:text-ink-900">Home</Link></li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight aria-hidden className="size-3.5 text-ink-300" />
            {item.href ? <Link href={item.href} className="link-underline after:bg-current hover:text-ink-900">{item.label}</Link> : <span aria-current="page" className="text-ink-900">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
