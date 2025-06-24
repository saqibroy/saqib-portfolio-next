'use client'
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Layout from '@/components/Layout';

// Define an interface for background elements
interface BackgroundElement {
  id: number;
  x: number;
  y: number;
  char: string;
  delay: number;
  duration: number;
  color: string;
}

// Memoized background elements to prevent unnecessary re-renders
const BackgroundElements: React.FC<{ elements: BackgroundElement[] }> = React.memo(({ elements }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute font-mono text-xs"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            color: element.color
          }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ 
            opacity: shouldReduceMotion ? [0, 0.3, 0] : [0, 0.7, 0],
            y: shouldReduceMotion ? [0, 25, 50] : [0, 50, 100]
          }}
          transition={{
            duration: shouldReduceMotion ? element.duration * 0.5 : element.duration,
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

// Deterministic background elements generation
const generateBackgroundElements = (count: number): BackgroundElement[] => {
  const chars = ['0', '1', '>=', '<', '>', ',', '/', '{', '}', '()', '.', 'i'];
  const elements: BackgroundElement[] = [];
  
  for (let i = 0; i < count; i++) {
    const seed = i * 16807 % 2147483647;
    const x = (seed % 100) / 100;
    const y = ((seed * 16807) % 2147483647 % 100) / 100;
    const charIndex = ((seed * 16807) % 2147483647) % chars.length;
    const delay = (seed % 2000) / 1000;
    const duration = 3 + (seed % 4000) / 1000;
    const hue = 100 + (seed % 120);
    
    elements.push({
      id: i,
      x: x * 100,
      y: y * 100,
      char: chars[charIndex],
      delay,
      duration,
      color: `hsl(${hue}, 70%, 50%)`
    });
  }
  
  return elements;
};

const Home: React.FC = () => {
  const [stage, setStage] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();
  const backgroundElements = useMemo(() => generateBackgroundElements(50), []);

  useEffect(() => {
    const stages = [
      () => {
        const typeInterval = setInterval(() => {
          clearInterval(typeInterval);
          setStage(1);
        }, 25);

        return () => clearInterval(typeInterval);
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
      <div className="relative min-h-screen flex flex-col">
        <Suspense fallback={<div className="absolute inset-0 bg-gray-900" />}>
          <BackgroundElements elements={backgroundElements} />
        </Suspense>

        <div className="flex-grow flex items-center justify-center relative z-10 px-4">
          <div className="w-full max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0.5 : 1 }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.25 : 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent leading-tight"
              >
                Full-Stack Developer & Software Engineer
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.25 : 0.5, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
              >
                Building performant, accessible, and scalable web applications using modern technologies like React, Next.js, Node.js, and TypeScript.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.25 : 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center text-center"
            >
              <motion.a
                href="/cv"
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                Explore My Work
              </motion.a>
              
              <motion.a
                href="/blog"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-medium hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 relative overflow-hidden border border-cyan-400/20"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <div className="relative">
                  <svg 
                    className="w-6 h-6" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    <path d="M12 7a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                    <circle cx="9" cy="9" r="1"/>
                    <circle cx="15" cy="9" r="1"/>
                    <path d="M8 15c0-2.21 1.79-4 4-4s4 1.79 4 4"/>
                  </svg>
                  <motion.div 
                    className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"
                    animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm opacity-90 leading-none">AI-Powered</span>
                  <span className="leading-none">Blog</span>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 opacity-0"
                  whileHover={shouldReduceMotion ? {} : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;