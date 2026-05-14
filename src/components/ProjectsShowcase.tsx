'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, BookOpen } from 'lucide-react';
import { projects, Project } from '@/data/projects';

interface ProjectsShowcaseProps {
  featured?: boolean;
  category?: Project['category'];
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ featured = false, category = undefined }) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const displayProjects = featured 
    ? projects.filter(p => p.featured)
    : category 
    ? projects.filter(p => p.category === category)
    : projects;

  return (
    <div className="space-y-8">
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{project.category}</p>
                </div>
                {project.featured && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-900/30 text-blue-300 rounded-full border border-blue-700/30">
                    Featured
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-medium bg-gray-800/60 text-gray-300 rounded-full border border-gray-700/50 group-hover:border-gray-600/80 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2.5 py-1 text-xs font-medium text-gray-400">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>

              {/* Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="text-xs">
                      <p className="text-gray-400">{metric.label}</p>
                      <p className="text-lg font-bold text-blue-300">{metric.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Links */}
              <div className="flex gap-3 pt-4 border-t border-gray-700/30">
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink size={16} />
                    View Live
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github size={16} />
                    Source
                  </a>
                )}
                {project.links?.case_study && (
                  <a
                    href={project.links.case_study}
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <BookOpen size={16} />
                    Case Study
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(project.id)}
                  className="ml-auto text-sm text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Learn More →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed View Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const project = projects.find(p => p.id === selectedProject);
                if (!project) return null;

                return (
                  <div className="p-8 space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-3xl font-bold text-white">{project.title}</h2>
                        <p className="text-gray-400 mt-2">{project.category} • {project.role}</p>
                      </div>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        ✕
                      </button>
                    </div>

                    <p className="text-gray-300 text-lg">{project.fullDescription}</p>

                    {project.impact && (
                      <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                        <p className="text-sm text-blue-300 font-medium">Business Impact</p>
                        <p className="text-blue-200 mt-2">{project.impact}</p>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {project.keyFeatures.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-300">
                            <span className="text-blue-400 mt-1">→</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 text-sm font-medium bg-gray-800 text-gray-300 rounded-lg border border-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.metrics && project.metrics.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3">Metrics</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {project.metrics.map((metric) => (
                            <div key={metric.label} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                              <p className="text-sm text-gray-400">{metric.label}</p>
                              <p className="text-2xl font-bold text-blue-300 mt-1">{metric.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4 border-t border-gray-700">
                      {project.links?.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                          <ExternalLink size={16} />
                          View Live
                        </a>
                      )}
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors border border-gray-700"
                        >
                          <Github size={16} />
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsShowcase;
