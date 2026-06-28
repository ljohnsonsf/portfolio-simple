import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PageReveal } from "@/components/page-reveal";

export const metadata: Metadata = {
  title: "Lauren Johnson",
  description:
    "Lauren Johnson is a NYC-based Product Designer creating enterprise web and product experiences. She is currently a UX Web Design Intern at Commvault and pursuing an in M.S. Human-Computer Interaction.",
};

export default function ResumePage() {
  const resumePath = path.join(process.cwd(), "public", "resume.pdf");

  if (existsSync(resumePath)) {
    redirect("/resume.pdf");
  }

  return (
    <PageReveal className="page-block resume-placeholder">
      <p className="eyebrow">Resume</p>
      <h1>Resume PDF coming soon.</h1>
      <p className="about-lede">
        This route is ready for a resume PDF at <code>/public/resume.pdf</code>.
      </p>
      <div className="resume-actions">
        <Link className="primary-button text-button" href="/">
          <span>Back to Work</span>
        </Link>
      </div>
    </PageReveal>
  );
}
