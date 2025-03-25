'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

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

const Home: React.FC = () => {
  const [stage, setStage] = useState<number>(0);
  const [backgroundElements, setBackgroundElements] = useState<BackgroundElement[]>([]);
  const [isWaitingPeriod, setIsWaitingPeriod] = useState<boolean>(true);

  // Generate background elements once on component mount
  useEffect(() => {
    const elements: BackgroundElement[] = [...Array(100)].map((_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      char: ['0', '1','>=', '<', '>', ',', '/', '{', '}', '()', '.', 'i'].sort(() => 0.5 - Math.random())[0],
      delay: Math.random() * 2,
      duration: Math.random() * 4 + 3,
      color: `hsl(${Math.random() * 120 + 100}, 70%, 50%)`
    }));
    setBackgroundElements(elements);
  }, []);

  useEffect(() => {
    const stages = [
      () => {
        const typeInterval = setInterval(() => {
          clearInterval(typeInterval);
            // Set waiting period and trigger faster background
            setIsWaitingPeriod(true);
            setTimeout(() => {
              setIsWaitingPeriod(false);
              setStage(1);// Instantly set hero text
            }, 1500);
        }, 50);

        return () => clearInterval(typeInterval);
      },
      () => {
        // No typing effect for hero text
        return () => {};
      }
    ];

    const cleanup = stages[stage]();
    return cleanup;
  }, [stage]);

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Component */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {backgroundElements.map((element) => (
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
              opacity: [0, 0.7, 0],
              y: [0, 50, 100]
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              repeatType: 'loop',
              ease: "easeInOut"
            }}
          >
            {element.char}
          </motion.div>
        ))}
      </div>

      {/* Fixed Indicator Dots - Restored to original position */}
      <div className="fixed top-4 right-4 flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            isWaitingPeriod
              ? "bg-red-400 animate-[pulse_0.5s_infinite]"
              : "bg-blue-400 animate-pulse"
          }`}
        ></div>
        <div
          className={`w-2 h-2 rounded-full ${
            isWaitingPeriod
              ? "bg-yellow-400 animate-[pulse_0.5s_infinite]"
              : "bg-green-400 animate-pulse"
          }`}
        ></div>
        <div
          className={`w-2 h-2 rounded-full ${
            isWaitingPeriod
              ? "bg-purple-400 animate-[pulse_0.5s_infinite]"
              : "bg-white animate-pulse"
          }`}
        ></div>
      </div>

      {/* Navigation */}
      <header className="absolute top-0 left-0 w-full p-4 z-20">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" className="group">
            <motion.div 
              className="text-xl font-bold flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className={`bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent ${
                  isWaitingPeriod
                    ? "animate-[pulse_0.5s_infinite]"
                    : "animate-pulse"
                }`}
              >
                Saqib Sohail
              </motion.span>
            </motion.div>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center relative z-10 px-4">
        <motion.div 
          className="w-full mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AnimatePresence>
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-2xl md:text-4xl lg:text-5xl"
            >
              {stage === 0 && (
                <div className="">
                  <div className="overflow-x-auto">
                    <div className="text-white">
                      <span className="text-[#569CD6]">await</span>{' '}
                      <span className="text-[#4EC9B0]">get</span>
                      <span className="text-[#D4D4D4]">(</span>
                      <span className="text-[#CE9178]">&apos;saqib&apos;</span>
                      <span className="text-[#D4D4D4]">)</span>
                      <motion.span 
                        className="inline-block ml-1 w-[2px] h-7 bg-white opacity-80"
                        animate={{ 
                          opacity: [0, 1, 0],
                          transition: { 
                            duration: 0.7, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {stage === 1 && (
                <div className="text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
                  <h1>A modern web developer</h1>
                  <h1>focused on</h1>
                  {'performance & accessibility'.split(' ').map((word, index) => (
                    <motion.h1
                      key={index}
                      animate={
                        ['performance', 'accessibility'].includes(word)
                          ? {
                              y: [0, -10, 0],
                              transition: {
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }
                            }
                          : {}
                      }
                      className={`inline-block m-1 transition-all duration-300 ${
                        ['performance', 'accessibility'].includes(word) 
                          ? 'bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent font-bold' 
                          : ''
                      }`}
                    >
                      {word}
                    </motion.h1>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className={`relative z-20 p-4 text-center text-gray-400`}>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex justify-center space-x-4"
          >
            {[
              { name: 'GitHub', url: 'https://github.com/saqibroy' },
              { name: 'LinkedIn', url: 'https://linkedin.com/in/saqibroy' }
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.name}
              </motion.a>
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-2 text-sm"
          >
            © {new Date().getFullYear()} Saqib Sohail. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default Home;