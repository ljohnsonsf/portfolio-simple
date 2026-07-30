"use client";

import { useEffect, useRef, type ReactElement } from "react";

type CommvaultScrollVideoProps = {
  label: string;
  playbackRate?: number;
  src: string;
};

export function CommvaultScrollVideo({
  label,
  playbackRate = 1.5,
  src,
}: CommvaultScrollVideoProps): ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.defaultPlaybackRate = playbackRate;
    video.playbackRate = playbackRate;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (video.ended) {
            video.currentTime = 0;
          }

          video.playbackRate = playbackRate;
          void video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [playbackRate]);

  return (
    <video
      ref={videoRef}
      className="case-study-walkthrough-video"
      src={src}
      muted
      playsInline
      preload="metadata"
      aria-label={label}
      onLoadedMetadata={(event) => {
        event.currentTarget.defaultPlaybackRate = playbackRate;
        event.currentTarget.playbackRate = playbackRate;
      }}
    />
  );
}
