import Anthropic from '@anthropic-ai/sdk';
import type {
  PresentationOutline,
  AudienceType,
  TemplateType,
  GeometricShape,
  ChartData,
} from '@/types/presentation';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

interface GenerateOutlineParams {
  topic: string;
  slideCount: number;
  audience: AudienceType;
  template?: TemplateType;
  includeShapes?: boolean;
  includeCharts?: boolean;
}

const AUDIENCE_DESCRIPTIONS = {
  general: 'عمومی (برای همه مخاطبین)',
  business: 'کسب‌وکار (برای مدیران و صاحبان کسب‌وکار)',
  academic: 'دانشگاهی (برای محققان و دانشجویان)',
};

export async function generatePresentationOutline(
  params: GenerateOutlineParams
): Promise<PresentationOutline> {
  const { topic, slideCount, audience, template, includeShapes, includeCharts } = params;

  const shapesInstruction = includeShapes
    ? `
برای اسلایدهایی که نیاز به visualization دارند، یک فیلد "visualSuggestion" اضافه کن:
- "circles": برای نمایش 3 مفهوم مهم با دایره
- "flowchart": برای نمایش فرآیند
- "comparison": برای مقایسه دو چیز
- "timeline": برای نمایش زمان‌بندی
`
    : '';

  const chartsInstruction = includeCharts
    ? `
برای اسلایدهایی که نیاز به نمودار دارند، یک فیلد "chartSuggestion" اضافه کن با این فرمت:
{
  "type": "bar" یا "pie" یا "line",
  "title": "عنوان نمودار",
  "labels": ["برچسب 1", "برچسب 2"],
  "values": [50, 30, 20]
}
`
    : '';

  const prompt = `تو یک متخصص طراحی پرزنتیشن هستی. می‌خوام یک پرزنتیشن ${slideCount} اسلایدی درباره "${topic}" بسازی.

مخاطب: ${AUDIENCE_DESCRIPTIONS[audience]}
${template ? `قالب: ${template}` : ''}

لطفاً یک outline کامل و حرفه‌ای بساز با ساختار JSON زیر:

{
  "title": "عنوان کلی پرزنتیشن",
  "slides": [
    {
      "id": "slide-1",
      "title": "عنوان اسلاید",
      "content": ["نکته اول", "نکته دوم", "نکته سوم"],
      "layout": "title" یا "content" یا "twoColumn" یا "conclusion",
      "notes": "یادداشت اختیاری برای ارائه‌دهنده"
    }
  ]
}

${shapesInstruction}
${chartsInstruction}

قوانین مهم:
1. اولین اسلاید باید layout="title" داشته باشه (صفحه عنوان)
2. آخرین اسلاید باید layout="conclusion" داشته باشه (جمع‌بندی و نتیجه‌گیری)
3. هر اسلاید content باید 3-5 نکته کلیدی داشته باشه
4. هر اسلاید twoColumn باید 4-8 نکته داشته باشه (تقسیم بشه به دو ستون)
5. محتوا باید کامل، واضح، کاربردی و actionable باشه
6. از زبان فارسی استاندارد، رسمی و حرفه‌ای استفاده کن
7. عناوین باید جذاب، گویا و مختصر باشن
8. از تکرار محتوا جدا خودداری کن
9. ترتیب منطقی داشته باشه: مقدمه → محتوای اصلی → نتیجه‌گیری

نکات Persian-specific:
- از اصطلاحات فارسی استفاده کن، نه ترجمه تحت‌اللفظی
- جملات کوتاه و مؤثر بنویس
- از نقطه‌چین‌ها و علائم سوال برای engagement استفاده کن
- محتوا باید مناسب فرهنگ ایرانی باشه

فقط JSON رو برگردون، بدون توضیح اضافی یا markdown.`;

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
    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : '';

    // Try to parse JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from Claude response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Process slides and add shapes/charts based on suggestions
    const processedSlides = parsed.slides.map((slide: any, index: number) => {
      const processedSlide = {
        ...slide,
        shapes: [] as GeometricShape[],
        chart: undefined as ChartData | undefined,
      };

      // Add shapes based on visual suggestion
      if (includeShapes && slide.visualSuggestion) {
        processedSlide.shapes = generateShapesFromSuggestion(
          slide.visualSuggestion,
          index
        );
      }

      // Add chart based on suggestion
      if (includeCharts && slide.chartSuggestion) {
        processedSlide.chart = {
          type: slide.chartSuggestion.type,
          title: slide.chartSuggestion.title,
          labels: slide.chartSuggestion.labels,
          datasets: [
            {
              name: slide.chartSuggestion.title,
              values: slide.chartSuggestion.values,
            },
          ],
        };
      }

      // Clean up suggestion fields
      delete (processedSlide as any).visualSuggestion;
      delete (processedSlide as any).chartSuggestion;

      return processedSlide;
    });

    // Construct the complete outline
    const outline: PresentationOutline = {
      title: parsed.title,
      topic,
      slides: processedSlides,
      slideCount,
      audience,
      template,
      includeShapes,
      includeCharts,
    };

    return outline;
  } catch (error) {
    console.error('Error generating presentation outline:', error);
    throw new Error('Failed to generate presentation outline');
  }
}

function generateShapesFromSuggestion(
  suggestion: string,
  slideIndex: number
): GeometricShape[] {
  const shapes: GeometricShape[] = [];

  switch (suggestion) {
    case 'circles':
      // 3 دایره برای نمایش 3 مفهوم
      for (let i = 0; i < 3; i++) {
        shapes.push({
          type: 'circle',
          x: 7 - i * 2.5,
          y: 3,
          radius: 0.8,
          color: i === 0 ? '#3b82f6' : i === 1 ? '#8b5cf6' : '#10b981',
          text: `${i + 1}`,
        });
      }
      break;

    case 'flowchart':
      // یک flowchart ساده
      shapes.push({
        type: 'flowchart',
        x: 6.5,
        y: 2.5,
        color: '#3b82f6',
        direction: 'rtl',
      });
      break;

    case 'comparison':
      // دو مربع برای مقایسه
      shapes.push(
        {
          type: 'rect',
          x: 5.5,
          y: 2.5,
          width: 3.5,
          height: 2,
          color: '#ef4444',
          borderColor: '#991b1b',
          borderWidth: 2,
        },
        {
          type: 'arrow',
          x: 3.5,
          y: 3.2,
          width: 1.5,
          height: 0.4,
          color: '#6b7280',
          direction: 'ltr',
        },
        {
          type: 'rect',
          x: 0.5,
          y: 2.5,
          width: 3.5,
          height: 2,
          color: '#10b981',
          borderColor: '#065f46',
          borderWidth: 2,
        }
      );
      break;

    case 'timeline':
      // خط زمانی با دایره‌ها
      for (let i = 0; i < 4; i++) {
        shapes.push({
          type: 'circle',
          x: 8 - i * 2,
          y: 3,
          radius: 0.5,
          color: '#3b82f6',
          text: '',
        });

        if (i < 3) {
          shapes.push({
            type: 'arrow',
            x: 5.5 - i * 2,
            y: 3.15,
            width: 1,
            height: 0.2,
            color: '#6b7280',
            direction: 'ltr',
          });
        }
      }
      break;
  }

  return shapes;
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
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * Math.pow(2, i))
        );
      }
    }
  }

  throw lastError || new Error('Failed after retries');
}
