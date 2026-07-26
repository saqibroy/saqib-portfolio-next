# Content Inventory

**Inventory date:** 2026-07-24

**Authority:** Approved portfolio prompt, then linked public evidence, then the
approved ATS CV where it does not conflict

**Status vocabulary:** Keep, Rewrite, Verify, Defer, Remove

This inventory records current public content and the intended disposition.
`Verify` means the claim must not be promoted into a new page until evidence is
linked. `Remove` means remove it from public presentation; source history
remains available in Git.

## Approved positioning and facts

These facts may enter the Phase 1 claim registry as `approved`.

### Profile

- Saqib Sohail; Berlin, Germany.
- Prominent title: Senior full-stack engineer.
- Descriptive positioning: Frontend-leaning full-stack engineer.
- 8+ years of software-engineering experience.
- 7+ products and platforms across verified professional and public-project
  work. This is a user-approved Phase 11 claim.
- Frontend: React, Next.js, TypeScript, JavaScript, Vue.js, Nuxt.js, HTML, CSS.
- Backend: Python, Django, FastAPI, Node.js, Ruby on Rails, REST APIs.
- Data/applied AI: PostgreSQL, MySQL, vector databases, RAG, LLM integration.
- Delivery: application architecture, frontend architecture, API design,
  service integration, Docker, CI/CD, automated testing.
- B.Sc. Computer Science.
- Graduate coursework at TU Berlin; no completed M.Sc.
- English: Professional working proficiency.
- German: B1 certified.

### Velsa Technologies, 08/2025–05/2026

- Designed the application flow and service integration for a React contract
  configurator and conversational assistant sharing Django-backed contract
  data.
- Owned end-to-end delivery across both React applications, the application
  backend, AI service, and production integration.
- Built a browser-based editor with merge fields, inline option controls, and
  conditional clauses.
- Developed a conversational workflow that gathered missing information,
  created or updated editing sessions, and opened generated contracts in the
  configurator.
- Designed and deployed a FastAPI service integrating LLM inference and vector
  retrieval with Django.
- Integrated Stripe payments/webhooks for purchasing and controlled document
  access.

### Tactical Tech, 08/2019–04/2025

- Official title: Front-End Developer.
- Owned frontend delivery and modernisation decisions across 5+ public-facing
  platforms.
- Audiences included researchers, educators, international users, and
  civil-society organisations.
- Migrated 3 legacy applications to Next.js/Nuxt.js.
- Reduced initial load times by 30% through code splitting, lazy loading, and
  frontend optimisation.
- Refactored Decap CMS content architecture and reduced editorial workflow time
  by more than 50%.
- Partnered with product, design, research, and editorial teams.
- Contributed to WCAG 2.1 AA.

Do not attribute Tactical Tech organisation-wide reach to Saqib personally.

### Tactical Tech system-audit boundaries, Phase 13

- Local repository evidence verifies a Git-backed editorial workflow that
  transforms content for a REST Content API consumed by Next.js and Vue
  project sites. A central search interface queries the same API across
  configured project namespaces.
- The audit does not prove deployment ownership, organisation-wide operations,
  individual authorship of every repository, or production performance beyond
  the approved metrics above. See `docs/tactical-tech-system-audit.md` for
  repository paths and implementation references.

### Approved public-project summaries

- **Jobs Tracker Bot:** async Python job aggregation; direct ATS/provider
  adapters; separate Germany/Berlin eligibility and CV-fit scoring;
  deterministic filters, deduplication, persistence, immediate/digest routing,
  Discord/Telegram adapters, Docker, health endpoint, scheduling, concurrency
  control, GitHub Actions deployment to Oracle Cloud, and 520+ tests.
- **Web Crawler Dashboard:** React/TypeScript frontend, Go/Gin backend,
  GORM/MySQL, JWT authentication, URL analysis, search, filters, bulk actions,
  crawl-status lifecycle, Docker setup, and automated frontend tests.
- **Accessibility Microservice:** Node/Express, axe-core, and JSDOM; static WCAG
  2.1 A/AA analysis without a headless browser; API, health endpoint, input
  validation, error handling, and graceful shutdown. Public URL scanning is not
  approved for promotion until its security review passes.

## Current routes and APIs

| Current route | Current content | Disposition | Target |
| --- | --- | --- | --- |
| `/` | Generic animated hero, technology copy, CV/blog CTAs | Rewrite | Senior homepage |
| `/cv` | Legacy route | DONE in Phase 7 | Permanent redirect to `/experience` |
| `/blog` | Legacy route | DONE in Phase 8 | Permanent redirect to `/writing` |
| `/blog/[slug]` | Legacy article routes | DONE in Phase 8 | Permanent redirect to `/writing/[slug]`; slugs preserved |
| `/accessibility-checker` | Experimental public-URL automated scan with bounded proxy | DONE locally in Phase 9; promotion DEFERRED | Keep unlinked and `noindex` until external microservice and rate-limit evidence exists |
| `/api/check-accessibility` | Proxy plus Gemini explanations | Defer | Security-gated API |
| `/api/generate-audio-summary` | Gemini summary generation endpoint | REMOVED | Unused public endpoint and Gemini dependency removed; audio is not a public feature. |
| not-found/error UI | Animated template-style error surfaces | Rewrite | Shared design foundation |

