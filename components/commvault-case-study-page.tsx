import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Lightbulb,
  MessageCircleQuestion,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import {
  CaseStudyBody,
  CaseStudyHero,
  CaseStudyImageBlock,
  CaseStudyMetaBar,
  CaseStudyPageShell,
  CaseStudySection,
  CaseStudySummaryCard,
  CaseStudyTakeaways,
} from "@/components/case-study-detail";
import { CommvaultScrollVideo } from "@/components/commvault-scroll-video";
import type { CaseStudy } from "@/lib/case-studies";

type CommvaultCaseStudyPageProps = {
  study: CaseStudy;
};

type CommvaultCarouselImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type CommvaultProductStoryCarouselProps = {
  before: CommvaultCarouselImage;
  after: CommvaultCarouselImage;
  caption: string;
  toggleId: string;
};

type CommvaultProductStoryShowcaseItem = CommvaultProductStoryCarouselProps & {
  navLabel: string;
  selectorId: string;
};

function CommvaultAnnotatedAuditImages(): ReactElement {
  const mainImage = {
    label: "Light mode annotated screenshot",
    src: "/case-studies/commvault/annotated-audit-light.png",
    alt: "Light mode Commvault product screenshot annotated with issues around inconsistent presentation, unclear capability, competing metrics, navigation noise, and illegible chart details.",
    width: 3000,
    height: 2307,
  };

  const additionalImage = {
    label: "Dark mode annotated screenshot",
    src: "/case-studies/commvault/annotated-audit-dark.png",
    alt: "Dark mode Commvault product screenshot annotated with issues around inconsistent presentation, cut-off content, unclear primary action, and noisy table details.",
    width: 2481,
    height: 2274,
  };

  return (
    <>
      <figure className="case-study-image-block">
        <figcaption>
          Examples of previous product imagery on Commvault.com
        </figcaption>
        <div
          className="case-study-image-frame"
          style={{
            display: "grid",
            aspectRatio: "1.3 / 1",
            placeItems: "center",
            padding: "12px",
          }}
        >
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            width={mainImage.width}
            height={mainImage.height}
            sizes="(max-width: 900px) 100vw, 620px"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          <span className="sr-only">{mainImage.label}</span>
        </div>
      </figure>

      <details className="commvault-audit-extra">
        <summary>Additional audit example</summary>
        <div className="commvault-audit-extra__content">
          <div
            className="case-study-image-frame"
            style={{
              display: "grid",
              aspectRatio: "1.3 / 1",
              placeItems: "center",
              padding: "12px",
            }}
          >
            <Image
              src={additionalImage.src}
              alt={additionalImage.alt}
              width={additionalImage.width}
              height={additionalImage.height}
              sizes="(max-width: 900px) 100vw, 620px"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
            <span className="sr-only">{additionalImage.label}</span>
          </div>
          <p className="commvault-audit-extra__note">
            The source image was already cropped on Commvault.com; this was not
            a display error in the case study.
          </p>
        </div>
      </details>
    </>
  );
}

function CommvaultProductStoryCarousel({
  before,
  after,
  caption,
  toggleId,
}: CommvaultProductStoryCarouselProps): ReactElement {
  return (
    <figure className="case-study-image-block commvault-product-story-carousel">
      <figcaption>{caption}</figcaption>
      <input
        className="commvault-product-story-carousel__toggle"
        id={toggleId}
        type="checkbox"
        aria-label={`Toggle between the after and before ${caption} visuals`}
      />
      <label
        className="commvault-product-story-carousel__button"
        htmlFor={toggleId}
      >
        <span className="commvault-product-story-carousel__button-before">
          Click to see before
        </span>
        <span className="commvault-product-story-carousel__button-after">
          Click to see after
        </span>
      </label>
      <div className="commvault-product-story-carousel__slides">
        <div className="commvault-product-story-carousel__slide commvault-product-story-carousel__slide--after">
          <div
            className="case-study-image-frame commvault-product-story-carousel__frame"
            style={{
              overflow: "visible",
              border: 0,
              borderRadius: 0,
              background: "transparent",
              boxShadow: "none",
            }}
          >
            <Image
              src={after.src}
              alt={after.alt}
              width={after.width}
              height={after.height}
              sizes="(max-width: 900px) 100vw, 760px"
            />
          </div>
        </div>

        <div className="commvault-product-story-carousel__slide commvault-product-story-carousel__slide--before">
          <div
            className="case-study-image-frame commvault-product-story-carousel__frame"
            style={{
              overflow: "visible",
              border: 0,
              borderRadius: 0,
              background: "transparent",
              boxShadow: "none",
            }}
          >
            <Image
              src={before.src}
              alt={before.alt}
              width={before.width}
              height={before.height}
              sizes="(max-width: 900px) 100vw, 760px"
            />
          </div>
        </div>
      </div>
    </figure>
  );
}

