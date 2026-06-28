"use client";

import { useState } from "react";
import { CaseStudyCard } from "@/components/case-study-card";
import { OtherWorkCard } from "@/components/other-work-card";
import type { CaseStudy } from "@/lib/case-studies";

type WorkSectionProps = {
  caseStudies: CaseStudy[];
};

type WorkTab = "case-studies" | "other-work";

export function WorkSection({ caseStudies }: WorkSectionProps) {
  const [activeTab, setActiveTab] = useState<WorkTab>("case-studies");

  return (
    <section
      className="work-section reveal-on-load reveal-on-load--delayed"
      id="work"
      aria-labelledby="work-heading"
    >
      <h1 className="sr-only" id="work-heading">
        Selected work
      </h1>
      <div className="work-tabs" role="tablist" aria-label="Work categories">
        <button
          className="tab-button"
          id="case-studies-tab"
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
          type="button"
          role="tab"
          aria-selected={activeTab === "other-work"}
          aria-controls="other-work-panel"
          onClick={() => setActiveTab("other-work")}
        >
          Other Work
        </button>
      </div>

      {activeTab === "case-studies" ? (
        <div
          className="case-list"
          id="case-studies-panel"
          role="tabpanel"
          aria-labelledby="case-studies-tab"
        >
          {caseStudies.map((study) => (
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
          <OtherWorkCard />
        </div>
      )}
    </section>
  );
}
