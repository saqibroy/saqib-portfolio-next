# Codex Prompt — Rebuild Saqib Sohail’s Portfolio

You have full access to the repository:

`saqibroy/saqib-portfolio-next`

Work as a senior product engineer, frontend architect and design-minded technical lead. Your task is to redesign and refactor this portfolio so that it demonstrates senior-level product engineering and system-design thinking without inventing any experience.

## Non-negotiable factual rule

Use only the facts in the “Approved facts” section below. The existing website is **not** a reliable factual source. It contains unsupported claims. Remove or rewrite anything that is not supported.

Never invent:

- users, traffic or production scale
- revenue or conversion metrics
- leadership or team-management responsibility
- cloud architecture
- Kubernetes
- event-driven systems
- microservice scale
- multi-agent protocols
- agentic workflows
- self-correction loops
- test counts
- SEO growth
- accessibility ownership beyond the approved wording
- job titles such as Software Architect, Solution Architect, Staff Engineer or Principal Engineer

Do not preserve a claim merely because it already exists in the repository.

## Approved facts

### Profile

- Name: Saqib Sohail
- Location: Berlin, Germany
- Title: Senior Full-Stack Engineer
- Positioning: frontend-leaning full-stack engineer
- Experience: 8+ years
- Email: saqib@ssohail.com
- Website: ssohail.com
- LinkedIn: linkedin.com/in/saqibroy
- GitHub: github.com/saqibroy
- Phone: +49 1522 6550321
- English: professional working proficiency
- German: B1 certified
- Urdu and Punjabi: native

### Summary

Saqib has delivered production web applications across civic-tech, nonprofit and early-stage product environments. His strongest frontend technologies are React, Next.js and TypeScript. He has hands-on backend experience in Django, FastAPI, Node.js and Ruby on Rails. He has experience modernising legacy systems, improving accessibility and performance, and owning AI-assisted product features from interface and API design through deployment.

### Velsa Technologies — Senior Full-Stack Engineer — 08/2025 to 05/2026

Approved facts:

- Owned end-to-end delivery of an AI-assisted contract product spanning a React/TypeScript frontend, Django application backend, FastAPI AI service and production integration.
- Built a browser-based contract editor supporting merge fields, inline option controls and conditional clauses.
- Developed a conversational workflow that collected structured user input and populated contract content through backend APIs.
- Designed and deployed a FastAPI service integrating LLM inference and vector retrieval with the existing Django platform.
- Integrated Stripe payment and webhook flows for contract purchasing and controlled document access.
- Saqib explicitly confirms that he made architecture decisions for the application flow connecting the frontend, Django backend and FastAPI AI service.

Safe architecture wording:

> Designed the application flow and service integration for an AI-assisted contract workflow connecting a React/TypeScript editor, Django backend and FastAPI AI service.

Do not extend this into unsupported distributed-systems, scale or formal Architect-title claims.

### Tactical Tech — Front-End Developer — 08/2019 to 04/2025

Approved facts:

- Owned frontend delivery and modernisation across 5+ public-facing platforms used by international audiences, researchers, educators and civil-society organisations.
- Migrated 3 legacy applications to Next.js and Nuxt.js.
- Reduced initial load times by 30% through code splitting, lazy loading and frontend optimisation.
- Refactored Decap CMS content architecture, reducing editorial workflow time by more than 50%.
- Partnered with product, design, research and editorial teams.
- Translated complex research and educational content into accessible, maintainable web experiences.
- Contributed to WCAG 2.1 AA compliance.

Do not say he single-handedly achieved compliance across all applications. Do not claim an SEO traffic increase.

### Earlier experience

- Durch die Stadt GmbH: Ruby on Rails, Vue.js, Nuxt.js, PostgreSQL, Mapbox; REST APIs; responsive components; 360-degree city and retail portals.
- TurboAd GmbH: Symfony 3, PHP 7, PHPUnit, Doctrine ORM, MySQL; relational data modelling, query optimisation and test-driven development.
- Octasolutions: Ruby on Rails, MySQL, JavaScript and Bootstrap; full-stack applications, admin dashboards, role-based authentication and responsive frontends.

### Open source projects approved for prominence

1. Jobs Tracker Bot
   - Python, GitHub Actions and Docker
   - async aggregator monitoring 11 remote job boards
   - NGO role classification
   - Discord and Telegram alerts

2. Web Crawler Dashboard
   - React, Go and Docker
   - URL analyser
   - broken-link detection
   - heading analysis
   - login-form detection
   - real-time crawl status
   - JWT authentication

3. Accessibility Microservice
   - Node.js and JSDOM
   - lightweight WCAG 2.1 A/AA scanner for static HTML
   - AI-enriched accessibility reports

