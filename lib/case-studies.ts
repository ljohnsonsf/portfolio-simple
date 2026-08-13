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
  homeSection?: "case-studies" | "other-work";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "cult-cookies",
    number: "04",
    title: "Cult Cookies",
    description:
      "A food truck, brand, and operating system built from the ground up.",
    metricValue: "01",
    metricText: "self-initiated business built across fabrication, brand, product, and operations.",
    tags: ["Fabrication", "Branding", "Operations"],
    meta: "2023 · Self-initiated",
    roleMeta: "Role: Founder / Designer / Builder / Operator",
    projectTypeMeta: "Project Type: Self-initiated",
    href: "/work/cult-cookies",
    previewImage: "/case-studies/cult-cookies/truck-finished-side.jpg",
    summary:
      "Cult Cookies was a food-truck business built from the ground up, from the vehicle conversion and kitchen workspace to the brand, packaging, product, and customer experience.",
    role:
      "Founded, designed, fabricated, branded, and operated the business across spatial design, product, service, and day-to-day operations.",
    outcome:
      "A functioning mobile food business where the truck, menu, packaging, workflow, and customer interaction had to operate as one system.",
    homeSection: "other-work",
  },
  {
    slug: "commvault-visual-system",
    number: "03",
    title: "Designing for Clarity at Scale",
    description:
      "I designed a scalable system that helps users understand Commvault's complex product capabilities faster while making web content easier to maintain as the product evolves.",
    metricValue: "25%",
    metricText: "increase in product comprehension.",
    tags: ["Visual Systems", "UX Design", "Enterprise UX"],
    meta: "Timeline TBD · Team TBD",
    roleMeta: "Role: UX Design Intern",
    projectTypeMeta: "Project Type: Internship",
    href: "/work/commvault-visual-system",
    previewImage: "",
    summary:
      "This case study will document how scalable visual systems can make dense enterprise product workflows clearer, more reusable, and easier for prospects to understand.",
    role:
      "Defined visual system foundations, translated complex product workflows into clearer web visuals, and prepared reusable patterns for future enterprise storytelling.",
    outcome:
      "Outcome details will be added as the Commvault case study is developed.",
  },
  {
    slug: "learvo-learning",
    number: "01",
    title: "Driving New User Activation",
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
