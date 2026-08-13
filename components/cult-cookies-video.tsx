"use client";

import { useEffect, useRef, type ReactElement } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type CultCookiesVideoProps = {
  label: string;
  poster: string;
  src: string;
};

export function CultCookiesVideo({
  label,
  poster,
  src,
}: CultCookiesVideoProps): ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;

    if (!video || reduceMotion) {
      video?.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <video
      ref={videoRef}
      className="cult-video"
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
