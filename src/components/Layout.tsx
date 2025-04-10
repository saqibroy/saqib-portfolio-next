'use client'
import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isWaitingPeriod, setIsWaitingPeriod] = useState<boolean>(true);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isCVPage = pathname === '/cv';
  const email = 'sohail.cpp@gmail.com';
  const linkedinUrl = 'https://linkedin.com/in/saqibroy';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaitingPeriod(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <div className={`${isHomePage ? 'h-screen overflow-hidden' : 'min-h-screen'} flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white`}>
      {/* Fixed Indicator Dot */}
      <div className="fixed top-4 right-4">
        <div
          className={`w-2 h-2 rounded-full ${
            isWaitingPeriod
              ? "bg-red-400 animate-[pulse_0.5s_infinite]"
              : "bg-blue-400 animate-pulse"
          }`}
        />
      </div>

      {/* Navigation */}
      <header className="absolute top-0 left-0 w-full p-4 z-20">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" className="group" aria-label="Home">
            <motion.div 
              className="text-xl font-bold flex items-center space-x-2"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              {!isHomePage && (
                <svg 
                  className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                  />
                </svg>
              )}
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
          <div className="flex space-x-6 items-center">
            {!isCVPage && (
              <Link href="/cv" className="group">
                <motion.div
                  className="text-gray-300 hover:text-white transition-colors"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  CV
                </motion.div>
              </Link>
            )}
            <motion.button
              onClick={() => setIsContactOpen(true)}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-300"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              Contact
            </motion.button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col ${isHomePage ? 'overflow-hidden' : ''}`}>
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full p-4 text-center text-gray-400">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.5 : 1, delay: 0.5 }}
            className="flex flex-col items-center space-y-2"
          >
            {/* WakaTime Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0.5 : 1, delay: 0.6 }}
            >
              <a 
                href="https://wakatime.com/@04f32415-555b-4fa9-8569-af46c61a4ea1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img 
                  src="https://wakatime.com/badge/user/04f32415-555b-4fa9-8569-af46c61a4ea1.svg"
                  alt="WakaTime stats"
                  className="h-6 w-auto"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </a>
            </motion.div>

            <div className="flex flex-col items-center space-y-3">
              <div className="flex justify-center space-x-3">
                {[
                  { 
                    name: 'GitHub', 
                    url: 'https://github.com/saqibroy',
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )
                  },
                  { 
                    name: 'LinkedIn', 
                    url: 'https://linkedin.com/in/saqibroy',
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    )
                  },
                  { 
                    name: 'Email', 
                    url: 'mailto:saqibroy@example.com',
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )
                  }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                    aria-label={`Visit my ${social.name} profile`}
                  >
                    {social.icon}
                    <span className="text-sm">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0.5 : 1, delay: 0.7 }}
              className="text-sm"
            >
              © {new Date().getFullYear()} Saqib Sohail. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </footer>

      {/* Contact Modal */}
      {isContactOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseContact}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
                Get in Touch
              </h2>
              <button
                onClick={handleCloseContact}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-6">
              {/* Email Section */}
              <div className="text-center">
                <p className="text-gray-300 mb-4">Feel free to reach out to me via email:</p>
                <div className="flex items-center justify-center space-x-3">
                  <a 
                    href={`mailto:${email}`}
                    className="text-blue-400 hover:text-blue-300 text-lg font-medium"
                  >
                    {email}
                  </a>
                  <motion.button
                    onClick={handleCopyEmail}
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                    title="Copy email address"
                  >
                    {isCopied ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* LinkedIn Section */}
              <div className="text-center">
                <p className="text-gray-300 mb-4">Or connect with me on LinkedIn:</p>
                <motion.a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-[#0A66C2] text-white font-medium hover:bg-[#004182] transition-all duration-300"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                </motion.a>
              </div>

              <div className="flex justify-center space-x-4">
                <motion.a
                  href={`mailto:${email}`}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-300"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  Open Email
                </motion.a>
                <motion.button
                  onClick={handleCopyEmail}
                  className="px-4 py-2 rounded-md bg-gray-700 text-white font-medium hover:bg-gray-600 transition-all duration-300"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  {isCopied ? 'Copied!' : 'Copy Email'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Layout; 