// src/app/accessibility-checker/page.tsx
'use client'; // This is a client component

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import {
  Sparkles, Loader2, LinkIcon, X, CheckCircle, AlertTriangle, Info, MessageCircle,
  Eye, Lightbulb, Zap, Code, ExternalLink, ClipboardCopy, FileWarning, Search
} from 'lucide-react';

interface AxeViolationNode {
  html: string;
  target: string[];
  // Other properties like any, relatedNodes, etc. are also available but not always needed for display
}

interface AxeResultBase {
  id: string;
  impact: string;
  help: string;
  description: string;
  nodes: AxeViolationNode[];
  helpUrl: string;
}

interface EnhancedViolation extends AxeResultBase {
  plainExplanation?: string;
  fixSuggestion?: string;
}

interface AccessibilityReport {
  violations: EnhancedViolation[];
  passes: AxeResultBase[];
  incomplete: AxeResultBase[];
  url: string;
}

export default function AccessibilityCheckerPage() {
  const [url, setUrl] = useState('');
  const [report, setReport] = useState<AccessibilityReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState('');

  const messages = [
    "Analyzing page structure...",
    "Checking for semantic HTML...",
    "Auditing color contrast...",
    "Verifying keyboard navigability...",
    "Detecting missing alt text...",
    "Evaluating ARIA attributes...",
    "Generating AI explanations...",
    "Crafting actionable fixes..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      let messageIndex = 0;
      setCurrentMessage(messages[messageIndex]);
      interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        setCurrentMessage(messages[messageIndex]);
      }, 2000); // Change message every 2 seconds
    } else {
      setCurrentMessage('');
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setReport(null);
    setError(null);
  
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError('Please enter a valid URL starting with http:// or https://');
      setLoading(false);
      return;
    }
  
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout
  
      const response = await fetch('/api/check-accessibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      });
  
      clearTimeout(timeoutId);
  
      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle specific error types
        if (response.status === 403) {
          throw new Error('This website blocks automated access. Please try a different URL.');
        } else if (response.status === 408) {
          throw new Error('The website took too long to load. Please try again or use a different URL.');
        } else if (response.status === 500) {
          throw new Error('Server error occurred. Please try again in a few moments.');
        } else {
          throw new Error(errorData.message || 'Failed to generate report.');
        }
      }
  
      const data: AccessibilityReport = await response.json();
      setReport(data);
    } catch (err) {
      console.error('Frontend fetch error:', err);
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Request timed out. The analysis is taking too long. Please try a simpler website.');
        } else {
          setError(err.message || 'An unexpected error occurred.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-700/30';
      case 'serious': return 'text-orange-400 bg-orange-900/20 border-orange-700/30';
      case 'moderate': return 'text-yellow-400 bg-yellow-900/20 border-yellow-700/30';
      case 'minor': return 'text-blue-400 bg-blue-900/20 border-blue-700/30';
      default: return 'text-gray-400 bg-gray-800/20 border-gray-700/30';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'critical': return <FileWarning className="w-4 h-4" />;
      case 'serious': return <AlertTriangle className="w-4 h-4" />;
      case 'moderate': return <Lightbulb className="w-4 h-4" />;
      case 'minor': return <Info className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        alert('Copied to clipboard!');
      } catch (fallbackErr) {
        alert('Failed to copy text. Please copy manually.');
        console.error('Fallback copy failed: ', fallbackErr);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 sm:py-12 pt-32 sm:pt-28 md:pt-32">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Accessibility Auditor
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-2 sm:px-0">
            Enter a website URL to get an instant accessibility report with AI-powered explanations and fix suggestions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 shadow-xl max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700/70 border border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-inner"
                aria-label="Website URL"
                required
              />
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="relative overflow-hidden px-8 py-3 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg
                bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white
                disabled:bg-gray-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed disabled:text-gray-300"
            >
              <div className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Report</span>
                  </>
                )}
              </div>
            </button>
          </div>
          {loading && (
            <div className="mt-4 text-center text-sm text-gray-400 flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" />
              <span>{currentMessage}</span>
            </div>
          )}
          {error && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-700/30 text-red-300 rounded-lg text-sm flex items-center gap-2">
              <X className="w-5 h-5" />
              <span>Error: {error}</span>
            </div>
          )}
        </form>

        {report && (
          <div className="space-y-10">
            {/* Summary Section */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-700/30 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-green-400" />
                Report Summary for <a href={report.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{report.url}</a>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
                  <p className="text-3xl font-bold text-red-400">{report.violations.length}</p>
                  <p className="text-gray-300 text-sm">Violations Found</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
                  <p className="text-3xl font-bold text-green-400">{report.passes.length}</p>
                  <p className="text-gray-300 text-sm">Checks Passed</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
                  <p className="text-3xl font-bold text-yellow-400">{report.incomplete.length}</p>
                  <p className="text-gray-300 text-sm">Needs Review</p>
                </div>
              </div>
            </div>

            {/* Violations Section */}
            {report.violations.length > 0 && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-700/30 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <FileWarning className="w-7 h-7 text-red-400" />
                  Detailed Violations
                </h2>
                <div className="space-y-6">
                  {report.violations.map((violation, index) => (
                    <div key={index} className={`p-5 rounded-xl border ${getImpactColor(violation.impact)} bg-gray-900/50`}>
                      <div className="flex items-center gap-3 mb-3">
                        {getImpactIcon(violation.impact)}
                        <h3 className="text-lg font-semibold text-white">
                          {violation.help} ({violation.impact.charAt(0).toUpperCase() + violation.impact.slice(1)})
                        </h3>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{violation.description}</p>

                      {violation.plainExplanation && (
                        <div className="mt-4 p-4 rounded-lg bg-gray-800/70 border border-gray-600/50">
                          <h4 className="text-lg font-semibold text-purple-300 mb-2 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                            AI Explanation
                          </h4>
                          <p className="text-gray-200 text-sm leading-relaxed">{violation.plainExplanation}</p>
                        </div>
                      )}

                      {violation.fixSuggestion && (
                        <div className="mt-4 p-4 rounded-lg bg-gray-800/70 border border-gray-600/50">
                          <h4 className="text-lg font-semibold text-green-300 mb-2 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-green-400" />
                            AI Fix Suggestion
                          </h4>
                          <pre className="relative bg-gray-900 text-white rounded-lg p-3 text-xs overflow-x-auto my-2">
                            <button
                              onClick={() => copyToClipboard(violation.fixSuggestion || '')}
                              className="absolute top-2 right-2 p-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
                              title="Copy code"
                            >
                              <ClipboardCopy className="w-4 h-4" />
                            </button>
                            <code className="block whitespace-pre-wrap">{violation.fixSuggestion}</code>
                          </pre>
                        </div>
                      )}

                      {violation.nodes.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-md font-semibold text-gray-300 mb-2 flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            Affected Elements ({violation.nodes.length})
                          </h4>
                          <div className="max-h-40 overflow-y-auto bg-gray-800/70 rounded-lg border border-gray-700/50 p-3">
                            <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                              {violation.nodes.map((node, nodeIdx) => (
                                <li key={nodeIdx} className="break-all font-mono">
                                  <span className="text-blue-400">{node.target.join(', ')}</span>: {node.html}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-4 text-right">
                        <a href={violation.helpUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-400 hover:underline text-sm">
                          Learn More <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Passes Section */}
            {report.passes.length > 0 && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-700/30 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <CheckCircle className="w-7 h-7 text-green-400" />
                  Passed Checks
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {report.passes.map((pass, index) => (
                    <li key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm">{pass.help}</p>
                        <p className="text-gray-400 text-xs">{pass.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Incomplete / Needs Review Section */}
            {report.incomplete.length > 0 && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-900/20 to-amber-900/20 border border-yellow-700/30 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Info className="w-7 h-7 text-yellow-400" />
                  Needs Manual Review
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {report.incomplete.map((item, index) => (
                    <li key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-start gap-3">
                      <MessageCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm">{item.help}</p>
                        <p className="text-gray-400 text-xs">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}