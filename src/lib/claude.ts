import Anthropic from '@anthropic-ai/sdk';
import type { PresentationOutline, AudienceType } from '@/types/presentation';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

interface GenerateOutlineParams {
  topic: string;
  slideCount: number;
  audience: AudienceType;
}

const AUDIENCE_DESCRIPTIONS = {
  general: 'عمومی (برای همه مخاطبین)',
  business: 'کسب‌وکار (برای مدیران و صاحبان کسب‌وکار)',
  academic: 'دانشگاهی (برای محققان و دانشجویان)',
};

export async function generatePresentationOutline(
  params: GenerateOutlineParams
): Promise<PresentationOutline> {
  const { topic, slideCount, audience } = params;

  const prompt = `تو یک متخصص طراحی پرزنتیشن هستی. می‌خوام یک پرزنتیشن ${slideCount} اسلایدی درباره "${topic}" بسازی.

مخاطب: ${AUDIENCE_DESCRIPTIONS[audience]}

لطفاً یک outline کامل و حرفه‌ای بساز با ساختار JSON زیر:

{
  "title": "عنوان کلی پرزنتیشن",
  "slides": [
    {
      "id": "slide-1",
      "title": "عنوان اسلاید",
      "content": ["نکته اول", "نکته دوم", "نکته سوم"],
      "layout": "title" یا "content" یا "twoColumn" یا "conclusion"
    }
  ]
}

قوانین:
1. اولین اسلاید باید layout="title" داشته باشه (صفحه عنوان)
2. آخرین اسلاید باید layout="conclusion" داشته باشه (جمع‌بندی)
3. هر اسلاید باید 3-5 نکته داشته باشه (به جز عنوان و جمع‌بندی)
4. محتوا باید کامل، واضح و کاربردی باشه
5. از زبان فارسی استاندارد و رسمی استفاده کن
6. عناوین باید جذاب و گویا باشن

فقط JSON رو برگردون، بدون توضیح اضافی.`;

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract JSON from response
    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    // Try to parse JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from Claude response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Construct the complete outline
    const outline: PresentationOutline = {
      title: parsed.title,
      topic,
      slides: parsed.slides,
      slideCount,
      audience,
    };

    return outline;
  } catch (error) {
    console.error('Error generating presentation outline:', error);
    throw new Error('Failed to generate presentation outline');
  }
}

// Retry logic for network errors
export async function generateWithRetry(
  params: GenerateOutlineParams,
  maxRetries = 3
): Promise<PresentationOutline> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await generatePresentationOutline(params);
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
  }

  throw lastError || new Error('Failed after retries');
}
