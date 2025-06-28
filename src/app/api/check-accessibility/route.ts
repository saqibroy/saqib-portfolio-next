// src/app/api/check-accessibility/route.ts
import { NextRequest, NextResponse } from 'next/server';
import puppeteer, { Browser, Page } from 'puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI outside the handler to reuse the instance
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
// Use a model appropriate for text generation. 'gemini-pro' is generally good for this.
// 'gemini-1.5-flash' is faster and cheaper, also a good option if available and suitable.
const geminiModel = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Define an interface for the enhanced violation
interface EnhancedViolation {
  id: string;
  impact: string;
  help: string;
  description: string;
  nodes: Array<{ html: string; target: string[] }>;
  helpUrl: string;
  plainExplanation?: string;
  fixSuggestion?: string;
}

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ message: 'URL is required' }, { status: 400 });
  }

  let browser: Browser | null = null;
  let page: Page | null = null;

  try {
    browser = await puppeteer.launch({
      headless: true, // Use boolean for compatibility with @types/puppeteer
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });
    page = await browser.newPage();

    await page.setBypassCSP(true);

    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    } catch (gotoError) {
      console.warn(`Failed to navigate to ${url}: `, gotoError);
      return NextResponse.json({
        message: `Could not load the URL. Please ensure it's publicly accessible and correct.`,
        details: (gotoError as Error).message
      }, { status: 400 });
    }

    const axeResults = await new AxePuppeteer(page)
      .withRules(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const enhancedViolations: EnhancedViolation[] = [];

    for (const violation of axeResults.violations) {
      const prompt = `
        You are an expert in web accessibility and a clear communicator.
        Explain the following WCAG accessibility violation in simple, non-technical language.
        Then, provide a concise, actionable suggestion on how a developer can fix this issue,
        including a brief, modern code example if applicable (e.g., React/Next.js, HTML, CSS).
        Focus on practical, direct advice.

        The violation details are:
        - Issue: ${violation.help}
        - Description: ${violation.description}
        - Impact: ${violation.impact}
        - Elements affected (first 3 for context, if available):
          ${violation.nodes.slice(0, 3).map(node => node.html).join('\n')}
        - More info: ${violation.helpUrl}

        Your response should be a JSON object with two fields: "plainExplanation" and "fixSuggestion".
        Example:
        {
          "plainExplanation": "This explains the issue in simple terms.",
          "fixSuggestion": "Here's how to fix it with a code example like \`<button>Click me</button>\`."
        }
      `;

      try {
        const result = await geminiModel.generateContent(prompt);
        let responseText = result.response.text();

        // Clean up markdown code blocks if Gemini returns them
        responseText = responseText.replace(/```json|```/g, '').trim();
        
        let aiDetails: { plainExplanation: string; fixSuggestion: string } = {
          plainExplanation: "AI explanation could not be generated.",
          fixSuggestion: "Please consult WCAG guidelines or official documentation for a fix."
        };

        try {
          aiDetails = JSON.parse(responseText);
        } catch {
          console.warn('Failed to parse AI response as JSON, falling back to raw text:', responseText);
          aiDetails.plainExplanation = `AI response malformed. Original AI text: ${responseText.substring(0, 200)}...`;
        }

        enhancedViolations.push({
          id: violation.id,
          impact: violation.impact ?? '',
          help: violation.help,
          description: violation.description,
          nodes: violation.nodes.map(node => ({
            html: node.html,
            target: Array.isArray(node.target)
              ? node.target.flatMap(t =>
                  typeof t === 'string'
                    ? [t]
                    : Array.isArray(t)
                      ? t.filter((x): x is string => typeof x === 'string')
                      : []
                )
              : []
          })),
          helpUrl: violation.helpUrl,
          plainExplanation: aiDetails.plainExplanation,
          fixSuggestion: aiDetails.fixSuggestion,
        });
      } catch (aiError) {
        console.error('Gemini AI call failed for violation:', (aiError as Error).message);
        enhancedViolations.push({
          id: violation.id,
          impact: violation.impact ?? '',
          help: violation.help,
          description: violation.description,
          nodes: violation.nodes.map(node => ({
            html: node.html,
            target: Array.isArray(node.target)
              ? node.target.flatMap(t =>
                  typeof t === 'string'
                    ? [t]
                    : Array.isArray(t)
                      ? t.filter((x): x is string => typeof x === 'string')
                      : []
                )
              : []
          })),
          helpUrl: violation.helpUrl,
          plainExplanation: 'Failed to generate AI explanation.',
          fixSuggestion: 'Please consult official WCAG guidelines or tools like axe-core for details.',
        });
      }
    }

    return NextResponse.json({
      violations: enhancedViolations,
      passes: axeResults.passes,
      incomplete: axeResults.incomplete,
      url: url,
    }, { status: 200 });

  } catch (error) {
    console.error('Full accessibility check failed:', error);
    return NextResponse.json({
      message: 'Failed to perform accessibility check.',
      error: (error as Error).message,
    }, { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}