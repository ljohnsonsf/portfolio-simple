import type { ReactElement } from "react";
import Link from "next/link";
import { ArrowRight, CloudCog, Cog, GraduationCap } from "lucide-react";
import { AwsAutoplayVideo } from "@/components/aws-autoplay-video";
import { AwsQuoteGrid } from "@/components/aws-quote-grid";
import { AwsVisualCarousel } from "@/components/aws-visual-carousel";
import {
  CaseStudyBody,
  CaseStudyHero,
  CaseStudyImageBlock,
  CaseStudyMetaBar,
  CaseStudyPageShell,
  CaseStudyTakeaways,
  type CaseStudySideNavItem,
} from "@/components/case-study-detail";
import type { CaseStudy } from "@/lib/case-studies";

type AwsCaseStudyPageProps = {
  study: CaseStudy;
};

const sectionLinks: CaseStudySideNavItem[] = [
  { label: "Overview", href: "#overview" },
  { label: "Problem", href: "#problem" },
  { label: "Users", href: "#users" },
  { label: "Scope", href: "#scope" },
  { label: "Ideation", href: "#ideation" },
  { label: "Design", href: "#design" },
  { label: "Outcomes", href: "#impact" },
  { label: "Takeaways", href: "#reflection" },
];

const metaItems = [
  {
    label: "Timeline",
    value: "2 months",
  },
  {
    label: "Role",
    value: "Product Designer",
  },
  {
    label: "Project Type",
    value: "Independent Conceptual Project",
    note: "*not affiliated with Amazon or AWS",
  },
  {
    label: "Year",
    value: "2025",
  },
];

const summaryCards = [
  {
    title: "My Role",
    description:
      "Research synthesis, flow redesign, UI direction, prototyping, and usability testing.",
  },
  {
    title: "Challenge",
    description:
      "Dense jargon and unclear entry points made first setup feel risky.",
  },
  {
    title: "Approach",
    description:
      "Optional Beginner Mode with guided templates and simpler navigation.",
  },
  {
    title: "Outcome",
    value: "4 of 4",
    description:
      "participants new to EC2 found the Beginner Mode concept easier to understand than the current flow in moderated prototype testing.",
  },
];

const communityQuotes = [
  "The visuals take up so much d*mn space on your screen compared to what is actually useful information",
  "Color used to draw your eyes to points of action, now it's everywhere. I feel like I can't find anything.",
  "Why is there no simple option? Like — 'Deploy an Instance for me'? As a beginner developer, it is quite hard to ramp up.",
];

const communityInsights = [
  "Technical jargon and unfamiliar language increase hesitation for new users.",
  "Both beginners and advanced users benefit from stronger readability and visual hierarchy.",
  "The Launch Instance flow appeared repeatedly as a high-priority task in the posts reviewed.",
];

const outcomeCards = [
  {
    number: "01",
    title: "Improved Comprehension",
    description:
      "In moderated prototype testing with 4 participants new to EC2, all participants found the Beginner Mode concept easier to understand than the current flow.",
  },
  {
    number: "02",
    title: "Errors reduced",
    description:
      "Participants made fewer navigation missteps and asked fewer clarification questions while completing the launch task.",
  },
];

const takeaways = [
  {
    title:
      "Designing for a technical domain required deeper product learning before interface exploration.",
    description:
      "Understanding EC2's mental model helped me avoid simplifying the wrong things or hiding important setup decisions.",
  },
  {
    title:
      "Simplifying complexity meant guiding decisions for beginners without removing expert control.",
    description:
      "Beginner Mode works as an optional learning layer rather than a replacement for the full EC2 experience.",
  },
  {
    title:
      "Future validation should involve actual EC2 users to test whether the proposed changes reduce friction in real workflows.",
    description:
      "The current findings are useful, but deeper testing would better reveal real operational constraints and edge cases.",
  },
];

