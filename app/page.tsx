import { WorkSection } from "@/components/work-section";
import { caseStudies } from "@/lib/case-studies";

export default function Home() {
  return <WorkSection caseStudies={caseStudies} />;
}
