"use client";

import type { CSSProperties } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { CaseStudyCard } from "@/components/case-study-card";
import { OtherWorkCard } from "@/components/other-work-card";
import type { CaseStudy } from "@/lib/case-studies";

type WorkSectionProps = {
  caseStudies: CaseStudy[];
};

type WorkTab = "case-studies" | "other-work";
type WorkTabsStyle = CSSProperties & {
  "--tab-highlight-left"?: string;
  "--tab-highlight-width"?: string;
};

export function WorkSection({ caseStudies }: WorkSectionProps) {
  const [activeTab, setActiveTab] = useState<WorkTab>("case-studies");
  const [tabIndicatorStyle, setTabIndicatorStyle] = useState<WorkTabsStyle>({});
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<WorkTab, HTMLButtonElement | null>>({
    "case-studies": null,
    "other-work": null,
  });
  const selectedCaseStudies = caseStudies.filter(
    (study) => study.homeSection !== "other-work",
  );
  const otherWorkCaseStudies = caseStudies.filter(
    (study) => study.homeSection === "other-work",
  );

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeButton = tabRefs.current[activeTab];

      if (!activeButton) {
        return;
      }

      setTabIndicatorStyle({
        "--tab-highlight-left": `${activeButton.offsetLeft}px`,
        "--tab-highlight-width": `${activeButton.offsetWidth}px`,
      });
    };

    updateIndicator();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateIndicator);
      return () => window.removeEventListener("resize", updateIndicator);
    }

    const observer = new ResizeObserver(updateIndicator);
    const observedElements = [
      tabsRef.current,
      tabRefs.current["case-studies"],
      tabRefs.current["other-work"],
    ];

    observedElements.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });
    window.addEventListener("resize", updateIndicator);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeTab]);

  return (
    <section
      className="work-section reveal-on-load reveal-on-load--delayed"
      id="work"
      aria-labelledby="work-heading"
    >
      <h1 className="sr-only" id="work-heading">
        Selected work
      </h1>
      <div
        className={`work-tabs work-tabs--${activeTab}`}
        ref={tabsRef}
        role="tablist"
        aria-label="Work categories"
        style={tabIndicatorStyle}
      >
        <button
          className="tab-button"
          id="case-studies-tab"
          ref={(node) => {
            tabRefs.current["case-studies"] = node;
          }}
          type="button"
          role="tab"
          aria-selected={activeTab === "case-studies"}
          aria-controls="case-studies-panel"
          onClick={() => setActiveTab("case-studies")}
        >
          Case Studies
        </button>
        <button
          className="tab-button"
          id="other-work-tab"
          ref={(node) => {
            tabRefs.current["other-work"] = node;
          }}
          type="button"
          role="tab"
          aria-selected={activeTab === "other-work"}
          aria-controls="other-work-panel"
          onClick={() => setActiveTab("other-work")}
        >
          Other Things I'm Proud Of
        </button>
      </div>

      {activeTab === "case-studies" ? (
        <div
          className="case-list tab-panel-reveal"
          id="case-studies-panel"
          role="tabpanel"
          aria-labelledby="case-studies-tab"
        >
          {selectedCaseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      ) : (
        <div
          className="other-work-panel tab-panel-reveal"
          id="other-work-panel"
          role="tabpanel"
          aria-labelledby="other-work-tab"
        >
          <OtherWorkCard caseStudies={otherWorkCaseStudies} />
        </div>
      )}
    </section>
  );
}
