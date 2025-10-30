import { generatePresentationContent } from '../services/claudeService.js';
import { createPptxFromHtml } from '../services/pptxService.js';
import { saveHtmlSlides } from '../services/fileService.js';
import { validateRequest } from '../utils/validator.js';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generatePresentation(req, res) {
  try {
    const { topic, numSlides, themeId, language = 'fa' } = req.body;

    const validation = validateRequest({ topic, numSlides, themeId });
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error
      });
    }

    console.log(`📝 Generating presentation: "${topic}" with ${numSlides} slides using theme "${themeId}"`);

    const presentationId = `pres_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    console.log('🤖 Calling Claude API to generate content...');
    const presentationData = await generatePresentationContent(topic, numSlides, themeId, language);

    console.log('💾 Saving HTML slides...');
    const slidePaths = await saveHtmlSlides(presentationId, presentationData);

    console.log('📊 Converting HTML to PPTX...');
    const pptxPath = await createPptxFromHtml(presentationId, slidePaths, presentationData);

    console.log(`✅ Presentation generated successfully: ${presentationId}`);

    res.json({
      success: true,
      presentationId,
      title: presentationData.presentationTitle,
      downloadUrl: `/api/download/${presentationId}`,
      slides: presentationData.slides.map((slide, index) => ({
        slideNumber: slide.slideNumber,
        layout: slide.layout,
        previewUrl: `/api/preview/${presentationId}/${index + 1}`
      }))
    });

  } catch (error) {
    console.error('❌ Error generating presentation:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate presentation'
    });
  }
}

export async function downloadPresentation(req, res) {
  try {
    const { presentationId } = req.params;

    const outputDir = path.join(__dirname, '../../outputs', presentationId);
    const pptxPath = path.join(outputDir, 'presentation.pptx');

    try {
      await fs.access(pptxPath);
    } catch {
      return res.status(404).json({
        success: false,
        error: 'Presentation not found'
      });
    }

    let filename = 'presentation.pptx';
    try {
      const metadataPath = path.join(outputDir, 'metadata.json');
      const metadata = JSON.parse(await fs.readFile(metadataPath, 'utf-8'));
      filename = `${metadata.title.replace(/\s+/g, '_')}.pptx`;
    } catch {
      // Use default filename if metadata not found
    }

    res.download(pptxPath, filename);

  } catch (error) {
    console.error('❌ Error downloading presentation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to download presentation'
    });
  }
}

export async function getPreview(req, res) {
  try {
    const { presentationId, slideNumber } = req.params;

    const slideDir = path.join(__dirname, '../../slides', presentationId);
    const slidePath = path.join(slideDir, `slide-${slideNumber}.html`);

    try {
      await fs.access(slidePath);
    } catch {
      return res.status(404).json({
        success: false,
        error: 'Slide not found'
      });
    }

    const htmlContent = await fs.readFile(slidePath, 'utf-8');
    res.type('html').send(htmlContent);

  } catch (error) {
    console.error('❌ Error getting preview:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get slide preview'
    });
  }
}
