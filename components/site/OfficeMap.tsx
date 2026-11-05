"use client";

import { useEffect, useRef, useState } from "react";
import { SkeletonBox } from "skullet/react";

export function OfficeMap({ src }: { src: string }) {
  const loaded = useRef(false);
  const [show, setShow] = useState(false);
  const finish = () => { loaded.current = true; setShow(false); };
  useEffect(() => {
    const timer = setTimeout(() => { if (!loaded.current) setShow(true); }, 150);
    // Third-party embeds can be blocked; never leave an endless loading state.
    const limit = setTimeout(() => setShow(false), 12000);
    return () => { clearTimeout(timer); clearTimeout(limit); };
  }, []);
  return <div className="office-map-preview relative min-h-80">
    <iframe title="Map to JVM Solutions Texas Office" src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen onLoad={finish} onError={finish} className="absolute inset-0 h-full w-full border-0" />
    {show && <span className="photo-loading" aria-hidden="true"><SkeletonBox width="100%" height="100%" radius={0} /></span>}
  </div>;
}
