import { NextRequest, NextResponse } from 'next/server';
import {
  AccessibilityViolation,
  BaseAccessibilityViolation,
  AccessibilityReport,
  BaseAccessibilityReport,
  AccessibilityApiResponse,
  EnhancedAccessibilityApiResponse,
  AccessibilityCheckRequest,
  AIExplanation,
  GeminiConfig
} from '@/types/accessibility';

// Generate AI-enhanced explanations using Gemini
async function generateAccessibilityExplanation(violation: BaseAccessibilityViolation): Promise<AIExplanation> {
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set, using fallback explanation');
      throw new Error('GEMINI_API_KEY is not set');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `As an accessibility expert, analyze this WCAG violation and provide user-friendly guidance:

VIOLATION DETAILS:
- ID: ${violation.id}
- Impact Level: ${violation.impact}
- Description: ${violation.description}
- Help Text: ${violation.help}
- Tags: ${violation.tags?.join(', ') || 'N/A'}
- Failed Elements: ${violation.nodes?.length || 0}

REQUIREMENTS:
1. Explain the issue in simple, non-technical language
2. Rate priority as: low, medium, high, or critical
3. Provide 3-5 specific, actionable steps to fix it
4. Explain the user impact in human terms

FORMAT YOUR RESPONSE AS JSON:
{
  "explanation": "Clear explanation of what's wrong and why it matters",
  "priority": "low|medium|high|critical",
  "steps": ["Step 1", "Step 2", "Step 3"],
  "impact": "How this affects real users with disabilities"
}

Focus on practical advice that developers can immediately implement.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse JSON response
    try {
      const parsed: AIExplanation = JSON.parse(text);
      return parsed;
    } catch (parseError) {
      console.warn('Failed to parse AI response as JSON:', parseError);
      // Fallback if JSON parsing fails
      return createFallbackExplanation(violation);
    }

  } catch (error) {
    console.error('AI explanation generation failed:', error);
    return createFallbackExplanation(violation);
  }
}

// Helper function to create fallback explanations
function createFallbackExplanation(violation: BaseAccessibilityViolation): AIExplanation {
  return {
    explanation: violation.description || 'Accessibility issue detected',
    priority: violation.impact === 'critical' || violation.impact === 'serious' ? 'high' :
             violation.impact === 'moderate' ? 'medium' : 'low',
    steps: [
      violation.help || 'Review the accessibility guidelines',
      `Review the ${violation.nodes?.length || 0} affected element(s)`,
      violation.helpUrl ? `Check WCAG guidelines: ${violation.helpUrl}` : 'Consult WCAG documentation'
    ],
    impact: `This ${violation.impact} issue affects users with disabilities`
  };
}

// Generate overall accessibility summary
async function generateOverallSummary(report: BaseAccessibilityReport, violations: AccessibilityViolation[]): Promise<string> {
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set, using fallback summary');
      return createFallbackSummary(report);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const criticalCount = violations.filter(v => v.impact === 'critical').length;
    const seriousCount = violations.filter(v => v.impact === 'serious').length;
    const moderateCount = violations.filter(v => v.impact === 'moderate').length;
    const minorCount = violations.filter(v => v.impact === 'minor').length;

    const prompt = `Generate a concise accessibility report summary for a website audit:

AUDIT RESULTS:
- Total Violations: ${report.summary?.totalViolations || violations.length}
- Total Passes: ${report.summary?.totalPasses || 0}
- Critical Issues: ${criticalCount}
- Serious Issues: ${seriousCount}
- Moderate Issues: ${moderateCount}
- Minor Issues: ${minorCount}

Create a 2-3 sentence summary that:
1. Gives an overall assessment (excellent/good/needs improvement/poor)
2. Highlights the most important issues to fix first
3. Provides encouraging next steps

Keep it professional but approachable, suitable for both technical and non-technical audiences.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();

  } catch (error) {
    console.error('Summary generation failed:', error);
    return createFallbackSummary(report);
  }
}

