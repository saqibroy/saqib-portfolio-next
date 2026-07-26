export type ClaimStatus = 'approved' | 'publicly-verified' | 'needs-review';

export type EvidenceRef = {
  id: string;
  status: ClaimStatus;
  source: string;
  description: string;
  url?: string;
};

export type Metric = {
  id: string;
  value: string;
  label: string;
  context: string;
  evidenceIds: string[];
};

export type Role = {
  id: string;
  title: string;
  company: string;
  location: string;
  employmentType: 'Full-time' | 'Working student' | 'Freelance';
  startDate: string;
  endDate: string;
  technologies: string[];
  highlights: string[];
  evidenceIds: string[];
};

export type Education = {
  id: string;
  credential: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  details: string;
  evidenceIds: string[];
};

export type Capability = {
  id: string;
  title: string;
  description: string;
  evidenceIds: string[];
  relatedProjectSlugs: string[];
  relatedRoleIds: string[];
};

export type ProjectVisibility = 'public' | 'private-redacted' | 'gated';

export type ProjectSummary = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  visibility: ProjectVisibility;
  technologies: string[];
  repositoryUrl?: string;
  evidenceIds: string[];
};

const evidence: EvidenceRef[] = [
  {
    id: 'approved-profile',
    status: 'approved',
    source: 'Approved portfolio brief',
    description: 'Profile, positioning, skills, education, and language facts.',
  },
  {
    id: 'approved-products-platforms',
    status: 'approved',
    source: 'User-approved Phase 11 portfolio brief',
    description: 'Seven or more products and platforms across verified professional and public-project work.',
  },
  {
    id: 'approved-velsa',
    status: 'approved',
    source: 'Approved portfolio brief',
    description: 'Velsa Technologies role, dates, workflow, and integration facts.',
  },
  {
    id: 'approved-tactical-tech',
    status: 'approved',
    source: 'Approved portfolio brief',
    description: 'Tactical Tech title, modernisation work, outcomes, and contribution wording.',
  },
  {
    id: 'publicly-verified-tactical-content-system',
    status: 'publicly-verified',
    source: 'Phase 13 Tactical Tech local repository audit',
    description: 'Git-backed editorial content is transformed for a REST Content API consumed by project sites; the central search interface queries configured API namespaces.',
  },
  {
    id: 'approved-earlier-roles',
    status: 'approved',
    source: 'Approved ATS CV',
    description: 'Non-conflicting earlier employment facts and historical titles.',
  },
  {
    id: 'approved-jobs-tracker',
    status: 'approved',
    source: 'Approved portfolio brief',
    description: 'Jobs Tracker Bot architecture and delivery facts.',
    url: 'https://github.com/saqibroy/jobs-tracker-bot',
  },
  {
    id: 'approved-web-crawler',
    status: 'approved',
    source: 'Approved portfolio brief',
    description: 'Web Crawler Dashboard architecture and feature facts.',
    url: 'https://github.com/saqibroy/web-crawler-dashboard',
  },
  {
    id: 'approved-accessibility-microservice',
    status: 'approved',
    source: 'Approved portfolio brief',
    description: 'Accessibility Microservice capabilities; public URL scanning remains gated.',
    url: 'https://github.com/saqibroy/accessibility-check-microservice',
  },
];

const metrics: Metric[] = [
  {
    id: 'experience-years',
    value: '8+',
    label: 'years in software engineering',
    context: 'Senior frontend-leaning full-stack engineering experience.',
    evidenceIds: ['approved-profile'],
  },
  {
    id: 'products-platforms',
    value: '7+',
    label: 'products & platforms',
    context: 'Verified professional and public-project work.',
    evidenceIds: ['approved-products-platforms'],
  },
  {
    id: 'tactical-platforms',
    value: '5+',
    label: 'public-facing platforms',
    context: 'Frontend delivery and modernisation at Tactical Tech.',
    evidenceIds: ['approved-tactical-tech'],
  },
  {
    id: 'initial-load-improvement',
    value: '30%',
    label: 'faster initial loads',
    context: 'Through code splitting, lazy loading, and frontend optimisation at Tactical Tech.',
    evidenceIds: ['approved-tactical-tech'],
  },
  {
    id: 'editorial-workflow-improvement',
    value: '50%+',
    label: 'faster editorial workflows',
    context: 'After refactoring Decap CMS content architecture at Tactical Tech.',
    evidenceIds: ['approved-tactical-tech'],
  },
];

