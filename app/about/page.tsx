import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
    date: "Summer 2026",
    title: "UX Web Design Intern",
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

export default function AboutPage() {
  return (
    <PageReveal className="page-block about-page">
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
        </HoverImagePreview>
      </section>

      <section className="about-card about-background-card" aria-labelledby="about-background">
        <div className="about-card__copy">
          <p className="about-card__eyebrow">Experience</p>
          <h2 id="about-background">Where I&apos;ve been</h2>
          <p>
            I&apos;m currently working as an intern at Commvault, focusing on
            making complex product UI more readable and approachable on the web.
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
          {timeline.map((item) => (
            <li className="about-timeline__item" key={`${item.date}-${item.title}`}>
              <p className="about-timeline__date">{item.date}</p>
              <p className="about-timeline__title">{item.title}</p>
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

      <section className="about-card about-design-card" aria-labelledby="about-why-design">
        <div className="about-design-card__art" aria-hidden="true">
          <p className="about-card__eyebrow">Design journey</p>
          <Image
            className="about-orbit"
            src="/ikigai.svg"
            alt=""
            width={231}
            height={231}
            unoptimized
          />
        </div>

        <div className="about-design-card__copy">
          <h2 id="about-why-design">Why design</h2>
          <p>
            While working in tech sales, I became fascinated with the question
            of why certain product experiences resonated with users and others
            didn&apos;t. That curiosity led me to begin my pivot into design.
          </p>
          <p>
            Now, design has become my ikigai: the perfect intersection between
            passion, profession, and personal mission.
          </p>
        </div>

        <div className="about-design-values" aria-labelledby="about-values-title">
          <p className="about-card__eyebrow" id="about-values-title">
            Values
          </p>
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
        </div>
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
              I&apos;m currently seeking full-time Product Design or UX Design
              roles*, New Grad Roles for Winter 2026/Spring 2027, or Internships
              for Fall/Winter 2026.
            </p>
            <p className="about-going-card__footnote">
              <em>*Wait, aren&apos;t you still in school?</em>
              <br />
              Good question! While my expected graduation date is Spring 2027,
              I&apos;m more than capable of balancing a full-time role while I
              wrap up my coursework.
            </p>
          </div>

          <div className="about-going-card__divider" aria-hidden="true" />

          <div className="about-going-card__column about-going-card__column--personal">
            <h3>Personally</h3>
            <div className="about-going-card__personal-body">
              <p>
                I&apos;ve so far traveled to{" "}
                <HoverImagePreview
                  as="span"
                  className="about-country-pill"
                  images={countryPreviewImages}
                  cycleDuration={250}
                >
                  22 countries
                </HoverImagePreview>
                .
              </p>
              <p>
                Next on my list is Brazil{" "}
                <span className="about-brazil-flag" role="img" aria-label="Brazil flag">
                  🇧🇷
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageReveal>
  );
}
