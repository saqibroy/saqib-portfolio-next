'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, Home, Check, Sparkles, Brain, Zap, Shield, Search } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isWaitingPeriod, setIsWaitingPeriod] = useState<boolean>(true);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();
  
  // Mock pathname for demo - replace with actual usePathname() in your Next.js app
  // Use Next.js usePathname for correct routing context
  // Remove type error by using string includes or equality
  // If not in Next.js app directory, replace with a prop or context as needed
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const usePathname = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  };
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isCVPage = pathname === '/cv';
  const isAccessibilityPage = pathname === '/accessibility-checker';

  const email = 'saqib@ssohail.com';
  const linkedinUrl = 'https://linkedin.com/in/saqibroy';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaitingPeriod(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleCopyEmail = () => {
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

  // Tiny AI Badge Component
  const TinyAIBadge = () => (
    <motion.div 
      className="relative inline-flex items-center gap-1 ml-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-violet-600/90 via-purple-600/90 to-fuchsia-600/90 backdrop-blur-md border border-violet-400/30 shadow-sm"
      whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 1 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-fuchsia-600/20 blur-sm animate-pulse" />
      
      {/* Icon with animation */}
      <motion.div
        animate={shouldReduceMotion ? {} : { rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Brain className="w-2.5 h-2.5 text-white drop-shadow-sm" />
      </motion.div>
      
      {/* Text */}
      <span className="text-xs font-bold text-white drop-shadow-sm tracking-wide">
        AI
      </span>
      
      {/* Sparkle effect */}
      <motion.div
        className="absolute -top-0.5 -right-0.5"
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
        <Sparkles className="w-2 h-2 text-yellow-300 drop-shadow-sm" />
      </motion.div>
      
      {/* Subtle pulse ring */}
      <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-30" />
    </motion.div>
  );

  // Tiny Accessibility Badge Component with AI
  const TinyAccessibilityBadge = () => (
    <motion.div 
      className="relative inline-flex items-center gap-1 ml-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-cyan-600/90 backdrop-blur-md border border-emerald-400/30 shadow-sm"
      whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: -1 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20 blur-sm animate-pulse" />
      
      {/* Brain icon with subtle animation for AI */}
      <motion.div
        animate={shouldReduceMotion ? {} : { 
          scale: [1, 1.1, 1],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Brain className="w-2.5 h-2.5 text-white drop-shadow-sm" />
      </motion.div>
      
      {/* Text */}
      <span className="text-xs font-bold text-white drop-shadow-sm tracking-wide">
        AI
      </span>
      
      {/* Shield effect */}
      <motion.div
        className="absolute -top-0.5 -right-0.5"
        animate={shouldReduceMotion ? {} : { 
          scale: [0, 1, 0],
          rotate: [0, -180, -360]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <Shield className="w-2 h-2 text-green-300 drop-shadow-sm" />
      </motion.div>
      
      {/* Subtle pulse ring */}
      <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-30" />
    </motion.div>
  );

  // Consistent nav button styles
  const NavButton = ({ href, children, onClick, className = "" }: { 
    href?: string; 
    children: React.ReactNode; 
    onClick?: () => void;
    className?: string;
  }) => {
    const buttonContent = (
      <motion.div
        className={`group relative px-4 py-2 rounded-xl transition-all duration-300 ${className}`}
        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      >
        <span className="relative z-10 text-gray-300 group-hover:text-white font-medium">
          {children}
        </span>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-emerald-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-emerald-500/10 transition-all duration-300" />
      </motion.div>
    );

    if (href) {
      return <a href={href}>{buttonContent}</a>;
    }

    return <button onClick={onClick}>{buttonContent}</button>;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white relative">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Navigation */}
      <header className="absolute top-0 left-0 w-full p-4 z-50">
        <nav className="container mx-auto">
          <motion.div 
            className="flex justify-between items-center relative backdrop-blur-md bg-white/5 rounded-2xl px-6 py-4 border border-white/10 shadow-2xl"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Logo */}
            <a href="/" className="group" aria-label="Home">
              <motion.div 
                className="text-xl font-bold flex items-center space-x-3"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                {!isHomePage && (
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { rotate: 10 }}
                    className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30"
                  >
                    <Home className="w-5 h-5 text-blue-300" />
                  </motion.div>
                )}
                <motion.span 
                  className="bg-gradient-to-r from-blue-300 via-purple-300 to-emerald-300 bg-clip-text text-transparent"
                  animate={shouldReduceMotion ? {} : {
                    backgroundPosition: ['0%', '100%', '0%']
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  Saqib Sohail
                </motion.span>
              </motion.div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-6 items-center">
              {!isCVPage && (
                <NavButton href="/cv">
                  CV
                </NavButton>
              )}
              
              <NavButton href="/blog">
                <span className="flex items-center">
                  Blog<TinyAIBadge />
                </span>
              </NavButton>

              {/* Updated Accessibility Checker Button with shorter name 
                {!isAccessibilityPage && (
                <NavButton href="/accessibility-checker">
                  <span className="flex items-center">
                    A11y Audit<TinyAccessibilityBadge />
                  </span>
                </NavButton>
              )}

*/}
              
              
              <motion.button
                onClick={() => setIsContactOpen(true)}
                className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 text-white font-medium overflow-hidden group"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 1 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={shouldReduceMotion ? {} : { x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 rounded-xl text-gray-300 hover:text-white focus:outline-none bg-white/5 border border-white/10"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                aria-label="Toggle navigation"
              >
                <motion.div
                  animate={shouldReduceMotion ? {} : { rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </nav>
      </header>

      {/* Enhanced Mobile Menu - Fixed height and no scroll */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-40 flex flex-col p-8 lg:hidden overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-purple-900/20 to-fuchsia-900/20" />
            
            <div className="flex justify-end mb-12 relative z-10">
              <motion.button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl text-gray-300 hover:text-white bg-white/5 border border-white/10"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 90 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                aria-label="Close navigation"
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>
            
            <nav className="flex flex-col items-center justify-center flex-1 space-y-8 text-xl relative z-10">
              {!isCVPage && (
                <motion.a 
                  href="/cv" 
                  className="text-gray-300 hover:text-white transition-colors p-4 rounded-xl hover:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  CV
                </motion.a>
              )}
              
              <motion.a 
                href="/blog" 
                className="flex items-center text-gray-300 hover:text-white transition-colors p-4 rounded-xl hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <span className="flex items-center">
                  Blog<TinyAIBadge />
                </span>
              </motion.a>

              {/* Mobile Accessibility Link with updated name 
                {!isAccessibilityPage && (
                <motion.a 
                  href="/accessibility-checker" 
                  className="flex items-center text-gray-300 hover:text-white transition-colors p-4 rounded-xl hover:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  <span className="flex items-center">
                    A11y Audit<TinyAccessibilityBadge />
                  </span>
                </motion.a>
              )}
              */}
              
              
              <motion.button
                onClick={() => { setIsContactOpen(true); setIsMobileMenuOpen(false); }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 text-white text-lg font-medium"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                Contact
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10">
        {children}
      </main>

      {/* Enhanced Footer */}
      <footer className="w-full p-6 text-center text-gray-400 z-10 relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.5 : 1, delay: 0.5 }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="flex justify-center items-center space-x-4 md:space-x-6 flex-wrap gap-y-4">
              {[
                {
                  name: 'GitHub',
                  url: 'https://github.com/saqibroy',
                  icon: <Github className="w-5 h-5" />,
                  color: 'hover:text-purple-400'
                },
                {
                  name: 'LinkedIn',
                  url: 'https://linkedin.com/in/saqibroy',
                  icon: <Linkedin className="w-5 h-5" />,
                  color: 'hover:text-blue-400'
                },
                {
                  name: 'Email',
                  url: `mailto:${email}`,
                  icon: <Mail className="w-5 h-5" />,
                  color: 'hover:text-emerald-400'
                }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-all duration-300 flex items-center space-x-2 p-3 rounded-xl hover:bg-white/5`}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                  aria-label={`Visit my ${social.name} profile`}
                >
                  {social.icon}
                  <span className="text-sm font-medium">{social.name}</span>
                </motion.a>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0.5 : 1, delay: 0.7 }}
              className="text-sm bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent"
            >
              © {new Date().getFullYear()} Saqib Sohail. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </footer>

      {/* Enhanced Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleCloseContact}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl p-8 rounded-2xl max-w-md w-full mx-auto border border-white/10 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-emerald-300 bg-clip-text text-transparent">
                  Get in Touch
                </h2>
                <motion.button
                  onClick={handleCloseContact}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/5"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 90 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-gray-300 mb-4">Feel free to reach out to me via email:</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <a
                      href={`mailto:${email}`}
                      className="text-blue-400 hover:text-blue-300 text-lg font-medium break-all"
                    >
                      {email}
                    </a>
                    <motion.button
                      onClick={handleCopyEmail}
                      className="text-gray-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/5"
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

                <div className="text-center">
                  <p className="text-gray-300 mb-4">Or connect with me on LinkedIn:</p>
                  <motion.a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#0A66C2] text-white font-medium hover:bg-[#004182] transition-all duration-300"
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
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 text-white font-medium text-center"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  >
                    Open Email
                  </motion.a>
                  <motion.button
                    onClick={handleCopyEmail}
                    className="px-6 py-3 rounded-xl bg-gray-700/50 backdrop-blur-sm text-white font-medium hover:bg-gray-600/50 transition-all duration-300 border border-gray-600/30"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  >
                    {isCopied ? 'Copied!' : 'Copy Email'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