const roles: Role[] = [
  {
    id: 'velsa-technologies',
    title: 'Senior Full-Stack Engineer',
    company: 'Velsa Technologies',
    location: 'Berlin, Germany',
    employmentType: 'Full-time',
    startDate: '2025-08',
    endDate: '2026-05',
    technologies: ['React', 'TypeScript', 'Django', 'FastAPI', 'LLM integration', 'RAG', 'Stripe'],
    highlights: [
      'Designed the application flow and service integration for a React contract configurator and conversational assistant sharing Django-backed contract data.',
      'Owned end-to-end delivery across both React applications, the Django backend, FastAPI AI service, and production integration.',
      'Built a browser-based contract editor with merge fields, inline option controls, and conditional clauses.',
      'Developed a conversational workflow that gathered missing information, created or updated editing sessions, and opened generated contracts in the configurator.',
      'Designed and deployed a FastAPI service integrating LLM inference and vector retrieval with Django.',
      'Integrated Stripe payments and webhooks for purchasing and controlled document access.',
    ],
    evidenceIds: ['approved-velsa'],
  },
  {
    id: 'tactical-tech',
    title: 'Front-End Developer',
    company: 'Tactical Tech',
    location: 'Berlin, Germany (remote)',
    employmentType: 'Full-time',
    startDate: '2019-08',
    endDate: '2025-04',
    technologies: ['React', 'Vue.js', 'Next.js', 'Nuxt.js', 'TypeScript', 'Decap CMS', 'WCAG 2.1'],
    highlights: [
      'Owned frontend delivery and modernisation decisions across 5+ public-facing platforms for researchers, educators, international users, and civil-society organisations.',
      'Migrated 3 legacy applications to Next.js and Nuxt.js, reducing initial load times by 30% through code splitting, lazy loading, and frontend optimisation.',
      'Refactored Decap CMS content architecture, reducing editorial workflow time by more than 50%.',
      'Partnered with product, design, research, and editorial teams on accessible, maintainable frontend systems and contributed to WCAG 2.1 AA.',
    ],
    evidenceIds: ['approved-tactical-tech'],
  },
  {
    id: 'durch-die-stadt',
    title: 'Full-Stack Developer',
    company: 'Durch die Stadt GmbH',
    location: 'Berlin, Germany',
    employmentType: 'Working student',
    startDate: '2018-06',
    endDate: '2019-08',
    technologies: ['Ruby on Rails', 'Vue.js', 'Nuxt.js', 'PostgreSQL', 'Mapbox'],
    highlights: [
      'Designed REST APIs in Ruby on Rails and integrated them with Vue.js and Nuxt.js frontends using Vuex state management.',
      'Built modular responsive UI components with Bulma CSS and BEM methodology.',
      'Developed 360-degree city and retail exploration portals using Mapbox, Leaflet, and KRPano.',
    ],
    evidenceIds: ['approved-earlier-roles'],
  },
  {
    id: 'turboad',
    title: 'PHP Developer',
    company: 'TurboAd GmbH',
    location: 'Berlin, Germany',
    employmentType: 'Working student',
    startDate: '2018-01',
    endDate: '2018-05',
    technologies: ['Symfony 3', 'PHP 7', 'PHPUnit', 'Doctrine ORM', 'MySQL'],
    highlights: [
      'Built web applications with Symfony 3 and Doctrine ORM for relational data modelling and query optimisation.',
      'Improved code reliability through test-driven development with PHPUnit on critical application paths.',
    ],
    evidenceIds: ['approved-earlier-roles'],
  },
  {
    id: 'octasolutions',
    title: 'Ruby on Rails Developer',
    company: 'Octasolutions',
    location: 'Gujranwala, Pakistan',
    employmentType: 'Freelance',
    startDate: '2016-01',
    endDate: '2016-11',
    technologies: ['Ruby on Rails', 'MySQL', 'JavaScript', 'Bootstrap'],
    highlights: [
      'Built full-stack web applications with admin dashboards, role-based authentication, and responsive frontends.',
    ],
    evidenceIds: ['approved-earlier-roles'],
  },
];

