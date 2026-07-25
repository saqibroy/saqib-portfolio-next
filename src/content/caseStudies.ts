import { portfolioContent } from './portfolio';

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

export type ArchitectureDefinition = {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
};

export type CaseStudyDecision = {
  title: string;
  reason: string;
  tradeoff: string;
};

export type CaseStudyEvidence = {
  evidenceId: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  visibility: CaseStudyVisibility;
  role: string;
  result: string;
  stack: string[];
  visual: ArchitectureDefinition;
  system: string;
  decisions: CaseStudyDecision[];
  outcomes: CaseStudyOutcome[];
  evidence: CaseStudyEvidence;
  evidenceBoundary?: string;
  nextImprovement?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ai-assisted-contract-workflow',
    title: 'AI-Assisted Contract Workflow',
    summary: 'A redacted product workflow connecting a React and TypeScript contract editor, Django application APIs, a FastAPI AI service, and Stripe purchase controls.',
    visibility: 'private-redacted',
    role: 'Designed the application flow and service integration; delivered across the editor, Django backend, FastAPI service, and production integration.',
    result: 'Connected structured input, contract editing, AI-assisted content population, payment, and controlled document access.',
    stack: ['React', 'TypeScript', 'Django', 'FastAPI', 'RAG', 'Stripe'],
    visual: {
      nodes: [
        { id: 'structured-input', label: 'Structured input', kind: 'source', detail: 'Values collected through the conversational workflow.' },
        { id: 'react-editor', label: 'React editor', kind: 'interface', detail: 'Merge fields, inline options, and conditional clauses.' },
        { id: 'django-api', label: 'Django APIs', kind: 'boundary', detail: 'Application state and integration boundary.' },
        { id: 'fastapi-ai', label: 'FastAPI AI service', kind: 'service', detail: 'LLM inference and vector retrieval.' },
        { id: 'contract-content', label: 'Structured document update', kind: 'data', detail: 'Controlled contract content is populated from structured values.' },
        { id: 'stripe-webhooks', label: 'Stripe', kind: 'service', detail: 'Purchasing lifecycle integration.' },
        { id: 'document-access', label: 'Document access', kind: 'delivery', detail: 'Purchase state controls document access.' },
      ],
      edges: [
        { source: 'structured-input', target: 'react-editor' },
        { source: 'react-editor', target: 'django-api', label: 'validated request' },
        { source: 'django-api', target: 'fastapi-ai', label: 'service request' },
        { source: 'fastapi-ai', target: 'contract-content', label: 'structured update' },
        { source: 'contract-content', target: 'react-editor', label: 'populate editor' },
        { source: 'django-api', target: 'stripe-webhooks', label: 'purchase state' },
        { source: 'stripe-webhooks', target: 'document-access' },
      ],
    },
    system: 'Structured values move from the browser editor through Django APIs to a separate FastAPI service for LLM inference and vector retrieval. The resulting document update returns to the editor as controlled product state. Stripe webhooks remain a secondary application branch for purchasing and document access, rather than becoming part of the editor interaction.',
    decisions: [
      {
        title: 'Separate the AI service',
        reason: 'Kept inference and retrieval behind an explicit service boundary instead of coupling them to the editor.',
        tradeoff: 'Added an integration boundary to maintain.',
      },
      {
        title: 'Keep application state in Django',
        reason: 'Made the browser workflow and payment lifecycle accountable to the application backend.',
        tradeoff: 'The service call must be coordinated through the backend.',
      },
    ],
    outcomes: [{ value: 'End to end', label: 'Product workflow', context: 'Editor, backend, AI service, payment, and controlled access.' }],
    evidence: { evidenceId: 'approved-velsa', label: 'Approved portfolio brief' },
    evidenceBoundary: 'Private system boundaries only; customer, document, prompt, model, and infrastructure details remain confidential.',
  },
  {
    slug: 'jobs-tracker-bot',
    title: 'Jobs Tracker Bot',
    summary: 'An async Python job-aggregation pipeline with provider adapters, deterministic eligibility rules, scoring, deduplication, persistence, and alert routing.',
    visibility: 'public',
    role: 'Designed and implemented the aggregation, filtering, scoring, persistence, notification, scheduling, health, concurrency, and delivery pipeline.',
    result: 'Turns heterogeneous provider data into deterministic, deduplicated immediate and digest alerts.',
    stack: ['Python', 'Docker', 'GitHub Actions', 'Discord', 'Telegram'],
    visual: {
      nodes: [
        { id: 'ats-adapters', label: 'ATS adapters', kind: 'source', detail: 'Async source-specific acquisition.' },
        { id: 'provider-adapters', label: 'Provider adapters', kind: 'source', detail: 'Source behaviour remains behind adapter boundaries.' },
        { id: 'normalisation', label: 'Normalisation', kind: 'boundary', detail: 'Provider payloads become a consistent job model.' },
        { id: 'filters', label: 'Eligibility rules', kind: 'decision', detail: 'Explicit rules run before scoring.' },
        { id: 'cv-fit', label: 'Fit score', kind: 'decision', detail: 'Role relevance remains a separate dimension.' },
        { id: 'deduplication', label: 'Deduplication', kind: 'service', detail: 'Previously processed roles are identified.' },
        { id: 'persistence', label: 'Persistence', kind: 'data', detail: 'Decisions and notification state survive scheduled runs.' },
        { id: 'immediate-alerts', label: 'Immediate alerts', kind: 'delivery', detail: 'New high-priority matches route immediately.' },
        { id: 'digest-alerts', label: 'Digest alerts', kind: 'delivery', detail: 'Eligible matches can be grouped for digest delivery.' },
      ],
      edges: [
        { source: 'ats-adapters', target: 'normalisation' },
        { source: 'provider-adapters', target: 'normalisation' },
        { source: 'normalisation', target: 'filters' },
        { source: 'filters', target: 'cv-fit' },
        { source: 'cv-fit', target: 'deduplication' },
        { source: 'deduplication', target: 'persistence' },
        { source: 'persistence', target: 'immediate-alerts' },
        { source: 'persistence', target: 'digest-alerts' },
      ],
    },
    system: 'Async ATS and provider adapters feed one normalised job model. Deterministic eligibility rules run before a separate fit score, then deduplication and persistence prevent repeated notifications. New matching roles route to immediate or digest Discord and Telegram adapters. The explicit stages make source changes and ranking decisions easier to isolate and test.',
    decisions: [
      {
        title: 'Isolate source adapters',
        reason: 'Kept provider-specific acquisition behaviour outside the shared pipeline.',
        tradeoff: 'Each source needs its own adapter maintenance.',
      },
      {
        title: 'Keep eligibility and fit separate',
        reason: 'Made location suitability and role relevance reviewable as distinct decisions.',
        tradeoff: 'Requires more pipeline stages than one combined score.',
      },
      {
        title: 'Persist before alerting',
        reason: 'Prevents duplicate alerts across scheduled runs.',
        tradeoff: 'Introduces stored notification state to manage.',
      },
    ],
    outcomes: [
      { value: '520+', label: 'Automated tests', context: 'Pipeline and adapter coverage.' },
      { value: 'Docker', label: 'Containerised delivery' },
      { value: 'GitHub Actions', label: 'Scheduled delivery' },
    ],
    evidence: { evidenceId: 'approved-jobs-tracker', label: 'Public repository' },
    nextImprovement: 'Add new providers only when their schemas and alert value justify another maintained adapter.',
  },
  {
    slug: 'tactical-tech-platform-modernisation',
    title: 'Tactical Tech Platform Modernisation',
    summary: 'Frontend delivery and modernisation across public-facing platforms for research, education, and civil-society audiences.',
    visibility: 'private-redacted',
    role: 'As Front-End Developer, owned frontend delivery and modernisation decisions across 5+ public-facing platforms and partnered with product, design, research, and editorial teams.',
    result: 'Migrated three legacy applications while improving initial loads and editorial workflows.',
    stack: ['React', 'Vue.js', 'Next.js', 'Nuxt.js', 'TypeScript', 'Decap CMS'],
    visual: {
      nodes: [
        { id: 'editorial-content', label: 'Editorial content', kind: 'source' },
        { id: 'decap-cms', label: 'Decap CMS', kind: 'interface', detail: 'Structured editorial workflows.' },
        { id: 'content-model', label: 'Refactored content model', kind: 'data', detail: 'Content structures shared by frontend applications.' },
        { id: 'applications', label: 'Next.js / Nuxt.js apps', kind: 'service', detail: 'Modernised frontend applications.' },
        { id: 'optimised-delivery', label: 'Accessible delivery', kind: 'boundary', detail: 'Code splitting, lazy loading, and frontend optimisation.' },
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
    system: 'Editors worked through Decap CMS and a refactored content model, while legacy applications moved incrementally to Next.js and Nuxt.js. Code splitting, lazy loading, and frontend optimisation improved delivery without interrupting publishing. The public account describes Saqib’s approved contribution scope, not organisation-wide reach or sole ownership.',
    decisions: [
      {
        title: 'Migrate incrementally',
        reason: 'Allowed publishing to continue while legacy applications moved to modern frameworks.',
        tradeoff: 'Old and new application structures coexisted during migration.',
      },
      {
        title: 'Refactor the CMS model',
        reason: 'Addressed repeated editorial work at the content boundary instead of only in the frontend.',
        tradeoff: 'Required coordinated changes across content and application structures.',
      },
      {
        title: 'Optimise the delivery path',
        reason: 'Applied code splitting and lazy loading where they improved initial loading.',
        tradeoff: 'Introduced more intentional loading boundaries.',
      },
    ],
    outcomes: [
      { value: '3', label: 'Legacy applications migrated' },
      { value: '30%', label: 'Faster initial loads', context: 'Code splitting, lazy loading, and frontend optimisation.' },
      { value: '50%+', label: 'Faster editorial workflows', context: 'Refactored Decap CMS content architecture.' },
    ],
    evidence: { evidenceId: 'approved-tactical-tech', label: 'Approved portfolio brief' },
    evidenceBoundary: 'Approved contribution scope only; it does not attribute organisation-wide reach or sole ownership.',
  },
  {
    slug: 'web-crawler-dashboard',
    title: 'Web Crawler Dashboard',
    summary: 'A React and TypeScript dashboard backed by Go, Gin, and MySQL for URL analysis, crawl lifecycle management, search, filters, and bulk actions.',
    visibility: 'public',
    role: 'Implemented the React and TypeScript frontend and Go/Gin backend integration represented in the public project.',
    result: 'Provides authenticated URL analysis and crawl management with clear lifecycle state.',
    stack: ['React', 'TypeScript', 'Go', 'Gin', 'GORM', 'MySQL', 'Docker'],
    visual: {
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
    system: 'An authenticated React dashboard sends crawl-management actions to a Go and Gin REST API. The API owns URL analysis and an explicit crawl lifecycle, while GORM persists records in MySQL. Updated state returns to the dashboard for searchable, filterable, and bulk-managed views.',
    decisions: [
      {
        title: 'Use explicit crawl states',
        reason: 'Kept long-running URL analysis visible in the management interface.',
        tradeoff: 'Lifecycle transitions need clear backend rules.',
      },
      {
        title: 'Separate dashboard and API',
        reason: 'Kept interface state and persistence responsibilities clear.',
        tradeoff: 'Created two delivery surfaces to coordinate.',
      },
    ],
    outcomes: [
      { value: 'Authenticated', label: 'Crawl-management workflow' },
      { value: 'Automated', label: 'Frontend tests' },
    ],
    evidence: { evidenceId: 'approved-web-crawler', label: 'Public repository' },
    nextImprovement: 'Continue validating new workflow features against the public implementation rather than inferring production-scale claims.',
  },
];

const stalePublicCopy = /\b(?:under review|follow later|return later|not publicly documented|details? (?:are|is) (?:omitted|unavailable)|engineering dossier|published status)\b/i;

function wordCount(value: string) {
  return value.match(/\b[\p{L}\p{N}][\p{L}\p{N}'’-]*\b/gu)?.length ?? 0;
}

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

    if (!item.title || !item.summary || !item.role || !item.result || item.stack.length === 0) {
      throw new Error(`Incomplete case study: ${item.slug}`);
    }
    if (wordCount(item.system) > 180) throw new Error(`System description exceeds 180 words: ${item.slug}`);
    if (item.decisions.length < 2 || item.decisions.length > 4 || item.decisions.some(({ title, reason, tradeoff }) => !title || !reason || !tradeoff)) {
      throw new Error(`Case study must have 2–4 complete decisions: ${item.slug}`);
    }
    if (item.outcomes.length === 0 || !evidence.has(item.evidence.evidenceId) || !item.evidence.label) {
      throw new Error(`Invalid outcome or evidence in ${item.slug}`);
    }
    if (item.nextImprovement !== undefined && !item.nextImprovement.trim()) {
      throw new Error(`Empty next improvement in ${item.slug}`);
    }

    const nodeIds = new Set<string>();
    for (const node of item.visual.nodes) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(node.id) || nodeIds.has(node.id)) {
        throw new Error(`Invalid or duplicate architecture node "${node.id}" in ${item.slug}`);
      }
      nodeIds.add(node.id);
    }
    if (nodeIds.size < 3) throw new Error(`Incomplete architecture in ${item.slug}`);
    for (const edge of item.visual.edges) {
      if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
        throw new Error(`Dangling architecture edge "${edge.source}" → "${edge.target}" in ${item.slug}`);
      }
    }

    if (stalePublicCopy.test(JSON.stringify(item))) {
      throw new Error(`Stale template copy in ${item.slug}`);
    }
  }

  return items;
}

validateCaseStudies();
