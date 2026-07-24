# Decisions and Risks

**Last updated:** 2026-07-24

**Decision authority:** Approved rebuild plan and Phase 0 repository audit

## Decision log

| ID | Decision | Alternatives considered | Reason | Status |
| --- | --- | --- | --- | --- |
| D-001 | Use the approved prompt as the factual ceiling | Treat either PDF or current site as equal authority | PDFs/site contain stronger and conflicting claims | Accepted |
| D-002 | Position as “Senior frontend-leaning full-stack engineer” | Generic Full-Stack Engineer; Software Architect | Accurate target positioning without inventing a formal title | Accepted |
| D-003 | Use restrained CV-inspired cerulean/teal | Exact bright CV treatment; deep-blue brief palette | Preserves identity while improving web contrast and restraint | Accepted |
| D-004 | ATS CV primary, visual CV secondary | ATS only; visual primary | Recruiter utility first while preserving designed option | Accepted |
| D-005 | Keep system-design notes under `/writing` | Dedicated route; case studies only | Avoid an underpopulated top-level section | Accepted |
| D-006 | Redirect `/cv` and `/blog` permanently | Duplicate routes; return 404 | Preserve existing links and avoid duplicate content | Accepted |
| D-007 | Move content-pipeline/framework remediation before redesign | Keep upgrade late | Current clean install is blocked and production dependencies are vulnerable | Accepted |
| D-008 | Use `upgrade` only for Phase 0 | Long-lived integration branch; one rebuild PR | Keeps the first delivery reviewable and follows the approved branch strategy | Accepted |
| D-009 | Keep Accessibility Checker unlinked and `noindex` after local hardening | Promote after local proxy changes; remove route | Local checks cannot prove target-side SSRF, redirect, DNS rebinding, concurrency, deployment rate limits, or privacy controls | Accepted; promotion deferred |
| D-020 | Keep release gated on the strict shared-runtime JavaScript budget | Declare release ready from scores alone; remove measurements | Font loading remediation brings local LCP medians to 1.71–1.83 s with accessibility/SEO 100 and CLS 0, but transferred scripts remain 161 kB | Revisit with a payload reduction or an approved exception before release |
| D-009 | Use Server Components by default | Keep client-rendered page shells | Reduces JavaScript and separates interaction from content | Accepted |
| D-010 | Use semantic HTML nodes plus decorative SVG for the hero flow | SVG-only controls; canvas/WebGL | Stronger keyboard/no-JS behavior and lower performance risk | Accepted |
| D-011 | Do not add React Three Fiber/WebGL | Desktop-only enhancement | No evidence it improves the story enough to justify the cost | Accepted |
| D-012 | Migrate writing through a server-only MDX loader | Continue Contentlayer; per-route manual MDX | Preserves a dynamic collection without the unsupported peer dependency | Accepted |
| D-013 | Keep accessibility checker unlinked and `noindex` by default | Promote after local proxy changes only | Critical SSRF/concurrency controls live in an external service boundary | Accepted |
| D-014 | Omit unanswered case-study details | Infer likely architecture; add generic future behavior | Factuality is more important than narrative completeness | Accepted |
| D-015 | Do not silently delete existing posts | Rewrite in place without record; remove dated posts | Preserves source and makes editorial decisions auditable | Accepted |
| D-016 | Start Phase 1 as a stacked branch from `upgrade` | Wait for Phase 0 merge; continue directly on `upgrade` | The user explicitly authorized forward implementation before review; preserving a separate branch keeps the change reviewable | Accepted |
| D-017 | Remove unverified AI/audio/comments/sharing from article rendering | Keep isolated controls visible while reviewing | The features are not verified for availability, privacy, accessibility, or cost, and must not be advertised | Accepted |
| D-018 | Retain ESLint 9 with Next 16 | Use ESLint 10 immediately | The Next 16 React plugin configuration crashes under ESLint 10; ESLint 9 satisfies Next 16's peer range and runs the full ruleset | Accepted |
| D-019 | Use secure stable nested overrides for Next's PostCSS and Sharp paths | Wait for an upstream Next release; force npm audit remediation | Current stable PostCSS 8.5.22 and Sharp 0.35.3 resolve the production audit without downgrading or preview software | Accepted |
| D-021 | Make selected web fonts optional and keep mobile H1s on a stable local serif fallback | Preload fonts with `swap`; remove the serif identity | Prevents late font application from becoming the mobile LCP while preserving the CV-inspired pairing when the fonts are available | Accepted |

## Risk register

