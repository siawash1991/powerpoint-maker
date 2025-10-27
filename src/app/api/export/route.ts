import { NextRequest, NextResponse } from 'next/server';
import { generatePowerPoint } from '@/lib/pptx';
import type { ExportRequest } from '@/types/presentation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ExportRequest;

    // Validate request
    if (!body.outline || !body.outline.slides || body.outline.slides.length === 0) {
      return NextResponse.json(
        { error: 'Invalid presentation outline' },
        { status: 400 }
      );
    }

    // Generate PowerPoint
    const buffer = await generatePowerPoint(body.outline);

    // Return file
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(body.outline.title)}.pptx"`,
      },
    });
  } catch (error) {
    console.error('Error in export API:', error);
    return NextResponse.json(
      { error: 'Failed to export presentation' },
      { status: 500 }
    );
  }
}
