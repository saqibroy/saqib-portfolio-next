// src/app/api/generate-audio-summary/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Simple text extraction function (fallback)
function extractKeyPoints(content: string): string {
  try {
    // Remove HTML tags and clean up text
    const cleanText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    
    // Split into sentences
    const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 20);
    
    // Take first few sentences as a simple summary
    const keyPoints = sentences.slice(0, 3).join('. ');
    
    return keyPoints + (keyPoints.endsWith('.') ? '' : '.');
  } catch (error) {
    console.error('Error in extractKeyPoints:', error);
    return 'Unable to generate summary from the provided content.';
  }
}

// Generate summary using Gemini
async function generateGeminiSummary(content: string): Promise<string> {
  try {
    console.log('Attempting to import @google/generative-ai...');
    
    // Dynamic import to catch module errors
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    
    console.log('GoogleGenerativeAI imported successfully');
    
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('API Key exists:', !!apiKey);
    
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    console.log('Model initialized, generating content...');
    
    const prompt = `Please create a concise, engaging audio summary of the following blog post content. The summary should:
    - Be 2-3 sentences long
    - Capture the main points and key takeaways
    - Be written in a conversational tone suitable for text-to-speech
    - Avoid technical jargon when possible
    - Sound natural when spoken aloud
    
    Content to summarize:
    ${content.substring(0, 4000)}`; // Limit content length
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();
    
    console.log('Summary generated successfully');
    return summary.trim();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  console.log('API route called');
  
  try {
    const body = await request.json();
    console.log('Request body received:', { 
      hasContent: !!body.content, 
      contentLength: body.content?.length,
      model: body.model 
    });

    const { content, model = 'gemini' } = body;

    if (!content) {
      console.log('No content provided');
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    let summary = '';
    let warning = '';

    console.log('Selected model:', model);

    switch (model) {
      case 'gemini':
        try {
          console.log('Attempting Gemini summary...');
          if (!process.env.GEMINI_API_KEY) {
            console.log('No Gemini API key found');
            return NextResponse.json(
              { error: 'Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables.' },
              { status: 500 }
            );
          }
          summary = await generateGeminiSummary(content);
          console.log('Gemini summary successful');
        } catch (error) {
          console.error('Gemini failed, falling back to simple extraction:', error);
          summary = extractKeyPoints(content);
          warning = 'AI model failed, using simple text extraction instead.';
        }
        break;

      case 'simple':
      default:
        console.log('Using simple extraction');
        summary = extractKeyPoints(content);
        break;
    }

    console.log('Returning summary:', { 
      summaryLength: summary.length, 
      hasWarning: !!warning 
    });

    return NextResponse.json({ 
      summary,
      warning: warning || undefined,
      model: model 
    });

  } catch (error) {
    console.error('API route error:', error);
    
    // Try to get the request body for fallback
    try {
      const body = await request.json();
      const fallbackSummary = extractKeyPoints(body.content || '');
      
      return NextResponse.json({ 
        summary: fallbackSummary,
        warning: 'API error occurred, using simple text extraction instead.',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      return NextResponse.json(
        { 
          error: 'Failed to generate summary',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  }
}