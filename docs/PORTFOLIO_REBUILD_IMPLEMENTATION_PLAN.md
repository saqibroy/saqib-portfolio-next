# Portfolio rebuild implementation plan

Plan date: 2026-07-23

## V2 direction

The original implementation phases remain useful as historical context, but the active
delivery specification is the V2 plan recorded in
`docs/PORTFOLIO_REBUILD_TRACKER.md`.

V2 replaces the chartreuse dark theme with light CV-derived editorial pages and a
deep-navy hero, adopts Tailwind v4 with selective Radix primitives, and adds an
optional React Three Fiber system-flow enhancement. The semantic SVG/HTML blueprint
is the complete content baseline. WebGL is finite, demand-rendered and disabled for
reduced-motion, mobile, coarse-pointer and low-capability environments.

The active sequence is:

1. evidence and dependency foundation;
2. complete responsive homepage and visual evidence;
3. homepage visual-acceptance gate;
4. propagation to work, CV, notes and metadata;
5. full factual, accessibility, performance and build verification.

## Delivery principles

- Approved facts are the single content boundary.
- Pages and layouts are Server Components unless browser state is required.
- Motion communicates request flow; it is never required to understand content.
- Employer architecture is abstracted and explicitly marked as omitting confidential
  detail.
- Every measurable result includes its work context.
- Experimental tools may be described, but unreliable hosted demos are not part of the
  recruiter journey.
- No deployment, push, or pull request is part of this implementation.

## Phase 0 — Evidence lock and cleanup

1. Create strict types for profile, experience, evidence, capabilities, projects, case
   studies, and engineering notes.
2. Populate those modules only from the approved facts.
3. Add content validation tests that enforce unique slugs, valid internal paths,
   approved metric labels, complete required case-study sections, and canonical
   profile data.
4. Remove old page-local facts, unsupported project lists, AI claims, and incorrect
   dates/metadata.

Exit criteria:

- Profile and CV facts have one typed source.
- Unsupported claims no longer appear in rendered source/content.
- Unknown links or implementation details are omitted rather than guessed.

## Phase 1 — Framework and application foundation

1. Run the official Next.js stable upgrade codemod and record its result.
2. Align Next.js, React, React DOM, type packages, and `eslint-config-next`.
3. Remove Contentlayer and replace the two unverified MDX articles with a typed,
   source-controlled engineering-notes model.
4. Remove the AI/audio/checker runtime dependencies and routes.
5. Replace `next lint` with direct ESLint, add `typecheck`, unit-test, Playwright,
   accessibility, and bundle-analysis scripts.
6. Keep one `next.config.ts` with modern security headers.
7. Split the shell into `SiteHeader`, navigation, and `SiteFooter`; use Next `Link` and
   `usePathname` only in the small mobile navigation island.
8. Centralise colour, type, space, border, width, focus, and motion tokens in CSS.

Exit criteria:

- Current stable framework packages are aligned.
- No obsolete or conflicting config remains.
- Server Components are the default.
- Lint and typecheck are deterministic.

## Phase 2 — Homepage

1. Implement the approved headline and summary.
2. Add three primary actions: selected work, verified CV PDF, and contact.
3. Add the contextual Berlin/target-role line without claiming present availability.
4. Build a semantic SVG system blueprint with four labelled layers:
   Product interface, Application services, Data and AI, Quality and delivery.
5. Add a small Motion client enhancement for hover/focus and request-flow state.
6. Add a five-item evidence strip with Tactical Tech context where relevant.
7. Add selected-work previews that state problem, responsibility, and a defensible
   decision.
8. Add the five-step working approach and final contact CTA.

Exit criteria:

- The first viewport communicates role, scope, and evidence.
- The blueprint is readable without JavaScript or animation.
- Reduced motion and keyboard focus are first-class.

## Phase 3 — Work and case studies

1. Add `/work` with three selected case studies and the other verified open-source
   projects.
