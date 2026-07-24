# Phase 1 Report — Factual Content Foundation

**Date:** 2026-07-24

**Branch:** `phase-1-content-foundation` (stacked on `upgrade`)

**Base commit:** `461f917`

## Scope and outcome

Phase 1 establishes a typed, runtime-validated factual source of truth and
uses it to replace the current CV page's outdated and unsupported public
claims. It also adds the approved ATS and visual PDF downloads.

The phase does not redesign the shared layout, homepage, blog, writing
pipeline, framework, or accessibility checker. Those remain in their assigned
phases.

## Implementation

- Added `src/content/portfolio.ts` with typed profile, evidence, metrics,
  roles, education, capabilities, projects, writing metadata, and download
  data.
- Added a claim-status model: `approved`, `publicly-verified`, and
  `needs-review`.
- Added `validatePortfolioContent()`, which validates stable IDs, duplicate
  IDs, evidence references, renderable claim status, date formats/order,
  slugs, HTTPS links, metric context, project/role references, and download
  paths when content is imported during the build.
- Updated root and CV metadata from the shared profile, correcting the old
  generic title and obsolete Vercel Open Graph URL.
- Replaced the 985-line client-rendered `/cv` page with a server-rendered
  factual experience page that renders capability evidence, roles, selected
  work, education, languages, and downloads from shared content.
- Added `public/downloads/saqib-sohail-cv-ats.pdf` and
  `public/downloads/saqib-sohail-cv-visual.pdf`.

## Factual corrections now live on `/cv`

- Velsa is dated 08/2025–05/2026 rather than “Present”.
- Tactical Tech uses the official Front-End Developer title and contribution
  wording for WCAG 2.1 AA.
- TU Berlin is “Graduate coursework in Computer Science,” not an M.Sc.
- English is “Professional working proficiency”; German is “B1 certified.”
- Subjective `Expert`, `Advanced`, and `Competent` skill labels are removed.
- Unapproved agentic/self-correction, organic-traffic, high-coverage, and
  similar CV-page claims are removed.

## Verification

| Check | Result |
| --- | --- |
| `npx next build` | Passed; existing Framer Motion optional-dependency warning remains tracked for Phase 3 |
| `npx tsc --noEmit --pretty false` | Passed after the build generated route/content types |
| Focused ESLint for changed TypeScript files | Passed with zero warnings |
| `GET /cv` against production server | Passed; corrected public content rendered |
| `HEAD /downloads/saqib-sohail-cv-ats.pdf` | `200 OK`, `application/pdf`, 89,155 bytes |
| `HEAD /downloads/saqib-sohail-cv-visual.pdf` | `200 OK`, `application/pdf`, 227,070 bytes |
| Rendered retired-claim search | No `Tech Enthusiast`, `M.Sc. Computer Science Coursework`, `Expert`, `Competent`, or Velsa `Present` match on `/cv` |

SHA-256:

- ATS: `c0adacc78b6e1e8200385146a78b6b8a8ac5a10e710a13338d00ac283514dffb`
- Visual: `5175574b10c5c76405c18ea82b2b48c87283da17bb2689f95cf584ce1780f8de`

The `/cv` first-load JavaScript reported by the production build is now 130 kB,
down from the documented 141 kB baseline. This is an implementation
measurement, not a final release claim.

## Deferred work

- Negative-fixture unit tests for the validator await the Phase 3 test harness.
- Old homepage copy/effects are Phase 5 work.
- Existing blog author/AI promotion and article assertions are Phase 8 work.
- `/cv` remains available until Phase 7 adds `/experience` and its permanent
  redirect.

## Recommended next pull request

Phase 2: preserve and migrate MDX away from Contentlayer using a server-only
content loader, while keeping both article slugs and source available for the
later editorial review.
