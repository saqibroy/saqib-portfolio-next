# Phase 13 — Visual systems and evidence

## Production check

- Remote `master` resolved to `d0f69a4`, the merge of Phase 12 PR #18.
- Vercel production deployment `dpl_9wBDacjuFUQqdvFVLPXbDVw9i2PT` was created at 2026-07-25 13:00:57 CEST, immediately after that merge, is Ready, and aliases `ssohail.com`.
- A current public response includes Phase 12 homepage markers. The custom domain is assigned to the `ssohail` Vercel project.

## Evidence baseline

`docs/tactical-tech-system-audit.md` records the local source audit for the Phase 13 content-and-search visual. No public Tactical Tech system detail should exceed that audit.

## Delivered visual work

- Replaced the static selected-system labels with the Framer Motion
  `SystemShowcase`: keyboard arrow-key tabs, click/touch selection, a
  seven-second auto-advance that pauses for pointer, focus, and interaction,
  and a complete static text version. Reduced-motion users receive the complete
  static diagram state without automatic advancement.
- Replaced homepage and case-study list/React Flow diagrams with project-specific
  SVG compositions for the AI contract flow, Tactical Tech content/search,
  Jobs Tracker, and the crawler dashboard. Every case-study SVG is paired with
  a collapsed native textual flow.
- Reworked Experience into four concise evidence groups, a visual timeline with
  expanded recent roles and a compact disclosure for earlier roles, and one
  combined education-and-languages section.
- Replaced the URL-shortener arrow list with an explanatory SVG that separates
  create and redirect paths and places analytics asynchronously outside the
  redirect path. Its native `<details>` equivalent remains available.

## Local quality evidence

- `npm run lint` — passed.
- `npm run typecheck` — passed.
- `npm run test` — passed (19 tests).
- `npm run test:e2e` — passed (38 Chromium tests), including no-JavaScript,
  keyboard tabs, touch selection, reduced motion, visual capture, and
  200%-equivalent reflow.
- `npm run test:a11y` — passed (11 route/theme axe checks).
- `npm run build` — passed; all intended static routes generated.

## Captures

- `docs/screenshots/phase-13/home-light-desktop.png`
- `docs/screenshots/phase-13/home-dark-mobile.png`
- `docs/screenshots/phase-13/experience-light-desktop.png`
- `docs/screenshots/phase-13/experience-dark-mobile.png`
- `docs/screenshots/phase-13/tactical-tech-light-desktop.png`
- `docs/screenshots/phase-13/ai-workflow-dark-mobile.png`
- `docs/screenshots/phase-13/url-shortener-light-desktop.png`

## Remaining review point

The dark mobile captures use the browser colour-scheme preference. The site’s
interactive theme toggle is separately covered by Chromium persistence and
two-theme axe tests. The branch still needs normal draft-PR review before any
merge.
