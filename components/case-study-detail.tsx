import type { ReactNode } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { CaseStudySideNav } from "@/components/case-study-side-nav";
import { PageReveal } from "@/components/page-reveal";

type CaseStudyHeroProps = {
  title: string;
  copy: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  children?: ReactNode;
};

type CaseStudyMetaItem = {
  label: string;
  value: string;
  note?: string;
};

type CaseStudySectionProps = {
  id: string;
  number: string;
  title: string;
  copy: string;
  className?: string;
  children?: ReactNode;
};

type CaseStudySummaryCardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  value?: string;
};

export type CaseStudySideNavItem = {
  label: string;
  href: string;
};

type CaseStudyPageShellProps = {
  links: CaseStudySideNavItem[];
  children: ReactNode;
};

type CaseStudyBodyProps = {
  children: ReactNode;
};

type CaseStudyImageBlockProps = {
  caption: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  placeholderLabel?: string;
};

type CaseStudyProcessStep = {
  number: string;
  title: string;
  details: string[];
};

type CaseStudyOutcomeCard = {
  number: string;
  title: string;
  description: string;
};

type CaseStudyTakeaway = {
  title: string;
  description: string;
};

export function CaseStudyPageShell({
  links,
  children,
}: CaseStudyPageShellProps) {
  return (
    <>
      <CaseStudySideNav links={links} />
      <PageReveal className="page-block case-study-page-block">
        <article className="case-study-detail-page">{children}</article>
      </PageReveal>
    </>
  );
}

export function CaseStudyBody({ children }: CaseStudyBodyProps) {
  return (
    <div className="case-study-body">
      <div className="case-study-content">{children}</div>
    </div>
  );
}

export function CaseStudyHero({
  title,
  copy,
  image,
  children,
}: CaseStudyHeroProps) {
  return (
    <header className="case-study-hero-wrap">
      <section className="case-study-hero" aria-labelledby="case-study-title">
        <div className="case-study-hero__copy">
          <h1 id="case-study-title">{title}</h1>
          {copy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {children ? (
            <>
              <div className="case-study-hero__rule" aria-hidden="true" />
              {children}
            </>
          ) : null}
        </div>

        <div className="case-study-hero__media">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
          />
        </div>
      </section>
    </header>
  );
}

export function CaseStudyMetaBar({ items }: { items: CaseStudyMetaItem[] }) {
  return (
    <dl className="case-study-meta-bar" aria-label="Project metadata">
      {items.map(({ label, value, note }) => (
        <div
          className={`case-study-meta-bar__item case-study-meta-bar__item--${label
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
          key={label}
        >
          <dt>{label}</dt>
          <dd>{value}</dd>
          {note ? <p className="case-study-meta-bar__note">{note}</p> : null}
        </div>
      ))}
    </dl>
  );
}

export function CaseStudySection({
  id,
  number,
  title,
  copy,
  className,
  children,
}: CaseStudySectionProps) {
  return (
    <section
      className={["case-study-section", className].filter(Boolean).join(" ")}
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <div className="case-study-section__intro">
        <p className="case-study-section__number">{number}</p>
        <h2 id={`${id}-heading`}>{title}</h2>
        <p>{copy}</p>
      </div>
      {children}
    </section>
  );
}

export function CaseStudySummaryCard({
  title,
  description,
  icon: Icon,
  value,
}: CaseStudySummaryCardProps) {
  return (
    <article className="case-study-summary-card">
      {Icon ? (
        <div className="case-study-summary-card__icon" aria-hidden="true">
          <Icon size={18} strokeWidth={1.7} />
        </div>
      ) : null}
      <h3>{title}</h3>
      {value ? <strong>{value}</strong> : null}
      <p>{description}</p>
    </article>
  );
}

export function CaseStudyImageBlock({
  caption,
  image,
  placeholderLabel = "Case study image placeholder",
}: CaseStudyImageBlockProps) {
  return (
    <figure className="case-study-image-block">
      <figcaption>{caption}</figcaption>
      {image ? (
        <div className="case-study-image-frame">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
        </div>
      ) : (
        <div className="case-study-image-placeholder" aria-label={placeholderLabel} />
      )}
    </figure>
  );
}

export function CaseStudyFindingsList({ findings }: { findings: string[] }) {
  return (
    <ol className="case-study-findings">
      {findings.map((finding) => (
        <li key={finding}>{finding}</li>
      ))}
    </ol>
  );
}

export function CaseStudyProcessPlan({
  ariaLabel,
  steps,
}: {
  ariaLabel: string;
  steps: CaseStudyProcessStep[];
}) {
  return (
    <ol className="case-study-process" aria-label={ariaLabel}>
      {steps.map((step) => (
        <li className="case-study-process__step" key={step.number}>
          <span className="case-study-process__dot" aria-hidden="true" />
          <p className="case-study-process__number">{step.number}</p>
          <h3>{step.title}</h3>
          <ul>
            {step.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

export function CaseStudyOutcomeCards({
  cards,
}: {
  cards: CaseStudyOutcomeCard[];
}) {
  return (
    <div className="case-study-outcome-grid">
      {cards.map((card) => (
        <article className="case-study-outcome-card" key={card.number}>
          <p>{card.number}</p>
          <h3>{card.title}</h3>
          <span aria-hidden="true" />
          <p>{card.description}</p>
        </article>
      ))}
    </div>
  );
}

export function CaseStudyTakeaways({
  takeaways,
}: {
  takeaways: CaseStudyTakeaway[];
}) {
  return (
    <ol className="case-study-takeaway-list">
      {takeaways.map((takeaway, index) => (
        <li key={takeaway.title}>
          <span aria-hidden="true">{index + 1}</span>
          <div>
            <h3>{takeaway.title}</h3>
            <p>{takeaway.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
