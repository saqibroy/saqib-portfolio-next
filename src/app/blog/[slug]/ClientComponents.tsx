'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Share2, Facebook, Twitter, Linkedin, MessageCircle, Headphones, Sparkles, X, Menu } from 'lucide-react'; // Added Menu and X icons

export function StickySocialActions({ postSlug, currentUrl, postTitle, postDescription }: {
  postSlug: string;
  currentUrl: string;
  postTitle: string;
  postDescription?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showMobileShare, setShowMobileShare] = useState(false); // State for mobile share menu

  useEffect(() => {
    setMounted(true);
  }, []);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(postTitle)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
  };

  const copyToClipboard = async () => {
    if (!mounted) return;
    
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
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

  const scrollToComments = () => {
    const commentsElement = document.getElementById('comments');
    if (commentsElement) {
      commentsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Desktop Sticky Social Actions */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
        <div className="flex flex-col gap-3 p-4 bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl">
          {/* Share Label */}
          <div className="text-center mb-2">
            <span className="text-xs font-medium text-gray-400 block">Share</span>
          </div>
          
          {/* Twitter Share */}
          <button
            onClick={() => handleShare(shareLinks.twitter)}
            className="group p-3 rounded-xl bg-gray-800/50 hover:bg-blue-600/20 text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 backdrop-blur-sm ring-1 ring-gray-700 hover:ring-blue-500"
            title="Share on Twitter"
            aria-label="Share on Twitter"
          >
            <Twitter className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </button>

          {/* Facebook Share */}
          <button
            onClick={() => handleShare(shareLinks.facebook)}
            className="group p-3 rounded-xl bg-gray-800/50 hover:bg-blue-600/20 text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-110 backdrop-blur-sm ring-1 ring-gray-700 hover:ring-blue-500"
            title="Share on Facebook"
            aria-label="Share on Facebook"
          >
            <Facebook className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </button>

          {/* LinkedIn Share */}
          <button
            onClick={() => handleShare(shareLinks.linkedin)}
            className="group p-3 rounded-xl bg-gray-800/50 hover:bg-blue-600/20 text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-110 backdrop-blur-sm ring-1 ring-gray-700 hover:ring-blue-500"
            title="Share on LinkedIn"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </button>

          {/* Copy Link */}
          <button
            onClick={copyToClipboard}
            className="group p-3 rounded-xl bg-gray-800/50 hover:bg-green-600/20 text-gray-400 hover:text-green-400 transition-all duration-300 hover:scale-110 backdrop-blur-sm ring-1 ring-gray-700 hover:ring-green-500"
            title="Copy link"
            aria-label="Copy link"
          >
            {copied ? (
              <div className="w-5 h-5 flex items-center justify-center">
                <span className="text-[10px] font-bold text-green-400">✓</span>
              </div>
            ) : (
              <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            )}
          </button>

          {/* Divider */}
          <div className="w-full h-px bg-gray-700/50 my-2"></div>
          
          {/* Comments Scroll Button */}
          <button
            onClick={scrollToComments}
            className="group p-3 rounded-xl bg-gray-800/50 hover:bg-purple-600/20 text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
            title="Jump to comments"
          >
            <MessageCircle className="w-5 h-5 group-hover:bounce transition-transform" />
          </button>
        </div>
      </div>

      {/* Mobile Floating Share Button */}
      <div className="fixed bottom-4 right-4 z-40 xl:hidden">
        <button
          onClick={() => setShowMobileShare(!showMobileShare)}
          className="p-3 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          aria-label="Toggle mobile share menu"
        >
          {showMobileShare ? <X className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
        </button>

        {/* Mobile Share Menu */}
        {showMobileShare && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-3 p-4 bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl">
            <button
              onClick={() => handleShare(shareLinks.twitter)}
              className="group p-3 rounded-xl bg-gray-800/50 hover:bg-blue-600/20 text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 backdrop-blur-sm ring-1 ring-gray-700 hover:ring-blue-500"
              title="Share on Twitter"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare(shareLinks.facebook)}
              className="group p-3 rounded-xl bg-gray-800/50 hover:bg-blue-600/20 text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-110 backdrop-blur-sm ring-1 ring-gray-700 hover:ring-blue-500"
              title="Share on Facebook"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare(shareLinks.linkedin)}
              className="group p-3 rounded-xl bg-gray-800/50 hover:bg-blue-600/20 text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-110 backdrop-blur-sm ring-1 ring-gray-700 hover:ring-blue-500"
              title="Share on LinkedIn"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </button>
            <button
              onClick={copyToClipboard}
              className="group p-3 rounded-xl bg-gray-800/50 hover:bg-green-600/20 text-gray-400 hover:text-green-400 transition-all duration-300 hover:scale-110 backdrop-blur-sm ring-1 ring-gray-700 hover:ring-green-500"
              title="Copy link"
              aria-label="Copy link"
            >
              {copied ? (
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-green-400">✓</span>
                </div>
              ) : (
                <Share2 className="w-5 h-5" />
              )}
            </button>
            <div className="w-full h-px bg-gray-700/50 my-1"></div>
            <button
              onClick={() => { scrollToComments(); setShowMobileShare(false); }}
              className="group p-3 rounded-xl bg-gray-800/50 hover:bg-purple-600/20 text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
              title="Jump to comments"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
// AI Features Banner Component
export function AIFeaturesBanner() {
  const scrollToAudioSummary = () => {
    const audioElement = document.getElementById('audio-summary');
    if (audioElement) {
      audioElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mb-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-green-900/30 border border-purple-500/30 backdrop-blur-sm overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-green-600/10 animate-pulse" />
      
      <div className="relative flex flex-col sm:flex-row items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              AI-Powered Features Available
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                NEW
              </span>
            </h3>
            <p className="text-gray-300 text-sm">
              Get an AI-generated audio summary and enhanced reading experience
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={scrollToAudioSummary}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
          >
            <Headphones className="w-4 h-4" />
            Try Audio Summary
          </button>
        </div>
      </div>
    </div>
  );
}

// Fixed Giscus Comments Component
export const GiscusComments = ({ postSlug, postTitle }: { postSlug: string; postTitle: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  const loadGiscus = useCallback(() => {
    if (!containerRef.current) return;

    // Clear any existing script
    if (scriptRef.current) {
      scriptRef.current.remove();
      scriptRef.current = null;
    }

    // Clear container
    containerRef.current.innerHTML = '';

    setIsLoading(true);
    setError(null);
    setIsLoaded(false);

    // Create new script
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

    script.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);
    };

    script.onerror = () => {
      setError('Failed to load comments');
      setIsLoading(false);
    };

    // Store reference and append
    scriptRef.current = script;
    containerRef.current.appendChild(script);

    // Timeout fallback
    setTimeout(() => {
      if (!isLoaded && isLoading) {
        setIsLoaded(true);
        setIsLoading(false);
      }
    }, 5000);
  }, [postSlug, isLoaded, isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadGiscus();
    }, 500);

    return () => {
      clearTimeout(timer);
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
    };
  }, [postSlug]); // Reload when postSlug changes

  const handleRetry = () => {
    loadGiscus();
  };

  return (
    <section className="mt-12 sm:mt-20 mb-8 sm:mb-16" id="comments"> {/* Adjusted margins */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl sm:rounded-2xl p-4 sm:p-8 backdrop-blur-sm ring-1 ring-gray-700/50"> {/* Adjusted padding and rounded */}
        <div className="flex items-center gap-3 mb-4 sm:mb-8"> {/* Adjusted margin */}
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" /> {/* Replaced SVG with Lucide icon and adjusted size */}
          <h3 className="text-xl sm:text-2xl font-bold text-white"> {/* Adjusted font size */}
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

        {/* Giscus Container */}
        <div className="relative min-h-[200px]">
          <div ref={containerRef} className="giscus-container" />
          
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/20 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-400 border-t-transparent"></div>
                <span className="text-gray-400 text-sm">Loading comments...</span>
              </div>
            </div>
          )}

          {/* Error overlay */}
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
        </div>
      </div>
    </section>
  );
};

