'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Layout from '@/components/Layout';

const ExperienceCard = ({ title, company, duration, location, type, items, index, locationType }: {
  title: string;
  company: string;
  duration: string;
  location: string;
  type: string;
  items: string[];
  index: number;
  locationType?: string | null;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const shouldReduceMotion = useReducedMotion();

  // Helper function to determine gradient based on job type  
  const getGradient = (type: string) => {
    if (type === 'Full Time') return 'from-blue-800/30 to-transparent';
    if (type === 'Working Student') return 'from-purple-800/30 to-transparent';
    if (type === 'Freelance') return 'from-teal-800/30 to-transparent';
    return 'from-gray-700/30 to-transparent';
  };
  
  // Helper function for job type styling
  const getJobTypeStyles = (type: string) => {
    if (type === 'Full Time') return 'bg-blue-900/40 text-blue-300 ring-1 ring-blue-700';
    if (type === 'Working Student') return 'bg-purple-900/40 text-purple-300 ring-1 ring-purple-700';
    if (type === 'Freelance') return 'bg-teal-900/40 text-teal-300 ring-1 ring-teal-700';
    return 'bg-gray-800 text-gray-300 ring-1 ring-gray-700';
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: shouldReduceMotion ? 0.3 : 0.5, delay: index * 0.1 }}
      className="mb-8 overflow-hidden rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300 shadow-lg shadow-black/20"
    >
      {/* Gradient header based on job type */}
      <div className={`bg-gradient-to-r ${getGradient(type)} h-1.5 w-full`}></div>
      
      <div className="p-6">
        {/* Grid layout for header section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          {/* Title and company section - takes more space */}
          <div className="md:col-span-8">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <div className="text-lg text-blue-400 mt-1 flex flex-wrap items-center">
              {company.includes('(NGO') ? (
                <>
                  <span>{company.replace('(NGO)', '').trim()}</span>
                  <span className="ml-2 px-2 py-0.5 rounded-md text-xs font-medium bg-blue-900/20 text-blue-300 ring-1 ring-blue-800/30">NGO</span>
                </>
              ) : (
                company
              )}
            </div>
            
            {/* Location with icon */}
            <div className="mt-3 flex items-center text-gray-400">
              <svg className="w-4 h-4 text-gray-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium text-gray-300">{location}</span>
            </div>
          </div>
          
          {/* Right column for duration and badges */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end justify-between">
            {/* Duration in prominent position */}
            <div className="px-3 py-2 bg-gray-800/80 rounded-lg text-gray-200 font-mono text-sm inline-flex items-center mb-3 ring-1 ring-gray-700">
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {duration}
            </div>
            
            {/* Stacked badges */}
            <div className="flex flex-wrap gap-2 justify-start md:justify-end">
               {/* Location Type Badge (Remote/Onsite) */}
              {locationType && (
                <span className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-800 text-gray-300 ring-1 ring-gray-700">
                  {locationType}
                </span>
              )}
              {company.includes('(NGO') && (
                <span className="px-3 py-1 rounded-lg text-xs font-medium bg-blue-900/20 text-blue-300 ring-1 ring-blue-800/30">NGO</span>
              )}
              {type && (
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getJobTypeStyles(type)}`}>
                  {type}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent mb-5"></div>
        
        {/* Enhanced bullet points */}
        <ul className="space-y-3">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.3, delay: 0.2 + i * 0.1 }}
              className="flex items-start group"
            >
              <div className="mt-1.5 mr-3 w-2 h-2 rounded-full bg-gray-700 border border-gray-600 group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors duration-200"></div>
              <span className="text-gray-300 group-hover:text-white transition-colors duration-200">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};



const SkillsVisualization = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Frontend Development");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const categories = [
    {
      name: "Frontend Development",
      color: "#3B82F6",
      icon: "💻",
      skills: [
        { name: "React.js & Next.js", level: "Expert", description: "Building performant, accessible UIs with modern React patterns, SSR, and performance optimization" },
        { name: "TypeScript", level: "Expert", description: "Writing type-safe, maintainable code with strict type checking and advanced type system features" },
        { name: "Vue.js & Nuxt.js", level: "Advanced", description: "Developing scalable applications with Vue ecosystem and server-side rendering" },
        { name: "Tailwind CSS & CSS Frameworks", level: "Expert", description: "Creating responsive, utility-first designs with modern CSS and building design systems" },
        { name: "GraphQL & Apollo", level: "Advanced", description: "Building efficient data fetching layers with type-safe queries and client-side caching" },
        { name: "Web Accessibility (WCAG 2.1)", level: "Expert", description: "Implementing WCAG 2.1 AA compliance with ARIA labels, keyboard navigation, and screen reader support" }
      ]
    },
    {
      name: "Backend Development",
      color: "#10B981",
      icon: "⚙️",
      skills: [
        { name: "Python & FastAPI", level: "Advanced", description: "Building high-performance APIs and microservices with modern async patterns" },
        { name: "Node.js & Express", level: "Expert", description: "Creating scalable APIs and microservices with Express, Fastify, and related frameworks" },
        { name: "Ruby on Rails", level: "Advanced", description: "Developing full-stack applications with MVC architecture and Rails conventions" },
        { name: "Django", level: "Advanced", description: "Building robust web applications with Django ORM and RESTful API design" },
        { name: "LLM & AI Integration", level: "Competent", description: "LangChain, Google Gemini, RAG Pipelines, agentic workflows, and multi-chain LLM systems" },
        { name: "PostgreSQL & MongoDB", level: "Expert", description: "Designing efficient schemas, optimizing queries, and managing both SQL and NoSQL databases" }
      ]
    },
    {
      name: "Software Engineering & DevOps",
      color: "#8B5CF6",
      icon: "🚀",
      skills: [
        { name: "Docker & Containerization", level: "Advanced", description: "Containerizing applications for consistent deployments and managing microservices" },
        { name: "CI/CD & GitLab CI", level: "Expert", description: "Implementing automated deployment pipelines with testing gates and production-ready workflows" },
        { name: "Testing & Quality Assurance", level: "Expert", description: "Jest, Vitest, RSpec, PHPUnit - ensuring code quality with automated testing and TDD" },
        { name: "Performance Optimization", level: "Expert", description: "Code splitting, lazy loading, caching strategies, and comprehensive performance analysis" },
        { name: "RESTful API & GraphQL Design", level: "Expert", description: "Designing efficient, scalable APIs with proper versioning, error handling, and documentation" },
        { name: "Software Engineering Principles", level: "Expert", description: "SOLID principles, DRY, KISS, YAGNI - writing maintainable and scalable code" }
      ]
    }
  ];

  return (
    <div className="relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>

      {/* Main Content */}
      <div className="relative space-y-8">
        {/* Category Selector */}
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.name
                  ? 'bg-blue-800 text-blue-300 shadow-lg shadow-blue-800/20'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800/70'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Skills Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categories
              .find((cat) => cat.name === activeCategory)
              ?.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.3,
                    delay: index * 0.1,
                  }}
                  className="relative group"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          skill.level === "Expert"
                            ? "bg-blue-900/30 text-blue-300"
                            : "bg-green-900/30 text-green-300"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                    <AnimatePresence>
                      {hoveredSkill === skill.name && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-gray-400 text-sm"
                        >
                          {skill.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    tech: string[];
    github?: string | null;
    live?: string | null;
  };
  variants?: {
    hidden: { opacity: number; y: number };
    visible: {
      opacity: number;
      y: number;
      transition: { duration: number };
    };
  };
  custom?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, variants, custom }) => {
  return (
    <motion.div
      variants={variants}
      custom={custom}
      className="overflow-hidden rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300 shadow-lg shadow-black/20 flex flex-col h-full"
    >
      {/* Gradient header */}
      <div className={`bg-gradient-to-r from-blue-800/30 to-transparent h-1.5 w-full`}></div>

      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
        <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-lg text-xs font-medium bg-blue-900/40 text-blue-300 ring-1 ring-blue-700"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4 mt-auto">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const CVPage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const experienceData = [
    {
      title: "Senior Full-Stack Engineer",
      company: "Velsa Technologies",
      duration: "08/2025 - Present",
      location: "Berlin, Germany",
      locationType: "Onsite",
      type: "Full Time",
      items: [
        "Architected a headless contract editor in React with merge fields, inline option toolbars, and toggleable conditional clauses.",
        "Built a conversational chatbot wizard guiding users through contract creation via structured Q&A, auto-populating documents via API.",
        "Designed and deployed a FastAPI microservice for AI inference using multi-chain LLM pipeline (Google Gemini) with vector database retrieval (RAG).",
        "Integrated Stripe payment flows with webhook handling for contract purchase and download gating.",
        "Developed Django backend for user management, contract storage, and multi-service API orchestration.",
        "Tech Stack: React.js • FastAPI • Python • Django • Google Gemini • Stripe",
      ],
    },
    {
      title: "Front-End Developer",
      company: "Tactical Tech (NGO)",
      duration: "08/2019 - 04/2025",
      location: "Berlin, Germany",
      locationType: "Remote",
      type: "Full Time",
      items: [
        "Migrated 3 legacy applications to Next.js and Nuxt.js, reducing initial load times by 30% through code splitting and lazy loading.",
        "Achieved WCAG 2.1 AA compliance across 5+ applications using ARIA roles, keyboard navigation, and Lighthouse audits.",
        "Implemented structured data, semantic HTML, and meta tag strategies that increased organic search traffic.",
        "Designed pixel-perfect responsive UIs using Tailwind CSS and Tachyons CSS across multiple projects.",
        "Refactored Decap CMS schema architecture, eliminating query overhead and reducing editorial workflow time by 50%+.",
      ],
    },
    {
      title: "Full-Stack Developer",
      company: "Durch die Stadt GmbH",
      duration: "06/2018 - 08/2019",
      location: "Berlin, Germany",
      locationType: "Onsite",
      type: "Working Student",
      items: [
        "Designed and developed RESTful APIs using Ruby on Rails, seamlessly integrating them with Vue.js.",
        "Built responsive and modular UI components using Bulma CSS and BEM methodology.",
        "Developed immersive 360° city/retail portals using Mapbox, Leaflet, and KRPano.",
        "Implemented a profile completion progress bar with a custom formula-based algorithm.",
        "Wrote clean, robust, and scalable code, following best practices and maintaining high test coverage.",
        "Managed tasks and collaborated with cross-functional teams using Agile methodologies in Trello.",
      ],
    },
    {
      title: "PHP Developer",
      company: "TurboAd GmbH",
      duration: "01/2018 - 05/2018",
      location: "Berlin, Germany",
      locationType: "Onsite",
      type: "Working Student",
      items: [
        "Designed and developed robust web applications using Symfony 3, leveraging Doctrine ORM for efficient data management.",
        "Built responsive and user-friendly front-end interfaces using Ionic Framework and Bootstrap.",
        "Ensured high code quality and reliability through Test-Driven Development (TDD) with PHPUnit.",
        "Collaborated with cross-functional teams using Jira to deliver projects on time and within scope.",
      ],
    },
    {
      title: "Ruby on Rails Web Developer",
      company: "Octasolutions",
      duration: "01/2016 - 11/2016",
      location: "Gujranwala, Pakistan",
      locationType: "Onsite",
      type: "Freelance",
      items: [
        "Developed full-stack web applications from scratch using Ruby on Rails, implementing features like user authentication and e-commerce functionalities.",
        "Designed and optimized database architectures for scalable applications, utilizing multiple databases.",
        "Built responsive and intuitive user interfaces using Twitter Bootstrap, custom CSS, and JavaScript.",
      ],
    },
  ];

  const educationData = [
    {
      degree: "M.Sc. Computer Science Coursework",
      institution: "Technische Universität Berlin",
      duration: "04/2017 - 12/2020",
      location: "Berlin, Germany",
      details: "Completed advanced coursework in Machine Learning I, Database Systems and Implementations, Computer Graphics (Three.js and WebGL), Advanced Web Development.",
    },
    {
      degree: "B.Sc. Computer Science",
      institution: "GIFT University",
      duration: "09/2011 - 10/2015",
      location: "Gujranwala, Pakistan",
      details: "Specialized in Software Development, with coursework in Programming Fundamentals, Object-Oriented Programming, Data Structures, Database Systems, Web Programming, and Software Engineering.",
    },
  ];

  const trainingData = [
    {
      title: "German B1 Certificate",
      institution: "Language Proficiency Certification",
      duration: "2025",
      location: "Germany",
      details: "Achieved B1 (Upper-Intermediate) proficiency level in German language, demonstrating advanced conversational and professional communication abilities.",
    },
    {
      title: "Basic Life Support & Fire Safety Course",
      institution: "Punjab Emergency Service (Rescue 1122)",
      duration: "09/2012 - 10/2012",
      location: "Gujranwala, Pakistan",
      details: "Gained practical experience in first aid (including CPR) and fire emergency response as an active volunteer on emergency teams.",
    },
  ];

  const leadershipData = [
    {
      title: "President",
      organization: "Pakistan Student Association",
      duration: "09/2018 - 09/2019",
      location: "Berlin, Germany",
      details: [
        "Organized welcome events for over 100 new students.",
        "Managed and coordinated various sports events, including cricket tournaments.",
      ],
    },
    {
      title: "Organizer",
      organization: "GIFT University Societies",
      duration: "11/2013 - 10/2015",
      location: "Gujranwala, Pakistan",
      details: [
        "Coordinated annual sports galas, overseeing all logistical aspects.",
        "Assisted in overall event management logistics for various university society activities.",
      ],
    },
  ];

  const languagesData = [
    { lang: "English", proficiency: "Fluent" },
    { lang: "German", proficiency: "B1 (Upper-Intermediate)" },
    { lang: "Urdu/Panjabi", proficiency: "Native" },
  ];

  const interestsData = [
    "Open-Source Tech",
    "Self-Hosted Systems",
    "Traveling",
  ];

  const featuredProjectsData = [
    {
      title: "Headless Contract Editor",
      description: "A document editor with dynamic merge fields and conditional clauses, integrated with an LLM pipeline to automate contract generation.",
      tech: ["React", "FastAPI", "LLM", "Stripe"],
      github: null,
      live: null,
    },
    {
      title: "AI Chatbot Platform",
      description: "Multi-chain agentic LLM pipeline with self-correction loops, vector DB retrieval, and microservice architecture.",
      tech: ["LangChain", "RAG", "Django", "FastAPI"],
      github: null,
      live: null,
    },
    {
      title: "JAMstack Platform",
      description: "Developed and maintained JAMstack architecture using Decap CMS and custom Node.js API powering React frontends.",
      tech: ["Next.js", "Node.js", "Decap CMS"],
      github: null,
      live: null,
    },
    {
      title: "GDPR Consent Manager",
      description: "Centralised consent management system ensuring WCAG compliance across 5+ web applications.",
      tech: ["Next.js", "TypeScript", "WCAG 2.1"],
      github: null,
      live: null,
    },
    {
      title: "Portfolio Website",
      description: "A modern portfolio website showcasing projects and expertise with responsive design and smooth animations.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/saqibroy/saqib-portfolio-next",
      live: "https://ssohail.com",
    },
    {
      title: "Solar Facility Dashboard",
      description: "Full-stack application for managing solar facilities, uploading performance data via CSV files, and visualizing facility performance through interactive charts.",
      tech: ["React", "TypeScript", "Material UI", "Apollo GraphQL", "MongoDB"],
      github: "https://github.com/saqibroy/solar-facility-dashboard",
      live: null,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 mt-16">
        {/* Skills Visualization Section */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.5 : 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
          >
            Skills
          </motion.h2>
          <SkillsVisualization />
        </section>

        {/* Experience Section */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.5 : 0.8, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
          >
            Experience
          </motion.h2>
          <div>
            {experienceData.map((exp, index) => (
              <ExperienceCard key={index} {...exp} index={index} />
            ))}
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.5 : 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjectsData.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>

        {/* Open Source Section */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.5 : 0.8, delay: 0.25 }}
            className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
          >
            Open Source
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "jobs-tracker-bot",
                description: "Fully async Python bot monitoring 11 remote job boards for full-stack developer positions in EU/Germany. Smart filtering by location and role, NGO classification, match scoring (0-100%), Discord/Telegram notifications with color-coded embeds.",
                tech: ["Python", "FastAPI", "Discord.py", "Playwright", "BeautifulSoup"],
                github: "https://github.com/saqibroy/jobs-tracker-bot",
                live: null,
              },
              {
                title: "deutsch-b1-vokab",
                description: "DeutschTrainer — B1 Vocabulary Practice PWA. Mobile-first progressive web app for German B1 (telc) vocabulary. Flashcard and type-answer modes, smart spaced repetition, performance tracking, category filtering, offline support, dark theme.",
                tech: ["JavaScript", "CSS", "HTML5", "PWA"],
                github: "https://github.com/saqibroy/deutsch-b1-vokab",
                live: null,
              },
              {
                title: "accessibility-check-microservice",
                description: "Lightweight Node.js microservice for static accessibility analysis using axe-core and JSDOM. WCAG 2.1 A/AA compliance checks, robust HTML fetching, comprehensive error handling, CORS enabled, graceful shutdown.",
                tech: ["Node.js", "Express.js", "Axe-core", "JSDOM"],
                github: "https://github.com/saqibroy/accessibility-check-microservice",
                live: null,
              },
              {
                title: "servdubai-astro",
                description: "Modern Astro website for ServDubai, Dubai's premier building services. Targets new apartment residents and building management. Multiple service listings, AMC packages, booking forms, responsive mobile-first design, emerald/teal color scheme.",
                tech: ["TypeScript", "Astro", "React", "Tailwind CSS", "Framer Motion"],
                github: "https://github.com/saqibroy/servdubai-astro",
                live: null,
              },
              {
                title: "ai-tts-service",
                description: "High-quality text-to-speech microservice using FastAPI and Google Cloud TTS API. Multiple neural voices, adjustable speed (0.25x-4.0x) and pitch (-20 to +20), WAV audio download, CORS enabled, free deployment on Render.",
                tech: ["Python", "FastAPI", "Google Cloud TTS"],
                github: "https://github.com/saqibroy/ai-tts-service",
                live: null,
              },
              {
                title: "rpi-homelab-stack",
                description: "Comprehensive Docker Compose setup for Raspberry Pi homelab. Pi-hole (network-wide ad blocking), Nextcloud (self-hosted cloud), Home Assistant (automation), Frigate (AI-powered NVR), CodeProject.AI (local AI processing), MySQL.",
                tech: ["Docker Compose", "YAML", "Linux"],
                github: "https://github.com/saqibroy/rpi-homelab-stack",
                live: null,
              },
            ].map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.5 : 0.8, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
          >
            Education
          </motion.h2>
          <div className="space-y-6">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.3 : 0.5, delay: 0.3 + index * 0.1 }}
                className="mb-8 overflow-hidden rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300 shadow-lg shadow-black/20"
              >
                 {/* Gradient header */}
                 <div className={`bg-gradient-to-r from-blue-800/30 to-transparent h-1.5 w-full`}></div>

                <div className="p-6">
                  {/* Grid layout for header section */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
                    {/* Title and institution section */}
                    <div className="md:col-span-8">
                      <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                      <p className="text-lg text-blue-400 mt-1">{edu.institution}</p>
                       {/* Location with icon */}
                        <div className="mt-3 flex items-center text-gray-400">
                          <svg className="w-4 h-4 text-gray-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="font-medium text-gray-300">{edu.location}</span>
                        </div>
                    </div>

                    {/* Right column for duration */}
                    <div className="md:col-span-4 flex flex-col items-start md:items-end justify-between">
                       {/* Duration in prominent position */}
                        <div className="px-3 py-2 bg-gray-800/80 rounded-lg text-gray-200 font-mono text-sm inline-flex items-center mb-3 ring-1 ring-gray-700">
                          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {edu.duration}
                        </div>
                    </div>
                  </div>

                   {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent mb-5"></div>

                  {/* Details */}
                  <p className="text-gray-300 text-sm">{edu.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Training Section */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.5 : 0.8, delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
          >
            Training
          </motion.h2>
          <div className="space-y-6">
            {trainingData.map((training, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.3 : 0.5, delay: 0.4 + index * 0.1 }}
                className="mb-8 overflow-hidden rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300 shadow-lg shadow-black/20"
              >
                 {/* Gradient header */}
                 <div className={`bg-gradient-to-r from-purple-800/30 to-transparent h-1.5 w-full`}></div>

                <div className="p-6">
                  {/* Grid layout for header section */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
                    {/* Title and institution section */}
                    <div className="md:col-span-8">
                      <h3 className="text-xl font-bold text-white">{training.title}</h3>
                      <p className="text-lg text-blue-400 mt-1">{training.institution}</p>
                       {/* Location with icon */}
                        <div className="mt-3 flex items-center text-gray-400">
                          <svg className="w-4 h-4 text-gray-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="font-medium text-gray-300">{training.location}</span>
                        </div>
                    </div>

                    {/* Right column for duration */}
                    <div className="md:col-span-4 flex flex-col items-start md:items-end justify-between">
                       {/* Duration in prominent position */}
                        <div className="px-3 py-2 bg-gray-800/80 rounded-lg text-gray-200 font-mono text-sm inline-flex items-center mb-3 ring-1 ring-gray-700">
                          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {training.duration}
                        </div>
                    </div>
                  </div>

                   {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent mb-5"></div>

                  {/* Details */}
                  <p className="text-gray-300 text-sm">{training.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Leadership Section */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.5 : 0.8, delay: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
          >
            Leadership
          </motion.h2>
          <div className="space-y-6">
            {leadershipData.map((lead, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.3 : 0.5, delay: 0.5 + index * 0.1 }}
                className="mb-8 overflow-hidden rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300 shadow-lg shadow-black/20"
              >
                 {/* Gradient header */}
                 <div className={`bg-gradient-to-r from-teal-800/30 to-transparent h-1.5 w-full`}></div>

                <div className="p-6">
                  {/* Grid layout for header section */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
                    {/* Title and organization section */}
                    <div className="md:col-span-8">
                      <h3 className="text-xl font-bold text-white">{lead.title}</h3>
                      <p className="text-lg text-blue-400 mt-1">{lead.organization}</p>
                       {/* Location with icon */}
                        <div className="mt-3 flex items-center text-gray-400">
                          <svg className="w-4 h-4 text-gray-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="font-medium text-gray-300">{lead.location}</span>
                        </div>
                    </div>

                    {/* Right column for duration */}
                    <div className="md:col-span-4 flex flex-col items-start md:items-end justify-between">
                       {/* Duration in prominent position */}
                        <div className="px-3 py-2 bg-gray-800/80 rounded-lg text-gray-200 font-mono text-sm inline-flex items-center mb-3 ring-1 ring-gray-700">
                          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {lead.duration}
                        </div>
                    </div>
                  </div>

                   {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent mb-5"></div>

                  {/* Details */}
                   <ul className="space-y-3">
                    {lead.details.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0.2 : 0.3, delay: 0.2 + i * 0.1 }}
                        className="flex items-start group"
                      >
                        <div className="mt-1.5 mr-3 w-2 h-2 rounded-full bg-gray-700 border border-gray-600 group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors duration-200"></div>
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-200">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Languages Section */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.5 : 0.8, delay: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
          >
            Languages
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {languagesData.map((lang, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.3 : 0.5, delay: 0.6 + index * 0.1 }}
                className="mb-8 overflow-hidden rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300 shadow-lg shadow-black/20 text-center"
              >
                 {/* Gradient header - based on proficiency */}
                 <div className={`bg-gradient-to-r ${lang.proficiency === "Native" ? "from-green-800/30" : lang.proficiency.includes("B1") ? "from-amber-800/30" : lang.proficiency === "Fluent" ? "from-blue-800/30" : "from-purple-800/30"} to-transparent h-1.5 w-full`}></div>

                <div className="p-6 flex flex-col items-center">
                  <h3 className="text-xl font-semibold text-white mb-2">{lang.lang}</h3>
                   <span
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${lang.proficiency === "Native" ? "bg-green-900/40 text-green-300 ring-1 ring-green-700" : lang.proficiency.includes("B1") ? "bg-amber-900/40 text-amber-300 ring-1 ring-amber-700" : lang.proficiency === "Fluent" ? "bg-blue-900/40 text-blue-300 ring-1 ring-blue-700" : "bg-purple-900/40 text-purple-300 ring-1 ring-purple-700"}`}
                    >
                      {lang.proficiency}
                    </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Interests Section */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.5 : 0.8, delay: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
          >
            Interests
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {interestsData.map((interest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: shouldReduceMotion ? 0.2 : 0.3, delay: 0.7 + index * 0.05 }}
                className="overflow-hidden rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300 shadow-lg shadow-black/20"
              >
                {/* Gradient header - Green */}
                 <div className={`bg-gradient-to-r from-green-600/30 to-transparent h-1 w-full`}></div> {/* Smaller header for smaller card */}
                 <div className="p-4 text-center">
                   <span className="text-gray-300 text-sm font-medium">{interest}</span>
                 </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CVPage; 