// src/app/api/check-accessibility/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { AxePuppeteer } from '@axe-core/puppeteer';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Import Puppeteer types consistently from puppeteer-core
import type { Browser, Page, LaunchOptions } from 'puppeteer-core';

// Define types for dynamic imports
interface PuppeteerLike {
  launch: (options: any) => Promise<any>;
}

interface ChromiumLike {
  font: (url: string) => Promise<void>;
  args: string[];
  defaultViewport: { width: number; height: number };
  executablePath: () => Promise<string>;
  headless: boolean;
}

interface GenerativeAIResult {
  response: {
    text: () => string;
  };
}

interface AxeResults {
  violations: AxeViolation[];
  passes: AxePass[];
  incomplete: AxeIncomplete[];
}

interface AxeViolation {
  id: string;
  impact: string;
  help: string;
  description: string;
  nodes: Array<{ html: string; target: string[] }>;
  helpUrl: string;
  tags: string[];
}

interface AxePass {
  id: string;
  impact?: string;
  help: string;
}

interface AxeIncomplete {
  id: string;
  impact?: string;
  help: string;
}

interface AxeNode {
  html: string;
  target: unknown;
}

// Initialize Gemini AI globally
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
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
  tags?: string[];
}

interface AIDetails {
  plainExplanation: string;
  fixSuggestion: string;
}

// Global browser instance for reuse
let globalBrowser: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (globalBrowser && globalBrowser.isConnected()) {
    return globalBrowser;
  }

  let puppeteer: PuppeteerLike;
  let chromium: ChromiumLike;

  try {
    // Dynamic imports for serverless compatibility
    if (process.env.NODE_ENV === 'production') {
      // Production (Vercel) setup
      const puppeteerModule = await import('puppeteer-core');
      puppeteer = puppeteerModule.default as unknown as PuppeteerLike;
      const chromiumModule = await import('@sparticuz/chromium');
      chromium = chromiumModule.default as unknown as ChromiumLike;
      
      // Configure chromium for Vercel
      await chromium.font('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      
      const launchOptions: LaunchOptions = {
        args: [
          ...chromium.args,
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
          '--disable-features=TranslateUI',
          '--disable-ipc-flooding-protection',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--memory-pressure-off'
        ],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreDefaultArgs: ['--disable-extensions'],
        timeout: 30000, // 30 seconds timeout
      };

      globalBrowser = await puppeteer.launch(launchOptions) as Browser;
    } else {
      // Development setup
      const puppeteerModule = await import('puppeteer');
      puppeteer = puppeteerModule.default as unknown as PuppeteerLike;
      
      const launchOptions: LaunchOptions = {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding'
        ],
        timeout: 30000,
      };

      globalBrowser = await puppeteer.launch(launchOptions) as Browser;
    }

    if (!globalBrowser) {
      throw new Error('Failed to initialize browser instance');
    }

    return globalBrowser;
  } catch (error) {
    console.error('Failed to launch browser:', error);
    throw new Error(`Browser initialization failed: ${(error as Error).message}`);
  }
}

// Cleanup function for browser
async function closeBrowser(): Promise<void> {
  if (globalBrowser) {
    try {
      await globalBrowser.close();
      globalBrowser = null;
    } catch (error) {
      console.error('Error closing browser:', error);
    }
  }
}

