/**
 * Professional Projects and Case Studies
 * Showcasing full-stack development expertise and impact
 * Updated from CV: Saqib Sohail - Key Projects
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  role: string;
  impact?: string;
  keyFeatures: string[];
  links?: {
    live?: string;
    github?: string;
    case_study?: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
  category: 'Web Development' | 'Performance' | 'Full Stack' | 'DevOps' | 'Open Source' | 'AI/ML';
  featured: boolean;
  image?: string;
}

export const projects: Project[] = [
  {
    id: 'headless-contract-editor',
    title: 'Headless Contract Editor',
    description: 'Enterprise document editor with AI-powered merge fields and conditional clauses, integrated with LLM pipelines.',
    fullDescription:
      'Built a sophisticated headless contract editor in React with dynamic merge fields, inline option toolbars, and toggleable conditional clauses. Architected a FastAPI microservice for AI inference using a multi-chain LLM pipeline (Google Gemini) with vector database retrieval (RAG). Integrated Stripe payment flows with webhook handling. Designed Django backend for user management and multi-service API orchestration.',
    role: 'Senior Full-Stack Engineer',
    category: 'Full Stack',
    featured: true,
    technologies: [
      'React.js',
      'FastAPI',
      'Python',
      'Django',
      'Google Gemini',
      'Stripe',
      'PostgreSQL',
      'LangChain',
      'Vector Databases',
    ],
    keyFeatures: [
      'Headless document editor with merge fields and dynamic options',
      'Multi-chain LLM pipeline for contract generation',
      'Conversational chatbot wizard for guided contract creation',
      'RAG pipeline with vector database retrieval',
      'Stripe payment integration with webhook handling',
      'Django backend for user management and storage',
      'Real-time document synchronization',
    ],
    metrics: [
      { label: 'Company', value: 'Velsa Technologies' },
      { label: 'Duration', value: '08/2025 - Present' },
      { label: 'Team Impact', value: 'Core Platform' },
    ],
  },
  {
    id: 'ai-chatbot-platform',
    title: 'AI Chatbot Platform with RAG',
    description: 'Multi-chain agentic LLM pipeline with self-correction loops and vector database retrieval integration.',
    fullDescription:
      'Architected a conversational chatbot wizard that guides users through contract creation via structured Q&A, auto-populating documents via API. Designed and deployed a FastAPI microservice for AI inference using a multi-chain LLM pipeline (Google Gemini) with vector database retrieval (RAG). Implemented self-correction loops and integrated into existing Django backend.',
    role: 'Senior Full-Stack Engineer',
    category: 'AI/ML',
    featured: true,
    technologies: ['LangChain', 'RAG', 'Django', 'FastAPI', 'Google Gemini', 'Vector Databases', 'Python'],
    keyFeatures: [
      'Multi-chain agentic LLM pipeline',
      'Self-correction loops for improved accuracy',
      'Vector database retrieval (RAG)',
      'Structured Q&A workflow',
      'API integration with FastAPI microservice',
      'Conversational UI with guided flows',
      'Error handling and fallback mechanisms',
    ],
    metrics: [
      { label: 'Company', value: 'Velsa Technologies' },
      { label: 'Pipeline Chains', value: '3+' },
      { label: 'Accuracy Improvement', value: 'Self-Correcting' },
    ],
  },
  {
    id: 'jamstack-migration',
    title: 'JAMstack Platform Migration',
    description: 'Migrated 3 legacy applications to Next.js and Nuxt.js, reducing load times by 30% and achieving WCAG 2.1 AA compliance.',
    fullDescription:
      'Led the architectural migration of 3 legacy applications to modern JAMstack platforms using Next.js and Nuxt.js. Reduced initial load times by 30% through strategic code splitting, lazy loading, and performance optimization. Achieved WCAG 2.1 AA compliance across all 5+ applications using proper ARIA roles, keyboard navigation, and comprehensive Lighthouse audits. Implemented structured data, semantic HTML, and meta tag strategies that increased organic search traffic.',
    role: 'Front-End Developer',
    category: 'Performance',
    featured: true,
    technologies: [
      'Next.js',
      'Nuxt.js',
      'Node.js',
      'React.js',
      'Vue.js',
      'TypeScript',
      'Tailwind CSS',
      'Decap CMS',
    ],
    keyFeatures: [
      '30% improvement in load times',
      'Code splitting and lazy loading optimization',
      'WCAG 2.1 AA compliance across 5+ apps',
      'Structured data and semantic HTML',
      'SEO optimization and meta tags',
      'Decap CMS schema refactoring',
      'Editorial workflow improvement (50%+)',
    ],
    metrics: [
      { label: 'Apps Migrated', value: '3' },
      { label: 'Performance Gain', value: '30%' },
      { label: 'Accessibility Apps', value: '5+' },
      { label: 'Workflow Improvement', value: '50%+' },
    ],
  },
  {
    id: 'web-crawler-dashboard',
    title: 'Web Crawler Dashboard',
    description: 'Full-stack URL analyzer with Go/Gin backend and React dashboard for real-time link analysis and status monitoring.',
    fullDescription:
      'Built a comprehensive full-stack URL analyser with a Go/Gin backend and React dashboard. Features real-time crawl status monitoring, detects broken links, analyzes heading structure, identifies login forms, and includes JWT authentication. Deployed with Docker containerization and CI/CD integration.',
    role: 'Full Stack Developer',
    category: 'Open Source',
    featured: true,
    technologies: ['React.js', 'Go', 'Gin', 'Docker', 'JWT', 'PostgreSQL', 'TypeScript'],
    keyFeatures: [
      'Go/Gin backend for high-performance crawling',
      'React dashboard with real-time updates',
      'Broken link detection and reporting',
      'Heading structure analysis',
      'Login form detection',
      'JWT authentication',
      'Docker containerization',
    ],
    links: {
      github: 'https://github.com/saqibroy/web-crawler-dashboard',
    },
    metrics: [
      { label: 'GitHub Stars', value: 'Open Source' },
      { label: 'Technology Stack', value: 'Full Stack' },
    ],
  },
  {
    id: 'accessibility-microservice',
    title: 'Accessibility Microservice',
    description: 'Lightweight WCAG 2.1 A/AA scanner that audits static HTML without a headless browser.',
    fullDescription:
      'Developed a lightweight WCAG 2.1 A/AA scanner microservice using Node.js and JSDOM. Audits static HTML without requiring a headless browser, making it efficient and fast. Powers AI-enriched accessibility reports and integrations.',
    role: 'Full Stack Developer',
    category: 'Open Source',
    featured: false,
    technologies: ['Node.js', 'JSDOM', 'WCAG 2.1', 'TypeScript'],
    keyFeatures: [
      'WCAG 2.1 A/AA compliance checking',
      'Static HTML analysis without headless browser',
      'Efficient and lightweight',
      'AI-enriched accessibility reports',
      'Easy integration',
    ],
    links: {
      github: 'https://github.com/saqibroy/accessibility-check-microservice',
    },
    metrics: [
      { label: 'Standard', value: 'WCAG 2.1 A/AA' },
      { label: 'Approach', value: 'Lightweight' },
    ],
  },
  {
    id: 'jobs-tracker-bot',
    title: 'Jobs Tracker Bot',
    description: 'Async aggregator monitoring 11 remote job boards, classifying NGO roles with Discord/Telegram alerts.',
    fullDescription:
      'Built an async job aggregator that monitors 11 remote job boards, automatically classifies NGO-specific roles, and sends rich alerts to Discord and Telegram. Deployed with CI/CD to Oracle Cloud using GitHub Actions and Docker containerization.',
    role: 'Full Stack Developer',
    category: 'Open Source',
    featured: false,
    technologies: ['Python', 'GitHub Actions', 'Docker', 'Discord API', 'Telegram API', 'Oracle Cloud'],
    keyFeatures: [
      'Monitors 11 remote job boards',
      'Automatic NGO role classification',
      'Discord and Telegram notifications',
      'Rich alert formatting',
      'GitHub Actions CI/CD',
      'Docker containerization',
      'Oracle Cloud deployment',
    ],
    links: {
      github: 'https://github.com/saqibroy/jobs-tracker-bot',
    },
    metrics: [
      { label: 'Job Boards', value: '11+' },
      { label: 'Alerts Channels', value: 'Discord, Telegram' },
    ],
  },
  {
    id: 'einbuerger-coach',
    title: 'Einbürger Coach - German Citizenship Test Trainer',
    description: 'Live citizenship test prep app with 310 questions, spaced repetition, and achievement badges.',
    fullDescription:
      'Developed a live citizenship test preparation application at einbuergercoach.de with 310 test questions. Implements spaced repetition learning algorithms and achievement badges for gamified learning. Built with React and Firestore for real-time data synchronization.',
    role: 'Full Stack Developer',
    category: 'Web Development',
    featured: false,
    technologies: ['React.js', 'Firestore', 'Firebase', 'TypeScript', 'Tailwind CSS'],
    keyFeatures: [
      '310 citizenship test questions',
      'Spaced repetition learning algorithm',
      'Achievement badges and gamification',
      'Real-time sync with Firestore',
      'Progress tracking',
      'Mobile responsive design',
    ],
    links: {
      live: 'https://einbuergercoach.de',
      github: 'https://github.com/saqibroy/german-citizenship-test-trainer',
    },
    metrics: [
      { label: 'Questions', value: '310' },
      { label: 'Live Site', value: 'einbuergercoach.de' },
    ],
  },
  {
    id: 'german-b1-trainer',
    title: 'German B1 Exam Trainer',
    description: 'Comprehensive exam prep tool with 7 exercise types, spaced repetition, and 4 mastery levels.',
    fullDescription:
      'Built an exam preparation tool for German B1 level students with 7 different exercise types. Features spaced repetition across 4 mastery levels and configurable practice sessions for personalized learning experiences.',
    role: 'Full Stack Developer',
    category: 'Web Development',
    featured: false,
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Firestore'],
    keyFeatures: [
      '7 different exercise types',
      'Spaced repetition algorithm',
      '4 mastery levels',
      'Configurable practice sessions',
      'Progress tracking',
      'Mobile responsive',
    ],
    links: {
      github: 'https://github.com/saqibroy/trainer',
    },
    metrics: [
      { label: 'Exercise Types', value: '7' },
      { label: 'Mastery Levels', value: '4' },
    ],
  },
];

/**
 * Helper function to get a project by ID
 */
export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

/**
 * Helper function to get all featured projects
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

/**
 * Helper function to get projects by category
 */
export function getProjectsByCategory(
  category: 'Web Development' | 'Performance' | 'Full Stack' | 'DevOps' | 'Open Source' | 'AI/ML'
): Project[] {
  return projects.filter((project) => project.category === category);
}

/**
 * Helper function to get all open source projects
 */
export function getOpenSourceProjects(): Project[] {
  return projects.filter((project) => project.category === 'Open Source' && project.links?.github);
}
