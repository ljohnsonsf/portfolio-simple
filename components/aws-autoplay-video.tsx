"use client";

import { useEffect, useRef, type ReactElement } from "react";

type AwsAutoplayVideoProps = {
  src: string;
  label: string;
};

export function AwsAutoplayVideo({
  src,
  label,
}: AwsAutoplayVideoProps): ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
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
  }, []);

  return (
    <video
      ref={videoRef}
      className="case-study-walkthrough-video"
      src={src}
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
