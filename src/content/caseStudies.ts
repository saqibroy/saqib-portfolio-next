import { portfolioContent } from './portfolio';

export const caseStudySectionKeys = [
  'context',
  'problem',
  'constraints',
  'role',
  'architecture',
  'requestDataFlow',
  'decisions',
  'alternatives',
  'tradeOffs',
  'reliabilitySecurityAccessibility',
  'testingDelivery',
  'outcome',
  'nextImprovements',
  'evidence',
] as const;

export const requiredCaseStudySectionKeys = [
  'context',
  'problem',
  'constraints',
  'role',
  'architecture',
  'requestDataFlow',
  'decisions',
  'tradeOffs',
  'outcome',
  'evidence',
] as const;

export type CaseStudySectionKey = (typeof caseStudySectionKeys)[number];
export type CaseStudyVisibility = 'public' | 'private-redacted';
export type ArchitectureNodeKind = 'source' | 'interface' | 'boundary' | 'service' | 'decision' | 'data' | 'delivery';

export type CaseStudyOutcome = {
  value: string;
  label: string;
  context?: string;
};

export type ArchitectureNode = {
  id: string;
  label: string;
  kind: ArchitectureNodeKind;
  detail?: string;
};

export type ArchitectureEdge = {
  source: string;
  target: string;
  label?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  visibility: CaseStudyVisibility;
  status: 'published';
  capabilities: string[];
  stack: string[];
  outcomes: CaseStudyOutcome[];
  evidenceRefs: string[];
  architecture: {
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
  evidenceBoundary?: string;
  sections: Partial<Record<CaseStudySectionKey, string>>;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ai-assisted-contract-workflow',
    title: 'AI-Assisted Contract Workflow',
    summary: 'A redacted workflow connecting a React/TypeScript contract editor, Django application backend, FastAPI AI service, and Stripe purchase flow.',
    visibility: 'private-redacted',
    status: 'published',
    capabilities: ['Frontend architecture', 'Service integration', 'Applied AI'],
    stack: ['React', 'TypeScript', 'Django', 'FastAPI', 'RAG', 'Stripe'],
    outcomes: [
      {
        value: 'End to end',
        label: 'Product workflow',
        context: 'Editor, backend, AI service, payment, and controlled document access.',
      },
    ],
    evidenceRefs: ['approved-velsa'],
    evidenceBoundary: 'This private case study describes approved system boundaries only. Company, customer, prompt, model, infrastructure, and document material remain confidential.',
    architecture: {
      nodes: [
        { id: 'structured-input', label: 'Structured input', kind: 'source', detail: 'Values collected through the conversational workflow.' },
        { id: 'react-editor', label: 'React editor', kind: 'interface', detail: 'Merge fields, inline options, and conditional clauses.' },
        { id: 'django-api', label: 'Django APIs', kind: 'boundary', detail: 'Application state and integration boundary.' },
        { id: 'fastapi-ai', label: 'FastAPI AI service', kind: 'service', detail: 'LLM inference and vector retrieval.' },
        { id: 'contract-content', label: 'Contract content', kind: 'data', detail: 'Structured values populate controlled document content.' },
        { id: 'stripe-webhooks', label: 'Stripe webhooks', kind: 'service', detail: 'Purchasing lifecycle integration.' },
        { id: 'document-access', label: 'Controlled access', kind: 'delivery', detail: 'Purchase state controls document access.' },
      ],
      edges: [
        { source: 'structured-input', target: 'react-editor' },
        { source: 'react-editor', target: 'django-api', label: 'validated request' },
        { source: 'django-api', target: 'fastapi-ai', label: 'service request' },
        { source: 'fastapi-ai', target: 'contract-content', label: 'retrieved and generated content' },
        { source: 'contract-content', target: 'react-editor', label: 'populate editor' },
        { source: 'django-api', target: 'stripe-webhooks', label: 'purchase state' },
        { source: 'stripe-webhooks', target: 'document-access' },
      ],
    },
    sections: {
      context: 'The product needed a browser-based workflow for collecting structured input and producing contract content while keeping purchase and document access inside the application.',
      problem: 'The interface, application backend, AI capability, and payment lifecycle needed to work as one understandable product flow.',
      constraints: 'Confidential product and customer material sets the public evidence boundary for this account.',
      role: 'Designed the application flow and service integration and owned delivery across the editor, Django backend, FastAPI service, and production integration.',
      architecture: 'A React/TypeScript editor communicated through Django APIs. Django integrated with a separate FastAPI service for LLM inference and vector retrieval, while Stripe webhooks controlled purchasing and document access.',
      requestDataFlow: 'The conversational interface collected structured values, sent them through backend APIs, and populated merge fields, inline options, and conditional clauses in contract content.',
      decisions: 'The AI capability was separated behind a FastAPI service and integrated through the application backend instead of being coupled directly to the browser editor.',
      tradeOffs: 'Separating the AI service added an integration boundary but kept the editor and application backend responsible for predictable product state.',
      reliabilitySecurityAccessibility: 'Stripe webhooks and controlled document access kept purchase state inside the application workflow.',
      outcome: 'The delivered workflow connected structured conversation, contract editing, AI-assisted content population, payment, and controlled document access.',
      evidence: 'Approved portfolio brief for the Velsa Technologies role.',
    },
  },
  {
    slug: 'jobs-tracker-bot',
    title: 'Jobs Tracker Bot',
    summary: 'An async Python job aggregation pipeline with provider adapters, deterministic eligibility rules, scoring, deduplication, persistence, and alert routing.',
    visibility: 'public',
    status: 'published',
    capabilities: ['Backend pipeline', 'Automation', 'Testing and delivery'],
    stack: ['Python', 'Docker', 'GitHub Actions', 'Discord', 'Telegram'],
    outcomes: [
      { value: '520+', label: 'Automated tests', context: 'Deterministic pipeline and adapter coverage.' },
      { value: 'GitHub Actions → Oracle Cloud', label: 'Scheduled delivery', context: 'Containerised deployment and recurring execution.' },
    ],
    evidenceRefs: ['approved-jobs-tracker'],
    architecture: {
      nodes: [
        { id: 'ats-adapters', label: 'ATS adapters', kind: 'source', detail: 'Async source-specific acquisition.' },
        { id: 'provider-adapters', label: 'Provider adapters', kind: 'source', detail: 'Source behaviour remains behind adapter boundaries.' },
        { id: 'normalisation', label: 'Normalisation', kind: 'boundary', detail: 'Provider payloads become a consistent job model.' },
        { id: 'filters', label: 'Deterministic filters', kind: 'decision', detail: 'Explicit rules run before scoring.' },
        { id: 'eligibility', label: 'Eligibility score', kind: 'decision', detail: 'Germany and Berlin suitability remains independent.' },
        { id: 'cv-fit', label: 'CV-fit score', kind: 'decision', detail: 'Role relevance remains a separate dimension.' },
        { id: 'deduplication', label: 'Deduplication', kind: 'service', detail: 'Previously processed roles are identified.' },
        { id: 'persistence', label: 'Persistence', kind: 'data', detail: 'Decisions and notification state survive scheduled runs.' },
        { id: 'immediate-alerts', label: 'Immediate Discord / Telegram', kind: 'delivery', detail: 'New high-priority matches route immediately.' },
        { id: 'digest-alerts', label: 'Digest Discord / Telegram', kind: 'delivery', detail: 'Eligible matches can be grouped for digest delivery.' },
      ],
      edges: [
        { source: 'ats-adapters', target: 'normalisation' },
        { source: 'provider-adapters', target: 'normalisation' },
        { source: 'normalisation', target: 'filters' },
        { source: 'filters', target: 'eligibility' },
        { source: 'filters', target: 'cv-fit' },
        { source: 'eligibility', target: 'deduplication' },
        { source: 'cv-fit', target: 'deduplication' },
        { source: 'deduplication', target: 'persistence' },
        { source: 'persistence', target: 'immediate-alerts' },
        { source: 'persistence', target: 'digest-alerts' },
      ],
    },
    sections: {
      context: 'Job sources expose different APIs and payloads, while useful alerts require consistent eligibility and relevance decisions.',
      problem: 'Aggregate suitable roles without turning source-specific behaviour into one fragile scraper or sending repetitive, low-value notifications.',
      constraints: 'Provider availability and schemas vary. Germany and Berlin eligibility and CV-fit scoring need to remain separate and deterministic.',
      role: 'Designed and implemented the aggregation, filtering, scoring, persistence, notification, scheduling, health, concurrency, and delivery pipeline.',
      architecture: 'Async provider adapters fan into a normalised pipeline. Deterministic filters precede separate eligibility and CV-fit scores, followed by deduplication, persistence, and notification routing.',
      requestDataFlow: 'Scheduled runs fetch provider data concurrently, normalise roles, apply filters and scores, persist decisions, and route new matches to immediate or digest Discord and Telegram adapters.',
      decisions: 'Direct provider adapters, deterministic filters, separate score dimensions, and persistence make behaviour reviewable and prevent duplicate alerts.',
      alternatives: 'A single combined score would be simpler, but it would blur location eligibility and role relevance into one opaque decision.',
      tradeOffs: 'More explicit stages create additional code and tests, but failures and ranking decisions are easier to isolate.',
      reliabilitySecurityAccessibility: 'Concurrency control, health reporting, deduplication, and persisted state protect scheduled runs. Bot output remains text-based across both notification adapters.',
      testingDelivery: 'The public project includes 520+ tests, Docker, scheduling, health checks, concurrency control, and GitHub Actions deployment to Oracle Cloud.',
      outcome: 'The pipeline turns heterogeneous provider data into deterministic, deduplicated alerts with separate immediate and digest delivery paths.',
      evidence: 'The public Jobs Tracker Bot repository contains the implementation and delivery configuration.',
    },
  },
  {
    slug: 'tactical-tech-platform-modernisation',
    title: 'Tactical Tech Platform Modernisation',
    summary: 'Frontend delivery and modernisation across public-facing platforms used by researchers, educators, international users, and civil-society organisations.',
    visibility: 'private-redacted',
    status: 'published',
    capabilities: ['Frontend modernisation', 'Performance', 'Content architecture'],
    stack: ['React', 'Vue.js', 'Next.js', 'Nuxt.js', 'TypeScript', 'Decap CMS'],
    outcomes: [
      { value: '3', label: 'Legacy applications migrated', context: 'Next.js and Nuxt.js modernisation.' },
      { value: '30%', label: 'Faster initial loads', context: 'Code splitting, lazy loading, and frontend optimisation.' },
      { value: '50%+', label: 'Faster editorial workflows', context: 'Refactored Decap CMS content architecture.' },
    ],
    evidenceRefs: ['approved-tactical-tech'],
    evidenceBoundary: 'This account describes Saqib’s approved contribution scope and does not attribute organisation-wide reach or sole ownership.',
    architecture: {
      nodes: [
        { id: 'editorial-content', label: 'Editorial content', kind: 'source' },
        { id: 'decap-cms', label: 'Decap CMS', kind: 'interface', detail: 'Structured editorial workflows.' },
        { id: 'content-model', label: 'Content architecture', kind: 'data', detail: 'Refactored content structures.' },
        { id: 'applications', label: 'Next.js / Nuxt.js apps', kind: 'service', detail: 'Modernised frontend applications.' },
        { id: 'optimised-delivery', label: 'Optimised delivery', kind: 'boundary', detail: 'Code splitting, lazy loading, and frontend optimisation.' },
        { id: 'public-audiences', label: 'Public audiences', kind: 'delivery' },
      ],
      edges: [
        { source: 'editorial-content', target: 'decap-cms' },
        { source: 'decap-cms', target: 'content-model' },
        { source: 'content-model', target: 'applications' },
        { source: 'applications', target: 'optimised-delivery' },
        { source: 'optimised-delivery', target: 'public-audiences' },
      ],
    },
    sections: {
      context: 'Multiple public-facing platforms served research, education, and civil-society audiences with different content and product needs.',
      problem: 'Legacy frontend applications and content structures made delivery, performance, and editorial work harder to sustain.',
      constraints: 'The work spanned several platforms and cross-functional teams. This account keeps the approved contribution scope explicit.',
      role: 'As Front-End Developer, owned frontend delivery and modernisation decisions across 5+ public-facing platforms and partnered with product, design, research, and editorial teams.',
      architecture: 'Three legacy applications were migrated to Next.js or Nuxt.js. Decap CMS content architecture supported editorial workflows across the frontend systems.',
      requestDataFlow: 'Editors managed structured content through Decap CMS; frontend applications transformed and delivered that content to public users.',
      decisions: 'Framework migration, code splitting, lazy loading, frontend optimisation, and content-model refactoring addressed maintainability, delivery, and performance together.',
      tradeOffs: 'Incremental modernisation preserved ongoing publishing while requiring old and new application structures to coexist during migration.',
      reliabilitySecurityAccessibility: 'The work contributed to WCAG 2.1 AA across the approved frontend contribution scope.',
      outcome: 'The work migrated three legacy applications, reduced initial load times by 30%, and reduced editorial workflow time by more than 50%.',
      evidence: 'Approved portfolio brief for the Tactical Tech role and contribution scope.',
    },
  },
  {
    slug: 'web-crawler-dashboard',
    title: 'Web Crawler Dashboard',
    summary: 'A React/TypeScript dashboard backed by Go/Gin and MySQL for URL analysis, crawl lifecycle management, search, filters, and bulk actions.',
    visibility: 'public',
    status: 'published',
    capabilities: ['Frontend product UI', 'API integration', 'Data lifecycle'],
    stack: ['React', 'TypeScript', 'Go', 'Gin', 'GORM', 'MySQL', 'Docker'],
    outcomes: [
      { value: 'Authenticated', label: 'Crawl-management workflow', context: 'Search, filters, bulk actions, and lifecycle state.' },
      { value: 'Automated', label: 'Frontend tests', context: 'Public project delivery evidence.' },
    ],
    evidenceRefs: ['approved-web-crawler'],
    architecture: {
      nodes: [
        { id: 'authenticated-user', label: 'Authenticated user', kind: 'source' },
        { id: 'react-dashboard', label: 'React dashboard', kind: 'interface', detail: 'Search, filters, bulk actions, and lifecycle state.' },
        { id: 'gin-api', label: 'Go / Gin API', kind: 'boundary', detail: 'JWT-protected REST boundary.' },
        { id: 'crawl-lifecycle', label: 'Crawl lifecycle', kind: 'service', detail: 'URL analysis and explicit crawl states.' },
        { id: 'gorm', label: 'GORM', kind: 'data' },
        { id: 'mysql', label: 'MySQL', kind: 'data' },
      ],
      edges: [
        { source: 'authenticated-user', target: 'react-dashboard' },
        { source: 'react-dashboard', target: 'gin-api', label: 'authenticated actions' },
        { source: 'gin-api', target: 'crawl-lifecycle' },
        { source: 'crawl-lifecycle', target: 'gorm' },
        { source: 'gorm', target: 'mysql' },
        { source: 'crawl-lifecycle', target: 'react-dashboard', label: 'updated status' },
      ],
    },
    sections: {
      context: 'URL analysis produces records that need to be searched, filtered, monitored, and managed through a clear lifecycle.',
      problem: 'Provide an authenticated interface for starting and managing crawl work without losing visibility into record state or bulk operations.',
      constraints: 'The public evidence supports the application architecture and feature set, not production scale or traffic claims.',
      role: 'Implemented the React/TypeScript frontend and Go/Gin backend integration represented in the public project.',
      architecture: 'A React/TypeScript dashboard communicates with a Go/Gin REST API. GORM maps application data to MySQL, with JWT authentication at the API boundary.',
      requestDataFlow: 'Authenticated actions move from dashboard controls to API handlers and persisted crawl records; updated status is returned to searchable and filterable views.',
      decisions: 'Explicit crawl states, bulk actions, search, and filters make long-running URL analysis manageable from one dashboard.',
      tradeOffs: 'A separate Go API and React client require two delivery surfaces but keep UI state and backend persistence responsibilities clear.',
      reliabilitySecurityAccessibility: 'JWT authentication and a defined crawl-status lifecycle are supported by the public implementation.',
      testingDelivery: 'The project includes Docker setup and automated frontend tests.',
      outcome: 'The application supports authenticated URL analysis, search, filters, bulk actions, and crawl lifecycle management.',
      evidence: 'The public Web Crawler Dashboard repository contains the application implementation.',
    },
  },
];

