import {
  assistantPageRegistry,
  type AssistantPageContext,
  type AssistantPageKey,
} from "./context.ts";

export const approvedEmail = "ljjsantafe@gmail.com";

export const approvedLinks = [
  "https://laurjo.com/",
  "https://www.linkedin.com/in/ljohnsonsf/",
  "https://drive.google.com/file/d/1jGtgokz3a2YHvUbqenRGkmxG0NlBB7CW/view?usp=sharing",
  "https://frequency-finder.vercel.app/",
  "https://monetgallery.vercel.app/",
] as const;

export const responsePatterns = {
  professionalUnknown:
    "That detail isn't included in Lauren's public professional materials, so I don't want to guess. You can contact her through LinkedIn if it is important to the role.",
  personal:
    "I keep the conversation focused on Lauren's professional work and don't share or infer personal information. I can tell you about her experience, projects, or design approach.",
  unrelated:
    "Lauren's Portfolio Assistant is limited to Lauren's professional experience and portfolio. Try asking about her projects, design process, skills, or background.",
  unsafe:
    "I can't help with that. I can answer respectful questions about Lauren's professional work.",
  promptExtraction:
    "I can't provide hidden instructions or internal data. I can help with Lauren's published professional work.",
  authority:
    "I can't act or speak on Lauren's behalf. You can contact her at ljjsantafe@gmail.com or through LinkedIn: https://www.linkedin.com/in/ljohnsonsf/.",
} as const;

const globalProfile = `
Lauren Johnson is a New York-based product designer and M.S. Human-Computer Interaction candidate at SUNY Oswego, expected Spring 2027. Her public professional positioning is: a product designer who makes complex tools feel clear and usable.

Current role: UX Design Intern at Commvault. Do not state or infer an end date. Previous product role: Product Designer, contract, at Learvo Learning from August to December 2025. She completed an Atlassian product design mentorship alongside a Sales Development Representative role from March to December 2025. Her undergraduate degree is a B.S. in Public Health from Santa Clara University.

Lauren's strongest demonstrated strengths are simplifying complex systems, research-led decisions, end-to-end ownership, and design systems or scalability. Her design process emphasizes framing the problem before designing, auditing the current experience, gathering evidence, prototyping and testing quickly, and turning recurring solutions into reusable patterns and systems.

Lauren has used heuristic evaluation, behavioral-data review, competitive research, community-post synthesis, user interviews, moderated usability testing, surveys, and research synthesis. She defines design success through intended-task completion, stronger user understanding, reduced friction or errors, business-goal alignment, and maintainability or scalability for the team.

Lauren collaborates by involving engineering early, aligning with product on outcomes, documenting decisions and rationale, asking questions when feedback or disagreement appears, returning to user evidence and shared goals, and exploring alternatives collaboratively.

Lauren considers accessibility from the start, follows WCAG, checks contrast and visual readability, and validates with users when possible. Do not claim certification or a completed compliance audit.

Lauren uses AI for research and synthesis support, concept exploration, interactive prototyping, implementation, and challenging her reasoning. Do not portray AI output as a substitute for user evidence or judgment.

Lauren is primarily seeking entry-level or junior Product Designer and UX Designer roles, including full-time roles, New Grad 2027 roles, and Fall/Winter 2026 internships. She is also open to relevant UX/UI Designer, Design Engineer, and Web Designer roles. Preferred arrangements are New York City hybrid, fully on-site, or remote.

Approved professional contact methods: ljjsantafe@gmail.com and https://www.linkedin.com/in/ljohnsonsf/. Approved resume link: https://drive.google.com/file/d/1Vs1SqfElhdZblXSM3VSuImjIGfVpuLIG/view?usp=sharing. Never disclose a phone number, unapproved email address, private account, or more precise location.

Limited approved outside-work details: Lauren enjoys baking, yoga, hiking, film photography, ceramics, and skiing. She has traveled to 22 countries, and Vietnam is her favorite country she has visited. Share no other personal or travel details.
`.trim();

