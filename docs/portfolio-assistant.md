# Lauren's Portfolio Assistant

Lauren's Portfolio Assistant is a page-aware drawer mounted from `app/layout.tsx`. It helps visitors ask professional questions about Lauren Johnson's portfolio while keeping the factual and safety logic server-side.

## Architecture

- `components/portfolio-assistant.tsx` renders the launcher, drawer, starter questions, composer, messages, retry, reset, and keyboard interactions.
- `lib/portfolio-assistant/context.ts` owns the approved route and homepage-view map. The UI reads starter questions from this registry instead of hard-coding them in presentation logic.
- `components/work-section.tsx` emits `lauren-portfolio-work-view-change` whenever the homepage tab changes so the assistant can switch between `work-index` and `other-work` without navigation.
- `app/api/portfolio-assistant/route.ts` validates request shape, bounds message/history length, resolves the trusted page context on the server, applies scope classification, rate-limits requests, and calls the Responses API only for professional in-scope questions.
- `lib/portfolio-assistant/knowledge.server.ts`, `safety.ts`, and `answers.server.ts` keep approved professional context, refusal patterns, output validation, and conservative fallback answers out of client UI components.

## Environment

Set these server-side variables in local or production environments:

```bash
OPENAI_API_KEY=...
PORTFOLIO_ASSISTANT_MODEL=gpt-4.1-mini
```

`PORTFOLIO_ASSISTANT_MODEL` is optional. If `OPENAI_API_KEY` is missing or the provider fails, the route returns a conservative grounded fallback for common portfolio questions.

Do not expose the API key through `NEXT_PUBLIC_*`, client bundles, analytics, logs, or responses.

## Content Updates

Update approved content in the server-side knowledge modules and starter registry together:

1. Add or edit the page key in `lib/portfolio-assistant/context.ts`.
2. Add the matching approved professional context in `lib/portfolio-assistant/knowledge.server.ts`.
3. Add route-specific fallback behavior in `lib/portfolio-assistant/answers.server.ts` when a starter question needs deterministic local coverage.
4. Add tests in `tests/portfolio-assistant.test.ts`.
5. Run `npm run test:assistant`, `npm run type-check`, and `npm run build`.

Before deployment, confirm all project claims and metrics remain public and approved. Remove any unresolved editorial marker tokens before building.

## Guardrails

The route accepts plain text only, caps visitor input at 800 characters, keeps at most 16 recent user/assistant messages, rejects client-supplied privileged roles, and validates homepage view state against `case-studies` or `other-work`.

Only professional in-scope questions reach the model. Personal, unrelated, unsafe, action-taking, and prompt-extraction requests receive approved concise refusals. Output is checked for unresolved markers, phone-like values, unapproved emails, unsupported links, and instruction or implementation leakage before display.

The in-memory rate limiter is suitable for local preview and basic server runtime protection. For high-traffic production, pair it with deployment-level rate limiting.
