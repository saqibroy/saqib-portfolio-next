# Portfolio Rebuild Plan

**Status:** Approved

**Primary audience:** Recruiters, engineering managers, and interviewers in
Germany and Europe

**Current implementation branch:** `upgrade` (Phase 0 only)

**Production URL:** `https://ssohail.com`

## Outcome

Rebuild the portfolio into a focused senior frontend-leaning full-stack
engineering site that demonstrates product frontend architecture,
application-level system design, service integration, accessibility,
performance, applied-AI integration, end-to-end ownership, and explicit
technical trade-offs.

The site must make its positioning and strongest verified outcomes clear
within roughly 30 seconds, without unsupported seniority, scale, or impact
claims.

## Locked product decisions

- Use a restrained CV-inspired identity: cerulean/teal accent, near-black and
  off-white surfaces, and a subtle serif/sans pairing.
- The primary download is the ATS CV. The visual CV is a labeled secondary
  option on `/experience`.
- Architecture notes use a `system-design` category under `/writing`; there is
  no `/system-design` route in this release.
- `/cv` permanently redirects to `/experience`.
- `/blog` and existing post paths permanently redirect to `/writing`
  equivalents.
- Framework and dependency remediation happens before visual redesign.
- The accessibility checker stays unlinked and `noindex` until its security
  gate passes.
- Approved prompt facts take precedence over old site copy and stronger CV
  wording.
- The hero uses accessible HTML controls with decorative SVG connections; it
  does not use WebGL.

## Target routes

| Route | Purpose | Rendering target |
| --- | --- | --- |
| `/` | Positioning, proof, selected work, capabilities, writing | Server component with one diagram client island |
| `/work` | Curated case-study index | Server component |
| `/work/[slug]` | Architecture and delivery case study | Static server-rendered content |
| `/experience` | Concise web CV and downloads | Server component |
| `/writing` | Technical writing and architecture notes | Server component |
| `/writing/[slug]` | MDX article | Static server-rendered content |
| `/accessibility-checker` | Gated tool | Unlinked and `noindex` until approved |

## Pull-request sequence

The `upgrade` branch is used for Phase 0. After it is reviewed and merged,
each remaining phase starts from the updated default branch and is delivered
as its own branch and pull request.

### Phase 0 — Audit, governance, and tracking

Create repository guidance, the baseline audit, content inventory, live
tracker, decision/risk log, and Phase 0 report. Do not change product code,
dependencies, generated reports, or design.

**Exit:** Another engineer can start Phase 1 without rediscovering repository
state or making product decisions.

### Phase 1 — Factual content foundation

- Add typed `Profile`, `Role`, `Capability`, `Metric`, `ProjectSummary`,
  `EvidenceRef`, and `WritingMeta` sources.
- Add build-time validation for IDs, slugs, dates, URLs, evidence, and metrics.
- Add an approved/publicly-verified/needs-review claim registry.
- Align employment dates, titles, education, languages, and positioning.
- Remove subjective proficiency labels and unsupported public claims.
- Add ATS and visual PDFs under stable `/downloads/` paths.

**Exit:** New pages can render from one validated source of truth.

### Phase 2 — Writing pipeline migration

- Replace Contentlayer with a server-only MDX pipeline based on
  `next-mdx-remote/rsc`, `gray-matter`, and schema validation.
- Preserve both articles and their slugs while recording content that needs
  factual review.
- Remove Contentlayer packages, generated aliases, and configuration.
- Keep optional sharing, comments, or audio as small client islands only when
  the feature is verified.

**Exit:** A clean install is no longer blocked by the Contentlayer/Next peer
  dependency and article source remains intact.

### Phase 3 — Framework, dependencies, and quality baseline

- Consolidate the two Next configurations.
- Upgrade in reviewable commits through Next 15 to Next 16.2.11, React 19.2,
  and matching type/lint packages.
- Set Node 20.9 as the minimum and run CI on Node 22.
- Replace `next lint` with ESLint CLI scripts.
- Add Vitest, Testing Library, Playwright, axe, and GitHub Actions.
- Add `lint`, `typecheck`, `test`, `test:e2e`, `test:a11y`, and `build`
  scripts.
- Resolve the Framer Motion warning and remove obsolete/undeclared packages.

**Exit:** Plain `npm ci`, lint, typecheck, tests, and build pass with no known
high or critical production dependency advisories.

### Phase 4 — Design foundations and theme

- Add semantic design tokens and WCAG AA-tested light/dark palettes.
- Use Source Sans 3 for body/UI, Source Serif 4 for selected display text, and
  a restrained monospace face for diagram labels.
- Add a no-flash system-default theme with a visible persistent toggle.
- Replace the monolithic layout with server-rendered layout primitives and
  small navigation/theme/contact client islands.
- Add skip navigation, visible focus, zoom support, and application-level
  reduced motion.
- Remove decorative template effects and deprecated navigation/clipboard
  behavior.

**Exit:** All current pages use the accessible foundation without introducing
the new homepage content.

### Phase 5 — Senior homepage

