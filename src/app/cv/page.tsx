'use client'
import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Layout from '@/components/Layout';

const ExperienceCard = ({ title, company, duration, location, items, index }: {
  title: string;
  company: string;
  duration: string;
  location: string;
  items: string[];
  index: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: shouldReduceMotion ? 0.3 : 0.5, delay: index * 0.1 }}
      className="mb-8 p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4">
        <h3 className="text-xl font-bold text-blue-400">{title}</h3>
        <div className="text-sm text-gray-400">{duration}</div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between mb-4">
        <div className="text-lg text-white">{company}</div>
        <div className="text-sm text-gray-400">{location}</div>
      </div>
      <ul className="list-disc list-inside space-y-2">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.3, delay: 0.2 + i * 0.1 }}
            className="text-gray-300"
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

const SkillCard = ({ category, skills }: {
  category: string;
  skills: { name: string; description: string }[];
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: shouldReduceMotion ? 0.3 : 0.5 }}
      className="mb-8 p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
    >
      <motion.h3 
        className="text-xl font-bold text-blue-400 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.3, delay: 0.1 }}
      >
        {category}
      </motion.h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ 
              duration: shouldReduceMotion ? 0.2 : 0.3, 
              delay: 0.2 + index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={shouldReduceMotion ? {} : { 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className="relative p-6 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <motion.div
                className="w-16 h-16 mb-4 mx-auto relative"
                initial={{ scale: 0.8 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-700/50"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <motion.circle
                    className="text-blue-500"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    initial={{ strokeDasharray: "0 251.2" }}
                    animate={inView ? { strokeDasharray: "251.2 251.2" } : {}}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">
                    {category === "Frontend Development" && "💻"}
                    {category === "Backend Development" && "⚙️"}
                    {category === "DevOps & Tools" && "🚀"}
                  </span>
                </div>
              </motion.div>
              <motion.h4 
                className="text-white font-medium mb-2 text-center group-hover:text-blue-400 transition-colors"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                {skill.name}
              </motion.h4>
              <motion.p 
                className="text-gray-400 text-sm text-center group-hover:text-gray-300 transition-colors"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              >
                {skill.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
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
        { name: "React.js & Next.js", level: "Expert", description: "Building performant, accessible UIs with modern React patterns and SSR" },
        { name: "TypeScript", level: "Expert", description: "Writing type-safe, maintainable code with strict type checking" },
        { name: "Vue.js & Nuxt.js", level: "Advanced", description: "Developing scalable applications with Vue ecosystem" },
        { name: "Tailwind CSS", level: "Advanced", description: "Creating responsive, utility-first designs with modern CSS frameworks" },
        { name: "GraphQL & Apollo", level: "Advanced", description: "Building efficient data fetching layers with type-safe queries" },
        { name: "Figma", level: "Expert", description: "Designing and prototyping user interfaces, creating design systems, and implementing CSS-ready designs with proper spacing, typography, and responsive breakpoints" }
      ]
    },
    {
      name: "Backend Development",
      color: "#10B981",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: "Expert", description: "Building scalable APIs and microservices with Express and Fastify" },
        { name: "Ruby on Rails", level: "Advanced", description: "Developing full-stack applications with MVC architecture" },
        { name: "Symfony", level: "Advanced", description: "Creating robust PHP applications with modern frameworks" },
        { name: "OpenAPI", level: "Expert", description: "Designing and documenting RESTful APIs with Swagger/OpenAPI specifications" },
        { name: "GraphQL & Apollo", level: "Advanced", description: "Designing efficient GraphQL schemas, resolvers, and data processing pipelines for complex data requirements" },
        { name: "MongoDB", level: "Advanced", description: "Working with NoSQL databases and document-based data models" }
      ]
    },
    {
      name: "Software Engineering & DevOps",
      color: "#8B5CF6",
      icon: "🚀",
      skills: [
        { name: "Docker", level: "Advanced", description: "Containerizing applications for consistent deployments and development environments" },
        { name: "GitLab CI/CD", level: "Expert", description: "Implementing automated deployment pipelines with proper testing and quality gates" },
        { name: "Testing", level: "Expert", description: "Jest, Vitest, RSpec - Ensuring code quality with automated testing and TDD practices" },
        { name: "Optimization", level: "Expert", description: "Code splitting, lazy loading, and caching strategies for optimal performance" },
        { name: "Accessibility", level: "Expert", description: "Implementing WCAG guidelines, ARIA labels, screen reader support, and keyboard navigation" },
        { name: "Software Principles", level: "Expert", description: "Applying SOLID principles, DRY, KISS, and YAGNI for maintainable code" }
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
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
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
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-green-500/20 text-green-400"
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
      className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
    >
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm"
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
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
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
    </motion.div>
  );
};

const CVPage: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const shouldReduceMotion = useReducedMotion();

  const experiences = [
    {
      title: "Web Developer",
      company: "Tactical Tech",
      duration: "08/2019 - Present",
      location: "Berlin (Hybrid)",
      items: [
        "Modernized 3 legacy apps via Next.js and Nuxt.js migration, achieving 35% faster load times through code splitting and lazy loading.",
        "Drove Web Accessibility compliance across 5+ apps using ARIA roles, SR support, keyboard nav, and Lighthouse audits, reducing a11y defects by 70%",
        "Implemented SEO enhancements (structured data, semantic HTML, meta tags) boosting organic traffic by 40%",
        "Designed and developed end-to-end responsive website, implementing pixel-perfect CSS for components using Tailwind/Tachyons CSS",
        "Optimized state management using Zustand and Pinia with memoization techniques, reducing unnecessary re-renders by 40% in complex components",
        "Optimized Decap CMS workflows and enforced alt-text/SEO fields, cutting content team effort by 25%",
        "Led GDPR/accessibility compliance for privacy interfaces used by numerous monthly users"
      ]
    },
    {
      title: "Full-Stack Developer (part time)",
      company: "Durch die Stadt GmbH",
      duration: "06/2018 - 08/2019",
      location: "Berlin (Onsite)",
      items: [
        "Designed and developed RESTful APIs using Ruby on Rails, seamlessly integrating them with Vue.js frontend using Vuex and Nuxt.js",
        "Built responsive and modular UI components using Bulma CSS and BEM methodology, ensuring maintainable and scalable styles",
        "Developed immersive 360° city/retail portals using Mapbox, Leaflet, and KRPano, enhancing user engagement",
        "Implemented a profile completion progress bar with a custom formula-based algorithm, improving user experience",
        "Wrote clean, robust, and scalable code, following best practices and maintaining high test coverage with RSpec and Jest",
        "Managed tasks and collaborated with cross-functional teams using Agile methodologies in Trello and Factro"
      ]
    },
    {
      title: "PHP Developer (part time)",
      company: "TurboAd GmbH",
      duration: "01/2018 - 05/2018",
      location: "Berlin (Onsite)",
      items: [
        "Designed and developed robust web applications using Symfony 3, leveraging Doctrine ORM for efficient database management",
        "Built responsive and user-friendly front-end interfaces using Ionic Framework and Bootstrap, ensuring cross-device compatibility",
        "Ensured high code quality and reliability through Test-Driven Development (TDD) with PHPUnit",
        "Collaborated with cross-functional teams using Jira to deliver projects on time and within scope"
      ]
    },
    {
      title: "Ruby on Rails Web Developer (full time)",
      company: "Octasolutions",
      duration: "01/2016 - 11/2016",
      location: "Gujranwala (Onsite)",
      items: [
        "Developed full-stack web applications from scratch using Ruby on Rails, implementing features like admin panels, user authentication (login/logout), and sign-up functionality",
        "Designed and optimized database architectures for scalable applications, utilizing multiple databases and ensuring efficient data management",
        "Built responsive and intuitive user interfaces using Twitter Bootstrap, custom CSS, and JavaScript/jQuery, enhancing user experience"
      ]
    }
  ];

  const skills = [
    {
      category: "Frontend Development",
      skills: [
        {
          name: "React.js & Next.js",
          description: "Building performant, accessible UIs with modern React patterns and SSR"
        },
        {
          name: "TypeScript",
          description: "Writing type-safe, maintainable code with strict type checking"
        },
        {
          name: "Vue.js & Nuxt.js",
          description: "Developing scalable applications with Vue ecosystem"
        },
        {
          name: "Tailwind CSS",
          description: "Creating responsive, utility-first designs"
        },
        {
          name: "GraphQL & Apollo",
          description: "Building efficient data fetching layers with type-safe queries"
        }
      ]
    },
    {
      category: "Backend Development",
      skills: [
        {
          name: "Node.js",
          description: "Building scalable APIs and microservices"
        },
        {
          name: "Ruby on Rails",
          description: "Developing full-stack applications with MVC architecture"
        },
        {
          name: "Symfony",
          description: "Creating robust PHP applications with modern frameworks"
        },
        {
          name: "OpenAPI",
          description: "Designing and documenting RESTful APIs"
        },
        {
          name: "MongoDB",
          description: "Working with NoSQL databases and document-based data models"
        }
      ]
    },
    {
      category: "DevOps & Tools",
      skills: [
        {
          name: "Docker",
          description: "Containerizing applications for consistent deployments"
        },
        {
          name: "GitLab CI/CD",
          description: "Implementing automated deployment pipelines"
        },
        {
          name: "Testing",
          description: "Jest, Vitest, RSpec - Ensuring code quality with automated testing"
        },
        {
          name: "Performance Optimization",
          description: "Code splitting, lazy loading, and caching strategies"
        }
      ]
    }
  ];

  const education = [
    {
      title: "Graduate Coursework in Computer Science",
      institution: "TU Berlin",
      duration: "04/2017 - 12/2020",
      location: "Germany",
      description: "Advance Web Development & HCI"
    },
    {
      title: "B.Sc. Computer Science",
      institution: "GIFT University",
      duration: "09/2011 - 10/2015",
      location: "Pakistan",
      description: "Software Development"
    }
  ];

  const projects = [
    {
      title: 'Solar Facility Dashboard',
      description: 'A full-stack application for managing solar facilities, uploading performance data via CSV files, and visualizing facility performance through interactive charts.',
      tech: ['React', 'TypeScript', 'Material UI', 'Apollo GraphQL', 'MongoDB'],
      github: 'https://github.com/saqibroy/solar-facility-dashboard',
      live: null
    },
    {
      title: 'Renewable Energy Dashboard',
      description: 'A modern, scalable microfrontend application for monitoring renewable energy data with real-time analytics and visualization.',
      tech: ['React', 'Vue', 'TypeScript', 'Module Federation', 'Turborepo'],
      github: 'https://github.com/saqibroy/enewable-energy-dashboard',
      live: null
    },
    {
      title: 'Modern Todo App',
      description: 'A full-stack todo application with a modern UI, real-time updates, and user authentication.',
      tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
      github: 'https://github.com/saqibroy/modern-todo-app-react-ts',
      live: 'https://modern-todo-app-react-ts.vercel.app/'
    },
    {
      title: 'Todo App API',
      description: 'RESTful API backend for the todo application with JWT authentication and MongoDB integration.',
      tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      github: 'https://github.com/saqibroy/todo-app-api',
      live: 'https://todo-app-api-production-2b49.up.railway.app/todos'
    },
    {
      title: 'Virtual Currency Transfer App',
      description: 'A web application for virtual currency transfers with real-time updates and transaction history.',
      tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
      github: 'https://github.com/saqibroy/virtual-currency-transfer-app',
      live: null
    },
    {
      title: 'Notes App',
      description: 'A modern notes application with markdown support and real-time updates.',
      tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
      github: 'https://github.com/saqibroy/notes-app-react-vite',
      live: null
    },
    {
      title: 'Portfolio Website',
      description: 'A modern portfolio website built with Next.js, featuring a responsive design and smooth animations.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/saqibroy/saqib-portfolio-next',
      live: 'https://saqibroy.vercel.app'
    },
    {
      title: 'Into Cities',
      description: 'A platform for exploring and discovering cities around the world.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
      live: 'https://intocities.com',
      github: null
    },
    {
      title: 'Influence Industry',
      description: 'A platform analyzing the influence industry and its impact on society.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
      live: 'https://influenceindustry.org/',
      github: null
    },
    {
      title: 'Tactical Tech',
      description: 'A website for Tactical Tech, an organization working at the intersection of technology, human rights, and civil liberties.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
      live: 'https://tacticaltech.org',
      github: null
    },
    {
      title: 'Exposing the Invisible',
      description: 'A platform dedicated to investigative journalism and digital security.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
      live: 'https://exposingtheinvisible.org',
      github: null
    },
    {
      title: 'Digital Enquirer',
      description: 'A platform for digital investigations and research.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
      live: 'https://digitalenquirer.org',
      github: null
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const renderProjects = useCallback((project: typeof projects[0], index: number) => {
    return (
      <ProjectCard
        key={project.title}
        project={project}
        variants={itemVariants}
        custom={index}
      />
    );
  }, [itemVariants]);

  return (
    <Layout>
      <div className="relative min-h-screen flex flex-col">
        <div className="flex-grow relative z-10 px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.3 : 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Experience & Skills
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Full-stack developer and software engineer with a focus on building scalable applications with clean, optimized code.
              </p>
            </motion.div>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-blue-400">Skills</h2>
              <SkillsVisualization />
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-blue-400">Experience</h2>
              {experiences.map((exp, index) => (
                <ExperienceCard key={index} {...exp} index={index} />
              ))}
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-blue-400">Education</h2>
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0.3 : 0.5, delay: index * 0.1 }}
                  className="mb-8 p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4">
                    <h3 className="text-xl font-bold text-blue-400">{edu.title}</h3>
                    <div className="text-sm text-gray-400">{edu.duration}</div>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between mb-4">
                    <div className="text-lg text-white">{edu.institution}</div>
                    <div className="text-sm text-gray-400">{edu.location}</div>
                  </div>
                  <p className="text-gray-300">{edu.description}</p>
                </motion.div>
              ))}
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-blue-400">Languages</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { language: "English", level: "Fluent", description: "Professional Proficiency" },
                  { language: "German", level: "Intermediate", description: "Basic Proficiency" },
                  { language: "Urdu/Panjabi", level: "Native", description: "" }
                ].map((lang, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0.3 : 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
                  >
                    <h3 className="text-xl font-bold text-blue-400 mb-2">{lang.language}</h3>
                    <p className="text-white mb-1">{lang.level}</p>
                    {lang.description && <p className="text-gray-300">{lang.description}</p>}
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-blue-400">Projects</h2>
              <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {projects.map((project, index) => (
                  renderProjects(project, index)
                ))}
              </motion.div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CVPage; 