// src/app/accessibility/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ExternalLink, 
  Brain,
  Target,
  Zap,
  AlertCircle,
  Info,
  Loader,
  Globe,
  Shield
} from 'lucide-react';

interface AccessibilityViolation {
  id: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  description: string;
  help: string;
  helpUrl: string;
  tags: string[];
  nodes: {
    html: string;
    target: string[];
    failureSummary: string;
  }[];
  aiExplanation?: {
    explanation: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    steps: string[];
    impact: string;
  };
}

interface AccessibilityReport {
  url: string;
  timestamp: string;
  processingTimeMs: number;
  summary: {
    totalViolations: number;
    totalPasses: number;
    totalIncomplete: number;
  };
  violations: AccessibilityViolation[];
  passes: number;
  incomplete: any[];
  remainingViolations?: number;
  aiSummary?: string;
}

const impactColors = {
  critical: 'bg-red-900/20 border-red-500/50 text-red-300',
  serious: 'bg-orange-900/20 border-orange-500/50 text-orange-300',
  moderate: 'bg-yellow-900/20 border-yellow-500/50 text-yellow-300',
  minor: 'bg-blue-900/20 border-blue-500/50 text-blue-300'
};

const priorityColors = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-blue-500'
};

const impactIcons = {
  critical: AlertTriangle,
  serious: AlertCircle,
  moderate: Info,
  minor: Info
};

// Loading messages that cycle through during the check
const loadingMessages = [
  { icon: Globe, message: "Connecting to your website...", color: "text-blue-400" },
  { icon: Search, message: "Scanning page structure...", color: "text-green-400" },
  { icon: Shield, message: "Running WCAG accessibility tests...", color: "text-purple-400" },
  { icon: Target, message: "Analyzing color contrast...", color: "text-yellow-400" },
  { icon: CheckCircle, message: "Checking keyboard navigation...", color: "text-cyan-400" },
  { icon: AlertTriangle, message: "Validating ARIA attributes...", color: "text-orange-400" },
  { icon: Brain, message: "AI analyzing violations...", color: "text-violet-400" },
  { icon: Zap, message: "Generating recommendations...", color: "text-pink-400" },
  { icon: Info, message: "Finalizing report...", color: "text-emerald-400" }
];

