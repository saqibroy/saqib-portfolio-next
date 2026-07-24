export type ExternalLink = {
  label: string;
  href: `https://${string}` | `mailto:${string}` | `tel:${string}`;
};

export type Experience = {
  company: string;
  title?: string;
  period?: string;
  summary: string;
  achievements: readonly string[];
  technologies: readonly string[];
};

export type Education = {
  institution: string;
  qualification: string;
  period: string;
  coursework: readonly string[];
};

export type CapabilityGroup = {
  title: string;
  description: string;
  items: readonly string[];
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  technologies: readonly string[];
  evidence: readonly string[];
  caseStudySlug?: string;
};

export type DiagramNode = {
  id: string;
  label: string;
  detail: string;
  lane: "interface" | "service" | "data" | "delivery";
};

export type DiagramEdge = {
  from: string;
  to: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  context: string;
  problem: string;
  constraints: readonly string[];
  responsibility: readonly string[];
  boundaries: readonly string[];
  architecture: {
    title: string;
    description: string;
    nodes: readonly DiagramNode[];
    edges: readonly DiagramEdge[];
  };
  decisions: readonly {
    title: string;
    description: string;
  }[];
  tradeoffs: readonly {
    title: string;
    description: string;
  }[];
  quality: readonly {
    title: string;
    description: string;
  }[];
  outcome: readonly string[];
  next: readonly string[];
  technologies: readonly string[];
  confidential?: boolean;
  projectSlug?: string;
};

export type Note = {
  slug: string;
  title: string;
  description: string;
  readingTime: string;
  sections: readonly {
    heading: string;
    paragraphs: readonly string[];
  }[];
  relatedCaseStudy: string;
};