Do not advertise other projects as major case studies until their facts are verified.

### Education

- Graduate coursework in Computer Science, Technische Universität Berlin, 04/2017–12/2020
- Coursework: Machine Learning, Database Systems, Computer Graphics and Advanced Web Development
- B.Sc. Computer Science, GIFT University, 09/2011–10/2015
- Coursework: OOP, Data Structures, Database Systems, Web Programming and Software Engineering

## Product objective

Replace the current generic neon/code-character portfolio with an authored, restrained and credible “systems notebook” experience.

The site must communicate:

1. Saqib can design application flows and system boundaries.
2. He can build across frontend, backend and AI integration.
3. He makes decisions based on product needs, maintainability, performance and accessibility.
4. His claims are backed by concrete work and measurable results.
5. He is applying for Senior Full-Stack, Senior Frontend and Product Engineer roles—not formal Architect roles.

## First actions

Before changing code:

1. Inspect the complete repository.
2. Create `docs/PORTFOLIO_REBUILD_AUDIT.md`.
3. Record:
   - current routes and features
   - dependency/version problems
   - large or mixed-responsibility components
   - unsupported factual claims
   - accessibility, performance, SEO and security risks
   - features that should be removed, retained or separated
4. Create `docs/PORTFOLIO_REBUILD_IMPLEMENTATION_PLAN.md`.
5. Then implement the rebuild in phases. Do not stop after writing the audit.

Do not push, open a pull request or deploy unless explicitly asked. Make focused local commits only if the environment expects commits; otherwise leave a clean working-tree diff and a summary.

## Required design direction

Use a technical editorial / systems notebook visual identity:

- deep graphite or warm neutral base
- one restrained accent colour
- strong typography
- visible grids, dividers and system lines
- custom diagrams and annotations
- minimal gradients
- no glassmorphism-heavy layout
- no animated code rain
- no generic terminal typing intro
- no excessive particles, sparkles or “AI” badges
- no cinematic loading screen
- no photograph required

The result should look designed for Saqib’s actual work, not generated from a generic developer template.

## Homepage content

### Hero

Use this direction:

Headline:

> I design and build web products across interfaces, services and AI workflows.

Supporting copy:

> Senior frontend-leaning full-stack engineer with 8+ years of experience turning complex product and research requirements into accessible, maintainable systems.

Primary actions:

- View selected work
- Download CV
- Contact

Add a concise Berlin/location and role-availability line without inventing employment status.

### Verified evidence strip

Show these facts:

- 8+ years
- 5+ public-facing platforms
- 3 legacy applications modernised
- 30% faster initial loads
- 50%+ shorter editorial workflows

Use clear context so metrics are not presented as universal results.

### Selected case studies

Feature:

1. AI-assisted contract workflow
2. Platform modernisation and content architecture
3. Jobs Tracker Bot or Web Crawler Dashboard

Each preview should communicate the problem, responsibility and one important decision—not only technologies.

### System-design approach

Create a concise section showing a defensible process:

1. Clarify users, requirements and constraints
2. Define boundaries, data flow and interfaces
3. Compare tradeoffs
4. Design failure handling, accessibility and testability
5. Deliver incrementally and measure outcomes

Present this as Saqib’s working approach, not as proof of enterprise-scale architecture.

## Hero interaction

Build a purposeful **Interactive System Blueprint**.

Primary implementation:

- semantic HTML and SVG
- a small client component using Motion
- readable without animation
- a request/data flow moving through:
  1. Product interface
  2. Application services
  3. Data and AI
  4. Quality and delivery
- labels and annotations tied to Saqib’s verified stack
- restrained hover/focus interactions
- full keyboard and reduced-motion support

Optional WebGL enhancement:

Use React Three Fiber only if it improves the result and remains within performance budgets. If used:

- dynamically import it
- disable it for reduced-motion users
- simplify or disable on mobile/low-power devices
- cap DPR
- pause rendering offscreen
- avoid a permanent 60fps loop when nothing changes
- provide a complete non-WebGL fallback
- do not make content depend on Canvas

Do not add Rust, WebAssembly or another language merely to appear advanced.

## Case-study architecture

Create a reusable case-study content model and page template.

Required sections:

- Context
- Problem
- Constraints
- My responsibility
- System boundaries
- Architecture/data flow
- Decisions
- Alternatives and tradeoffs
- Accessibility, reliability and testing considerations
- Outcome
- What I would improve next
- Technologies and links

For confidential employer work, use abstracted diagrams and state that confidential details are omitted. Never invent missing details.

## CV page