| ID | Risk | Likelihood / impact | Mitigation | Owner phase | Revisit trigger | Status |
| --- | --- | --- | --- | --- | --- | --- |
| R-001 | Contentlayer removal changes article rendering or slugs | Medium / High | Source-preserving Git move, build-generated post routes, and Phase 3 tests | Phases 2–3 | Negative-fixture/route tests added | Monitoring |
| R-002 | Next 14→16 upgrade introduces route/cache/image regressions | Medium / High | Upgrade through Next 15 in separate commits and run full route/build tests | Phase 3 | Each major-version commit | Open |
| R-003 | Current dependency tree includes high/critical advisories | High / High | Early isolated migration/upgrade; no forced audit rewrite | Phases 2–3 | Clean production audit | Open |
| R-004 | Factual content remains duplicated during transition | High / Medium | Typed source of truth and claim registry before new pages | Phase 1 | Before first redesigned page | Open |
| R-005 | Velsa case study reveals confidential or inferred details | Medium / High | Use only approved flow, redact domain details, require content review | Phase 6 | Before publish flag changes | Open |
| R-006 | Tactical Tech wording implies sole or organisation-wide impact | Medium / High | Keep official title, contribution wording, and metric context | Phases 1/6 | Content review | Open |
| R-007 | Existing articles contain unsupported statistics/legal claims | High / Medium | Preserve, classify, source/correct/remove during writing review | Phase 8 | Before `/writing` launch | Open |
| R-008 | Theme causes flash, hydration mismatch, or low contrast | Medium / Medium | Early theme script, system default, two-theme axe/contrast tests | Phase 4 | Design-foundation preview | Open |
| R-009 | Interactive flow is confusing without animation/JavaScript | Medium / High | Server-render labels/text equivalent; semantic controls; no-JS test | Phase 5 | Homepage acceptance | Open |
| R-010 | Article JavaScript remains above budget | Medium / High | Server MDX, server highlighting, optional client islands, bundle checks | Phases 2/8 | Post-migration build | Open |
| R-011 | Accessibility checker can be abused for SSRF or AI cost | High / Critical | Keep unpromoted; require external hardening and durable rate limiting | Phase 9 | External evidence and deployment limiter available | Open |
| R-012 | In-memory rate limiting appears safe in serverless deployment | High / High | Explicitly reject it as promotion evidence; require durable limiter | Phase 9 | Security design review | Open |
| R-013 | Audio/AI features expose data or create unbounded cost | Medium / High | Verify privacy, payloads, rate/cost limits, and availability or remove UI | Phases 8/9 | Before feature is advertised | Open |
| R-014 | CI Lighthouse thresholds are flaky | Medium / Medium | Use controlled preview, three-run medians, hard budgets plus documented tolerance | Phase 10 | First CI baseline | Open |
| R-015 | Untracked user artifacts are accidentally removed | Low / High | Never clean them implicitly; track ignore/disposition separately | All | Before cleanup/ignore change | Monitoring |
| R-016 | CV files drift from website facts | Medium / Medium | Stable downloads and shared release checklist comparing dates/title/languages | Phases 1/10 | Every CV replacement | Open |
| R-017 | Source Sans/Serif loading harms LCP or privacy | Low / Medium | Use local `next/font` assets, optional non-preloaded loading, stable mobile H1 fallback, and repeatable Lighthouse evidence | Phases 4/10 | Any typography or font-weight change | Mitigated |
| R-018 | Locked Next 16.2.11 carries nested high advisories | High / High | Stable `postcss`/`sharp` overrides resolve the nested paths; re-run production audit before merge | Phase 3 | Any Next or override update | Mitigated |

## Deferred decisions with defaults

These do not block the current roadmap.

### Accessibility checker promotion

Default: remain unlinked and `noindex`.

Promotion can be reconsidered only after:

1. the external microservice demonstrates protocol, redirect, private-network,
   DNS-rebinding, timeout, response-size, and concurrency controls;
2. the deployment has a durable rate limiter;
3. privacy-safe logging and cost controls are documented;
4. the end-to-end security tests pass.

### Additional open-source lab projects

Default: do not include them in the launch navigation or homepage.

Reconsider a project after its public repository is reviewed and a
`publicly-verified` evidence record supports its summary.

### Audio summaries and comments

Default: remove promotional placement.

Retain a feature only after availability, privacy, accessibility, payload,
cost, and bundle impact pass review. Article content must not depend on it.

### Dedicated system-design route

Default: use a `system-design` writing category.

Reconsider `/system-design` when at least three reviewed notes exist and a
separate route materially improves navigation.

## Change protocol

- Add a new decision row when implementation changes a locked approach.
- Never rewrite an accepted decision without preserving the previous choice
  and reason.
- Link risk closure to tests, content review, measurement, or phase-report
  evidence.
- A risk may be `Accepted` only when its user impact and fallback are explicit.
