'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { professionalBio, skillsHighlight, AchievementMetric } from '@/data/about';
import { ExternalLink, Mail } from 'lucide-react';

interface AboutHeroProps {
  compact?: boolean;
}

export const AboutHero: React.FC<AboutHeroProps> = ({ compact = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Main Introduction */}
      <div className="space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white leading-tight"
        >
          {professionalBio.title}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300"
        >
          {professionalBio.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-gray-400 leading-relaxed"
        >
          {compact ? professionalBio.summary : professionalBio.longBio}
        </motion.p>
      </div>

      {/* Achievement Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {professionalBio.achievements.map((achievement, index) => (
          <motion.div
            key={achievement.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
            className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-lg p-4 text-center hover:border-gray-600/80 transition-colors"
          >
            <p className="text-2xl md:text-3xl font-bold text-blue-400">{achievement.value}</p>
            <p className="text-xs md:text-sm text-gray-300 font-medium mt-1">{achievement.label}</p>
            <p className="text-xs text-gray-500 mt-2 line-clamp-2">{achievement.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-wrap gap-4"
      >
        <a
          href={professionalBio.callToAction.primaryCTA.href}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <Mail size={18} />
          {professionalBio.callToAction.primaryCTA.text}
        </a>
        <Link
          href={professionalBio.callToAction.secondaryCTA.href}
          className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg border border-gray-700 transition-colors"
        >
          {professionalBio.callToAction.secondaryCTA.text}
          <ExternalLink size={18} />
        </Link>
      </motion.div>
    </motion.div>
  );
};

interface SkillsHighlightProps {
  showIntro?: boolean;
}

export const SkillsHighlight: React.FC<SkillsHighlightProps> = ({ showIntro = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-2"
        >
          <h2 className="text-3xl font-bold text-white">Core Competencies</h2>
          <p className="text-gray-400">Technical expertise across full-stack development</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Frontend', skills: skillsHighlight.frontend },
          { label: 'Backend', skills: skillsHighlight.backend },
          { label: 'DevOps', skills: skillsHighlight.devops },
          { label: 'Soft Skills', skills: skillsHighlight.soft },
        ].map((category, categoryIndex) => (
          <motion.div
            key={category.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (showIntro ? 0.2 : 0.1) + categoryIndex * 0.1 }}
            className="bg-gradient-to-b from-gray-800/50 to-gray-900/80 border border-gray-700/50 rounded-xl p-6 space-y-4"
          >
            <h3 className="text-lg font-bold text-white">{category.label}</h3>
            <div className="space-y-2">
              {category.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: (showIntro ? 0.2 : 0.1) + categoryIndex * 0.1 + index * 0.05,
                  }}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

interface InterestsProps {
  title?: string;
}

export const InterestsAndPassions: React.FC<InterestsProps> = ({ title = 'Interests & Passions' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <p className="text-gray-400 mt-2">What drives me in technology and development</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {professionalBio.interests.map((interest, index) => (
          <motion.div
            key={interest}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-700/30 hover:border-blue-600/50 rounded-lg p-4 text-center transition-colors"
          >
            <p className="text-gray-300 font-medium">{interest}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

interface SocialLinksProps {
  layout?: 'horizontal' | 'vertical';
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ layout = 'horizontal' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`flex ${layout === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-3'}`}
    >
      {professionalBio.socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-colors"
        >
          <ExternalLink size={16} />
          <span className="font-medium">{link.name}</span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default AboutHero;
