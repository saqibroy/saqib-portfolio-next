# Implementation Status

**Current phase:** Phase 5 — Senior homepage

**Current branch:** `phase-5-senior-homepage` (stacked on Phase 4)

**Last updated:** 2026-07-24

**Overall state:** DONE with one deferred performance measurement

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
| 1. Factual content foundation | DONE | Phase 0 commit `461f917` | Stacked PR; merge after Phase 0 |
| 2. Writing pipeline migration | DONE | Phase 1 commit `6c16e40` | Stacked PR; merge after Phases 0–1 |
| 3. Framework/dependencies/quality | DONE | Phase 2 commit `169a6df` | Stacked PR; merge after Phases 0–2 |
| 4. Design foundations/theme | DONE | Phase 3 commit `9ce7b49` | Stacked PR; merge after Phases 0–3 |
| 5. Senior homepage | DONE | Phase 4 commit `53c7165` | Stacked PR; merge after Phases 0–4 |
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
| P1.01 | Add typed profile, role, capability, metric, project, evidence, and writing interfaces | DONE | Phase 0 commit `461f917` | `src/content/portfolio.ts` | Reuse as the only source for new pages |
| P1.02 | Add runtime/build validation for IDs, slugs, dates, URLs, evidence, and metrics | DEFERRED | P1.01 | `validatePortfolioContent()` executes during production build | Add negative-fixture unit tests when the Phase 3 test harness exists |
| P1.03 | Add approved/publicly-verified/needs-review claim registry | DONE | P1.01 | `EvidenceRef.status` and article `reviewStatus` in `src/content/portfolio.ts` | Seed new content from approved/publicly-verified records only |
| P1.04 | Align employment, education, languages, and positioning | DONE | P1.01–P1.03 | `src/content/portfolio.ts`, `/cv`, root/CV metadata | Recheck against a new CV before any download replacement |
| P1.05 | Remove subjective ratings and unsupported public claims | DEFERRED | P1.03 | `/cv` replacement removes ratings and the retired CV claims | Homepage cleanup is Phase 5; article/UI cleanup is Phase 8 |
| P1.06 | Add ATS primary and visual secondary PDF downloads | DONE | P1.04 | `public/downloads/`; HTTP 200 and SHA-256 evidence in Phase 1 report | Recheck files whenever CV source changes |

## Phase 2 — Writing pipeline migration

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P2.01 | Snapshot/preserve both MDX sources and metadata | DONE | Phase 1 commit `6c16e40` | Git rename to `content/writing/`; original frontmatter/body preserved | Line-by-line editorial review in Phase 8 |
| P2.02 | Add server-only MDX loading and schema validation | DONE | P2.01 | `src/lib/writing.ts` validates filename, metadata, dates, image paths, and tags | Add negative-fixture tests with Phase 3 harness |
| P2.03 | Preserve existing post URLs/content during migration | DONE | P2.02 | Production build generated both `/blog/[slug]` pages | Redirect paths move only in Phase 8 |
| P2.04 | Mark unsupported article claims for editorial review | DONE | P2.01 | `WritingPost.reviewStatus` is `needs-review` for both migrated articles | Review each article line-by-line in Phase 8 |
| P2.05 | Remove Contentlayer packages/config/generated aliases | DONE | P2.02–P2.03 | `package.json`, `next.config.mjs`, `tsconfig.json`; clean build | Confirm clean `npm ci` in Phase 3 quality gate |
| P2.06 | Keep optional article interaction in isolated client islands | DONE | P2.02 | `ArticleContent` is server-rendered; audio, comments, sharing, and AI promotion are not rendered | Reconsider features only after Phase 8/9 reviews |

