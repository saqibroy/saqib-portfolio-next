# Implementation Status

**Current phase:** Phase 11 — Visual systems and case-study redesign

**Current branch:** `agent/phase-11-qa` (stacked on case-study PR #16)

**Last updated:** 2026-07-25

**Overall state:** IN PROGRESS; implementation and automated release gates pass, with preview screenshot and interaction approval still required before merge

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
| 6. Work/case studies | DONE | Phase 5 commit `40eeb41` | Stacked PR; merge after Phases 0–5 |
| 7. Experience/legacy CV route | DONE | Phases 1, 4 | Separate PR |
| 8. Writing experience/review | DONE | Phases 2, 4 | Separate PR |
| 9. Accessibility security gate | DONE (promotion DEFERRED) | Phase 3; external evidence | Separate PR |
| 10. SEO/performance/docs/release | DONE | Phases 5–9 dispositions | PRs #11–#13; production verification and manual review complete |
| 11. Visual systems/case-study redesign | IN PROGRESS | Phase 10 production baseline | Four reviewable PRs; visual work requires screenshot approval |

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
| P3.06 | Add Vitest, Testing Library, Playwright, axe, and CI | DONE | P3.05 | `vitest.config.ts`, tests, serial Playwright execution to avoid Next dev cold-compilation races, workflow | Expand coverage in phases 4–9 |
| P3.07 | Resolve Motion warning and remove obsolete/undeclared packages | DONE | P3.03 | Next 16 build has no Motion warning; unused Contentlayer-era packages/components removed | Recheck after design migration |
| P3.08 | Pass clean install, lint, typecheck, tests, build, and production audit | DONE | P3.01–P3.07 | `npm ci`, CI-compatible `npm@10.9.2 ci`, all six quality scripts, and `npm audit --omit=dev --audit-level=high` pass | Re-run before every merge and retain npm 10 lockfile compatibility while CI uses Node 22 |

## Phase 4 — Design foundations and theme

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P4.01 | Add semantic light/dark design tokens and AA contrast evidence | DONE | Phase 3 commit `9ce7b49` | `globals.css` token pairs and light/dark browser screenshots | Recheck any new token pair before use |
| P4.02 | Add approved font pairing with measured loading | DONE | P4.01 | Platform Arial/Georgia pairing removes font downloads while retaining the CV-inspired sans/serif hierarchy; D-027 records the final-design LCP evidence | Recheck page-level impact if typography or font delivery changes |
| P4.03 | Add no-flash system-default theme and accessible toggle | DONE | P4.01 | `next-themes`, hydration-safe `ThemeToggle`, browser persistence test | Cover both themes with axe assertions after route redesign |
| P4.04 | Split server layout and client navigation/theme/contact islands | DONE | P4.03 | Server `SiteHeader`/`SiteFooter`; theme/mobile client islands; server compatibility layout | Remove compatibility wrapper as routes are redesigned |
| P4.05 | Add skip link, focus system, zoom, landmarks, and dialog/menu behavior | DONE | P4.04 | Skip link and its programmatic-focus target, visible focus, unrestricted zoom, one shared `main`, mobile-menu keyboard test | Add dialog focus management if a future dialog returns |
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
| P6.01 | Add `/work` and validated `/work/[slug]` model | DONE | Phases 1/4/5 | `caseStudies`, validator tests, generated static routes | Keep required section keys stable |
| P6.02 | Publish Jobs Tracker Bot case study | DONE | P6.01 | `/work/jobs-tracker-bot`; public repository evidence | Recheck if repository changes materially |
| P6.03 | Publish Tactical Tech modernisation case study | DONE | P6.01 | `/work/tactical-tech-platform-modernisation`; contribution wording retained | Do not strengthen scope |
| P6.04 | Publish Web Crawler Dashboard case study | DONE | P6.01 | `/work/web-crawler-dashboard`; public repository evidence | Recheck if repository changes materially |
| P6.05 | Publish reviewed redacted Velsa case study | DONE | P6.01; factual review | `/work/ai-assisted-contract-workflow`; unsupported sections omitted | Maintain confidentiality ceiling |
| P6.06 | Add accessible architecture diagrams/text alternatives | DONE | P6.02–P6.05 | Semantic ordered flows plus attached text alternatives; mobile screenshot | Recheck if diagrams become interactive |
| P6.07 | Keep accessibility platform unpublished | DONE | P6.01 | Validator/unit and 404 browser test | Revisit only after Phase 9 gate |

## Phase 7 — Experience and CV redirect

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P7.01 | Add server-rendered `/experience` from shared content | DONE | Phases 1/4 | `src/app/experience/page.tsx`; route browser test | Reuse the shared content model for factual edits |
| P7.02 | Add accurate education, languages, and earlier roles | DONE | P7.01 | `src/app/experience/page.tsx`; `portfolioContent` | Avoid engineering-leadership implication in future wording |
| P7.03 | Add ATS primary and visual secondary download UI | DONE | P1.06/P7.01 | `experience.spec.ts`: labelled links and HTTP 200 checks | Recheck files whenever CV source changes |
| P7.04 | Permanently redirect `/cv` | DONE | P7.01–P7.03 | `next.config.mjs`; browser test asserts 308 and destination | Keep the redirect in the Phase 10 sitemap/canonical review |
| P7.05 | Remove old CV component and update links/metadata | DONE | P7.04 | Deleted `src/app/cv`; navigation, home link, route test, and canonical metadata updated | Search legacy references again during Phase 10 |

## Phase 8 — Writing experience and review

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P8.01 | Add `/writing` and `/writing/[slug]` | DONE | Phases 2/4 | Server routes, static params, metadata, and browser route tests | Keep rendering in server components |
| P8.02 | Permanently redirect `/blog` and both slugs | DONE | P8.01 | `writing.spec.ts` asserts 308 and target for index and both existing slugs | Include redirects in Phase 10 sitemap/canonical review |
| P8.03 | Review/source/correct SEO article | DONE | P8.01 | `seo-trends-2025.mdx`; Google primary-source links; content inventory entry | Re-review when the cited guidance materially changes |
| P8.04 | Review/source/correct accessibility article | DONE | P8.01 | `web-accessibility-2025.mdx`; W3C and WHO source links; content inventory entry | Re-review when WCAG/source guidance materially changes |
| P8.05 | Remove generic AI/audio marketing | DONE | P8.01 | New server pages omit audio, comments, sharing, and AI-promotional UI; source review removes AI-search promises | Add a feature only after privacy, accessibility, and cost review |
| P8.06 | Add system-design category without new top-level route | DEFERRED | P8.01 | No approved system-design note exists to publish; no empty category is advertised | Revisit when an approved system-design note is ready for `/writing` |
| P8.07 | Meet article accessibility and JS budget | DEFERRED | P8.01–P8.06 | Axe checks pass for index/article in both themes; production build passes | Capture route JavaScript and Lighthouse measurements in Phase 10 |

## Phase 9 — Accessibility checker security gate

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P9.01 | Keep route unlinked and `noindex` | DONE | Phase 3 | Server `layout.tsx` metadata; navigation has no checker link; browser noindex test | Keep default even if later work blocks |
| P9.02 | Add strict local request/response/model schemas and limits | DONE | P9.01 | `accessibility-checker.ts`; unit tests for malformed JSON, oversized request/response, invalid payload | AI enrichment removed, so no untrusted model output is accepted; revisit only with a reviewed model feature |
| P9.03 | Add protocol/credential/private-target checks and sanitized errors | DONE | P9.02 | URL parser, DNS lookup block, `redirect: 'error'` for proxy call, API/browser tests | Proxy DNS lookup reduces risk but cannot guarantee target-side redirect/DNS safety |
| P9.04 | Replace random progress with honest state | DONE | P9.01 | New checker page and browser test | Keep states tied to actual request lifecycle |
| P9.05 | Verify external SSRF/redirect/DNS/concurrency controls | DEFERRED | External microservice evidence | No reviewed evidence for the scanner service’s target fetching, redirect validation, DNS rebinding handling, or global concurrency limits | Revisit only with an audited microservice design/test evidence |
| P9.06 | Verify durable rate limit, privacy logging, and cost ceilings | DEFERRED | Deployment capability | No durable deployment-level rate limiter or privacy/logging evidence is available; AI enrichment is disabled locally | Revisit only with deployment configuration and retention/cost evidence |
| P9.07 | Decide promotion from evidence | DEFERRED | P9.02–P9.06 | P9.05 and P9.06 remain unresolved; route is deliberately unlinked and `noindex` | Promote only after both external evidence items are accepted |

## Phase 10 — SEO, performance, docs, and release

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P10.01 | Add sitemap, robots, canonical metadata, OG image, and JSON-LD | DONE | Public routes stable | Generated routes; `release-metadata.spec.ts`; production build | Recheck as public routes change |
| P10.02 | Standardize all public URLs on `ssohail.com` | DONE | P10.01 | Metadata/sitemap/robots tests; obsolete public Vercel host removed | Recheck deployment configuration before release |
| P10.03 | Rewrite README and add architecture/setup/quality/deploy docs | DONE | Phases 1–9 | `README.md`, `docs/release-checklist.md` | Keep commands and deployment notes current |
| P10.04 | Add light/dark desktop/mobile screenshots | DONE | UI stable | `release-visual.spec.ts`; inspected generated four-viewport capture set | Re-capture from a deployment preview before final merge |
| P10.05 | Capture three-run median Lighthouse results | DONE | Local production build | Phase 10 report; twelve local and twelve live-production Lighthouse 12.8.2 JSON reports under `/tmp` | Re-measure after material framework, global client-island, or delivery changes |
| P10.06 | Pass performance and accessibility release budgets | DONE | P10.05 | Three-run local medians meet LCP (1.71–1.83 s), accessibility/SEO (100), and CLS (0); user approved the documented 161 kB shared-runtime exception on 2026-07-25 | Re-measure and revisit the exception if framework, global client islands, or first-load script composition changes materially |
| P10.07 | Verify redirects, downloads, CI, manual checklist, and preview | DONE | P10.01–P10.06 | Production checks pass after repair PR #12: routes/details/downloads, redirects, metadata, screenshots, theme, keyboard skip focus, touch flow, no-JS content, and four three-run Lighthouse medians; user confirmed the remaining manual review on 2026-07-25 | Re-run the release checklist after material route, interaction, accessibility, framework, or delivery changes |

## Phase 11 — Visual systems and case-study redesign

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P11.01 | Split prominent title from descriptive positioning across content, metadata, structured data, and experience | DONE | Phase 10 baseline | `src/content/portfolio.ts`, root metadata/JSON-LD, OG image, experience H1, unit tests | Keep title usage covered during homepage redesign |
| P11.02 | Register the user-approved `7+ products & platforms` proof and homepage proof selection | DONE | P11.01 | Claim registry, metric model, content inventory, unit tests | Render only the two approved proof cards in the homepage PR |
| P11.03 | Remove stale/incomplete public copy without strengthening claims | DONE | P11.01–P11.02 | Homepage/dossier source scan, case-study validator, and browser assertions reject the targeted incomplete-work wording | Keep the validator current if new case-study fields are added |
| P11.04 | Build the progressive homepage hero signal and Systems Lab with semantic fallbacks | DONE | P11.01–P11.03 | `HeroSignalCanvas`, `SystemsLab`, deferred R3F topology, GSAP stage sync, keyboard/touch/reduced-motion/save-data/no-JS browser tests | Re-measure animation chunks and LCP in the final QA PR |
| P11.05 | Redesign homepage proof, selected work, capabilities, writing, and contact composition | DONE | P11.04 | Server homepage composition; inspected light desktop and mobile captures; 32 browser tests and 7 two-theme axe routes pass | Re-capture from the final stacked preview for user approval |
| P11.06 | Add validated architecture nodes/edges, structured outcomes, and optional dossier sections | DONE | P11.03 | Typed `CaseStudyOutcome`, `ArchitectureNode`, and `ArchitectureEdge`; required-section and dangling-edge tests; unsupported sections absent | Revalidate when case-study content changes |
| P11.07 | Apply the engineering-dossier template to every published case study | DONE | P11.06 | Shared full-width hero/outcomes, responsive TOC, grouped chapters, decision cards, private evidence boundary, and inspected Jobs/private captures | Re-capture light/dark desktop/mobile from final preview |
| P11.08 | Add accessible deferred architecture maps and text equivalents | DONE | P11.06–P11.07 | Deferred React Flow map, keyboard node selection, fit controls, ordered text equivalent, no-JS coverage, and 10 two-theme axe routes passing | Verify touch/zoom and final preview interaction |
| P11.09 | Capture and review light/dark desktop/mobile visuals including 200% zoom | IN PROGRESS | P11.04–P11.08 | `release-visual.spec.ts` captures 12 light/dark desktop/mobile views plus two 200%-equivalent reflow views; automated overflow assertions pass | User must review the final QA preview and captures before visual merge |
| P11.10 | Pass clean install, lint, typecheck, unit, browser, axe, build, audit, and Lighthouse gates | DONE | P11.04–P11.09 | Local gate: `npm ci`; lint; typecheck; 21 unit tests; 36 browser tests; 10 two-theme axe route checks; build; zero-vulnerability production audit. PR #17 `quality` passed the same CI workflow after npm 10 lockfile validation. Phase 11 report records Lighthouse and chunk measurements. | Re-run against production after the reviewed PR stack merges |
| P11.11 | Add Phase 11 completion report and release through reviewed PRs | IN PROGRESS | P11.01–P11.10 | Interim `docs/phase-reports/phase-11-visual-systems-and-dossiers.md`; draft PRs #14–#17; PR #17 Vercel and GitHub Actions checks pass | Obtain screenshot/interaction approval, then merge in order and append production verification |

## Phase 12 — Homepage and case-study simplification

| ID | Deliverable / acceptance criterion | Status | Dependency | Evidence | Next action / revisit |
| --- | --- | --- | --- | --- | --- |
| P12.01 | Replace generic homepage animation and Systems Lab with real-project visuals | DONE | Phase 11 | `src/app/page.tsx`, homepage visual captures, Chromium keyboard/touch/reduced-motion checks | Recheck only if homepage scope changes |
| P12.02 | Compact case-study model and four-section page template | DONE | P12.01 | `src/content/caseStudies.ts`, `/work/[slug]`, 4 case-study route and axe checks | Keep the 180-word and 2–4-decision validation limits |
| P12.03 | Publish URL-shortener system-design article and MDX visuals | DONE | P12.01 | `content/writing/designing-a-url-shortener.mdx`, writing routes, metadata, sitemap, and axe checks | Re-review if article sources or product framing change |
| P12.04 | Remove retired WebGL and animation dependencies; complete quality gate and report | DONE | P12.01–P12.03 | `package.json`, lockfile, `docs/phase-reports/phase-12-home-and-case-study-simplification.md`; lint, typecheck, 19 unit, 38 browser, 11 axe, and build checks | Open and review the focused PR before merge |

## Blockers

No blocker prevents completion of Phase 0.

Known future external dependencies:

- Accessibility-microservice security evidence.
- A durable deployment-level rate-limiting capability.
- Reviewable public evidence for optional open-source lab projects.