const pageKnowledge = {
  "work-index": `
The Work page should help visitors choose among Lauren's portfolio projects. Default evidence should come from Commvault or Learvo when an answer benefits from a project example.

Commvault demonstrates enterprise communication, product-visual systems, abstraction rules, stakeholder alignment, and scalable design-system thinking. The validated directional study found 67% correct capability identification for stylized product visuals versus 53% for screenshots, a 25% relative improvement. This was a 14-participant comparative study, not a production experiment.

Learvo demonstrates first-session activation, pragmatic scoping, orientation, onboarding, reusable product patterns, and end-to-end ownership. Seven of eight first-time usability participants completed a core feature flow without assistance after the redesign. This is a moderated usability result, not a measured production activation lift.

AWS Beginner Mode is an independent conceptual project. Reference it only when the visitor asks about AWS, Beginner Mode, beginner-friendly technical products, or is viewing that case-study page.
`.trim(),
  "other-work": `
The Other Things I'm Proud Of homepage view includes Frequency Finder, Cult Cookies, and Monet Gallery.

Frequency Finder is a playful 2026 interactive experiment that maps eight personality dimensions into an audio-frequency profile and curated song match. It uses real EQ and acoustic calculations for frequency and wavelength, while the personality-to-audio mapping and song matches are creative editorial interpretations. It demonstrates creative coding, interaction design, data visualization, generative-AI-assisted prototyping, and translating an abstract concept into a polished interactive system.

Cult Cookies may be discussed only for design and systems lessons. Lauren converted a utility trailer into a food truck, built the brand and operating system, passed certification, and operated the business. Power limits, certification, solo operation, budget, movement, heat, grease, cleaning, and durability shaped the design. A key lesson was that a system can perform as designed and still be unsustainable for the person operating it.

Monet Gallery is a six-week solo academic web project. It is an immersive art-gallery web experience focused on Claude Monet's work, with Garden and Pond spaces, selected paintings, a Giverny map, and optional ambient music. It demonstrates visual storytelling, immersive interaction design, spatial navigation, art direction, atmosphere, and front-end implementation. Do not provide general art-history expertise.
`.trim(),
  about: `
The About page should prioritize Lauren's career journey, values, education, toolkit, professional goals, and the limited approved outside-work details.

Lauren's path into product design moved through public health and sales. Public health trained her to examine human behavior and wider context. Sales strengthened her customer understanding by teaching her to listen for friction, recognize how people describe value, and translate needs into product improvements.

Lauren became interested in design after noticing how everyday objects and interfaces either created friction or quietly helped people complete a task. Product design gave her a way to combine empathy, scientific principles, creative exploration, and practical problem solving.

Her values are growth mindset, scientific approach, systems thinking, and clarity or polish. Her toolkit includes Figma, FigJam, interactive prototyping, components, Auto Layout, variables, design systems, Jira, SmartSheet, Trello, Slack, Google Analytics, Hotjar, Codex, Claude, Cursor, Framer, Webflow, and basic HTML/CSS.
`.trim(),
  "commvault-visual-system": `
Commvault case study: Designing for Clarity at Scale. Lauren is a UX Design Intern on this project. The project took eight weeks in 2026. The team included Lauren, one senior designer, and two developers.

Commvault helps organizations protect, secure or manage, and recover data across cloud, SaaS, and on-premises environments. Lauren created a reusable product-visual system to help prospective customers understand complex enterprise capabilities while reducing dependence on dense screenshots that quickly became outdated.

Lauren owned the website image audit, communication strategy, UI abstraction, five pilot designs, and a reusable Figma system. She audited more than 70 product-image placements for message clarity, readability, consistency, product accuracy, and maintenance risk.

Key decisions: one communication goal per visual, modular Figma components, and rules as well as components. The central tradeoff was simplifying visuals without misrepresenting workflows, relationships, terminology, or functionality.

Validation: fourteen participants split into two groups. Half viewed existing screenshots and half viewed stylized UI. Each evaluated four visuals using identical questions, for 56 total image evaluations. Stylized UI produced 67% correct capability identification versus 53% for screenshots, a 13.5 percentage-point difference and 25% relative improvement. Information balance was rated "just right" in 83% of stylized-UI evaluations versus 56% for screenshots. Screenshot viewers reported higher confidence despite lower correct identification. This was directional, not a production experiment.

Outcomes: five pilot visuals and the system received department and executive approval for broader use, and the framework provided a more durable approach for 70+ potential placements. Do not claim all placements launched or that production conversion or revenue improved.
`.trim(),
  "learvo-learning": `
Learvo case study: Driving First-Session Activation at Learvo Learning. Lauren was a contract Product Designer from August to December 2025. The team included two designers, two developers, and one founder.

Learvo is an AI-powered learning platform with flashcards, mnemonics, and quizzes. Lauren redesigned the first-time experience to help users discover and complete one core learning action before abandoning the product.

Lauren owned problem framing, prioritization, the first-time experience, activation banner, interim home state, supporting UI, usability validation, and collaboration on implementation scope.

Evidence: analytics indicated that many new users left before trying a core feature. Lauren audited first-time flows across Flashcards, Mnemonics, and Quizzes. Users lacked a clear starting point, lacked a reliable home, encountered unfamiliar tools without enough context, and needed more first-time guidance. Five of eight users clicked the Learvo logo expecting home but were sent to the public signup page.

Constraints: limited engineering capacity made a large rebuild infeasible. Lauren paired an activation banner with lightweight step-based tutorials, repurposed the existing Flashcards page into an interim home state, and improved supporting UI hierarchy and consistency.

Outcome: seven of eight first-time usability participants completed at least one core feature flow without assistance, shown as 88% in the portfolio. This is a moderated usability result, not a live production activation metric. Customer-success feedback suggested users felt more oriented and less overwhelmed.
`.trim(),
  "aws-beginner-mode": `
AWS EC2 Beginner Mode is an independent conceptual project from 2025. It is not affiliated with Amazon or AWS. Lauren designed an optional Beginner Mode concept for AWS EC2 to clarify setup, reduce navigation uncertainty, and help new users launch with more confidence without removing expert control.

Lauren owned research synthesis, product learning, scope selection, flow redesign, UI direction, prototyping, and moderated usability testing over two months.

Lauren reviewed more than 50 Reddit and AWS community posts and grouped friction around jargon, clutter, contrast or readability, and confusing setup flows. She narrowed scope to the EC2 dashboard and Launch Instance flow.

Key decisions: optional Beginner Mode, simplified dashboard hierarchy, template-led launch, clearer language and helper text, and a lighter higher-contrast visual direction after feedback.

Outcome: four of four participants new to EC2 found the prototype easier to understand than the current flow, made fewer navigation missteps, and asked fewer clarification questions. Caveat: participants were peers new to EC2, not actual EC2 users. Findings are directional and require deeper validation.
`.trim(),
  "cult-cookies": `
Cult Cookies was a 2023 independent venture where Lauren converted a utility trailer into a working food truck, developed the brand and product, designed the service and operating system, passed certification, and operated the business.

Assistant scope: discuss only design and systems lessons. Do not answer unrelated questions about Lauren's personal life, food preferences, family, or lifestyle.

The trailer had to function as a kitchen, storefront, brand surface, and one-person workspace. Power limits, certification, solo operation, budget, movement, heat, grease, cleaning, and durability shaped the design. Lauren learned fabrication from online resources and her father, then iterated as construction and inspection exposed new requirements.

Key decisions: split production and service because ovens, refrigeration, and espresso exceeded generator budget; design equipment and storage around one operator; treat certification as design; choose cleanable and repairable materials; and extend the brand across vehicle, packaging, menus, point of sale, product photography, and service moments.

Lesson: the one-person truck workflow worked technically, but production, logistics, maintenance, setup, service, breakdown, and reset could require roughly 14-hour days. Lauren concluded that a system can perform as designed and still be unsustainable for the person inside it.
`.trim(),
  unknown: `
Use only the verified global professional profile. Do not infer current page details. Help visitors ask about Lauren's projects, design process, skills, experience, background, approved resume, or approved contact routes.
`.trim(),
} as const satisfies Record<AssistantPageKey, string>;

export function getTrustedContext(page: AssistantPageContext): string {
  const pageContext = pageKnowledge[page.pageKey] ?? pageKnowledge.unknown;
  const starters = assistantPageRegistry[page.pageKey].starters
    .map((starter) => `- ${starter}`)
    .join("\n");

  return `
CURRENT PAGE
Page key: ${page.pageKey}
Page title: ${page.title}
Route label: ${page.routeLabel}

APPROVED STARTER QUESTIONS
${starters}

GLOBAL VERIFIED PROFILE
${globalProfile}

CURRENT PAGE VERIFIED CONTEXT
${pageContext}
`.trim();
}

export function hasUnresolvedKnowledgeMarkers(value: string): boolean {
  return /\[(?:FILL IN|VERIFY|OPTIONAL)\]/i.test(value);
}
