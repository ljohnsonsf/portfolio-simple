import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";

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
  external?: boolean;
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
  external: true,
};

const monetGalleryItem: OtherWorkItem = {
  key: "monet-gallery",
  title: "Monet Gallery",
  description:
    "Created an immersive art gallery web experience focused on the works of Claude Monet.",
  tools: "Figma • Claude Code • HTML • CSS • JavaScript",
  meta: ["Academic Solo Project", "2025"],
  href: "https://monetgallery.vercel.app/",
  previewImage: "/previews/monet-gallery.png",
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
  };
}

function OtherWorkItemCard({ item }: { item: OtherWorkItem }) {
  const pillDetail = item.meta.at(-1) ?? "";
  const label = `${item.title}, ${item.meta.join(", ")}: ${item.description} ${item.tools}`;

  const content = (
    <article>
      <h2 className="sr-only">{item.title}</h2>
      <div className="case-preview-card__media" aria-hidden="true">
        <Image
          src={item.previewImage}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 440px"
        />

        <span className="case-preview-card__pill">
          <span>{item.title}</span>
          <span className="case-preview-card__pill-dot" aria-hidden="true">
            ·
          </span>
          <span className="case-preview-card__year">{pillDetail}</span>
        </span>
      </div>

      <div className="case-preview-card__hover-content">
        <p className="case-preview-card__description">{item.description}</p>
        <p className="case-preview-card__stat">{item.tools}</p>
      </div>
    </article>
  );

  if (item.external) {
    return (
      <a
        className={`case-preview-card other-work-preview-card other-work-preview-card--${item.key}`}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${label}. Opens in a new tab.`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      className={`case-preview-card other-work-preview-card other-work-preview-card--${item.key}`}
      href={item.href}
      aria-label={label}
    >
      {content}
    </Link>
  );
}

export function OtherWorkCard({ caseStudies }: OtherWorkCardProps) {
  const items = [
    frequencyFinderItem,
    ...caseStudies.map(toOtherWorkItem),
    monetGalleryItem,
  ];

  return items.map((item) => (
    <OtherWorkItemCard item={item} key={item.key} />
  ));
}
