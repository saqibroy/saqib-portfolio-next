# Phase 12 — Homepage and case-study simplification

## Delivered

- Removed the generic hero canvas and Systems Lab, including React Three Fiber, Three, GSAP, and their type dependency.
- Rebuilt the homepage around real work: static selected-system snapshots, four approved proof metrics, three visual project stories, an experience snapshot, writing preview, and contact.
- Replaced the dossier content model with concise roles, results, system descriptions, 2–4 decisions, outcomes, and one evidence record per case study.
- Rebuilt case studies into Snapshot, System, Key decisions, and Outcome. React Flow maps retain collapsed text equivalents.
- Added and featured the approved URL-shortener system-design article with server-rendered architecture and trade-off table components.

## Verification

- `npm run lint` — passed
- `npm run typecheck` — passed
- `npm run test` — passed (19 tests)
- `npm run test:e2e` — passed (38 Chromium tests)
- `npm run test:a11y` — passed (11 routes in light and dark themes)
- `npm run build` — passed; generated the URL-shortener article and all four case-study routes
- Visual review: inspected light desktop homepage and Jobs Tracker screenshots; mobile, dark, and 200%-equivalent captures pass the automated visual/reflow suite.

## Evidence

- Homepage screenshots: `test-results/release-visual-release-cap-6d061-rk-desktop-and-mobile-views-chromium/`.
- Jobs Tracker screenshots: `test-results/release-visual-release-cap-dfaf2-rk-desktop-and-mobile-views-chromium/`.
- The case-study narrative changed from ten required chapter fields to one capped system summary plus 2–4 decision cards, reducing repeated project copy while retaining approved evidence and boundaries.

## Remaining review

- Open a draft PR from `feature/home-case-study-simplification` and review the generated screenshots on the deployment preview before merge.