## Current homepage content

| Content | Issue | Disposition |
| --- | --- | --- |
| “Full-Stack Engineer & Tech Enthusiast” | Undersells positioning; “Tech Enthusiast” is prohibited | Remove |
| Generic performant/accessible/scalable statement | No evidence or concrete work | Rewrite |
| AI blog promotion | Promotional and not the primary positioning | Remove |
| Technology pills | Generic template signal | Remove |
| Floating code/AI characters and glowing gradient orbs | Decorative, distracting, continuous motion | Remove |
| CV and blog CTAs | Useful actions but wrong destinations/hierarchy | Rewrite |
| No proof metrics, work, capabilities, or writing preview | Missing senior evidence | Add in Phase 5 |

## CV-page content before Phase 1

The monolithic client page and the entries in this section were replaced in
Phase 1 by the validated shared content model. The inventory remains here as
the audit record for claims that must not return. Phase 7 replaced the
temporary `/cv` route with `/experience` and a permanent redirect.

### Experience and profile

| Current item | Issue | Disposition |
| --- | --- | --- |
| Velsa “08/2025 - Present” | Outdated | Rewrite to 08/2025–05/2026 |
| Velsa “headless” and “multi-chain/self-correction” wording | Stronger than approved facts | Remove unless verified |
| Tactical Tech “achieved WCAG AA across 5+ applications” | Approved wording is “contributed to WCAG 2.1 AA” | Rewrite |
| Tactical Tech organic-traffic increase | No approved metric | Remove |
| “Pixel-perfect” | Subjective marketing wording | Remove |
| Durch die Stadt high test coverage | Not in approved prompt; visual and ATS CV differ | Verify |
| TU Berlin “M.Sc. coursework” | Can imply a degree path/completion | Rewrite to graduate coursework |
| German “Upper-Intermediate” and advanced professional communication | Stronger than B1 certified | Rewrite |
| English “Fluent” | Approved wording differs | Rewrite |
| Leadership/volunteer experience | Valid CV history but not engineering leadership | Keep with explicit volunteer context |

### Subjective skill ratings

All `Expert`, `Advanced`, and `Competent` labels are marked **Remove**.
GraphQL, Apollo, MongoDB, GitLab CI, LangChain, Fastify, agentic workflows, and
similar details are **Verify** before entering shared public capability data.

### Featured professional projects

| Current project | Disposition | Reason |
| --- | --- | --- |
| Headless Contract Editor | Rewrite | Use approved AI-assisted contract-workflow wording |
| AI Chatbot Platform | Remove/merge | Duplicates Velsa and contains unapproved agentic/self-correction claims |
| JAMstack Platform | Verify | Tactical Tech details exceed approved facts |
| GDPR Consent Manager | Verify | Not in approved facts |

### Open-source cards

| Current card | Disposition | Intended placement |
| --- | --- | --- |
| Jobs Tracker Bot | Keep/rewrite | Flagship case study |
| Web Crawler Dashboard | Keep/rewrite | Case study |
| Accessibility Check Microservice | Defer promotion | Gated case study/tool |
| Portfolio Website | Remove from selected work | Repository documentation only |
| German Citizenship Test Trainer | Verify | Optional open-source lab |
| Trainer | Verify | Optional open-source lab |
| Modern CV Template | Verify | Optional open-source lab |
| Deutsch B1 Vokab | Verify | Optional open-source lab |
| ServDubai Astro | Verify | Optional open-source lab |
| AI TTS Service | Verify | Optional open-source lab |
| RPi Homelab Stack | Verify | Optional open-source lab |
| Solar Facility Dashboard | Verify | Optional open-source lab |
| Crunchy Snacks | Verify | Optional open-source lab |
| Renewable Energy Dashboard | Verify | Optional open-source lab |

Only the approved flagship projects are guaranteed a public launch placement.
Other repositories may appear under “Open-source lab” only after direct
evidence review.

## Existing writing

No article source will be deleted during migration.

| Article | Current route | Disposition | Required review |
| --- | --- | --- | --- |
| SEO in 2025: 10 Game-Changing Trends That Actually Matter | `/writing/seo-trends-2025` | DONE in Phase 8: revised as “A practical SEO baseline for engineering teams” | Removed dated predictions, percentages, ranking guarantees, and promotional language; retained source-linked engineering guidance |
| Web Accessibility in 2025: A Frontend Developer's Complete Guide to WCAG and Beyond | `/writing/web-accessibility-2025` | DONE in Phase 8: revised as “A practical accessibility baseline for frontend teams” | Removed legal, lawsuit, revenue, and unsupported testing claims; retained WCAG/WHO source-linked engineering guidance |

