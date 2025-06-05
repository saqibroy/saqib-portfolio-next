'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React, { useState } from 'react';
import { Copy, Check, Lightbulb, AlertCircle, Info, Zap, Target } from 'lucide-react';

// Enhanced callout components with modern design
function TryThis({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 group">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/30 to-green-900/20 border border-emerald-700/30 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 opacity-50" />
        <div className="relative p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-emerald-300 font-semibold text-lg mb-3 flex items-center gap-2">
                Try This Strategy
                <Zap className="w-4 h-4" />
              </h4>
              <div className="text-emerald-100 leading-relaxed prose prose-invert prose-sm max-w-none prose-p:mb-3 prose-strong:text-emerald-200">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 group">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900/30 to-yellow-900/20 border border-amber-700/30 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 opacity-50" />
        <div className="relative p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-amber-300 font-semibold text-lg mb-3 flex items-center gap-2">
                Important Note
                <AlertCircle className="w-4 h-4" />
              </h4>
              <div className="text-amber-100 leading-relaxed prose prose-invert prose-sm max-w-none prose-p:mb-3 prose-strong:text-amber-200">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced code block with better styling
function CodeBlock({ className, children, ...props }: any) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (match) {
    return (
      <div className="relative group my-6">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity" />
        <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              {match[1]}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <SyntaxHighlighter
            language={match[1]}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              background: 'transparent',
              padding: '1.5rem',
              fontSize: '0.9rem',
              lineHeight: '1.6',
            }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }

  return (
    <code 
      className="px-2 py-1 rounded-md bg-gray-800 text-blue-300 font-mono text-sm border border-gray-700" 
      {...props}
    >
      {children}
    </code>
  );
}

// Custom components for the article
const components = {
  pre: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  code: CodeBlock,
  TryThis,
  Note,
  
  // Enhanced headings with better spacing and styling
  h1: ({ children, ...props }: any) => (
    <h1 className="text-4xl md:text-5xl font-black text-white mb-8 mt-16 first:mt-0 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" {...props}>
      {children}
    </h1>
  ),
  
  h2: ({ children, ...props }: any) => (
    <h2 className="text-3xl font-bold text-white mb-6 mt-16 first:mt-8 relative group" {...props}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent rounded-lg -ml-4 pl-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </h2>
  ),
  
  h3: ({ children, ...props }: any) => (
    <h3 className="text-2xl font-semibold text-gray-100 mb-4 mt-12 flex items-center gap-3" {...props}>
      <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
      {children}
    </h3>
  ),
  
  // Enhanced paragraph styling
  p: ({ children, ...props }: any) => (
    <p className="text-gray-300 leading-relaxed mb-6 text-lg" {...props}>
      {children}
    </p>
  ),
  
  // Enhanced list styling
  ul: ({ children, ...props }: any) => (
    <ul className="my-6 space-y-3" {...props}>
      {children}
    </ul>
  ),
  
  li: ({ children, ...props }: any) => (
    <li className="text-gray-300 flex items-start gap-3" {...props}>
      <span className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0" />
      <span>{children}</span>
    </li>
  ),
  
  // Enhanced blockquote
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="my-8 pl-6 border-l-4 border-blue-500 bg-blue-900/10 py-4 rounded-r-lg backdrop-blur-sm" {...props}>
      <div className="text-blue-100 text-lg italic">
        {children}
      </div>
    </blockquote>
  ),
  
  // Enhanced links
  a: ({ children, href, ...props }: any) => (
    <a 
      href={href}
      className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-400/30 hover:decoration-blue-300 underline-offset-4 decoration-2"
      {...props}
    >
      {children}
    </a>
  ),
};

export default function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <div className="mdx-content">
      <Component components={components} />
    </div>
  );
}