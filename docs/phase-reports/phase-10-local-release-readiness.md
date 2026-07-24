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

Environment: local production `next start`, Lighthouse 12.8.2 invoked as a
one-off tool, mobile default emulation, three cold runs per route. Lighthouse
13 requires Node 22.19+, while the current runtime is Node 22.18, so 12.8.2 is
the newest compatible tool.

| Route | Performance median | Accessibility median | SEO median | LCP median | CLS median | Script transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 98 | 100 | 100 | 1.83 s | 0 | 161 kB |
| `/work` | 96 | 100 | 100 | 1.75 s | 0 | 161 kB |
| `/experience` | 97 | 100 | 100 | 1.76 s | 0 | 161 kB |
| `/writing` | 98 | 100 | 100 | 1.71 s | 0 | 161 kB |

The Lighthouse JSON files are temporary local evidence under `/tmp`, not
repository assets. The test-generated screenshot capture set is intentionally
untracked under `test-results/` in line with the repository policy.

## Release status: preview verification pending

Accessibility, SEO, CLS, and the 2.5-second LCP target now pass in the local
lab. Removing the unused 58 kB Geist Mono font and Vercel client telemetry,
then changing the selected Source font pair to non-preloaded optional loading
with a stable mobile H1 fallback, improved the original local home measurement
from 3.03 s/164 kB to 1.83 s/161 kB. The 130 kB homepage first-load JavaScript
target does not pass: Lighthouse measures 157 KiB (161 kB) of transferred
scripts, dominated by the shared Next App Router runtime rather than the small
route-specific client islands. The user approved this bounded 31 kB runtime
exception on 2026-07-25; it must be re-measured after any material framework or
global client-island change. No Vercel preview, CI run, screen-reader smoke
test, or deployment verification has been performed.
Automated no-JavaScript comprehension checks pass for the homepage system-flow
text and a writing article. The remaining items are recorded as deferred release
gates, not as completed work.

## Next action

Deploy a preview and complete `docs/release-checklist.md`, including redirect,
download, manual accessibility, and preview-performance verification, before
marking Phase 10 done.

## Preview attempt

On 2026-07-25, `npx --yes vercel@latest --yes` was attempted from this branch.
The Vercel CLI rejected the configured token as invalid before project linking or
deployment. No preview was created. Refresh Vercel authentication before
retrying; do not replace or expose credentials in the repository.

## Git-integrated preview

The `phase-10-release-readiness` branch was pushed to GitHub on 2026-07-25.
Vercel reported the deployment for commit `45fe260` as successful. Its generated
preview is
`https://ssohail-git-phase-10-release-readiness-saqibs-projects-99eb8124.vercel.app`.
Vercel Authentication protects that URL and redirects unauthenticated requests
to SSO, so automated external verification cannot proceed from this environment
yet. Open it while signed in to Vercel, or grant a secure automation bypass
outside the repository; never commit a token or bypass secret.

GitHub Actions initially exposed an npm 10 lockfile incompatibility. The
lockfile was regenerated with npm 10.9.2, validated with an npm 10 clean
install and the full local quality suite, and pushed as `9827e73`. The PR's
Vercel deployment and GitHub Actions `quality` workflow both passed for that
commit. Manual protected-preview verification remains the only Phase 10
release gate.
