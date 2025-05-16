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
              className="text-center"
            >
              <motion.a
                href="/cv"
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-300 text-lg"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                Explore My Work
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;