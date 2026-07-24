# Saqib Sohail Portfolio Rebuild Plan

## 1. Executive decision

The portfolio should be repositioned from a generic animated developer site into an evidence-based **senior product and systems engineering portfolio**.

The goal is not to present Saqib as a titled Software Architect. The goal is to make his demonstrated architecture work visible:

- designing application flows across frontend, backend, AI services, data and payments
- modernising frontend and content architectures
- making technical tradeoffs
- translating product and research needs into maintainable systems
- owning delivery from interface and API design through deployment

The site should communicate this within 15–20 seconds, while deeper case studies should demonstrate how decisions were made.

## 2. Factual guardrails

Use only facts supported by the approved CV or explicitly confirmed by Saqib.

### Approved positioning

- Senior frontend-leaning full-stack engineer
- 8+ years of experience
- React, Next.js, TypeScript, Vue.js and Nuxt.js
- Django, FastAPI, Node.js and Ruby on Rails
- PostgreSQL, MySQL, MongoDB, vector databases, RAG and LLM integration
- Testing, Docker, GitLab CI/CD and GitHub Actions
- Product work across civic-tech, nonprofit and early-stage environments
- Accessibility, performance, legacy modernisation and AI-assisted product features
- B.Sc. Computer Science
- Graduate Computer Science coursework at Technische Universität Berlin

### Explicit architecture confirmation

Saqib explicitly confirms that at Velsa Technologies he made architecture decisions for the AI-assisted contract/chat workflow connecting the frontend, Django backend and FastAPI AI service.

This supports precise wording such as:

> Designed the application flow and service integration for an AI-assisted contract workflow connecting a React/TypeScript editor, Django backend and FastAPI AI service.

It does **not** support claims about enterprise scale, distributed systems leadership, cloud architecture, event-driven architecture, Kubernetes, high availability, millions of users, multi-agent protocols or formal Architect job titles.

## 3. CV recommendation

A small CV update is justified. Do not change the role title to “Software Architect” or “Solution Architect.”

### Recommended summary adjustment

Current idea:

> Senior frontend-leaning full-stack engineer with 8+ years of experience delivering production web applications across civic-tech, nonprofit and early-stage product environments. Deep expertise in React, Next.js and TypeScript, with hands-on backend experience in Django, FastAPI, Node.js and Ruby on Rails. Experienced in designing application flows and integrations across frontend, backend and AI services, modernising legacy systems, and improving accessibility and performance.

### Recommended expertise adjustment

Add a restrained category:

> Architecture and delivery: application architecture, frontend architecture, API design, service integration, Docker, CI/CD and automated testing

Only retain items that are demonstrable from the CV and project work.

### Recommended Velsa bullets

- Designed the application flow and service integration for an AI-assisted contract workflow connecting a React/TypeScript editor, Django backend and FastAPI AI service.
- Owned end-to-end delivery across the editor, application backend, AI service and production integration.
- Built a browser-based contract editor supporting merge fields, inline option controls and conditional clauses.
- Developed a conversational workflow that collected structured input and populated contract content through backend APIs.
- Designed and deployed a FastAPI service integrating LLM inference and vector retrieval with the existing Django platform.
- Integrated Stripe payment and webhook flows for purchasing and controlled document access.

### Tactical Tech wording

Keep the existing measurable evidence. Architecture can be shown without inflating the title:

- Owned frontend delivery and modernisation across 5+ public-facing platforms.
- Migrated 3 legacy applications to Next.js and Nuxt.js, reducing initial load times by 30%.
- Refactored the Decap CMS content architecture, reducing editorial workflow time by more than 50%.
- Partnered with product, design, research and editorial teams on accessible, maintainable web experiences.

The phrase “content architecture” is already supported. Avoid implying ownership of organisation-wide enterprise architecture.

## 4. Current portfolio audit

### Positioning problems

- The homepage headline “Full-Stack Engineer & Tech Enthusiast” undersells seniority and ownership.
- The copy is generic and does not explain what kinds of systems Saqib designs or what outcomes he has produced.
- “AI” is used repeatedly as decoration rather than demonstrated through architecture and decisions.
- The portfolio sends visitors to a long CV page instead of giving a focused story.

### Visual problems

- Floating code characters, glowing gradients, glass cards, pills, sparkles and “AI” badges create a template-like appearance.
- Infinite decorative motion competes with the actual content.
- The design lacks an identifiable visual concept connected to Saqib’s work.
- The current project cards show technologies but rarely explain the problem, constraints, decisions or tradeoffs.

### Content accuracy risks

The website currently contains claims that are stronger than the approved CV, including:

- “agentic workflows”
- “multi-chain LLM systems”
- “self-correction loops”
- unsupported “Expert” skill ratings
- an unsupported increase in organic search traffic
- stronger accessibility ownership than the approved CV states
- potentially unsupported project metrics and test counts

