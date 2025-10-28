import PptxGenJS from 'pptxgenjs';
import type { PresentationData } from './slideGenerator';

export async function exportToPowerPoint(presentation: PresentationData): Promise<void> {
  const pptx = new PptxGenJS();

  // تنظیمات پایه
  pptx.layout = 'LAYOUT_16x9';
  pptx.rtlMode = true;
  pptx.author = 'پاوربینت هوشمند';
  pptx.title = presentation.title;

  // رنگ‌ها
  const colors = {
    primary: '4F46E5',
    secondary: '7C3AED',
    white: 'FFFFFF',
    text: '1F2937',
  };

  // اضافه کردن اسلایدها
  presentation.slides.forEach((slide) => {
    const pptxSlide = pptx.addSlide();

    if (slide.type === 'title') {
      // اسلاید عنوان
      pptxSlide.background = { fill: colors.primary };

      pptxSlide.addText(slide.title, {
        x: 0.5,
        y: '35%',
        w: '90%',
        h: 2,
        align: 'center',
        fontSize: 44,
        bold: true,
        color: colors.white,
        fontFace: 'Arial',
        rtlMode: true,
      });

      if (slide.content.length > 0) {
        pptxSlide.addText(slide.content.join('\n'), {
          x: 0.5,
          y: '55%',
          w: '90%',
          h: 1,
          align: 'center',
          fontSize: 20,
          color: 'E5E7EB',
          fontFace: 'Arial',
          rtlMode: true,
        });
      }
    } else if (slide.type === 'conclusion') {
      // اسلاید جمع‌بندی
      pptxSlide.background = { fill: colors.secondary };

      pptxSlide.addText(slide.title, {
        x: 0.5,
        y: '30%',
        w: '90%',
        h: 1.5,
        align: 'center',
        fontSize: 40,
        bold: true,
        color: colors.white,
        fontFace: 'Arial',
        rtlMode: true,
      });

      pptxSlide.addText(slide.content.join('\n\n'), {
        x: 1,
        y: '50%',
        w: 8.5,
        h: 2,
        align: 'center',
        fontSize: 24,
        color: 'E5E7EB',
        fontFace: 'Arial',
        rtlMode: true,
      });
    } else {
      // اسلاید محتوا
      // Header bar
      pptxSlide.addShape('rect', {
        x: 0,
        y: 0,
        w: '100%',
        h: 1,
        fill: { color: colors.primary },
      });

      // عنوان
      pptxSlide.addText(slide.title, {
        x: 0.5,
        y: 0.2,
        w: '90%',
        h: 0.6,
        align: 'right',
        fontSize: 32,
        bold: true,
        color: colors.white,
        fontFace: 'Arial',
        rtlMode: true,
      });

      // محتوا
      if (slide.content.length > 0) {
        const bulletPoints = slide.content.map((point) => ({
          text: point,
          options: {
            fontSize: 20,
            color: colors.text,
            bullet: { code: '2022' },
            rtlMode: true,
            align: 'right' as const,
          },
        }));

        pptxSlide.addText(bulletPoints, {
          x: 1,
          y: 1.5,
          w: 8.5,
          h: 4,
          fontFace: 'Arial',
          rtlMode: true,
          align: 'right' as const,
        });
      }
    }
  });

  // دانلود فایل
  await pptx.writeFile({ fileName: `${presentation.title}.pptx` });
}
