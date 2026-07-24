import { portfolioContent } from './portfolio';

export const caseStudySectionKeys = [
  'context', 'problem', 'constraints', 'role', 'architecture', 'requestDataFlow',
  'decisions', 'alternatives', 'tradeOffs', 'reliabilitySecurityAccessibility',
  'testingDelivery', 'outcome', 'nextImprovements', 'evidence',
] as const;

export type CaseStudySectionKey = (typeof caseStudySectionKeys)[number];
export type CaseStudyVisibility = 'public' | 'private-redacted';

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  visibility: CaseStudyVisibility;
  status: 'published';
  capabilities: string[];
  stack: string[];
  outcomes: string[];
  evidenceRefs: string[];
  flow: string[];
  sections: Record<CaseStudySectionKey, string | null>;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ai-assisted-contract-workflow',
    title: 'AI-Assisted Contract Workflow',
    summary: 'A redacted workflow connecting a React/TypeScript contract editor, Django application backend, FastAPI AI service, and Stripe purchase flow.',
    visibility: 'private-redacted', status: 'published',
    capabilities: ['Frontend architecture', 'Service integration', 'Applied AI'],
    stack: ['React', 'TypeScript', 'Django', 'FastAPI', 'RAG', 'Stripe'],
    outcomes: ['End-to-end workflow delivered across editor, backend, AI service, and production integration.'],
    evidenceRefs: ['approved-velsa'],
    flow: ['Structured user input', 'React editor', 'Django APIs', 'FastAPI AI service', 'Contract content', 'Controlled document access'],
    sections: {
      context: 'The product needed a browser-based workflow for collecting structured input and producing contract content while keeping purchase and document access inside the application.',
      problem: 'The interface, application backend, AI capability, and payment lifecycle needed to work as one understandable product flow.',
      constraints: 'Company, customer, prompt, model, infrastructure, and document details remain confidential. This case study intentionally describes only the approved system boundaries.',
      role: 'Designed the application flow and service integration and owned delivery across the editor, Django backend, FastAPI service, and production integration.',
      architecture: 'A React/TypeScript editor communicated through Django APIs. Django integrated with a separate FastAPI service for LLM inference and vector retrieval, while Stripe webhooks controlled purchasing and document access.',
      requestDataFlow: 'The conversational interface collected structured values, sent them through backend APIs, and populated merge fields, inline options, and conditional clauses in contract content.',
      decisions: 'The AI capability was separated behind a FastAPI service and integrated through the application backend instead of being coupled directly to the browser editor.',
      alternatives: null,
      tradeOffs: 'Separating the AI service added an integration boundary but kept the editor and application backend responsible for predictable product state.',
      reliabilitySecurityAccessibility: 'Payment webhooks and controlled document access were part of the approved flow. Further security, reliability, and accessibility claims are omitted because public evidence is unavailable.',
      testingDelivery: 'Production integration is approved; detailed test coverage and deployment infrastructure are not publicly documented.',
      outcome: 'The delivered workflow connected structured conversation, contract editing, AI-assisted content population, payment, and controlled document access.',
      nextImprovements: null,
      evidence: 'Approved portfolio brief for the Velsa Technologies role. No confidential repository or customer material is linked.',
    },
  },
  {
    slug: 'jobs-tracker-bot', title: 'Jobs Tracker Bot',
    summary: 'An async Python job aggregation pipeline with provider adapters, deterministic eligibility rules, scoring, deduplication, persistence, and alert routing.',
    visibility: 'public', status: 'published',
    capabilities: ['Backend pipeline', 'Automation', 'Testing and delivery'],
    stack: ['Python', 'Docker', 'GitHub Actions', 'Discord', 'Telegram'],
    outcomes: ['520+ automated tests.', 'Scheduled deployment to Oracle Cloud through GitHub Actions.'],
    evidenceRefs: ['approved-jobs-tracker'],
    flow: ['ATS/provider adapters', 'Normalisation', 'Eligibility filters', 'Scoring', 'Deduplication and persistence', 'Immediate or digest alerts'],
    sections: {
      context: 'Job sources expose different APIs and payloads, while useful alerts require consistent eligibility and relevance decisions.',
      problem: 'Aggregate suitable roles without turning source-specific behaviour into one fragile scraper or sending repetitive, low-value notifications.',
      constraints: 'Provider availability and schemas vary. Germany/Berlin eligibility and CV-fit scoring need to remain separate and deterministic.',
      role: 'Designed and implemented the aggregation, filtering, scoring, persistence, notification, scheduling, health, concurrency, and delivery pipeline.',
      architecture: 'Async provider adapters feed a normalised pipeline. Deterministic filters run before separate eligibility and CV-fit scores, followed by deduplication, persistence, and notification routing.',
      requestDataFlow: 'Scheduled runs fetch provider data concurrently, normalise roles, apply filters and scores, persist decisions, and route new matches to immediate or digest Discord and Telegram adapters.',
      decisions: 'Direct provider adapters, deterministic filters, separate score dimensions, and persistence make behaviour reviewable and prevent duplicate alerts.',
      alternatives: 'A single combined score would be simpler, but it would blur location eligibility and role relevance into one opaque decision.',
      tradeOffs: 'More explicit stages create additional code and tests, but failures and ranking decisions are easier to isolate.',
      reliabilitySecurityAccessibility: 'Concurrency control, health reporting, deduplication, and persisted state protect scheduled runs. Bot output remains text-based across both notification adapters.',
      testingDelivery: 'The public project includes 520+ tests, Docker, scheduling, health checks, concurrency control, and GitHub Actions deployment to Oracle Cloud.',
      outcome: 'The pipeline turns heterogeneous provider data into deterministic, deduplicated alerts with separate immediate and digest delivery paths.',
      nextImprovements: null,
      evidence: 'Public repository: https://github.com/saqibroy/jobs-tracker-bot',
    },
  },
  {
    slug: 'tactical-tech-platform-modernisation', title: 'Tactical Tech Platform Modernisation',
    summary: 'Frontend delivery and modernisation across public-facing platforms used by researchers, educators, international users, and civil-society organisations.',
    visibility: 'private-redacted', status: 'published',
    capabilities: ['Frontend modernisation', 'Performance', 'Content architecture'],
    stack: ['React', 'Vue.js', 'Next.js', 'Nuxt.js', 'TypeScript', 'Decap CMS'],
    outcomes: ['3 legacy applications migrated.', '30% faster initial loads.', '50%+ faster editorial workflows.'],
    evidenceRefs: ['approved-tactical-tech'],
    flow: ['Editorial content', 'Decap CMS', 'Next.js or Nuxt.js application', 'Optimised frontend delivery', 'Public audiences'],
    sections: {
      context: 'Multiple public-facing platforms served research, education, and civil-society audiences with different content and product needs.',
      problem: 'Legacy frontend applications and content structures made delivery, performance, and editorial work harder to sustain.',
      constraints: 'The work spanned several platforms and cross-functional teams. This account avoids attributing organisation-wide reach or sole ownership.',
      role: 'As Front-End Developer, owned frontend delivery and modernisation decisions across 5+ public-facing platforms and partnered with product, design, research, and editorial teams.',
      architecture: 'Three legacy applications were migrated to Next.js or Nuxt.js. Decap CMS content architecture supported editorial workflows across the frontend systems.',
      requestDataFlow: 'Editors managed structured content through Decap CMS; frontend applications transformed and delivered that content to public users.',
      decisions: 'Framework migration, code splitting, lazy loading, frontend optimisation, and content-model refactoring addressed maintainability, delivery, and performance together.',
      alternatives: null,
      tradeOffs: 'Incremental modernisation preserved ongoing publishing while requiring old and new application structures to coexist during migration.',
      reliabilitySecurityAccessibility: 'The work contributed to WCAG 2.1 AA. Stronger accessibility or security claims are intentionally omitted.',
      testingDelivery: 'Detailed test and deployment claims are not included because they are not part of the approved public facts.',
      outcome: 'The work migrated three legacy applications, reduced initial load times by 30%, and reduced editorial workflow time by more than 50%.',
      nextImprovements: null,
      evidence: 'Approved portfolio brief for the Tactical Tech role and contribution scope.',
    },
  },
  {
    slug: 'web-crawler-dashboard', title: 'Web Crawler Dashboard',
    summary: 'A React/TypeScript dashboard backed by Go/Gin and MySQL for URL analysis, crawl lifecycle management, search, filters, and bulk actions.',
    visibility: 'public', status: 'published',
    capabilities: ['Frontend product UI', 'API integration', 'Data lifecycle'],
    stack: ['React', 'TypeScript', 'Go', 'Gin', 'GORM', 'MySQL', 'Docker'],
    outcomes: ['Authenticated crawl-management workflow with automated frontend tests.'],
    evidenceRefs: ['approved-web-crawler'],
    flow: ['Authenticated user', 'React dashboard', 'Go/Gin API', 'GORM', 'MySQL', 'Crawl status lifecycle'],
    sections: {
      context: 'URL analysis produces records that need to be searched, filtered, monitored, and managed through a clear lifecycle.',
      problem: 'Provide an authenticated interface for starting and managing crawl work without losing visibility into record state or bulk operations.',
      constraints: 'The public evidence supports the application architecture and feature set, not production scale or traffic claims.',
      role: 'Implemented the React/TypeScript frontend and Go/Gin backend integration represented in the public project.',
      architecture: 'A React/TypeScript dashboard communicates with a Go/Gin REST API. GORM maps application data to MySQL, with JWT authentication at the API boundary.',
      requestDataFlow: 'Authenticated actions move from dashboard controls to API handlers and persisted crawl records; updated status is returned to searchable and filterable views.',
      decisions: 'Explicit crawl states, bulk actions, search, and filters make long-running URL analysis manageable from one dashboard.',
      alternatives: null,
      tradeOffs: 'A separate Go API and React client require two delivery surfaces but keep UI state and backend persistence responsibilities clear.',
      reliabilitySecurityAccessibility: 'JWT authentication and a defined crawl-status lifecycle are supported by public evidence. Stronger security and accessibility claims are omitted.',
      testingDelivery: 'The project includes Docker setup and automated frontend tests.',
      outcome: 'The application supports authenticated URL analysis, search, filters, bulk actions, and crawl lifecycle management.',
      nextImprovements: null,
      evidence: 'Public repository: https://github.com/saqibroy/web-crawler-dashboard',
    },
  },
];

export function validateCaseStudies(items: readonly CaseStudy[] = caseStudies) {
  const slugs = new Set<string>();
  const evidence = new Set(portfolioContent.evidence.filter(({ status }) => status !== 'needs-review').map(({ id }) => id));
  for (const item of items) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug) || slugs.has(item.slug)) throw new Error(`Invalid or duplicate case-study slug: ${item.slug}`);
    slugs.add(item.slug);
    if (!item.title || !item.summary || item.stack.length === 0 || item.capabilities.length === 0 || item.flow.length < 3) throw new Error(`Incomplete case study: ${item.slug}`);
    if (!caseStudySectionKeys.every((key) => key in item.sections)) throw new Error(`Missing required section in ${item.slug}`);
    if (!item.evidenceRefs.every((id) => evidence.has(id))) throw new Error(`Unapproved evidence in ${item.slug}`);
  }
  return items;
}

validateCaseStudies();
