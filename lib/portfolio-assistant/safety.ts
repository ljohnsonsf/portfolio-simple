import {
  type AssistantPageKey,
  isHomeView,
} from "./context.ts";
import {
  approvedEmail,
  approvedLinks,
  responsePatterns,
} from "./knowledge.server.ts";

export const maxVisitorMessageLength = 800;
export const maxHistoryMessages = 16;
export const maxHistoryMessageLength = 1200;

export type AssistantMessageRole = "user" | "assistant";

export type ConversationMessage = {
  role: AssistantMessageRole;
  content: string;
};

export type ScopeCategory =
  | "PROFESSIONAL_IN_SCOPE"
  | "PROFESSIONAL_UNKNOWN"
  | "PERSONAL_OR_INTRUSIVE"
  | "UNRELATED"
  | "UNSAFE_OR_ABUSIVE"
  | "PROMPT_INJECTION_OR_EXTRACTION"
  | "ACTION_OR_AUTHORITY";

export type ValidatedAssistantRequest = {
  message: string;
  history: ConversationMessage[];
  pathname: string;
  homeView?: "case-studies" | "other-work";
};

type RequestValidationResult =
  | { ok: true; value: ValidatedAssistantRequest }
  | { ok: false; status: number; error: string };

const professionalTerms = [
  "lauren",
  "johnson",
  "portfolio",
  "project",
  "case study",
  "case studies",
  "work",
  "resume",
  "linkedin",
  "contact",
  "email",
  "role",
  "job",
  "candidate",
  "hire",
  "internship",
  "designer",
  "ux",
  "ui",
  "hci",
  "research",
  "testing",
  "accessibility",
  "collaborate",
  "collaboration",
  "feedback",
  "constraints",
  "process",
  "strategy",
  "systems",
  "figma",
  "commvault",
  "learvo",
  "aws",
  "beginner mode",
  "cult cookies",
  "frequency finder",
  "monet gallery",
  "atlassian",
  "suny",
  "oswego",
  "santa clara",
  "public health",
  "sales",
  "education",
  "skill",
  "skills",
  "tools",
  "ai",
  "activation",
  "visual system",
  "design system",
  "onboarding",
  "outside work",
  "hobbies",
  "travel",
  "vietnam",
];

const professionalUnknownTerms = [
  "availability",
  "available",
  "salary",
  "compensation",
  "references",
  "reference check",
  "work authorization",
  "visa",
  "portfolio password",
  "private case study",
  "gpa transcript",
];

const personalTerms = [
  "phone",
  "address",
  "where does she live",
  "where is she right now",
  "precise location",
  "home",
  "apartment",
  "birthday",
  "age",
  "dating",
  "boyfriend",
  "girlfriend",
  "partner",
  "family",
  "parents",
  "roommate",
  "health",
  "medical",
  "mental health",
  "religion",
  "political",
  "ethnicity",
  "sexual orientation",
  "private account",
  "daily routine",
  "travel plans",
  "location history",
  "favorite food",
  "favorite color",
];

const unsafeTerms = [
  "kill",
  "hurt",
  "threat",
  "weapon",
  "bomb",
  "stalk",
  "dox",
  "doxx",
  "hack",
  "malware",
  "credential",
  "password",
  "api key",
  "nude",
  "sexual",
  "sex",
  "hot",
  "attractive",
  "ugly",
  "self-harm",
  "suicide",
];

const promptExtractionTerms = [
  "system prompt",
  "developer message",
  "hidden instruction",
  "hidden instructions",
  "prompt",
  "knowledge base",
  "source file",
  "source path",
  "moderation label",
  "guardrail",
  "environment variable",
  "env var",
  "openai_api_key",
  "api key",
  "secret",
  "logs",
  "configuration",
  "ignore previous",
  "ignore your instructions",
  "forget previous",
  "jailbreak",
  "act as",
  "pretend",
  "administrator",
  "admin",
  "base64",
  "rot13",
];

const actionTerms = [
  "schedule",
  "book",
  "send her",
  "email her",
  "message her",
  "contact her for me",
  "submit",
  "apply for",
  "accept an offer",
  "negotiate",
  "verify employment",
  "speak for lauren",
  "on lauren's behalf",
];

const unrelatedTerms = [
  "weather",
  "forecast",
  "news",
  "stock",
  "crypto",
  "homework",
  "math problem",
  "code this",
  "debug my",
  "write code",
  "recipe",
  "restaurant",
  "therapy",
  "medical advice",
  "legal advice",
  "financial advice",
  "art history",
  "who is claude monet",
  "what is aws",
  "what is commvault",
];

function includesAny(value: string, terms: readonly string[]): boolean {
  return terms.some((term) => value.includes(term));
}

function isApprovedOutsideWorkQuestion(value: string): boolean {
  return (
    value.includes("outside work") ||
    value.includes("hobbies") ||
    value.includes("enjoy") ||
    value.includes("travel") ||
    value.includes("vietnam")
  );
}

