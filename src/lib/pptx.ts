import PptxGenJS from 'pptxgenjs';
import type {
  PresentationOutline,
  Slide,
  GeometricShape,
  ChartData,
  TemplateConfig,
} from '@/types/presentation';
import { getTemplate, getDefaultTemplate } from './templates';

export async function generatePowerPoint(
  outline: PresentationOutline
): Promise<Buffer> {
  const pptx = new PptxGenJS();

  // Get template configuration
  const template = outline.template
    ? getTemplate(outline.template)
    : getDefaultTemplate();

  // Set presentation properties
  pptx.author = 'Claude AI';
  pptx.company = 'PowerPoint Maker';
  pptx.subject = outline.topic;
  pptx.title = outline.title;

  // Set RTL layout
  pptx.rtlMode = true;
  pptx.layout = 'LAYOUT_16x9';

  // Generate slides
  for (const slide of outline.slides) {
    switch (slide.layout) {
      case 'title':
        addTitleSlide(pptx, slide, outline, template);
        break;
      case 'content':
        addContentSlide(pptx, slide, template);
        break;
      case 'twoColumn':
        addTwoColumnSlide(pptx, slide, template);
        break;
      case 'conclusion':
        addConclusionSlide(pptx, slide, template);
        break;
      default:
        addContentSlide(pptx, slide, template);
    }
  }

  // Generate buffer
  const buffer = (await pptx.write({ outputType: 'nodebuffer' })) as Buffer;
  return buffer;
}

function addTitleSlide(
  pptx: PptxGenJS,
  slide: Slide,
  outline: PresentationOutline,
  template: TemplateConfig
) {
  const pptxSlide = pptx.addSlide();

  // Background
  pptxSlide.background = {
    fill: template.colors.primary,
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
    color: template.colors.background,
    fontFace: template.fonts.title,
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
      fontFace: template.fonts.body,
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
    fontFace: template.fonts.body,
    rtlMode: true,
  });

  // Add decorative shapes if enabled
  if (template.defaultShapes) {
    addDecorativeShapes(pptxSlide, template);
  }
}

function addContentSlide(
  pptx: PptxGenJS,
  slide: Slide,
  template: TemplateConfig
) {
  const pptxSlide = pptx.addSlide();

  // Header bar
  pptxSlide.addShape('rect', {
    x: 0,
    y: 0,
    w: '100%',
    h: 1,
    fill: { color: template.colors.primary },
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
    color: template.colors.background,
    fontFace: template.fonts.title,
    rtlMode: true,
  });

  // Content area positioning
  let contentY = 1.5;
  const contentHeight = 3.5;

  // Add chart if present
  if (slide.chart) {
    addChart(pptxSlide, slide.chart, template);
    contentY = 1.5;
    // Adjust content position for chart
  }

  // Content bullets
  if (slide.content.length > 0) {
    const bulletPoints = slide.content.map((point) => ({
      text: point,
      options: {
        fontSize: 20,
        color: template.colors.text,
        bullet: { code: '2022' },
        rtlMode: true,
        align: 'right' as const,
      },
    }));

    pptxSlide.addText(bulletPoints, {
      x: 1,
      y: contentY,
      w: 8.5,
      h: contentHeight,
      fontFace: template.fonts.body,
      rtlMode: true,
      align: 'right' as const,
    });
  }

  // Add shapes if present
  if (slide.shapes && slide.shapes.length > 0) {
    slide.shapes.forEach((shape) => {
      addGeometricShape(pptxSlide, shape, template);
    });
  }

  addFooter(pptxSlide);
}

