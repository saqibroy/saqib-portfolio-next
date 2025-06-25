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
    
    const prompt = `Analyze the following blog post content and create a focused audio summary. Your response should:

REQUIREMENTS:
- Be exactly 3-4 sentences long
- Start directly with the main topic (no greetings, no "hi there", no "this article discusses")
- Focus solely on the key insights, main points, and actionable takeaways
- Use clear, professional language suitable for audio playback
- Avoid meta-commentary about the article itself
- Present information as direct statements of fact or insight

EXAMPLE FORMAT:
"[Main concept/technology] enables [specific benefit/solution]. The key advantages include [benefit 1] and [benefit 2]. Implementation involves [key steps or considerations]. This approach results in [specific outcome or improvement]."

AVOID:
- Conversational greetings or introductions
- Phrases like "this article explains", "the author discusses", "we learn that"
- Filler words or casual expressions
- Overly technical jargon without context

Content to summarize:
${content.substring(0, 5000)}`; // Increased content length for better context
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();
    
    console.log('Summary generated successfully');
    
    // Clean up any remaining conversational elements
    let cleanedSummary = summary.trim()
      .replace(/^(Hi there,?|Hello,?|Greetings,?)\s*/i, '')
      .replace(/^(This article|This blog post|This piece|The article|The post)\s+(discusses|explains|covers|explores)\s+/i, '')
      .replace(/^(In this article|In this post),?\s+/i, '')
      .replace(/^(Let me|I'll|We'll)\s+/i, '');
    
    return cleanedSummary;
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

    if (!content || content.trim().length < 50) {
      console.log('Insufficient content provided');
      return NextResponse.json(
        { error: 'Sufficient content is required for summary generation' },
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
          
          // Validate summary quality
          if (summary.length < 50) {
            throw new Error('Generated summary too short, falling back to extraction');
          }
          
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

    // Final cleanup and validation
    if (!summary || summary.trim().length < 20) {
      summary = 'This content covers important insights and practical information relevant to the topic discussed.';
      warning = 'Unable to generate detailed summary from content.';
    }

    console.log('Returning summary:', { 
      summaryLength: summary.length, 
      hasWarning: !!warning 
    });

    return NextResponse.json({ 
      summary: summary.trim(),
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