// Helper function to create fallback summary
function createFallbackSummary(report: BaseAccessibilityReport): string {
  const totalIssues = report.summary?.totalViolations || 0;
  if (totalIssues === 0) {
    return "Excellent! No accessibility violations were found. Your website follows WCAG guidelines well.";
  } else if (totalIssues <= 5) {
    return `Good foundation with ${totalIssues} minor issues to address. Focus on the highest priority items first for quick improvements.`;
  } else {
    return `Found ${totalIssues} accessibility issues that need attention. Start with critical and serious issues to make the biggest impact for users.`;
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<EnhancedAccessibilityApiResponse>> {
  console.log('API Route called: POST /api/check-accessibility');

  try {
    // Parse request body with error handling
    let body: AccessibilityCheckRequest;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON in request body'
        },
        { status: 400 }
      );
    }

    const { url } = body;

    if (!url) {
      return NextResponse.json(
        {
          success: false,
          error: 'URL is required'
        },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (urlError) {
      console.error('Invalid URL:', url, urlError);
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid URL format'
        },
        { status: 400 }
      );
    }

    // Get the microservice URL from environment variable
    const microserviceUrl = process.env.ACCESSIBILITY_MICROSERVICE_URL || 'http://localhost:3001';

    console.log('Calling accessibility microservice:', microserviceUrl);

    // Call your accessibility microservice with enhanced error handling and increased timeout
    let response: Response;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000); // Reduced to 45 seconds but realistic (from Claude's suggestion)

      const cleanMicroserviceUrl = microserviceUrl.replace(/\/+$/, ''); // Remove trailing slashes
      response = await fetch(`${cleanMicroserviceUrl}/check-accessibility-static`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Explicitly request JSON
          'Connection': 'close', // Ensure connection is closed (from Claude's suggestion)
        },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
    } catch (fetchError) {
      console.error('Microservice fetch error:', fetchError);

      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json(
          {
            success: false,
            error: 'Request timeout - website analysis took too long', // Improved message
            details: 'The website may be too complex or slow. Try analyzing a simpler page or contact support.',
            suggestion: 'Try analyzing a specific internal page instead of the homepage.' // Added suggestion
          },
          { status: 504 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to connect to accessibility service',
          details: fetchError instanceof Error ? fetchError.message : 'Network error',
          suggestion: 'Please try again in a few moments. If the issue persists, contact support.' // Added suggestion
        },
        { status: 503 }
      );
    }

    // Enhanced response handling with content type checking
    const contentType = response.headers.get('content-type');
    console.log('Microservice response:', {
      status: response.status,
      statusText: response.statusText,
      contentType,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      console.error('Microservice returned non-OK status:', response.status);

      // Try to get response text first
      let responseText: string;
      try {
        responseText = await response.text();
        console.log('Error response body:', responseText.substring(0, 500));
      } catch (textError) {
        console.error('Failed to read error response:', textError);
        return NextResponse.json(
          {
            success: false,
            error: 'Accessibility service error',
            details: `HTTP ${response.status}: ${response.statusText}`
          },
          { status: response.status }
        );
      }

      // Try to parse as JSON if content type suggests it
      if (contentType?.includes('application/json')) {
        try {
          const errorData = JSON.parse(responseText);
          return NextResponse.json(
            {
              success: false,
              error: 'Accessibility check failed',
              details: errorData.message || errorData.error || `HTTP ${response.status}`,
              microserviceError: errorData
            },
            { status: response.status }
          );
        } catch (jsonError) {
          console.error('Failed to parse error response as JSON:', jsonError);
        }
      }

      // Return HTML error as text
      return NextResponse.json(
        {
          success: false,
          error: 'Accessibility service returned an error',
          details: responseText.includes('<!DOCTYPE html>') || responseText.includes('<html')
            ? 'Server returned HTML error page instead of JSON response'
            : responseText.substring(0, 200)
        },
        { status: response.status }
      );
    }

    // Check if response is actually JSON
    if (!contentType?.includes('application/json')) {
      console.warn('Microservice returned non-JSON content type:', contentType);

      const responseText = await response.text();
      console.log('Non-JSON response body:', responseText.substring(0, 500));

      return NextResponse.json(
        {
          success: false,
          error: 'Invalid response format from accessibility service',
          details: 'Expected JSON but received: ' + (contentType || 'unknown content type')
        },
        { status: 502 }
      );
    }

    let data: AccessibilityApiResponse;
    try {
      const responseText = await response.text();
      console.log('Response body preview:', responseText.substring(0, 200));

      data = JSON.parse(responseText);
    } catch (jsonError) {
      console.error('Failed to parse microservice response:', jsonError);
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON response from accessibility service',
          details: 'The service returned a malformed JSON response'
        },
        { status: 502 }
      );
    }

    if (!data.success || !data.data) {
      console.error('Microservice returned unsuccessful response:', data);
      return NextResponse.json(
        {
          success: false,
          error: 'Accessibility check failed',
          details: data.message || 'No data received from microservice'
        },
        { status: 500 }
      );
    }

    const report: BaseAccessibilityReport = data.data;

    // Ensure violations array exists
    const violations = report.violations || [];

    // Generate AI explanations for violations (limit to top 5 for memory efficiency, as per Claude's suggestion)
    const topViolations: BaseAccessibilityViolation[] = violations
      .sort((a, b) => {
        const impactOrder = { critical: 4, serious: 3, moderate: 2, minor: 1 };
        const aWeight = impactOrder[a.impact as keyof typeof impactOrder] || 0;
        const bWeight = impactOrder[b.impact as keyof typeof impactOrder] || 0;
        return bWeight - aWeight;
      })
      .slice(0, 5); // Reduced from 10 to 5 for memory efficiency

    console.log(`Processing ${topViolations.length} violations for AI analysis`);

    // Process violations in smaller batches to avoid memory spikes (as per Claude's suggestion)
    const enhancedViolations: AccessibilityViolation[] = [];

    for (let i = 0; i < topViolations.length; i += 2) { // Process 2 at a time
      const batch = topViolations.slice(i, i + 2);
      const batchResults = await Promise.all(
        batch.map(async (violation: BaseAccessibilityViolation): Promise<AccessibilityViolation> => {
          const aiExplanation = await generateAccessibilityExplanation(violation);
          return {
            ...violation,
            aiExplanation
          };
        })
      );
      enhancedViolations.push(...batchResults);

      // Small delay between batches to prevent overwhelming the system
      if (i + 2 < topViolations.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Generate overall summary
    const overallSummary = await generateOverallSummary(report, enhancedViolations);

    const enhancedReport: AccessibilityReport = {
      ...report,
      violations: enhancedViolations,
      remainingViolations: Math.max(0, violations.length - 5), // Updated count for remaining violations
      aiSummary: overallSummary
    };

    console.log('Accessibility check completed successfully');

    return NextResponse.json({
      success: true,
      data: enhancedReport
    });

  } catch (error) {
    console.error('Accessibility API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle GET requests (not allowed)
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed. Use POST.'
    },
    { status: 405 }
  );
}