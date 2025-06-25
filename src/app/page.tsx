'use client'
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Layout from '@/components/Layout'; // Keep Layout import
import Link from 'next/link'; // Keep Link for Next.js environment
import { Sparkles, Brain, Zap, Code, Rocket, Globe, ArrowRight, Star } from 'lucide-react';

// Enhanced Background Elements Component
interface BackgroundElement {
  id: number;
  x: number;
  y: number;
  char: string;
  delay: number;
  duration: number;
  color: string;
  size: number; // Added size to interface
}

const BackgroundElements: React.FC<{ elements: BackgroundElement[] }> = React.memo(({ elements }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      
      {/* Code elements */}
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute font-mono font-bold"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            color: element.color,
            fontSize: `${element.size}px`
          }}
          initial={{ opacity: 0, y: -50, rotate: -10 }}
          animate={{ 
            opacity: shouldReduceMotion ? [0, 0.4, 0] : [0, 0.8, 0],
            y: shouldReduceMotion ? [0, 30, 60] : [0, 60, 120],
            rotate: shouldReduceMotion ? [-10, 0, 10] : [-10, 5, 20]
          }}
          transition={{
            duration: shouldReduceMotion ? element.duration * 0.8 : element.duration, // Slower duration
            delay: element.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: "easeInOut"
          }}
          aria-hidden="true"
        >
          {element.char}
        </motion.div>
      ))}
    </div>
  );
});

BackgroundElements.displayName = 'BackgroundElements';

// Enhanced AI Badge for CTA buttons - Now directly on the button without a separate icon
const EnhancedAIBadge = () => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div 
      className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white text-xs font-bold shadow-lg border border-violet-400/40"
      whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }}
      animate={shouldReduceMotion ? {} : { 
        boxShadow: [
          '0 4px 15px rgba(139, 92, 246, 0.3)',
          '0 4px 25px rgba(139, 92, 246, 0.5)',
          '0 4px 15px rgba(139, 92, 246, 0.3)'
        ]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <motion.div
        animate={shouldReduceMotion ? {} : { rotate: [0, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="w-3 h-3" />
      </motion.div>
      <span>AI</span>
    </motion.div>
  );
};

// Skill badges component
const SkillBadges = () => {
  const skills = [
    { name: 'React', color: 'from-blue-500 to-cyan-500', icon: <Code className="w-4 h-4" /> },
    { name: 'Next.js', color: 'from-gray-700 to-gray-900', icon: <Rocket className="w-4 h-4" /> },
    { name: 'TypeScript', color: 'from-blue-600 to-blue-800', icon: <Zap className="w-4 h-4" /> },
    { name: 'Node.js', color: 'from-green-500 to-green-700', icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-3 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${skill.color} text-white text-sm font-medium shadow-lg backdrop-blur-sm border border-white/20`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {skill.icon}
          <span>{skill.name}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Deterministic background elements generation
const generateBackgroundElements = (count: number): BackgroundElement[] => {
  const chars = ['0', '1', '>=', '<', '>', ',', '/', '{', '}', '()', '.', 'i', 'AI']; 
  const colors = ['hsl(180, 70%, 50%)', 'hsl(240, 70%, 60%)', 'hsl(300, 70%, 70%)']; 
  const sizes = [12, 16, 20, 24]; 

  const elements: BackgroundElement[] = [];
  
  for (let i = 0; i < count; i++) {
    const seed = i * 16807 % 2147483647;
    const x = (seed % 100) / 100;
    const y = ((seed * 16807) % 2147483647 % 100) / 100;
    const charIndex = ((seed * 16807) % 2147483647) % chars.length;
    const delay = (seed % 2000) / 1000;
    const duration = 5 + (seed % 6000) / 1000; // Increased base duration for slower movement
    const colorIndex = ((seed * 16807 * 2) % 2147483647) % colors.length;
    const sizeIndex = ((seed * 16807 * 3) % 2147483647) % sizes.length;

    elements.push({
      id: i,
      x: x * 100,
      y: y * 100,
      char: chars[charIndex],
      delay,
      duration,
      color: colors[colorIndex],
      size: sizes[sizeIndex]
    });
  }
  
  return elements;
};

const Home: React.FC = () => {
  const [stage, setStage] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();
  const backgroundElements = useMemo(() => generateBackgroundElements(70), []); 

  useEffect(() => {
    const stages = [
      () => {
        setStage(1);
        return () => {};
      },
      () => {
        return () => {};
      }
    ];

    const cleanup = stages[stage]();
    return cleanup;
  }, [stage]);

  return (
    <Layout>
      <div className="relative min-h-screen flex flex-col bg-gray-950 text-white font-sans">
        <Suspense fallback={<div className="absolute inset-0 bg-gray-900" />}>
          <BackgroundElements elements={backgroundElements} />
        </Suspense>

        <div className="flex-grow flex items-center justify-center relative z-10 px-4 py-12 sm:py-24">
          <div className="w-full max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-12 sm:mb-16" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0.5 : 1 }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.25 : 0.5 }}
                className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-blue-300 via-green-300 to-purple-400 bg-clip-text text-transparent leading-tight px-2 sm:px-0 drop-shadow-lg" 
              >
                Full-Stack Engineer & Tech Enthusiast
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.25 : 0.5, delay: 0.2 }}
                className="text-lg md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto px-2 sm:px-0 opacity-90" 
              >
                Building performant, accessible, and scalable web applications using modern technologies like React, Next.js, Node.js, and TypeScript.
                I also explore the exciting world of AI on my <a href="https://ssohail.com/blog" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">blog</a>.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.25 : 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center text-center px-2 sm:px-0" 
            >
              <Link 
                href="/cv"
                className="inline-block px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-300 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 relative overflow-hidden group" 
              >
                <motion.span 
                  className="relative z-10 flex items-center gap-2"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  Explore My Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </Link>
              
              <Link 
                href="/blog"
                className="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:via-fuchsia-700 hover:to-pink-700 transition-all duration-300 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 relative overflow-hidden border border-purple-400/20 group" 
              >
                <motion.div 
                  className="relative flex items-center gap-3"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  
                  <EnhancedAIBadge />
                </motion.div>
                {/* Changed the text content */}
                <span className="leading-none">See my Blog</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-fuchsia-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;