const education: Education[] = [
  {
    id: 'tu-berlin-coursework',
    credential: 'Graduate coursework in Computer Science',
    institution: 'Technische Universität Berlin',
    location: 'Berlin, Germany',
    startDate: '2017-04',
    endDate: '2020-12',
    details: 'Machine Learning, Database Systems, Computer Graphics, and Advanced Web Development.',
    evidenceIds: ['approved-profile'],
  },
  {
    id: 'gift-bsc',
    credential: 'B.Sc. Computer Science',
    institution: 'GIFT University',
    location: 'Gujranwala, Pakistan',
    startDate: '2011-09',
    endDate: '2015-10',
    details: 'Object-Oriented Programming, Data Structures, Database Systems, Web Programming, and Software Engineering.',
    evidenceIds: ['approved-profile'],
  },
];

const projects: ProjectSummary[] = [
  {
    id: 'ai-assisted-contract-workflow',
    slug: 'ai-assisted-contract-workflow',
    title: 'AI-Assisted Contract Workflow',
    summary: 'A private, redacted workflow where a React chatbot gathers missing contract details, creates or updates a Django editing session, and opens the generated contract in a React configurator.',
    visibility: 'private-redacted',
    technologies: ['React', 'TypeScript', 'Django', 'FastAPI', 'LLM integration', 'RAG', 'Stripe'],
    evidenceIds: ['approved-velsa'],
  },
  {
    id: 'jobs-tracker-bot',
    slug: 'jobs-tracker-bot',
    title: 'Jobs Tracker Bot',
    summary: 'An async Python bot that reads ATS, employer, and curated job feeds, applies hard eligibility and fit checks, persists deduplicated matches in SQLite, and routes immediate or digest alerts to Discord and Telegram.',
    visibility: 'public',
    technologies: ['Python', 'Docker', 'GitHub Actions', 'Discord', 'Telegram'],
    repositoryUrl: 'https://github.com/saqibroy/jobs-tracker-bot',
    evidenceIds: ['approved-jobs-tracker'],
  },
  {
    id: 'tactical-tech-modernisation',
    slug: 'tactical-tech-platform-modernisation',
    title: 'Tactical Tech Platform Modernisation',
    summary: 'Frontend delivery and modernisation across public-facing platforms, including Next.js/Nuxt.js migrations, performance work, and CMS content architecture.',
    visibility: 'private-redacted',
    technologies: ['React', 'Vue.js', 'Next.js', 'Nuxt.js', 'TypeScript', 'Decap CMS'],
    evidenceIds: ['approved-tactical-tech'],
  },
  {
    id: 'web-crawler-dashboard',
    slug: 'web-crawler-dashboard',
    title: 'Web Crawler Dashboard',
    summary: 'A React/TypeScript dashboard backed by Go/Gin and MySQL for URL analysis, crawl lifecycle management, search, filters, and bulk actions.',
    visibility: 'public',
    technologies: ['React', 'TypeScript', 'Go', 'Gin', 'GORM', 'MySQL', 'Docker'],
    repositoryUrl: 'https://github.com/saqibroy/web-crawler-dashboard',
    evidenceIds: ['approved-web-crawler'],
  },
  {
    id: 'accessibility-analysis-platform',
    slug: 'accessibility-analysis-platform',
    title: 'Accessibility Analysis Platform',
    summary: 'A Node/Express service using axe-core and JSDOM for static WCAG 2.1 A/AA analysis.',
    visibility: 'gated',
    technologies: ['Node.js', 'Express', 'axe-core', 'JSDOM'],
    repositoryUrl: 'https://github.com/saqibroy/accessibility-check-microservice',
    evidenceIds: ['approved-accessibility-microservice'],
  },
];

