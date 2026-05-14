/**
 * Professional Bio and About Information
 * Comprehensive personal branding content
 * Updated from CV: Saqib Sohail - Full-Stack Engineer
 */

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface AchievementMetric {
  label: string;
  value: string;
  description: string;
}

export const professionalBio = {
  title: 'Full-Stack Engineer',
  headline: 'Architecting scalable web applications with React, FastAPI, TypeScript, and AI-driven workflows',
  summary: `I'm a full-stack engineer specializing in modern web architecture, AI integration, and WCAG-compliant user experiences. With 8+ years of experience, I've architected contract editors with LLM pipelines, migrated legacy applications to JAMstack, and built microservices at scale.`,
  
  longBio: `I'm Saqib Sohail, a full-stack engineer with 8+ years of experience building scalable, accessible web applications. At Velsa Technologies, I architect headless document editors, conversational AI platforms, and payment-integrated systems using React, FastAPI, Django, and LLM pipelines. 

Previously at Tactical Tech NGO, I migrated 3 legacy applications to Next.js/Nuxt.js, reducing load times by 30%, and achieved WCAG 2.1 AA compliance across 5+ applications. I'm passionate about clean code, inclusive design, open-source contribution, and building systems that work for everyone.

Throughout my career, I've developed expertise in:
- Modern JavaScript/TypeScript frameworks (React, Next.js, Vue.js, Nuxt.js)
- Backend development with Node.js, FastAPI, Django, Ruby on Rails
- AI/LLM integration (LangChain, RAG Pipelines, Agentic Workflows)
- Full-stack application architecture and design patterns
- Web accessibility (WCAG 2.1 AA compliance) and inclusive design
- Performance optimization and Web Vitals
- DevOps practices and CI/CD pipelines (Docker, GitLab CI)
- Database design and query optimization (PostgreSQL, MongoDB, Vector DBs)

I believe in writing clean, maintainable code following SOLID principles and best practices. My approach emphasizes collaboration, continuous learning, and delivering solutions that make a real impact.

Currently based in Berlin, Germany. Always open to discussing new projects and creative ideas.`,

  location: 'Berlin, Germany',
  timezone: 'CET (UTC+1)',

  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/saqibroy',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/saqibroy',
      icon: 'linkedin',
    },
    {
      name: 'Website',
      url: 'https://ssohail.com',
      icon: 'globe',
    },
    {
      name: 'Email',
      url: 'mailto:saqib@ssohail.com',
      icon: 'mail',
    },
  ],

  achievements: [
    {
      label: 'Years Building Web Applications',
      value: '8+',
      description: 'Full-stack experience across multiple industries and scales',
    },
    {
      label: 'Performance Improvement',
      value: '30%',
      description: 'Load time reduction through legacy migrations and optimization',
    },
    {
      label: 'WCAG Compliance',
      value: '5+ Apps',
      description: 'WCAG 2.1 AA compliance across multiple applications',
    },
    {
      label: 'Platform Migrations',
      value: '3',
      description: 'Major migrations to modern stack (Next.js, Nuxt.js)',
    },
    {
      label: 'Open-Source Projects',
      value: '5+',
      description: 'Public repositories with real-world utility and adoption',
    },
    {
      label: 'Technologies Mastered',
      value: '20+',
      description: 'Across frontend, backend, DevOps, and AI/ML domains',
    },
  ] as AchievementMetric[],

  interests: [
    'Full-Stack Web Development',
    'AI & LLM Integration',
    'Web Accessibility & Inclusive Design',
    'Open-Source Technology',
    'Self-Hosted Systems',
    'DevOps & Infrastructure',
    'Traveling',
    'Mentoring & Technical Leadership',
  ],

  education: [
    {
      institution: 'Technische Universität Berlin',
      field: 'M.Sc. Computer Science (Coursework)',
      description: 'Machine Learning, Database Systems, Computer Graphics (Three.js/WebGL), Advanced Web Development',
      year: '2017 - 2020',
    },
    {
      institution: 'GIFT University',
      field: 'B.Sc. Computer Science',
      description: 'OOP, Data Structures, Database Systems, Web Programming, Software Engineering',
      year: '2011 - 2015',
    },
  ],

  certifications: [
    {
      name: 'WCAG 2.1 Accessibility Compliance',
      issuer: 'Professional Practice & Tactical Tech',
    },
    {
      name: 'Full-Stack JavaScript Development',
      issuer: 'Professional Experience',
    },
    {
      name: 'LLM & AI Integration Workflows',
      issuer: 'Professional Practice',
    },
  ],

  callToAction: {
    title: 'Let\'s Build Something Great Together',
    description: 'I\'m interested in discussing projects involving modern web architecture, AI integration, accessibility, or DevOps challenges.',
    primaryCTA: {
      text: 'Get In Touch',
      href: 'mailto:saqib@ssohail.com',
    },
    secondaryCTA: {
      text: 'View My Work',
      href: '/projects',
    },
  },
};

