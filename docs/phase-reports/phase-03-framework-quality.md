# Phase 3 Status Report — Framework, Dependencies, and Quality

**Branch:** `phase-3-framework-quality` (stacked on Phase 2)

**Status:** Complete

**Date:** 2026-07-24

## Delivered

- Upgraded through Next 15.5.21 to the plan-locked Next 16.2.11 using the
  official upgrade codemod. The migration commits are `45e029f` and `50bd626`.
- Upgraded React and React DOM to 19.2.8 with matching React types and a
  Next 16-compatible ESLint 9 configuration.
- Migrated the blog route to the Next 16 async `params` contract and retained
  successful static generation for both articles.
- Replaced `next lint` with direct ESLint, added `typecheck`, `test`,
  `test:e2e`, `test:a11y`, and a pure production `build` command.
- Added Node `>=20.9.0`, a Node 22 GitHub Actions workflow, Vitest content
  checks, Playwright route smoke tests, and an axe report runner.
- Removed obsolete Contentlayer-era article client components and unreferenced
  packages. The prior Framer Motion optional-dependency warning no longer
  appears in the production build.
- Applied all non-forced audit remediation and upgraded direct `sharp` and
  `glob` dependencies.
- Kept Next at its current stable release, 16.2.11, and used explicit stable
  overrides for its nested `postcss@8.5.22` and `sharp@0.35.3` paths.

## Verification evidence

| Check | Result |
| --- | --- |
| `npm ci` | Passed without `--legacy-peer-deps` |
| `npm run lint` | Passed with zero warnings |
| `npm run typecheck` | Passed |
| `npm run test` | Passed: 2 content/evidence tests |
| `npm run test:e2e` | Passed: 5 public-route smoke tests |
| `npm run test:a11y` | Passed: axe report capture runner |
| `npm run build` | Passed on Next 16.2.11/Turbopack |
| `npm audit --omit=dev --audit-level=high` | Passed: 0 vulnerabilities |

## Security resolution

The initial audit found three high advisories inside Next's nested PostCSS and
Sharp paths. Current stable PostCSS and Sharp releases resolve them safely, so
the package manifest pins them through `overrides`. The production audit now
passes with zero vulnerabilities; no forced remediation, downgrade, preview,
or canary dependency was used.

## Explicit deferrals

- The axe runner records its result but does not yet require zero violations.
  Phase 4 replaces the legacy layout/theme and makes route-level axe assertions
  a real gate.
- Two new React-hook ESLint rules are disabled only for the legacy monolithic
  layout that Phase 4 will replace. The rest of lint runs with zero warnings.

## Next action

Phase 4 can begin: establish the accessible CV-inspired design tokens, theme,
server layout primitives, skip navigation, and reduced-motion foundations.
