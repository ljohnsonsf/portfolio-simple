import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";

type CaseStudyCardProps = {
  study: CaseStudy;
};

const previewVideos: Record<
  string,
  {
    src: string;
    label: string;
    year: string;
    description: string;
    logo?: {
      src: string;
      width: number;
      height: number;
      className: string;
    };
  }
> = {
  "commvault-visual-system": {
    src: "/case-studies/commvault/scalable-visual-system.mp4",
    label: "Commvault",
    year: "2026",
    description: "Built a scalable visual system for complex enterprise products.",
    logo: {
      src: "/previews/commvault-logo.png",
      width: 1552,
      height: 300,
      className: "case-preview-card__pill-logo--commvault",
    },
  },
  "learvo-learning": {
    src: "/case-studies/learvo/learvo-homepage-short.mp4",
    label: "Learvo",
    year: "2025",
    description: "Helping new users discover core features and reach value faster.",
    logo: {
      src: "/previews/learvo-logo.png",
      width: 1600,
      height: 230,
      className: "case-preview-card__pill-logo--learvo",
    },
  },
  "aws-beginner-mode": {
    src: "/case-studies/aws/final-feature-walkthrough.mp4",
    label: "AWS",
    year: "2025",
    description: "Making cloud infrastructure setup clearer for first-time users.",
  },
};

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  const preview = previewVideos[study.slug];
  const label = preview?.label ?? study.title;
  const year = preview?.year ?? study.meta.match(/20\d{2}/)?.[0] ?? "2026";
  const description = preview?.description ?? study.description;

  return (
    <Link
      className={`case-preview-card case-preview-card--${study.slug}`}
      href={study.href}
      aria-label={`${label}, ${year}: ${description} ${study.metricValue} ${study.metricText}`}
    >
      <article>
        <h2 className="sr-only">{study.title}</h2>
        <div className="case-preview-card__media" aria-hidden="true">
          {preview ? (
            <video
              className="case-preview-card__video"
              src={preview.src}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          ) : study.previewImage ? (
            <Image
              src={study.previewImage}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 440px"
            />
          ) : (
            <span className="case-preview-card__placeholder">
              Project preview
            </span>
          )}

          <span className="case-preview-card__pill">
            {preview?.logo ? (
              <Image
                className={`case-preview-card__pill-logo ${preview.logo.className}`}
                src={preview.logo.src}
                alt=""
                width={preview.logo.width}
                height={preview.logo.height}
              />
            ) : (
              <span>{label}</span>
            )}
            <span className="case-preview-card__pill-dot" aria-hidden="true">
              ·
            </span>
            <span className="case-preview-card__year">{year}</span>
          </span>
        </div>

        <div className="case-preview-card__hover-content">
          <p className="case-preview-card__description">{description}</p>
          <p className="case-preview-card__stat">
            <span className="case-preview-card__stat-value">
              {study.metricValue}
            </span>
            {" "}
            <span className="case-preview-card__stat-text">
              {study.metricText}
            </span>
          </p>
        </div>
      </article>
    </Link>
  );
}