function addTwoColumnSlide(
  pptx: PptxGenJS,
  slide: Slide,
  template: TemplateConfig
) {
  const pptxSlide = pptx.addSlide();

  // Header bar
  pptxSlide.addShape('rect', {
    x: 0,
    y: 0,
    w: '100%',
    h: 1,
    fill: { color: template.colors.secondary },
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
    color: template.colors.background,
    fontFace: template.fonts.title,
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
        color: template.colors.text,
        bullet: { code: '2022' },
        rtlMode: true,
        align: 'right' as const,
      },
    }));

    pptxSlide.addText(rightPoints, {
      x: 5.2,
      y: 1.5,
      w: 4.3,
      h: 4,
      fontFace: template.fonts.body,
      rtlMode: true,
      align: 'right' as const,
    });
  }

  // Left column
  if (leftColumn.length > 0) {
    const leftPoints = leftColumn.map((point) => ({
      text: point,
      options: {
        fontSize: 18,
        color: template.colors.text,
        bullet: { code: '2022' },
        rtlMode: true,
        align: 'right' as const,
      },
    }));

    pptxSlide.addText(leftPoints, {
      x: 0.5,
      y: 1.5,
      w: 4.3,
      h: 4,
      fontFace: template.fonts.body,
      rtlMode: true,
      align: 'right' as const,
    });
  }

  // Add shapes if present
  if (slide.shapes && slide.shapes.length > 0) {
    slide.shapes.forEach((shape) => {
      addGeometricShape(pptxSlide, shape, template);
    });
  }

  addFooter(pptxSlide);
}

function addConclusionSlide(
  pptx: PptxGenJS,
  slide: Slide,
  template: TemplateConfig
) {
  const pptxSlide = pptx.addSlide();

  // Background
  pptxSlide.background = {
    fill: template.colors.accent,
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
    color: template.colors.background,
    fontFace: template.fonts.title,
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
      fontFace: template.fonts.body,
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
    fontFace: template.fonts.body,
    rtlMode: true,
  });
}

// ========== GEOMETRIC SHAPES ==========

function addGeometricShape(
  slide: any,
  shape: GeometricShape,
  template: TemplateConfig
) {
  switch (shape.type) {
    case 'circle':
      addCircleShape(slide, shape, template);
      break;
    case 'rect':
      addRectShape(slide, shape, template);
      break;
    case 'triangle':
      addTriangleShape(slide, shape, template);
      break;
    case 'arrow':
      addArrowShape(slide, shape, template);
      break;
    case 'flowchart':
      addFlowchartShape(slide, shape, template);
      break;
  }
}

function addCircleShape(
  slide: any,
  shape: GeometricShape,
  template: TemplateConfig
) {
  const radius = shape.radius || 1;
  const diameter = radius * 2;

  slide.addShape('ellipse', {
    x: shape.x,
    y: shape.y,
    w: diameter,
    h: diameter,
    fill: { color: shape.color.replace('#', '') },
    line: shape.borderWidth
      ? { width: shape.borderWidth, color: shape.borderColor?.replace('#', '') || '000000' }
      : { width: 0 },
  });

  // Add text if present
  if (shape.text) {
    slide.addText(shape.text, {
      x: shape.x,
      y: shape.y + radius - 0.3,
      w: diameter,
      h: 0.6,
      align: 'center',
      fontSize: 18,
      bold: true,
      color: 'FFFFFF',
      fontFace: template.fonts.body,
      rtlMode: true,
    });
  }
}

function addRectShape(
  slide: any,
  shape: GeometricShape,
  template: TemplateConfig
) {
  slide.addShape('rect', {
    x: shape.x,
    y: shape.y,
    w: shape.width || 2,
    h: shape.height || 1,
    fill: { color: shape.color.replace('#', '') },
    line: shape.borderWidth
      ? { width: shape.borderWidth, color: shape.borderColor?.replace('#', '') || '000000' }
      : { width: 0 },
  });

  // Add text if present
  if (shape.text) {
    slide.addText(shape.text, {
      x: shape.x,
      y: shape.y + (shape.height || 1) / 2 - 0.25,
      w: shape.width || 2,
      h: 0.5,
      align: 'center',
      fontSize: 16,
      bold: true,
      color: 'FFFFFF',
      fontFace: template.fonts.body,
      rtlMode: true,
    });
  }
}

