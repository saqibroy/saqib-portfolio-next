# Release Checklist

Use this checklist against a deployment preview before merging a release.

## Automated evidence

- [ ] `npm ci` completes.
- [ ] `npm run lint`, `typecheck`, `test`, `test:e2e`, `test:a11y`, and `build` pass.
- [ ] Production dependency audit has no high or critical findings.
- [ ] Lighthouse evidence is recorded for `/`, `/work`, `/experience`, and
  `/writing` using three desktop/mobile runs and the median values.
- [ ] Metadata tests confirm canonical URLs, robots, sitemap, Open Graph image,
  and JSON-LD.

## Preview verification

- [ ] Public routes load: `/`, `/work`, `/experience`, `/writing`, and every
  published work/writing detail route.
- [ ] `/cv` redirects to `/experience`; `/blog` and each old slug redirect to
  `/writing`.
- [ ] ATS and visual PDF downloads return successfully; ATS is the primary CTA.
- [ ] `/accessibility-checker` is unlinked, `noindex`, and absent from the
  sitemap.
- [ ] Desktop and mobile screenshots are captured in light and dark themes.

## Manual accessibility

- [ ] Keyboard-only navigation reaches every control, with visible focus and a
  working skip link.
- [ ] Mobile navigation and homepage system-flow controls work with touch.
- [ ] Content remains understandable at 200% browser zoom.
- [ ] Reduced-motion and high-contrast preferences retain all information.
- [ ] Perform a VoiceOver or NVDA smoke test on navigation, the system flow,
  case-study diagrams, and the writing experience.
- [ ] Read primary content with JavaScript disabled; headings, routes, and text
  alternatives remain understandable.

## Checker promotion guard

Do not add the Accessibility Checker to navigation or search discovery without
reviewed evidence of the external scanner’s SSRF/redirect/DNS-rebinding/global
concurrency controls and deployment-level rate limiting plus privacy/log
retention policy.
