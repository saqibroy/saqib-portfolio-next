# Implementation Status

**Current phase:** Phase 0 — Audit, governance, and tracking

**Current branch:** `upgrade`

**Last updated:** 2026-07-24

**Overall state:** DONE

## Status rules

Allowed status values:

- `NOT STARTED`
- `IN PROGRESS`
- `BLOCKED`
- `DEFERRED`
- `SKIPPED`
- `DONE`

`DONE` requires evidence. `DEFERRED` and `SKIPPED` require both a reason and a
revisit trigger. Update this file in the same commit as the implementation
whose status changes.

## Phase summary

| Phase | State | Dependency | Planned delivery |
| --- | --- | --- | --- |
| 0. Audit, governance, tracking | DONE | None | `upgrade` PR to `master` |
| 1. Factual content foundation | NOT STARTED | Phase 0 merged | Separate PR |
| 2. Writing pipeline migration | NOT STARTED | Phase 1 merged | Separate PR |
| 3. Framework/dependencies/quality | NOT STARTED | Phase 2 merged | Separate PR |
| 4. Design foundations/theme | NOT STARTED | Phase 3 merged | Separate PR |
| 5. Senior homepage | NOT STARTED | Phase 4 merged | Separate PR |
| 6. Work/case studies | NOT STARTED | Phases 1, 4, 5 | Separate PR |
| 7. Experience/legacy CV route | NOT STARTED | Phases 1, 4 | Separate PR |
| 8. Writing experience/review | NOT STARTED | Phases 2, 4 | Separate PR |
| 9. Accessibility security gate | NOT STARTED | Phase 3; external evidence | Separate PR |
| 10. SEO/performance/docs/release | NOT STARTED | Phases 5–9 dispositions | Separate PR |

## Phase 0 — Audit, governance, and tracking

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P0.01 | Confirm `upgrade` branch and preserve pre-existing untracked files | DONE | None | `docs/baseline-audit.md` environment section | Recheck before commit |
| P0.02 | Add factuality, command, code, accessibility, motion, and commit guidance | DONE | P0.01 | `AGENTS.md` | Maintain throughout rebuild |
| P0.03 | Record authoritative route/phase/API/test plan | DONE | P0.01 | `docs/portfolio-rebuild-plan.md` | Use for Phase 1 branch |
| P0.04 | Inventory pages, posts, projects, metrics, claims, docs, and assets | DONE | P0.01 | `docs/content-inventory.md` | Convert approved entries to typed data in Phase 1 |
| P0.05 | Record dependency, build, client/server, a11y, performance, security, and test baseline | DONE | P0.01 | `docs/baseline-audit.md` | Rebaseline after Phase 3 |
| P0.06 | Record locked decisions, risks, defaults, and revisit triggers | DONE | P0.03–P0.05 | `docs/decisions-and-risks.md` | Update when a decision/risk changes |
| P0.07 | Add persistent implementation ledger with stable IDs and status semantics | DONE | P0.03 | This file | Update in every implementation commit |
| P0.08 | Add Phase 0 completion report with command evidence | DONE | P0.02–P0.07 | `docs/phase-reports/phase-00-audit-and-governance.md` | Validate paths and counts |
| P0.09 | Prove no product, dependency, asset, or generated-report files changed | DONE | P0.02–P0.08 | Phase 0 path/status validation; Phase 0 report | Recheck staged paths before commit |
| P0.10 | Commit one reviewable Phase 0 documentation change | DONE | P0.09 | Phase 0 documentation commit containing this tracker | Open/review the `upgrade` PR |

## Phase 1 — Factual content foundation

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P1.01 | Add typed profile, role, capability, metric, project, evidence, and writing interfaces | NOT STARTED | Phase 0 merged | — | Create Phase 1 branch |
| P1.02 | Add runtime/build validation for IDs, slugs, dates, URLs, evidence, and metrics | NOT STARTED | P1.01 | — | Unit-test invalid fixtures |
| P1.03 | Add approved/publicly-verified/needs-review claim registry | NOT STARTED | P1.01 | — | Seed from content inventory |
| P1.04 | Align employment, education, languages, and positioning | NOT STARTED | P1.02–P1.03 | — | Use approved wording only |
| P1.05 | Remove subjective ratings and unsupported public claims | NOT STARTED | P1.03 | — | Search rendered/source text |
| P1.06 | Add ATS primary and visual secondary PDF downloads | NOT STARTED | P1.04 | — | Verify response, filename, and labels |

