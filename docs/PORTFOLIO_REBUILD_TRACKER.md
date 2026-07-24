# Portfolio rebuild V2 tracker

Last updated: 2026-07-23

This is the delivery ledger for the V2 rebuild. A task is `Done` only when its
acceptance evidence is recorded here. Code existing in the repository is not, by
itself, completion evidence.

## Status legend

- `Not started`
- `In progress`
- `Blocked`
- `Done`

## Delivery tasks

| ID | Phase | Task | Status | Acceptance criterion | Evidence | Completed |
| --- | --- | --- | --- | --- | --- | --- |
| V2-001 | Evidence | Record the V2 baseline and supersede the prior visual sign-off | Done | Audit and plan describe the duplicated blueprint, weak motion, vague presentation and obsolete visual approval | V2 addenda in audit/plan; V1 QA marked historical | 2026-07-23 |
| V2-002 | Evidence | Establish approved factual sources | Done | Brief and ATS CV are recorded; template-only exclusions are explicit | Factual-source table and exclusion list below | 2026-07-23 |
| V2-003 | Foundation | Install Tailwind v4, Radix and React Three Fiber v9 | Done | Dependencies install cleanly and production audit is recorded | Install complete; audit findings are bundled Next.js PostCSS advisories with no non-breaking stable remediation | 2026-07-23 |
| V2-004 | Foundation | Replace the chartreuse system and oversized global stylesheet | Done | CV-derived tokens, fonts, base/print rules and focused components replace the prior styling | `globals.css` reduced from 2,190 to 132 lines; Source Serif 4 and IBM Plex fonts configured | 2026-07-23 |
| V2-005 | Foundation | Preserve Server Components and isolate client behavior | Done | Navigation, Motion and WebGL are the only intentional client islands | Build route output remains static/SSG; client directives limited to navigation and blueprint modules | 2026-07-23 |
| V2-101 | Homepage | Recompose the hero around one system-blueprint stage | Done | Approved positioning, actions and blueprint appear together without the old duplicate annotation panel | Desktop/mobile screenshots and browser smoke coverage | 2026-07-23 |
| V2-102 | Homepage | Implement finite 3D request-flow enhancement | Done | R3F uses demand rendering, capped DPR, finite playback, replay and offscreen pause | Revised contract-assembly sequence, staged captures, WebM recording, successful build and browser run | 2026-07-23 |
| V2-103 | Homepage | Implement semantic SVG and reduced-motion fallback | Done | Content remains complete without WebGL or animation | Reduced-motion and mobile Playwright checks; SVG fallback screenshot | 2026-07-23 |
| V2-104 | Homepage | Rebuild evidence, selected work, approach, projects and contact | Done | Sections use contextual evidence and do not repeat Jobs Tracker Bot | Homepage source, screenshots and content tests | 2026-07-23 |
| V2-105 | Review | Complete the homepage visual gate | In progress | Desktop, mobile, keyboard, reduced-motion and no-WebGL evidence is reviewed | Five screenshots captured; automated review passes; awaiting user visual acceptance | — |
| V2-201 | Content | Expand typed facts from the approved ATS CV | Not started | Exact earlier roles, dates, locations, repository URLs and community entry are centralized | Pending | — |
| V2-202 | Work | Restyle work index and three case studies | Not started | Required sections are concrete, abstract employer details safely and label present-day reflections | Pending | — |
| V2-203 | CV | Rebuild HTML CV and publish visual plus ATS PDFs | Not started | Both current PDFs download correctly and checksums are recorded | Pending | — |
| V2-204 | Notes | Restyle the notes index and two evidence-based articles | Not started | Notes lead with useful decisions and share the accepted visual system | Pending | — |
| V2-205 | Metadata | Update route metadata and social preview | Not started | Canonicals, structured data, sitemap, robots and Open Graph output are accurate | Pending | — |
| V2-301 | QA | Run static, unit, build and dependency checks | Not started | TypeScript, lint, unit tests, build, analysis and production audit results are recorded | Pending | — |
| V2-302 | QA | Run browser, accessibility and interaction checks | Not started | Core routes, CV assets, contact, keyboard, reduced-motion and fallbacks are covered | Pending | — |
| V2-303 | QA | Run performance review | Not started | Lighthouse lab results and WebGL bundle behavior are recorded without field-performance claims | Pending | — |
| V2-304 | Delivery | Produce route review and final report | Not started | Screenshots, decisions, factual corrections, test results, remaining questions and deployment steps are documented | Pending | — |

## Factual sources

| Source | Approval | Permitted use |
| --- | --- | --- |
| `Saqib_Portfolio_Rebuild_Plan.md` approved-facts section | Approved | Primary profile, experience, metrics, education and project boundary |
| `/home/saqib/projects/sohail_resume/ats_resume.tex` and `ats_resume.md` | Approved expansion | Exact earlier titles/dates/locations, repository URLs and student-association entry |
| `/home/saqib/projects/sohail_resume/template.tex` | Design/download source only | Cerulean visual system and primary PDF; claims absent from ATS source remain excluded |