const capabilities: Capability[] = [
  {
    id: 'product-frontend-architecture',
    title: 'Product frontend architecture',
    description: 'React, Next.js, TypeScript, Vue.js, Nuxt.js, and maintainable interfaces for complex workflows.',
    evidenceIds: ['approved-velsa', 'approved-tactical-tech'],
    relatedProjectSlugs: ['ai-assisted-contract-workflow', 'tactical-tech-platform-modernisation'],
    relatedRoleIds: ['velsa-technologies', 'tactical-tech'],
  },
  {
    id: 'full-stack-feature-ownership',
    title: 'Full-stack feature ownership',
    description: 'End-to-end delivery across browser interfaces, application backends, service integration, and production integration.',
    evidenceIds: ['approved-velsa', 'approved-web-crawler'],
    relatedProjectSlugs: ['ai-assisted-contract-workflow', 'web-crawler-dashboard'],
    relatedRoleIds: ['velsa-technologies'],
  },
  {
    id: 'api-and-service-integration',
    title: 'APIs and service integration',
    description: 'Django, FastAPI, Ruby on Rails, REST APIs, service boundaries, payment webhooks, and backend integration.',
    evidenceIds: ['approved-velsa', 'approved-earlier-roles'],
    relatedProjectSlugs: ['ai-assisted-contract-workflow'],
    relatedRoleIds: ['velsa-technologies', 'durch-die-stadt'],
  },
  {
    id: 'accessibility-and-performance',
    title: 'Accessibility and performance',
    description: 'Code splitting, lazy loading, frontend optimisation, accessible systems, and WCAG 2.1 AA contribution.',
    evidenceIds: ['approved-tactical-tech'],
    relatedProjectSlugs: ['tactical-tech-platform-modernisation'],
    relatedRoleIds: ['tactical-tech'],
  },
  {
    id: 'applied-ai-integration',
    title: 'Applied AI integration',
    description: 'LLM inference, vector retrieval, conversational workflows, Django editing sessions, and predictable application integration.',
    evidenceIds: ['approved-velsa'],
    relatedProjectSlugs: ['ai-assisted-contract-workflow'],
    relatedRoleIds: ['velsa-technologies'],
  },
  {
    id: 'testing-and-delivery',
    title: 'Testing and delivery',
    description: 'Docker, CI/CD, automated testing, health endpoints, scheduling, and concurrency control.',
    evidenceIds: ['approved-jobs-tracker', 'approved-profile'],
    relatedProjectSlugs: ['jobs-tracker-bot'],
    relatedRoleIds: [],
  },
];

export const portfolioContent = {
  profile: {
    name: 'Saqib Sohail',
    location: 'Berlin, Germany',
    title: 'Senior full-stack engineer',
    positioning: 'Frontend-leaning full-stack engineer',
    proposition: 'Frontend-leaning engineer building accessible product interfaces, dependable service boundaries, and applied-AI workflows.',
    summary: 'Eight years of experience turning complex workflows into maintainable web products, from frontend architecture and legacy modernisation to API integration and AI-assisted features.',
    email: 'saqib@ssohail.com',
    website: 'https://ssohail.com',
    githubUrl: 'https://github.com/saqibroy',
    linkedinUrl: 'https://linkedin.com/in/saqibroy',
    languages: [
      { name: 'English', proficiency: 'Professional working proficiency' },
      { name: 'German', proficiency: 'B1 certified' },
      { name: 'Urdu and Punjabi', proficiency: 'Native' },
    ],
    downloads: {
      ats: '/downloads/saqib-sohail-cv-ats.pdf',
      visual: '/downloads/saqib-sohail-cv-visual.pdf',
    },
  },
  evidence,
  metrics,
  roles,
  education,
  capabilities,
  projects,
} as const;

type PortfolioContent = typeof portfolioContent;