- Add the approved headline, proposition, metrics, selected work,
  evidence-backed capabilities, writing preview, and CV/contact CTAs.
- Build the Product problem → Interface → API → Service → Data/AI →
  Production flow with semantic HTML node controls and decorative SVG paths.
- Add Frontend, Full-stack, and Applied-AI tabs with keyboard, touch, and
  reduced-motion behavior.
- Feature Velsa (redacted), Jobs Tracker Bot, and Tactical Tech; use Web
  Crawler as the fallback if Velsa review is blocked.

**Exit:** Positioning and proof are understandable with JavaScript disabled
and all interaction modes pass.

### Phase 6 — Work and case studies

- Add `/work` and `/work/[slug]`.
- Validate case-study metadata and required narrative sections.
- Publish Velsa (private/redacted), Jobs Tracker Bot, Tactical Tech Platform
  Modernisation, and Web Crawler Dashboard.
- Use accessible public diagrams with visible text alternatives.
- Leave the Accessibility Analysis Platform unpublished.

**Exit:** At least three case studies communicate context, decisions,
alternatives, trade-offs, delivery, and verified outcomes.

### Phase 7 — Experience and legacy CV route

- Add `/experience` from shared typed content.
- Include verified earlier roles, education, languages, capability evidence,
  and both labeled CV downloads.
- Permanently redirect `/cv` after redirect tests pass.
- Remove the monolithic CV implementation and update navigation, metadata,
  links, and sitemap inputs.

**Exit:** Website and CV facts are consistent and no subjective ratings remain.

### Phase 8 — Writing experience and review

- Add `/writing` and `/writing/[slug]`.
- Redirect `/blog` and existing slugs permanently.
- Review existing articles line by line; source, correct, or remove risky
  statistics and legal/SEO generalisations without silently deleting source.
- Remove generic AI marketing and advertise only content/features that exist.

**Exit:** Writing is technically useful, sourced where necessary, and the old
URLs preserve link equity.

### Phase 9 — Accessibility checker security gate

- Keep the route unlinked and `noindex` by default.
- Add strict schemas, protocol and target checks, limits, sanitized errors,
  structured model-output validation, cost ceilings, and honest progress.
- Test malformed input, private-network targets, upstream failures, timeouts,
  oversized responses, and invalid model output.
- Require evidence that the external microservice handles SSRF, redirects,
  DNS rebinding, and concurrency, plus a durable deployment rate limiter.

**Exit:** Promote only when every gate has evidence. Otherwise record
`DEFERRED` and keep the route unpromoted.

### Phase 10 — SEO, performance, documentation, and release

- Add dynamic sitemap/robots, Open Graph imagery, canonical metadata, and
  Person/WebSite/Article/CreativeWork JSON-LD.
- Standardize URLs on `https://ssohail.com`.
- Rewrite the README around the real architecture, content model, scripts,
  quality gates, accessibility, and deployment.
- Add light/dark mobile/desktop screenshots.
- Capture three-run median Lighthouse results and validate the release budget.

**Exit:** Clean CI, manual accessibility review, redirects, downloads,
metadata, performance evidence, documentation, and preview deployment all pass.

## Public content interfaces

The implementation will use stable IDs and build-time validation for:

- `EvidenceRef`: source type, source location, verification status, notes.
- `Metric`: value, label, context, evidence ID, related case-study slug.
- `Capability`: name, concise description, evidence and project/role links.
- `Role`: official title, organization, dates, location, verified highlights.
- `ProjectSummary`: slug, visibility, status, capabilities, stack, links,
  evidence.
- `WritingMeta`: slug, title, description, date, categories, review status.
- `CaseStudyMeta`: project identity, visibility, status, outcomes, evidence,
  and required narrative sections.

Only `approved` and `publicly-verified` claims are renderable in new public
surfaces.

## Required quality gates

Automated:

- content schema, evidence linkage, duplicate slug, and case-section tests;
- route rendering, redirects, metadata, missing slug, and PDF tests;
- theme persistence and no-flash checks;
- keyboard/touch/reduced-motion diagram tests;
- axe checks in both themes on public routes;
- API failure and security-path tests;
- clean install, lint, typecheck, test, and production build.

Manual:

- keyboard-only navigation and visible focus;
- 200% browser zoom;
- touch and mobile navigation;
- reduced motion and high contrast;
- VoiceOver or NVDA smoke test;
- no-JavaScript content comprehension;
- light/dark mobile and desktop screenshots.

Release performance targets:

- LCP at or below 2.5 seconds in the agreed mobile lab profile;
- CLS at or below 0.1;
- Lighthouse accessibility and SEO at least 95;
- homepage first-load JavaScript below 130 kB;
- content/detail routes below 180 kB unless an exception is documented;
- no regression greater than five Lighthouse points from the post-upgrade
  baseline.

## Working assumptions

- English is the only launch language.
- Vercel remains the deployment target until repository evidence says
  otherwise.
- Confidential Velsa details remain redacted.
- Missing evidence causes omission or deferral, never inference.
- Existing article source and untracked test artifacts are preserved until
  their disposition is explicitly implemented.
