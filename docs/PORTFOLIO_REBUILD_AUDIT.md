# Portfolio rebuild audit

Audit date: 2026-07-23

## V2 baseline addendum

The first rebuild passed its automated checks but did not satisfy the design or
communication objective. This addendum supersedes its positive manual visual review.

- The 2,190-line custom `globals.css` replaced the old neon language with a different
  monolithic system rather than establishing focused, maintainable styling.
- The chartreuse-on-graphite palette does not reflect the supplied cerulean CV and
  makes the portfolio feel disconnected from Saqib's authored material.
- The homepage repeats the four blueprint stages inside the SVG and again as a row of
  button-like controls. The repetition looks like purposeless tabs rather than an
  explanatory interaction.
- The animation is an indefinitely travelling dot. It does not reveal boundaries,
  request/response behavior or the role of cross-cutting quality concerns.
- The hero's “Engineering focus” annotation repeats stack information that appears
  again in the blueprint, capabilities and case studies.
- Several headings describe abstractions (“clear responsibilities”, “explicit jobs”)
  before presenting the concrete product problem, responsibility and outcome.

The V2 rebuild must use the visual CV as a design source, the ATS CV as an approved
factual expansion, and a tracked homepage visual gate before the system is propagated
to the remaining routes.

Scope: the tracked application source, content, configuration, scripts, public assets,
generated build output, dependency tree, and the supplied rebuild brief. Existing
portfolio copy was treated as unverified unless it appeared in the approved-facts
section of the brief.

## Executive assessment

The current portfolio is a small Next.js application with a disproportionately large
client-side surface. Its primary story is a generic animated developer portfolio, while
the strongest verified evidence—application-flow design, legacy modernisation,
performance, accessibility contribution, and end-to-end product delivery—is buried in
an oversized CV page.

The rebuild should replace the existing presentation rather than restyle it. The
recommended result is a mostly server-rendered systems notebook with typed content,
three evidence-led case studies, a restrained SVG blueprint, and small client islands
only where interaction adds meaning.

## Current routes and features

| Route | Current implementation | Decision |
| --- | --- | --- |
| `/` | Client-rendered hero, 70 continuously animated code characters, gradient orbs, animated skill pills, and an AI-badged blog CTA | Replace completely |
| `/cv` | 985-line client page with hardcoded experience, skill levels, awards, projects, and extensive motion | Replace completely from typed approved content |
| `/blog` | Contentlayer index for two MDX posts, dominated by AI/audio marketing | Simplify to a restrained engineering-notes index |
| `/blog/[slug]` | Contentlayer-rendered article, 555-line client enhancement module, and 930-line audio player | Remove the audio path and replace Contentlayer with a small supported typed content model |
| `/accessibility-checker` | 542-line client UI for a remote scanner, AI explanations, and fabricated progress | Remove from the recruiter journey; preserve only the verified open-source project description |
| `/api/check-accessibility` | Proxies a submitted URL to a configured service and calls Gemini for explanations | Remove from this portfolio |
| `/api/generate-audio-summary` | Sends submitted article content to a hardcoded Gemini model with a simple fallback | Remove with the audio feature |
| error / not-found | Large animated decorative states coupled to the old visual language | Replace with small semantic states |
| `public/sitemap.xml` | Hand-authored, incomplete static sitemap | Replace with App Router sitemap metadata |

Routes missing for the intended information architecture are `/work`, reusable
`/work/[slug]` case studies, and a clear contact destination/flow.

## Dependency and configuration findings

- Installed baseline: Next.js 14.2.30, React/React DOM 18.3.1.
- Declared packages are internally mismatched:
  - Next.js is declared at `^14.2.29`.
  - `eslint-config-next` is 15.2.4.
  - React runtime is 18.x while React type definitions are 19.x.
  - Deprecated `@next/font` is installed even though the app uses the separate
    `geist` package.
- Two conflicting framework configs exist: `next.config.js` and `next.config.ts`.
  Only one can be authoritative, making configuration intent ambiguous.
- `next lint` is obsolete and currently opens an interactive setup prompt rather than
  running a reproducible lint check.
- Contentlayer 0.3.4 / next-contentlayer 0.3.4 is old and introduces a large,
  vulnerable transitive dependency tree. It is a framework-upgrade blocker.
- The baseline production dependency audit reports 40 findings: 1 critical, 6 high,
  32 moderate, and 1 low. The critical `protobufjs` path and most of the
  OpenTelemetry/Contentlayer findings are transitive through the retained AI and
  Contentlayer dependencies; the old Next.js version also has multiple advisories.
