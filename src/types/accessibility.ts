// src/types/accessibility.ts

/**
 * Base accessibility violation from axe-core
 */
export interface BaseAccessibilityViolation {
    id: string;
    impact: 'minor' | 'moderate' | 'serious' | 'critical';
    description: string;
    help: string;
    helpUrl: string;
    tags: string[];
    nodes: AccessibilityNode[];
  }
  
  /**
   * Enhanced accessibility violation with AI explanations
   */
  export interface AccessibilityViolation extends BaseAccessibilityViolation {
    aiExplanation?: AIExplanation;
  }
  
  /**
   * Node information for accessibility violations
   */
  export interface AccessibilityNode {
    html: string;
    target: string[];
    failureSummary: string;
    impact?: 'minor' | 'moderate' | 'serious' | 'critical';
    any?: AccessibilityCheck[];
    all?: AccessibilityCheck[];
    none?: AccessibilityCheck[];
  }
  
  /**
   * Individual accessibility check result
   */
  export interface AccessibilityCheck {
    id: string;
    impact: string;
    message: string;
    data: any;
    relatedNodes?: AccessibilityRelatedNode[];
  }
  
  /**
   * Related node information
   */
  export interface AccessibilityRelatedNode {
    target: string[];
    html: string;
  }
  
  /**
   * AI-generated explanation for accessibility issues
   */
  export interface AIExplanation {
    explanation: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    steps: string[];
    impact: string;
  }
  
  /**
   * Summary statistics for accessibility report
   */
  export interface AccessibilitySummary {
    totalViolations: number;
    totalPasses: number;
    totalIncomplete: number;
    criticalCount?: number;
    seriousCount?: number;
    moderateCount?: number;
    minorCount?: number;
  }
  
  /**
   * Base accessibility report from microservice
   */
  export interface BaseAccessibilityReport {
    url: string;
    timestamp: string;
    processingTimeMs: number;
    summary: AccessibilitySummary;
    violations: BaseAccessibilityViolation[];
    passes: number;
    incomplete: any[];
    inapplicable?: any[];
  }
  
  /**
   * Enhanced accessibility report with AI features
   */
  export interface AccessibilityReport extends Omit<BaseAccessibilityReport, 'violations'> {
    violations: AccessibilityViolation[];
    remainingViolations?: number;
    aiSummary?: string;
  }
  
  /**
   * API response from accessibility microservice
   */
  export interface AccessibilityApiResponse {
    success: boolean;
    data?: BaseAccessibilityReport;
    error?: string;
    message?: string;
  }
  
  /**
   * Enhanced API response with AI features
   */
  export interface EnhancedAccessibilityApiResponse {
    success: boolean;
    data?: AccessibilityReport;
    error?: string;
    details?: string;
    microserviceError?: any;
  }
  
  /**
   * Request payload for accessibility check
   */
  export interface AccessibilityCheckRequest {
    url: string;
    options?: AccessibilityOptions;
  }
  
  /**
   * Configuration options for accessibility checking
   */
  export interface AccessibilityOptions {
    includeScreenshots?: boolean;
    wcagLevel?: 'A' | 'AA' | 'AAA';
    tags?: string[];
    timeout?: number;
    waitTime?: number;
  }
  
  /**
   * Accessibility rule configuration
   */
  export interface AccessibilityRule {
    id: string;
    enabled: boolean;
    options?: Record<string, any>;
  }
  
  /**
   * Color scheme mappings for different impact levels
   */
  export interface ImpactColorScheme {
    critical: string;
    serious: string;
    moderate: string;
    minor: string;
  }
  
  /**
   * Priority color mappings
   */
  export interface PriorityColorScheme {
    critical: string;
    high: string;
    medium: string;
    low: string;
  }
  
  /**
   * Component props for accessibility violation display
   */
  export interface AccessibilityViolationProps {
    violation: AccessibilityViolation;
    index: number;
    onExpand?: (violationId: string) => void;
    expanded?: boolean;
  }
  
  /**
   * Component props for accessibility report display
   */
  export interface AccessibilityReportProps {
    report: AccessibilityReport;
    loading?: boolean;
    onRecheck?: () => void;
  }
  
  /**
   * Component props for accessibility summary cards
   */
  export interface AccessibilitySummaryProps {
    summary: AccessibilitySummary;
    processingTime: number;
  }
  
  /**
   * Form state for URL input
   */
  export interface AccessibilityFormState {
    url: string;
    loading: boolean;
    error: string | null;
  }
  
  /**
   * Gemini AI request configuration
   */
  export interface GeminiConfig {
    model: string;
    apiKey: string;
    maxRetries?: number;
    timeout?: number;
  }
  
  /**
   * AI prompt template for violation explanation
   */
  export interface AIPromptTemplate {
    violation: BaseAccessibilityViolation;
    context?: {
      pageUrl: string;
      totalViolations: number;
      userLevel?: 'beginner' | 'intermediate' | 'expert';
    };
  }
  
  /**
   * Microservice health check response
   */
  export interface MicroserviceHealthCheck {
    status: 'healthy' | 'unhealthy';
    timestamp: string;
    version?: string;
    uptime?: number;
  }
  
  /**
   * Accessibility testing environment
   */
  export interface AccessibilityEnvironment {
    userAgent: string;
    viewport: {
      width: number;
      height: number;
    };
    colorScheme?: 'light' | 'dark';
    reducedMotion?: boolean;
  }
  
  /**
   * Batch accessibility check request
   */
  export interface BatchAccessibilityRequest {
    urls: string[];
    options?: AccessibilityOptions;
    maxConcurrent?: number;
  }
  
  /**
   * Batch accessibility response
   */
  export interface BatchAccessibilityResponse {
    results: Array<{
      url: string;
      success: boolean;
      data?: AccessibilityReport;
      error?: string;
    }>;
    summary: {
      total: number;
      successful: number;
      failed: number;
      totalViolations: number;
    };
  }
  
  /**
   * Historical accessibility data
   */
  export interface AccessibilityHistory {
    url: string;
    checks: Array<{
      timestamp: string;
      summary: AccessibilitySummary;
      score: number;
    }>;
  }
  
  /**
   * Accessibility score calculation
   */
  export interface AccessibilityScore {
    overall: number;
    breakdown: {
      critical: number;
      serious: number;
      moderate: number;
      minor: number;
    };
    grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
    recommendations: string[];
  }
  
  /**
   * Type guards for runtime type checking
   */
  export const isAccessibilityViolation = (obj: any): obj is AccessibilityViolation => {
    return obj && 
      typeof obj.id === 'string' &&
      typeof obj.impact === 'string' &&
      ['minor', 'moderate', 'serious', 'critical'].includes(obj.impact) &&
      typeof obj.description === 'string' &&
      Array.isArray(obj.nodes);
  };
  
  export const isAccessibilityReport = (obj: any): obj is AccessibilityReport => {
    return obj &&
      typeof obj.url === 'string' &&
      typeof obj.timestamp === 'string' &&
      typeof obj.processingTimeMs === 'number' &&
      obj.summary &&
      Array.isArray(obj.violations);
  };
  
  export const hasAIExplanation = (violation: AccessibilityViolation): violation is AccessibilityViolation & { aiExplanation: AIExplanation } => {
    return violation.aiExplanation !== undefined;
  };
  
  /**
   * Utility types for component states
   */
  export type AccessibilityPageState = 'idle' | 'loading' | 'success' | 'error';
  export type ViolationFilterType = 'all' | 'critical' | 'serious' | 'moderate' | 'minor';
  export type ReportSortOrder = 'impact' | 'alphabetical' | 'count';
  
  /**
   * Constants for accessibility checking
   */
  export const ACCESSIBILITY_CONSTANTS = {
    IMPACT_LEVELS: ['critical', 'serious', 'moderate', 'minor'] as const,
    PRIORITY_LEVELS: ['critical', 'high', 'medium', 'low'] as const,
    WCAG_LEVELS: ['A', 'AA', 'AAA'] as const,
    DEFAULT_TIMEOUT: 30000,
    MAX_VIOLATIONS_DISPLAY: 10,
    BATCH_SIZE_LIMIT: 5
  } as const;