export default function AccessibilityPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AccessibilityReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Cycle through loading messages
  useEffect(() => {
    if (!loading) return;

    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000); // Change message every 2 seconds

    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) return prev; // Cap at 90% until real completion
        return prev + Math.random() * 10;
      });
    }, 500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [loading]);

  // Reset loading states when loading stops
  useEffect(() => {
    if (!loading) {
      setCurrentMessageIndex(0);
      setLoadingProgress(0);
    }
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setReport(null);
    setLoadingProgress(0);

    try {
      const response = await fetch('/api/check-accessibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to check accessibility');
      }

      if (data.success) {
        setLoadingProgress(100);
        // Small delay to show completion
        setTimeout(() => {
          setReport(data.data);
        }, 500);
      } else {
        throw new Error(data.error || 'Accessibility check failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const getScoreColor = (violations: number) => {
    if (violations === 0) return 'text-green-400';
    if (violations <= 5) return 'text-yellow-400';
    if (violations <= 15) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreLabel = (violations: number) => {
    if (violations === 0) return 'Excellent';
    if (violations <= 5) return 'Good';
    if (violations <= 15) return 'Needs Improvement';
    return 'Poor';
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 sm:py-12 pt-32 sm:pt-28 md:pt-32">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                Accessibility Checker
              </span>
            </h1>
          </div>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto px-2 sm:px-0">
            AI-powered WCAG compliance analysis with detailed explanations and actionable recommendations
          </p>
        </div>

        {/* AI Features Banner */}
        <div className="relative mb-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-green-900/30 border border-purple-500/30 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Brain className="w-6 h-6 text-purple-400 animate-pulse" />
            <h2 className="text-xl font-bold text-white">AI-Enhanced Analysis</h2>
            <div className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-green-500 to-blue-500 text-white">
              POWERED BY GEMINI
            </div>
          </div>
          <p className="text-center text-gray-300 text-sm sm:text-base">
            Get technical accessibility violations translated into clear, actionable guidance with AI-powered explanations
          </p>
        </div>

        {/* URL Input Form */}
        <div className="max-w-4xl mx-auto mb-8">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL to check accessibility (e.g., https://example.com)"
                className="w-full pl-12 pr-32 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/70 transition-all"
                disabled={loading}
                required
              />
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Check
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Enhanced Loading Display */}
        {loading && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-600/50 backdrop-blur-sm">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-300">Analysis Progress</span>
                  <span className="text-sm font-medium text-gray-300">{Math.round(loadingProgress)}%</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
              </div>

              {/* Current Message */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  {(() => {
                    const currentMessage = loadingMessages[currentMessageIndex];
                    const IconComponent = currentMessage.icon;
                    return (
                      <>
                        <div className={`p-3 rounded-xl bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600/30 ${currentMessage.color}`}>
                          <IconComponent className="w-6 h-6 animate-pulse" />
                        </div>
                        <div className="text-lg font-semibold text-white animate-pulse">
                          {currentMessage.message}
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* Loading Steps Indicator */}
                <div className="flex justify-center gap-2 mb-4">
                  {loadingMessages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index <= currentMessageIndex 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                          : 'bg-gray-600/50'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-400 max-w-md mx-auto">
                  Please wait while we perform a comprehensive accessibility analysis of your website...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-300">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-semibold">Error</h3>
            </div>
            <p>{error}</p>
          </div>
        )}

        {/* Results */}
        {report && (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl border border-gray-600/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-300 font-medium">Overall Score</h3>
                  <Target className="w-5 h-5 text-gray-400" />
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(report.summary.totalViolations)}`}>
                  {getScoreLabel(report.summary.totalViolations)}
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {report.summary.totalViolations} violations found
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-red-900/20 to-red-800/20 rounded-xl border border-red-500/30">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-red-300 font-medium">Violations</h3>
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div className="text-2xl font-bold text-red-300">
                  {report.summary.totalViolations}
                </div>
                <p className="text-sm text-red-400/80 mt-1">
                  Need attention
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-xl border border-green-500/30">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-green-300 font-medium">Passes</h3>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-green-300">
                  {report.summary.totalPasses}
                </div>
                <p className="text-sm text-green-400/80 mt-1">
                  Working correctly
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-xl border border-blue-500/30">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-blue-300 font-medium">Analysis Time</h3>
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-blue-300">
                  {(report.processingTimeMs / 1000).toFixed(1)}s
                </div>
                <p className="text-sm text-blue-400/80 mt-1">
                  Processing time
                </p>
              </div>
            </div>

            {/* AI Summary */}
            {report.aiSummary && (
              <div className="p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-500/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-bold text-white">AI Summary</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{report.aiSummary}</p>
              </div>
            )}

            {/* Violations List */}
            {report.violations.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Accessibility Issues</h2>
                  {report.remainingViolations && report.remainingViolations > 0 && (
                    <span className="text-sm text-gray-400">
                      Showing top 10 of {report.summary.totalViolations} issues
                    </span>
                  )}
                </div>

                {report.violations.map((violation, index) => {
                  const IconComponent = impactIcons[violation.impact];
                  
                  return (
                    <div
                      key={`${violation.id}-${index}`}
                      className={`p-6 rounded-xl border backdrop-blur-sm ${impactColors[violation.impact]}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-6 h-6 flex-shrink-0" />
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">
                              {violation.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${priorityColors[violation.aiExplanation?.priority || 'medium']}`}>
                                {violation.impact.toUpperCase()}
                              </span>
                              {violation.aiExplanation?.priority && (
                                <span className="text-sm text-gray-400">
                                  Priority: {violation.aiExplanation.priority}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <a
                          href={violation.helpUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>

                      {/* AI Explanation */}
                      {violation.aiExplanation && (
                        <div className="mb-4 p-4 bg-black/20 rounded-lg border border-gray-600/30">
                          <div className="flex items-center gap-2 mb-2">
                            <Brain className="w-4 h-4 text-purple-400" />
                            <h4 className="font-semibold text-white">AI Explanation</h4>
                          </div>
                          <p className="text-gray-300 mb-3">{violation.aiExplanation.explanation}</p>
                          
                          <div className="mb-3">
                            <h5 className="font-medium text-white mb-2">User Impact:</h5>
                            <p className="text-gray-300 text-sm">{violation.aiExplanation.impact}</p>
                          </div>

                          <div>
                            <h5 className="font-medium text-white mb-2">How to Fix:</h5>
                            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
                              {violation.aiExplanation.steps.map((step, idx) => (
                                <li key={idx}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      )}

                      {/* Technical Details */}
                      <div className="space-y-3">
                        <p className="text-gray-300">{violation.description}</p>
                        
                        <div className="text-sm text-gray-400">
                          <span className="font-medium">Affected elements:</span> {violation.nodes.length}
                        </div>

                        {violation.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {violation.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs font-medium bg-gray-700/50 text-gray-300 rounded border border-gray-600/50"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* No Issues Found */}
            {report.violations.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Perfect Accessibility Score!</h3>
                <p className="text-gray-300 max-w-md mx-auto">
                  No accessibility violations were found. Your website follows WCAG guidelines excellently.
                </p>
              </div>
            )}

            {/* Report Metadata */}
            <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-gray-600/30 text-sm text-gray-400">
              <p>
                Report generated for <span className="text-blue-400">{report.url}</span> on{' '}
                {new Date(report.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* Getting Started Guide */}
        {!report && !loading && (
          <div className="max-w-4xl mx-auto mt-12 p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-600/50">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <div className="font-medium text-blue-300 mb-2">1. Automated Scan</div>
                <p className="text-gray-300">Runs comprehensive WCAG 2.1 A/AA accessibility tests using axe-core engine</p>
              </div>
              <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                <div className="font-medium text-purple-300 mb-2">2. AI Analysis</div>
                <p className="text-gray-300">Gemini AI translates technical violations into clear, actionable guidance</p>
              </div>
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                <div className="font-medium text-green-300 mb-2">3. Detailed Report</div>
                <p className="text-gray-300">Get prioritized recommendations with step-by-step fixing instructions</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}