## Phase 2 — Writing pipeline migration

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P2.01 | Snapshot/preserve both MDX sources and metadata | NOT STARTED | Phase 1 merged | — | Add migration fixtures |
| P2.02 | Add server-only MDX loading and schema validation | NOT STARTED | P2.01 | — | Validate slugs and missing content |
| P2.03 | Preserve existing post URLs/content during migration | NOT STARTED | P2.02 | — | Route comparison tests |
| P2.04 | Mark unsupported article claims for editorial review | NOT STARTED | P2.01 | — | Use content inventory findings |
| P2.05 | Remove Contentlayer packages/config/generated aliases | NOT STARTED | P2.02–P2.03 | — | Require clean install |
| P2.06 | Keep optional article interaction in isolated client islands | NOT STARTED | P2.02 | — | Measure article route JS |

## Phase 3 — Framework, dependencies, and quality

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P3.01 | Consolidate Next config | NOT STARTED | Phase 2 merged | — | Preserve reviewed headers/images/redirects |
| P3.02 | Upgrade Next 14→15→16.2.11 in separate commits | NOT STARTED | P3.01 | — | Run official codemods |
| P3.03 | Align React 19.2, types, ESLint, and TypeScript | NOT STARTED | P3.02 | — | Resolve all peer dependencies |
| P3.04 | Add Node engine and Node 22 CI runtime | NOT STARTED | P3.02 | — | Verify clean environment |
| P3.05 | Replace `next lint`; add all approved scripts | NOT STARTED | P3.03 | — | Make commands non-interactive |
| P3.06 | Add Vitest, Testing Library, Playwright, axe, and CI | NOT STARTED | P3.05 | — | Seed smoke/content tests |
| P3.07 | Resolve Motion warning and remove obsolete/undeclared packages | NOT STARTED | P3.03 | — | Compare dependency tree |
| P3.08 | Pass clean install, lint, typecheck, tests, build, and production audit | NOT STARTED | P3.01–P3.07 | — | No high/critical production advisories |

## Phase 4 — Design foundations and theme

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P4.01 | Add semantic light/dark design tokens and AA contrast evidence | NOT STARTED | Phase 3 merged | — | Test all token pairings |
| P4.02 | Add approved font pairing with measured loading | NOT STARTED | P4.01 | — | Limit subsets/weights |
| P4.03 | Add no-flash system-default theme and accessible toggle | NOT STARTED | P4.01 | — | Test persistence/hydration |
| P4.04 | Split server layout and client navigation/theme/contact islands | NOT STARTED | P4.03 | — | Remove monolithic layout |
| P4.05 | Add skip link, focus system, zoom, landmarks, and dialog/menu behavior | NOT STARTED | P4.04 | — | Keyboard/axe/manual tests |
| P4.06 | Add application-level reduced motion | NOT STARTED | P4.04 | — | Eliminate continuous reduced-mode motion |
| P4.07 | Remove template decorations and deprecated navigation/clipboard code | NOT STARTED | P4.04–P4.06 | — | Source and visual sweep |

## Phase 5 — Senior homepage

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P5.01 | Server-render approved headline, proposition, proof, work, capabilities, writing, and CTAs | NOT STARTED | Phase 4 merged | — | Use typed content only |
| P5.02 | Build semantic system-flow node controls and decorative SVG | NOT STARTED | P5.01 | — | No WebGL |
| P5.03 | Add three accessible work-lens tabs and details region | NOT STARTED | P5.02 | — | Keyboard/touch/focus tests |
| P5.04 | Provide text/no-JS and reduced-motion equivalents | NOT STARTED | P5.02 | — | Disable JS/motion in tests |
| P5.05 | Feature approved work with Velsa fallback rule | NOT STARTED | P5.01; content review | — | Use Web Crawler if Velsa blocked |
| P5.06 | Meet homepage accessibility and JS budget | NOT STARTED | P5.01–P5.05 | — | Record build/Lighthouse evidence |

