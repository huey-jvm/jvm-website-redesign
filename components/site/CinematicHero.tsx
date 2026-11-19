import { ChevronRight } from "lucide-react";
import { statements } from "@/content/statements";
import { formatList } from "@/lib/list";
import type { ReactNode } from "react";
import { VideoHero } from "./VideoHero";
import { landingVideo } from "@/content/hero-videos";

export function CinematicHero({ children }: { children?: ReactNode }) {
  const facts = [
    { label: "The missions we serve", value: formatList([...statements.audience]) },
    { label: "Our expertise", value: "Healthcare, Health IT, logistics and facilities management" },
    { label: "Our approach", value: "People, systems and delivery working together" },
  ];
  return (
    <VideoHero video={landingVideo} title={<>Built to Serve.<br /><span className="mission-emphasis">Ready to Deliver.</span></>} lead={statements.positioning} facts={facts}>
            {children}
            <a href="#outcomes-title" className="mission-scroll"><span>See what makes JVM different</span><ChevronRight aria-hidden="true" className="size-4 shrink-0" /></a>
    </VideoHero>
  );
}
