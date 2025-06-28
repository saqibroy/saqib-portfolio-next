'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Brain } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isWaitingPeriod, setIsWaitingPeriod] = useState<boolean>(true);
  const shouldReduceMotion = useReducedMotion();

  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaitingPeriod(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const AIBadge = () => (
    <motion.div
      className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-600/90 via-purple-600/90 to-fuchsia-600/90 backdrop-blur-md border border-violet-400/30 shadow-lg"
      whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 1 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-fuchsia-600/20 blur-md animate-pulse" />

      {/* Icon with animation */}
      <motion.div
        animate={shouldReduceMotion ? {} : { rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Brain className="w-4 h-4 text-white drop-shadow-sm" />
      </motion.div>

      {/* Text */}
      <span className="text-sm font-bold text-white drop-shadow-sm tracking-wide">
        AI
      </span>

      {/* Sparkle effect */}
      <motion.div
        className="absolute -top-1 -right-1"
        animate={shouldReduceMotion ? {} : {
          scale: [0, 1, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="w-3 h-3 text-yellow-300 drop-shadow-sm" />
      </motion.div>

      {/* Subtle pulse ring */}
      <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-30" />
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AIBadge />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Saqib Roy
              </span>
            </motion.div>

            <nav className="hidden md:flex items-center gap-6">
              <motion.a
                href="/"
                className={`text-sm font-medium transition-colors hover:text-purple-400 ${
                  pathname === '/' ? 'text-purple-400' : 'text-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Home
              </motion.a>
              <motion.a
                href="/cv"
                className={`text-sm font-medium transition-colors hover:text-purple-400 ${
                  pathname === '/cv' ? 'text-purple-400' : 'text-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CV
              </motion.a>
              <motion.a
                href="/accessibility-checker"
                className={`text-sm font-medium transition-colors hover:text-purple-400 ${
                  pathname === '/accessibility-checker' ? 'text-purple-400' : 'text-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Accessibility Checker
              </motion.a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {isWaitingPeriod ? (
          <div className="flex items-center justify-center min-h-screen">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-lg text-gray-300">Loading...</span>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-700/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Saqib Roy. Built with Next.js, TypeScript, and AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;