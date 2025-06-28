// src/app/api/check-accessibility/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { AxePuppeteer } from '@axe-core/puppeteer';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Simplified imports
import type { Browser, Page } from 'puppeteer-core';

interface PuppeteerLike {
  launch: (options: any) => Promise<Browser>;
}

interface ChromiumLike {
  font: (url: string) => Promise<void>;
  args: string[];
  defaultViewport: { width: number; height: number };
  executablePath: () => Promise<string>;
  headless: boolean;
}

interface AxeResults {
  violations: any[];
  passes: any[];
  incomplete: any[];
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const geminiModel = genAI.getGenerativeModel({ model: 'gemini-pro' });

// REMOVED global browser instance - create fresh each time in serverless
async function createBrowser(): Promise<Browser> {
  let puppeteer: PuppeteerLike;
  let chromium: ChromiumLike;

  try {
    if (process.env.NODE_ENV === 'production') {
      // Production (Vercel) setup
      const puppeteerModule = await import('puppeteer-core');
      puppeteer = puppeteerModule.default as unknown as PuppeteerLike;
      const chromiumModule = await import('@sparticuz/chromium');
      chromium = chromiumModule.default as unknown as ChromiumLike;
      
      // Simplified chromium setup
      await chromium.font('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      
      const launchOptions = {
        args: [
          ...chromium.args,
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=TranslateUI',
          '--single-process', // Important for serverless
          '--memory-pressure-off'
        ],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        timeout: 15000, // Reduced timeout
      };

      return await puppeteer.launch(launchOptions) as Browser;
    } else {
      // Development setup
      const puppeteerModule = await import('puppeteer');
      puppeteer = puppeteerModule.default as unknown as PuppeteerLike;
      
      const launchOptions = {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu'
        ],
        timeout: 15000,
      };

      return await puppeteer.launch(launchOptions) as Browser;
    }
  } catch (error) {
    console.error('Failed to launch browser:', error);
    throw new Error(`Browser initialization failed: ${(error as Error).message}`);
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Shorter timeout for serverless
  const timeoutId = setTimeout(() => {
    throw new Error('Request timeout - operation took too long');
  }, 20000); // 20 seconds

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
        message: 'Invalid URL format' 
      }, { status: 400 });
    }

    console.log('Creating browser instance...');
    browser = await createBrowser(); // Create fresh browser each time
    
    console.log('Creating new page...');
    page = await browser.newPage();

    // Optimized page settings
    await page.setViewport({ width: 1200, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    // SIMPLIFIED request interception - block only images
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const resourceType = request.resourceType();
      if (resourceType === 'image') {
        request.abort().catch(() => {});
      } else {
        request.continue().catch(() => {});
      }
    });

    console.log(`Navigating to: ${url}`);
    try {
      await page.goto(url, { 
        waitUntil: 'domcontentloaded',
        timeout: 15000 // Reduced timeout
      });
    } catch (gotoError) {
      console.warn(`Navigation failed:`, gotoError);
      clearTimeout(timeoutId);
      
      return NextResponse.json({
        message: `Could not load the URL: ${(gotoError as Error).message}`,
      }, { status: 400 });
    }

    console.log('Running accessibility analysis...');
    
    // Simplified axe analysis with shorter timeout
    const axeResults = await Promise.race([
      new AxePuppeteer(page as any)
        .withRules(['wcag2a', 'wcag2aa']) // Reduced rules
        .analyze(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Axe analysis timeout')), 10000)
      )
    ]) as AxeResults;

    console.log(`Found ${axeResults.violations.length} violations`);
    
    // Process fewer violations to avoid timeout
    const maxViolations = 5; // Reduced from 10
    const violationsToProcess = axeResults.violations.slice(0, maxViolations);
    const enhancedViolations = [];

    for (const violation of violationsToProcess) {
      try {
        const prompt = `Explain this accessibility issue briefly: ${violation.help}. Give JSON: {"plainExplanation": "brief explanation", "fixSuggestion": "short fix"}`;

        const result = await Promise.race([
          geminiModel.generateContent(prompt),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('AI timeout')), 3000) // Reduced AI timeout
          )
        ]) as any;

        let responseText = (result as any).response.text().replace(/```json|```/g, '').trim();
        
        try {
          const aiDetails = JSON.parse(responseText);
          enhancedViolations.push({
            ...violation,
            plainExplanation: aiDetails.plainExplanation,
            fixSuggestion: aiDetails.fixSuggestion,
          });
        } catch {
          enhancedViolations.push({
            ...violation,
            plainExplanation: 'AI explanation unavailable',
            fixSuggestion: 'Please consult WCAG guidelines',
          });
        }
      } catch {
        enhancedViolations.push({
          ...violation,
          plainExplanation: 'AI explanation unavailable',
          fixSuggestion: 'Please consult WCAG guidelines',
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
      message: 'Failed to perform accessibility check',
      error: (error as Error).message,
    }, { status: 500 });
  } finally {
    // ALWAYS close browser in serverless
    if (page) {
      try {
        await page.close();
      } catch (error) {
        console.error('Error closing page:', error);
      }
    }
    if (browser) {
      try {
        await browser.close(); // Close browser completely
      } catch (error) {
        console.error('Error closing browser:', error);
      }
    }
  }
}