"use client";

import { useEffect, useRef, type ReactElement } from "react";

type LearvoWalkthroughVideoProps = {
  src: string;
};

export function LearvoWalkthroughVideo({
  src,
}: LearvoWalkthroughVideoProps): ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.playbackRate = 1.5;
  }, []);

  return (
    <video
      ref={videoRef}
      className="case-study-walkthrough-video"
      src={src}
      autoPlay
      loop
      muted
      playsInline
      aria-label="Learvo first-time experience walkthrough"
      onLoadedMetadata={(event) => {
        event.currentTarget.playbackRate = 1.5;
      }}
    />
  );
}
