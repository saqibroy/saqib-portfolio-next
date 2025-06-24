'use client';

// In a real Next.js app, you would typically use:
// import { useMDXComponent } from 'next-contentlayer/hooks';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import React, { useMemo, useState } from 'react';
import { Copy, Check, Lightbulb, AlertCircle, Info, Zap, Target } from 'lucide-react';

// For this standalone preview environment, we'll simplify code block rendering
// and directly use the provided custom components since MDX compilation isn't available.

// Placeholder for SyntaxHighlighter to prevent errors in this environment
const SyntaxHighlighter = ({ children, ...props }: any) => (
  <pre {...props}><code>{children}</code></pre>
);
const vscDarkPlus = {}; // Placeholder style object

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
    // document.execCommand('copy') is used as navigator.clipboard.writeText() may not work due to iFrame restrictions.
    const textToCopy = String(children).replace(/\n$/, '');
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
  // `pre` and `code` tags are now handled by our local CodeBlock.
  // In a real MDX environment, you'd configure `rehype-prism` or similar.
  pre: ({ children, ...props }: any) => <CodeBlock {...props}>{children}</CodeBlock>,
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
  // This is a simplified approach for the standalone preview.
  // In a full Next.js application with contentlayer, `useMDXComponent` would handle this.
  // We manually parse and replace the custom components (`TryThis`, `Note`)
  // and render the rest as raw HTML.
  const processedHtml = useMemo(() => {
    let htmlContent = code;

    // A simple regex to replace the custom React components with their HTML structure.
    // This is a basic illustration and may not cover all MDX complexities.
    htmlContent = htmlContent.replace(/<div className="TryThis">([\s\S]*?)<\/div>/g, (match, content) => {
      // Re-create the HTML structure with the correct Tailwind classes and Lucide icons
      // This part is crucial to ensure it matches the visual intent of the original TryThis component
      return `
        <div class="my-8 group">
          <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/30 to-green-900/20 border border-emerald-700/30 backdrop-blur-sm">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 opacity-50"></div>
            <div class="relative p-6">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-white"><path d="M14.5 13.5 10 18l-5.5-5.5"></path><path d="M2 11.5 10 3l8 8"></path><path d="M12 2v20"></path></svg>
                </div>
                <div class="flex-1">
                  <h4 class="text-emerald-300 font-semibold text-lg mb-3 flex items-center gap-2">
                    Try This Strategy
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="m13 2-3 8a9 9 0 1 0 9 9.5 7.5 7.5 0 0 1-5-6.5C15.5 9.8 17 8.5 17 6c0-2-2.5-3-4-2Z"></path></svg>
                  </h4>
                  <div class="text-emerald-100 leading-relaxed prose prose-invert prose-sm max-w-none prose-p:mb-3 prose-strong:text-emerald-200">
                    ${content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    htmlContent = htmlContent.replace(/<div class="Note">([\s\S]*?)<\/div>/g, (match, content) => {
      // Re-create the HTML structure for the Note component
      return `
        <div class="my-8 group">
          <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900/30 to-yellow-900/20 border border-amber-700/30 backdrop-blur-sm">
            <div class="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 opacity-50"></div>
            <div class="relative p-6">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-white"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                </div>
                <div class="flex-1">
                  <h4 class="text-amber-300 font-semibold text-lg mb-3 flex items-center gap-2">
                    Important Note
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  </h4>
                  <div class="text-amber-100 leading-relaxed prose prose-invert prose-sm max-w-none prose-p:mb-3 prose-strong:text-amber-200">
                    ${content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    // You can add more replacements here for other custom MDX components if needed.

    return htmlContent;
  }, [code]);

  // For other Markdown elements (like headings, paragraphs, lists, etc.),
  // we rely on the parent component's `prose` classes to apply styling.
  // The `dangerouslySetInnerHTML` will render the basic HTML.
  return (
    <div className="mdx-content" dangerouslySetInnerHTML={{ __html: processedHtml }} />
  );
}

// NOTE: This file is designed to be used within a Next.js environment with Contentlayer.
// For standalone previews, custom components like <TryThis> and <Note>
// are transformed into raw HTML with their intended styling via `dangerouslySetInnerHTML`.
// The SyntaxHighlighter is also a placeholder for this environment.
