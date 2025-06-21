'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

// Simplified Giscus Comments Component - avoid DOM manipulation conflicts
export const GiscusComments = ({ postSlug, postTitle }: { postSlug: string; postTitle: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [key, setKey] = useState(0); // Force re-render when needed
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  // Load Giscus - simplified approach
  const loadGiscus = useCallback(() => {
    if (!containerRef.current || !mountedRef.current) return;

    setIsLoading(true);
    setError(null);

    const container = containerRef.current;

    // Create script element
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'saqibroy/saqib-portfolio-next');
    script.setAttribute('data-repo-id', 'R_kgDOOOuZIQ');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOOOuZIc4CrzPF');
    script.setAttribute('data-mapping', 'specific');
    script.setAttribute('data-term', postSlug);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    // Handle script events
    script.onload = () => {
      if (mountedRef.current) {
        setIsLoaded(true);
        setIsLoading(false);
      }
    };

    script.onerror = () => {
      if (mountedRef.current) {
        setError('Failed to load comments');
        setIsLoading(false);
      }
    };

    // Append script
    container.appendChild(script);

    // Set timeout to handle cases where onload doesn't fire
    const timeout = setTimeout(() => {
      if (mountedRef.current && isLoading) {
        setIsLoaded(true);
        setIsLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [postSlug, isLoading]);

  // Mount effect
  useEffect(() => {
    mountedRef.current = true;
    
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        loadGiscus();
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      mountedRef.current = false;
    };
  }, [loadGiscus]);

  // Handle slug changes by forcing re-render
  useEffect(() => {
    setKey(prev => prev + 1);
    setIsLoaded(false);
    setIsLoading(false);
    setError(null);
  }, [postSlug]);

  const handleRetry = () => {
    setError(null);
    setKey(prev => prev + 1); // Force re-render
    setTimeout(() => loadGiscus(), 100);
  };

  return (
    <section className="mt-20 mb-16">
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-8 backdrop-blur-sm ring-1 ring-gray-700/50">
        <div className="flex items-center gap-3 mb-8">
          <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
          <h3 className="text-2xl font-bold text-white">
            Discussion
          </h3>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-300 text-sm mb-4">
            Comments are powered by{' '}
            <a 
              href="https://giscus.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Giscus
            </a>
            . Sign in with GitHub to join the discussion.
          </p>
        </div>

        {/* Giscus Container - key forces complete re-render */}
        <div 
          key={`${postSlug}-${key}`}
          ref={containerRef}
          className="giscus-container min-h-[200px] relative"
        >
          {/* Loading state */}
          {isLoading && !isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/20 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-400 border-t-transparent"></div>
                <span className="text-gray-400 text-sm">Loading comments...</span>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/20 rounded-lg backdrop-blur-sm">
              <div className="text-center">
                <p className="text-red-400 text-sm mb-3">{error}</p>
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Placeholder when not loaded */}
          {!isLoading && !isLoaded && !error && (
            <div className="flex items-center justify-center py-12 text-gray-500">
              <span className="text-sm">Initializing comments...</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Memoized Social Share Component
export const SocialShareButtons = ({ url, title, description }: { url: string; title: string; description?: string }) => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const copyToClipboard = async () => {
    if (!mounted) return;
    
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed: ', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleShare = useCallback((shareUrl: string) => {
    if (!mounted) return;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-400">Share:</span>
        <div className="flex items-center gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-8 h-8 bg-gray-800/50 rounded-full animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-400">Share:</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleShare(shareLinks.twitter)}
          className="group p-2 rounded-full bg-gray-800/50 hover:bg-blue-600/20 text-gray-400 hover:text-blue-400 transition-all duration-300 backdrop-blur-sm ring-1 ring-gray-700 hover:ring-blue-500"
          title="Share on Twitter"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleShare(shareLinks.facebook)}
          className="group p-2 rounded-full bg-gray-800/50 hover:bg-blue-600/20 text-gray-400 hover:text-blue-600 transition-all duration-300 backdrop-blur-sm ring-1 ring-gray-700 hover:ring-blue-500"
          title="Share on Facebook"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleShare(shareLinks.linkedin)}
          className="group p-2 rounded-full bg-gray-800/50 hover:bg-blue-600/20 text-gray-400 hover:text-blue-600 transition-all duration-300 backdrop-blur-sm ring-1 ring-gray-700 hover:ring-blue-500"
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </button>
        <button
          onClick={copyToClipboard}
          className="group p-2 rounded-full bg-gray-800/50 hover:bg-green-600/20 text-gray-400 hover:text-green-400 transition-all duration-300 backdrop-blur-sm ring-1 ring-gray-700 hover:ring-green-500"
          title="Copy link"
          aria-label="Copy link"
        >
          {copied ? (
            <span className="text-xs font-medium px-2">Copied!</span>
          ) : (
            <Share2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

// Optimized Like Button Component
export const LikeButton = ({ postSlug }: { postSlug: string }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const handleLike = useCallback(() => {
    if (!mounted) return;
    
    const newLikedState = !isLiked;
    const newCount = newLikedState ? likeCount + 1 : Math.max(0, likeCount - 1);
    
    setIsLiked(newLikedState);
    setLikeCount(newCount);
    setIsAnimating(true);
    
    // Clear existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }, [mounted, isLiked, likeCount]);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 animate-pulse">
        <div className="w-4 h-4 bg-gray-600 rounded"></div>
        <div className="w-8 h-4 bg-gray-600 rounded"></div>
      </div>
    );
  }

  return (
    <button
      onClick={handleLike}
      className={`group flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 backdrop-blur-sm ring-1 ${
        isLiked
          ? 'bg-red-600/20 text-red-400 ring-red-500/50 hover:bg-red-600/30'
          : 'bg-gray-800/50 text-gray-400 ring-gray-700 hover:bg-red-600/20 hover:text-red-400 hover:ring-red-500'
      }`}
      aria-label={isLiked ? 'Unlike this post' : 'Like this post'}
    >
      <Heart 
        className={`w-4 h-4 transition-all duration-300 ${
          isLiked ? 'fill-current' : ''
        } ${isAnimating ? 'scale-125' : ''}`} 
      />
      <span className="text-sm">{likeCount > 0 ? likeCount : 'Like'}</span>
    </button>
  );
};