import pptxgen from 'pptxgenjs';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createPptxFromHtml(presentationId, slidePaths, presentationData) {
  try {
    const outputDir = path.join(__dirname, '../../outputs', presentationId);
    await fs.mkdir(outputDir, { recursive: true });

    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.rtlMode = true;
    pptx.author = 'Persian Presentation Builder';
    pptx.title = presentationData.presentationTitle;

    console.log(`🔄 Converting ${slidePaths.length} HTML slides to PPTX...`);

    for (let i = 0; i < slidePaths.length; i++) {
      const slidePath = slidePaths[i];
      const slideData = presentationData.slides[i];

      console.log(`  Processing slide ${i + 1}: ${slideData.layout}`);

      const htmlContent = await fs.readFile(slidePath, 'utf-8');
      await addSlideFromHtml(pptx, htmlContent, slideData);
    }

    const pptxPath = path.join(outputDir, 'presentation.pptx');
    console.log('💾 Saving PPTX file...');
    await pptx.writeFile({ fileName: pptxPath });

    console.log('✅ PPTX conversion completed');

    const metadataPath = path.join(outputDir, 'metadata.json');
    await fs.writeFile(metadataPath, JSON.stringify({
      presentationId,
      title: presentationData.presentationTitle,
      slideCount: slidePaths.length,
      createdAt: new Date().toISOString()
    }, null, 2));

    return pptxPath;

  } catch (error) {
    console.error('❌ Error creating PPTX:', error);
    throw new Error(`Failed to create PPTX: ${error.message}`);
  }
}

async function addSlideFromHtml(pptx, htmlContent, slideData) {
  const slide = pptx.addSlide();

  try {
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;
    const body = document.body;

    // Extract background color or gradient
    const bodyStyles = body.style;
    if (bodyStyles.background) {
      const bgColor = extractColor(bodyStyles.background);
      if (bgColor) {
        slide.background = { fill: bgColor };
      }
    } else if (bodyStyles.backgroundColor) {
      const bgColor = extractColor(bodyStyles.backgroundColor);
      if (bgColor) {
        slide.background = { fill: bgColor };
      }
    }

    // Process all text elements
    processElement(slide, body, 0, 0, 10, 5.625);

  } catch (error) {
    console.warn(`  ⚠️  Warning: Could not parse HTML for slide, using fallback`);

    // Fallback: simple slide with title
    slide.addText(slideData.layout || 'Slide', {
      x: 0.5,
      y: 2.5,
      w: 9,
      h: 1,
      align: 'center',
      fontSize: 32,
      bold: true,
      color: '000000'
    });
  }
}

function processElement(slide, element, x, y, w, h, depth = 0) {
  if (depth > 10) return; // Prevent infinite recursion

  const tagName = element.tagName?.toLowerCase();

  // Process text elements
  if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4' || tagName === 'h5' || tagName === 'h6') {
    const text = element.textContent.trim();
    if (text) {
      const fontSize = tagName === 'h1' ? 44 : tagName === 'h2' ? 36 : tagName === 'h3' ? 32 : 28;
      const styles = element.style;

      slide.addText(text, {
        x: x,
        y: y,
        w: w,
        h: 0.8,
        align: getAlignment(styles.textAlign) || 'right',
        fontSize: parseInt(styles.fontSize) || fontSize,
        bold: true,
        color: extractColor(styles.color) || '000000',
        fontFace: 'Arial',
        rtlMode: true
      });
    }
  } else if (tagName === 'p') {
    const text = element.textContent.trim();
    if (text) {
      const styles = element.style;

      slide.addText(text, {
        x: x,
        y: y,
        w: w,
        h: 0.5,
        align: getAlignment(styles.textAlign) || 'right',
        fontSize: parseInt(styles.fontSize) || 18,
        color: extractColor(styles.color) || '000000',
        fontFace: 'Arial',
        rtlMode: true
      });
    }
  } else if (tagName === 'ul' || tagName === 'ol') {
    const items = Array.from(element.querySelectorAll('li'));
    let offsetY = y;

    items.forEach((li, index) => {
      const text = li.textContent.trim();
      if (text) {
        slide.addText(text, {
          x: x + 0.5,
          y: offsetY,
          w: w - 0.5,
          h: 0.5,
          align: 'right',
          fontSize: 20,
          bullet: { code: '2022' },
          color: '000000',
          fontFace: 'Arial',
          rtlMode: true
        });
        offsetY += 0.6;
      }
    });
  }

  // Process children recursively
  const children = Array.from(element.children);
  children.forEach(child => {
    processElement(slide, child, x, y, w, h, depth + 1);
  });
}

function extractColor(colorString) {
  if (!colorString) return null;

  // RGB format: rgb(255, 255, 255)
  const rgbMatch = colorString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
    const g = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
    const b = parseInt(rgbMatch[3]).toString(16).padStart(2, '0');
    return r + g + b;
  }

  // Hex format: #RRGGBB
  const hexMatch = colorString.match(/#([0-9a-fA-F]{6})/);
  if (hexMatch) {
    return hexMatch[1];
  }

  // Hex format without #
  if (/^[0-9a-fA-F]{6}$/.test(colorString)) {
    return colorString;
  }

  // Named colors
  const namedColors = {
    'white': 'FFFFFF',
    'black': '000000',
    'red': 'FF0000',
    'blue': '0000FF',
    'green': '00FF00',
    'yellow': 'FFFF00'
  };

  return namedColors[colorString.toLowerCase()] || null;
}

function getAlignment(align) {
  const alignMap = {
    'right': 'right',
    'left': 'left',
    'center': 'center'
  };
  return alignMap[align?.toLowerCase()] || null;
}
