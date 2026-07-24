import type { Project } from "./types";

export const projects = [
  {
    slug: "jobs-tracker-bot",
    title: "Jobs Tracker Bot",
    description:
      "An asynchronous aggregator monitoring 11 remote job boards, classifying NGO roles and sending Discord and Telegram alerts.",
    technologies: ["Python", "GitHub Actions", "Docker"],
    evidence: [
      "11 remote job boards monitored",
      "NGO role classification",
      "Discord and Telegram alerts",
    ],
    caseStudySlug: "jobs-tracker-bot",
  },
  {
    slug: "web-crawler-dashboard",
    title: "Web Crawler Dashboard",
    description:
      "A URL analysis application with crawl feedback across a React interface and Go service.",
    technologies: ["React", "Go", "Docker"],
    evidence: [
      "Broken-link and heading analysis",
      "Login-form detection",
      "Real-time crawl status",
      "JWT authentication",
    ],
    caseStudySlug: undefined,
  },
  {
    slug: "accessibility-microservice",
    title: "Accessibility Microservice",
    description:
      "A lightweight scanner for static HTML with AI-enriched accessibility reports.",
    technologies: ["Node.js", "JSDOM"],
    evidence: [
      "WCAG 2.1 A/AA scanning",
      "Static HTML analysis",
      "AI-enriched reports",
    ],
    caseStudySlug: undefined,
  },
] as const satisfies readonly Project[];
