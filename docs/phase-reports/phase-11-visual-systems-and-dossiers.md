# Phase 11 Visual Systems and Dossiers Report

**Branch:** `agent/phase-11-qa` (stacked on Phase 11 case-study PR #16)

**Date:** 2026-07-25

**Release status:** Awaiting user review; visual PRs must not merge before
preview screenshots and interactions are approved.

## Reviewable delivery

Phase 11 is split into the planned four-part stack:

1. PR #14 establishes the factual content direction, approved proof, and
   tracker entries.
2. PR #15 rebuilds the homepage composition and progressive Systems Lab.
3. PR #16 applies the engineering-dossier experience and deferred architecture
   maps to every case study.
4. The final QA PR records visual, accessibility, performance, and release
   evidence as
   [PR #17](https://github.com/saqibroy/saqib-portfolio-next/pull/17). It
   remains a draft until review is complete.

## Delivered

- Split the prominent `Senior full-stack engineer` title from the descriptive
  frontend-leaning positioning across the profile, metadata, Open Graph image,
  JSON-LD, homepage, and experience page.
- Replaced the homepage metric strip with two approved asymmetric proof cards:
  `8+` years and `7+` products and platforms. Tactical Tech's 30% and 50%
  outcomes remain only in their project context.
- Rebuilt the homepage around an after-paint 2D hero signal field and a
  progressively loaded Systems Lab using semantic tabs and stages, GSAP
  scroll synchronization, and an R3F/Three topology.
- Added static HTML equivalents and reduced-motion, save-data, WebGL-failure,
  no-JavaScript, off-screen, and hidden-document behavior.
- Replaced the repeated case-study page treatment with one aligned
  engineering-dossier system: structured hero outcomes, grouped chapters,
  decision comparisons, evidence boundaries, responsive navigation, and a
  deferred React Flow architecture map with an ordered text equivalent.
- Added the Jobs Tracker Bot provider-to-delivery architecture and direct
  repository evidence link without adding unsupported claims.
- Added automated final-design captures for homepage, Jobs Tracker Bot, and
  the private/redacted dossier in light and dark desktop/mobile modes, plus
  homepage and Jobs Tracker Bot reflow captures at a 200%-equivalent viewport.

## Quality gate

The final stacked source passed:

| Check | Result |
| --- | --- |
| Clean install | `npm ci` passed |
| Lint | Passed |
| Typecheck | Passed |
| Unit tests | 21 passed |
| Browser tests | 36 passed |
| Automated accessibility | 10 routes in both themes passed axe checks |
| Production build | Next.js 16.2.11 build passed; 19 static/generated pages |
| Production dependency audit | 0 vulnerabilities |

The normal all-dependency install still reports one high-severity development
advisory in a transitive tool path. The required production audit is clean; no
forced audit rewrite was used.

PR #17 initially exposed an npm 10 lockfile compatibility failure for four
optional `@emnapi` entries. The lockfile was regenerated with npm 10.9.2 and
then passed clean installs with both npm 10.9.2 and npm 11.6.2. The repaired
GitHub Actions `quality` job passed its complete install, Playwright, lint,
typecheck, unit, browser, axe, and build sequence in 2m31s. The Vercel
deployment check also passed.

## Local performance evidence

Environment: local production `next start`, Lighthouse 12.8.2 default mobile
emulation, three cold runs per route. Values below are medians.

| Route | Performance | Accessibility | SEO | LCP | CLS | Script transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 96 | 100 | 100 | 2.39 s | 0 | 161 kB |
| `/work` | 99 | 100 | 100 | 2.23 s | 0 | 163 kB |
| `/work/jobs-tracker-bot` | 97 | 100 | 100 | 2.24 s | 0 | 163 kB |

Core and deferred browser-resource measurements were kept separate:

| Route | Core script transfer | Deferred interaction transfer |
| --- | ---: | ---: |
| `/` | 151.5 KiB | 273.8 KiB for Three/R3F, GSAP, and topology code |
| `/work/jobs-tracker-bot` | 153.4 KiB | 56.2 KiB for React Flow and map code |

The deferred payloads do not block server-rendered content or navigation. The
homepage topology loads only near its section; the architecture map loads only
near its diagram. Rendering pauses while off-screen or while the document is
hidden.

The previously approved shared-runtime JavaScript exception remains 31–33 kB
over the strict 130 kB/180 kB route targets. Phase 11 introduces no new
first-load regression beyond that documented exception, while all strict LCP,
CLS, accessibility, and SEO targets pass.

## Typography performance decision

The first final-design Lighthouse set used the local Source Sans 3 and Source
Serif 4 files and produced 2.68 s median LCP. Those files added roughly 80 kB
to the mobile critical chain. CSS inlining experiments did not improve the
result. The final candidate therefore uses the platform Arial/Georgia pairing,
retaining the CV-inspired sans/serif hierarchy without font downloads. The
final median LCP range is 2.23–2.39 s.

## Visual evidence and remaining gate

`tests/e2e/release-visual.spec.ts` produces 14 temporary captures under
`test-results/`. Generated screenshots and Playwright reports stay untracked
by repository policy.

The final protected Vercel preview is
`https://ssohail-git-agent-phase-11-qa-saqibs-projects-99eb8124.vercel.app`.
Unauthenticated requests redirect to Vercel SSO, so external automation cannot
inspect that deployment without a separately managed bypass. The local
production candidate and generated captures provide the automated and visual
evidence; the user must open the preview while signed in for final interaction
approval.

Before release:

1. Review the final Vercel preview in light and dark desktop/mobile layouts.
2. Review homepage signal/topology motion, lens/stage controls, Jobs Tracker
   architecture selection and fit controls, reduced motion, and 200% reflow.
3. Approve or request changes.
4. After approval, merge PRs #14, #15, #16, and the QA PR in order, then
   re-run production routes, interactions, axe checks, and three-run
   Lighthouse medians on `https://ssohail.com`.