Every such claim must be removed or explicitly verified before publication.

### Engineering problems

- The homepage is a client component with 70 continuously animated DOM elements.
- The shared Layout component is very large and handles navigation, modals, animation and routing concerns together.
- It implements a custom `window.location.pathname` hook instead of using Next.js routing APIs.
- The CV page is a very large client component with hardcoded data and unsupported skill-level labels.
- React, React type definitions, Next.js and eslint-config-next versions are mismatched.
- The project uses an old Next.js version and the `next lint` script, which is not part of current Next.js.
- Metadata contains inconsistent production URLs.
- AI and accessibility API routes need validation, rate limiting, safer URL handling and current model configuration.
- The browser audio component is oversized and mixes API access, caching, UI and media control responsibilities.

## 5. New positioning

### Primary headline

> I design and build web products across interfaces, services and AI workflows.

### Supporting copy

> Senior frontend-leaning full-stack engineer with 8+ years of experience turning complex product and research requirements into accessible, maintainable systems.

### Evidence strip

Use four verified facts:

- 8+ years building production web applications
- 5+ international public-facing platforms
- 3 legacy applications modernised
- 30% faster initial loads / 50%+ shorter editorial workflows

### Role target

The site should support applications for:

- Senior Full-Stack Engineer
- Senior Frontend Engineer
- Product Engineer
- Frontend-leaning Full-Stack Engineer
- Full-Stack Engineer working on AI-assisted products

Do not position Saqib as a Principal Engineer or formal Software Architect unless later evidence supports it.

## 6. Information architecture

### Home

1. Senior positioning and availability
2. Interactive system blueprint hero
3. Verified evidence strip
4. Three selected case studies
5. “How I approach system design”
6. Selected open-source systems
7. Short background and contact call to action

### Work / case studies

Create dedicated pages for:

1. **AI-assisted contract workflow — Velsa Technologies**
2. **Platform modernisation and content architecture — Tactical Tech**
3. **Jobs Tracker Bot or Web Crawler Dashboard — open source**

Each case study should use this structure:

- Context
- Problem
- Constraints
- My responsibility
- System boundaries
- Architecture/data-flow diagram
- Important decisions
- Alternatives and tradeoffs
- Reliability, accessibility and testing considerations
- Outcome
- What I would improve next
- Technologies
- Links, when public

Never expose confidential employer details.

### CV

Replace the long decorative CV page with:

- concise professional summary
- verified experience
- evidence-based capabilities
- selected projects
- education and languages
- clear PDF download
- no progress bars
- no “Expert/Advanced/Competent” badges
- no unsupported claims

### Writing / architecture notes

The blog should support interview readiness and demonstrate reasoning. Recommended articles:

- Designing a URL shortener: requirements, API, data model, redirects, abuse prevention and scaling tradeoffs
- Designing an AI-assisted document workflow across React, Django and FastAPI
- Migrating legacy frontend applications to Next.js and Nuxt.js
- Designing an accessibility checking service with safe URL handling and understandable reports

These should be written as decision-oriented engineering notes, not generic AI tutorials.

## 7. Visual direction

Use a **systems notebook / technical editorial** identity.

### Characteristics

- deep graphite or warm neutral background
- one restrained accent colour
- strong typography and spacing
- visible grid and structural lines
- diagrams that look authored, not stock
- small labels, annotations and decision markers
- minimal gradients
- no glassmorphism as the primary visual language
- no decorative “AI” badges
- no code rain
- no generic glowing orbs

### Typography

Use one expressive but readable heading face and one neutral body face. A monospaced face may be used only for labels, diagrams and metadata.

### Motion

Motion should explain state or system flow:

- nodes connect as the hero story progresses
- a request moves from UI to application service to AI/data layer and returns
- case-study diagrams reveal boundaries and decisions
- project cards use small depth and focus transitions
- page transitions remain subtle

Every animation needs a reduced-motion fallback.

## 8. Hero concept: Interactive System Blueprint

### Primary implementation

Build the hero as semantic HTML and SVG, enhanced with Motion.

The visual should show four conceptual layers:

1. Product interface
2. Application services
3. Data and AI
4. Quality and delivery

A short request-flow animation should move through the layers. Labels must remain readable and useful without animation.

### Optional WebGL enhancement

A subtle React Three Fiber layer may be added only if:

- it is dynamically imported
- it does not block the headline
- it is disabled for reduced-motion users
- it is disabled or simplified on low-power/mobile devices
- device pixel ratio is capped
- rendering pauses when offscreen
- it remains within performance budgets

Do not add Rust, WebAssembly or another language only to make the portfolio appear advanced. Technology should serve the communication goal.

## 9. Technical architecture

### Framework upgrade

