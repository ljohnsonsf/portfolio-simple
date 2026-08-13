import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { ArrowUpRight, Info } from "lucide-react";
import { DesignJourney } from "@/components/design-journey";
import { HoverImagePreview } from "@/components/hover-image-preview";
import { PageReveal } from "@/components/page-reveal";
import { profile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Lauren Johnson",
  description:
    "Lauren Johnson is a NYC-based Product Designer creating enterprise web and product experiences. She is currently a UX Web Design Intern at Commvault and pursuing an in M.S. Human-Computer Interaction.",
};

const timeline = [
  {
    date: "Fall 2026",
    title: "Incoming Product Design Intern",
    place: "Kara",
    hidden: true,
  },
  {
    date: "Summer 2026",
    title: "UX Design Intern",
    place: "Commvault",
  },
  {
    date: "August 2025 - December 2025",
    title: "Product Designer",
    place: "Learvo Learning",
  },
  {
    date: "March 2025 - December 2025",
    title: "Product Design Mentorship",
    place: "Atlassian",
  },
];

const educationTimeline = [
  {
    date: "Expected Spring 2027",
    title: "M.S. in Human-Computer Interaction",
    place: "SUNY Oswego, 3.9 GPA",
  },
  {
    date: "Graduated 2023",
    title: "B.S. in Public Health",
    place: "Santa Clara University",
  },
];

const values = [
  {
    title: "Growth Mindset",
    description: "I seek feedback, stay curious, and keep improving my craft.",
  },
  {
    title: "Scientific Approach",
    description:
      "I ground design decisions in proven principles, research, and data.",
  },
  {
    title: "Systems Thinking",
    description: "I look for patterns, workflows, and scalable solutions.",
  },
  {
    title: "Aesthetics",
    description:
      "I care about clarity, detail, and experiences that feel polished.",
  },
];

const toolkit = [
  {
    title: "Design & Prototyping",
    description:
      "Figma, FigJam, interactive prototyping, components, Auto Layout, variables, design systems",
  },
  {
    title: "Research & Testing",
    description: "User interviews, usability testing, surveys, Google Forms",
  },
  {
    title: "Product & Collaboration",
    description: "Jira, SmartSheet, Trello, Slack",
  },
  {
    title: "AI & Build Tools",
    description: "Codex, Claude, Cursor, Framer, Webflow, basic HTML/CSS",
  },
  {
    title: "Analytics & Behavior",
    description: "Google Analytics, Hotjar",
  },
];

const flowerPreviewImages = [
  "/flower-previews/flower-01.png",
  "/flower-previews/flower-02.png",
  "/flower-previews/flower-03.png",
  "/flower-previews/flower-04.png",
  "/flower-previews/flower-05.png",
  "/flower-previews/flower-06.png",
  "/flower-previews/flower-07.png",
  "/flower-previews/flower-08.png",
];

const countryPreviewImages = [
  "/travel-previews/travel-01.png",
  "/travel-previews/travel-02.png",
  "/travel-previews/travel-03.png",
  "/travel-previews/travel-04.png",
  "/travel-previews/travel-05.png",
  "/travel-previews/travel-06.png",
  "/travel-previews/travel-07.png",
  "/travel-previews/travel-08.png",
  "/travel-previews/travel-09.png",
  "/travel-previews/travel-10.png",
  "/travel-previews/travel-11.png",
  "/travel-previews/travel-12.png",
  "/travel-previews/travel-13.png",
  "/travel-previews/travel-14.png",
  "/travel-previews/travel-15.png",
  "/travel-previews/travel-16.png",
];

const mentorshipTooltipId = "product-design-mentorship-tooltip";
const mentorshipTooltipCopy =
  "An internal product design mentorship completed alongside my Sales Development Representative role.";

