import type { CaseStudy } from "../types";

export const caseStudies = [
  {
    slug: "ai-assisted-contract-workflow",
    eyebrow: "Velsa Technologies · 2025–2026",
    title: "AI-assisted contract workflow",
    summary:
      "A connected product flow spanning a browser contract editor, application backend, AI service and payment-controlled document access.",
    context:
      "The work connected a React and TypeScript frontend, the existing Django application backend, a FastAPI AI service and production integration.",
    problem:
      "The product needed to collect structured information conversationally, turn that input into contract content, support editing of document-specific controls and connect purchasing to controlled access.",
    constraints: [
      "The service integration had to connect with an existing Django platform.",
      "The editor needed to support merge fields, inline option controls and conditional clauses.",
      "Purchasing and document access depended on Stripe payment and webhook flows.",
      "Confidential implementation and operational details are intentionally omitted.",
    ],
    responsibility: [
      "Owned end-to-end delivery across the editor, Django application backend, FastAPI AI service and production integration.",
      "Made architecture decisions for the application flow connecting the frontend, Django backend and FastAPI AI service.",
      "Built the browser editor and conversational structured-input workflow.",
      "Designed and deployed the FastAPI integration for LLM inference and vector retrieval.",
    ],
    boundaries: [
      "Product interface: contract editing and conversational input in React and TypeScript.",
      "Application services: Django APIs coordinate the product workflow.",
      "AI integration: FastAPI provides LLM inference and vector retrieval.",
      "Commerce and access: Stripe payment and webhooks connect purchasing to document access.",
    ],
    architecture: {
      title: "Abstracted application flow",
      description:
        "The diagram shows verified service boundaries only. Confidential data models, infrastructure and operational details are omitted.",
      nodes: [
        {
          id: "editor",
          label: "Contract editor",
          detail: "Merge fields, options, conditional clauses",
          lane: "interface",
        },
        {
          id: "conversation",
          label: "Conversational input",
          detail: "Collects structured user input",
          lane: "interface",
        },
        {
          id: "django",
          label: "Django application",
          detail: "Backend APIs and product workflow",
          lane: "service",
        },
        {
          id: "fastapi",
          label: "FastAPI AI service",
          detail: "LLM inference and vector retrieval",
          lane: "data",
        },
        {
          id: "stripe",
          label: "Stripe",
          detail: "Payment and webhook flow",
          lane: "service",
        },
        {
          id: "access",
          label: "Document access",
          detail: "Controlled after purchase",
          lane: "delivery",
        },
      ],
      edges: [
        { from: "conversation", to: "django", label: "structured input" },
        { from: "django", to: "fastapi", label: "AI request" },
        { from: "django", to: "editor", label: "contract content" },
        { from: "stripe", to: "django", label: "webhook" },
        { from: "django", to: "access", label: "access state" },
      ],
    },
    decisions: [
      {
        title: "Keep product flow anchored in the application backend",
        description:
          "The conversational interface populated contract content through backend APIs, keeping the browser experience connected to the Django product workflow.",
      },
      {
        title: "Give AI integration a clear service boundary",
        description:
          "LLM inference and vector retrieval were integrated through FastAPI while the existing Django platform retained the application role.",
      },
      {
        title: "Connect payment events to access",
        description:
          "Stripe purchasing and webhook flows were integrated with controlled document access rather than treated as an isolated checkout screen.",
      },
    ],
    tradeoffs: [
      {
        title: "Separate AI service",
        description:
          "A dedicated FastAPI service adds an integration boundary, while keeping LLM inference and vector retrieval distinct from the existing Django application.",
      },
      {
        title: "Structured conversation",
        description:
          "Collecting structured input constrains the interaction, while giving backend APIs explicit data to populate contract content.",
      },
    ],
    quality: [
      {
        title: "Reliability",
        description:
          "Payment webhooks and controlled document access are verified parts of the delivered flow. No unsupported availability or scale claim is made.",
      },
      {
        title: "Accessibility and testing",
        description:
          "Public evidence does not specify compliance scope or test counts for this product, so neither is claimed here.",
      },
      {
        title: "Confidentiality",
        description:
          "The model shows product and service responsibilities without exposing internal data, infrastructure or contract details.",
      },
    ],
    outcome: [
      "Delivered an AI-assisted contract product from interface and API design through deployment and production integration.",
      "Connected structured conversational input, contract editing, AI integration, purchasing and controlled access in one application flow.",
    ],
    next: [
      "Document observable failure states across the service and payment boundaries.",
      "Expand public evidence for testing and accessibility without exposing confidential implementation.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Django",
      "FastAPI",
      "LLM integration",
      "Vector retrieval",
      "Stripe",
    ],
    confidential: true,
  },
  {
    slug: "platform-modernisation",
    eyebrow: "Tactical Tech · 2019–2025",
    title: "Platform modernisation and content architecture",
    summary:
      "Modernising public-facing frontend systems while improving load performance, editorial workflows and maintainability.",
    context:
      "Tactical Tech publishes research and educational work for international audiences, researchers, educators and civil-society organisations.",
    problem:
      "Legacy applications and content structures needed to become faster to load, easier to maintain and more effective for editorial teams working with complex material.",
    constraints: [
      "The work spanned 5+ existing public-facing platforms rather than a single greenfield application.",
      "Research and educational content had to remain understandable and maintainable.",
      "Product, design, research and editorial needs had to meet in the same frontend systems.",
      "Accessibility work was collaborative; the supported claim is contribution to WCAG 2.1 AA compliance.",
    ],
    responsibility: [
      "Owned frontend delivery and modernisation across 5+ public-facing platforms.",
      "Partnered with product, design, research and editorial teams.",
      "Migrated 3 legacy applications to Next.js and Nuxt.js.",
      "Refactored Decap CMS content architecture.",
    ],
    boundaries: [
      "Audience experience: public-facing React/Vue interfaces.",
      "Application layer: Next.js and Nuxt.js applications replacing legacy frontends.",
      "Content layer: Decap CMS schemas and editorial workflows.",
      "Quality concerns: accessibility contribution, loading performance and maintainability.",
    ],
    architecture: {
      title: "Modernisation boundary map",
      description:
        "A portfolio-level abstraction of verified frontend, content and delivery concerns across multiple platforms.",
      nodes: [
        {
          id: "audience",
          label: "International audiences",
          detail: "Research and educational experiences",
          lane: "interface",
        },
        {
          id: "apps",
          label: "Next.js + Nuxt.js",
          detail: "3 migrated legacy applications",
          lane: "service",
        },
        {
          id: "cms",
          label: "Decap CMS",
          detail: "Refactored content architecture",
          lane: "data",
        },
        {
          id: "quality",
          label: "Frontend quality",
          detail: "Performance, accessibility, maintainability",
          lane: "delivery",
        },
      ],
      edges: [
        { from: "cms", to: "apps", label: "structured content" },
        { from: "apps", to: "audience", label: "public experience" },
        { from: "quality", to: "apps", label: "delivery criteria" },
      ],
    },
    decisions: [
      {
        title: "Modernise application foundations",
        description:
          "Three legacy applications moved to Next.js and Nuxt.js, establishing maintainable frontend foundations for ongoing product work.",
      },
      {
        title: "Treat content structure as product infrastructure",
        description:
          "Refactoring Decap CMS content architecture addressed editorial workflow time, not only frontend rendering.",
      },
      {
        title: "Optimise what users receive first",
        description:
          "Code splitting, lazy loading and frontend optimisation focused on initial-load performance.",
      },
    ],
    tradeoffs: [
      {
        title: "Incremental modernisation",
        description:
          "Migrating selected legacy applications produces a mixed estate during transition, while allowing measurable improvements without claiming a single wholesale rewrite.",
      },
      {
        title: "Two frontend frameworks",
        description:
          "Using both Next.js and Nuxt.js retains framework variety across the platforms, while the verified migrations served their respective application contexts.",
      },
    ],
    quality: [
      {
        title: "Performance",
        description:
          "Initial load times were reduced by 30% through code splitting, lazy loading and frontend optimisation.",
      },
      {
        title: "Accessibility",
        description:
          "The work contributed to WCAG 2.1 AA compliance; it is not presented as single-person ownership of compliance.",
      },
      {
        title: "Maintainability",
        description:
          "Complex research and educational content was translated into accessible, maintainable web experiences.",
      },
    ],
    outcome: [
      "30% faster initial loads in the modernised frontend work.",
      "More than 50% shorter editorial workflows after refactoring Decap CMS content architecture.",
      "Frontend delivery and modernisation across 5+ public-facing platforms.",
    ],
    next: [
      "Capture more migration decisions in reusable, framework-neutral playbooks.",
      "Pair automated checks with continued manual accessibility review across content patterns.",
    ],
    technologies: [
      "React",
      "Next.js",
      "Vue.js",
      "Nuxt.js",
      "Decap CMS",
      "WCAG 2.1 AA",
    ],
    confidential: true,
  },
  {
    slug: "jobs-tracker-bot",
    eyebrow: "Open source",
    title: "Jobs Tracker Bot",
    summary:
      "An asynchronous Python aggregator that monitors 11 remote job boards, classifies NGO roles and routes useful results to Discord and Telegram.",
    context:
      "Remote job listings are distributed across multiple boards. The project brings monitoring, role classification and notifications into one repeatable workflow.",
    problem:
      "Checking many remote job sources manually is repetitive. The project needed to monitor a defined set of boards and surface NGO-relevant roles through channels that are easy to follow.",
    constraints: [
      "The verified scope covers 11 remote job boards.",
      "The workflow includes NGO role classification.",
      "Notifications are delivered to Discord and Telegram.",
      "No user, traffic, test-count or production-scale claim is made.",
    ],
    responsibility: [
      "Built the asynchronous aggregation workflow in Python.",
      "Implemented job-board monitoring and NGO role classification.",
      "Connected the output to Discord and Telegram alerts.",
      "Configured GitHub Actions and Docker for repeatable execution.",
    ],
    boundaries: [
      "Sources: 11 remote job boards.",
      "Aggregation: asynchronous Python monitoring.",
      "Classification: NGO role identification.",
      "Delivery: Discord and Telegram alerts.",
      "Execution: GitHub Actions and Docker.",
    ],
    architecture: {
      title: "Aggregation and notification flow",
      description:
        "The diagram represents the approved public feature boundary without implying undocumented scale or infrastructure.",
      nodes: [
        {
          id: "boards",
          label: "11 job boards",
          detail: "Remote role sources",
          lane: "interface",
        },
        {
          id: "aggregator",
          label: "Async aggregator",
          detail: "Python monitoring workflow",
          lane: "service",
        },
        {
          id: "classifier",
          label: "NGO classification",
          detail: "Role classification step",
          lane: "data",
        },
        {
          id: "alerts",
          label: "Alerts",
          detail: "Discord and Telegram",
          lane: "delivery",
        },
        {
          id: "automation",
          label: "Execution",
          detail: "GitHub Actions and Docker",
          lane: "delivery",
        },
      ],
      edges: [
        { from: "boards", to: "aggregator", label: "listings" },
        { from: "aggregator", to: "classifier", label: "normalised roles" },
        { from: "classifier", to: "alerts", label: "relevant matches" },
        { from: "automation", to: "aggregator", label: "repeatable run" },
      ],
    },
    decisions: [
      {
        title: "Aggregate asynchronously",
        description:
          "The workflow monitors multiple job-board inputs asynchronously instead of making each source a manual step.",
      },
      {
        title: "Classify before notifying",
        description:
          "NGO role classification sits between aggregation and alerts so the delivery channels receive more focused output.",
      },
      {
        title: "Use two notification channels",
        description:
          "Discord and Telegram are both supported rather than tying the project to a single alert destination.",
      },
    ],
    tradeoffs: [
      {
        title: "Multiple external sources",
        description:
          "Monitoring 11 independent boards broadens coverage while increasing the number of input boundaries the project must handle.",
      },
      {
        title: "Automated execution",
        description:
          "GitHub Actions and Docker make execution repeatable without implying an always-on or large-scale service.",
      },
    ],
    quality: [
      {
        title: "Repeatability",
        description:
          "GitHub Actions and Docker define a consistent way to run the monitoring workflow.",
      },
      {
        title: "Focused output",
        description:
          "Classification occurs before Discord and Telegram delivery.",
      },
      {
        title: "Evidence boundary",
        description:
          "No unsupported test count, uptime, user count or matching-accuracy metric is presented.",
      },
    ],
    outcome: [
      "A working aggregation path across 11 remote job boards.",
      "NGO role classification with Discord and Telegram alerts.",
      "A portable execution setup using GitHub Actions and Docker.",
    ],
    next: [
      "Document source-specific failure states and alert-delivery behaviour.",
      "Add measured classification-quality evidence before presenting any accuracy claim.",
    ],
    technologies: ["Python", "GitHub Actions", "Docker"],
    confidential: false,
    projectSlug: "jobs-tracker-bot",
  },
] as const satisfies readonly CaseStudy[];

export type CaseStudySlug = (typeof caseStudies)[number]["slug"];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
