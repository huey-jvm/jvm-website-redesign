"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { withBasePath } from "@/lib/base-path";
import type { HeroVideo } from "@/content/hero-videos";

type Connection = EventTarget & { saveData?: boolean };

// The poster is server rendered. Motion is an enhancement: no video request is
// made for reduced-motion/data-saving visitors until they explicitly press Play.
export function VideoBackdrop({ video, children }: { video: HeroVideo; children: ReactNode }) {
  const id = useId();
  const media = useRef<HTMLVideoElement>(null);
  const intent = useRef<boolean | null>(null);
  const sync = useRef<() => void>(() => {});
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = media.current;
    if (!element) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const phone = matchMedia("(max-width: 767px)");
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    let visible = true;
    const update = () => {
      const requested = intent.current ?? (!motion.matches && !connection?.saveData);
      if (!requested || !visible || document.hidden || element.error) {
        element.pause();
        return;
      }
      if (!element.getAttribute("src")) {
        element.src = withBasePath(phone.matches ? video.mobileSrc : video.src);
        element.load();
      }
      element.defaultPlaybackRate = 0.85;
      element.playbackRate = 0.85;
      void element.play().catch(() => { /* Autoplay may be blocked; the Play control remains available. */ });
    };
    sync.current = update;
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      update();
    }, { threshold: 0.05 });
    observer.observe(element.parentElement!);
    motion.addEventListener("change", update);
    connection?.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      sync.current = () => {};
      observer.disconnect();
      motion.removeEventListener("change", update);
      connection?.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      element.pause();
    };
  }, [video.src, video.mobileSrc]);

  return <>
    <div className="video-hero-media" aria-hidden="true">
      {children}
      <video ref={media} id={id} className="hero-video" data-ready={ready && !failed}
        muted loop playsInline preload="none" disablePictureInPicture tabIndex={-1}
        onPlaying={() => { setPlaying(true); setReady(true); }}
        onPause={() => setPlaying(false)}
        onError={() => { setPlaying(false); setFailed(true); }} />
    </div>
    {!failed && <button type="button" className="hero-video-control" aria-controls={id}
      aria-label={playing ? "Pause background video" : "Play background video"}
      onClick={() => { intent.current = !playing; sync.current(); }}>
      {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
    </button>}
  </>;
}