## Phase 6 — Work and case studies

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P6.01 | Add `/work` and validated `/work/[slug]` model | NOT STARTED | Phases 1/4/5 | — | Add missing/duplicate slug tests |
| P6.02 | Publish Jobs Tracker Bot case study | NOT STARTED | P6.01 | — | Link public evidence |
| P6.03 | Publish Tactical Tech modernisation case study | NOT STARTED | P6.01 | — | Preserve title/contribution context |
| P6.04 | Publish Web Crawler Dashboard case study | NOT STARTED | P6.01 | — | Link public evidence |
| P6.05 | Publish reviewed redacted Velsa case study | NOT STARTED | P6.01; factual review | — | Omit unsupported answers |
| P6.06 | Add accessible architecture diagrams/text alternatives | NOT STARTED | P6.02–P6.05 | — | Keyboard/no-JS/manual review |
| P6.07 | Keep accessibility platform unpublished | NOT STARTED | P6.01 | — | Revisit only after Phase 9 gate |

## Phase 7 — Experience and CV redirect

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P7.01 | Add server-rendered `/experience` from shared content | NOT STARTED | Phases 1/4 | — | Render verified roles/capabilities |
| P7.02 | Add accurate education, languages, and earlier roles | NOT STARTED | P7.01 | — | Avoid engineering-leadership implication |
| P7.03 | Add ATS primary and visual secondary download UI | NOT STARTED | P1.06/P7.01 | — | Test files and labels |
| P7.04 | Permanently redirect `/cv` | NOT STARTED | P7.01–P7.03 | — | Redirect/canonical tests |
| P7.05 | Remove old CV component and update links/metadata | NOT STARTED | P7.04 | — | Search legacy references |

## Phase 8 — Writing experience and review

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P8.01 | Add `/writing` and `/writing/[slug]` | NOT STARTED | Phases 2/4 | — | Use server MDX |
| P8.02 | Permanently redirect `/blog` and both slugs | NOT STARTED | P8.01 | — | Redirect/canonical tests |
| P8.03 | Review/source/correct SEO article | NOT STARTED | P8.01 | — | Preserve original in Git |
| P8.04 | Review/source/correct accessibility article | NOT STARTED | P8.01 | — | Use primary sources |
| P8.05 | Remove generic AI/audio marketing | NOT STARTED | P8.01 | — | Retain only reviewed features |
| P8.06 | Add system-design category without new top-level route | NOT STARTED | P8.01 | — | Revisit at three reviewed notes |
| P8.07 | Meet article accessibility and JS budget | NOT STARTED | P8.01–P8.06 | — | Record build/Lighthouse evidence |

## Phase 9 — Accessibility checker security gate

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P9.01 | Keep route unlinked and `noindex` | NOT STARTED | Phase 3 | — | Default even if later work blocks |
| P9.02 | Add strict local request/response/model schemas and limits | NOT STARTED | P9.01 | — | Cover failure paths |
| P9.03 | Add protocol/credential/private-target checks and sanitized errors | NOT STARTED | P9.02 | — | Test all target classes |
| P9.04 | Replace random progress with honest state | NOT STARTED | P9.01 | — | UI state tests |
| P9.05 | Verify external SSRF/redirect/DNS/concurrency controls | NOT STARTED | External microservice evidence | — | Defer promotion if missing |
| P9.06 | Verify durable rate limit, privacy logging, and cost ceilings | NOT STARTED | Deployment capability | — | In-memory limiter is insufficient |
| P9.07 | Decide promotion from evidence | NOT STARTED | P9.02–P9.06 | — | Default outcome is DEFERRED/unpromoted |

## Phase 10 — SEO, performance, docs, and release

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P10.01 | Add sitemap, robots, canonical metadata, OG image, and JSON-LD | NOT STARTED | Public routes stable | — | Validate generated output |
| P10.02 | Standardize all public URLs on `ssohail.com` | NOT STARTED | P10.01 | — | Search obsolete hosts |
| P10.03 | Rewrite README and add architecture/setup/quality/deploy docs | NOT STARTED | Phases 1–9 | — | Remove template claims |
| P10.04 | Add light/dark desktop/mobile screenshots | NOT STARTED | UI stable | — | Store approved release captures |
| P10.05 | Capture three-run median Lighthouse results | NOT STARTED | Preview deploy | — | Compare post-upgrade baseline |
| P10.06 | Pass performance and accessibility release budgets | NOT STARTED | P10.05 | — | Document exceptions |
| P10.07 | Verify redirects, downloads, CI, manual checklist, and preview | NOT STARTED | P10.01–P10.06 | — | Final release report |

## Blockers

No blocker prevents completion of Phase 0.

Known future external dependencies:

- Accessibility-microservice security evidence.
- A durable deployment-level rate-limiting capability.
- Reviewable public evidence for optional open-source lab projects.
