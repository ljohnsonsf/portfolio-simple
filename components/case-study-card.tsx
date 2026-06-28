"use client";

import { useCallback, useEffect, useRef } from "react";
import type { PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Lightbulb,
  LayoutGrid,
  UsersRound,
} from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type CaseStudyCardProps = {
  study: CaseStudy;
};

const MAX_TILT = 9;
const TILT_EASE = 0.14;
const TILT_SETTLE_THRESHOLD = 0.01;
const ACTIVE_GLINT_OPACITY = "0.62";

type TiltState = {
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
  hovering: boolean;
  frameId: number | null;
};

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  const reduceMotion = usePrefersReducedMotion();
  const tiltState = useRef<TiltState>({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    hovering: false,
    frameId: null,
  });
  const usesScreenshotFormat =
    study.slug === "learvo-learning" || study.slug === "aws-beginner-mode";

  const applyTilt = useCallback((card: HTMLElement, rotateX: number, rotateY: number) => {
    const tiltTransform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
    card.style.setProperty("--tilt-transform", tiltTransform);
    card.style.transform = tiltTransform;
  }, []);

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

  return (
    <Link
      className="case-card-link case-study-card-wrapper"
      href={study.href}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      onPointerOut={handlePointerOut}
    >
      <article
        className={`case-card case-study-card ${
          usesScreenshotFormat ? "case-card--screenshot" : ""
        }`}
      >
        <div className="case-card__copy">
          <div className="case-card__number">{study.number}</div>
          <h2 className="case-card__title">{study.title}</h2>
          <p className="case-card__description">{study.description}</p>

          <div className="case-card__rule" aria-hidden="true" />
          <div
            className="case-card__metric"
            aria-label={`${study.metricValue} ${study.metricText}`}
          >
            <span className="case-card__metric-value">{study.metricValue}</span>
            <span className="case-card__metric-text">{study.metricText}</span>
          </div>
          <div className="case-card__rule" aria-hidden="true" />

          <div className="case-card__meta" aria-label="Project metadata">
            <div className="case-card__meta-row">
              <LayoutGrid aria-hidden="true" size={14} strokeWidth={1.8} />
              <span>{study.tags.join(" · ")}</span>
            </div>
            <div className="case-card__meta-row">
              <UsersRound aria-hidden="true" size={14} strokeWidth={1.8} />
              <span>{study.meta}</span>
            </div>
            {study.roleMeta ? (
              <div className="case-card__meta-row">
                <Lightbulb aria-hidden="true" size={14} strokeWidth={1.8} />
                <span>{study.roleMeta}</span>
              </div>
            ) : null}
            {study.projectTypeMeta ? (
              <div className="case-card__meta-row">
                <BriefcaseBusiness
                  aria-hidden="true"
                  size={14}
                  strokeWidth={1.8}
                />
                <span>{study.projectTypeMeta}</span>
              </div>
            ) : null}
          </div>

          <span className="primary-button case-card__cta">
            <span>View Case Study</span>
          </span>
        </div>

        <div
          className={`case-card__visual ${
            usesScreenshotFormat ? "case-card__visual--image" : ""
          }`}
          aria-hidden="true"
        >
          <Image
            src={study.previewImage}
            alt=""
            width={632}
            height={414}
            sizes="(max-width: 900px) 100vw, 632px"
          />
        </div>
      </article>
    </Link>
  );
}