Rebuild the current CV page from a typed source of truth.

Requirements:

- concise professional layout
- no skill percentages
- no “Expert,” “Advanced” or “Competent” badges
- no unsupported facts
- current role dates: Velsa ends 05/2026
- latest PDF download
- international phone format
- projects restricted to verified entries
- print-friendly
- accessible heading structure

## Content architecture

Move profile, experience, metrics, capabilities, projects and case studies out of page components.

Suggested structure:

```text
src/
  content/
    profile.ts
    experience.ts
    capabilities.ts
    projects.ts
    case-studies/
  components/
    shell/
    home/
    diagrams/
    case-study/
    ui/
  lib/
    content/
    seo/
    validation/
```

Create strict TypeScript types. Avoid duplicating CV facts across multiple components. A factual update should be made in one place.

## Technical refactor

Audit and upgrade the project from its old Next.js/React setup to current stable releases.

Requirements:

- use official upgrade tooling/codemods
- do not use canary dependencies unless absolutely required
- align Next.js, React, React DOM, React type definitions and eslint-config-next
- replace obsolete `next lint` usage
- use Server Components by default
- isolate interactive client islands
- use Next.js `Link` and `usePathname`
- split the oversized Layout component
- replace `document.execCommand` with the Clipboard API
- lazy-load heavy interactive libraries
- remove continuous decorative animation
- centralise design tokens
- keep components focused and testable

If Contentlayer blocks the framework upgrade, evaluate a supported MDX/content solution and migrate with minimal content disruption.

## AI and tool cleanup

The portfolio currently markets AI too aggressively.

- Remove decorative AI badges and generic “AI-powered” marketing.
- Keep AI features only where they are real, reliable and useful.
- Separate experimental tools such as the accessibility checker from the primary recruiter journey.
- Review hardcoded model names and outdated SDK usage.
- Add schema validation, input-size limits, timeouts and rate limiting.
- Avoid logging submitted content.
- Validate AI structured outputs.
- Add SSRF protection for URL-scanning features.
- Fix environment-variable boundaries between server and client.
- Break the oversized audio player into focused modules if retained.
- Remove a feature rather than presenting a broken or misleading demo.

## Metadata and SEO

- use `Senior Full-Stack Engineer` in accurate page titles
- fix canonical and Open Graph URLs to `https://ssohail.com`
- add route-specific metadata
- add sitemap and robots
- add accurate Person, WebSite and selected CreativeWork structured data
- do not keyword-stuff
- ensure social-preview assets exist and match the design

## Accessibility and motion

- configure a global Motion reduced-motion policy
- use `prefers-reduced-motion`
- animations must not be required to understand content
- test keyboard navigation
- use visible focus states
- maintain contrast
- use semantic headings and landmarks
- ensure SVG diagrams have accessible text alternatives
- avoid fabricated loading progress

## Quality and performance targets

At the 75th percentile target:

- LCP ≤ 2.5 seconds
- INP ≤ 200 milliseconds
- CLS ≤ 0.1

Also require:

- TypeScript passes
- lint passes
- production build passes
- Playwright smoke tests for `/`, `/work`, selected case studies, `/cv`, `/blog` and contact flow
- automated accessibility checks for core routes
- bundle analysis
- no WebGL/animation work while offscreen
- mobile and reduced-motion testing

## Implementation phases

### Phase 0 — Audit and evidence cleanup

- create audit and plan documents
- centralise approved data
- remove unsupported claims
- correct dates and metadata

### Phase 1 — Foundation

- upgrade dependencies
- refactor app shell
- introduce content model and design tokens
- add testing/lint/typecheck/build scripts

### Phase 2 — Homepage

- new positioning
- interactive system blueprint
- evidence strip
- selected case studies
- system-design approach
- contact call to action

### Phase 3 — Case studies

- reusable case-study system
- implement Velsa, Tactical Tech and one open-source case study
- add diagrams and explicit tradeoffs without inventing facts

### Phase 4 — CV and projects

- rebuild CV page
- add verified PDF
- reduce project list to high-signal verified work

### Phase 5 — Blog and tools

- simplify blog
- remove decorative AI branding
- retain or separate experimental tools based on reliability

### Phase 6 — QA

- accessibility
- performance
- responsive design
- metadata
- security checks
- factual consistency review

## Required final report

When implementation is complete, provide:

1. files changed
2. architecture and design decisions
3. removed or corrected unsupported claims
4. dependency upgrades and migrations
5. test/build results
6. performance findings
7. remaining factual questions
8. deployment steps
9. screenshots or a clear route-by-route review when available

Do not claim success for tests or performance checks you did not actually run.
