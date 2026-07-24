# Phase 0 Report — Audit, Governance, and Tracking

**Date:** 2026-07-24

**Branch:** `upgrade`

**Starting commit:** `2f72c3e`

**Implementation scope:** Documentation only

## Scope and exit criteria

Phase 0 establishes persistent repository guidance, an evidence-backed
baseline, a content disposition, a staged implementation plan, stable tracker
IDs, and a decision/risk log.

The phase explicitly excludes application code, dependencies, assets,
generated reports, and visual redesign.

## Inspected inputs

- User-provided portfolio rebuild prompt.
- User-provided `saqib_portfolio_upgrade_plan.md`.
- `SOHAIL_CV_ATS.pdf`, `SOHAIL_CV.pdf`, and the visual CV LaTeX template.
- Package manifest/lockfile, Next/TypeScript/ESLint/Tailwind/Contentlayer
  configuration, README, scripts, metadata, routes, components, MDX content,
  API handlers, public assets, and Git state.
- Visual CV page rendering, font metadata, and PDF text extraction.

## Decisions made

- The approved prompt is the factual ceiling.
- The restrained web identity takes cerulean/teal and restrained serif/sans
  influence from the visual CV without duplicating its page design.
- ATS is the main download; visual CV is secondary.
- The framework/content pipeline moves ahead of visual redesign.
- System-design notes remain under Writing.
- Legacy CV/blog URLs receive permanent redirects.
- Accessibility checker promotion is gated and defaults to deferred/unpromoted.
- The `upgrade` branch stops after Phase 0.

Full rationale is in `docs/decisions-and-risks.md`.

## Files changed

- `AGENTS.md`
- `docs/portfolio-rebuild-plan.md`
- `docs/content-inventory.md`
- `docs/baseline-audit.md`
- `docs/implementation-status.md`
- `docs/decisions-and-risks.md`
- `docs/phase-reports/README.md`
- `docs/phase-reports/phase-00-audit-and-governance.md`

No application, dependency, asset, existing content, or generated-report file
is intended to change.

## Baseline commands and results

| Command/check | Result |
| --- | --- |
| `git status --short --branch` | On `upgrade`; three pre-existing untracked inputs/artifacts |
| `node --version` | `v22.18.0` |
| `npm --version` | `11.6.2` |
| `npm ci` | Failed: `next-contentlayer@0.3.4` peer conflict with Next 14 |
| `npm ci --legacy-peer-deps` | Passed; 686 packages installed |
| `npx next build` | Passed with missing `@emotion/is-prop-valid` warning |
| `npx tsc --noEmit --pretty false` after generation | Passed |
| `npm run lint` | Interactive prompt; not a deterministic lint gate |
| `npx eslint src --max-warnings=0` | Failed with 41 errors and 6 warnings |
| `npm audit --omit=dev --audit-level=low` | 40 vulnerabilities: 1 low, 31 moderate, 7 high, 1 critical |

Observed build sizes:

- `/`: 141 kB first-load JS.
- `/accessibility-checker`: 135 kB.
- `/blog`: 144 kB.
- `/blog/[slug]`: 384 kB.
- `/cv`: 141 kB.

The build was run directly as `npx next build`; the repository `npm run build`
also runs an asset optimiser and was intentionally avoided during this
documentation-only phase.

## Visual notes

- The visual CV uses a bright cerulean/teal header, white body, Latin Modern
  serif display name, and Latin Modern sans body.
- The approved web direction uses that identity as influence, with more
  restrained surfaces and contrast-tested theme tokens.
- No new screenshots were produced because Phase 0 does not change UI.

## Accessibility, performance, and security findings

Detailed findings are in `docs/baseline-audit.md`.

Highest priority:

- remove zoom restriction;
- replace monolithic shared/page client components;
- implement true application-level reduced motion;
- address article route JavaScript weight;
- add keyboard, axe, and screen-reader gates;
- keep external URL scanning unpromoted until the full service boundary is
  hardened.

## Trade-offs and unresolved risks

- The baseline install used `--legacy-peer-deps` only to inspect the current
  application. This is documented rather than normalized.
- Lighthouse was not captured because there is no committed harness and Phase
  0 does not change product/runtime configuration. It is scheduled after the
  framework baseline.
- Existing articles remain public and unchanged even though their risky claims
  are inventoried. Source preservation and editorial correction are separate
  reviewable phases.
- External accessibility-microservice controls cannot be proven from this
  repository and remain a future promotion blocker.

## Tracker updates

Phase 0 items `P0.01` through `P0.09` are complete with document and validation
evidence. The final path guard found no tracked product changes, all 76 tracker
row IDs are unique, every required document exists, and the Markdown files
contain no trailing whitespace. `P0.10` is satisfied by the Phase 0
documentation commit containing this report and tracker.

## Recommended next pull request

After Phase 0 review and merge, create a new branch for Phase 1: typed factual
content, evidence/claim validation, fact alignment, and stable CV downloads.
