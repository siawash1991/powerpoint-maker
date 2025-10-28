import { NextRequest, NextResponse } from 'next/server';
import { generateWithRetry } from '@/lib/claude';
import type { GenerateRequest, GenerateResponse } from '@/types/presentation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as GenerateRequest;

    // Validate request
    if (!body.topic || !body.slideCount || !body.audience) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate slide count
    if (body.slideCount < 5 || body.slideCount > 20) {
      return NextResponse.json(
        { error: 'Slide count must be between 5 and 20' },
        { status: 400 }
      );
    }

    // Check API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Generate outline
    const outline = await generateWithRetry({
      topic: body.topic,
      slideCount: body.slideCount,
      audience: body.audience,
      template: body.template,
      includeShapes: body.includeShapes,
      includeCharts: body.includeCharts,
    });

    const response: GenerateResponse = {
      outline,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in generate API:', error);
    return NextResponse.json(
      { error: 'Failed to generate presentation' },
      { status: 500 }
    );
  }
}
