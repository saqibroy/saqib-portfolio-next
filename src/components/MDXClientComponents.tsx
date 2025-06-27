"use client";

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Copy, Check, Lightbulb, AlertCircle, Info, Zap, Target, 
  Clock, CheckCircle, Star, TrendingUp, BarChart3, AlertTriangle,
  Rocket, Award, BookOpen, ArrowRight, Flame, Eye
} from 'lucide-react';

function extractCodeString(children: any): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) {
    return children.map(extractCodeString).join('');
  }
  if (typeof children === 'object' && children && 'props' in children) {
    return extractCodeString(children.props.children);
  }
  return '';
}

export function CodeBlock({ className, children, ...props }: any) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');

  const codeString = extractCodeString(children);

  const handleCopy = async () => {
    const textToCopy = codeString.replace(/\n$/, '');
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    } finally {
      document.body.removeChild(textArea);
    }
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
            {codeString.replace(/\n$/, '')}
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
      {codeString}
    </code>
  );
}

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
            {/* Added relative and z-10 to ensure it's above potential overflows if any, 
                and explicitly set mb-2 for h4 */}
            <div className="flex-1 relative z-10"> 
              <h4 className="text-emerald-300 font-semibold text-lg mb-2 flex items-center gap-2"> {/* Changed mb-3 to mb-2 */}
                Try This Strategy
                <Zap className="w-4 h-4" />
              </h4>
              {/* Added prose-content to isolate prose styling if needed, removed prose-p:mb-3 */}
              <div className="text-emerald-100 leading-relaxed prose prose-invert prose-sm max-w-none prose-content"> 
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
            <div className="flex-1 relative z-10">
              <h4 className="text-amber-300 font-semibold text-lg mb-2 flex items-center gap-2"> {/* Changed mb-3 to mb-2 */}
                Important Note
                <AlertCircle className="w-4 h-4" />
              </h4>
              <div className="text-amber-100 leading-relaxed prose prose-invert prose-sm max-w-none prose-content">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickWin({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 group">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/40 to-cyan-900/30 border border-blue-600/40 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
        <div className="relative p-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 relative z-10">
              {/* Kept mb-2 here as it was already mb-2 in your original QuickWin */}
              <h4 className="text-blue-300 font-semibold text-base mb-2 flex items-center gap-2"> 
                Quick Win
                <Clock className="w-4 h-4" />
              </h4>
              {/* Removed prose-p:mb-2 from here as well */}
              <div className="text-blue-100 leading-relaxed prose prose-invert prose-sm max-w-none prose-content">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Checklist({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 group">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/30 to-indigo-900/20 border border-purple-600/30 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5" />
        <div className="relative p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 relative z-10">
              <h4 className="text-purple-300 font-semibold text-lg mb-2 flex items-center gap-2"> {/* Changed mb-3 to mb-2 */}
                Action Checklist
                <Star className="w-4 h-4" />
              </h4>
              {/* Kept prose-ul:space-y-2 as lists have different spacing needs */}
              <div className="text-purple-100 leading-relaxed prose prose-invert prose-sm max-w-none prose-ul:space-y-2">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stats({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 group">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-rose-900/30 to-pink-900/20 border border-rose-600/30 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-pink-500/5" />
        <div className="relative p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 relative z-10">
              <h4 className="text-rose-300 font-semibold text-lg mb-2 flex items-center gap-2"> {/* Changed mb-3 to mb-2 */}
                Key Statistics
                <TrendingUp className="w-4 h-4" />
              </h4>
              <div className="text-rose-100 leading-relaxed prose prose-invert prose-sm max-w-none prose-content">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 group">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-900/40 to-orange-900/30 border border-red-600/40 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />
        <div className="relative p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 relative z-10">
              <h4 className="text-red-300 font-semibold text-lg mb-2 flex items-center gap-2"> {/* Changed mb-3 to mb-2 */}
                Warning
                <AlertCircle className="w-4 h-4" />
              </h4>
              <div className="text-red-100 leading-relaxed prose prose-invert prose-sm max-w-none prose-content">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Intro({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-12 group">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/60 to-slate-900/40 border border-slate-700/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="relative p-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-7 h-7 text-white" />
            </div>
            {/* The Intro component doesn't have an h4 within the flex-1 div,
                so only added relative z-10 */}
            <div className="flex-1 relative z-10">
              <div className="text-xl text-gray-200 leading-relaxed font-medium">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionPlan({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-12 group">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-900/40 to-emerald-900/30 border border-green-600/40 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10" />
        <div className="relative p-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 relative z-10">
              {/* Changed mb-6 to mb-4 to reduce space below title */}
              <h4 className="text-green-300 font-bold text-2xl mb-4 flex items-center gap-3"> 
                Action Plan
                <ArrowRight className="w-6 h-6" />
              </h4>
              {/* Removed prose-strong:text-green-200 if it was causing issues,
                  and added prose-content */}
              <div className="text-green-100 leading-relaxed prose prose-invert max-w-none prose-content"> 
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 group">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-900/40 to-orange-900/30 border border-yellow-600/40 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10" />
        <div className="relative p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 relative z-10">
              <div className="text-yellow-100 leading-relaxed text-lg font-medium">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const components = {
  pre: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  code: CodeBlock,
  TryThis,
  Note,
  QuickWin,
  Checklist,
  Stats,
  Warning,
  Intro,
  ActionPlan,
  Highlight,
  h1: ({ children, ...props }: any) => (
    <h1 className="text-4xl md:text-5xl font-black text-white mb-8 mt-16 first:mt-0 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 mt-12 first:mt-8 relative group" {...props}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent rounded-lg -ml-4 pl-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl font-semibold text-gray-100 mb-3 mt-8 flex items-center gap-3" {...props}>
      <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
      {children}
    </h3>
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-gray-300 leading-relaxed mb-4 text-base" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="my-4 space-y-2" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }: any) => (
    <li className="text-gray-300 flex items-start gap-3" {...props}>
      <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="my-8 pl-6 border-l-4 border-blue-500 bg-blue-900/10 py-4 rounded-r-lg backdrop-blur-sm" {...props}>
      <div className="text-blue-100 text-lg italic">
        {children}
      </div>
    </blockquote>
  ),
  a: ({ children, href, ...props }: any) => (
    <a 
      href={href}
      className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-400/30 hover:decoration-blue-300 underline-offset-4 decoration-2"
      {...props}
    >
      {children}
    </a>
  ),
  hr: ({ ...props }: any) => (
    <hr className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" {...props} />
  ),
  strong: ({ children, ...props }: any) => (
    <strong className="font-bold text-white" {...props}>
      {children}
    </strong>
  ),
};