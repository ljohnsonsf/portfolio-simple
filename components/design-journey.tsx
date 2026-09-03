"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type JourneyStepId = "healthcare" | "sales" | "design";

type JourneyStep = {
  id: JourneyStepId;
  number: string;
  title: string;
  mapSubtitle: string;
  accordionSubtitle: string;
  body: string[];
  pathProgress: number;
};

const journeyPath =
  "M 232 128 C 294 126 402 150 334 210 C 292 248 166 264 78 332";

const fallbackPathPoints: Record<JourneyStepId, { x: number; y: number }> = {
  healthcare: { x: 232, y: 128 },
  sales: { x: 334, y: 210 },
  design: { x: 78, y: 332 },
};

const journeySteps: JourneyStep[] = [
  {
    id: "healthcare",
    number: "1.",
    title: "Healthcare",
    mapSubtitle: "Seeing the full context",
    accordionSubtitle: "Seeing the full context",
    body: [
      "Healthcare taught me to look beyond the immediate problem and understand the broader context shaping someone’s experience: the systems, constraints, and moments of friction around them.",
    ],
    pathProgress: 0,
  },
  {
    id: "sales",
    number: "2.",
    title: "Sales",
    mapSubtitle: "Spotting friction",
    accordionSubtitle: "Spotting friction",
    body: [
      "Sales taught me to spot friction and barriers by listening for the moments where people got stuck, hesitated, or had to work harder than they should.",
    ],
    pathProgress: 0.46,
  },
  {
    id: "design",
    number: "3.",
    title: "Design",
    mapSubtitle: "Designing better paths",
    accordionSubtitle: "Designing better paths",
    body: [
      "Design is where I've settled in to create better paths and experiences, shaping clearer flows around people’s needs, constraints, and decisions.",
    ],
    pathProgress: 1,
  },
];

const stepsById = journeySteps.reduce(
  (steps, step) => {
    steps[step.id] = step;
    return steps;
  },
  {} as Record<JourneyStepId, JourneyStep>,
);

function closestFallbackPoint(progress: number) {
  if (progress < 0.24) {
    return fallbackPathPoints.healthcare;
  }

  if (progress < 0.76) {
    return fallbackPathPoints.sales;
  }

  return fallbackPathPoints.design;
}

export function DesignJourney() {
  const [activeStep, setActiveStep] = useState<JourneyStepId>("healthcare");
  const [openStep, setOpenStep] = useState<JourneyStepId | null>("healthcare");

  const selectStep = (step: JourneyStepId) => {
    setActiveStep(step);
    setOpenStep(step);
  };

  const toggleAccordionStep = (step: JourneyStepId) => {
    if (openStep === step) {
      setOpenStep(null);
      return;
    }

    selectStep(step);
  };

  return (
    <div className="about-journey">
      <JourneyIntro />
      <div className="about-journey__layout">
        <JourneyMap activeStep={activeStep} onSelectStep={selectStep} />
        <JourneyAccordion
          activeStep={activeStep}
          openStep={openStep}
          onToggleStep={toggleAccordionStep}
        />
      </div>
    </div>
  );
}

function JourneyIntro() {
  return (
    <div className="about-journey__intro">
      <h2 id="about-why-design">What shaped how I design</h2>
      <p className="about-journey__intro-lead">
        My path into design moved through healthcare, sales, and design.
      </p>
      <p>
        Across each field, I kept returning to the same challenge: where people
        face friction, what gets in their way, and how experiences could work
        better.
      </p>
    </div>
  );
}

type JourneyMapProps = {
  activeStep: JourneyStepId;
  onSelectStep: (step: JourneyStepId) => void;
};

