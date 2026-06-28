export type CaseStudy = {
  slug: string;
  number: string;
  title: string;
  description: string;
  metricValue: string;
  metricText: string;
  tags: string[];
  meta: string;
  roleMeta?: string;
  projectTypeMeta?: string;
  href: string;
  previewImage: string;
  summary: string;
  role: string;
  outcome: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "learvo-learning",
    number: "01",
    title: "Learvo Learning",
    description:
      "Redesigned the new user experience to help users discover core features and reach value faster.",
    metricValue: "88%",
    metricText: "activation success in post-redesign usability testing.",
    tags: [
      "Product Design",
      "UX Design",
      "Usability Testing",
      "Systems Thinking",
    ],
    meta: "4 months · 2 Designers, 2 Developers",
    roleMeta: "Role: Product Designer",
    projectTypeMeta: "Project Type: Contract",
    href: "/work/learvo-learning",
    previewImage: "/previews/learvo-case-study-card.png",
    summary:
      "Learvo needed a calmer first-run experience that helped new users understand the product without slowing them down. The redesign focused on onboarding, feature discovery, and a reusable pattern library for future growth.",
    role:
      "Led product flows, interaction design, design system updates, prototype testing, and handoff documentation with a small cross-functional team.",
    outcome:
      "The new experience made the activation path clearer and helped 88% of new users reach and use core product features.",
  },
  {
    slug: "aws-beginner-mode",
    number: "02",
    title: "AWS Beginner Mode",
    description:
      "Simplified the AWS EC2 launch flow for beginners with clearer navigation and setup guidance.",
    metricValue: "100%",
    metricText:
      "of beginner, new user participants preferred the beginner flow and made fewer navigation errors.",
    tags: ["Product Design", "UX Design", "Design Systems"],
    meta: "2 months · Independent Project",
    href: "/work/aws-beginner-mode",
    previewImage: "/previews/aws-case-study-card.jpg",
    summary:
      "AWS EC2 can feel dense for new users. This concept introduced a beginner flow that surfaced the right decisions at the right moment and reduced navigation ambiguity.",
    role:
      "Owned research synthesis, flow redesign, UI direction, prototyping, and moderated usability testing.",
    outcome:
      "Every beginner participant preferred the guided flow and completed setup with fewer navigation errors than the current experience.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
