# Baseline Audit

**Audit date:** 2026-07-24

**Branch/commit:** `upgrade` at `2f72c3e`

**Scope:** Read-only application, content, dependency, build, accessibility,
performance, security, and quality inspection

## Executive assessment

The repository can produce a Next.js 14 production build after a legacy
peer-dependency installation, but it is not ready to serve as the base for a
large redesign without staged remediation.

The largest risks are:

1. unsupported Contentlayer/Next peer dependencies and outdated vulnerable
   production dependencies;
2. client-heavy monolithic pages and a 384 kB article route;
3. duplicated, outdated, and unsupported public claims;
4. missing automated quality gates;
5. accessibility defects in global navigation, dialogs, zoom, and motion;
6. an unpromoted accessibility checker whose public URL flow lacks an adequate
   security boundary.

## Environment and repository state

- Node: `v22.18.0`
- npm: `11.6.2`
- Framework manifest: Next `^14.2.29`, React/React DOM `^18.2.0`
- Current branch matches `master`/`origin/master` at audit start.
- Pre-existing untracked paths:
  - `saqib_portfolio_upgrade_plan.md`
  - `playwright-report/`
  - `test-results/`
- These untracked paths were inspected or noted but not modified or removed.
- `.env` is ignored; its contents were not included in documentation.
- No repository-level `AGENTS.md` or `docs/` directory existed before Phase 0.

## Route inventory and rendering boundaries

| Route | Rendering/boundary | Main concern |
| --- | --- | --- |
| `/` | Entire page is a client component | Decorative JS/motion for primary content |
| `/cv` | 985-line client component | Content and presentation duplicated and monolithic |
| `/blog` | Server page wrapped by a client `Layout` | AI marketing and unnecessary shared client JS |
| `/blog/[slug]` | Static server page with large MDX/audio/social client components | 384 kB first-load JS |
| `/accessibility-checker` | 542-line client component | Fake progress, security-gated external URL flow |
| `/api/check-accessibility` | Dynamic route handler | Weak validation, unsafe upstream boundary |
| `/api/generate-audio-summary` | Dynamic route handler | External AI dependency, cost/privacy/availability review needed |
| not-found/error | Client components | Pull full animated layout into error states |

Global `src/components/Layout.tsx` is a 557-line client component. It includes
navigation, mobile menu, footer, contact modal, clipboard behavior, route
detection, animation, and decorative badges.

`src/components/MDXContent.tsx` is a 420-line client component even though most
of its work is static rendering.

## Install, build, type, and lint baseline

### Install

`npm ci` fails with `ERESOLVE` because `next-contentlayer@0.3.4` declares Next
12/13 support while the application requires Next 14.

`npm ci --legacy-peer-deps` succeeds, installing 686 packages. This workaround
is temporary and must not become the permanent CI strategy.

The manifest, lockfile, and previously installed modules were initially
misaligned. The lockfile root also contains packages not declared in
`package.json`, including packages associated with older UI experiments.

### Production build

After clearing stale generated build output, `npx next build` succeeds and
generates 12 static/dynamic route entries.

Build warning:

```text
Module not found: Can't resolve '@emotion/is-prop-valid'
Import trace: framer-motion → src/app/page.tsx
```

Route output:

| Route | Route size | First-load JS |
| --- | ---: | ---: |
| `/` | 2.41 kB | 141 kB |
| `/accessibility-checker` | 4.96 kB | 135 kB |
| `/blog` | 198 B | 144 kB |
| `/blog/[slug]` | 240 kB | 384 kB |
| `/cv` | 10.6 kB | 141 kB |
| shared | — | 87.3 kB |

The repository `build` script also runs the image optimiser and can update
tracked assets. The audit used `npx next build` to avoid rewriting source
assets.

### Typecheck

Standalone TypeScript initially fails when stale `.next` output and missing
Contentlayer-generated types are present. After a successful Contentlayer/Next
build, `npx tsc --noEmit --pretty false` passes.

This means typecheck is not currently an independent clean-checkout gate.

### Lint

`npm run lint` invokes `next lint` and opens an interactive configuration
prompt instead of running a deterministic check.

`npx eslint src --max-warnings=0` reports:

- 41 errors
- 6 warnings

Primary categories:

- unused imports, variables, and dead components;
- explicit `any` types;
- missing hook dependencies;
- missing image alt attributes;
- internal navigation using `<a>`;
- unescaped content;
- deprecated or obsolete lint suppressions.

### Dependency audit

`npm audit --omit=dev --audit-level=low` reports 40 production-tree
vulnerabilities:

- 1 low
- 31 moderate
- 7 high
- 1 critical

Affected trees include Next.js, Contentlayer and its transitive build stack,
PostCSS, Prism/refractor, protobuf dependencies, and supporting packages.
Automated `--force` remediation proposes breaking major changes and must not be
used.

## Dependency and configuration mismatches

- Next 14/React 18 coexist with React 19 type packages.
- `eslint-config-next` is a different major from Next.
- `next-contentlayer` does not declare support for Next 14.
- `@next/font` is obsolete for this App Router application.
- Both `next.config.js` and `next.config.ts` exist with conflicting settings.
- The JavaScript config is the effective Contentlayer wrapper during the
  observed build; the TypeScript config contains different headers,
  experiments, images, and redirects.
- Tailwind 4/PostCSS configuration coexists with a JavaScript Tailwind config
  and documentation that claims Tailwind 3.
- The README documents placeholder clone paths and features rather than the
  actual repository.
- `lib/seo.ts` duplicates root metadata and includes a placeholder social
  handle.

## Content duplication and factuality

Profile, role, skills, projects, and metrics are embedded directly in the
985-line CV page and repeated across:

- root metadata;
- homepage copy;
- CV page arrays;
- blog author bio;
- README;
- historical CV update documents;
- the external ATS and visual PDFs.

Examples requiring correction or evidence:

- Velsa is shown as “Present” instead of ending 05/2026.
- “Tech Enthusiast” is inconsistent with approved positioning.
- “Expert”, “Advanced”, and “Competent” ratings create unsupported subjective
  claims.
- Tactical Tech is described as having “achieved” WCAG AA rather than
  contributing to it.
- Organic-traffic improvements are claimed without an approved metric.
- Some project cards add agentic/self-correction, micro-frontend, cloud,
  coverage, scale, or deployment detail absent from approved facts.
- The author bio says “over 6 years” and adds digital-marketing positioning.
- Both blog posts contain statistics and legal/SEO generalisations that need
  sourcing or revision.

The detailed disposition is maintained in `docs/content-inventory.md`.

## Accessibility audit

### Global

- Root viewport metadata sets `maximumScale: 1`, restricting expected zoom.
- No skip link is present.
- Visible focus treatment is inconsistent and is often coupled to Tailwind
  focus rings without a system token.
- The entire global layout hydrates as a client component.
- Continuous CSS `animate-pulse`/`animate-ping` effects are not disabled by the
  component-level `useReducedMotion` checks.
- “Reduced” versions of background animations still move rather than becoming
  static.
- Many controls use scale/rotation on every hover/tap without information
  value.

### Navigation and contact

- Route detection reads `window.location.pathname` through a locally defined
  function rather than `usePathname`.
- Internal navigation uses plain anchors in several places.
- The mobile menu does not implement a complete focus trap, focus return, or
  robust Escape behavior.
- The contact modal lacks a complete dialog focus-management implementation.
- Body-scroll changes can overwrite an existing body overflow value.
- The copy action uses deprecated `document.execCommand`.
- Decorative AI badges create continuous motion and unclear semantics.

### Pages and content

- Direct ESLint finds missing alt behavior on article images.
- The large CV tab/skill interface requires deeper keyboard and semantic
  review and exposes hover-dependent descriptions.
- MDX callouts prioritize decorative gradients/icons and are entirely client
  rendered.
- The accessibility checker displays random progress, which does not represent
  actual system state.
- Automated axe, keyboard, screen-reader, zoom, and theme-contrast checks are
  absent.

## Performance audit

- The homepage hydrates background generation, 70 animated elements, multiple
  Motion components, and route-wide layout animation.
- Shared `Layout` makes static routes pay for navigation, modal, footer, and
  decorative animation logic.
- The article route's 384 kB first-load JS is driven by syntax highlighting,
  MDX client rendering, social/comment components, and a roughly 930-line audio
  player.
- `react-syntax-highlighter` ships a large client-side Prism implementation.
- Client-side blog features load regardless of whether a visitor uses them.
- Continuous animation increases main-thread/compositor and battery cost.
- Duplicate image-generation/optimisation scripts can rewrite tracked output
  during `npm run build`.
- Preconnects to GitHub and LinkedIn are unconditional and may not improve the
  critical path.
- No Lighthouse baseline, bundle budget, or Web Vitals regression gate is
  committed.

## Security and privacy audit

### Accessibility checker

- Request validation checks only that `new URL(url)` succeeds.
- There is no HTTP/HTTPS allow-list, credential rejection, private-network
  target rejection, request body schema, or explicit body-size limit.
- SSRF, redirect, and DNS-rebinding controls ultimately depend on the external
  microservice and are not evidenced here.
- Upstream error objects and network details can be reflected to the client.
- Upstream response shape is trusted through TypeScript casts rather than
  runtime validation.
- Up to ten Gemini calls are made concurrently for violations plus a summary,
  with no durable rate limit, concurrency gate, or explicit cost ceiling.
- Model JSON is parsed but not structurally validated.
- External violation text is inserted into prompts without a documented
  prompt-injection boundary.
- URLs may be logged in upstream systems without a documented privacy policy.
- Fake random progress presents misleading system state.

### Audio summary

- Availability depends on external AI/TTS services and environment variables.
- Cost control, rate limiting, payload limits, privacy, cache policy, and
  structured output need review.
- Marketing states that every article has AI audio regardless of runtime
  availability.

### General

- `.env` is ignored, which is appropriate; secret contents were not audited.
- Security headers differ between the two Next config files, so intended
  production behavior is ambiguous.
- `X-XSS-Protection` is obsolete and should not substitute for a reviewed CSP.
- No committed dependency/security scan exists in CI.

## Testing and delivery gaps

No committed configuration or source tests exist for:

- unit or content validation;
- component interaction;
- route/redirect smoke tests;
- Playwright;
- automated axe;
- Lighthouse;
- API security/failure paths;
- GitHub Actions quality gates.

The untracked Playwright report and test-results paths do not have corresponding
committed test configuration and must not be treated as evidence of a
repository quality gate.

There is no committed deployment configuration beyond dependencies on Vercel
Analytics/Speed Insights and references in README content.

## Baseline decisions

- Preserve the two posts before replacing Contentlayer.
- Move framework remediation before redesign because the current dependency
  tree is both unsupported and vulnerable.
- Keep the checker unpromoted until external and local security evidence is
  complete.
- Replace client-heavy pages incrementally; do not combine content migration,
  framework upgrade, and design work.
- Use the approved facts in `docs/content-inventory.md` as the public content
  ceiling.

## Phase 0 exit result

Phase 0 is complete when all governance/tracking documents exist, agree on
status and scope, and a Git check proves no application, dependency, asset, or
generated-report file was changed.