const mentorshipTooltipScript = `
(() => {
  const root = document.querySelector("[data-about-mentorship-tooltip]");

  if (!root || root.dataset.tooltipReady === "true") {
    return;
  }

  root.dataset.tooltipReady = "true";

  const trigger = root.querySelector("[data-about-mentorship-tooltip-trigger]");
  const tooltip = root.querySelector("[data-about-mentorship-tooltip-panel]");

  if (!(trigger instanceof HTMLButtonElement) || !(tooltip instanceof HTMLElement)) {
    return;
  }

  let clickOpen = false;
  let closeTimer = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const openTooltip = (isClickOpen = false) => {
    clickOpen = isClickOpen;
    window.clearTimeout(closeTimer);
    tooltip.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    window.requestAnimationFrame(() => {
      tooltip.dataset.state = "open";
    });
  };

  const closeTooltip = () => {
    clickOpen = false;
    tooltip.dataset.state = "closed";
    trigger.setAttribute("aria-expanded", "false");

    if (reducedMotion) {
      tooltip.hidden = true;
      return;
    }

    closeTimer = window.setTimeout(() => {
      if (tooltip.dataset.state !== "open") {
        tooltip.hidden = true;
      }
    }, 180);
  };

  trigger.addEventListener("mouseenter", () => openTooltip(false));
  root.addEventListener("mouseleave", () => {
    if (!clickOpen && document.activeElement !== trigger) {
      closeTooltip();
    }
  });

  trigger.addEventListener("focus", () => openTooltip(false));
  root.addEventListener("focusout", () => {
    window.setTimeout(() => {
      if (!root.contains(document.activeElement)) {
        closeTooltip();
      }
    }, 0);
  });

  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!tooltip.hidden && clickOpen) {
      closeTooltip();
      return;
    }

    openTooltip(true);
  });

  document.addEventListener("pointerdown", (event) => {
    const target = event.target;

    if (
      target instanceof Node &&
      !root.contains(target) &&
      !tooltip.contains(target)
    ) {
      closeTooltip();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !tooltip.hidden) {
      closeTooltip();
      trigger.focus();
    }
  });

})();
`;

