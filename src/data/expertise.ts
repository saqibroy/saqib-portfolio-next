/**
 * Professional Expertise, Services, and Skills
 * Comprehensive technical and soft skills inventory
 * Updated from CV: Saqib Sohail - Skills & Services
 */

export interface ServiceArea {
  id: string;
  title: string;
  description: string;
  expertise: string[];
  icon: string;
}

export interface ExpertiseLevel {
  category: string;
  icon: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Intermediate';
    description: string;
    experience?: string;
  }[];
}

/**
 * Service Areas
 */
export const services: ServiceArea[] = [
  {
    id: 'frontend-development',
    title: 'Front-End Development',
    description: 'Modern responsive interfaces with accessibility and performance at the core',
    expertise: [
      'React.js',
      'Next.js',
      'Vue.js',
      'Nuxt.js',
      'TypeScript',
      'Tailwind CSS',
      'WCAG 2.1 Compliance',
      'Framer Motion',
    ],
    icon: 'Code',
  },
  {
    id: 'backend-development',
    title: 'Back-End Development',
    description: 'Scalable APIs and microservices with clean architecture and best practices',
    expertise: [
      'Node.js',
      'FastAPI',
      'Django',
      'Ruby on Rails',
      'Symfony',
      'GraphQL',
      'REST APIs',
      'Microservices',
    ],
    icon: 'Server',
  },
  {
    id: 'ai-integration',
    title: 'AI & LLM Integration',
    description: 'Building intelligent systems with language models, RAG pipelines, and agentic workflows',
    expertise: ['LangChain', 'RAG Pipelines', 'Agentic Workflows', 'Prompt Engineering', 'Vector Databases', 'Google Gemini'],
    icon: 'Zap',
  },
  {
    id: 'web-accessibility',
    title: 'Web Accessibility',
    description: 'WCAG 2.1 compliant applications ensuring inclusive experiences for all users',
    expertise: [
      'WCAG 2.1 AA/AAA',
      'Semantic HTML',
      'ARIA Implementation',
      'Keyboard Navigation',
      'Screen Reader Testing',
      'Accessibility Auditing',
    ],
    icon: 'Eye',
  },
  {
    id: 'devops-infrastructure',
    title: 'DevOps & Infrastructure',
    description: 'Containerization, CI/CD pipelines, and deployment automation',
    expertise: ['Docker', 'GitLab CI/CD', 'GitHub Actions', 'CI/CD Pipelines', 'Deployment Automation', 'Oracle Cloud'],
    icon: 'Settings',
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    description: 'Code splitting, bundle optimization, and Web Vitals improvement',
    expertise: ['Code Splitting', 'Bundle Optimization', 'Core Web Vitals', 'Lighthouse', 'Performance Testing', 'Load Time Reduction'],
    icon: 'Zap',
  },
];

/**
 * Expertise Areas with Proficiency Levels
 */
