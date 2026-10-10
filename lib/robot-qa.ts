/** Approved Q&A copy. Edit questions and answers here without changing the UI. */
export type RobotQuestion = {
  id: string;
  question: string;
  answer: string;
  link?: { label: string; href: string };
};

export const robotQA: {
  home: RobotQuestion[];
  about: RobotQuestion[];
  aiPrototyping: RobotQuestion[];
  caseStudies: Record<string, RobotQuestion[]>;
  default: RobotQuestion[];
} = {
  "home": [
    {
      "id": "home-1",
      "question": "What makes Lauren a strong product design candidate?",
      "answer": "Lauren combines research, systems thinking, and hands-on product design across complex environments. Her recent work spans environmental compliance at Kara, enterprise product communication at Commvault, first-time user activation at Learvo, and internal sales workflows at Atlassian. Across those experiences, a consistent strength is turning complicated information and workflows into clearer experiences that can scale."
    },
    {
      "id": "home-2",
      "question": "What kinds of problems does Lauren do her best work on?",
      "answer": "Lauren gravitates toward products where users have a lot to understand, decide, or navigate. She enjoys finding the structure underneath that complexity, whether that means reworking information architecture, improving onboarding, simplifying technical product communication, or creating reusable design-system patterns. She is especially interested in complex enterprise products, platform and systems work, onboarding, and AI-powered experiences."
    },
    {
      "id": "home-3",
      "question": "How does Lauren turn research into design decisions?",
      "answer": "Lauren uses research to narrow the problem rather than simply validate a finished solution. She looks for recurring behaviors and points of friction, identifies what users actually need to understand or accomplish, and then uses that evidence to decide where design effort will have the most impact. At Learvo, for example, research shifted the problem from “better onboarding” toward a much more specific need for orientation and a reliable starting point."
    },
    {
      "id": "home-4",
      "question": "What measurable impact has Lauren's work had?",
      "answer": "At Commvault, a 14-participant comparative study found that stylized product visuals produced 67% correct capability identification compared with 53% for existing screenshots, a 25% relative improvement. At Learvo, 7 of 8 first-time usability participants completed a core feature flow without assistance after the redesign. Lauren treats both as directional research findings rather than claiming production conversion or revenue impact."
    }
  ],
  "about": [
    {
      "id": "about-1",
      "question": "How has Lauren's background shaped the way she approaches design?",
      "answer": "Lauren's path into product design combines public health, customer-facing experience, HCI, and hands-on product work. Public health taught her to look at human behavior within a wider system, while her customer-facing background strengthened her ability to listen for friction and understand how people describe their needs. Product design gave her a way to combine those perspectives with research, systems thinking, and creative problem solving."
    },
    {
      "id": "about-2",
      "question": "How does Lauren make decisions when user, business, and technical needs compete?",
      "answer": "Lauren starts by clarifying the user outcome, the product goal, and the constraints that cannot be ignored. She then looks for the smallest solution that meaningfully addresses the problem rather than assuming the largest redesign is the strongest one. Learvo's interim home state and Commvault's reusable abstraction framework both reflect that approach."
    },
    {
      "id": "about-3",
      "question": "What is Lauren like to collaborate with?",
      "answer": "Lauren prefers to work closely with partners rather than design in isolation and hand something off at the end. She brings engineering into the process early, aligns around intended outcomes, and documents the reasoning behind decisions. When feedback challenges a direction, she tries to understand the underlying concern, returns to evidence and shared goals, and explores alternatives with the team."
    },
    {
      "id": "about-4",
      "question": "What is Lauren looking to grow into next?",
      "answer": "Lauren wants to continue developing deeper research rigor, product-strategy skills, and technical-product knowledge. She is particularly interested in complex products, design systems and platform work, onboarding and activation, and AI-powered experiences. She is looking for a team where she can continue learning while taking meaningful ownership of real product problems."
    }
  ],
  "aiPrototyping": [
    {
      "id": "ai-1",
      "question": "How does Lauren use AI in her design process?",
      "answer": "Lauren uses AI as a tool for thinking and making rather than as a substitute for design judgment. She uses tools such as Codex and Claude to explore concepts, challenge ideas, prototype interactions, and turn designs into working experiences. AI is especially useful when she wants to move beyond a static mockup and understand how an idea actually behaves."
    },
    {
      "id": "ai-2",
      "question": "What does Frequency Finder reveal about Lauren's approach to AI prototyping?",
      "answer": "Frequency Finder shows how Lauren can take an unusual abstract idea and turn it into a functioning interactive system. She mapped eight personality dimensions into an audio-frequency experience and curated song match, combining interaction design, systems mapping, creative coding, and real audio calculations. AI-assisted tools helped her explore and implement the concept, while the interaction model and creative decisions remained intentionally designed."
    },
    {
      "id": "ai-3",
      "question": "Where does the real audio science end and the creative concept begin in Frequency Finder?",
      "answer": "The EQ filters, frequency calculations, and wavelength relationships use real audio and acoustic mathematics. The relationships between personality traits, frequencies, interpretations, and song profiles are creative mappings made for the experience. Frequency Finder is therefore an interactive experiment, not a validated personality or psychological assessment."
    },
    {
      "id": "ai-4",
      "question": "What does Monet Gallery add to Lauren's AI prototyping work?",
      "answer": "Monet Gallery shows a different side of AI-assisted building. Lauren used design and code to turn an atmospheric visual concept into a functioning web experience with spatial navigation, garden and pond environments, an interactive map, and ambient elements. Together, Monet Gallery and Frequency Finder show that she can use AI-assisted tools for both systems-heavy interactive concepts and visually expressive experiences."
    }
  ],
  "caseStudies": {
    "kara": [
      {
        "id": "kara-1",
        "question": "How is Lauren making a complex compliance product easier to navigate?",
        "answer": "Lauren is mapping the information architecture and relationships between requirements, funds, and assessments to simplify navigation and required data collection. Rather than treating individual screens as isolated problems, she is looking at how information connects across the platform and how those relationships affect the user experience."
      },
      {
        "id": "kara-2",
        "question": "What does Lauren's Kara work reveal about her systems thinking?",
        "answer": "Her work spans both product workflows and the system supporting them. Lauren is building and standardizing reusable Figma components while reconciling inconsistencies between design and the production product. That requires thinking about how individual design decisions fit into a coherent system as the product grows."
      },
      {
        "id": "kara-3",
        "question": "How is Lauren using data to make the product more understandable?",
        "answer": "Lauren is designing data-driven visuals and activity metrics that help customers understand engagement with assessments, including opens, logins, starts, and completion progress. The design challenge is not simply displaying more numbers. It is deciding which signals matter and presenting them in a way that helps customers understand what is happening."
      },
      {
        "id": "kara-4",
        "question": "Why is reconciling design and production an important part of her work?",
        "answer": "A design system only creates value if the designed patterns and the product people actually use remain aligned. At Kara, Lauren is identifying and resolving inconsistencies between Figma and production while standardizing reusable components. That work supports a more consistent experience for users and a more dependable foundation for the team as the product scales."
      }
    ],
    "commvault-visual-system": [
      {
        "id": "commvault-1",
        "question": "Why was simplifying the product harder than just redesigning screenshots?",
        "answer": "The challenge was deciding what could be removed without changing the meaning of the product. Enterprise interfaces contain a lot of accurate information, but not all of it helps someone understand the capability being communicated. Lauren had to separate unnecessary visual detail from context that was essential to preserving real workflows, terminology, and product relationships."
      },
      {
        "id": "commvault-2",
        "question": "What does this project reveal about Lauren's systems thinking?",
        "answer": "Lauren recognized that redesigning screenshots one at a time would solve the immediate visual problem but not the underlying one. She turned recurring interface and communication patterns into reusable components, templates, and decision rules. That shifted the work from producing individual assets to creating a framework intended to support more than 70 potential product placements."
      },
      {
        "id": "commvault-3",
        "question": "What should a hiring manager take away from the 25% result?",
        "answer": "The result matters because Lauren measured whether people actually understood the intended product capability rather than simply asking whether the new visuals looked clearer. Participants using the stylized visuals identified the intended capability more accurately, while an interesting secondary finding showed that people could feel confident even when their understanding was incorrect. It reinforced that perceived clarity and actual comprehension are not always the same thing."
      },
      {
        "id": "commvault-4",
        "question": "If Lauren continued this work, what would she want to learn next?",
        "answer": "The next question would be how the system performs as more teams and product areas use it. That could include whether the comprehension improvement holds across different capabilities, whether other designers can apply the abstraction rules consistently, and whether the system reduces maintenance effort as the underlying product evolves."
      }
    ],
    "learvo-learning": [
      {
        "id": "learvo-1",
        "question": "How did Lauren figure out what users actually needed?",
        "answer": "The evidence suggested that users did not primarily need more features or a larger onboarding experience. They needed to know where to begin and where to return. One revealing behavior was that 5 of 8 observed users clicked the Learvo logo expecting to reach a home destination, which helped turn a broad activation problem into a much more specific orientation problem."
      },
      {
        "id": "learvo-2",
        "question": "Why was the interim home state more than just a compromise?",
        "answer": "A completely new home page may have been the cleaner long-term solution, but it did not fit the team's engineering capacity or timeline. Lauren instead asked what change could improve orientation within the existing architecture. Repurposing an existing page allowed the team to address the immediate user problem without waiting for a larger rebuild."
      },
      {
        "id": "learvo-3",
        "question": "What does the 7-of-8 result actually tell us?",
        "answer": "It shows that, in moderated usability testing, 7 of 8 first-time participants could complete a core feature flow without assistance after the redesign. That provides evidence that the proposed experience helped users reach an important first-session goal. It does not prove that live product activation increased by 88%, which is why Lauren distinguishes usability success from a production business metric."
      },
      {
        "id": "learvo-4",
        "question": "What does Learvo reveal about Lauren as a product designer?",
        "answer": "Learvo shows her ability to take an ambiguous product problem from research and prioritization through interaction design, supporting UI, validation, and developer collaboration. It also demonstrates pragmatic scoping. Rather than designing an ideal experience disconnected from the team's capacity, she focused on a smaller solution that could realistically address the user's immediate problem."
      }
    ],
    "aws-beginner-mode": [
      {
        "id": "aws-1",
        "question": "How did Lauren decide what not to redesign?",
        "answer": "Research uncovered multiple sources of friction across EC2, including jargon, clutter, readability, navigation, and setup complexity. Instead of treating every issue as part of the project, Lauren narrowed the work to the dashboard and Launch Instance flow. Those surfaces represented two important beginner moments: understanding where to start and making consequential setup decisions."
      },
      {
        "id": "aws-2",
        "question": "Why is making Beginner Mode optional an important product decision?",
        "answer": "The project does not assume that the existing EC2 experience is too complex for everyone. Experienced users may value the density, flexibility, and direct access that can overwhelm someone who is new. Making Beginner Mode optional allowed Lauren to provide more guidance for beginners without removing control or efficiency from experienced users."
      },
      {
        "id": "aws-3",
        "question": "What does this project show about how Lauren works in an unfamiliar technical domain?",
        "answer": "Lauren did not begin by assuming she understood EC2 well enough to redesign it. She first learned the product, reviewed more than 50 community discussions, identified recurring patterns, and narrowed the problem before exploring interface solutions. The project demonstrates an approach where understanding the system comes before trying to simplify it."
      },
      {
        "id": "aws-4",
        "question": "What would need to happen before Lauren trusted this concept in production?",
        "answer": "The current testing provides useful directional evidence, but the next stage would need actual EC2 users, technical feasibility assessment, edge-case exploration, accessibility validation, and deeper evaluation of expert workflows. The four participants were new to EC2 but were not active EC2 users, so Lauren does not treat that small study as proof that the concept is production-ready."
      }
    ]
  },
  "default": [
    {
      "id": "default-1",
      "question": "What makes Lauren a strong product design candidate?",
      "answer": "Lauren combines research, systems thinking, and hands-on product design across complex environments. Her recent work spans environmental compliance at Kara, enterprise product communication at Commvault, first-time user activation at Learvo, and internal sales workflows at Atlassian. Across those experiences, a consistent strength is turning complicated information and workflows into clearer experiences that can scale."
    },
    {
      "id": "default-2",
      "question": "What kinds of problems does Lauren do her best work on?",
      "answer": "Lauren gravitates toward products where users have a lot to understand, decide, or navigate. She enjoys finding the structure underneath that complexity, whether that means reworking information architecture, improving onboarding, simplifying technical product communication, or creating reusable design-system patterns. She is especially interested in complex enterprise products, platform and systems work, onboarding, and AI-powered experiences."
    },
    {
      "id": "default-3",
      "question": "How does Lauren turn research into design decisions?",
      "answer": "Lauren uses research to narrow the problem rather than simply validate a finished solution. She looks for recurring behaviors and points of friction, identifies what users actually need to understand or accomplish, and then uses that evidence to decide where design effort will have the most impact. At Learvo, for example, research shifted the problem from “better onboarding” toward a much more specific need for orientation and a reliable starting point."
    },
    {
      "id": "default-4",
      "question": "What measurable impact has Lauren's work had?",
      "answer": "At Commvault, a 14-participant comparative study found that stylized product visuals produced 67% correct capability identification compared with 53% for existing screenshots, a 25% relative improvement. At Learvo, 7 of 8 first-time usability participants completed a core feature flow without assistance after the redesign. Lauren treats both as directional research findings rather than claiming production conversion or revenue impact."
    }
  ]
};

export function questionsForPath(pathname: string, homeView = "case-studies"): RobotQuestion[] {
  const path = pathname.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  if (path === "/" || path === "/work") return homeView === "other-work" ? robotQA.aiPrototyping : robotQA.home;
  if (path === "/about") return robotQA.about;
  const slug = path.match(/^\/work\/([^/]+)$/)?.[1];
  return (slug && Object.hasOwn(robotQA.caseStudies, slug)
    ? robotQA.caseStudies[slug]
    : undefined) ?? robotQA.default;
}

export function invitationForPath(pathname: string, homeView = "case-studies"): string {
  const path = pathname.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  if (/^\/work\/[^/]+$/.test(path)) return "Have any questions about this case study?";
  if (path === "/about") return "Want to know more about Lauren?";
  if ((path === "/" || path === "/work") && homeView === "other-work") return "Have any questions about these prototypes?";
  return "Have a question about Lauren?";
}
