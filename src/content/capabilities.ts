import type { CapabilityGroup } from "./types";

export const capabilities = [
  {
    title: "Product interfaces",
    description:
      "Frontend systems that translate complex product, research and editorial requirements into maintainable experiences.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Vue.js",
      "Nuxt.js",
      "Responsive interfaces",
    ],
  },
  {
    title: "Application services",
    description:
      "Hands-on backend delivery and explicit interface boundaries between product flows and services.",
    items: [
      "Django",
      "FastAPI",
      "Node.js",
      "Ruby on Rails",
      "REST APIs",
      "Stripe integrations",
    ],
  },
  {
    title: "Data and AI integration",
    description:
      "Practical AI-assisted product work grounded in interface design, backend APIs and controlled service integration.",
    items: [
      "LLM inference",
      "Vector retrieval",
      "Structured input flows",
      "PostgreSQL",
      "MySQL",
    ],
  },
  {
    title: "Quality and delivery",
    description:
      "Decisions shaped by accessibility, performance, maintainability and repeatable delivery.",
    items: [
      "WCAG 2.1 AA contribution",
      "Frontend performance",
      "Legacy modernisation",
      "Test-driven development",
      "Docker",
      "GitHub Actions",
    ],
  },
] as const satisfies readonly CapabilityGroup[];

export const evidence = [
  {
    value: "8+",
    label: "years",
    context: "delivering production web applications",
  },
  {
    value: "5+",
    label: "platforms",
    context: "public-facing work at Tactical Tech",
  },
  {
    value: "3",
    label: "legacy apps",
    context: "modernised with Next.js and Nuxt.js",
  },
  {
    value: "30%",
    label: "faster",
    context: "initial loads after frontend optimisation",
  },
  {
    value: "50%+",
    label: "shorter",
    context: "editorial workflows after CMS refactoring",
  },
] as const;

export const systemDesignApproach = [
  {
    step: "01",
    title: "Clarify the frame",
    description: "Understand users, requirements and constraints before choosing a shape.",
  },
  {
    step: "02",
    title: "Draw the boundaries",
    description: "Define data flow, ownership and the interfaces between parts.",
  },
  {
    step: "03",
    title: "Compare tradeoffs",
    description: "Make costs and alternatives visible, not implicit.",
  },
  {
    step: "04",
    title: "Design for quality",
    description: "Include failure handling, accessibility and testability in the design.",
  },
  {
    step: "05",
    title: "Deliver and learn",
    description: "Ship incrementally and measure outcomes that matter to the product.",
  },
] as const;

