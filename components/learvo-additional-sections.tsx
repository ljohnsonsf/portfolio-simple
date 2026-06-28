import type { ReactElement } from "react";
import Image from "next/image";
import { Lightbulb, MessageCircleQuestion, TriangleAlert } from "lucide-react";
import { LearvoWalkthroughVideo } from "./learvo-walkthrough-video";

export function LearvoAdditionalSections(): ReactElement {
  return (
    <>
      <section
        className="case-study-section case-study-section--constraints"
        id="solution"
        aria-labelledby="solution-heading"
      >
        <div className="case-study-section__intro">
          <p className="case-study-section__number">
            04 <span>Constraints</span>
          </p>
          <h2 id="solution-heading">Constraints</h2>
          <p>
            There were two primary constraints that influenced the direction of
            the design solutions.
          </p>
        </div>

        <div className="case-study-constraints">
          <div className="case-study-constraint-grid">
            <article className="case-study-constraint-card">
              <h3>Limited engineering capacity</h3>
              <ul>
                <li>Large structural changes weren&apos;t feasible.</li>
                <li>Implementation moved slowly.</li>
                <li>We had to work within existing architecture.</li>
              </ul>
            </article>
            <article className="case-study-constraint-card">
              <h3>Pressure to ship quickly</h3>
              <ul>
                <li>Decisions had to be made quickly.</li>
                <li>
                  We couldn&apos;t spend cycles designing a perfect end state.
                </li>
                <li>Solutions needed to be testable and fast to implement.</li>
              </ul>
            </article>
          </div>
          <p className="case-study-constraint-takeaway">
            Rather than designing a full new home or heavy setup flow, I
            prioritized lightweight changes that could reduce hesitation,
            improve orientation, and help users reach a core feature in their
            first session.
          </p>
        </div>
      </section>

      <section
        className="case-study-section case-study-section--success"
        id="testing"
        aria-labelledby="testing-heading"
      >
        <div className="case-study-section__intro">
          <p className="case-study-section__number">
            05 <span>Defining Success</span>
          </p>
          <h2 id="testing-heading">Defining Success</h2>
        </div>

        <div className="case-study-success-grid">
          <article className="case-study-success-card">
            <h3>How we&apos;re defining success</h3>
            <ul>
              <li>
                New users complete at least one core feature flow in their first
                session (activation)
              </li>
              <li>Users report feeling oriented, not overwhelmed or lost</li>
            </ul>
          </article>
          <article className="case-study-success-card">
            <h3>How we&apos;re measuring success</h3>
            <ul>
              <li>
                Moderated usability completion rate (completing a core feature
                flow)
              </li>
              <li>Observed hesitation</li>
              <li>Navigation confusion or backtracking</li>
              <li>Qualitative user feedback</li>
            </ul>
          </article>
        </div>
      </section>

      <section
        className="case-study-section case-study-section--responses"
        id="flows"
        aria-labelledby="flows-heading"
      >
        <div className="case-study-section__intro">
          <p className="case-study-section__number">
            06 <span>Design Responses to Key Findings</span>
          </p>
          <h2 id="flows-heading">Design Responses to Key Findings</h2>
          <p>
            I focused on two lightweight solutions that addressed the biggest
            barriers without adding complexity or slowing down the first-time
            user experience.
          </p>
        </div>

        <div className="case-study-responses">
          <article className="case-study-guided-card">
            <p className="case-study-guided-card__label">01</p>
            <h3>Guided Onboarding</h3>

            <div className="case-study-guided-row">
              <div className="case-study-guided-row__marker" aria-hidden="true">
                <TriangleAlert size={18} strokeWidth={1.6} />
              </div>
              <div>
                <h4>Problem</h4>
                <p>
                  New users weren&apos;t given a clear starting point, which
                  created hesitation before first action. Within the features
                  themselves, the path to getting value was not always
                  immediately obvious.
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
                  I paired an in-context activation banner with lightweight,
                  step-based in-feature tutorials to guide users without forcing
                  a linear onboarding flow.
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
                  We ruled out (1) a dedicated Home + setup flow, which was too
                  time-intensive for a small team, and (2) a mandatory
                  full-screen onboarding tour, which was too interruptive and
                  higher skip risk. This approach balanced speed-to-ship with
                  meaningful first-session guidance.
                </p>
              </div>
            </div>
          </article>

          <figure className="case-study-image-block">
            <figcaption>In-context navigation banner</figcaption>
            <div className="case-study-image-frame">
              <Image
                src="/case-studies/learvo/in-context-navigation-banner.png"
                alt="Learvo in-context navigation banner with activation paths annotated"
                width={1744}
                height={708}
              />
            </div>
          </figure>

          <figure className="case-study-image-block">
            <figcaption>Step-based in-feature tutorial</figcaption>
            <div className="case-study-image-frame">
              <Image
                src="/case-studies/learvo/step-based-in-feature-tutorial.png"
                alt="Learvo step-based in-feature tutorial with guidance annotations"
                width={1732}
                height={972}
              />
            </div>
          </figure>

          <article className="case-study-guided-card">
            <p className="case-study-guided-card__label">02</p>
            <h3>Creating an Interim Home State</h3>

            <div className="case-study-guided-row">
              <div className="case-study-guided-row__marker" aria-hidden="true">
                <TriangleAlert size={18} strokeWidth={1.6} />
              </div>
              <div>
                <h4>Problem</h4>
                <p>
                  Users lacked a reliable &quot;home&quot; to return to, which
                  caused disorientation and backtracking. In pre-change
                  usability observations, users repeatedly clicked the Learvo
                  logo expecting it to take them home, but it redirected to the
                  public signup page instead.
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
                  I repurposed the Flashcards page into an interim home state by
                  combining first-time guidance with return-and-resume signals:
                  the activation banner, Recently Studied, progress cues, and a
                  reliable logo-to-home behavior.
                  <br />
                  <br />
                  This supported the full activation loop: helping users choose
                  a first action, complete it, and see where to continue
                  afterward.
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
                  A dedicated Home page was the ideal long-term solution, but
                  shipping a net-new page wasn&apos;t feasible within the
                  timeline. Instead, I took an incremental approach by making an
                  existing high-traffic page function more like a home first.
                </p>
              </div>
            </div>
          </article>

          <figure className="case-study-image-block">
            <figcaption>
              For new users: the page provides a clear starting point through
              the activation banner, while Recently Studied sets the expectation
              for what will appear after first use.
            </figcaption>
            <div className="case-study-image-frame">
              <Image
                src="/case-studies/learvo/interim-home-new-users.png"
                alt="Learvo interim home state for new users with starting point annotations"
                width={1600}
                height={1242}
              />
            </div>
          </figure>

          <figure className="case-study-image-block">
            <figcaption>
              After first progress, the same page becomes a more useful home
              state, with Recently Studied, progress cues, and resume actions
              that help users continue their work.
            </figcaption>
            <div className="case-study-image-frame">
              <Image
                src="/case-studies/learvo/interim-home-after-progress.png"
                alt="Learvo interim home state after progress with resume and library annotations"
                width={1264}
                height={1414}
              />
            </div>
          </figure>

          <article className="case-study-guided-card">
            <p className="case-study-guided-card__label">03</p>
            <h3>Visual Design: Supporting UI Improvements</h3>

            <div className="case-study-guided-row">
              <div className="case-study-guided-row__marker" aria-hidden="true">
                <TriangleAlert size={18} strokeWidth={1.6} />
              </div>
              <div>
                <h4>Problem</h4>
                <p>
                  The table and upload features lacked clear hierarchy and
                  polish, which made the product feel harder to parse and less
                  trustworthy.
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
                  I redesigned the table and upload components to improve
                  hierarchy, readability, and overall product polish, while
                  maintaining design consistency across the experience.
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
                  These changes supported the activation work by making core
                  surfaces feel clearer, more trustworthy, and easier to scan
                  during first use.
                </p>
              </div>
            </div>
          </article>

          <div className="case-study-comparison-block case-study-comparison-block--stacked case-study-comparison-block--first">
            <h4>Table feature before and after redesign</h4>
            <div className="case-study-comparison-pair">
              <figure>
                <figcaption>Before</figcaption>
                <div className="case-study-image-frame">
                  <Image
                    src="/case-studies/learvo/table-before.png"
                    alt="Learvo table feature before redesign"
                    width={2048}
                    height={454}
                  />
                </div>
              </figure>
              <span className="case-study-comparison-arrow" aria-hidden="true">
                -&gt;
              </span>
              <figure>
                <figcaption>After</figcaption>
                <div className="case-study-image-frame">
                  <Image
                    src="/case-studies/learvo/table-after.png"
                    alt="Learvo table feature after redesign"
                    width={2048}
                    height={452}
                  />
                </div>
              </figure>
            </div>
          </div>

          <div className="case-study-comparison-block case-study-comparison-block--stacked">
            <h4>Upload feature before and after redesign</h4>
            <div className="case-study-comparison-pair">
              <figure>
                <figcaption>Before</figcaption>
                <div className="case-study-image-frame">
                  <Image
                    src="/case-studies/learvo/upload-before.png"
                    alt="Learvo upload feature before redesign"
                    width={1682}
                    height={786}
                  />
                </div>
              </figure>
              <span className="case-study-comparison-arrow" aria-hidden="true">
                -&gt;
              </span>
              <figure>
                <figcaption>After</figcaption>
                <div className="case-study-image-frame">
                  <Image
                    src="/case-studies/learvo/upload-after.png"
                    alt="Learvo upload feature after redesign"
                    width={1688}
                    height={718}
                  />
                </div>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section
        className="case-study-section case-study-section--walkthrough"
        id="walkthrough"
        aria-labelledby="walkthrough-heading"
      >
        <div className="case-study-section__intro">
          <p className="case-study-section__number">
            07 <span>Walkthrough: First-time experience</span>
          </p>
          <h2 id="walkthrough-heading">
            Walkthrough: First-time experience
          </h2>
          <p>
            A quick walkthrough of the new first-time user flow, designed to
            help users reach value faster and with more confidence.
          </p>
        </div>

        <div className="case-study-video-placeholder case-study-video-placeholder--video">
          <LearvoWalkthroughVideo src="/case-studies/learvo/first-time-walkthrough.mp4" />
        </div>
      </section>

      <section
        className="case-study-section case-study-section--outcomes"
        id="impact"
        aria-labelledby="impact-heading"
      >
        <div className="case-study-section__intro">
          <p className="case-study-section__number">
            08 <span>Outcomes</span>
          </p>
          <h2 id="impact-heading">Outcomes</h2>
        </div>

        <div className="case-study-outcome-grid">
          <article className="case-study-outcome-card">
            <p>01</p>
            <h3>Activation improved</h3>
            <span aria-hidden="true" />
            <p>
              7 of 8 first-time users completed at least one core feature flow
              in moderated usability testing.
            </p>
          </article>
          <article className="case-study-outcome-card">
            <p>02</p>
            <h3>Feature Use Improved</h3>
            <span aria-hidden="true" />
            <p>
              Participants used the in-context prompts to choose a next step
              without needing a separate onboarding tour.
            </p>
          </article>
          <article className="case-study-outcome-card">
            <p>03</p>
            <h3>Orientation improved</h3>
            <span aria-hidden="true" />
            <p>
              The in-app home state gave users a more predictable place to
              return to.
            </p>
          </article>
          <article className="case-study-outcome-card">
            <p>04</p>
            <h3>Clarity improved</h3>
            <span aria-hidden="true" />
            <p>
              Customer success feedback suggested that new users felt more
              oriented and less overwhelmed.
            </p>
          </article>
        </div>
      </section>

      <section
        className="case-study-section case-study-section--takeaways"
        id="reflection"
        aria-labelledby="reflection-heading"
      >
        <div className="case-study-section__intro">
          <p className="case-study-section__number">
            09 <span>Takeaways</span>
          </p>
          <h2 id="reflection-heading">Takeaways</h2>
        </div>

        <ol className="case-study-takeaway-list">
          <li>
            <span aria-hidden="true">1</span>
            <div>
              <h3>Activation depends on helping users reach value quickly.</h3>
              <p>
                The biggest barrier wasn&apos;t feature depth, it was helping
                new users take one successful first step.
              </p>
            </div>
          </li>
          <li>
            <span aria-hidden="true">2</span>
            <div>
              <h3>Better orientation mattered more than a larger rebuild.</h3>
              <p>
                A clearer home state, progress cues, and guided next steps
                reduced confusion without needing a net-new homepage.
              </p>
            </div>
          </li>
          <li>
            <span aria-hidden="true">3</span>
            <div>
              <h3>
                Small, targeted changes can meaningfully improve first-session
                UX.
              </h3>
              <p>
                Working within constraints led to faster, testable improvements
                that made the product feel clearer and more usable.
              </p>
            </div>
          </li>
        </ol>
      </section>
    </>
  );
}