- `npm ls` reports many extraneous packages, indicating a stale install state.
- The build script performs image optimisation after every Next build through
  `ts-node`, even when no images change.
- Baseline `npm run build` passes on Node 22.18.0, but warns that Framer Motion cannot
  resolve optional `@emotion/is-prop-valid`.
- Baseline route output shows `/blog/[slug]` at roughly 384 kB first-load JavaScript,
  versus roughly 135–144 kB for the other feature routes.

Current stable versions checked during the audit are Next.js 16.2.11 and React
19.2.8. The upgrade must use the official Next codemod, then align Next.js,
React, React DOM, their types, and `eslint-config-next`.

## Large or mixed-responsibility components

| File | Size | Mixed concerns |
| --- | ---: | --- |
| `src/app/cv/page.tsx` | 985 lines | data, skill taxonomy, projects, disclosure state, animation, layout, navigation content |
| `src/app/blog/[slug]/AudioSummaryPlayer.tsx` | 930 lines | API calls, localStorage cache, TTS service, audio state, download, voice selection, UI |
| `src/components/Layout.tsx` | 557 lines | pathname detection, loading gate, header, navigation, mobile menu, contact modal, clipboard, animation, footer |
| `src/app/blog/[slug]/ClientComponents.tsx` | 555 lines | progress UI, sharing, navigation, reading controls, browser state |
| `src/app/accessibility-checker/page.tsx` | 542 lines | form, fake progress, API state, scanner results, AI explanation UI |
| `src/components/MDXContent.tsx` | 420 lines | MDX runtime, syntax rendering, copy controls, presentation for every element |
| `src/app/api/check-accessibility/route.ts` | 339 lines | validation, proxying, model calls, output shaping, fallbacks |

The common problem is not line count alone. Facts, infrastructure access, state, and
presentation are coupled, which makes factual review and isolated testing difficult.

## Unsupported or unsafe factual claims

The following existing claims are not supported by the approved facts and must not be
carried into the rebuild:

- “Tech enthusiast” and generic “scalable applications” positioning where no scale is
  established.
- “Expert,” “Advanced,” and “Competent” skill ratings.
- “Multi-chain agentic LLM pipeline,” “agentic workflows,” “self-correction loops,”
  “microservice architecture,” and similar distributed/agent-system language.
- “Achieved WCAG 2.1 AA compliance across 5+ applications.” The supported statement is
  that Saqib contributed to WCAG 2.1 AA compliance.
- “520+ tests,” high test coverage, organisation-wide CI/CD ownership, and other
  unverified test or delivery metrics.
- Organic-search/SEO growth, revenue, conversion, traffic, user-count, or production
  scale claims.
- Formal architecture, leadership, team-management, cloud, Kubernetes, event-driven,
  high-availability, or multi-agent claims.
- Numerous CV projects and activities not present in the approved facts, including the
  citizenship trainer, portfolio, language trainer, CV template, TTS service, homelab,
  solar/energy dashboards, commerce site, GDPR manager, and named awards or leadership
  activities.
- Current CV content that extends the Velsa work into unsupported formal architecture
  or scale language.
- Blog copy that presents “AI-powered” reading as a core professional capability.

The old MDX articles also include time-sensitive, unsourced numerical and legal/SEO
assertions. They should not remain published as evidence without an editorial and
source review.

## Accessibility risks

- The app uses a delayed “waiting period,” creating an unnecessary content gate.
- Motion remains active in several places even when reduced motion is requested; the
  homepage still animates reduced-opacity background characters.
- Infinite pulse, bounce, ping, rotate, and drifting animations are widespread.
- The custom pathname hook reads `window.location` during render and does not provide
  correct reactive navigation state.
- The contact modal and mobile menu combine focus, scroll, and disclosure concerns in
  one component; reliable focus trapping/restoration is not evident.
- Small icon-only links and controls have inconsistent accessible names.
- Decorative complexity competes with reading order and focus visibility.
- The accessibility checker displays “Perfect Accessibility Score” after an automated
  static scan, an overclaim that automated testing cannot support.
- Fabricated loading percentages and staged messages do not represent actual progress.
- Article components use broad `any` types and custom semantics that are difficult to
  audit.

## Performance risks

- The homepage sends Framer Motion and makes the entire page a client component for
  decorative effects.
- Seventy animated DOM nodes plus multiple infinite blur/pulse layers create continuous
  paint and compositing work.
