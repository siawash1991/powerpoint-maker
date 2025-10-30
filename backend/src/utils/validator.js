export function validateRequest(data) {
  const { topic, numSlides, themeId } = data;

  if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
    return { valid: false, error: 'Topic is required and must be a non-empty string' };
  }

  if (!numSlides || typeof numSlides !== 'number' || numSlides < 3 || numSlides > 20) {
    return { valid: false, error: 'Number of slides must be between 3 and 20' };
  }

  if (!themeId || typeof themeId !== 'string') {
    return { valid: false, error: 'Theme ID is required' };
  }

  return { valid: true };
}
