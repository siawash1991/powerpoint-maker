'use client';

import { useState } from 'react';
import { SlideGenerator } from '@/components/SlideGenerator';
import { SimpleSlidePreview } from '@/components/SimpleSlidePreview';
import { generateSlides, type PresentationData } from '@/lib/slideGenerator';
import { exportToPowerPoint } from '@/lib/pptxExport';

export default function Home() {
  const [presentation, setPresentation] = useState<PresentationData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (text: string) => {
    setError(null);
    setIsGenerating(true);

    try {
      const result = await generateSlides(text);
      setPresentation(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در تولید اسلایدها');
      console.error('Error generating slides:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = async () => {
    if (!presentation) return;

    try {
      await exportToPowerPoint(presentation);
    } catch (err) {
      setError('خطا در دانلود فایل');
      console.error('Error exporting presentation:', err);
    }
  };

  const handleReset = () => {
    setPresentation(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🎯 پاوربینت هوشمند
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            پرزنتیشن حرفه‌ای خود را در چند ثانیه بسازید
          </p>
          <div className="mt-4 inline-block px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
            ✅ بدون نیاز به API Key - کاملاً رایگان
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mb-6 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        {/* Content */}
        {!presentation ? (
          <div className="max-w-3xl mx-auto">
            <SlideGenerator onGenerate={handleGenerate} isGenerating={isGenerating} />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <SimpleSlidePreview
              presentation={presentation}
              onExport={handleExport}
              onReset={handleReset}
            />
          </div>
        )}

        {/* Features */}
        {!presentation && (
          <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-lg mb-2">سریع و آسان</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                فقط متن خود را بنویسید و در چند ثانیه پرزنتیشن آماده است
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="font-bold text-lg mb-2">طراحی حرفه‌ای</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                قالب‌های زیبا و مدرن با پشتیبانی کامل از زبان فارسی
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-bold text-lg mb-2">کاملاً رایگان</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                بدون نیاز به API Key یا ثبت‌نام - همه چیز در مرورگر شما
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            ساخته شده با ❤️ برای کاربران فارسی‌زبان
          </p>
        </div>
      </main>
    </div>
  );
}