The current index says every post has AI-generated audio. That statement is
**Remove** until the feature, privacy behavior, availability, and cost controls
are verified.

The current author bio says “over 6 years” and adds digital-marketing/business
positioning. It is **Rewrite** to the approved engineering positioning.

## Metrics inventory

| Metric | Status | Required context |
| --- | --- | --- |
| 8+ years | Approved | Software engineering experience |
| 5+ platforms | Approved | Tactical Tech public-facing platforms; do not imply personal audience scale |
| 3 migrations | Approved | Legacy applications migrated to Next.js/Nuxt.js |
| 30% faster initial loads | Approved | Tactical Tech; code splitting, lazy loading, frontend optimisation |
| 50%+ faster editorial workflows | Approved | Tactical Tech; Decap CMS content architecture |
| 520+ tests | Approved | Jobs Tracker Bot |
| 11 remote job boards | Needs review | Present in CV/site, absent from the controlling approved fact list |
| 100+ new students | CV-only | Volunteer context only; not engineering leadership |
| Other traffic, SEO, coverage, user, revenue, uptime metrics | Unsupported | Do not publish |

## Shared layout and interaction content

| Current content | Disposition |
| --- | --- |
| Saqib Sohail wordmark | Keep, restyle |
| CV, Blog, Contact navigation | Rewrite as Work, Experience, Writing, Contact |
| Accessibility navigation code commented out | Keep route unpromoted; remove dead badge code later |
| Email, GitHub, LinkedIn links | Keep after link verification |
| Copy-email action | Keep, replace deprecated API and add feedback |
| Contact modal | Rewrite with proper dialog/focus behavior or replace with simpler contact surface |
| AI and accessibility badges | Remove |
| Template footer effects | Remove |

## Metadata and discoverability

| Current item | Issue | Disposition |
| --- | --- | --- |
| Root title “Full Stack Developer” | Generic | Rewrite |
| Open Graph URL `saqibroy.vercel.app` | Outdated | DONE in Phase 10: canonical metadata uses `ssohail.com` |
| Referenced `/og-image.png` | File is absent | DONE in Phase 10: generated `opengraph-image.tsx` |
| Static `public/sitemap.xml` | Incomplete and contains legacy `/cv` only | DONE in Phase 10: removed in favour of `sitemap.ts` |
| `lib/seo.ts` | Duplicated, generic, and apparently unused | Remove after metadata consolidation |
| Twitter placeholder handle | Unsupported placeholder | Remove |
| `maximumScale: 1` | Prevents expected zoom behavior | Remove in design foundation |

## Assets

| Asset group | Current files | Disposition |
| --- | --- | --- |
| Favicons/manifest | favicon SVG/PNG variants, Apple/Android icons, Safari mask, webmanifest | Keep; restyle/regenerate only if brand mark changes |
| Article originals | Two PNG files under `public/images/` | Preserve through writing review |
| Article derivatives | Six WebP variants per article under `public/optimized-images/` | Preserve until image-pipeline decision |
| Framework placeholders | `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg` | Remove if confirmed unused |
| Static sitemap | `public/sitemap.xml` | Removed in Phase 10; dynamic sitemap route is authoritative |
| TTS worker | `public/tts-worker.js` | REMOVED with the unused audio endpoint; no public audio feature remains. |
| CV downloads | `public/downloads/saqib-sohail-cv-ats.pdf` and `public/downloads/saqib-sohail-cv-visual.pdf` | Added in Phase 1; ATS is primary |
| OG image | Referenced but absent | Generate in Phase 10 |

## Repository documentation

| Document | Disposition |
| --- | --- |
| `README.md` | Rewrite in Phase 10; current template/emoji/AI claims are inaccurate |
| Existing `CV_UPDATE_*`, `BEFORE_AND_AFTER.md`, `CV_PAGE_VISUAL_GUIDE.md`, `DOCUMENTATION_INDEX.md` | Preserve as historical material; verify before reusing claims |
| `saqib_portfolio_upgrade_plan.md` | Preserve as user-provided, currently untracked input |
| Phase 0 `docs/` documents | Maintain as authoritative rebuild records |

## Explicitly prohibited claims

Do not publish:

- formal Software Architect, Staff, Principal, Engineering Manager, team-lead,
  or mentoring claims;
- cloud/Kubernetes expertise;
- invented scale, users, traffic, revenue, uptime, or production metrics;
- MCP, A2UI, AG-UI, or MCP-UI experience;
- production AI evaluation systems;
- security certifications;
- organisation-wide Tactical Tech reach attributed personally;
- any metric not approved above or linked to reviewed public evidence.