- The CV and error pages ship motion code even though their content can be static.
- The blog detail path ships a 930-line audio player, syntax highlighter, browser
  utilities, and client enhancements by default.
- Large source PNGs remain in `public/images` even though WebP derivatives exist.
- Multiple font approaches and unused packages increase dependency and bundle cost.
- Heavy code is not isolated behind intentional user interaction.
- There is no bundle budget or automated route smoke coverage.

## SEO and metadata risks

- Titles say “Full Stack Developer” or “Modern Web Developer” rather than the approved
  “Senior Full-Stack Engineer.”
- Open Graph URLs point to `saqibroy.vercel.app` while canonical metadata uses
  `ssohail.com`.
- `/og-image.png` is referenced but does not exist.
- Metadata is mostly global; core routes lack specific canonical descriptions.
- A static sitemap covers only a small subset of the application.
- There is no App Router `robots.ts`, selected-work structured data, or verified
  route-specific CreativeWork data.
- Existing keyword arrays are generic and encourage keyword-heavy positioning rather
  than evidence.

## Security and privacy risks

- The accessibility route accepts arbitrary URLs and does not itself block loopback,
  private, link-local, metadata-service, or DNS-rebinding targets. Proxying the URL to a
  separate service does not prove that service is protected from SSRF.
- Neither POST endpoint has effective rate limiting.
- Request schemas and upstream response schemas are not validated.
- The audio endpoint logs request/model metadata, and the checker logs service details;
  the implementation has no explicit “do not log submitted content” boundary.
- AI requests use a hardcoded, outdated Gemini model name.
- AI JSON is parsed without schema validation and fans out to as many as ten concurrent
  model calls per scan.
- Timeouts are incomplete: one upstream fetch has an abort timeout, while model calls
  do not.
- The TTS URL is read in a client component from a non-public environment variable, so
  the boundary is incorrect and likely produces an unavailable service URL.
- The legacy `X-XSS-Protection` response header is unnecessary; there is no explicit
  CSP or modern permissions/referrer policy.
- `.env` is ignored and untracked, which is correct. Its values were not included in
  this audit.

## Retain, remove, and separate

### Retain and rebuild

- The domain, contact details, social profiles, and approved professional history.
- The verified Tactical Tech metrics with explicit employer/project context.
- Velsa’s verified React/Django/FastAPI application flow and Stripe integration.
- Jobs Tracker Bot, Web Crawler Dashboard, and Accessibility Microservice as the only
  prominent open-source projects.
- A small amount of Motion for the system blueprint, with a static SVG baseline.
- Vercel Analytics and Speed Insights if deployment uses Vercel; keep them outside
  critical rendering.

### Remove

- Code rain, glowing orbs, glass-heavy cards, AI badges, cinematic loading gate, fake
  progress, animated skill ratings, and continuous decorative effects.
- Unsupported CV projects, awards, leadership entries, skill levels, and claims.
- Blog audio summarisation and its API route.
- The live accessibility-checker route and proxy/API from this portfolio.
- Contentlayer, the runtime MDX stack, syntax highlighter, Google Generative AI SDK,
  and obsolete image-optimisation build step.
- Duplicate Next config and unused template assets.

### Separate conceptually

- Accessibility scanning remains visible as a verified open-source project and case
  study, not as an unverified production tool in the primary navigation.
- Engineering notes support the recruiter journey but do not advertise speculative AI
  functionality.
- Contact is a direct, dependable mail action and contact block rather than a modal
  product of its own.

## Baseline checks

- `npm run lint`: failed before linting because `next lint` opened an interactive
  setup prompt.
- `npm run build`: passed on Next.js 14.2.30 with a Framer Motion optional-dependency
  warning.
- `npm audit --omit=dev`: 40 findings (1 critical, 6 high, 32 moderate, 1 low).
- Automated accessibility, Playwright, bundle analysis, and Lighthouse checks were
  not configured in the baseline.

## Factual unknowns to preserve as unknown

- No current availability/employment-status claim is approved. The hero may say only
  “Berlin, Germany · Senior Full-Stack / Senior Frontend / Product Engineering.”
- Public repository/demo URLs for the three approved open-source projects have not
  been supplied. GitHub profile links are safe; project-specific links must be omitted
  unless discoverable from verified repository metadata.
- Confidential employer implementation detail, team size, scale, infrastructure,
  test coverage, and operational metrics must remain omitted.
- No verified current CV PDF exists in the repository. A new PDF should be generated
  from the approved typed source after the HTML CV is complete.
