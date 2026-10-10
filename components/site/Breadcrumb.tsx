import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function Breadcrumb({ items, tone = "light" }: { items: { label: string; href?: string }[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const link = cn("link-underline after:bg-current", dark ? "hover:text-cream" : "hover:text-ink-900");
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6 text-body-sm", dark ? "text-ink-300" : "text-ink-500")}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link href="/" className={link}>Home</Link></li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight aria-hidden className={cn("size-3.5", dark ? "text-ink-400" : "text-ink-300")} />
            {item.href ? <Link href={item.href} className={link}>{item.label}</Link> : <span aria-current="page" className={dark ? "text-cream" : "text-ink-900"}>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
