"use client";

import {
  type PointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type HoverImagePreviewProps = {
  children: ReactNode;
  className?: string;
  images: string[];
  as?: "div" | "span";
  cycleDuration?: number;
};

const viewportPadding = 14;
const cursorOffsetX = 24;
const cursorOffsetY = -34;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function HoverImagePreview({
  children,
  className,
  images,
  as = "div",
  cycleDuration = 250,
}: HoverImagePreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const hoveringRef = useRef(false);
  const currentRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const Trigger = as;

  useEffect(() => {
    setIsMounted(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    images.forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });
  }, [images]);

  useEffect(() => {
    if (!isVisible || images.length < 2 || reducedMotion) {
      return;
    }

    const cycleId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % images.length);
    }, cycleDuration);

    return () => window.clearInterval(cycleId);
  }, [cycleDuration, images.length, isVisible, reducedMotion]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const applyPosition = () => {
    const preview = previewRef.current;

    if (!preview) {
      return;
    }

    preview.style.setProperty("--preview-x", `${currentRef.current.x}px`);
    preview.style.setProperty("--preview-y", `${currentRef.current.y}px`);
  };

  const animatePosition = () => {
    const ease = reducedMotion ? 1 : 0.22;

    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * ease;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * ease;
    applyPosition();

    const isStillMoving =
      Math.abs(targetRef.current.x - currentRef.current.x) > 0.2 ||
      Math.abs(targetRef.current.y - currentRef.current.y) > 0.2;

    if (hoveringRef.current || isStillMoving) {
      frameRef.current = window.requestAnimationFrame(animatePosition);
      return;
    }

    frameRef.current = null;
  };

  const startAnimation = () => {
    if (frameRef.current === null) {
      frameRef.current = window.requestAnimationFrame(animatePosition);
    }
  };

  const updateTargetPosition = (
    event: PointerEvent<HTMLElement>,
    shouldSnap = false,
  ) => {
    const preview = previewRef.current;
    const previewWidth = preview?.offsetWidth ?? 176;
    const previewHeight = preview?.offsetHeight ?? 236;
    const maxX = window.innerWidth - previewWidth - viewportPadding;
    const maxY = window.innerHeight - previewHeight - viewportPadding;
    const nextX = clamp(
      event.clientX + cursorOffsetX,
      viewportPadding,
      Math.max(viewportPadding, maxX),
    );
    const nextY = clamp(
      event.clientY + cursorOffsetY,
      viewportPadding,
      Math.max(viewportPadding, maxY),
    );

    targetRef.current = { x: nextX, y: nextY };

    if (shouldSnap || reducedMotion) {
      currentRef.current = targetRef.current;
      applyPosition();
    }

    startAnimation();
  };

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (images.length === 0) {
      return;
    }

    hoveringRef.current = true;
    setActiveIndex(0);
    setIsVisible(true);
    updateTargetPosition(event, true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!hoveringRef.current) {
      return;
    }

    updateTargetPosition(event);
  };

  const handlePointerLeave = () => {
    hoveringRef.current = false;
    setIsVisible(false);
    startAnimation();
  };

  return (
    <Trigger
      className={["hover-image-area", className].filter(Boolean).join(" ")}
      onPointerCancel={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      {children}
      {isMounted
        ? createPortal(
            <div
              ref={previewRef}
              aria-hidden="true"
              className={`hover-image-preview${isVisible ? " is-visible" : ""}`}
            >
              {images[activeIndex] ? (
                <img alt="" draggable={false} src={images[activeIndex]} />
              ) : null}
            </div>,
            document.body,
          )
        : null}
    </Trigger>
  );
}