const monthPattern = /^\d{4}-(0[1-9]|1[0-2])$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Invalid portfolio content: ${message}`);
  }
}

function assertUnique(items: ReadonlyArray<{ id: string }>, label: string) {
  const ids = new Set<string>();
  for (const item of items) {
    assert(item.id.length > 0, `${label} contains an empty id`);
    assert(!ids.has(item.id), `${label} contains duplicate id "${item.id}"`);
    ids.add(item.id);
  }
}

function assertEvidenceReferences(
  evidenceIds: readonly string[],
  knownEvidenceIds: ReadonlySet<string>,
  label: string,
) {
  assert(evidenceIds.length > 0, `${label} has no evidence references`);
  for (const evidenceId of evidenceIds) {
    assert(knownEvidenceIds.has(evidenceId), `${label} references unknown evidence "${evidenceId}"`);
  }
}

function assertPublicEvidence(
  evidenceIds: readonly string[],
  evidenceById: ReadonlyMap<string, EvidenceRef>,
  label: string,
) {
  for (const evidenceId of evidenceIds) {
    const item = evidenceById.get(evidenceId);
    assert(item, `${label} references missing evidence "${evidenceId}"`);
    assert(item.status !== 'needs-review', `${label} references non-public evidence "${evidenceId}"`);
  }
}

export function validatePortfolioContent(content: PortfolioContent = portfolioContent) {
  assertUnique(content.evidence, 'evidence');
  assertUnique(content.metrics, 'metrics');
  assertUnique(content.roles, 'roles');
  assertUnique(content.education, 'education');
  assertUnique(content.capabilities, 'capabilities');
  assertUnique(content.projects, 'projects');

  const evidenceById = new Map(content.evidence.map((item) => [item.id, item]));
  const evidenceIds = new Set(evidenceById.keys());
  const roleIds = new Set(content.roles.map((item) => item.id));
  const projectSlugs = new Set(content.projects.map((item) => item.slug));

  for (const item of content.evidence) {
    assert(item.source.length > 0 && item.description.length > 0, `evidence "${item.id}" is incomplete`);
    if (item.url) {
      const url = new URL(item.url);
      assert(url.protocol === 'https:', `evidence "${item.id}" must use HTTPS`);
    }
  }

  for (const item of content.metrics) {
    assert(item.value.length > 0 && item.label.length > 0 && item.context.length > 0, `metric "${item.id}" is incomplete`);
    assertEvidenceReferences(item.evidenceIds, evidenceIds, `metric "${item.id}"`);
    assertPublicEvidence(item.evidenceIds, evidenceById, `metric "${item.id}"`);
  }

  for (const item of content.roles) {
    assert(monthPattern.test(item.startDate) && monthPattern.test(item.endDate), `role "${item.id}" has an invalid date`);
    assert(item.startDate <= item.endDate, `role "${item.id}" ends before it starts`);
    assert(item.highlights.length > 0 && item.technologies.length > 0, `role "${item.id}" is incomplete`);
    assertEvidenceReferences(item.evidenceIds, evidenceIds, `role "${item.id}"`);
    assertPublicEvidence(item.evidenceIds, evidenceById, `role "${item.id}"`);
  }

  for (const item of content.education) {
    assert(monthPattern.test(item.startDate) && monthPattern.test(item.endDate), `education "${item.id}" has an invalid date`);
    assert(item.startDate <= item.endDate, `education "${item.id}" ends before it starts`);
    assertEvidenceReferences(item.evidenceIds, evidenceIds, `education "${item.id}"`);
    assertPublicEvidence(item.evidenceIds, evidenceById, `education "${item.id}"`);
  }

  for (const item of content.projects) {
    assert(slugPattern.test(item.slug), `project "${item.id}" has an invalid slug`);
    assert(item.summary.length > 0 && item.technologies.length > 0, `project "${item.id}" is incomplete`);
    if (item.repositoryUrl) {
      const url = new URL(item.repositoryUrl);
      assert(url.protocol === 'https:', `project "${item.id}" repository URL must use HTTPS`);
    }
    assertEvidenceReferences(item.evidenceIds, evidenceIds, `project "${item.id}"`);
    assertPublicEvidence(item.evidenceIds, evidenceById, `project "${item.id}"`);
  }

  for (const item of content.capabilities) {
    assert(item.description.length > 0, `capability "${item.id}" is incomplete`);
    assertEvidenceReferences(item.evidenceIds, evidenceIds, `capability "${item.id}"`);
    assertPublicEvidence(item.evidenceIds, evidenceById, `capability "${item.id}"`);
    for (const roleId of item.relatedRoleIds) {
      assert(roleIds.has(roleId), `capability "${item.id}" references unknown role "${roleId}"`);
    }
    for (const projectSlug of item.relatedProjectSlugs) {
      assert(projectSlugs.has(projectSlug), `capability "${item.id}" references unknown project "${projectSlug}"`);
    }
  }

  assert(content.profile.title === 'Senior full-stack engineer', 'profile title must use the approved prominent title');
  assert(content.profile.positioning === 'Frontend-leaning full-stack engineer', 'profile positioning must use the approved descriptive wording');
  assert(content.profile.downloads.ats.startsWith('/downloads/'), 'ATS download path is invalid');
  assert(content.profile.downloads.visual.startsWith('/downloads/'), 'visual download path is invalid');
}

validatePortfolioContent();
