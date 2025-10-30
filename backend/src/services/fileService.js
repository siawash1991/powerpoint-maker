import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function saveHtmlSlides(presentationId, presentationData) {
  const slideDir = path.join(__dirname, '../../slides', presentationId);
  await fs.mkdir(slideDir, { recursive: true });

  const slidePaths = [];

  for (const slide of presentationData.slides) {
    const slideFileName = `slide-${slide.slideNumber}.html`;
    const slidePath = path.join(slideDir, slideFileName);

    await fs.writeFile(slidePath, slide.htmlContent, 'utf-8');
    slidePaths.push(slidePath);

    console.log(`  ✓ Saved ${slideFileName}`);
  }

  if (presentationData.sharedCSS) {
    const cssPath = path.join(slideDir, 'shared.css');
    await fs.writeFile(cssPath, presentationData.sharedCSS, 'utf-8');
  }

  return slidePaths;
}