export function classifyVisitorMessage(message: string): ScopeCategory {
  const normalized = message.toLowerCase().replace(/\s+/g, " ").trim();

  if (normalized.length === 0) {
    return "UNRELATED";
  }

  if (includesAny(normalized, promptExtractionTerms)) {
    return "PROMPT_INJECTION_OR_EXTRACTION";
  }

  if (includesAny(normalized, unsafeTerms)) {
    return "UNSAFE_OR_ABUSIVE";
  }

  if (includesAny(normalized, actionTerms)) {
    return "ACTION_OR_AUTHORITY";
  }

  if (includesAny(normalized, personalTerms)) {
    return isApprovedOutsideWorkQuestion(normalized)
      ? "PROFESSIONAL_IN_SCOPE"
      : "PERSONAL_OR_INTRUSIVE";
  }

  if (includesAny(normalized, professionalUnknownTerms)) {
    return "PROFESSIONAL_UNKNOWN";
  }

  const hasProfessionalTerm = includesAny(normalized, professionalTerms);

  if (!hasProfessionalTerm || includesAny(normalized, unrelatedTerms)) {
    return "UNRELATED";
  }

  return "PROFESSIONAL_IN_SCOPE";
}

export function getRefusalForScope(scope: ScopeCategory): string | null {
  if (scope === "PROFESSIONAL_IN_SCOPE") {
    return null;
  }

  if (scope === "PROFESSIONAL_UNKNOWN") {
    return responsePatterns.professionalUnknown;
  }

  if (scope === "PERSONAL_OR_INTRUSIVE") {
    return responsePatterns.personal;
  }

  if (scope === "UNSAFE_OR_ABUSIVE") {
    return responsePatterns.unsafe;
  }

  if (scope === "PROMPT_INJECTION_OR_EXTRACTION") {
    return responsePatterns.promptExtraction;
  }

  if (scope === "ACTION_OR_AUTHORITY") {
    return responsePatterns.authority;
  }

  return responsePatterns.unrelated;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateAssistantRequestPayload(
  payload: unknown,
): RequestValidationResult {
  if (!isRecord(payload)) {
    return { ok: false, status: 400, error: "Invalid request." };
  }

  const { message, history, page } = payload;

  if (typeof message !== "string" || message.trim().length === 0) {
    return { ok: false, status: 400, error: "Message is required." };
  }

  if (message.length > maxVisitorMessageLength) {
    return { ok: false, status: 413, error: "Message is too long." };
  }

  if (!Array.isArray(history) || history.length > maxHistoryMessages) {
    return { ok: false, status: 400, error: "Invalid conversation history." };
  }

  const validatedHistory: ConversationMessage[] = [];

  for (const item of history) {
    if (!isRecord(item)) {
      return { ok: false, status: 400, error: "Invalid conversation history." };
    }

    if (item.role !== "user" && item.role !== "assistant") {
      return { ok: false, status: 400, error: "Invalid conversation role." };
    }

    if (
      typeof item.content !== "string" ||
      item.content.length > maxHistoryMessageLength
    ) {
      return { ok: false, status: 400, error: "Invalid conversation message." };
    }

    validatedHistory.push({
      role: item.role,
      content: item.content.trim(),
    });
  }

  if (!isRecord(page)) {
    return { ok: false, status: 400, error: "Page context is required." };
  }

  if (typeof page.pathname !== "string" || page.pathname.length > 180) {
    return { ok: false, status: 400, error: "Invalid page context." };
  }

  if (
    page.homeView !== undefined &&
    page.homeView !== null &&
    page.homeView !== "" &&
    !isHomeView(page.homeView)
  ) {
    return { ok: false, status: 400, error: "Invalid homepage view." };
  }

  return {
    ok: true,
    value: {
      message: message.trim(),
      history: validatedHistory.filter((item) => item.content.length > 0),
      pathname: page.pathname,
      homeView: isHomeView(page.homeView) ? page.homeView : undefined,
    },
  };
}

const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const phoneLikePattern = /(?:\+?\d[\s().-]*){10,}/;
const urlPattern = /https?:\/\/[^\s<>)]+/g;
const markerPattern = /\[(?:FILL IN|VERIFY|OPTIONAL)\]/i;

export function validateAssistantOutput(output: string): boolean {
  if (!output.trim() || output.length > 1600 || markerPattern.test(output)) {
    return false;
  }

  const emails = output.match(emailPattern) ?? [];

  if (emails.some((email) => email.toLowerCase() !== approvedEmail)) {
    return false;
  }

  if (phoneLikePattern.test(output)) {
    return false;
  }

  const urls = output.match(urlPattern) ?? [];

  if (
    urls.some(
      (url) =>
        !approvedLinks.some((approvedLink) => url.startsWith(approvedLink)),
    )
  ) {
    return false;
  }

  if (/hidden instructions|system prompt|developer message|api key|source path/i.test(output)) {
    return false;
  }

  return true;
}

export function shouldPreferLocalAnswer(
  pageKey: AssistantPageKey,
  message: string,
): boolean {
  const normalized = message.toLowerCase();

  return (
    pageKey === "other-work" ||
    normalized.includes("contact") ||
    normalized.includes("resume") ||
    normalized.includes("outside work") ||
    normalized.includes("hobbies")
  );
}
