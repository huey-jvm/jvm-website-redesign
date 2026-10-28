import { ScrollEndNavigation } from "./ScrollEndNavigation";
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
  const index = sequence.findIndex(page => page.href === current);
  const next = index >= 0 ? sequence[index + 1] : undefined;
  if (!next) return null;
  return (
    <ScrollEndNavigation current={current}>
        <nav aria-label="Next service page" className="absolute bottom-4 right-4 z-20 max-w-[calc(100%-2rem)] md:right-6">
          <Button href={next.href} size="sm" className="bg-cream shadow-sm" icon={<ArrowRight className="size-4" />} iconTrailing>
            Go to {next.label}
          </Button>
        </nav>
    </ScrollEndNavigation>
  );
}
