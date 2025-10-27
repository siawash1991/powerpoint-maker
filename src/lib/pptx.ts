import PptxGenJS from 'pptxgenjs';
import type { PresentationOutline, Slide } from '@/types/presentation';

// Color palette for professional presentation
const COLORS = {
  primary: '4F46E5', // Indigo
  secondary: '7C3AED', // Purple
  accent: '2563EB', // Blue
  text: '1F2937', // Dark gray
  textLight: '6B7280', // Medium gray
  background: 'FFFFFF', // White
  backgroundAlt: 'F3F4F6', // Light gray
};

export async function generatePowerPoint(
  outline: PresentationOutline
): Promise<Buffer> {
  const pptx = new PptxGenJS();

  // Set presentation properties
  pptx.author = 'Claude AI';
  pptx.company = 'PowerPoint Maker';
  pptx.subject = outline.topic;
  pptx.title = outline.title;

  // Set RTL layout
  pptx.rtlMode = true;

  // Generate slides
  for (const slide of outline.slides) {
    switch (slide.layout) {
      case 'title':
        addTitleSlide(pptx, slide, outline);
        break;
      case 'content':
        addContentSlide(pptx, slide);
        break;
      case 'twoColumn':
        addTwoColumnSlide(pptx, slide);
        break;
      case 'conclusion':
        addConclusionSlide(pptx, slide);
        break;
      default:
        addContentSlide(pptx, slide);
    }
  }

  // Generate buffer
  const buffer = await pptx.write({ outputType: 'nodebuffer' }) as Buffer;
  return buffer;
}

function addTitleSlide(
  pptx: PptxGenJS,
  slide: Slide,
  outline: PresentationOutline
) {
  const pptxSlide = pptx.addSlide();

  // Background gradient
  pptxSlide.background = {
    fill: `${COLORS.primary}`,
  };

  // Title
  pptxSlide.addText(slide.title, {
    x: 0.5,
    y: '35%',
    w: '90%',
    h: 2,
    align: 'center',
    fontSize: 44,
    bold: true,
    color: COLORS.background,
    fontFace: 'Arial',
    rtlMode: true,
  });

  // Subtitle (topic)
  if (outline.topic !== slide.title) {
    pptxSlide.addText(outline.topic, {
      x: 0.5,
      y: '55%',
      w: '90%',
      h: 0.5,
      align: 'center',
      fontSize: 24,
      color: 'E5E7EB',
      fontFace: 'Arial',
      rtlMode: true,
    });
  }

  // Date
  const today = new Date().toLocaleDateString('fa-IR');
  pptxSlide.addText(today, {
    x: 0.5,
    y: '85%',
    w: '90%',
    h: 0.3,
    align: 'center',
    fontSize: 14,
    color: 'D1D5DB',
    fontFace: 'Arial',
    rtlMode: true,
  });
}

function addContentSlide(pptx: PptxGenJS, slide: Slide) {
  const pptxSlide = pptx.addSlide();

  // Header bar
  pptxSlide.addShape('rect', {
    x: 0,
    y: 0,
    w: '100%',
    h: 1,
    fill: { color: COLORS.primary },
  });

  // Title
  pptxSlide.addText(slide.title, {
    x: 0.5,
    y: 0.2,
    w: '90%',
    h: 0.6,
    align: 'right',
    fontSize: 32,
    bold: true,
    color: COLORS.background,
    fontFace: 'Arial',
    rtlMode: true,
  });

  // Content bullets
  if (slide.content.length > 0) {
    const bulletPoints = slide.content.map((point) => ({
      text: point,
      options: {
        fontSize: 20,
        color: COLORS.text,
        bullet: { code: '2022' }, // Bullet character
        rtlMode: true,
        align: 'right',
      },
    }));

    pptxSlide.addText(bulletPoints, {
      x: 1,
      y: 1.5,
      w: 8.5,
      h: 4,
      fontFace: 'Arial',
      rtlMode: true,
      align: 'right',
    });
  }

  // Footer
  addFooter(pptxSlide);
}

function addTwoColumnSlide(pptx: PptxGenJS, slide: Slide) {
  const pptxSlide = pptx.addSlide();

  // Header bar
  pptxSlide.addShape('rect', {
    x: 0,
    y: 0,
    w: '100%',
    h: 1,
    fill: { color: COLORS.secondary },
  });

  // Title
  pptxSlide.addText(slide.title, {
    x: 0.5,
    y: 0.2,
    w: '90%',
    h: 0.6,
    align: 'right',
    fontSize: 32,
    bold: true,
    color: COLORS.background,
    fontFace: 'Arial',
    rtlMode: true,
  });

  // Split content into two columns
  const midPoint = Math.ceil(slide.content.length / 2);
  const rightColumn = slide.content.slice(0, midPoint);
  const leftColumn = slide.content.slice(midPoint);

  // Right column
  if (rightColumn.length > 0) {
    const rightPoints = rightColumn.map((point) => ({
      text: point,
      options: {
        fontSize: 18,
        color: COLORS.text,
        bullet: { code: '2022' },
        rtlMode: true,
        align: 'right',
      },
    }));

    pptxSlide.addText(rightPoints, {
      x: 5.2,
      y: 1.5,
      w: 4.3,
      h: 4,
      fontFace: 'Arial',
      rtlMode: true,
      align: 'right',
    });
  }

  // Left column
  if (leftColumn.length > 0) {
    const leftPoints = leftColumn.map((point) => ({
      text: point,
      options: {
        fontSize: 18,
        color: COLORS.text,
        bullet: { code: '2022' },
        rtlMode: true,
        align: 'right',
      },
    }));

    pptxSlide.addText(leftPoints, {
      x: 0.5,
      y: 1.5,
      w: 4.3,
      h: 4,
      fontFace: 'Arial',
      rtlMode: true,
      align: 'right',
    });
  }

  addFooter(pptxSlide);
}

function addConclusionSlide(pptx: PptxGenJS, slide: Slide) {
  const pptxSlide = pptx.addSlide();

  // Background gradient
  pptxSlide.background = {
    fill: `${COLORS.accent}`,
  };

  // Title
  pptxSlide.addText(slide.title, {
    x: 0.5,
    y: '30%',
    w: '90%',
    h: 1.5,
    align: 'center',
    fontSize: 40,
    bold: true,
    color: COLORS.background,
    fontFace: 'Arial',
    rtlMode: true,
  });

  // Content
  if (slide.content.length > 0) {
    const text = slide.content.join('\n');
    pptxSlide.addText(text, {
      x: 1,
      y: '50%',
      w: 8.5,
      h: 2,
      align: 'center',
      fontSize: 22,
      color: 'E5E7EB',
      fontFace: 'Arial',
      rtlMode: true,
    });
  }

  // Thank you message
  pptxSlide.addText('با تشکر از توجه شما', {
    x: 0.5,
    y: '80%',
    w: '90%',
    h: 0.5,
    align: 'center',
    fontSize: 18,
    italic: true,
    color: 'D1D5DB',
    fontFace: 'Arial',
    rtlMode: true,
  });
}

function addFooter(slide: any) {
  // Slide number would go here if needed
  // For now, keeping it simple
}
