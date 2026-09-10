export const homeViewValues = ["case-studies", "other-work"] as const;

export type HomeView = (typeof homeViewValues)[number];

export const assistantPageKeys = [
  "work-index",
  "other-work",
  "about",
  "commvault-visual-system",
  "learvo-learning",
  "aws-beginner-mode",
  "cult-cookies",
  "unknown",
] as const;

export type AssistantPageKey = (typeof assistantPageKeys)[number];

export type AssistantPageContext = {
  pageKey: AssistantPageKey;
  title: string;
  routeLabel: string;
  starters: readonly [string, string, string];
};

export const assistantPageRegistry = {
  "work-index": {
    pageKey: "work-index",
    title: "Selected Work",
    routeLabel: "/, Case Studies",
    starters: [
      "Which project best shows Lauren's systems thinking?",
      "How does Lauren approach complex product problems?",
      "Which case study should I explore first?",
    ],
  },
  "other-work": {
    pageKey: "other-work",
    title: "Other Things Lauren Is Proud Of",
    routeLabel: "/, Other Things I'm Proud Of",
    starters: [
      "How does Frequency Finder turn traits into sound?",
      "What did Cult Cookies teach Lauren about systems?",
      "How did Lauren make Monet Gallery immersive?",
    ],
  },
  about: {
    pageKey: "about",
    title: "About Lauren",
    routeLabel: "/about",
    starters: [
      "What shaped Lauren's approach to design?",
      "What is Lauren looking for next?",
      "What does Lauren enjoy outside work?",
    ],
  },
  "commvault-visual-system": {
    pageKey: "commvault-visual-system",
    title: "Commvault Visual System",
    routeLabel: "/work/commvault-visual-system",
    starters: [
      "What did the 25% result actually measure?",
      "How did Lauren simplify without misrepresenting the product?",
      "How was the system designed to scale?",
    ],
  },
  "learvo-learning": {
    pageKey: "learvo-learning",
    title: "Learvo Learning",
    routeLabel: "/work/learvo-learning",
    starters: [
      "How did Lauren define first-session activation?",
      "Why use an interim home state?",
      "How did constraints shape the redesign?",
    ],
  },
  "aws-beginner-mode": {
    pageKey: "aws-beginner-mode",
    title: "AWS EC2 Beginner Mode",
    routeLabel: "/work/aws-beginner-mode",
    starters: [
      "Why make Beginner Mode optional?",
      "What did Lauren learn from testing?",
      "How did she preserve expert control?",
    ],
  },
  "cult-cookies": {
    pageKey: "cult-cookies",
    title: "Cult Cookies",
    routeLabel: "/work/cult-cookies",
    starters: [
      "How did constraints change the operating model?",
      "What did operating the system teach Lauren about design?",
      "How did she design for one operator?",
    ],
  },
  unknown: {
    pageKey: "unknown",
    title: "Lauren Johnson",
    routeLabel: "Unknown route",
    starters: [
      "What kind of product designer is Lauren?",
      "What projects are in Lauren's portfolio?",
      "What roles is Lauren seeking?",
    ],
  },
} as const satisfies Record<AssistantPageKey, AssistantPageContext>;

const caseStudyPageKeys = new Set<AssistantPageKey>([
  "commvault-visual-system",
  "learvo-learning",
  "aws-beginner-mode",
  "cult-cookies",
]);

export function isHomeView(value: unknown): value is HomeView {
  return typeof value === "string" && homeViewValues.includes(value as HomeView);
}

export function isAssistantPageKey(value: unknown): value is AssistantPageKey {
  return (
    typeof value === "string" &&
    assistantPageKeys.includes(value as AssistantPageKey)
  );
}

export function normalizePathname(pathname: unknown): string {
  if (typeof pathname !== "string" || pathname.trim().length === 0) {
    return "/";
  }

  const withoutQuery = pathname.split(/[?#]/)[0] || "/";
  const normalized =
    withoutQuery.length > 1 ? withoutQuery.replace(/\/+$/, "") : withoutQuery;

  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

export function resolveAssistantPage(
  pathname: unknown,
  homeView: unknown,
): AssistantPageContext {
  const normalizedPathname = normalizePathname(pathname);

  if (normalizedPathname === "/" || normalizedPathname === "/work") {
    if (homeView === undefined || homeView === null || homeView === "") {
      return assistantPageRegistry["work-index"];
    }

    if (homeView === "other-work") {
      return assistantPageRegistry["other-work"];
    }

    if (homeView === "case-studies") {
      return assistantPageRegistry["work-index"];
    }

    return assistantPageRegistry.unknown;
  }

  if (normalizedPathname === "/about") {
    return assistantPageRegistry.about;
  }

  const workMatch = normalizedPathname.match(/^\/work\/([^/]+)$/);

  if (workMatch && isAssistantPageKey(workMatch[1])) {
    const pageKey = workMatch[1];

    if (caseStudyPageKeys.has(pageKey)) {
      return assistantPageRegistry[pageKey];
    }
  }

  return assistantPageRegistry.unknown;
}