- Audit and upgrade from the current Next.js/React combination to current stable releases.
- Use official upgrade tooling and codemods.
- Do not use canary packages unless a required feature has no stable alternative.
- Replace obsolete lint scripts with direct ESLint or Biome commands.
- Align React, React DOM, type definitions and eslint-config-next versions.

### Rendering model

- Server Components by default
- Small client islands for interactive diagrams, contact controls and filters
- Dynamically import optional animation libraries
- Avoid converting entire pages into client components

### Content model

Move factual data out of page components:

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
    case-study/
    diagrams/
    ui/
  lib/
    content/
    seo/
    validation/
```

Define strict TypeScript types and validate content where useful.

### Component boundaries

Split the current shared Layout into:

- SiteHeader
- DesktopNavigation
- MobileNavigation
- ContactDialog
- SiteFooter
- MotionProvider

Use Next.js `Link` and `usePathname`.

Use the modern Clipboard API rather than `document.execCommand`.

### Design system

Create shared tokens for:

- typography
- spacing
- surfaces
- borders
- accent colour
- motion duration and easing
- focus states
- content widths

Avoid large strings of repeated utility classes.

### SEO and metadata

- correct canonical and Open Graph production URLs
- route-specific metadata
- sitemap and robots
- Person, WebSite and selected CreativeWork structured data
- accurate title using “Senior Full-Stack Engineer”
- no keyword stuffing

### AI and API safety

For any retained AI feature:

- validate request bodies with a schema
- limit request size
- add rate limiting
- avoid logging sensitive content
- configure model names outside business logic
- use structured output validation
- define timeouts and clear fallbacks
- do not advertise AI features that are unavailable

For the accessibility checker:

- protect against SSRF and local/private-network targets
- validate protocols and hostnames
- add rate limiting
- keep the scanner clearly separated as a project/tool, not part of the portfolio’s main navigation unless reliable

## 10. Performance and quality gates

Targets at the 75th percentile:

- LCP at or below 2.5 seconds
- INP at or below 200 milliseconds
- CLS at or below 0.1

Additional gates:

- no animation required to understand content
- no continuous 60fps scene when the hero is offscreen
- reduced-motion mode tested
- keyboard navigation tested
- colour contrast checked
- mobile layout tested at common widths
- no TypeScript errors
- lint passes
- production build passes
- unit tests for content and utility logic
- Playwright smoke tests for core routes
- automated accessibility checks for critical pages

## 11. Delivery phases

### Phase 0 — Evidence lock and cleanup

- Create a single source-of-truth content file.
- Replace outdated dates and CV content.
- Remove unsupported architecture, AI, skill-level and metric claims.
- List any remaining uncertain claims in a verification document.

### Phase 1 — Foundation

- Upgrade dependencies safely.
- fix scripts and version mismatches
- split the layout
- introduce design tokens
- centralise content
- establish test and CI commands

### Phase 2 — New homepage

- implement new hero copy
- build system blueprint diagram
- add evidence strip
- build case-study previews
- add system-design approach section
- implement restrained motion and reduced-motion fallback

### Phase 3 — Case studies

- create reusable case-study layout
- implement Velsa, Tactical Tech and one open-source case study
- include diagrams, decisions and tradeoffs
- use only approved facts

### Phase 4 — CV and projects

- rebuild CV page from source-of-truth content
- add latest PDF download
- reduce projects to the strongest relevant systems
- remove low-signal or unverified entries

### Phase 5 — Writing and tools

- simplify blog styling
- remove decorative AI marketing
- retain AI/audio only if it works reliably and is worth maintaining
- separate experimental tools from the core hiring journey

### Phase 6 — QA and release

- test responsive behaviour
- test keyboard and screen reader basics
- test reduced motion
- run Lighthouse and bundle analysis
- resolve metadata and structured data
- verify all links
- compare against factual guardrails
- create a deployment checklist

## 12. What not to do

- Do not rename Saqib’s role to Architect.
- Do not add leadership, scale or infrastructure claims.
- Do not invent metrics.
- Do not add a technology only because it looks advanced.
- Do not use animated code rain, generic terminal typing or excessive particles.
- Do not hide the content behind a cinematic intro.
- Do not make every section a card.
- Do not use skill percentages or subjective expertise ratings.
- Do not make AI the visual identity of the entire site.
- Do not expose confidential employer implementation details.

## 13. Definition of done

The rebuild is complete when a recruiter can quickly answer:

- What kind of engineer is Saqib?
- What systems has he designed and built?
- What decisions did he own?
- What measurable outcomes did he produce?
- Can he work across frontend, backend and AI integration?
- Does he understand accessibility, performance, testing and maintainability?
- Can the claims be defended in an interview?

The portfolio should look authored by the engineer it represents: calm, precise, evidence-based and technically credible.