function CommvaultProductStoryShowcase(): ReactElement {
  const items: CommvaultProductStoryShowcaseItem[] = [
    {
      selectorId: "commvault-story-set-data-insights",
      navLabel: "Data Insights",
      toggleId: "commvault-data-insights-toggle",
      caption: "Data Insights Dashboard",
      after: {
        src: "/case-studies/commvault/commvault-hero.png",
        alt: "Stylized Commvault data insights dashboard visual emphasizing key risk and sensitivity insights.",
        width: 2608,
        height: 1894,
      },
      before: {
        src: "/case-studies/commvault/product-story-before.png",
        alt: "Previous Commvault data insights screenshot shown inside a device mockup with dense dashboard information.",
        width: 2100,
        height: 1546,
      },
    },
    {
      selectorId: "commvault-story-set-manual-recovery",
      navLabel: "Manual Recovery",
      toggleId: "commvault-manual-recovery-toggle",
      caption: "Manual Recovery",
      after: {
        src: "/case-studies/commvault/manual-recovery-after.png",
        alt: "Stylized Commvault manual recovery visual emphasizing the recommended recovery point, available recovery times, and threat findings summary.",
        width: 4056,
        height: 2700,
      },
      before: {
        src: "/case-studies/commvault/manual-recovery-before.png",
        alt: "Previous Commvault manual recovery screenshot showing a recovery point workflow with calendar, recommendation banner, and threat findings table.",
        width: 1116,
        height: 935,
      },
    },
    {
      selectorId: "commvault-story-set-protection-status",
      navLabel: "Protection Status",
      toggleId: "commvault-protection-status-toggle",
      caption: "Protection Status",
      after: {
        src: "/case-studies/commvault/protection-status-after.png",
        alt: "Stylized Commvault protection status visual emphasizing discovered resources, total resources, total data, and protection analysis.",
        width: 2790,
        height: 1800,
      },
      before: {
        src: "/case-studies/commvault/protection-status-before.png",
        alt: "Previous Commvault protection status screenshot showing discovered resources and protection status metrics.",
        width: 1116,
        height: 924,
      },
    },
  ];

  return (
    <section
      className="commvault-product-story-showcase"
      aria-label="Clarifying the product story examples"
    >
      {items.map((item, index) => (
        <input
          className="commvault-product-story-showcase__selector"
          defaultChecked={index === 0}
          id={item.selectorId}
          key={item.selectorId}
          name="commvault-product-story-showcase"
          type="radio"
        />
      ))}

      <div
        className="commvault-product-story-showcase__controls"
        aria-label="Choose product story example"
      >
        {items.map((item) => (
          <label
            className="commvault-product-story-showcase__control"
            htmlFor={item.selectorId}
            key={item.selectorId}
          >
            {item.navLabel}
          </label>
        ))}
      </div>

      <div className="commvault-product-story-showcase__slides">
        {items.map((item, index) => (
          <div
            className={`commvault-product-story-showcase__slide commvault-product-story-showcase__slide--${index + 1}`}
            key={item.toggleId}
          >
            <CommvaultProductStoryCarousel
              toggleId={item.toggleId}
              caption={item.caption}
              after={item.after}
              before={item.before}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function CapabilityIdentificationChart(): ReactElement {
  const bars = [
    { label: "Stylized UI", value: 67 },
    { label: "Existing screenshots", value: 53 },
  ];

  return (
    <div
      aria-label="Correct product capability identification: stylized UI 67 percent, existing screenshots 53 percent."
      role="img"
      style={{
        display: "grid",
        gap: "16px",
        borderTop: "1px solid var(--border-soft)",
        marginTop: "24px",
        paddingTop: "24px",
      }}
    >
      <p
        style={{
          margin: 0,
          color: "var(--primary)",
          fontSize: "12px",
          fontWeight: 500,
          lineHeight: 1.2,
        }}
      >
        Correct product capability identification
      </p>
      <div style={{ display: "grid", gap: "14px" }}>
        {bars.map((bar) => (
          <div
            key={bar.label}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(124px, 170px) minmax(0, 1fr) 44px",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <span
              style={{
                color: "var(--primary)",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              {bar.label}
            </span>
            <span
              style={{
                display: "block",
                overflow: "hidden",
                height: "18px",
                border: "1px solid var(--border-soft)",
                borderRadius: "999px",
                background: "var(--surface-muted)",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: `${bar.value}%`,
                  height: "100%",
                  borderRadius: "inherit",
                  background:
                    bar.label === "Stylized UI"
                      ? "var(--primary)"
                      : "var(--secondary)",
                }}
              />
            </span>
            <strong
              style={{
                color: "var(--primary)",
                fontSize: "13px",
                fontWeight: 500,
                lineHeight: 1,
                textAlign: "right",
              }}
            >
              {bar.value}%
            </strong>
          </div>
        ))}
      </div>
      <p
        style={{
          margin: "0",
          color: "var(--secondary)",
          fontSize: "12px",
          fontWeight: 400,
          lineHeight: 1.35,
        }}
      >
        Percentage of image evaluations in which participants selected the
        intended capability.
      </p>
    </div>
  );
}

function InformationBalanceChart(): ReactElement {
  const rows = [
    {
      label: "Stylized UI",
      segments: [
        { label: "Too little", value: 13, color: "#d8d8d8" },
        { label: "Just right", value: 83, color: "#969696" },
        { label: "Too much", value: 4, color: "#303030" },
      ],
    },
    {
      label: "Existing screenshots",
      segments: [
        { label: "Too little", value: 28, color: "#d8d8d8" },
        { label: "Just right", value: 56, color: "#969696" },
        { label: "Too much", value: 16, color: "#303030" },
      ],
    },
  ];

  return (
    <div
      aria-label="Perceived amount of information. Existing screenshots: too little 28 percent, just right 56 percent, too much 16 percent. Stylized UI: too little 13 percent, just right 83 percent, too much 4 percent."
      role="img"
      style={{
        display: "grid",
        gap: "16px",
        borderTop: "1px solid var(--border-soft)",
        marginTop: "24px",
        paddingTop: "24px",
      }}
    >
      <p
        style={{
          margin: 0,
          color: "var(--primary)",
          fontSize: "12px",
          fontWeight: 500,
          lineHeight: 1.2,
        }}
      >
        Perceived amount of information
      </p>
      <div style={{ display: "grid", gap: "18px" }}>
        {rows.map((row) => (
          <div key={row.label} style={{ display: "grid", gap: "9px" }}>
            <span
              style={{
                color: "var(--primary)",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              {row.label}
            </span>
            <div
              style={{
                display: "flex",
                overflow: "hidden",
                height: "22px",
                border: "1px solid var(--border-soft)",
                borderRadius: "999px",
                background: "var(--surface-muted)",
              }}
            >
              {row.segments.map((segment) => (
                <span
                  key={segment.label}
                  title={`${segment.label}: ${segment.value}%`}
                  style={{
                    display: "block",
                    width: `${segment.value}%`,
                    background: segment.color,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: row.segments
                  .map((segment) => `${segment.value}fr`)
                  .join(" "),
                overflow: "visible",
              }}
            >
              {row.segments.map((segment) => (
                <span
                  key={segment.label}
                  style={{
                    color: "var(--secondary)",
                    fontSize: "11px",
                    fontWeight: 400,
                    justifySelf: "center",
                    lineHeight: 1.25,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {segment.label}: {segment.value}%
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CommvaultCaseStudyPage({
  study,
}: CommvaultCaseStudyPageProps): ReactElement {
  const metaItems = [
    {
      label: "Timeline",
      value: "8 weeks",
    },
    {
      label: "Role",
      value: "UX Design Intern",
    },
    {
      label: "Project Type",
      value: "Internship",
    },
    {
      label: "Team",
      value: (
        <>
          Me
          <br />
          1 Senior Designer
          <br />
          2 Developers
        </>
      ),
    },
    {
      label: "Year",
      value: "2026",
    },
  ];

  const sectionLinks = [
    { label: "Overview", href: "#case-study-title" },
    { label: "Mission", href: "#overview" },
    { label: "Problem", href: "#problem" },
    { label: "Audit", href: "#research" },
    { label: "Constraints", href: "#solution" },
    { label: "Decisions", href: "#flows" },
    { label: "Validation", href: "#validation" },
    { label: "Outcomes", href: "#impact" },
    { label: "Takeaways", href: "#reflection" },
  ];

  const summaryCards = [
    {
      title: "My Role",
      description:
        "Owned the website image audit, communication strategy, UI abstraction, pilot designs, and reusable Figma system.",
    },
    {
      title: "Challenge",
      description:
        "The solution needed to simplify complex enterprise workflows without misrepresenting the product or becoming another maintenance burden.",
    },
    {
      title: "Approach",
      description:
        "Audited 70+ placements, established abstraction and presentation standards, redesigned five pilot assets, and built reusable components for broader adoption.",
    },
    {
      title: "Outcome",
      description: (
        <>
          Participants were <strong>25% more likely</strong> to identify the
          intended product capability from the stylized UI than from the
          original screenshots.
        </>
      ),
    },
  ];

  const problemCards = [
    {
      title: "Product Context",
      description:
        "Commvault helps organizations protect, manage, and recover data across cloud, SaaS, and on-premises environments.",
    },
    {
      title: "Core Issue",
      description:
        "Prospective customers had to interpret dense interfaces to understand individual capabilities, while the web team lacked a consistent and maintainable way to present product imagery.",
    },
  ];

  const auditFindings = [
    {
      title: "Screenshots communicated too much",
      description:
        "Navigation, controls, tables, and technical data competed with the capability each page was intended to explain.",
    },
    {
      title: "Important details became unreadable",
      description:
        "Full-screen interfaces were reduced to fit website modules, making labels and data difficult to read.",
    },
    {
      title: "Presentation was inconsistent and difficult to maintain",
      description:
        "Screenshots varied in framing, scale, cropping, and device treatment, and quickly became outdated when the product UI changed.",
    },
  ];

  const outcomeCards = [
    {
      number: "01",
      title: "Validated Comprehension",
      description: (
        <>
          Stylized UI produced{" "}
          <strong>25% higher capability identification</strong> than the
          existing screenshots in a directional comparison study.
        </>
      ),
    },
    {
      number: "02",
      title: "Approved Direction",
      description:
        "Five pilot visuals and the supporting system received department and executive approval for broader use.",
    },
    {
      number: "03",
      title: "Reduced Maintenance Burden",
      description:
        "The system created a more durable approach for 70+ potential placements, reducing dependence on screenshots that require replacement whenever the product UI changes.",
    },
  ];

  const takeaways = [
    {
      title:
        "Simplification is an information-design decision, not just a visual one.",
      description:
        "The strongest visuals focused attention on one capability while preserving enough product context to remain accurate and credible.",
    },
    {
      title: "More information can create confidence without comprehension.",
      description:
        "Participants viewing the raw screenshots felt more confident despite identifying the intended capability less accurately. This reinforced the importance of measuring what users actually understand, not only how clear a visual feels.",
    },
    {
      title:
        "Scalability requires components, rules, and lifecycle thinking.",
      description:
        "Reusable components created consistency, while abstraction guidelines helped preserve product accuracy and reduce reliance on screenshots that can quickly become outdated.",
    },
  ];

  return (
    <CaseStudyPageShell links={sectionLinks}>
      <style>
        {`
          .case-study-detail-page:has(.case-study-hero__logo--commvault) .case-study-hero__media {
            overflow: visible;
            border: 0;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
          }

          .case-study-guided-row .commvault-validation-callout {
            font-size: 17px;
            line-height: 1.18;
          }

          .commvault-product-story-carousel {
            gap: 0;
          }

          .case-study-summary-grid--commvault-mission {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .case-study-summary-grid--commvault-mission
            .case-study-summary-card
            p
            strong {
            display: inline;
            margin: 0;
            color: inherit;
            font-size: inherit;
            font-weight: 600;
            line-height: inherit;
          }

          .case-study-section--problem .commvault-problem-copy {
            padding-top: 22px;
          }

          .commvault-product-story-showcase {
            display: grid;
            gap: 14px;
          }

          .commvault-product-story-showcase__selector {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip: rect(0 0 0 0);
            white-space: nowrap;
            clip-path: inset(50%);
          }

          .commvault-product-story-showcase__controls {
            display: flex;
            flex-wrap: wrap;
            gap: 12px 18px;
            margin-top: 4px;
          }

          .commvault-product-story-showcase__control {
            border-bottom: 1px solid transparent;
            color: var(--secondary);
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            line-height: 1.2;
            padding-bottom: 4px;
            transition:
              border-color 180ms ease,
              color 180ms ease;
          }

          .commvault-product-story-showcase__control:hover {
            color: var(--primary);
          }

          #commvault-story-set-data-insights:focus-visible
            ~ .commvault-product-story-showcase__controls
            label[for="commvault-story-set-data-insights"],
          #commvault-story-set-manual-recovery:focus-visible
            ~ .commvault-product-story-showcase__controls
            label[for="commvault-story-set-manual-recovery"],
          #commvault-story-set-protection-status:focus-visible
            ~ .commvault-product-story-showcase__controls
            label[for="commvault-story-set-protection-status"] {
            outline: 2px solid var(--primary);
            outline-offset: 4px;
          }

          #commvault-story-set-data-insights:checked
            ~ .commvault-product-story-showcase__controls
            label[for="commvault-story-set-data-insights"],
          #commvault-story-set-manual-recovery:checked
            ~ .commvault-product-story-showcase__controls
            label[for="commvault-story-set-manual-recovery"],
          #commvault-story-set-protection-status:checked
            ~ .commvault-product-story-showcase__controls
            label[for="commvault-story-set-protection-status"] {
            border-color: currentColor;
            color: var(--primary);
          }

          .commvault-product-story-showcase__slides {
            display: grid;
            min-width: 0;
            position: relative;
          }

          .commvault-product-story-showcase__slide {
            grid-area: 1 / 1;
            opacity: 0;
            pointer-events: none;
            position: absolute;
            transform: translateX(8px);
            transition:
              opacity 180ms ease,
              transform 180ms ease;
            width: 100%;
          }

          #commvault-story-set-data-insights:checked
            ~ .commvault-product-story-showcase__slides
            .commvault-product-story-showcase__slide--1,
          #commvault-story-set-manual-recovery:checked
            ~ .commvault-product-story-showcase__slides
            .commvault-product-story-showcase__slide--2,
          #commvault-story-set-protection-status:checked
            ~ .commvault-product-story-showcase__slides
            .commvault-product-story-showcase__slide--3 {
            opacity: 1;
            pointer-events: auto;
            position: relative;
            transform: translateX(0);
          }

          .commvault-product-story-carousel
            + .commvault-product-story-carousel {
            margin-top: -12px;
          }

          .commvault-product-story-carousel__toggle {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip: rect(0 0 0 0);
            white-space: nowrap;
            clip-path: inset(50%);
          }

          .commvault-product-story-carousel__slides {
            display: grid;
            margin-top: 18px;
            min-width: 0;
            position: relative;
          }

          .commvault-product-story-carousel__slide {
            display: grid;
            grid-area: 1 / 1;
            gap: 10px;
            inset: 0;
            opacity: 0;
            pointer-events: none;
            position: absolute;
            transform: translateX(8px);
            transition:
              opacity 180ms ease,
              transform 180ms ease;
            width: 100%;
          }

          .commvault-product-story-carousel__slide--after {
            opacity: 1;
            pointer-events: auto;
            position: relative;
            transform: translateX(0);
          }

          .commvault-product-story-carousel__frame img {
            width: 100%;
          }

          .commvault-product-story-carousel__slide--after
            .commvault-product-story-carousel__frame img {
            width: 84%;
            margin-inline: auto;
          }

          .commvault-product-story-carousel:has(#commvault-manual-recovery-toggle)
            .commvault-product-story-carousel__slide--before
            .commvault-product-story-carousel__frame img,
          .commvault-product-story-carousel:has(#commvault-protection-status-toggle)
            .commvault-product-story-carousel__slide--before
            .commvault-product-story-carousel__frame img {
            width: 67%;
            margin-inline: auto;
          }

          .commvault-product-story-carousel__button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            justify-self: start;
            margin-top: 6px;
            border: 0;
            background: transparent;
            color: var(--secondary);
            cursor: pointer;
            font-size: 12px;
            font-style: italic;
            font-weight: 500;
            line-height: 1;
            opacity: 0.72;
            padding: 0;
            transition:
              color 180ms ease,
              opacity 180ms ease;
          }

          .commvault-product-story-carousel__button:hover {
            color: var(--primary);
            opacity: 1;
          }

          .commvault-product-story-carousel__toggle:focus-visible
            ~ .commvault-product-story-carousel__button {
            outline: 2px solid var(--primary);
            outline-offset: 3px;
          }

          .commvault-product-story-carousel__button-after {
            display: none;
          }

          .commvault-product-story-carousel__toggle:checked
            ~ .commvault-product-story-carousel__slides
            .commvault-product-story-carousel__slide--after {
            opacity: 0;
            pointer-events: none;
            position: absolute;
            transform: translateX(-8px);
          }

          .commvault-product-story-carousel__toggle:checked
            ~ .commvault-product-story-carousel__slides
            .commvault-product-story-carousel__slide--before {
            opacity: 1;
            pointer-events: auto;
            position: relative;
            transform: translateX(0);
          }

          .commvault-product-story-carousel__toggle:checked
            ~ .commvault-product-story-carousel__button
            .commvault-product-story-carousel__button-before {
            display: none;
          }

          .commvault-product-story-carousel__toggle:checked
            ~ .commvault-product-story-carousel__button
            .commvault-product-story-carousel__button-after {
            display: inline;
          }

          .commvault-audit-extra {
            border: 1px solid var(--border-soft);
            border-radius: var(--card-radius);
            background: rgba(255, 255, 255, 0.1);
            overflow: hidden;
          }

          .commvault-audit-extra summary {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            cursor: pointer;
            color: var(--primary);
            font-size: 13px;
            font-weight: 500;
            line-height: 1.2;
            list-style: none;
            padding: 16px 18px;
          }

          .commvault-audit-extra summary::-webkit-details-marker {
            display: none;
          }

          .commvault-audit-extra summary::after {
            content: "+";
            color: var(--secondary);
            font-size: 16px;
            font-weight: 400;
            line-height: 1;
          }

          .commvault-audit-extra[open] summary {
            border-bottom: 1px solid var(--border-soft);
          }

          .commvault-audit-extra[open] summary::after {
            content: "-";
          }

          .commvault-audit-extra__content {
            display: grid;
            gap: 10px;
            padding: 16px;
          }

          .commvault-audit-extra__note {
            margin: 0;
            color: var(--secondary);
            font-size: 12px;
            font-style: italic;
            font-weight: 400;
            line-height: 1.35;
          }

          @media (max-width: 640px) {
            .case-study-summary-grid--commvault-mission {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
      <CaseStudyHero
        title="Designing for Clarity at Scale"
        logo={{
          src: "/previews/commvault-logo.png",
          alt: "Commvault",
          width: 1552,
          height: 300,
          className: "case-study-hero__logo--commvault",
        }}
        copy={[
          "Commvault helps organizations protect, secure, and recover data across cloud, SaaS, and on-premises environments.",
          "I created a reusable product-visual system that helped prospective customers understand complex enterprise capabilities while reducing reliance on quickly outdated screenshots.",
        ]}
        image={{
          src: "/case-studies/commvault/commvault-hero.png",
          alt: "Stylized Commvault data insights dashboard with sensitivity charts and risk visualizations.",
          width: 2608,
          height: 1894,
        }}
      >
        <CaseStudyMetaBar items={metaItems} />
      </CaseStudyHero>

      <CaseStudyBody>
        <CaseStudySection
          id="overview"
          number={
            <>
              01 <span>Project Overview</span>
            </>
          }
          className="case-study-section--commvault-mission"
          title="Commvault needed a clearer and more durable way to represent its product online."
          copy="My mission was to create a standardized product-communication system that could focus each visual on one capability, remain recognizable to the real product, and scale across 70+ placements on Commvault.com."
        >
          <div className="case-study-summary-grid case-study-summary-grid--commvault-mission">
            {summaryCards.map((card) => (
              <CaseStudySummaryCard
                description={card.description}
                key={card.title}
                title={card.title}
              />
            ))}
          </div>
        </CaseStudySection>

        <section
          className="case-study-section case-study-section--problem"
          id="problem"
          aria-labelledby="problem-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number" id="problem-heading">
              02 <span>Understanding the Problem</span>
            </p>
            <p className="commvault-problem-copy">
              Commvault used a mix of raw screenshots, tightly cropped
              interfaces, and device mockups. The inconsistency made
              capabilities harder to understand and required frequent updates as
              the product evolved.
            </p>
          </div>
          <div className="case-study-problem">
            <div className="case-study-problem__cards">
              {problemCards.map((card) => (
                <article className="case-study-context-card" key={card.title}>
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </article>
              ))}
              <article className="case-study-hmw-card">
                <h4>How might we...</h4>
                <p>
                  How might we make complex product capabilities easier to
                  understand without depending on frequently replaced
                  screenshots?
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          className="case-study-section case-study-section--audit"
          id="research"
          aria-labelledby="research-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              03 <span>Website Image Audit to Define Project Scope</span>
            </p>
            <p>
              I audited 70+ product-image placements across Commvault.com,
              evaluating each image for message clarity, readability,
              consistency, product accuracy, and maintenance risk.
            </p>
          </div>

          <div className="case-study-audit">
            <h2 id="research-heading">Key findings</h2>
            <ol className="case-study-findings">
              {auditFindings.map((finding) => (
                <li key={finding.title}>
                  <strong>{finding.title}</strong>
                  <span>{finding.description}</span>
                </li>
              ))}
            </ol>

            <CommvaultAnnotatedAuditImages />
          </div>
        </section>

        <section
          className="case-study-section case-study-section--constraints"
          id="solution"
          aria-labelledby="solution-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              04 <span>Design Constraints</span>
            </p>
            <h2 id="solution-heading">Design Constraints</h2>
            <p>
              The system needed to balance product accuracy with communication
              clarity while remaining reusable as the interface evolved.
            </p>
          </div>

          <div className="case-study-constraints">
            <div className="case-study-constraint-grid">
              <article className="case-study-constraint-card">
                <h3>Simplify without misrepresenting</h3>
                <ul>
                  <li>
                    Preserve recognizable workflows, relationships, and
                    terminology.
                  </li>
                  <li>
                    Remove only details unrelated to the intended capability.
                  </li>
                  <li>
                    Avoid implying interactions or functionality that did not
                    exist.
                  </li>
                </ul>
              </article>
              <article className="case-study-constraint-card">
                <h3>Design for scale and change</h3>
                <ul>
                  <li>
                    Support 70+ placements across multiple product areas.
                  </li>
                  <li>
                    Avoid dependence on interface details likely to change.
                  </li>
                  <li>
                    Make components and guidelines reusable by other teams.
                  </li>
                </ul>
              </article>
            </div>
            <p className="case-study-constraint-takeaway">
              Rather than redesigning each screenshot independently, I created
              an abstraction framework and modular Figma system that preserved
              product accuracy while making visuals clearer, more consistent,
              and easier to maintain.
            </p>
          </div>
        </section>

        <section
          className="case-study-section case-study-section--responses"
          id="flows"
          aria-labelledby="flows-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              05 <span>Design Responses to Key Findings</span>
            </p>
            <h2 id="flows-heading">Design Responses to Key Findings</h2>
            <p>
              <strong>
                I focused on three connected solutions that improved product
                comprehension while making the system scalable, accurate, and
                easier for the web team to maintain.
              </strong>
            </p>
          </div>

          <div className="case-study-responses">
            <article className="case-study-guided-card">
              <p className="case-study-guided-card__label">01</p>
              <h3>Clarifying the Product Story</h3>

              <div className="case-study-guided-row">
                <div className="case-study-guided-row__marker" aria-hidden="true">
                  <TriangleAlert size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h4>Problem</h4>
                  <p>
                    Raw screenshots presented the full product interface even
                    when the page was communicating one specific capability.
                    Secondary controls, navigation, and technical data competed
                    with the intended message and made it difficult to identify
                    what mattered most.
                  </p>
                </div>
              </div>

              <div className="case-study-guided-row">
                <div className="case-study-guided-row__marker" aria-hidden="true">
                  <Lightbulb size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h4>Decision</h4>
                  <p>
                    I redesigned each visual around a single communication goal,
                    emphasizing the product action or insight tied to the
                    page&apos;s value proposition while simplifying or removing
                    details that did not support it.
                  </p>
                </div>
              </div>

              <div className="case-study-guided-row">
                <div className="case-study-guided-row__marker" aria-hidden="true">
                  <MessageCircleQuestion size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h4>Justification</h4>
                  <p>
                    Marketing visuals do not need to explain the entire
                    interface. They need to provide enough recognizable product
                    context to communicate one capability clearly and credibly.
                    This approach preserved the meaning of the product
                    experience while reducing unnecessary visual complexity.
                  </p>
                </div>
              </div>
            </article>

            <CommvaultProductStoryShowcase />

            <article className="case-study-guided-card">
              <p className="case-study-guided-card__label">02</p>
              <h3>Building a Scalable Visual System</h3>

              <div className="case-study-guided-row">
                <div className="case-study-guided-row__marker" aria-hidden="true">
                  <TriangleAlert size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h4>Problem</h4>
                  <p>
                    Redesigning every product image independently would create a
                    new version of the same maintenance problem. Repeated
                    interface patterns would need to be rebuilt, and visual
                    decisions could become inconsistent across products and
                    pages.
                  </p>
                </div>
              </div>

              <div className="case-study-guided-row">
                <div className="case-study-guided-row__marker" aria-hidden="true">
                  <Lightbulb size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h4>Decision</h4>
                  <p>
                    I created a modular Figma system with reusable components,
                    templates, and layout patterns for common product elements
                    such as navigation, cards, tables, charts, filters, labels,
                    and status indicators.
                  </p>
                </div>
              </div>

              <div className="case-study-guided-row">
                <div className="case-study-guided-row__marker" aria-hidden="true">
                  <MessageCircleQuestion size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h4>Justification</h4>
                  <p>
                    Standardizing recurring patterns made the process faster and
                    more consistent while still allowing each visual to
                    communicate a different capability. The system also gave the
                    web team a shared foundation for creating and updating
                    future assets without starting from scratch.
                  </p>
                </div>
              </div>
            </article>

            <figure className="case-study-image-block">
              <figcaption>
                A reusable component system designed to support 70+
                product-image placements
              </figcaption>
              <div className="case-study-video-placeholder case-study-video-placeholder--video">
                <CommvaultScrollVideo
                  src="/case-studies/commvault/scalable-visual-system.mp4"
                  label="Commvault reusable component system walkthrough"
                  playbackRate={1.5}
                />
              </div>
            </figure>

            <article className="case-study-guided-card">
              <p className="case-study-guided-card__label">03</p>
              <h3>Standardizing Product Representation at Scale</h3>

              <div className="case-study-guided-row">
                <div className="case-study-guided-row__marker" aria-hidden="true">
                  <TriangleAlert size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h4>Problem</h4>
                  <p>
                    Simplifying complex interfaces without shared guidance
                    could produce visuals that were inconsistent, misleading, or
                    difficult for other designers to recreate and maintain.
                  </p>
                </div>
              </div>

              <div className="case-study-guided-row">
                <div className="case-study-guided-row__marker" aria-hidden="true">
                  <Lightbulb size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h4>Decision</h4>
                  <p>
                    I documented a complete usage framework for the system,
                    including design principles, abstraction rules,
                    product-accuracy requirements, creation workflows, and
                    visual specifications. Together, these guidelines defined
                    when to use the system, what information to preserve or
                    remove, and how future assets should be constructed and
                    reviewed.
                  </p>
                </div>
              </div>

              <div className="case-study-guided-row">
                <div className="case-study-guided-row__marker" aria-hidden="true">
                  <MessageCircleQuestion size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h4>Justification</h4>
                  <p>
                    Reusable components alone could standardize the appearance
                    of the visuals, but not the decisions behind them. Combining
                    the Figma library with shared principles and specifications
                    helped preserve product accuracy, create consistency across
                    teams, and make the system easier to scale responsibly.
                  </p>
                </div>
              </div>
            </article>

            <CaseStudyImageBlock
              caption="A shared framework for creating clear, consistent, and accurate product visuals"
              image={{
                src: "/case-studies/commvault/abstraction-framework-guide.png",
                alt: "Commvault product UI abstraction framework guide showing usage guidance, principles, examples, and styling documentation.",
                width: 2650,
                height: 1462,
              }}
            />
          </div>
        </section>

        <section
          className="case-study-section case-study-section--responses"
          id="validation"
          aria-labelledby="validation-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              06 <span>Validating the Direction</span>
            </p>
            <h2 id="validation-heading">Validating the Direction</h2>
            <p>
              After creating the stylized visuals, I tested whether users would
              actually experience greater comprehension viewing the stylized vs.
              original images.
            </p>
          </div>

          <div className="case-study-responses">
            <aside className="case-study-takeaway">
              <h3>Study setup</h3>
              <p>
                Fourteen participants were split into two groups: half viewed
                the existing product screenshots, while half viewed the
                corresponding stylized UI. Each participant evaluated four
                visuals using identical questions, producing 56 total image
                evaluations.
              </p>
            </aside>

            <article className="case-study-guided-card">
              <p className="case-study-guided-card__label">Finding 01</p>
              <h3>Stylized UI improved capability identification</h3>

              <div className="case-study-guided-row">
                <div className="case-study-guided-row__marker" aria-hidden="true">
                  <TrendingUp size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h4 className="commvault-validation-callout">
                    25% higher correct capability identification
                  </h4>
                  <p>
                    Participants viewing the stylized UI correctly identified
                    the intended capability in <strong>67% of tasks</strong>,
                    compared with{" "}
                    <strong>53% for the existing screenshots</strong> - a
                    13.5-percentage-point increase, or a 25% relative
                    improvement.
                  </p>
                </div>
              </div>
              <CapabilityIdentificationChart />
            </article>

            <article className="case-study-guided-card">
              <p className="case-study-guided-card__label">Finding 02</p>
              <h3>The information felt better balanced</h3>

              <div className="case-study-guided-row">
                <div className="case-study-guided-row__marker" aria-hidden="true">
                  <Lightbulb size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h4 className="commvault-validation-callout">
                    83% &ldquo;just right&rdquo;
                  </h4>
                  <p>
                    Participants rated the amount of information as &ldquo;just
                    right&rdquo; in{" "}
                    <strong>83% of stylized-UI evaluations</strong>, compared
                    with{" "}
                    <strong>56% of existing-screenshot evaluations</strong>.
                  </p>
                  <p style={{ marginTop: "14px" }}>
                    This suggested that the new visuals removed distracting
                    detail without leaving most participants feeling that
                    important information was missing.
                  </p>
                </div>
              </div>
              <InformationBalanceChart />
            </article>

            <aside className="case-study-takeaway">
              <h3>Interesting data note</h3>
              <p>
                Confidence did not reflect comprehension. Participants viewing
                the raw screenshots reported higher confidence that they knew
                what the image was trying to communicate (3.4/5) despite
                achieving lower capability identification (53%). This suggests
                that dense visuals can create a sense of understanding without
                improving actual comprehension.
              </p>
            </aside>
          </div>
        </section>

        <CaseStudySection
          className="case-study-section--aws-outcomes"
          id="impact"
          number="07"
          title="Outcomes"
          copy="Although the broader rollout is still in progress, the project established a validated and approved direction for communicating complex product capabilities across Commvault.com."
        >
          <div className="case-study-outcome-grid">
            {outcomeCards.map((card) => (
              <article className="case-study-outcome-card" key={card.number}>
                <p>{card.number}</p>
                <h3>{card.title}</h3>
                <span aria-hidden="true" />
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </CaseStudySection>

        <section
          className="case-study-section case-study-section--responses"
          id="reflection"
          aria-labelledby="reflection-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              08 <span>Takeaways</span>
            </p>
            <h2 id="reflection-heading">Takeaways</h2>
          </div>
          <CaseStudyTakeaways takeaways={takeaways} />
        </section>

        <div className="case-study-next-action">
          <Link
            className="primary-button case-study-next-button"
            href="/work/learvo-learning"
          >
            <span>View Next Case Study</span>
            <ArrowRight aria-hidden="true" size={14} strokeWidth={1.8} />
          </Link>
        </div>
      </CaseStudyBody>
    </CaseStudyPageShell>
  );
}