function JourneyMap({ activeStep, onSelectStep }: JourneyMapProps) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const totalLengthRef = useRef(0);
  const previousProgressRef = useRef(stepsById.healthcare.pathProgress);
  const [travelDirection, setTravelDirection] = useState(1);
  const prefersReducedMotion = usePrefersReducedMotion();
  const pathProgress = useMotionValue(stepsById.healthcare.pathProgress);
  const mapLabelId = useId();

  const getPathPoint = (progress: number) => {
    const path = pathRef.current;

    if (!path || totalLengthRef.current === 0) {
      return closestFallbackPoint(progress);
    }

    const point = path.getPointAtLength(progress * totalLengthRef.current);
    return { x: point.x, y: point.y };
  };

  const boatLeft = useTransform(
    pathProgress,
    (progress) => `${(getPathPoint(progress).x / 640) * 100}%`,
  );
  const boatTop = useTransform(
    pathProgress,
    (progress) => `${(getPathPoint(progress).y / 420) * 100}%`,
  );

  useEffect(() => {
    if (!pathRef.current) {
      return;
    }

    totalLengthRef.current = pathRef.current.getTotalLength();
    pathProgress.set(previousProgressRef.current);
  }, [pathProgress]);

  useEffect(() => {
    const targetProgress = stepsById[activeStep].pathProgress;
    const previousProgress = previousProgressRef.current;

    if (targetProgress !== previousProgress) {
      setTravelDirection(targetProgress > previousProgress ? 1 : -1);
    }

    previousProgressRef.current = targetProgress;

    const controls = animate(pathProgress, targetProgress, {
      duration: prefersReducedMotion ? 0.01 : 0.9,
      ease: [0.42, 0, 0.18, 1],
    });

    return () => controls.stop();
  }, [activeStep, pathProgress, prefersReducedMotion]);

  return (
    <div className="about-journey-map" aria-labelledby={mapLabelId}>
      <p className="sr-only" id={mapLabelId}>
        Interactive map of Lauren&apos;s path through Seeing the full context,
        Spotting friction, and Designing better paths.
      </p>
      <div className="about-journey-map__canvas">
        <svg
          aria-hidden="true"
          className="about-journey-map__svg"
          preserveAspectRatio="none"
          viewBox="0 0 640 420"
        >
          <path
            ref={pathRef}
            className="about-journey-map__path"
            d={journeyPath}
          />
        </svg>

        <motion.div
          aria-hidden="true"
          className="about-journey-map__boat"
          style={{ left: boatLeft, top: boatTop }}
        >
          <svg
            className="about-journey-map__boat-icon"
            style={{ transform: `scaleX(${travelDirection})` }}
            viewBox="-30 -38 60 74"
          >
            <BoatMarker />
          </svg>
        </motion.div>

        {journeySteps.map((step) => (
          <button
            aria-label={`Show ${step.title}: ${step.mapSubtitle}`}
            aria-pressed={activeStep === step.id}
            className={[
              "about-journey-waypoint",
              `about-journey-waypoint--${step.id}`,
              activeStep === step.id ? "is-active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            key={step.id}
            onClick={() => onSelectStep(step.id)}
            type="button"
          >
            <span className="about-journey-waypoint__dot" aria-hidden="true">
              {step.number.replace(".", "")}
            </span>
            <span className="about-journey-waypoint__label">
              <span className="about-journey-waypoint__title">
                {step.mapSubtitle}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BoatMarker() {
  return (
    <g className="about-journey-boat">
      <path
        d="M 1 -31 C 10 -22 16 -12 19 -1 C 12 -4 6 -5 1 -4 Z"
        fill="var(--surface)"
      />
      <path
        d="M -3 -29 C -12 -21 -17 -11 -18 -1 C -12 -3 -7 -4 -3 -4 Z"
        fill="var(--surface)"
      />
      <path
        d="M -24 0 C -15 6 6 7 25 0 C 21 8 12 13 0 13 C -13 13 -21 8 -24 0 Z"
        fill="var(--surface)"
      />
      <path d="M 0 -32 L 0 0" />
      <path d="M -18 -1 C -8 2 9 2 22 -1" />
      <path d="M -18 20 C -12 18 -7 20 -1 19 C 5 18 10 20 16 18" />
      <path d="M -10 27 C -4 25 1 27 7 26 C 13 25 17 26 21 25" />
    </g>
  );
}

type JourneyAccordionProps = {
  activeStep: JourneyStepId;
  openStep: JourneyStepId | null;
  onToggleStep: (step: JourneyStepId) => void;
};

function JourneyAccordion({
  activeStep,
  openStep,
  onToggleStep,
}: JourneyAccordionProps) {
  const accordionId = useId();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="about-journey-accordion">
      {journeySteps.map((step) => {
        const isActive = activeStep === step.id;
        const isOpen = openStep === step.id;
        const panelId = `${accordionId}-${step.id}-panel`;
        const headerId = `${accordionId}-${step.id}-header`;

        return (
          <article
            className={[
              "about-journey-accordion__item",
              isActive ? "is-active" : "",
              isOpen ? "is-open" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            key={step.id}
          >
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              className="about-journey-accordion__button"
              id={headerId}
              onClick={() => onToggleStep(step.id)}
              type="button"
            >
              <span className="about-journey-accordion__heading">
                <span className="about-journey-accordion__title">
                  {step.number} {step.title}
                </span>
                <span className="about-journey-accordion__subtitle">
                  {step.accordionSubtitle}
                </span>
              </span>
              <span
                className="about-journey-accordion__toggle"
                aria-hidden="true"
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  aria-labelledby={headerId}
                  className="about-journey-accordion__panel"
                  exit={{ height: 0, opacity: 0, y: -4 }}
                  id={panelId}
                  initial={{ height: 0, opacity: 0, y: -4 }}
                  key={panelId}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  role="region"
                  transition={{
                    duration: prefersReducedMotion ? 0.01 : 0.46,
                    ease: [0.42, 0, 0.18, 1],
                  }}
                >
                  {step.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
