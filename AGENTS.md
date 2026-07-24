# Repository Guidance

This repository is Saqib Sohail's public engineering portfolio. Treat content
accuracy, accessibility, performance, and reviewability as product
requirements.

## Source of truth and factuality

Use sources in this order:

1. The approved profile facts recorded in `docs/content-inventory.md`.
2. Public implementation evidence linked from the claim registry.
3. The approved ATS CV for non-conflicting biographical and employment facts.
4. Existing site content only after it has been verified.

Never strengthen a statement merely because similar wording appears in the
visual CV, an old page, a README, or a project description.

Do not describe Saqib as a formal Software Architect, Staff Engineer,
Principal Engineer, Engineering Manager, team lead, or mentor. Do not invent
people management, production scale, user counts, traffic, revenue, uptime,
cloud or Kubernetes expertise, certifications, AI evaluation systems, or
metrics.

Use words such as "architected", "designed", "defined", "owned", and "led"
only when the exact scope is supported by an approved fact or linked evidence.
Prefer concrete descriptions of work and decisions.

Public content must be represented in the claim registry as either:

- `approved`
- `publicly-verified`

Content marked `needs-review` must not be promoted into new public pages.

## Current command policy

The repository has known dependency and lint configuration problems recorded
in `docs/baseline-audit.md`.

Temporary Phase 0 baseline commands:

```bash
npm ci --legacy-peer-deps
npx next build
npx eslint src --max-warnings=0
npx tsc --noEmit --pretty false
npm audit --omit=dev --audit-level=low
```

`npm ci` without the temporary legacy-peer workaround is the target after the
framework/content-pipeline phase. Do not normalize the workaround into CI.
Do not run `npm audit fix --force`.

After Phase 3, the required local quality gate is:

```bash
npm ci
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run test:a11y
npm run build
```

Do not run write-mode formatters, codemods, dependency upgrades, or generated
asset scripts outside the phase that authorizes them.

## Implementation conventions

- Prefer React Server Components.
- Keep interaction and animation in small, named client islands.
- Store profile, experience, metrics, capabilities, and projects in typed
  shared content; do not duplicate them inside pages.
- Use `next/link` for internal navigation and `usePathname` only in client
  navigation components.
- Keep components focused; large monolithic page or layout components require
  decomposition.
- Validate content at build time and keep stable IDs for claims, evidence,
  projects, metrics, and tracker items.
- Preserve existing article source during content-pipeline migrations.
- Do not introduce WebGL, React Three Fiber, or a heavy animation runtime for
  decorative effect.
- Never expose environment secrets, private URLs, or confidential Velsa
  implementation details.

## Accessibility requirements

- Use semantic landmarks, a skip link, logical headings, visible focus, and
  native interactive elements.
- All functionality must work with keyboard, pointer, and touch.
- Information must never be available only on hover, through color, or through
  animation.
- Support browser zoom to at least 200%; do not disable zoom in viewport
  metadata.
- Test the light and dark themes for WCAG AA contrast.
- Every dialog or menu must manage focus, Escape, labelling, and focus return.
- Interactive diagrams need a complete textual equivalent.
- Automated axe checks supplement rather than replace keyboard and screen
  reader review.

## Reduced-motion policy

- Treat `prefers-reduced-motion: reduce` as an application-level requirement.
- Remove continuous, parallax, traveling, scale, bounce, and decorative
  rotation effects.
- Use instant state changes or short opacity changes only when they clarify
  state.
- Content and controls must be complete before animation and understandable
  when JavaScript or motion is unavailable.

## Content and route rules

- The primary position is "Senior frontend-leaning full-stack engineer".
- The main CV CTA downloads the ATS PDF; the visual CV is secondary.
- System-design notes belong under `/writing` until a separate route is
  explicitly approved.
- `/cv` and `/blog` are legacy paths and will receive permanent redirects in
  their assigned phases.
- The accessibility checker remains absent from primary navigation and
  `noindex` until its security gate passes.
- Do not display generic "AI enhanced" or audio claims when a corresponding
  reviewed feature is not available.

## Tracking and commits

- Update `docs/implementation-status.md` in the same commit as the work whose
  status changes.
- Use only the tracker statuses defined there.
- A `DONE` item must link to evidence: files, tests, measurements, screenshots,
  a commit, or reviewed content.
- `DEFERRED` and `SKIPPED` items require a reason and a concrete revisit
  trigger.
- Add a report under `docs/phase-reports/` before completing each phase.
- Make small, descriptive commits. Do not mix framework upgrades, content
  migrations, visual redesign, and security hardening in one commit.
- Never push directly to `master`.