// Fixed Social Share Component
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
    <div className="flex flex-wrap items-center justify-center gap-3"> {/* Added flex-wrap */}
      <span className="text-sm font-medium text-gray-400">Share this article:</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleShare(shareLinks.twitter)}
          className="group p-3 rounded-full bg-gray-800/50 hover:bg-blue-600/20 text-gray-400 hover:text-blue-400 transition-all duration-300 backdrop-blur-sm ring-1 ring-gray-700 hover:ring-blue-500 hover:scale-110"
          title="Share on Twitter"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleShare(shareLinks.facebook)}
          className="group p-3 rounded-full bg-gray-800/50 hover:bg-blue-600/20 text-gray-400 hover:text-blue-600 transition-all duration-300 backdrop-blur-sm ring-1 ring-gray-700 hover:ring-blue-500 hover:scale-110"
          title="Share on Facebook"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleShare(shareLinks.linkedin)}
          className="group p-3 rounded-full bg-gray-800/50 hover:bg-blue-600/20 text-gray-400 hover:text-blue-600 transition-all duration-300 backdrop-blur-sm ring-1 ring-gray-700 hover:ring-blue-500 hover:scale-110"
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </button>
        <button
          onClick={copyToClipboard}
          className="group p-3 rounded-full bg-gray-800/50 hover:bg-green-600/20 text-gray-400 hover:text-green-400 transition-all duration-300 backdrop-blur-sm ring-1 ring-gray-700 hover:ring-green-500 hover:scale-110"
          title="Copy link"
          aria-label="Copy link"
        >
          {copied ? (
            <span className="text-xs font-medium px-1 text-green-400">✓</span>
          ) : (
            <Share2 className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

// Fixed Like Button Component
export const LikeButton = ({ postSlug }: { postSlug: string }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // In a real app, you'd load the actual like status and count from your backend
    // For now, we'll use local state
  }, []);

  const handleLike = useCallback(() => {
    if (!mounted) return;
    
    const newLikedState = !isLiked;
    const newCount = newLikedState ? likeCount + 1 : Math.max(0, likeCount - 1);
    
    setIsLiked(newLikedState);
    setLikeCount(newCount);
    setIsAnimating(true);
    
    // Reset animation after 600ms
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);

    // In a real app, you'd send this to your backend
    console.log('Like status changed:', { postSlug, isLiked: newLikedState, count: newCount });
  }, [mounted, isLiked, likeCount, postSlug]);

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