2. Create a reusable `/work/[slug]` template and strict content schema.
3. Implement:
   - AI-assisted contract workflow
   - Platform modernisation and content architecture
   - Jobs Tracker Bot
4. Include every required section: context, problem, constraints, responsibility,
   system boundaries, flow, decisions, alternatives/tradeoffs, quality
   considerations, outcome, next improvements, technologies, and links.
5. Use abstracted diagrams and a confidentiality note for employer work.
6. Where an alternative was not documented in approved facts, describe a conservative
   tradeoff inherent in the verified implementation without claiming an historical
   decision that cannot be proved.

Exit criteria:

- All case-study claims trace to approved facts.
- Employer diagrams show boundaries, not confidential implementation.
- Open-source links are included only if verified.

## Phase 4 — CV and projects

1. Build `/cv` from the shared typed profile, experience, project, education, and
   language modules.
2. Use the approved role dates, including Velsa ending 05/2026.
3. Remove skill levels, percentages, unrelated projects, unsupported certificates,
   awards, and leadership entries.
4. Add international-format phone and print-specific styles.
5. Generate `public/Saqib_Sohail_CV.pdf` from the completed print view and expose the
   same asset from all CV download actions.

Exit criteria:

- HTML and PDF CVs use the same approved source state.
- Heading and print structure are accessible and concise.

## Phase 5 — Engineering notes and tool cleanup

1. Rebuild `/blog` as “Engineering notes,” focused on decision-oriented writing.
2. Publish only notes whose content can be supported from approved work; use case-study
   material rather than generic or time-sensitive claims.
3. Remove Contentlayer, the old MDX posts, audio player, summarisation API,
   accessibility-checker UI, and checker proxy API.
4. Keep the Accessibility Microservice prominent in the verified projects collection,
   with no claim that the portfolio hosts a reliable scanner.
5. Add redirects from removed experimental routes only where doing so helps users;
   otherwise return a clear not-found state.

Exit criteria:

- No decorative AI marketing remains.
- No unvalidated AI or URL-fetching endpoint ships with the portfolio.
- Blog routes remain useful, lightweight, and accurate.

## Phase 6 — Metadata, QA, and evidence

1. Add shared metadata helpers and route-specific titles/descriptions/canonicals.
2. Add generated sitemap and robots metadata.
3. Add accurate Person and WebSite JSON-LD globally and CreativeWork JSON-LD to
   selected work.
4. Generate an authored 1200×630 social image matching the systems-notebook identity.
5. Add Playwright smoke coverage for `/`, `/work`, all selected case studies, `/cv`,
   `/blog`, and the contact mail action.
6. Add `@axe-core/playwright` checks for the core routes.
7. Test keyboard operation and reduced-motion rendering.
8. Run lint, typecheck, unit tests, production build, dependency audit, and bundle
   analysis.
9. Run Lighthouse locally when a browser is available, record lab findings, and do not
   present them as field 75th-percentile results.
10. Perform a repository-wide prohibited-claim scan.

Exit criteria:

- TypeScript, lint, unit tests, Playwright smoke/accessibility tests, and production
  build pass.
- No critical/high production dependency findings remain, or any remaining finding is
  documented with its path and impact.
- Core Web Vitals targets are documented as targets unless real field data exists.
- Final report distinguishes measured results from design safeguards.

## Target component and content layout

```text
src/
  app/
    blog/
    cv/
    work/
    layout.tsx
    page.tsx
    opengraph-image.tsx
    robots.ts
    sitemap.ts
  components/
    case-study/
    diagrams/
    home/
    shell/
    ui/
  content/
    case-studies/
    capabilities.ts
    experience.ts
    notes.ts
    profile.ts
    projects.ts
    types.ts
  lib/
    content/
    seo/
    validation/
tests/
  content.test.ts
  e2e/
```

## Verification commands

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run analyze
npm audit --omit=dev
```

Lighthouse will be run against a local production server if Chromium is available.
The generated report will be kept out of source control unless the result is useful for
the delivery record.
