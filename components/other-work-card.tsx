"use client";

import { useCallback, useEffect, useRef, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { CaseStudy } from "@/lib/case-studies";

const MAX_TILT = 9;
const TILT_EASE = 0.14;
const TILT_SETTLE_THRESHOLD = 0.01;
const ACTIVE_GLINT_OPACITY = "0.62";

type OtherWorkCardProps = {
  caseStudies: CaseStudy[];
};

type OtherWorkItem = {
  key: string;
  title: string;
  description: string;
  tools: string;
  meta: string[];
  href: string;
  previewImage: string;
  ctaLabel: string;
  external?: boolean;
};

type TiltState = {
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
  hovering: boolean;
  frameId: number | null;
};

const frequencyFinderItem: OtherWorkItem = {
  key: "frequency-finder",
  title: "Frequency Finder",
  description:
    "An interactive personality test that translates your traits into sound and a song match",
  tools: "Generative AI • Claude/Codex • NextJS • AI Prototyping",
  meta: ["Just for fun", "2026"],
  href: "https://frequency-finder.vercel.app/",
  previewImage: "/previews/frequency-finder.png",
  ctaLabel: "View Frequency Finder",
  external: true,
};

const monetGalleryItem: OtherWorkItem = {
  key: "monet-gallery",
  title: "Monet Gallery",
  description:
    "Created an immersive art gallery web experience focused on the works of Claude Monet.",
  tools: "Figma • Claude Code • HTML • CSS • JavaScript",
  meta: ["Academic Solo Project", "6 weeks"],
  href: "https://monetgallery.vercel.app/",
  previewImage: "/previews/monet-gallery.png",
  ctaLabel: "View The Gallery",
  external: true,
};

function toOtherWorkItem(study: CaseStudy): OtherWorkItem {
  const isCultCookies = study.slug === "cult-cookies";

  return {
    key: study.slug,
    title: study.title,
    description: isCultCookies
      ? "A food truck, brand, and business built from the ground up"
      : study.description,
    tools: isCultCookies
      ? "Spatial Design • Brand Identity • Operations • Fabrication • Brand Design • Baking"
      : "Fabrication • Spatial Design • Branding • Product • Operations",
    meta: isCultCookies
      ? ["Independent Venture/Passion Project", "2023"]
      : ["Self-initiated", "2023"],
    href: study.href,
    previewImage: isCultCookies
      ? "/case-studies/cult-cookies/card-cookie-box.jpg"
      : study.previewImage,
    ctaLabel: isCultCookies ? "View The Project" : "View Case Study",
  };
}

function OtherWorkItemCard({ item }: { item: OtherWorkItem }) {
  const reduceMotion = usePrefersReducedMotion();
  const tiltState = useRef<TiltState>({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    hovering: false,
    frameId: null,
  });

  const applyTilt = useCallback(
    (card: HTMLElement, rotateX: number, rotateY: number) => {
      const tiltTransform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      card.style.setProperty("--rx", `${rotateX}deg`);
      card.style.setProperty("--ry", `${rotateY}deg`);
      card.style.setProperty("--tilt-transform", tiltTransform);
      card.style.transform = tiltTransform;
    },
    [],
  );

  const animateTilt = useCallback(
    (card: HTMLElement) => {
      const state = tiltState.current;

      state.currentX += (state.targetX - state.currentX) * TILT_EASE;
      state.currentY += (state.targetY - state.currentY) * TILT_EASE;

      const isStillMoving =
        Math.abs(state.targetX - state.currentX) > TILT_SETTLE_THRESHOLD ||
        Math.abs(state.targetY - state.currentY) > TILT_SETTLE_THRESHOLD;

      if (!state.hovering && !isStillMoving) {
        state.currentX = state.targetX;
        state.currentY = state.targetY;
        applyTilt(card, state.currentX, state.currentY);
        card.classList.remove("is-tilting");
        state.frameId = null;
        return;
      }

      applyTilt(card, state.currentX, state.currentY);
      state.frameId = window.requestAnimationFrame(() => animateTilt(card));
    },
    [applyTilt],
  );

  const startTiltAnimation = useCallback(
    (card: HTMLElement) => {
      const state = tiltState.current;

      if (state.frameId === null) {
        state.frameId = window.requestAnimationFrame(() => animateTilt(card));
      }
    },
    [animateTilt],
  );

  useEffect(() => {
    return () => {
      const { frameId } = tiltState.current;

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLAnchorElement>) => {
      if (reduceMotion) {
        return;
      }

      const wrapper = event.currentTarget;
      const card = wrapper.querySelector<HTMLElement>(".case-card");

      if (!card) {
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const clampedX = Math.max(0, Math.min(1, x));
      const clampedY = Math.max(0, Math.min(1, y));
      const dx = clampedX * 2 - 1;
      const dy = clampedY * 2 - 1;
      const rotateX = -dy * MAX_TILT;
      const rotateY = dx * MAX_TILT;
      const state = tiltState.current;

      state.targetX = rotateX;
      state.targetY = rotateY;
      state.hovering = true;
      card.style.setProperty("--glare-x", `${(1 - clampedX) * 100}%`);
      card.style.setProperty("--glare-y", `${(1 - clampedY) * 100}%`);
      card.style.setProperty("--mx", `${clampedX * 100}%`);
      card.style.setProperty("--my", `${clampedY * 100}%`);
      card.style.setProperty("--glint-x", `${(0.5 - clampedX) * 42}px`);
      card.style.setProperty("--glint-y", `${(0.5 - clampedY) * 42}px`);
      card.style.setProperty("--glare-opacity", "1");
      card.style.setProperty("--glint-opacity", ACTIVE_GLINT_OPACITY);
      card.classList.add("is-tilting");
      startTiltAnimation(card);
    },
    [reduceMotion, startTiltAnimation],
  );

  const handlePointerLeave = useCallback(
    (event: PointerEvent<HTMLAnchorElement>) => {
      const card = event.currentTarget.querySelector<HTMLElement>(".case-card");

      if (!card) {
        return;
      }

      const state = tiltState.current;

      state.targetX = 0;
      state.targetY = 0;
      state.hovering = false;
      card.style.setProperty("--glare-x", "50%");
      card.style.setProperty("--glare-y", "50%");
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "50%");
      card.style.setProperty("--glint-x", "0px");
      card.style.setProperty("--glint-y", "0px");
      card.style.setProperty("--glare-opacity", "0");
      card.style.setProperty("--glint-opacity", "0");
      startTiltAnimation(card);
    },
    [startTiltAnimation],
  );

  const handlePointerOut = useCallback(
    (event: PointerEvent<HTMLAnchorElement>) => {
      const relatedTarget = event.relatedTarget;

      if (event.currentTarget.matches(":hover")) {
        return;
      }

      if (
        relatedTarget instanceof Node &&
        event.currentTarget.contains(relatedTarget)
      ) {
        return;
      }

      handlePointerLeave(event);
    },
    [handlePointerLeave],
  );

  const card = (
    <article
      className={`case-card case-study-card other-work-card other-work-card--${item.key}`}
    >
      <div className="case-card__copy other-work-card__copy">
        <h2 className="case-card__title other-work-card__title">{item.title}</h2>
        <p className="case-card__description other-work-card__description">
          {item.description}
        </p>

        <div className="case-card__rule other-work-card__rule" aria-hidden="true" />
        {item.tools ? <p className="other-work-card__tools">{item.tools}</p> : null}

        <div className="other-work-card__footer">
          <div className="other-work-card__meta">
            {item.meta.map((metaItem) => (
              <span key={metaItem}>{metaItem}</span>
            ))}
          </div>

          <span className="other-work-card__cta">
            <span>{item.ctaLabel}</span>
            {item.external ? (
              <ExternalLink aria-hidden="true" size={13} strokeWidth={1.8} />
            ) : (
              <ArrowRight aria-hidden="true" size={15} strokeWidth={1.7} />
            )}
          </span>
        </div>
      </div>

      <div className="case-card__visual case-card__visual--image other-work-card__visual">
        <Image
          src={item.previewImage}
          alt=""
          width={2518}
          height={1480}
          sizes="(max-width: 900px) 100vw, 480px"
          aria-hidden="true"
        />
      </div>
    </article>
  );

  const sharedProps = {
    className: "case-card-link case-study-card-wrapper other-work-card-link",
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    onPointerCancel: handlePointerLeave,
    onPointerOut: handlePointerOut,
  };

  if (item.external) {
    return (
      <a {...sharedProps} href={item.href} target="_blank" rel="noreferrer">
        {card}
      </a>
    );
  }

  return (
    <Link {...sharedProps} href={item.href}>
      {card}
    </Link>
  );
}

export function OtherWorkCard({ caseStudies }: OtherWorkCardProps) {
  const items = [
    frequencyFinderItem,
    ...caseStudies.map(toOtherWorkItem),
    monetGalleryItem,
  ];

  return (
    <>
      {items.map((item) => (
        <OtherWorkItemCard item={item} key={item.key} />
      ))}
    </>
  );
}
