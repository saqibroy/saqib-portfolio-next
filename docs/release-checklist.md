# Release Checklist

Use this checklist against a deployment preview before merging a release. For
this release, Vercel SSO required the approved controlled-production
verification recorded in the Phase 10 report.

## Automated evidence

- [x] `npm ci` completes.
- [x] `npm run lint`, `typecheck`, `test`, `test:e2e`, `test:a11y`, and `build` pass.
- [x] Production dependency audit has no high or critical findings.
- [x] Lighthouse evidence is recorded for `/`, `/work`, `/experience`, and
  `/writing` using three mobile strict-target runs and the median values.
- [x] Metadata tests confirm canonical URLs, robots, sitemap, Open Graph image,
  and JSON-LD.

## Preview verification

- [x] Public routes load: `/`, `/work`, `/experience`, `/writing`, and every
  published work/writing detail route.
- [x] `/cv` redirects to `/experience`; `/blog` and each old slug redirect to
  `/writing`.
- [x] ATS and visual PDF downloads return successfully; ATS is the primary CTA.
- [x] `/accessibility-checker` is unlinked, `noindex`, and absent from the
  sitemap.
- [x] Desktop and mobile screenshots are captured in light and dark themes.

## Manual accessibility

- [x] Keyboard-only navigation reaches every control, with visible focus and a
  working skip link.
- [x] Mobile navigation and homepage system-flow controls work with touch.
- [x] Content remains understandable at 200% browser zoom.
- [x] Reduced-motion and high-contrast preferences retain all information.
- [x] Perform a VoiceOver or NVDA smoke test on navigation, the system flow,
  case-study diagrams, and the writing experience.
- [x] Read primary content with JavaScript disabled; headings, routes, and text
  alternatives remain understandable.

Manual accessibility items were confirmed by the user on 2026-07-25 after the
automated production checks and the repaired skip-link focus test passed.

## Checker promotion guard

Do not add the Accessibility Checker to navigation or search discovery without
reviewed evidence of the external scanner’s SSRF/redirect/DNS-rebinding/global
concurrency controls and deployment-level rate limiting plus privacy/log
retention policy.
