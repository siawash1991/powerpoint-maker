import Anthropic from '@anthropic-ai/sdk';
import { getThemeById } from '../config/themes.js';
import { buildMainPrompt } from '../utils/promptBuilder.js';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function generatePresentationContent(topic, numSlides, themeId, language = 'fa') {
  try {
    const theme = getThemeById(themeId);
    if (!theme) {
      throw new Error(`Theme not found: ${themeId}`);
    }

    const prompt = buildMainPrompt(topic, numSlides, theme, language);

    console.log('📤 Sending request to Claude API...');
    console.log(`   Model: claude-sonnet-4-20250514`);
    console.log(`   Max tokens: 16000`);

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 16000,
      temperature: 1,
      messages: [{
        role: 'user',
        content: prompt
      }],
      system: 'You are an expert presentation designer. You must respond with valid JSON only, no markdown formatting or code blocks. The JSON must be properly formatted and parseable.'
    });

    console.log('📥 Received response from Claude API');

    let responseText = response.content[0].text.trim();

    if (responseText.startsWith('```json')) {
      responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
    } else if (responseText.startsWith('```')) {
      responseText = responseText.replace(/```\n?/g, '').replace(/```\n?$/g, '');
    }

    let presentationData;
    try {
      presentationData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ Failed to parse Claude response as JSON');
      console.error('Response text:', responseText.substring(0, 500));
      throw new Error('Invalid JSON response from Claude API');
    }

    if (!presentationData.slides || !Array.isArray(presentationData.slides)) {
      throw new Error('Invalid response structure: missing slides array');
    }

    if (presentationData.slides.length !== numSlides) {
      console.warn(`⚠️  Warning: Expected ${numSlides} slides, got ${presentationData.slides.length}`);
    }

    for (const slide of presentationData.slides) {
      if (!slide.htmlContent) {
        throw new Error(`Slide ${slide.slideNumber} is missing htmlContent`);
      }
      if (!slide.layout) {
        throw new Error(`Slide ${slide.slideNumber} is missing layout type`);
      }
    }

    console.log(`✅ Successfully generated ${presentationData.slides.length} slides`);

    return presentationData;

  } catch (error) {
    console.error('❌ Error in Claude API call:', error);

    if (error.status === 401) {
      throw new Error('Invalid Claude API key. Please check your CLAUDE_API_KEY environment variable.');
    } else if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else if (error.status === 529) {
      throw new Error('Claude API is temporarily overloaded. Please try again later.');
    }

    throw error;
  }
}