export function AwsCaseStudyPage({
  study,
}: AwsCaseStudyPageProps): ReactElement {
  return (
    <CaseStudyPageShell links={sectionLinks}>
      <CaseStudyHero
        title="Designing a Beginner Mode for AWS EC2"
        copy={[
          "AWS EC2 is powerful, but its launch experience can feel dense for people setting up cloud infrastructure for the first time.",
          "I designed a Beginner Mode concept that makes the setup path clearer, reduces navigation uncertainty, and helps new users launch with more confidence.",
        ]}
        image={{
          src: study.previewImage,
          alt: "AWS Beginner Mode dashboard concept",
          width: 777,
          height: 552,
        }}
      >
        <CaseStudyMetaBar items={metaItems} />
      </CaseStudyHero>

      <CaseStudyBody>
        <section
          className="case-study-section aws-mission-section"
          id="overview"
          aria-labelledby="overview-heading"
        >
          <div className="aws-mission-intro">
            <p className="case-study-section__number">01</p>
            <h2 id="overview-heading">The Mission</h2>
            <p>
              Help new AWS users understand EC2, make confident launch
              decisions, and complete a successful first setup with less
              friction.
            </p>
          </div>

          <div className="aws-mission-card-grid">
            {summaryCards.map((card) => (
              <article className="aws-mission-card" key={card.title}>
                <h3>{card.title}</h3>
                {card.value ? <strong>{card.value}</strong> : null}
                <p>{card.description}</p>
              </article>
            ))}
          </div>

          <aside className="aws-explainer-callout">
            <div className="aws-explainer-callout__icon" aria-hidden="true">
              <CloudCog size={34} strokeWidth={1.5} />
            </div>
            <div>
              <h3>Wait, what is EC2?</h3>
              <p>
                EC2 is like renting a computer in the cloud. Instead of
                managing your own server, AWS lets you launch a virtual machine
                with the power, memory, and storage you need.
              </p>
            </div>
          </aside>
        </section>

        <section
          className="case-study-section case-study-section--problem aws-problem-section"
          id="problem"
          aria-labelledby="problem-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              02 <span>Understanding the Problem</span>
            </p>
            <h2 id="problem-heading">
              First-time EC2 users struggled to find a confident starting point.
            </h2>
            <p>
              Dense terminology, unclear entry points, and high-stakes setup
              decisions created hesitation before users could experience EC2's
              value.
            </p>
          </div>

          <div className="case-study-problem">
            <div className="case-study-problem__cards">
              <article className="case-study-context-card aws-context-card">
                <h4>Product Context</h4>
                <p>
                  AWS EC2 lets users create virtual machines in the cloud, but
                  its flexibility can overwhelm first-time users when navigation
                  and terminology feel unfamiliar.
                </p>
              </article>

              <article className="case-study-context-card aws-context-card">
                <h4>Core Issue</h4>
                <p>
                  Before users can experience EC2's value, they first need to
                  understand what matters now, which decisions are safe to make,
                  and how to move forward with confidence.
                </p>
              </article>

              <article className="case-study-hmw-card">
                <h4>How might we...</h4>
                <p>
                  Help first-time EC2 users navigate the dashboard and instance
                  setup more confidently by simplifying entry points, reducing
                  jargon, and guiding key decisions without taking away advanced
                  control?
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          className="case-study-section case-study-section--aws-full aws-user-needs-section"
          id="users"
          aria-labelledby="users-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              03 <span>Understanding User Needs</span>
            </p>
            <h2 id="users-heading" style={{ margin: "24px 0 24px" }}>
              Understanding User Needs
            </h2>
            <p>
              To better understand the users and existing challenges in EC2's
              interface, I reviewed 50+ posts across Reddit and AWS community
              boards and grouped recurring complaints into themes such as
              jargon, visual clutter, contrast/readability, and confusing setup
              flows.
            </p>
          </div>

          <div className="aws-section-content">
            <div className="aws-copy-block aws-user-needs-lede">
              <h3>Who I Designed For</h3>
              <p>
                I identified two broad EC2 user groups with different needs and
                tolerance for complexity.
              </p>
            </div>

            <div className="aws-audience-grid">
              <article className="aws-info-card aws-audience-card">
                <h4>
                  <span className="aws-audience-icon" aria-hidden="true">
                    <GraduationCap size={19} strokeWidth={1.7} />
                  </span>
                  Beginner/New Operator
                </h4>
                <ul>
                  <li>
                    Prioritizes confidence and ease of setup over deep
                    configurability.
                  </li>
                  <li>
                    Needs reassurance, clearer terminology, and a guided
                    starting point.
                  </li>
                  <li>
                    Examples: Students, new professionals, start-up founders,
                    hackathon participants.
                  </li>
                </ul>
              </article>

              <article className="aws-info-card aws-audience-card">
                <h4>
                  <span
                    className="aws-audience-icon aws-audience-icon--advanced"
                    aria-hidden="true"
                  >
                    <Cog size={17} strokeWidth={1.7} />
                    <Cog size={13} strokeWidth={1.7} />
                  </span>
                  Advanced Operator
                </h4>
                <ul>
                  <li>
                    Prioritizes speed, control, and direct access to advanced
                    settings.
                  </li>
                  <li>
                    Does not want simplified flows to block efficient workflows.
                  </li>
                  <li>
                    Examples: Cloud architects, site reliability engineers.
                  </li>
                </ul>
              </article>
            </div>

            <aside className="aws-design-focus-callout">
              <p>
                <strong>Design focus:</strong> Prioritize first-time and
                low-confidence EC2 users while ensuring experienced operators
                retain speed and control.
              </p>
            </aside>

            <div className="aws-copy-block aws-community-lede">
              <h3>What Community Feedback Revealed</h3>
              <p>
                Here are direct quotes that highlighted recurring frustrations
                around technical jargon, visual clutter, poor contrast, and
                confusing workflows:
              </p>
            </div>

            <div className="aws-quote-block">
              <AwsQuoteGrid quotes={communityQuotes} />
            </div>

            <div className="aws-key-insights">
              <h3>Key insights from community research</h3>
              <ol className="aws-insight-rows">
                {communityInsights.map((insight, index) => (
                  <li key={insight}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{insight}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section
          className="case-study-section case-study-section--aws-full"
          id="scope"
          aria-labelledby="scope-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              04 <span>Defining the Project Scope through UX Audit</span>
            </p>
            <h2 id="scope-heading">
              Defining the Project Scope through UX Audit
            </h2>
            <p>
              Based on the community research and UX audit, I narrowed the
              redesign to the two highest-impact surfaces for first-time users:
              the dashboard and the Launch Instance flow.
            </p>
          </div>

          <div className="aws-section-content">
            <div className="aws-copy-block">
              <h3>Highest Impact Screens and Flows</h3>
              <p>
                I prioritized surfaces where users start, make key decisions,
                and are most likely to hesitate or drop off.
              </p>
            </div>

            <div className="aws-card-grid">
              <article className="aws-info-card aws-scope-card">
                <h4>Dashboard</h4>
                <h5>Why is it important?</h5>
                <p>
                  The dashboard is the first screen many users see, so it
                  shapes whether they can identify a clear starting point or
                  feel lost immediately.
                </p>
                <h5>What will change?</h5>
                <p>
                  Simplify the dashboard by reducing clutter, emphasizing
                  essential actions, and creating a clearer entry point into
                  EC2.
                </p>
              </article>

              <article className="aws-info-card aws-scope-card">
                <h4>Launch Instance</h4>
                <h5>Why is it important?</h5>
                <p>
                  Launch Instance appeared repeatedly as a high-priority task
                  and is the point where beginners face the most setup
                  decisions.
                </p>
                <h5>What will change?</h5>
                <p>
                  Simplify setup with guided templates for common use cases,
                  clearer layout and contrast, and less technical jargon.
                </p>
              </article>
            </div>

            <aside className="case-study-takeaway">
              <h3>The Final Plan</h3>
              <p>
                Redesign the dashboard and Launch Instance flow, and introduce
                an optional Beginner Mode toggle to make key tasks easier for
                first-time users. This approach aims to reduce early friction,
                clarify entry points and setup decisions, and preserve full
                control for advanced users.
              </p>
            </aside>

            <article className="case-study-context-card aws-context-card aws-beginner-success-card">
              <h4>Beginner Success</h4>
              <p>A new EC2 user is successful if they can:</p>
              <ul className="aws-insight-rows aws-insight-rows--plain aws-beginner-success-list">
                <li>
                  <p>Identify where to start from the dashboard.</p>
                </li>
                <li>
                  <p>
                    Begin Launch Instance without second-guessing the entry
                    point.
                  </p>
                </li>
                <li>
                  <p>
                    Complete key setup steps without getting lost in advanced
                    options.
                  </p>
                </li>
              </ul>
            </article>

            <aside className="aws-explainer-callout">
              <h3>
                Why an optional mode instead of simplifying the default
                experience?
              </h3>
              <p>
                EC2 serves both beginners and advanced operators, so simplifying
                the default interface for everyone could slow down users who
                already know what they need. I chose an optional Beginner Mode
                because it reduces upfront complexity for first-time users while
                preserving speed and control for experienced users.
              </p>
              <p>
                Rather than removing EC2's flexibility, Beginner Mode acts as a
                learning layer: it gives new users clearer entry points, guided
                templates, and simpler explanations until they are ready to move
                into the full experience.
              </p>
            </aside>
          </div>
        </section>

        <section
          className="case-study-section case-study-section--aws-full"
          id="ideation"
          aria-labelledby="ideation-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              05 <span>Ideation and Wireframing</span>
            </p>
            <h2 id="ideation-heading">Ideation and Wireframing</h2>
            <p>
              Based on the research and defined scope, I created early
              wireframes to explore how a simpler dashboard, guided setup, and
              clearer hierarchy could make EC2 feel more approachable for
              beginners.
            </p>
          </div>

          <div className="aws-section-content">
            <div className="aws-wireframe-block">
              <h3>Dashboard Wireframe Exploration</h3>
              <ol className="aws-numbered-list">
                <li>
                  <strong>Beginner Mode toggle:</strong> A clear on/off option
                  so first-time users get guidance while advanced users retain
                  control.
                </li>
                <li>
                  <strong>Simplified navigation:</strong> Advanced options are
                  tucked away to reduce noise and make the sidebar easier to
                  parse.
                </li>
                <li>
                  <strong>Card-based layout:</strong> Core actions are surfaced
                  through larger, clearer modules to improve hierarchy and
                  reduce overwhelm.
                </li>
              </ol>
              <CaseStudyImageBlock
                caption="Dashboard wireframe exploration"
                image={{
                  src: "/case-studies/aws/dashboard-wireframe-exploration.png",
                  alt: "Annotated AWS EC2 dashboard wireframe exploration",
                  width: 1306,
                  height: 836,
                }}
              />
            </div>

            <div className="aws-wireframe-block">
              <h3>Launch Instance Flow Wireframe Exploration</h3>
              <ol className="aws-numbered-list">
                <li>
                  <strong>Template-based setup:</strong> Introduces common
                  starting points so beginners can begin with guided
                  configuration instead of making every decision from scratch.
                </li>
                <li>
                  <strong>Step-by-step structure:</strong> Breaks setup into
                  clearer stages so users can focus on one decision at a time.
                </li>
                <li>
                  <strong>Simplified language and guidance:</strong> Uses
                  clearer labels and helper text to reduce confusion around
                  technical terms and setup choices.
                </li>
              </ol>
              <CaseStudyImageBlock
                caption="Launch Instance flow wireframe exploration"
                image={{
                  src: "/case-studies/aws/launch-instance-wireframe-exploration.png",
                  alt: "Annotated AWS Launch Instance flow wireframe exploration",
                  width: 1534,
                  height: 1312,
                }}
              />
            </div>
          </div>
        </section>

        <section
          className="case-study-section case-study-section--aws-full"
          id="design"
          aria-labelledby="design-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              06 <span>Visual Design</span>
            </p>
            <h2 id="design-heading">Visual Design</h2>
          </div>

          <div className="aws-section-content">
            <div className="aws-visual-subsection">
              <h3>
                Comparison to Current AWS EC2 Dashboard and Launch Instance Flow
              </h3>
              <p>
                To ground the redesign, I first reviewed the existing AWS EC2
                dashboard and Launch Instance flow. While powerful, both
                surfaces present beginners with dense information, weak visual
                hierarchy, and technical terminology that make key actions
                harder to recognize.
              </p>
              <AwsVisualCarousel
                slides={[
                  {
                    caption: "Current AWS EC2 dashboard",
                    image: {
                      src: "/case-studies/aws/current-ec2-dashboard.png",
                      alt: "Current AWS EC2 dashboard interface",
                      width: 1234,
                      height: 1162,
                    },
                    placeholderLabel:
                      "Current AWS EC2 dashboard placeholder",
                  },
                  {
                    caption: "Current Launch Instance flow",
                    image: {
                      src: "/case-studies/aws/current-launch-instance-flow.png",
                      alt: "Current AWS Launch Instance flow interface",
                      width: 1232,
                      height: 1160,
                    },
                    placeholderLabel:
                      "Current Launch Instance flow placeholder",
                  },
                ]}
              />
            </div>

            <div className="aws-visual-subsection">
              <h3>Early High-Fidelity Explorations</h3>
              <p>
                I explored multiple high-fidelity concepts early in the process
                to quickly evaluate layout, hierarchy, and visual style. These
                versions helped me validate what worked, identify friction
                points, and refine the experience before finalizing the design.
              </p>
              <div className="aws-visual-stack">
                <CaseStudyImageBlock
                  caption="Dashboard"
                  image={{
                    src: "/case-studies/aws/early-dashboard-exploration.png",
                    alt: "Early high-fidelity AWS Beginner Mode dashboard exploration",
                    width: 1340,
                    height: 908,
                  }}
                />
                <CaseStudyImageBlock
                  caption="Launch Instance"
                  image={{
                    src: "/case-studies/aws/early-launch-instance-exploration.png",
                    alt: "Early high-fidelity AWS Beginner Mode Launch Instance exploration",
                    width: 1260,
                    height: 1358,
                  }}
                />
              </div>
              <p>
                I initially explored designs that stayed close to the existing
                AWS visual system to better understand the design language and
                constraints. While this approach was useful early on, feedback
                showed that elements like low contrast, heavy borders, large
                unused areas, and a top header with unclear actions still
                created cognitive load for beginners.
              </p>
            </div>

            <div className="aws-visual-subsection">
              <h3>Finalized Visual Design</h3>
              <p>
                Based on insights from user feedback and previous iterations, I
                transitioned to a lighter, more streamlined interface that
                prioritizes clarity, readability, and confidence for new users.
                I also consolidated the header into the left navigation to
                reduce redundancy and surface navigation in a more intuitive
                location.
              </p>
              <div className="aws-visual-stack">
                <CaseStudyImageBlock
                  caption="Dashboard"
                  image={{
                    src: "/case-studies/aws/finalized-dashboard-design.png",
                    alt: "AWS Beginner Mode finalized dashboard concept",
                    width: 1434,
                    height: 950,
                  }}
                />
                <CaseStudyImageBlock
                  caption="Launch Instance"
                  image={{
                    src: "/case-studies/aws/finalized-launch-instance-design.png",
                    alt: "AWS Beginner Mode finalized Launch Instance concept",
                    width: 1196,
                    height: 1314,
                  }}
                />
              </div>
            </div>

            <div className="aws-visual-subsection">
              <h3>The Final Feature</h3>
              <p>
                The final concept includes a streamlined dashboard with a
                Beginner Mode toggle and a simplified Launch Instance workflow
                with guided templates and reduced jargon. Visual hierarchy,
                contrast, and readability were strengthened to make key actions
                easier to scan and understand.
              </p>
              <div className="case-study-video-placeholder case-study-video-placeholder--video">
                <AwsAutoplayVideo
                  src="/case-studies/aws/final-feature-walkthrough.mp4"
                  label="AWS Beginner Mode final feature walkthrough"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="case-study-section case-study-section--outcomes case-study-section--aws-outcomes"
          id="impact"
          aria-labelledby="impact-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              07 <span>Outcomes</span>
            </p>
            <h2 id="impact-heading">Outcomes</h2>
          </div>

          <div
            className="case-study-outcome-grid"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            }}
          >
            {outcomeCards.map((card) => (
              <article className="case-study-outcome-card" key={card.number}>
                <p>{card.number}</p>
                <h3>{card.title}</h3>
                <span aria-hidden="true" />
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="case-study-section case-study-section--takeaways"
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

          <aside className="case-study-takeaway aws-limitation-callout">
            <p>
              Testing was conducted with peers new to EC2 rather than actual
              EC2 users, so findings are directional.
            </p>
          </aside>
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