export const workExperience = [
  {
    id: 'velsa-current',
    role: 'Senior Full-Stack Engineer',
    company: 'Velsa Technologies',
    duration: '08/2025 - Present',
    type: 'Full Time',
    location: 'Berlin, Germany',
    locationType: 'On-site',
    description: 'Architecting headless systems and AI-powered platforms',
    highlights: [
      'Architected a headless contract editor in React with merge fields, inline option toolbars, and toggleable conditional clauses',
      'Built a conversational chatbot wizard that guides users through contract creation via structured Q&A, auto-populating documents via API',
      'Designed and deployed a FastAPI microservice for AI inference using multi-chain LLM pipeline (Google Gemini) with vector database retrieval (RAG)',
      'Integrated Stripe payment flows with webhook handling for contract purchase and download gating',
      'Developed Django backend for user management, contract storage, and multi-service API orchestration',
    ],
    technologies: ['React.js', 'FastAPI', 'Python', 'Django', 'Google Gemini', 'Stripe', 'PostgreSQL'],
  },
  {
    id: 'tactical-tech',
    role: 'Front-End Developer',
    company: 'Tactical Tech (NGO)',
    duration: '08/2019 - 04/2025',
    type: 'Full Time',
    location: 'Berlin (Remote)',
    locationType: 'Remote',
    description: 'Building accessible JAMstack platforms and migrating legacy systems',
    highlights: [
      'Migrated 3 legacy applications to Next.js and Nuxt.js, reducing initial load times by 30% through code splitting and lazy loading',
      'Achieved WCAG 2.1 AA compliance across 5+ applications using ARIA roles, keyboard navigation, and Lighthouse audits',
      'Implemented structured data, semantic HTML, and meta tag strategies that increased organic search traffic',
      'Designed pixel-perfect responsive UIs using Tailwind CSS and Tachyons CSS across multiple projects',
      'Refactored Decap CMS schema architecture, eliminating query overhead and reducing editorial workflow time by 50%+',
    ],
    technologies: ['React.js', 'Vue.js', 'Next.js', 'Nuxt.js', 'TypeScript', 'WCAG 2.1', 'Decap CMS', 'Tailwind CSS'],
  },
  {
    id: 'durch-die-stadt',
    role: 'Full-Stack Developer (Working Student)',
    company: 'Durch die Stadt GmbH',
    duration: '06/2018 - 08/2019',
    type: 'Freelance',
    location: 'Berlin, Germany',
    locationType: 'On-site',
    description: 'Building RESTful APIs and immersive web experiences',
    highlights: [
      'Designed RESTful APIs in Ruby on Rails and integrated them with a Vue.js/Nuxt.js frontend using Vuex for state management',
      'Built modular, responsive UI components with Bulma CSS and BEM methodology for scalable, maintainable styling',
      'Developed immersive 360° city and retail exploration portals using Mapbox, Leaflet, and KRPano',
      'Maintained high test coverage with RSpec and Jest, enforcing code quality through CI pipelines',
    ],
    technologies: ['Ruby on Rails', 'Vue.js', 'Nuxt.js', 'PostgreSQL', 'Mapbox', 'RSpec', 'Jest'],
  },
  {
    id: 'turboad',
    role: 'PHP Developer (Working Student)',
    company: 'TurboAd GmbH',
    duration: '01/2018 - 05/2018',
    type: 'Freelance',
    location: 'Berlin, Germany',
    locationType: 'On-site',
    description: 'Building web applications with Symfony framework',
    highlights: [
      'Built web applications using Symfony 3 with Doctrine ORM for relational data modelling and query optimization',
      'Ensured code reliability through Test-Driven Development with PHPUnit, achieving high coverage on critical paths',
    ],
    technologies: ['Symfony 3', 'PHP 7', 'PHPUnit', 'Doctrine ORM', 'MySQL'],
  },
  {
    id: 'octasolutions',
    role: 'Ruby on Rails Developer (Freelance)',
    company: 'Octasolutions',
    duration: '01/2016 - 11/2016',
    type: 'Freelance',
    location: 'Gujranwala, Pakistan',
    locationType: 'Remote',
    description: 'Full-stack web application development',
    highlights: [
      'Built full-stack web applications with admin dashboards, role-based authentication, and responsive front-ends',
    ],
    technologies: ['Ruby on Rails', 'MySQL', 'JavaScript', 'Bootstrap'],
  },
];

export const skillsHighlight = {
  frontend: [
    'React.js',
    'Next.js',
    'Vue.js',
    'Nuxt.js',
    'TypeScript',
    'Tailwind CSS',
    'WCAG 2.1 Accessibility',
    'Framer Motion',
  ],
  backend: [
    'Node.js',
    'FastAPI',
    'Django',
    'Ruby on Rails',
    'Symfony',
    'GraphQL',
    'PostgreSQL',
    'MongoDB',
  ],
  devops: [
    'Docker',
    'GitLab CI/CD',
    'GitHub Actions',
    'Jest',
    'Vitest',
    'RSpec',
    'PHPUnit',
  ],
  soft: [
    'Problem Solving',
    'Technical Leadership',
    'Mentoring & Teaching',
    'Cross-functional Communication',
    'Project Architecture',
    'AI/ML Integration',
  ],
};

/**
 * Languages
 */
export const languages = [
  { language: 'English', level: 'Fluent', code: 'en' },
  { language: 'German', level: 'Basic', code: 'de' },
  { language: 'Urdu/Panjabi', level: 'Native', code: 'ur' },
];

/**
 * Volunteer & Leadership
 */
export const volunteerExperience = [
  {
    role: 'President',
    organization: 'Pakistan Student Association',
    duration: '09/2018 - 09/2019',
    location: 'Berlin, Germany',
    description: 'Organized welcome events for 100+ new students; coordinated sports events including cricket tournaments',
  },
  {
    role: 'Emergency Volunteer',
    organization: 'Punjab Emergency Service (Rescue 1122)',
    duration: '09/2012 - 10/2012',
    location: 'Gujranwala, Pakistan',
    description: 'Basic Life Support and Fire Safety training; practical experience in first aid (CPR) and emergency response',
  },
];
