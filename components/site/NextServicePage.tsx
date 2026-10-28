"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const sequence = [
  { href: "/services", label: "All Services" },
  { href: "/services/healthcare-operations", label: "Healthcare Operations" },
  { href: "/services/health-it", label: "IT and Technology" },
  { href: "/services/logistics", label: "Logistics" },
  { href: "/services/facilities-management", label: "Facilities Management" },
  { href: "/contracting/capability-statement", label: "Capability Statements" },
  { href: "/services/management-support", label: "Administrative Support" },
];

export function NextServicePage({ current }: { current: string }) {
  const trigger = useRef<HTMLSpanElement>(null);
  const [visibleFor, setVisibleFor] = useState<string | null>(null);
  const index = sequence.findIndex(page => page.href === current);
  const next = index >= 0 ? sequence[index + 1] : undefined;
  useEffect(() => {
    const element = trigger.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisibleFor(entry.boundingClientRect.top <= window.innerHeight && window.scrollY > 0 ? current : null);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [current]);
  if (!next) return null;
  return (
    <>
      <span ref={trigger} aria-hidden="true" className="mt-10 block h-px md:mt-12" />
      {visibleFor === current && createPortal(
        <nav aria-label="Next service page" className="absolute bottom-4 right-4 z-20 max-w-[calc(100%-2rem)] md:right-6">
          <Button href={next.href} size="sm" className="bg-cream shadow-sm" icon={<ArrowRight className="size-4" />} iconTrailing>
            Go to {next.label}
          </Button>
        </nav>,
        document.getElementById("main")!,
      )}
    </>
  );
}