// Handle process termination
process.on('SIGINT', closeBrowser);
process.on('SIGTERM', closeBrowser);

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Set timeout for the entire request
  const timeoutId = setTimeout(() => {
    throw new Error('Request timeout - operation took too long');
  }, 25000); // 25 seconds (Vercel has 30s limit)

  let browser: Browser | null = null;
  let page: Page | null = null;

  try {
    const { url } = await req.json();

    if (!url) {
      clearTimeout(timeoutId);
      return NextResponse.json({ message: 'URL is required' }, { status: 400 });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      clearTimeout(timeoutId);
      return NextResponse.json({ 
        message: 'Invalid URL format. Please provide a valid URL starting with http:// or https://' 
      }, { status: 400 });
    }

    console.log('Getting browser instance...');
    browser = await getBrowser();
    
    console.log('Creating new page...');
    page = await browser.newPage();

    // Set a reasonable viewport
    await page.setViewport({ width: 1200, height: 800 });
    
    // Set user agent to avoid bot detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Enable request interception for optimization
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      // Block unnecessary resources to speed up loading
      const resourceType = request.resourceType();
      if (['image', 'stylesheet', 'font'].includes(resourceType)) {
        request.abort().catch(() => {}); // Ignore abort errors
      } else {
        request.continue().catch(() => {}); // Ignore continue errors
      }
    });

    console.log(`Navigating to: ${url}`);
    try {
      await page.goto(url, { 
        waitUntil: 'domcontentloaded', // Don't wait for all resources
        timeout: 20000 // 20 seconds
      });
    } catch (gotoError) {
      console.warn(`Failed to navigate to ${url}:`, gotoError);
      clearTimeout(timeoutId);
      
      if ((gotoError as Error).message.includes('403') || (gotoError as Error).message.includes('Forbidden')) {
        return NextResponse.json({
          message: `Access to ${url} was blocked. The website might be detecting automated access.`,
          details: (gotoError as Error).message
        }, { status: 403 });
      }
      
      if ((gotoError as Error).message.includes('timeout')) {
        return NextResponse.json({
          message: `The website took too long to load. Please try again or check if the URL is accessible.`,
          details: (gotoError as Error).message
        }, { status: 408 });
      }
      
      return NextResponse.json({
        message: `Could not load the URL. Please ensure it's publicly accessible and correct.`,
        details: (gotoError as Error).message
      }, { status: 400 });
    }

    console.log('Running accessibility analysis...');
    // Run axe analysis with timeout
    const axeResults = await Promise.race([
      new AxePuppeteer(page as any)
        .withRules(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Axe analysis timeout')), 15000)
      )
    ]) as AxeResults;

    console.log(`Found ${axeResults.violations.length} violations`);
    
    const enhancedViolations: EnhancedViolation[] = [];

    // Limit the number of violations to process (to avoid timeout)
    const maxViolations = 10;
    const violationsToProcess = axeResults.violations.slice(0, maxViolations);

    for (const violation of violationsToProcess) {
      const prompt = `
        You are an expert in web accessibility. Explain this WCAG violation in simple terms and provide a fix.
        
        Issue: ${violation.help}
        Description: ${violation.description}
        Impact: ${violation.impact}
        
        Respond with JSON: {"plainExplanation": "simple explanation", "fixSuggestion": "how to fix with code example"}
      `;

      try {
        const result = await Promise.race([
          geminiModel.generateContent(prompt),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('AI timeout')), 5000)
          )
        ]) as GenerativeAIResult;

        let responseText = result.response.text();
        responseText = responseText.replace(/```json|```/g, '').trim();

        let aiDetails: AIDetails = {
          plainExplanation: "AI explanation could not be generated.",
          fixSuggestion: "Please consult WCAG guidelines for details."
        };

        try {
          aiDetails = JSON.parse(responseText) as AIDetails;
        } catch {
          console.warn("Failed to parse AI response for violation:", violation.id);
          aiDetails.plainExplanation = "AI explanation could not be generated due to parsing error.";
        }

        enhancedViolations.push({
          ...violation,
          impact: violation.impact ?? 'unknown',
          plainExplanation: aiDetails.plainExplanation,
          fixSuggestion: aiDetails.fixSuggestion,
          nodes: violation.nodes.map((node: AxeNode) => ({
            ...node,
            target: Array.isArray(node.target) 
              ? (node.target as unknown[]).filter((x: unknown): x is string => typeof x === 'string') 
              : [],
          })),
          tags: violation.tags ?? [],
        });
      } catch (aiError) {
        console.error('AI call failed for violation:', (aiError as Error).message);
        enhancedViolations.push({
          ...violation,
          impact: violation.impact ?? 'unknown',
          plainExplanation: 'AI explanation temporarily unavailable.',
          fixSuggestion: 'Please consult WCAG guidelines for details.',
          nodes: violation.nodes.map((node: AxeNode) => ({
            ...node,
            target: Array.isArray(node.target) 
              ? (node.target as unknown[]).filter((x: unknown): x is string => typeof x === 'string') 
              : [],
          })),
          tags: violation.tags ?? [],
        });
      }
    }

    clearTimeout(timeoutId);

    return NextResponse.json({
      violations: enhancedViolations,
      passes: axeResults.passes,
      incomplete: axeResults.incomplete,
      url: url,
      totalViolations: axeResults.violations.length,
      processedViolations: enhancedViolations.length
    }, { status: 200 });

  } catch (error) {
    console.error('Accessibility check failed:', error);
    clearTimeout(timeoutId);
    
    return NextResponse.json({
      message: 'Failed to perform accessibility check. Please try again.',
      error: (error as Error).message,
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
    }, { status: 500 });
  } finally {
    // Clean up page but keep browser instance for reuse
    if (page) {
      try {
        await page.close();
      } catch (error) {
        console.error('Error closing page:', error);
      }
    }
  }
}