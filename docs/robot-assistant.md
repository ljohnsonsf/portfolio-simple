# Portfolio robot guide

This is a static frontend Q&A feature. It has no text input, AI calls, database, or backend dependency. `app/layout.tsx` mounts it across the site. The former AI assistant is no longer mounted; its existing files have not been deleted.

## Add approved questions and answers

Edit `lib/robot-qa.ts`. The supplied Home, About, Kara, Commvault, Learvo, AWS, and AI Prototyping copy is installed verbatim. Kara is configured for a future `/work/kara` route; this feature does not create that page. Replace `question` and `answer`, keep IDs unique, and optionally add a link:

```ts
{
  id: "home-1",
  question: "Your approved question",
  answer: "Your approved answer.\nA second paragraph if needed.",
  link: { label: "View the project", href: "/work/learvo-learning" },
}
```

Use `home` for `/` and `/work`, `about` for `/about`, `caseStudies["your-slug"]` for `/work/your-slug`, `aiPrototyping` for the homepage AI Prototypes tab, and `default` for unconfigured routes (currently reuses the approved Home copy). Add or remove entries freely. Use site-relative paths or trusted HTTPS links; answers render as plain text, not HTML.

Questions update on client-side navigation. A page change resets the conversation and cancels a pending answer, so content cannot leak between projects. Closing/reopening on the same page preserves the current conversation. Reloading starts a new conversation. The invitation stays visible until opened or dismissed, and reappears with page-specific wording on navigation. Dismissing it never disables the robot. The laptop pose remains visible whenever the panel is open, briefly switching to closed eyes for one second every five seconds. This cycle continues while choosing questions and answering, and is disabled with reduced motion. When closed, the robot briefly winks every five seconds (except with reduced motion). All poses share a consistent visible height and baseline, without hover/click motion.

## Robot art

The supplied reference character has been prepared as transparent PNG assets and is already installed:

- `public/robot/robot-idle.png` — closed eyes
- `public/robot/robot-hover.png` — wink/terminal expression
- `public/robot/robot-answering.png` — laptop pose
- `public/robot/robot-answering-rest.png` — closed-eye laptop pose

Replace files at these same paths to change artwork. Use consistent proportions and transparent padding. Next.js serves responsive optimized versions; the UI reserves a fixed box to avoid layout shifts. No additional image upload is required.

Asset preparation used the built-in imagegen tool, with one background-extraction edit per supplied pose. Prompt: “Background extraction edit only. Preserve exactly the supplied pixel robot character, pose, expression, pixel outlines, white body and gray shading. Do not redesign or change any character details. Remove the large white/off-white background completely to actual transparency, including outside gaps around arms/legs. Crop closely around the complete robot with small even transparent padding, preserving all limbs and standing pose [or laptop]. Keep pixel edges sharp. Output a single transparent PNG production sprite for the idle [or hover/answering] state of a portfolio website companion. No text, no additional objects.”

## UI files

- `components/robot-assistant/robot-assistant.tsx`: invitation, accessible modeless panel, conversation state, brief answer delay, route changes, session dismissal.
- `components/robot-assistant/robot-character.tsx`: the three image states.
- `components/robot-assistant/robot-assistant.module.css`: scoped styling, responsive sizing, safe areas, and reduced-motion rules.
- `tests/robot-qa.test.ts`: route matching, unique project configuration, IDs, and fallback checks.

Run `node --test --experimental-strip-types tests/robot-qa.test.ts` and `npm run build` to verify. Review approved copy in the preview before publishing. The widget is currently enabled in the local layout.
