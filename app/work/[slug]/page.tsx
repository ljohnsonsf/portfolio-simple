import type { Metadata } from "next";
import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AwsCaseStudyPage } from "@/components/aws-case-study-page";
import {
  CaseStudyBody,
  CaseStudyHero,
  CaseStudyImageBlock,
  CaseStudyMetaBar,
  CaseStudyPageShell,
  CaseStudySection,
} from "@/components/case-study-detail";
import { LearvoAdditionalSections } from "@/components/learvo-additional-sections";
import { PageReveal } from "@/components/page-reveal";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return {
      title: "Lauren Johnson",
    };
  }

  return {
    title: "Lauren Johnson",
    description: study.description,
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps): Promise<ReactElement> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  if (study.slug === "learvo-learning") {
    const metaItems = [
      {
        label: "Timeline",
        value: "4 months",
      },
      {
        label: "Role",
        value: "Product Designer",
      },
      {
        label: "Project Type",
        value: "Contract",
      },
      {
        label: "Team",
        value: "2 designers\n2 developers\n1 founder",
      },
      {
        label: "Year",
        value: "2025",
      },
    ];

    const sectionLinks = [
      { label: "Overview", href: "#case-study-title" },
      { label: "Mission", href: "#overview" },
      { label: "Problem", href: "#problem" },
      { label: "Audit", href: "#research" },
      { label: "Constraints", href: "#solution" },
      { label: "Success", href: "#testing" },
      { label: "Decisions", href: "#flows" },
      { label: "Walkthrough", href: "#walkthrough" },
      { label: "Outcomes", href: "#impact" },
      { label: "Takeaways", href: "#reflection" },
    ];

    const summaryCards: Array<{
      title: string;
      description: string;
      value?: string;
    }> = [
      {
        title: "My Role",
        description:
          "Owned problem framing, prioritization, redesign, and usability validation.",
      },
      {
        title: "Challenge",
        description:
          "Users left before completing any core learning action or experiencing value.",
      },
      {
        title: "Approach",
        description:
          "Audited workflows, mapped friction, designed discovery patterns, and tested for comprehension.",
      },
      {
        title: "Outcome",
        value: "7 of 8",
        description:
          "first-time usability participants completed a core feature flow without assistance.",
      },
    ];

    const problemCards = [
      {
        title: "Product Context",
        description:
          "Learvo helps students turn study materials into tools: flashcards, mnemonics, and quizzes.",
      },
      {
        title: "Core Issue",
        description:
          "Many users left before completing any of these, so they abandoned the platform before seeing value.",
      },
    ];

    const auditFindings = [
      {
        title:
          "New users were expected to self-direct before being introduced to any core feature.",
        body:
          "Without a clear starting point, users had to decide where to go before understanding what Learvo could help them do. In usability observations, some users scanned past core feature entry points because the page hierarchy did not clearly distinguish primary actions from secondary content.",
      },
      {
        title: "The interface lacked a reliable orientation point.",
        body:
          "Users did not have a predictable place to return to after exploring. In testing, 5 of 8 users clicked the Learvo logo expecting to return home, but it redirected them to the public signup page instead.",
      },
      {
        title: "Users encountered unfamiliar tools before they had enough context.",
        body:
          "For example, several users paused on the Mnemonic Generator because they did not understand what input was expected or how the tool would support their studying.",
      },
      {
        title: "Core feature workflows needed more first-time guidance.",
        body:
          "Because feature pages relied on users already understanding the workflow, first-time users needed clearer prompts before they could confidently complete a core learning action.",
      },
    ];

    return (
      <CaseStudyPageShell links={sectionLinks}>
        <CaseStudyHero
          title="Improving First Session Activation at Learvo Learning"
          copy={[
            "Learvo is an AI-powered learning platform with flashcards, mnemonics, and quizzes.",
            "I redesigned the first-time user experience to help new users understand the product's value and successfully try a core feature in their first session.",
          ]}
          image={{
            src: study.previewImage,
            alt: "Learvo Learning flashcards dashboard interface",
            width: 1104,
            height: 784,
          }}
        >
          <CaseStudyMetaBar items={metaItems} />
        </CaseStudyHero>

        <CaseStudyBody>
          <CaseStudySection
            id="overview"
            number="01"
            title="The Mission"
            copy="New users were leaving before experiencing value. My mission was to help them discover and successfully try a core feature faster."
          >
            <div className="case-study-summary-grid case-study-summary-grid--learvo">
              <input
                className="learvo-role-toggle"
                id="learvo-role-details"
                type="checkbox"
              />
              {summaryCards.map((card) => (
                card.title === "My Role" ? (
                  <label
                    className="case-study-summary-card learvo-role-card"
                    htmlFor="learvo-role-details"
                    key={card.title}
                  >
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <span className="learvo-role-card__toggle learvo-role-card__toggle--show">
                      click for details
                    </span>
                    <span className="learvo-role-card__toggle learvo-role-card__toggle--hide">
                      hide details
                    </span>
                  </label>
                ) : (
                  <article className="case-study-summary-card" key={card.title}>
                    <h3>{card.title}</h3>
                    {card.value ? <strong>{card.value}</strong> : null}
                    <p>{card.description}</p>
                  </article>
                )
              ))}
              <p className="learvo-role-note">
                I led the first-time user experience work: auditing onboarding
                flows, identifying activation blockers, proposing lightweight
                product changes, designing the activation banner and interim
                home state, and validating the redesigned flow through moderated
                usability testing. I collaborated with another designer on UI
                polish and worked with developers/founder to scope
                implementation.
              </p>
            </div>
          </CaseStudySection>

          <section
            className="case-study-section case-study-section--problem"
            id="problem"
            aria-labelledby="problem-heading"
          >
            <div className="case-study-section__intro">
              <p className="case-study-section__number">
                02 <span>Understanding the Problem</span>
              </p>
              <h2 id="problem-heading">
                New users weren&apos;t reaching value before they gave up.
              </h2>
              <p>
                Analytics showed that too many new users left before trying any
                core feature.
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
                    How might we help new users discover and successfully try at
                    least one core feature in their first session so they
                    experience Learvo&apos;s value before dropping off?
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
                03 <span>UX Audit to Determine Project Scope</span>
              </p>
              <p>
                To define a focused redesign scope, I audited first-time user
                flows across Learvo&apos;s core features: Flashcards, Mnemonics,
                and Quizzes.
              </p>
            </div>

            <div className="case-study-audit">
              <h2 id="research-heading">Key findings</h2>
              <ol className="case-study-findings">
                {auditFindings.map((finding) => (
                  <li key={finding.title}>
                    <strong style={{ display: "block", marginBottom: 8 }}>
                      {finding.title}
                    </strong>
                    <span>{finding.body}</span>
                  </li>
                ))}
              </ol>

              <CaseStudyImageBlock
                caption="First screen shown to new users (Flashcards)"
                image={{
                  src: "/case-studies/learvo/first-screen-flashcards.png",
                  alt: "Learvo Flashcards screen",
                  width: 1104,
                  height: 784,
                }}
              />

              <CaseStudyImageBlock
                caption="Example of a less familiar tool with limited guidance (Mnemonic Generator page)"
                image={{
                  src: "/case-studies/learvo/mnemonic-generator-guidance.png",
                  alt: "Learvo Mnemonic Generator screen with guidance issues annotated",
                  width: 1600,
                  height: 900,
                }}
              />

              <aside className="case-study-takeaway">
                <p>
                  Based on these findings, I focused the scope on changes most
                  likely to help first-time users reach a core feature quickly:
                  onboarding guidance, clearer orientation, and clear next
                  steps.
                </p>
              </aside>
            </div>
          </section>

          <LearvoAdditionalSections />
          <div className="case-study-next-action">
            <Link
              className="primary-button case-study-next-button"
              href="/work/aws-beginner-mode"
            >
              <span>View Next Case Study</span>
              <ArrowRight aria-hidden="true" size={14} strokeWidth={1.8} />
            </Link>
          </div>
        </CaseStudyBody>
      </CaseStudyPageShell>
    );
  }

  if (study.slug === "aws-beginner-mode") {
    return <AwsCaseStudyPage study={study} />;
  }

  return (
    <PageReveal className="page-block">
      <Link className="back-link" href="/#work">
        <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.8} />
        Work
      </Link>

      <article>
        <header className="detail-heading">
          <p className="eyebrow">
            {study.number} · {study.tags.join(" · ")}
          </p>
          <h1>{study.title}</h1>
          <p>{study.description}</p>
          <div className="detail-metric" aria-label={`${study.metricValue} ${study.metricText}`}>
            <strong>{study.metricValue}</strong>
            <span>{study.metricText}</span>
          </div>
        </header>

        <div className="detail-hero" aria-hidden="true">
          <Image
            src={study.previewImage}
            alt=""
            width={1136}
            height={520}
            priority
          />
        </div>

        <div className="detail-grid">
          <section className="detail-section" aria-labelledby="overview-heading">
            <h2 id="overview-heading">Overview</h2>
            <p>{study.summary}</p>
          </section>
          <section className="detail-section" aria-labelledby="role-heading">
            <h2 id="role-heading">Role</h2>
            <p>{study.role}</p>
          </section>
          <section className="detail-section" aria-labelledby="outcome-heading">
            <h2 id="outcome-heading">Outcome</h2>
            <p>{study.outcome}</p>
          </section>
        </div>
      </article>
    </PageReveal>
  );
}