const stalePublicCopy = /\b(?:under review|follow later|return later|not publicly documented|details? (?:are|is) (?:omitted|unavailable))\b/i;

export function validateCaseStudies(items: readonly CaseStudy[] = caseStudies) {
  const slugs = new Set<string>();
  const evidence = new Set(
    portfolioContent.evidence
      .filter(({ status }) => status !== 'needs-review')
      .map(({ id }) => id),
  );

  for (const item of items) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug) || slugs.has(item.slug)) {
      throw new Error(`Invalid or duplicate case-study slug: ${item.slug}`);
    }
    slugs.add(item.slug);

    if (!item.title || !item.summary || item.stack.length === 0 || item.capabilities.length === 0) {
      throw new Error(`Incomplete case study: ${item.slug}`);
    }
    if (!requiredCaseStudySectionKeys.every((key) => item.sections[key]?.trim())) {
      throw new Error(`Missing required case-study section in ${item.slug}`);
    }
    if (item.sections.nextImprovements !== undefined && !item.sections.nextImprovements.trim()) {
      throw new Error(`Empty next-improvements section in ${item.slug}`);
    }
    if (!item.evidenceRefs.every((id) => evidence.has(id))) {
      throw new Error(`Unapproved evidence in ${item.slug}`);
    }

    const nodeIds = new Set<string>();
    for (const node of item.architecture.nodes) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(node.id) || nodeIds.has(node.id)) {
        throw new Error(`Invalid or duplicate architecture node "${node.id}" in ${item.slug}`);
      }
      nodeIds.add(node.id);
    }
    if (nodeIds.size < 3) throw new Error(`Incomplete architecture in ${item.slug}`);
    for (const edge of item.architecture.edges) {
      if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
        throw new Error(`Dangling architecture edge "${edge.source}" → "${edge.target}" in ${item.slug}`);
      }
    }

    const publicCopy = JSON.stringify(item);
    if (stalePublicCopy.test(publicCopy)) {
      throw new Error(`Stale incomplete-work copy in ${item.slug}`);
    }
  }

  return items;
}

validateCaseStudies();
