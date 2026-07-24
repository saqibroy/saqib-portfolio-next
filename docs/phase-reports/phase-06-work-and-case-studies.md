# Phase 6 Completion Report — Work and Case Studies

**Branch:** `phase-6-work-case-studies` (stacked on Phase 5)

**Date:** 2026-07-24

## Delivered

- Added `/work` and four statically generated `/work/[slug]` case studies.
- Added a typed, build-validated case-study model with unique slugs, required
  narrative keys, approved evidence references, stack, capabilities, outcomes,
  visibility, and system flow.
- Published Jobs Tracker Bot, Tactical Tech Platform Modernisation, Web Crawler
  Dashboard, and the private/redacted AI-Assisted Contract Workflow.
- Added semantic system-flow figures with ordered steps and complete text
  alternatives. Unsupported or confidential Velsa details remain omitted.
- Kept the Accessibility Analysis Platform unpublished and covered its absence
  with unit and 404 browser tests.

## Verification evidence

| Check | Result |
| --- | --- |
| Case-study schema/evidence tests | Passed: unique slugs, required keys, approved evidence |
| Route tests | Passed for index, four case studies, missing/gated route |
| `/work` and detail axe in both themes | Passed with zero violations |
| Desktop work screenshot | Captured and visually inspected |
| Mobile redacted case-study screenshot | Captured and visually inspected |
| `npm run lint`, `typecheck`, `test`, `test:e2e`, `test:a11y`, `build` | Passed |

## Test-harness correction

Playwright previously reused any existing development server on port 3000,
which allowed a stale build to produce misleading screenshots. Reuse is now
disabled so browser and visual tests always launch the current source state.

## Next phase

Phase 7 adds `/experience`, moves the shared factual CV presentation there,
and permanently redirects `/cv` after route, download, and visual checks pass.
