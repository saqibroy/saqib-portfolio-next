import type { Experience } from "./types";

export const experience = [
  {
    company: "Velsa Technologies",
    title: "Senior Full-Stack Engineer",
    period: "08/2025–05/2026",
    summary:
      "End-to-end delivery of an AI-assisted contract product across a React and TypeScript interface, Django application backend, FastAPI AI service and production integration.",
    achievements: [
      "Designed the application flow and service integration for an AI-assisted contract workflow connecting a React/TypeScript editor, Django backend and FastAPI AI service.",
      "Built a browser-based contract editor supporting merge fields, inline option controls and conditional clauses.",
      "Developed a conversational workflow that collected structured user input and populated contract content through backend APIs.",
      "Designed and deployed a FastAPI service integrating LLM inference and vector retrieval with the existing Django platform.",
      "Integrated Stripe payment and webhook flows for contract purchasing and controlled document access.",
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
  },
  {
    company: "Tactical Tech",
    title: "Front-End Developer",
    period: "08/2019–04/2025",
    summary:
      "Frontend delivery and modernisation for public-facing platforms serving international audiences, researchers, educators and civil-society organisations.",
    achievements: [
      "Owned frontend delivery and modernisation across 5+ public-facing platforms.",
      "Migrated 3 legacy applications to Next.js and Nuxt.js.",
      "Reduced initial load times by 30% through code splitting, lazy loading and frontend optimisation.",
      "Refactored Decap CMS content architecture, reducing editorial workflow time by more than 50%.",
      "Partnered with product, design, research and editorial teams.",
      "Translated complex research and educational content into accessible, maintainable web experiences.",
      "Contributed to WCAG 2.1 AA compliance.",
    ],
    technologies: [
      "React",
      "Next.js",
      "Vue.js",
      "Nuxt.js",
      "Decap CMS",
      "WCAG 2.1 AA",
    ],
  },
  {
    company: "Durch die Stadt GmbH",
    title: undefined,
    period: undefined,
    summary:
      "Worked on 360-degree city and retail portals, REST APIs and responsive components.",
    achievements: [
      "Built full-stack features for city and retail portal experiences.",
      "Worked with mapping, relational data and responsive frontend components.",
    ],
    technologies: [
      "Ruby on Rails",
      "Vue.js",
      "Nuxt.js",
      "PostgreSQL",
      "Mapbox",
      "REST APIs",
    ],
  },
  {
    company: "TurboAd GmbH",
    title: undefined,
    period: undefined,
    summary:
      "Worked on relational data modelling, query optimisation and test-driven development.",
    achievements: [
      "Developed server-side application features in Symfony and PHP.",
      "Worked with relational data models, query optimisation and test-driven development.",
    ],
    technologies: [
      "Symfony 3",
      "PHP 7",
      "PHPUnit",
      "Doctrine ORM",
      "MySQL",
    ],
  },
  {
    company: "Octasolutions",
    title: undefined,
    period: undefined,
    summary:
      "Built full-stack applications, admin dashboards, role-based authentication and responsive frontends.",
    achievements: [
      "Delivered application features across server-rendered and browser interfaces.",
      "Built admin dashboards and role-based authentication flows.",
    ],
    technologies: ["Ruby on Rails", "MySQL", "JavaScript", "Bootstrap"],
  },
] as const satisfies readonly Experience[];