function addTriangleShape(
  slide: any,
  shape: GeometricShape,
  template: TemplateConfig
) {
  slide.addShape('triangle', {
    x: shape.x,
    y: shape.y,
    w: shape.width || 2,
    h: shape.height || 2,
    fill: { color: shape.color.replace('#', '') },
    line: shape.borderWidth
      ? { width: shape.borderWidth, color: shape.borderColor?.replace('#', '') || '000000' }
      : { width: 0 },
    flipV: true, // Point upward
  });
}

function addArrowShape(
  slide: any,
  shape: GeometricShape,
  template: TemplateConfig
) {
  const arrowShape =
    shape.direction === 'rtl' ? 'leftArrow' : 'rightArrow';

  slide.addShape(arrowShape, {
    x: shape.x,
    y: shape.y,
    w: shape.width || 3,
    h: shape.height || 0.5,
    fill: { color: shape.color.replace('#', '') },
    line: { width: 0 },
  });
}

function addFlowchartShape(
  slide: any,
  shape: GeometricShape,
  template: TemplateConfig
) {
  // Create a simple 3-step flowchart
  const boxWidth = 2;
  const boxHeight = 1;
  const spacing = shape.direction === 'rtl' ? -2.5 : 2.5;

  for (let i = 0; i < 3; i++) {
    const x = shape.x + spacing * i;

    // Box
    slide.addShape('rect', {
      x,
      y: shape.y,
      w: boxWidth,
      h: boxHeight,
      fill: { color: shape.color.replace('#', '') },
      line: { width: 2, color: '1F2937' },
    });

    // Arrow between boxes
    if (i < 2) {
      const arrowX = x + (shape.direction === 'rtl' ? -0.5 : boxWidth);
      const arrowShape = shape.direction === 'rtl' ? 'leftArrow' : 'rightArrow';

      slide.addShape(arrowShape, {
        x: arrowX,
        y: shape.y + boxHeight / 2 - 0.15,
        w: 0.5,
        h: 0.3,
        fill: { color: '6B7280' },
        line: { width: 0 },
      });
    }
  }
}

// ========== CHARTS ==========

function addChart(slide: any, chart: ChartData, template: TemplateConfig) {
  const chartConfig: any = {
    x: 0.5,
    y: 2,
    w: 9,
    h: 3.5,
    showTitle: true,
    title: chart.title,
    titleColor: template.colors.text,
    titleFontFace: template.fonts.title,
    titleFontSize: 18,
  };

  // Prepare data for PptxGenJS
  const chartData: any[] = [];

  chart.datasets.forEach((dataset) => {
    chartData.push({
      name: dataset.name,
      labels: chart.labels,
      values: dataset.values,
    });
  });

  // Add chart based on type
  switch (chart.type) {
    case 'bar':
      slide.addChart('bar', chartData, {
        ...chartConfig,
        barDir: 'bar', // Horizontal bars for RTL
      });
      break;
    case 'column':
      slide.addChart('bar', chartData, {
        ...chartConfig,
        barDir: 'col',
      });
      break;
    case 'line':
      slide.addChart('line', chartData, chartConfig);
      break;
    case 'pie':
      slide.addChart('pie', chartData, chartConfig);
      break;
    case 'doughnut':
      slide.addChart('doughnut', chartData, chartConfig);
      break;
  }
}

// ========== DECORATIVE ELEMENTS ==========

function addDecorativeShapes(slide: any, template: TemplateConfig) {
  // Small decorative circles in corners
  slide.addShape('ellipse', {
    x: 8.5,
    y: 0.5,
    w: 0.8,
    h: 0.8,
    fill: { color: template.colors.secondary, transparency: 30 },
    line: { width: 0 },
  });

  slide.addShape('ellipse', {
    x: 0.5,
    y: 5,
    w: 0.6,
    h: 0.6,
    fill: { color: template.colors.accent, transparency: 40 },
    line: { width: 0 },
  });
}

function addFooter(slide: any) {
  // Placeholder for future footer content
}
