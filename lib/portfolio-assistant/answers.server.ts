import type { AssistantPageKey } from "./context.ts";
import { responsePatterns } from "./knowledge.server.ts";

function includesAny(value: string, terms: readonly string[]): boolean {
  return terms.some((term) => value.includes(term));
}

function isAiPracticeQuestion(value: string): boolean {
  return /\bai\b|artificial intelligence|codex|claude/.test(value);
}

export function createGroundedFallbackAnswer(
  message: string,
  pageKey: AssistantPageKey,
): string {
  const normalized = message.toLowerCase();

  if (includesAny(normalized, ["contact", "email", "linkedin", "reach"])) {
    return "You can contact Lauren at ljjsantafe@gmail.com or through LinkedIn: https://www.linkedin.com/in/ljohnsonsf/. The assistant cannot message Lauren or speak on her behalf.";
  }

  if (includesAny(normalized, ["resume", "cv"])) {
    return "Lauren's approved public resume is here: https://drive.google.com/file/d/1Vs1SqfElhdZblXSM3VSuImjIGfVpuLIG/view?usp=sharing. Her resume context is global because the portfolio opens it as an external document.";
  }

  if (
    includesAny(normalized, [
      "outside work",
      "hobbies",
      "enjoy",
      "travel",
      "vietnam",
    ])
  ) {
    return "Outside work, Lauren enjoys baking, yoga, hiking, film photography, ceramics, and skiing. She has traveled to 22 countries, and Vietnam is her favorite country she has visited.";
  }

  if (includesAny(normalized, ["accessibility", "wcag", "contrast"])) {
    return "Lauren considers accessibility from the start of the design process. She follows WCAG, checks contrast and visual readability, and validates with users when possible. Her portfolio does not claim a formal accessibility certification or completed compliance audit.";
  }

  if (isAiPracticeQuestion(normalized)) {
    return "Lauren uses AI for research and synthesis support, concept exploration, interactive prototyping, implementation, and challenging her reasoning. She treats AI as a tool for exploration and making, not as a replacement for user evidence or design judgment.";
  }

  if (includesAny(normalized, ["collaborat", "teammate", "feedback", "disagreement"])) {
    return "Lauren collaborates by involving engineering early, aligning with product on outcomes, and documenting decisions and rationale. When feedback or disagreement comes up, she asks questions to understand the concern, returns to user evidence and shared goals, and explores alternatives with the team.";
  }

  if (includesAny(normalized, ["looking for", "roles", "next", "opportunity", "internship"])) {
    return "Lauren is primarily seeking entry-level or junior Product Designer and UX Designer roles, including full-time, New Grad 2027, and Fall/Winter 2026 internship opportunities. She is especially interested in complex enterprise products, design systems or platform work, AI-powered products, and onboarding or activation.";
  }

  if (
    pageKey === "commvault-visual-system" ||
    includesAny(normalized, ["commvault", "25%", "capability", "visual system", "scale"])
  ) {
    if (includesAny(normalized, ["25", "measure", "metric", "comprehension"])) {
      return "The 25% result refers to a relative improvement in correct capability identification in a 14-participant comparative study. Stylized product visuals produced 67% correct identification versus 53% for screenshots. It was directional evidence from testing, not a production conversion or revenue result.";
    }

    if (includesAny(normalized, ["misrepresent", "simplify", "accuracy"])) {
      return "Lauren simplified Commvault's visuals by giving each one a single communication goal, removing unrelated interface detail, and preserving recognizable workflows, relationships, and terminology. The tradeoff was less literal completeness in exchange for clearer comprehension and easier maintenance.";
    }

    return "At Commvault, Lauren created a reusable product-visual system for complex enterprise capabilities. She audited 70+ placements, designed five pilot visuals, built reusable Figma components and abstraction rules, and helped the system earn cross-functional and executive approval for broader use.";
  }

  if (
    pageKey === "learvo-learning" ||
    includesAny(normalized, ["learvo", "activation", "first-session", "first session", "7 of 8", "88"])
  ) {
    if (includesAny(normalized, ["interim home", "home state", "new home"])) {
      return "Lauren chose an interim home state because limited engineering capacity made a net-new home page unrealistic. She repurposed an existing high-traffic page with guidance, progress cues, recent activity, and reliable home behavior so users had a clearer place to start.";
    }

    if (includesAny(normalized, ["7", "8", "88", "metric", "show"])) {
      return "The Learvo result means seven of eight first-time usability participants completed at least one core feature flow without assistance. It showed the redesigned flow improved orientation in moderated testing, but it was not a measured live production activation lift.";
    }

    return "At Learvo, Lauren redesigned the first-time user experience so new users could discover and complete one core learning action. She owned problem framing, prioritization, activation patterns, the interim home state, supporting UI, usability validation, and collaboration on implementation scope.";
  }

  if (includesAny(normalized, ["why", "strong candidate", "candidate", "hire"])) {
    return "Lauren is a strong candidate because her portfolio shows research-led problem framing, practical scoping, polished execution, and systems thinking. Commvault demonstrates scalable enterprise communication, while Learvo shows end-to-end ownership of first-session activation within real implementation constraints.";
  }

  if (includesAny(normalized, ["approach", "process", "strategy", "complex"])) {
    return "Lauren starts by framing the user outcome, product goal, and constraints before designing. She audits the current experience, gathers the most relevant evidence, prototypes and tests quickly, then turns repeated solutions into reusable patterns when the problem is likely to recur.";
  }

  if (includesAny(normalized, ["skills", "tools", "best at", "strength"])) {
    return "Lauren's strongest demonstrated skills are simplifying complex systems, research-led decisions, end-to-end ownership, and design systems or scalability. Her toolkit includes Figma, FigJam, interaction design, usability testing, Jira, analytics tools, Codex, Claude, Cursor, Framer, Webflow, and basic HTML/CSS.";
  }

  if (
    pageKey === "aws-beginner-mode" ||
    includesAny(normalized, ["aws", "ec2", "beginner mode", "expert control"])
  ) {
    return "AWS Beginner Mode is Lauren's independent conceptual project, not an Amazon or AWS-affiliated feature. She reviewed 50+ community posts, focused on the EC2 dashboard and Launch Instance flow, and made Beginner Mode optional so new users could get clearer guidance while experienced users kept speed and control.";
  }

  if (
    pageKey === "cult-cookies" ||
    includesAny(normalized, ["cult cookies", "food truck", "one operator", "unsustainable"])
  ) {
    return "Cult Cookies is useful as a design-systems lesson: constraints shaped the operating model, spatial layout, brand system, certification work, and one-person workflow. Lauren learned that a system can technically work and still be unsustainable when production, setup, service, maintenance, and reset ask too much of the person operating it.";
  }

  if (
    pageKey === "other-work" ||
    includesAny(normalized, ["frequency finder", "traits", "sound", "frequency"])
  ) {
    if (includesAny(normalized, ["frequency finder", "traits", "sound", "audio", "frequency"])) {
      return "Frequency Finder is a playful interactive experiment that maps eight personality dimensions into an audio-frequency profile and curated song match. Frequency and wavelength use real audio math, while the personality-to-audio mapping and song matches are creative editorial interpretations.";
    }
  }

  if (
    pageKey === "other-work" ||
    includesAny(normalized, ["monet", "gallery", "immersive", "giverny"])
  ) {
    if (includesAny(normalized, ["monet", "gallery", "immersive", "giverny"])) {
      return "Monet Gallery is Lauren's six-week solo academic web project. She made it feel immersive through Garden and Pond spaces, selected paintings, ambient music, spatial navigation, and a Giverny map that connects locations to the painting experience.";
    }
  }

  if (includesAny(normalized, ["which project", "case study", "explore first"])) {
    return "For systems thinking or enterprise clarity, start with Commvault. For onboarding, activation, and pragmatic product scoping, start with Learvo. If you want a more conceptual technical-design example, AWS Beginner Mode is the strongest fit.";
  }

  if (pageKey === "about") {
    return "Lauren's path into product design connects public health, sales, and HCI. Public health shaped how she studies behavior and context, while sales strengthened her customer understanding. Product design lets her combine evidence, empathy, systems thinking, and creative problem solving.";
  }

  return responsePatterns.professionalUnknown;
}
