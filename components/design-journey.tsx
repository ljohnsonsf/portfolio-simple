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

type JourneyStepId = "medicine" | "sales" | "design";

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
  "M 66 326 C 124 286 174 270 252 258 C 322 247 351 232 386 188 C 423 141 467 103 570 76";

const fallbackPathPoints: Record<JourneyStepId, { x: number; y: number }> = {
  design: { x: 66, y: 326 },
  sales: { x: 302, y: 244 },
  medicine: { x: 570, y: 76 },
};

const journeySteps: JourneyStep[] = [
  {
    id: "medicine",
    number: "1.",
    title: "Healthcare",
    mapSubtitle: "Understanding people",
    accordionSubtitle: "Understanding people",
    body: [
      "Healthcare taught me to look beyond the immediate problem and pay attention to the broader context shaping someone’s experience.",
    ],
    pathProgress: 1,
  },
  {
    id: "sales",
    number: "2.",
    title: "Entrepreneurship",
    mapSubtitle: "Making things real",
    accordionSubtitle: "Making things real",
    body: [
      "Cult Cookies gave me an outlet for a kind of creativity I hadn’t found elsewhere. I developed the brand, flavors, physical space, and customer experience—and learned firsthand how much work it takes to turn an idea into something real.",
    ],
    pathProgress: 0.45,
  },
  {
    id: "design",
    number: "3.",
    title: "Sales",
    mapSubtitle: "Finding what could be better",
    accordionSubtitle: "Finding what could be better",
    body: [
      "Sales put me close to people trying to understand and use products. I became increasingly interested in the moments where things felt confusing, frustrating, or harder than they needed to be. That eventually led me to product design.",
    ],
    pathProgress: 0,
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
  if (progress > 0.76) {
    return fallbackPathPoints.medicine;
  }

  if (progress > 0.24) {
    return fallbackPathPoints.sales;
  }

  return fallbackPathPoints.design;
}

export function DesignJourney() {
  const [activeStep, setActiveStep] = useState<JourneyStepId>("medicine");
  const [openStep, setOpenStep] = useState<JourneyStepId | null>("medicine");

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
        My path into design moved through healthcare, entrepreneurship, and
        sales.
      </p>
      <p>
        The industries changed, but I kept coming back to the same questions:
        how people move through systems, where they get stuck, and what could
        work better.
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
  const previousProgressRef = useRef(stepsById.medicine.pathProgress);
  const [travelDirection, setTravelDirection] = useState(1);
  const prefersReducedMotion = usePrefersReducedMotion();
  const pathProgress = useMotionValue(stepsById.medicine.pathProgress);
  const mapLabelId = useId();

  const getPathPoint = (progress: number) => {
    const path = pathRef.current;

    if (!path || totalLengthRef.current === 0) {
      return closestFallbackPoint(progress);
    }

    const point = path.getPointAtLength(progress * totalLengthRef.current);
    return { x: point.x, y: point.y };
  };

  const boatX = useTransform(pathProgress, (progress) => getPathPoint(progress).x);
  const boatY = useTransform(pathProgress, (progress) => getPathPoint(progress).y);

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
        Interactive map of Lauren&apos;s path through Understanding people,
        Making things real, and Finding what could be better.
      </p>
      <div className="about-journey-map__canvas">
        <svg
          aria-hidden="true"
          className="about-journey-map__svg"
          viewBox="0 0 640 420"
        >
          <path
            ref={pathRef}
            className="about-journey-map__path"
            d={journeyPath}
          />
          <motion.g
            aria-hidden="true"
            className="about-journey-map__boat"
            style={{ x: boatX, y: boatY }}
          >
            <motion.g
              animate={{ scaleX: travelDirection }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
            >
              <BoatMarker />
            </motion.g>
          </motion.g>
        </svg>

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
    <g className="about-journey-boat" transform="translate(-4 -1)">
      <path
        d="M -3 -58 C 5 -48 13 -37 19 -24 C 11 -27 4 -28 -3 -27 Z"
        fill="var(--surface)"
      />
      <path
        d="M -6 -56 C -16 -46 -22 -35 -23 -24 C -16 -26 -10 -27 -6 -27 Z"
        fill="var(--surface)"
      />
      <path
        d="M -31 -22 C -18 -16 6 -15 29 -21 C 25 -12 16 -7 1 -6 C -14 -5 -26 -10 -31 -22 Z"
        fill="var(--surface)"
      />
      <path d="M -4 -59 L -4 -24" />
      <path d="M -23 -24 C -12 -21 9 -21 25 -23" />
      <path d="M -28 -12 C -16 -9 3 -8 21 -11" />
      <path d="M -31 2 C -24 -1 -18 3 -11 1 C -4 -2 2 2 9 0 C 16 -2 22 1 29 -1" />
      <path d="M -20 11 C -13 8 -7 11 0 9 C 6 7 12 10 19 8" />
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
