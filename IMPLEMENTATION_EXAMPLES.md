/**
 * Example Implementation Guide
 * Shows how to integrate all new components and data into your pages
 * 
 * Copy and adapt these examples to your actual page files
 */

// ============================================================================
// Example 1: Home Page Implementation
// File: src/app/page.tsx (Updated Home)
// ============================================================================

/*
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { AboutHero, SkillsHighlight, SocialLinks } from '@/components/AboutSection';
import { ProjectsShowcase } from '@/components/ProjectsShowcase';

export default function Home() {
  return (
    <Layout>
      <main className="space-y-24 py-12">
        {/* Hero Section with Intro */}
        <section className="container mx-auto px-4 lg:px-8">
          <AboutHero compact={true} />
        </section>

        {/* Featured Projects */}
        <section className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Featured Work</h2>
              <p className="text-gray-400">Showcase of recent projects and accomplishments</p>
            </div>
            <ProjectsShowcase featured={true} />
          </motion.div>
        </section>

        {/* Skills Highlight */}
        <section className="container mx-auto px-4 lg:px-8">
          <SkillsHighlight />
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-2xl p-12 text-center space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">Ready to Collaborate?</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Let's discuss your next project or how I can help achieve your goals.
            </p>
            <SocialLinks layout="horizontal" />
          </motion.div>
        </section>
      </main>
    </Layout>
  );
}
*/

// ============================================================================
// Example 2: Projects Page Implementation
// File: src/app/projects/page.tsx (New File)
// ============================================================================

/*
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { ProjectsShowcase } from '@/components/ProjectsShowcase';
import { Project } from '@/data/projects';

const categories: Project['category'][] = [
  'Web Development',
  'Full Stack',
  'Performance',
  'DevOps',
  'Open Source'
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Project['category'] | null>(null);

  return (
    <Layout>
      <main className="container mx-auto px-4 lg:px-8 py-12 space-y-12">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 text-center"
        >
          <h1 className="text-5xl font-bold text-white">My Projects</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A collection of web applications and solutions I've built, showcasing
            expertise in modern web technologies and best practices.
          </p>
        </motion.section>

        {/* Category Filter */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            All Projects
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.section>

        {/* Projects Grid */}
        <motion.section
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProjectsShowcase category={selectedCategory || undefined} />
        </motion.section>
      </main>
    </Layout>
  );
}
*/

// ============================================================================
// Example 3: About Page Implementation
// File: src/app/about/page.tsx (New File)
// ============================================================================

/*
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import {
  AboutHero,
  SkillsHighlight,
  InterestsAndPassions,
  SocialLinks,
} from '@/components/AboutSection';
import { ExpertiseShowcase } from '@/components/ExpertiseShowcase';

export default function AboutPage() {
  return (
    <Layout>
      <main className="container mx-auto px-4 lg:px-8 py-12 space-y-20">
        {/* Full Bio Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AboutHero compact={false} />
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SkillsHighlight />
        </motion.section>

        {/* Expertise Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ExpertiseShowcase />
        </motion.section>

        {/* Interests */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <InterestsAndPassions />
        </motion.section>

        {/* Social Links */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-3xl font-bold text-white">Connect With Me</h2>
            <p className="text-gray-400 mt-2">
              Find me on social media or send me a message
            </p>
          </div>
          <SocialLinks layout="horizontal" />
        </motion.section>
      </main>
    </Layout>
  );
}
*/

// ============================================================================
// Example 4: CV/Resume Page Enhancement
// File: src/app/cv/page.tsx (Updated Section)
// ============================================================================

/*
// Add to the existing CV page for expertise section:

import { ExpertiseShowcase } from '@/components/ExpertiseShowcase';

// In your render/component:
<section className="space-y-8 py-12">
  <div>
    <h2 className="text-4xl font-bold text-white mb-4">Technical Expertise</h2>
    <p className="text-gray-400 text-lg">
      Comprehensive skills and knowledge across modern web development
    </p>
  </div>
  <ExpertiseShowcase />
</section>
*/

// ============================================================================
// Example 5: Contact Page / CTA Section
// File: src/app/contact/page.tsx (New File)
// ============================================================================

/*
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { SocialLinks } from '@/components/AboutSection';
import { professionalBio } from '@/data/about';
import { Mail, MapPin, Zap } from 'lucide-react';

export default function ContactPage() {
  return (
    <Layout>
      <main className="container mx-auto px-4 lg:px-8 py-12 space-y-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <h1 className="text-5xl font-bold text-white">
            Let's Work Together
          </h1>
          <p className="text-xl text-gray-400">
            {professionalBio.callToAction.description}
          </p>
        </motion.section>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 my-12"
        >
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center space-y-2">
            <Mail size={32} className="mx-auto text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Email</h3>
            <a
              href="mailto:hello@ssohail.com"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              hello@ssohail.com
            </a>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center space-y-2">
            <Zap size={32} className="mx-auto text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Availability</h3>
            <p className="text-gray-400">
              {professionalBio.availability}
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center space-y-2">
            <MapPin size={32} className="mx-auto text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Location</h3>
            <p className="text-gray-400">{professionalBio.location}</p>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <SocialLinks layout="horizontal" />
        </motion.div>

        {/* Form or Additional Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            What I'm Looking For
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li>• Full-time or contract positions in web development</li>
            <li>• Collaborations on interesting projects</li>
            <li>• Opportunities to work with modern technologies</li>
            <li>• Teams passionate about quality and innovation</li>
          </ul>
        </motion.section>
      </main>
    </Layout>
  );
}
*/

// ============================================================================
// Quick Import Reference for All Components
// ============================================================================

/*
import { AboutHero, SkillsHighlight, InterestsAndPassions, SocialLinks } from '@/components/AboutSection';
import { ProjectsShowcase } from '@/components/ProjectsShowcase';
import { ExpertiseShowcase } from '@/components/ExpertiseShowcase';

import { professionalBio, workExperience, skillsHighlight } from '@/data/about';
import { projects, getFeaturedProjects, getProjectsByCategory } from '@/data/projects';
import { services, expertiseAreas, getExpertiseByCategory } from '@/data/expertise';
*/

export {}; // Placeholder export
