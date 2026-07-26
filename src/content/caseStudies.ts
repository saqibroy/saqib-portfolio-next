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
  relatedEvidenceIds?: string[];
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
    summary: 'A redacted workflow where a React chatbot gathers missing contract details, creates or updates a Django editing session, and opens the generated contract in a React configurator.',
    visibility: 'private-redacted',
    role: 'Designed and delivered the contract configurator, conversational assistant, Django integration, FastAPI service, and production flow.',
    result: 'The assistant created or updated editing sessions, then returned generated contracts to the configurator with editable values populated.',
    stack: ['React', 'TypeScript', 'Django', 'FastAPI', 'RAG', 'Stripe'],
    visual: {
      nodes: [
        { id: 'contract-user', label: 'Contract user', kind: 'source', detail: 'Uses the conversational assistant and contract configurator.' },
        { id: 'react-chatbot', label: 'React chatbot', kind: 'interface', detail: 'A conversational app exported through the same public-site framework as the configurator.' },
        { id: 'react-configurator', label: 'React configurator', kind: 'interface', detail: 'An editable contract app exported through the same public-site framework.' },
        { id: 'django-application', label: 'Django application', kind: 'service', detail: 'Shared contract data, editing sessions, and application integration.' },
        { id: 'editing-sessions', label: 'Editing sessions', kind: 'data', detail: 'Persisted contract state created or updated from structured assistant output.' },
        { id: 'fastapi-ai', label: 'FastAPI AI service', kind: 'service', detail: 'Multi-step LLM flow that receives chatbot context and creates or updates Django-backed editing sessions.' },
        { id: 'stripe', label: 'Stripe', kind: 'delivery', detail: 'Purchase and controlled-access events reach the Django application by webhook.' },
      ],
      edges: [
        { source: 'contract-user', target: 'react-chatbot', label: 'converses' },
        { source: 'react-chatbot', target: 'fastapi-ai', label: 'conversation + edit URL' },
        { source: 'fastapi-ai', target: 'django-application', label: 'creates / updates' },
        { source: 'react-configurator', target: 'django-application', label: 'reads and writes' },
        { source: 'django-application', target: 'editing-sessions', label: 'persists' },
        { source: 'react-chatbot', target: 'react-configurator', label: 'opens edit URL' },
        { source: 'stripe', target: 'django-application', label: 'webhook' },
      ],
    },
    system: 'Two React applications were exported through the same public-site framework and shared Django-backed contract data. The chatbot passed conversation context to a multi-step FastAPI LLM service, which created or updated an editing session through Django. The resulting edit URL opened the React configurator with editable values populated. Stripe purchase and controlled-access events reached Django through a webhook.',
    decisions: [
      {
        title: 'Separate the assistant from the configurator',
        reason: 'Allowed the conversational workflow to gather missing information before users entered the editable contract experience.',
        tradeoff: 'Added an integration boundary to maintain.',
      },
      {
        title: 'Keep editing sessions in Django',
        reason: 'Gave both React applications one shared contract state before the generated contract opened in the configurator.',
        tradeoff: 'Assistant output had to be coordinated through the application backend.',
      },
    ],
    outcomes: [{ value: 'End to end', label: 'Product workflow', context: 'Chatbot, backend editing session, generated contract, configurator, payment, and controlled access.' }],
    evidence: { evidenceId: 'approved-velsa', label: 'Approved portfolio brief' },
    evidenceBoundary: 'Private system boundaries only; customer, document, prompt, model, and infrastructure details remain confidential.',
  },
  {
    slug: 'jobs-tracker-bot',
    title: 'Jobs Tracker Bot',
    summary: 'An async Python bot that reads ATS, employer, and curated job feeds, applies hard eligibility and fit checks, persists deduplicated matches in SQLite, and routes immediate or digest alerts to Discord and Telegram.',
    visibility: 'public',
    role: 'Designed and implemented the aggregation, filtering, scoring, persistence, notification, scheduling, health, concurrency, and delivery pipeline.',
    result: 'Turns heterogeneous job feeds into deterministic, SQLite-deduplicated immediate, digest, and diagnostic outcomes.',
    stack: ['Python', 'SQLite', 'Docker', 'GitHub Actions', 'Discord', 'Telegram'],
    visual: {
      nodes: [
        { id: 'ats-boards', label: 'ATS and employer boards', kind: 'source', detail: 'Direct employer feeds such as Greenhouse, Ashby, Personio, Lever, Workable, and JSON-LD career pages.' },
        { id: 'curated-feeds', label: 'Curated job feeds', kind: 'source', detail: 'Configured secondary sources supplement direct employer boards.' },
        { id: 'scan-scheduler', label: 'Async scan scheduler', kind: 'service', detail: 'APScheduler starts scans and periodic operational tasks.' },
        { id: 'source-adapters', label: 'Source adapters', kind: 'service', detail: 'Async provider-specific acquisition is isolated from the shared pipeline.' },
        { id: 'filter-score', label: 'Eligibility and scoring', kind: 'service', detail: 'Hard eligibility, role, stack, language, recency, NGO classification, and match scoring.' },
        { id: 'sqlite-store', label: 'SQLite job store', kind: 'data', detail: 'URL/content deduplication, jobs, and notification state persist across scans.' },
        { id: 'alert-router', label: 'Alert router', kind: 'service', detail: 'Routes immediate, digest, and diagnostic tiers.' },
        { id: 'notification-channels', label: 'Discord and Telegram', kind: 'delivery', detail: 'Immediate alerts and digest delivery channels.' },
      ],
      edges: [
        { source: 'scan-scheduler', target: 'source-adapters', label: 'runs scans' },
        { source: 'ats-boards', target: 'source-adapters', label: 'job data' },
        { source: 'curated-feeds', target: 'source-adapters', label: 'job data' },
        { source: 'source-adapters', target: 'filter-score', label: 'normalised jobs' },
        { source: 'filter-score', target: 'sqlite-store', label: 'accepted jobs' },
        { source: 'sqlite-store', target: 'alert-router', label: 'new match tiers' },
        { source: 'alert-router', target: 'notification-channels', label: 'alerts and digests' },
      ],
    },
    system: 'Async adapters read direct employer ATS boards and curated job feeds. Hard Germany/Berlin eligibility, role, stack, language, and recency filters run before NGO classification and match scoring. SQLite stores accepted jobs and uses URL and content hashes to prevent duplicates across scans. Strong matches notify Discord and Telegram immediately; the next tier enters a six-hour digest, while low matches remain diagnostic. Scheduling, health checks, and source concurrency remain operational concerns around this core pipeline.',
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
      { value: 'GitHub Actions', label: 'CI and deployment' },
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
        { id: 'editors', label: 'Editors', kind: 'source', detail: 'Editorial users manage public content.' },
        { id: 'decap-cms', label: 'Decap CMS', kind: 'interface', detail: 'Git-backed editorial interface.' },
        { id: 'git-content', label: 'Git-backed content', kind: 'data', detail: 'Markdown and frontmatter form the shared source material.' },
        { id: 'content-api', label: 'REST Content API', kind: 'service', detail: 'Project namespaces expose content and search queries.' },
        { id: 'public-sites', label: 'Next.js and Nuxt.js sites', kind: 'service', detail: 'Public applications consume shared content.' },
        { id: 'central-search', label: 'Central search', kind: 'service', detail: 'Queries selected API namespaces.' },
        { id: 'visitors', label: 'Visitors', kind: 'delivery', detail: 'Use public sites and search to reach project content.' },
      ],
      edges: [
        { source: 'editors', target: 'decap-cms', label: 'manages' },
        { source: 'decap-cms', target: 'git-content', label: 'commits' },
        { source: 'git-content', target: 'content-api', label: 'serves' },
        { source: 'content-api', target: 'public-sites', label: 'content queries' },
        { source: 'content-api', target: 'central-search', label: 'search queries' },
        { source: 'public-sites', target: 'visitors', label: 'public content' },
        { source: 'central-search', target: 'visitors', label: 'search results' },
      ],
    },
    system: 'The audited repositories show an editorial workflow where Git-backed CMS changes become content files for a REST Content API. Next.js consumers read those project namespaces, while a central search interface queries the same API and returns visitors to project content. This diagram shows an implementation pattern found in the repositories; it does not assign ownership of every system component or make operational claims.',
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
    evidence: { evidenceId: 'approved-tactical-tech', label: 'Approved portfolio brief', relatedEvidenceIds: ['publicly-verified-tactical-content-system'] },
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
    if (item.outcomes.length === 0 || !evidence.has(item.evidence.evidenceId) || !item.evidence.label || item.evidence.relatedEvidenceIds?.some((evidenceId) => !evidence.has(evidenceId))) {
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