Explicit exclusions: Oracle Cloud deployment, “high test coverage”, Rescue 1122,
professional management responsibility, formal Architect titles, production scale,
traffic, users, revenue and other claims prohibited by the approved brief.

## Decision log

| Date | Decision | Reason |
| --- | --- | --- |
| 2026-07-23 | Use light editorial pages with a deep-navy hero | Matches the visual CV while giving the system blueprint a purposeful stage |
| 2026-07-23 | Use Tailwind v4 plus Radix primitives | Reduce global CSS while retaining an authored, accessible identity |
| 2026-07-23 | Use R3F only as a desktop enhancement | Motion must explain the request flow and cannot become a content dependency |
| 2026-07-23 | Publish visual and ATS CVs | Recruiters receive both a designed and machine-readable option |
| 2026-07-23 | Keep the website portrait-free | Preserve the diagram-led product-engineering direction |
| 2026-07-23 | Require a homepage visual gate | Automated QA does not establish design quality or product clarity |
| 2026-07-23 | Replace generic moving geometry with a contract-assembly narrative | User review found the first V2 animation insufficiently senior and insufficiently related to verified work |
| 2026-07-23 | Move the hero from a narrow split layout to a wide typographic hierarchy | User review identified the desktop headline as congested and vertically constrained |
| 2026-07-23 | Recombine headline and blueprint in one desktop canvas | User review found the full-width stacked blueprint visually separated from the title |

## Visual review

| View | Evidence | Automated result | User decision |
| --- | --- | --- | --- |
| Desktop 1440×1000 | `docs/screenshots/v2-home-desktop.png` | Rendered; no axe violations | Pending |
| Mobile 390×844 | `docs/screenshots/v2-home-mobile.png` | Rendered; no axe violations | Pending |
| Keyboard focus | `docs/screenshots/v2-home-keyboard-focus.png` | Visible focus treatment captured | Pending |
| Reduced motion | `docs/screenshots/v2-home-reduced-motion.png` | WebGL disabled; request marker absent | Pending |
| SVG fallback | `docs/screenshots/v2-home-svg-fallback.png` | Complete semantic diagram rendered | Pending |
| Contract-flow animation | `docs/screenshots/v2-hero-contract-flow.webm` | Finite 7.2-second sequence; demand rendering stops afterward | Pending |
| Stage 01 — structured input | `docs/screenshots/v2-hero-flow-01-input.png` | Narrative and document state captured | Pending |
| Stage 02 — application service | `docs/screenshots/v2-hero-flow-02-service.png` | Service boundary state captured | Pending |
| Stage 03 — retrieval | `docs/screenshots/v2-hero-flow-03-retrieval.png` | Retrieval stack state captured | Pending |
| Stage 04 — editable return | `docs/screenshots/v2-hero-flow-04-return.png` | Assembled document state captured | Pending |
| Spacious hero — desktop | `docs/screenshots/v2-hero-spacious-desktop.png` | Wide sans-serif headline, horizontal support band and full-width blueprint captured | Pending |
| Spacious hero — mobile | `docs/screenshots/v2-hero-spacious-mobile.png` | Responsive hierarchy and SVG-first blueprint captured | Pending |
| Combined hero — desktop | `docs/screenshots/v2-hero-combined-desktop.png` | Controlled four-line headline and animation captured side by side in one hero | Pending |
| Combined hero — tablet | `docs/screenshots/v2-hero-combined-tablet.png` | Intermediate stacked breakpoint captured without desktop-column compression | Pending |

## QA run log

The results in `PORTFOLIO_REBUILD_QA.md` describe the superseded V1 rebuild.

| Date | Check | Result |
| --- | --- | --- |
| 2026-07-23 | TypeScript | Pass |
| 2026-07-23 | ESLint | Pass |
| 2026-07-23 | Unit/content tests | Pass — 6 tests |
| 2026-07-23 | Production build | Pass — 15 static/SSG route outputs |
| 2026-07-23 | Playwright desktop/mobile | Pass — 22 tests |
| 2026-07-23 | axe core routes | Pass at desktop and mobile viewports |
| 2026-07-23 | Revised hero checks | Pass — lint, TypeScript, 6 unit tests, production build and 22 Playwright tests |
| 2026-07-23 | Spacious hero checks | Pass — lint, TypeScript and 22 desktop/mobile Playwright tests including axe |
| 2026-07-23 | Combined hero checks | Pass — lint, TypeScript, production build and 22 desktop/mobile Playwright tests including axe |
| 2026-07-23 | Production dependency audit | 1 moderate and 1 high in Next.js-bundled PostCSS; `npm audit` offers only an invalid forced downgrade to Next 9.3.3, so no destructive fix applied |

## Blockers

None.

## Deferred work

None.