export default function AboutPage() {
  return (
    <PageReveal className="page-block about-page">
      <style>
        {`
          .about-mentorship-info {
            display: inline-flex;
            position: relative;
            align-items: baseline;
            margin-left: 5px;
            vertical-align: baseline;
          }

          .about-mentorship-info__trigger {
            display: inline-grid;
            height: 18px;
            width: 18px;
            place-items: center;
            border: 1px solid var(--border-soft);
            border-radius: 999px;
            background: transparent;
            color: var(--primary);
            padding: 0;
            opacity: 0.62;
            transform: translateY(3px);
          }

          .about-mentorship-info__trigger:hover,
          .about-mentorship-info__trigger[aria-expanded="true"] {
            opacity: 1;
          }

          .about-mentorship-info__trigger:focus-visible {
            outline: 2px solid var(--primary);
            outline-offset: 3px;
            opacity: 1;
          }

          .about-mentorship-info__tooltip {
            position: absolute;
            top: 50%;
            left: calc(100% + 8px);
            z-index: 120;
            width: min(248px, calc(100vw - 24px));
            border: 1px solid var(--border-soft);
            border-radius: 8px;
            background: var(--surface);
            box-shadow:
              0 16px 38px rgba(48, 48, 48, 0.13),
              inset 0 1px 0 rgba(255, 255, 255, 0.5);
            padding: 11px 12px;
            color: var(--primary);
            font-size: 12px;
            font-weight: 400;
            line-height: 1.38;
            opacity: 0;
            pointer-events: none;
            transform: translate(4px, -50%);
            transition:
              opacity 160ms ease,
              transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
          }

          .about-mentorship-info__tooltip[data-state="open"] {
            opacity: 1;
            pointer-events: auto;
            transform: translate(0, -50%);
          }

          .about-mentorship-info__tooltip[hidden] {
            display: none;
          }

          [data-theme="dark"] .about-mentorship-info__tooltip {
            box-shadow:
              0 16px 38px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.08);
          }

          @media (max-width: 640px) {
            .about-mentorship-info__tooltip {
              top: calc(100% + 8px);
              left: 0;
              transform: translateY(4px);
            }

            .about-mentorship-info__tooltip[data-state="open"] {
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .about-mentorship-info__tooltip {
              transition: none;
            }
          }
        `}
      </style>
      <section className="about-hero" aria-labelledby="about-intro-title">
        <div className="about-hero__copy">
          <h1 id="about-intro-title">Hi, I&apos;m Lauren</h1>
          <p>
            I&apos;m fascinated by systems that balance complexity, taste and
            function, and the ever-evolving intersection of technology and
            humanity.
          </p>
        </div>

        <HoverImagePreview
          className="about-hero__flower"
          images={flowerPreviewImages}
          cycleDuration={250}
        >
          <Image
            src="/flower.png"
            alt=""
            width={365}
            height={365}
            priority
          />
          <div className="about-flower-note">
            <p>
              <em>I love</em> flowers.
              <br />
              Check out my favorite photos I&apos;ve taken.
            </p>
            <svg
              aria-hidden="true"
              viewBox="0 0 57 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.380108 58.6537C-0.0530856 58.9962 -0.126548 59.6251 0.21603 60.0583L5.79864 67.1177C6.14122 67.5509 6.77011 67.6243 7.20331 67.2818C7.6365 66.9392 7.70996 66.3103 7.36738 65.8771L2.40506 59.6021L8.68004 54.6398C9.11324 54.2972 9.1867 53.6683 8.84412 53.2351C8.50155 52.8019 7.87266 52.7285 7.43946 53.071L0.380108 58.6537ZM46.9932 0.328857L46.0488 0.657709C50.6098 13.7559 53.3763 24.3157 54.1454 32.69C54.9149 41.0681 53.6719 47.1094 50.3914 51.3272C47.1145 55.5403 41.6452 58.1379 33.4914 59.2644C25.3373 60.3909 14.644 60.025 1.11642 58.4448L1.0004 59.438L0.884377 60.4313C14.4635 62.0175 25.3572 62.4071 33.7651 61.2456C42.1733 60.084 48.2408 57.3499 51.9701 52.5551C55.6958 47.765 56.9283 41.1221 56.1371 32.507C55.3455 23.8881 52.5151 13.1457 47.9375 6.16227e-06L46.9932 0.328857Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </HoverImagePreview>
      </section>

      <section className="about-card about-background-card" aria-labelledby="about-background">
        <div className="about-card__copy">
          <p className="about-card__eyebrow">Experience</p>
          <h2 id="about-background">Where I&apos;ve been</h2>
          <p>
            Right now, I&apos;m a design intern at Commvault translating complex
            enterprise product workflows into clearer web visuals that help
            prospects understand product value capabilities faster.
          </p>
          <p>
            Meanwhile, I&apos;m pursuing my M.S. in Human-Computer Interaction
            at SUNY Oswego.
          </p>
          <a
            className="primary-button about-button"
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="View Lauren Johnson resume"
          >
            <span>View Resume</span>
            <ArrowUpRight aria-hidden="true" size={13} strokeWidth={1.8} />
          </a>
        </div>

        <ol className="about-timeline" aria-label="Lauren Johnson timeline">
          {timeline.filter((item) => !item.hidden).map((item) => (
            <li className="about-timeline__item" key={`${item.date}-${item.title}`}>
              <p className="about-timeline__date">{item.date}</p>
              <p className="about-timeline__title">
                {item.title}
                {item.title === "Product Design Mentorship" ? (
                  <span
                    className="about-mentorship-info"
                    data-about-mentorship-tooltip
                  >
                    <button
                      aria-controls={mentorshipTooltipId}
                      aria-describedby={mentorshipTooltipId}
                      aria-expanded="false"
                      aria-label="More information about the Product Design Mentorship."
                      className="about-mentorship-info__trigger"
                      data-about-mentorship-tooltip-trigger
                      type="button"
                    >
                      <Info aria-hidden="true" size={12} strokeWidth={2} />
                    </button>
                    <span
                      className="about-mentorship-info__tooltip"
                      data-about-mentorship-tooltip-panel
                      hidden
                      id={mentorshipTooltipId}
                      role="tooltip"
                    >
                      {mentorshipTooltipCopy}
                    </span>
                  </span>
                ) : null}
              </p>
              <p className="about-timeline__place">{item.place}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-card about-background-card" aria-labelledby="about-education">
        <div className="about-card__copy">
          <p className="about-card__eyebrow">Education</p>
          <h2 id="about-education">What I&apos;ve studied</h2>
          <p>
            My education connects human behavior, systems thinking, and
            interaction design.
          </p>
          <a
            className="primary-button about-button"
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Connect with Lauren Johnson on LinkedIn"
          >
            <span>Connect on LinkedIn</span>
            <ArrowUpRight aria-hidden="true" size={13} strokeWidth={1.8} />
          </a>
        </div>

        <ol className="about-timeline" aria-label="Lauren Johnson education timeline">
          {educationTimeline.map((item) => (
            <li className="about-timeline__item" key={`${item.date}-${item.title}`}>
              <p className="about-timeline__date">{item.date}</p>
              <p className="about-timeline__title">{item.title}</p>
              <p className="about-timeline__place">{item.place}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-card about-design-card" aria-label="Design details">
        <details className="about-design-journey">
          <summary className="about-design-card__summary">
            <span className="about-card__eyebrow">Design Journey</span>
            <span className="about-toolkit__toggle" aria-hidden="true" />
          </summary>

          <div className="about-design-card__content">
            <DesignJourney />
          </div>
        </details>

        <details className="about-design-values about-values-accordion">
          <summary>
            <span className="about-card__eyebrow">Values</span>
            <span className="about-toolkit__toggle" aria-hidden="true" />
          </summary>
          <div className="about-values__grid">
            {values.map(({ title, description }) => (
              <article className="about-value" key={title}>
                <div>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </details>

        <details className="about-toolkit">
          <summary>
            <span className="about-card__eyebrow">Toolkit</span>
            <span className="about-toolkit__toggle" aria-hidden="true" />
          </summary>
          <div className="about-toolkit__content">
            {toolkit.map(({ title, description }) => (
              <article className="about-toolkit__item" key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </details>
      </section>

      <section className="about-card about-going-card" aria-labelledby="about-going-title">
        <div className="about-going-card__heading">
          <p className="about-card__eyebrow">Looking Ahead</p>
          <h2 id="about-going-title">Where I&apos;m going</h2>
        </div>

        <div className="about-going-card__content">
          <div className="about-going-card__column">
            <h3>Professionally</h3>
            <p>
              I&apos;m currently seeking Product Design and UX Design
              opportunities, including full-time roles, New Grad 2027 roles,
              and Fall/Winter 2026 internships.
              <br />
              <br />
              I&apos;m completing my MS in HCI through Spring 2027.
            </p>
          </div>

          <div className="about-going-card__divider" aria-hidden="true" />

          <div
            className="about-going-card__column about-going-card__column--personal"
            aria-label="Personally"
          >
            <div className="about-going-card__personal-body">
              <p className="about-travel-feature__headline">
                I&apos;ve so far travelled to <strong>22 countries.</strong>
                <br />
                Next on my list is Brazil!
              </p>
              <HoverImagePreview
                className="about-travel-feature__window"
                images={countryPreviewImages}
                cycleDuration={250}
              >
                <img
                  src="/about/airplane-window.png"
                  alt="Line drawing of an airplane wing viewed through a window above clouds."
                  width={186}
                  height={266}
                />
              </HoverImagePreview>
              <p className="about-travel-feature__hint">
                hover to see where I&apos;ve been
              </p>
            </div>
          </div>
        </div>
      </section>

      <Script
        id="about-mentorship-tooltip-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: mentorshipTooltipScript }}
      />
    </PageReveal>
  );
}