## Phase 3 — Framework, dependencies, and quality

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P3.01 | Consolidate Next config | DONE | Phase 2 | Single compatible `next.config.mjs` preserves reviewed headers/images | Recheck compatibility during Next upgrade |
| P3.02 | Upgrade Next 14→15→16.2.11 in separate commits | DONE | P3.01 | Commits `45e029f`, `50bd626`; official codemods | Reassess Next only when security advisory has a compatible patched release |
| P3.03 | Align React 19.2, types, ESLint, and TypeScript | DONE | P3.02 | React/DOM 19.2.8, matching types, ESLint 9.39.5, Next 16 flat config | Keep aligned during dependency updates |
| P3.04 | Add Node engine and Node 22 CI runtime | DONE | P3.02 | `package.json` engines; `.github/workflows/quality.yml` | Verify CI run after PR opens |
| P3.05 | Replace `next lint`; add all approved scripts | DONE | P3.03 | `package.json` direct `eslint`, typecheck, test, e2e, a11y, build commands | Keep commands non-interactive |
| P3.06 | Add Vitest, Testing Library, Playwright, axe, and CI | DONE | P3.05 | `vitest.config.ts`, tests, `playwright.config.ts`, workflow | Expand coverage in phases 4–9 |
| P3.07 | Resolve Motion warning and remove obsolete/undeclared packages | DONE | P3.03 | Next 16 build has no Motion warning; unused Contentlayer-era packages/components removed | Recheck after design migration |
| P3.08 | Pass clean install, lint, typecheck, tests, build, and production audit | DONE | P3.01–P3.07 | `npm ci`, all six quality scripts, and `npm audit --omit=dev --audit-level=high` pass | Re-run before every merge |

## Phase 4 — Design foundations and theme

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P4.01 | Add semantic light/dark design tokens and AA contrast evidence | DONE | Phase 3 commit `9ce7b49` | `globals.css` token pairs and light/dark browser screenshots | Recheck any new token pair before use |
| P4.02 | Add approved font pairing with measured loading | DONE | P4.01 | `next/font` Source Sans 3/Source Serif 4 with swap loading | Measure page-level impact in Phase 10 |
| P4.03 | Add no-flash system-default theme and accessible toggle | DONE | P4.01 | `next-themes`, hydration-safe `ThemeToggle`, browser persistence test | Cover both themes with axe assertions after route redesign |
| P4.04 | Split server layout and client navigation/theme/contact islands | DONE | P4.03 | Server `SiteHeader`/`SiteFooter`; theme/mobile client islands; server compatibility layout | Remove compatibility wrapper as routes are redesigned |
| P4.05 | Add skip link, focus system, zoom, landmarks, and dialog/menu behavior | DONE | P4.04 | Skip link, visible focus, unrestricted zoom, one shared `main`, mobile-menu keyboard test | Add dialog focus management if a future dialog returns |
| P4.06 | Add application-level reduced motion | DONE | P4.04 | Global `prefers-reduced-motion` policy | Remove legacy continuous motion in Phase 5 homepage redesign |
| P4.07 | Remove template decorations and deprecated navigation/clipboard code | DEFERRED | P4.04–P4.06 | Shared layout decorations and clipboard fallback removed | Homepage remains Phase 5; CV Phase 7; writing Phase 8; checker Phase 9. Each route replacement must remove its legacy styling. |

## Phase 5 — Senior homepage

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P5.01 | Server-render approved headline, proposition, proof, work, capabilities, writing, and CTAs | DONE | Phase 4 commit `53c7165` | `src/app/page.tsx` consumes only `portfolioContent` | Recheck facts with any content-model changes |
| P5.02 | Build semantic system-flow node controls and decorative SVG | DONE | P5.01 | `SystemFlow`; semantic buttons and decorative SVG connection | No WebGL/Three Fiber introduced |
| P5.03 | Add three accessible work-lens tabs and details region | DONE | P5.02 | Playwright keyboard/click test; named tabpanel | Include touch/manual check in release checklist |
| P5.04 | Provide text/no-JS and reduced-motion equivalents | DONE | P5.02 | Server-rendered labels/text flow and Phase 4 global motion policy | Add no-JS manual evidence in Phase 10 |
| P5.05 | Feature approved work with Velsa fallback rule | DONE | P5.01; content review | Approved Velsa, Jobs Tracker Bot, and Tactical Tech summaries; Velsa labelled private/redacted | Replace Velsa with Web Crawler only if factual review changes |
| P5.06 | Meet homepage accessibility and JS budget | DEFERRED | P5.01–P5.05 | Homepage axe assertions pass in both themes; production build passes | Capture agreed Lighthouse and first-load JS measurement in Phase 10 |

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
