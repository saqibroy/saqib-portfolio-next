'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { services, expertiseAreas, getExpertiseByCategory } from '@/data/expertise';
import { CheckCircle2, ChevronDown } from 'lucide-react';

export const ExpertiseShowcase: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    expertiseAreas[0]?.category || null
  );

  return (
    <div className="space-y-12">
      {/* Services Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300 p-6"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative space-y-4">
              <div className="text-4xl">{service.icon}</div>
              <h3 className="text-xl font-bold text-white">{service.title}</h3>
              <p className="text-gray-300 text-sm">{service.description}</p>

              <div className="space-y-2 pt-4">
                {service.expertise.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 size={14} className="text-blue-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Expertise */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">Technical Expertise</h2>
        <p className="text-gray-400">Comprehensive skills across modern web technologies and best practices</p>

        <div className="space-y-4 mt-6">
          {expertiseAreas.map((area) => (
            <motion.div
              key={area.category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-hidden rounded-xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm"
            >
              {/* Header */}
              <button
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === area.category ? null : area.category
                  )
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-3 text-left">
                  <span className="text-2xl">{area.icon}</span>
                  <h3 className="text-lg font-bold text-white">{area.category}</h3>
                </div>
                <motion.div
                  animate={{ rotate: expandedCategory === area.category ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} className="text-gray-400" />
                </motion.div>
              </button>

              {/* Skills List */}
              <motion.div
                initial={false}
                animate={{
                  height: expandedCategory === area.category ? 'auto' : 0,
                  opacity: expandedCategory === area.category ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 space-y-4 border-t border-gray-700/50 bg-gradient-to-b from-transparent to-gray-800/20">
                  {area.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white">{skill.name}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {[1, 2, 3].map((level) => (
                              <div
                                key={level}
                                className={`h-1.5 w-8 rounded-full transition-colors ${
                                  skill.level === 'Expert'
                                    ? 'bg-blue-500'
                                    : skill.level === 'Advanced'
                                    ? level <= 2
                                      ? 'bg-blue-500'
                                      : 'bg-gray-700'
                                    : level === 1
                                    ? 'bg-blue-500'
                                    : 'bg-gray-700'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-medium text-gray-400 ml-2 min-w-[60px]">
                            {skill.level}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">{skill.description}</p>
                      {skill.experience && (
                        <p className="text-xs text-gray-500">{skill.experience}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertiseShowcase;