export const expertiseAreas: ExpertiseLevel[] = [
  {
    category: 'Front-End Technologies',
    icon: 'Code',
    skills: [
      {
        name: 'React.js',
        level: 'Expert',
        description: 'Component architecture, hooks, performance optimization, state management',
        experience: '6+ years',
      },
      {
        name: 'Next.js',
        level: 'Expert',
        description: 'SSR, SSG, ISR, API routes, file-based routing, middleware',
        experience: '5+ years',
      },
      {
        name: 'Vue.js',
        level: 'Advanced',
        description: 'Composition API, state management, components, reactive systems',
        experience: '4+ years',
      },
      {
        name: 'Nuxt.js',
        level: 'Advanced',
        description: 'Universal applications, SSR, auto-routing, middleware',
        experience: '4+ years',
      },
      {
        name: 'TypeScript',
        level: 'Expert',
        description: 'Type safety, interfaces, generics, advanced types, tooling',
        experience: '6+ years',
      },
      {
        name: 'Tailwind CSS',
        level: 'Expert',
        description: 'Utility-first styling, responsive design, custom components',
        experience: '5+ years',
      },
      {
        name: 'Web Accessibility (WCAG 2.1)',
        level: 'Expert',
        description: 'AA/AAA compliance, ARIA, semantic HTML, keyboard navigation',
        experience: '5+ years',
      },
      {
        name: 'Framer Motion',
        level: 'Advanced',
        description: 'Animations, gestures, layout animations, page transitions',
        experience: '3+ years',
      },
    ],
  },
  {
    category: 'Back-End Technologies',
    icon: 'Server',
    skills: [
      {
        name: 'Node.js',
        level: 'Expert',
        description: 'Event-driven architecture, async/await, streams, worker threads',
        experience: '6+ years',
      },
      {
        name: 'FastAPI',
        level: 'Advanced',
        description: 'Type hints, dependency injection, async views, OpenAPI',
        experience: '2+ years',
      },
      {
        name: 'Django',
        level: 'Advanced',
        description: 'ORM, authentication, middleware, testing, API development',
        experience: '2+ years',
      },
      {
        name: 'Ruby on Rails',
        level: 'Advanced',
        description: 'MVC, ActiveRecord, RESTful APIs, testing',
        experience: '4+ years',
      },
      {
        name: 'Symfony',
        level: 'Intermediate',
        description: 'MVC framework, Doctrine ORM, DI container',
        experience: '1+ year',
      },
      {
        name: 'GraphQL',
        level: 'Advanced',
        description: 'Query language, resolvers, schema design, optimization',
        experience: '3+ years',
      },
      {
        name: 'PostgreSQL',
        level: 'Expert',
        description: 'Query optimization, indexing, transactions, advanced features',
        experience: '6+ years',
      },
      {
        name: 'MongoDB',
        level: 'Advanced',
        description: 'Document design, aggregation pipeline, indexing',
        experience: '3+ years',
      },
    ],
  },
  {
    category: 'DevOps & Tools',
    icon: 'Settings',
    skills: [
      {
        name: 'Docker',
        level: 'Advanced',
        description: 'Containerization, images, multi-stage builds, compose',
        experience: '4+ years',
      },
      {
        name: 'GitLab CI/CD',
        level: 'Advanced',
        description: 'Pipelines, artifacts, environments, deployment strategies',
        experience: '3+ years',
      },
      {
        name: 'GitHub Actions',
        level: 'Advanced',
        description: 'Workflows, automation, deployment, testing',
        experience: '3+ years',
      },
      {
        name: 'Jest',
        level: 'Advanced',
        description: 'Unit testing, mocking, snapshot testing',
        experience: '5+ years',
      },
      {
        name: 'Vitest',
        level: 'Advanced',
        description: 'Fast unit testing, Vue/React testing, mocking',
        experience: '2+ years',
      },
      {
        name: 'RSpec',
        level: 'Advanced',
        description: 'BDD testing for Rails, mocking, expectations',
        experience: '3+ years',
      },
      {
        name: 'PHPUnit',
        level: 'Intermediate',
        description: 'PHP unit testing, test-driven development',
        experience: '1+ year',
      },
    ],
  },
];

/**
 * Additional Technical Skills
 */
export const technicalSkills = {
  languages: [
    'JavaScript',
    'TypeScript',
    'Python',
    'Ruby',
    'PHP',
    'Go',
    'HTML5',
    'CSS3',
  ],
  databases: [
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Firebase/Firestore',
    'Vector Databases (Pinecone, Weaviate)',
  ],
  platforms: [
    'Vercel',
    'Oracle Cloud',
    'Firebase',
    'GitHub',
    'GitLab',
  ],
  integrations: [
    'Stripe',
    'Google APIs',
    'Discord API',
    'Telegram API',
    'Mapbox',
    'LangChain',
  ],
  cms: [
    'Decap CMS',
    'Contentlayer',
  ],
};

/**
 * Soft Skills & Expertise
 */
export const softSkills = [
  {
    name: 'Technical Leadership',
    description: 'Architecture decisions, mentoring, code review, best practices',
  },
  {
    name: 'Problem Solving',
    description: 'Debugging, optimization, edge case handling',
  },
  {
    name: 'Communication',
    description: 'Cross-functional collaboration, documentation, knowledge sharing',
  },
  {
    name: 'Mentoring & Teaching',
    description: 'Code reviews, junior developer guidance, knowledge sharing',
  },
  {
    name: 'Project Architecture',
    description: 'System design, scalability, maintainability',
  },
  {
    name: 'AI/ML Integration',
    description: 'LLM workflows, RAG pipelines, agentic systems',
  },
];

/**
 * Helper function to get expertise by category
 */
export function getExpertiseByCategory(category: string): ExpertiseLevel | undefined {
  return expertiseAreas.find((area) => area.category === category);
}

/**
 * Helper function to get all expert-level skills
 */
export function getExpertSkills() {
  return expertiseAreas.flatMap((area) =>
    area.skills.filter((skill) => skill.level === 'Expert')
  );
}

/**
 * Helper function to get service areas by technology
 */
export function getServicesByTechnology(tech: string): ServiceArea[] {
  return services.filter((service) =>
    service.expertise.some((exp) => exp.toLowerCase().includes(tech.toLowerCase()))
  );
}

/**
 * Performance Metrics Summary
 */
export const performanceMetrics = {
  yearsExperience: '8+',
  projectsCompleted: '20+',
  applicationsDeployed: '15+',
  openSourceProjects: '5+',
  educationLevel: 'M.Sc. Computer Science (Technische Universität Berlin)',
};
