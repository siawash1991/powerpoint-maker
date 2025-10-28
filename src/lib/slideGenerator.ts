// تولید خودکار اسلایدها از متن ورودی (بدون نیاز به AI)

export interface Slide {
  id: string;
  title: string;
  content: string[];
  type: 'title' | 'content' | 'conclusion';
}

export interface PresentationData {
  title: string;
  slides: Slide[];
  createdAt: Date;
}

export async function generateSlides(text: string): Promise<PresentationData> {
  // شبیه‌سازی تاخیر برای UX بهتر
  await new Promise(resolve => setTimeout(resolve, 1000));

  // تقسیم متن به پاراگراف‌ها
  const paragraphs = text
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 0);

  if (paragraphs.length === 0) {
    throw new Error('لطفاً متنی وارد کنید');
  }

  // اولین پاراگراف = عنوان
  const title = paragraphs[0];

  const slides: Slide[] = [];

  // اسلاید عنوان
  slides.push({
    id: 'slide-1',
    title: title,
    content: ['پرزنتیشن ساخته شده با پاوربینت هوشمند'],
    type: 'title',
  });

  // تبدیل پاراگراف‌ها به اسلایدها
  const contentParagraphs = paragraphs.slice(1);

  if (contentParagraphs.length > 0) {
    // گروه‌بندی هر 3-5 خط به یک اسلاید
    let currentSlideLines: string[] = [];
    let slideNumber = 2;

    for (let i = 0; i < contentParagraphs.length; i++) {
      const para = contentParagraphs[i];

      // اگر پاراگراف با شماره یا bullet شروع بشه، خط جدید
      if (para.match(/^[\d\-•\*]/)) {
        currentSlideLines.push(para);
      } else if (currentSlideLines.length === 0) {
        // اگر خالیه، این خط عنوان اسلاید می‌شه
        currentSlideLines.push(para);
      } else {
        // اضافه کردن به محتوای اسلاید
        currentSlideLines.push(para);
      }

      // اگه 5 خط شد یا آخرین پاراگراف بود، اسلاید رو بساز
      if (currentSlideLines.length >= 5 || i === contentParagraphs.length - 1) {
        if (currentSlideLines.length > 0) {
          const slideTitle = currentSlideLines[0];
          const slideContent = currentSlideLines.slice(1);

          // اگه محتوا خالیه، از خود عنوان استفاده کن
          if (slideContent.length === 0) {
            slideContent.push(slideTitle);
          }

          slides.push({
            id: `slide-${slideNumber}`,
            title: slideTitle.length > 60 ? slideTitle.substring(0, 60) + '...' : slideTitle,
            content: slideContent,
            type: 'content',
          });

          slideNumber++;
          currentSlideLines = [];
        }
      }
    }
  }

  // اسلاید جمع‌بندی
  slides.push({
    id: `slide-${slides.length + 1}`,
    title: 'جمع‌بندی',
    content: [
      'با تشکر از توجه شما',
      'سوالات خود را مطرح کنید',
    ],
    type: 'conclusion',
  });

  return {
    title,
    slides,
    createdAt: new Date(),
  };
}

// تولید اسلایدهای نمونه برای تست
export function generateSampleSlides(): PresentationData {
  return {
    title: 'نمونه پرزنتیشن',
    slides: [
      {
        id: 'slide-1',
        title: 'معرفی محصول جدید',
        content: ['پرزنتیشن ساخته شده با پاوربینت هوشمند'],
        type: 'title',
      },
      {
        id: 'slide-2',
        title: 'مشکل',
        content: [
          'ساخت پرزنتیشن وقت‌گیر است',
          'طراحی اسلایدها دشوار است',
          'نیاز به مهارت‌های گرافیکی دارد',
        ],
        type: 'content',
      },
      {
        id: 'slide-3',
        title: 'راه‌حل ما',
        content: [
          'تولید خودکار اسلایدها',
          'قالب‌های حرفه‌ای آماده',
          'پشتیبانی کامل از فارسی',
          'خروجی PowerPoint',
        ],
        type: 'content',
      },
      {
        id: 'slide-4',
        title: 'ویژگی‌ها',
        content: [
          '🎨 قالب‌های زیبا و متنوع',
          '📊 نمودار و اشکال هندسی',
          '⚡ سرعت بالا',
          '🔒 امن و خصوصی',
        ],
        type: 'content',
      },
      {
        id: 'slide-5',
        title: 'جمع‌بندی',
        content: [
          'با تشکر از توجه شما',
          'سوالات خود را مطرح کنید',
        ],
        type: 'conclusion',
      },
    ],
    createdAt: new Date(),
  };
}
