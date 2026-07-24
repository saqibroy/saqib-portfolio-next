# Saqib Sohail — Engineering Portfolio

The public portfolio for a senior frontend-leaning full-stack engineer in
Berlin. It is a Next.js application with server-rendered portfolio content,
reviewed MDX writing, accessible interaction islands, and a small test suite.

## Architecture

- **Next.js App Router** with React Server Components by default.
- **Shared factual content** in `src/content/portfolio.ts` and
  `src/content/caseStudies.ts`. New public claims must be approved or
  publicly verified and linked to evidence.
- **Writing** in `content/writing/*.mdx`, loaded through the server-only,
  schema-validated `src/lib/writing.ts` pipeline. Only reviewed posts render
  publicly.
- **Small client islands** for theme preference, mobile navigation, the home
  system-flow interaction, and the deliberately unlinked checker form.
- **Semantic design system** in `src/app/globals.css`: light/dark tokens,
  Source Sans 3, Source Serif 4, visible focus, skip navigation, and
  reduced-motion support.

## Public routes

| Route | Purpose |
| --- | --- |
| `/` | Senior engineering overview |
| `/work` and `/work/[slug]` | Reviewed case studies |
| `/experience` | Factual experience, education, languages, and CV downloads |
| `/writing` and `/writing/[slug]` | Reviewed technical notes |
| `/accessibility-checker` | Experimental, unlinked, `noindex` automated scan |

`/cv` permanently redirects to `/experience`. `/blog` and the preserved blog
slugs permanently redirect to `/writing`.

## Local development

Requirements: Node 20.9 or later (Node 22 is used in CI) and npm.

```bash
npm ci
npm run dev
```

Open `http://127.0.0.1:3000`. The checker requires an HTTPS
`ACCESSIBILITY_MICROSERVICE_URL` only when a real scan is submitted; do not add
secrets to the repository.

## Quality commands

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run test:a11y
npm run build
npm audit --omit=dev --audit-level=high
```

Before a release, run `npm ci` and then the complete command sequence above.
The browser tests launch a fresh local development server and cover routes,
legacy redirects, CV downloads, metadata, keyboard interactions, checker
failure paths, and responsive captures. Axe checks run in light and dark
themes; they complement manual testing.

For the documented local performance profile, run Lighthouse as a one-off tool
instead of adding it to application dependencies:

```bash
npx --yes lighthouse@12.8.2 http://127.0.0.1:3000/ --only-categories=performance,accessibility,seo --chrome-flags="--headless --no-sandbox"
```

## Content and factuality

`AGENTS.md` is the repository’s working agreement. In short:

- The approved portfolio facts and linked public evidence outrank old site copy
  and CV wording.
- Do not strengthen experience, scale, leadership, or technical claims.
- `needs-review` writing and gated work must not be promoted publicly.
- Keep Velsa details redacted and omit uncertain facts.
- The ATS PDF is the primary CV download; the visual PDF is secondary.

## Accessibility and performance

The app uses semantic landmarks, a skip link, visible focus, responsive layouts,
native controls, and an application-wide reduced-motion policy. Automated axe
checks are included, but release review must still cover keyboard-only flow,
200% zoom, high contrast, touch, reduced motion, screen-reader smoke testing,
and no-JavaScript comprehension.

Performance acceptance targets and evidence live in
`docs/implementation-status.md` and Phase 10’s report. Do not add heavy
decorative animation, WebGL, or React Three Fiber.

## Search and release metadata

The canonical domain is `https://ssohail.com`. `src/app/sitemap.ts`,
`src/app/robots.ts`, and `src/app/opengraph-image.tsx` generate the discovery
assets. Public pages include canonical metadata; Person, WebSite, Article, and
CreativeWork JSON-LD are emitted where appropriate. The checker is excluded
from discovery.

## Deployment

Vercel is the assumed deployment platform. Configure production environment
variables in the deployment provider, deploy a preview, then verify routes,
redirects, PDF downloads, sitemap/robots, metadata, and the manual checklist
before merging through review. Never push directly to `master`.

## Tracker

The staged rebuild plan, implementation ledger, decisions, audit, content
inventory, and per-phase reports live in `docs/`. Generated Playwright output
under `playwright-report/` and `test-results/` is intentionally untracked.
