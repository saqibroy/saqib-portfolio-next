'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link'; // Keep Link for Next.js environment
import { usePathname } from 'next/navigation'; // Keep usePathname for Next.js environment
import { Menu, X, Github, Linkedin, Mail, Home as HomeIcon, Check } from 'lucide-react'; // Import icons

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isWaitingPeriod, setIsWaitingPeriod] = useState<boolean>(true);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false); // State for mobile menu
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname(); // Get current pathname
  const isHomePage = pathname === '/';
  const isCVPage = pathname === '/cv';
  
  const email = 'saqib@ssohail.com'; // TODO: Update this email to your real contact email
  const linkedinUrl = 'https://linkedin.com/in/saqibroy';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaitingPeriod(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleCopyEmail = () => {
    // navigator.clipboard.writeText(email);
    // document.execCommand('copy') is used as navigator.clipboard.writeText() may not work due to iFrame restrictions.
    const tempInput = document.createElement('textarea');
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <div className={`${isHomePage ? 'h-screen overflow-hidden' : 'min-h-screen'} flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white`}>
      {/* Navigation */}
      <header className="absolute top-0 left-0 w-full p-4 z-50"> {/* Increased z-index */}
        <nav className="container mx-auto flex justify-between items-center relative">
          <Link href="/" className="group" aria-label="Home">
            <motion.div 
              className="text-xl font-bold flex items-center space-x-2"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              {!isHomePage && (
                <HomeIcon // Replaced SVG with Lucide icon
                  className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" 
                />
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
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
            <Link href="/blog" className="group flex items-center">
              <motion.div
                className="text-gray-300 hover:text-white transition-colors flex items-center relative"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <span>Blog</span>
                {/* AI Badge */}
                <div className="ml-2 relative">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white text-xs font-bold shadow-lg backdrop-blur-sm border border-purple-400/30">
                    <svg 
                      className="w-2.5 h-2.5 animate-pulse" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 1-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 1 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 1 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 1-3.09 3.09ZM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 0 0 1.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"/>
                    </svg>
                    <span>AI</span>
                  </div>
                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-ping"></div>
                </div>
              </motion.div>
            </Link>
            <motion.button
              onClick={() => setIsContactOpen(true)}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-300"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              Contact
            </motion.button>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-gray-900 bg-opacity-95 backdrop-blur-lg z-40 flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-label="Close navigation"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col items-center space-y-6 text-xl">
              {!isCVPage && (
                <Link href="/cv" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  CV
                </Link>
              )}
              <Link href="/blog" className="text-gray-300 hover:text-white transition-colors flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                Blog
                <div className="ml-2 relative">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white text-xs font-bold shadow-lg backdrop-blur-sm border border-purple-400/30">
                    <svg
                      className="w-2.5 h-2.5 animate-pulse"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 1-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 1 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 1 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 1-3.09 3.09ZM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 0 0 1.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"/>
                    </svg>
                    <span>AI</span>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-ping"></div>
                </div>
              </Link>
              <button
                onClick={() => { setIsContactOpen(true); setIsMobileMenuOpen(false); }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white text-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-300"
              >
                Contact
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col ${isHomePage ? 'overflow-hidden' : ''}`}>
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full p-4 text-center text-gray-400 z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.5 : 1, delay: 0.5 }}
            className="flex flex-col items-center space-y-2"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="flex justify-center space-x-3 flex-wrap">
                {[
                  {
                    name: 'GitHub',
                    url: 'https://github.com/saqibroy',
                    icon: (<Github className="w-5 h-5" />)
                  },
                  {
                    name: 'LinkedIn',
                    url: 'https://linkedin.com/in/saqibroy',
                    icon: (<Linkedin className="w-5 h-5" />)
                  },
                  {
                    name: 'Email',
                    url: `mailto:${email}`,
                    icon: (<Mail className="w-5 h-5" />)
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
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleCloseContact}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-auto sm:mx-4"
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
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              {/* Email Section */}
              <div className="text-center">
                <p className="text-gray-300 mb-4 text-sm sm:text-base">Feel free to reach out to me via email:</p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                  <a
                    href={`mailto:${email}`}
                    className="text-blue-400 hover:text-blue-300 text-lg font-medium break-all"
                  >
                    {email}
                  </a>
                  <motion.button
                    onClick={handleCopyEmail}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-md"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                    title="Copy email address"
                  >
                    {isCopied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Mail className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* LinkedIn Section */}
              <div className="text-center">
                <p className="text-gray-300 mb-4 text-sm sm:text-base">Or connect with me on LinkedIn:</p>
                <motion.a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-[#0A66C2] text-white font-medium hover:bg-[#004182] transition-all duration-300 text-sm sm:text-base"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5" />
                  <span>Connect on LinkedIn</span>
                </motion.a>
              </div>

              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <motion.a
                  href={`mailto:${email}`}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-300 text-sm sm:text-base"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  Open Email
                </motion.a>
                <motion.button
                  onClick={handleCopyEmail}
                  className="px-4 py-2 rounded-md bg-gray-700 text-white font-medium hover:bg-gray-600 transition-all duration-300 text-sm sm:text-base"
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
