import type { ReactNode } from "react";
import Image from "@/components/ui/Image";
import { VideoBackdrop } from "./VideoBackdrop";
import { Breadcrumb } from "./Breadcrumb";
import type { HeroVideo } from "@/content/hero-videos";

export function VideoHero({ video, title, lead, children, facts, about = false }: {
  video: HeroVideo;
  title: ReactNode;
  lead: string;
  children: ReactNode;
  facts?: { label: string; value: string }[];
  about?: boolean;
}) {
  return <section className={`mission-hero video-hero surface-dark ${about ? "about-hero video-hero--about" : "video-hero--landing"}`} data-hero="video" aria-label={about ? "About JVM Solutions" : "JVM Solutions"}>
    <VideoBackdrop key={video.src} video={video}>
      <Image src={video.poster} alt="" fill priority quality={90} sizes="100vw" className="hero-image video-hero-poster" />
    </VideoBackdrop>
    <div className="video-hero-shade" aria-hidden="true" />
    {about && <div className="container-content video-hero-breadcrumb"><Breadcrumb items={[{ label: "About" }]} tone="dark" /></div>}
    <div className="container-content video-hero-stage">
      <div className="hero-copy">
        <h1 className="video-hero-title text-cream">{title}</h1>
        <p className="video-hero-lead text-cream">{lead}</p>
        {children}
      </div>
    </div>
    {facts && <div className="video-hero-foot"><div className="container-content">
      <dl className="mission-facts">
        {facts.map(f => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}
      </dl>
    </div></div>}
  </section>;
}
