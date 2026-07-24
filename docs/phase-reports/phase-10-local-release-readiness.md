# Phase 10 Local Release-Readiness Report

**Branch:** `phase-10-release-readiness` (stacked on Phase 9)

**Date:** 2026-07-24

## Delivered

- Replaced the obsolete static sitemap with generated `sitemap.ts` and added
  `robots.ts`. Only intended public pages are discoverable; the checker and API
  routes are excluded.
- Added a generated Open Graph image and canonical `https://ssohail.com`
  metadata. Person/WebSite, Article, and CreativeWork JSON-LD are emitted from
  factual route content.
- Rewrote the README and added a release checklist covering architecture,
  content rules, commands, manual accessibility, checker-promotion constraints,
  deployment, and preview verification.
- Added automated metadata tests and a four-viewport release capture test for
  light/dark desktop/mobile home views.

## Local performance evidence

Environment: local production `next start`, Lighthouse 12.8.2, mobile default
emulation, three cold runs per route. Lighthouse 13 requires Node 22.19+, while
the current runtime is Node 22.18, so 12.8.2 is the newest compatible tool.

| Route | Performance median | Accessibility median | SEO median | LCP median | CLS median | Script transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 95 | 100 | 100 | 2.84 s | 0 | 161 kB |
| `/work` | 96 | 100 | 100 | 2.70 s | 0 | 161 kB |
| `/experience` | 97 | 100 | 100 | 2.60 s | 0 | 161 kB |
| `/writing` | 96 | 100 | 100 | 2.71 s | 0 | 161 kB |

The Lighthouse JSON files are temporary local evidence under `/tmp`, not
repository assets. The test-generated screenshot capture set is intentionally
untracked under `test-results/` in line with the repository policy.

## Release status: not ready

Accessibility, SEO, and CLS targets pass in the local lab. Removing the unused
58 kB Geist Mono font and Vercel client telemetry improved the original local
home measurement from 3.03 s/164 kB to 2.84 s/161 kB, while retaining Source
Serif 4 with `font-display: swap`. The 2.5-second LCP target and 130 kB
homepage first-load JavaScript target still do not pass. No Vercel preview, CI
run, screen-reader smoke test, no-JavaScript review, or deployment verification
has been performed. These are recorded as deferred release gates, not as
completed work.

## Next action

Investigate the shared client/runtime payload and LCP path, then repeat the
three-run measurements. After an approved performance disposition, deploy a
preview and complete `docs/release-checklist.md` before marking Phase 10 done.
