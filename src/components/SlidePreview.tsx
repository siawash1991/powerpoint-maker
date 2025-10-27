'use client';

import type { PresentationOutline, Slide } from '@/types/presentation';

interface SlidePreviewProps {
  outline: PresentationOutline;
  onExport: () => void;
}

export default function SlidePreview({ outline, onExport }: SlidePreviewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {outline.title}
        </h2>
        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>📊 {outline.slideCount} اسلاید</span>
          <span>👥 مخاطب: {getAudienceLabel(outline.audience)}</span>
        </div>
      </div>

      {/* Slides */}
      <div className="space-y-4">
        {outline.slides.map((slide, index) => (
          <SlideCard key={slide.id} slide={slide} index={index} />
        ))}
      </div>

      {/* Export Button */}
      <div className="sticky bottom-4 flex justify-center">
        <button
          onClick={onExport}
          className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-full hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-2xl"
        >
          📥 دانلود PowerPoint
        </button>
      </div>
    </div>
  );
}

function SlideCard({ slide, index }: { slide: Slide; index: number }) {
  const layoutEmoji = {
    title: '🎯',
    content: '📝',
    twoColumn: '📋',
    conclusion: '✅',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start gap-4">
        {/* Slide Number */}
        <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
          {index + 1}
        </div>

        {/* Slide Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{layoutEmoji[slide.layout]}</span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {slide.title}
            </h3>
          </div>

          {slide.content.length > 0 && (
            <ul className="space-y-2">
              {slide.content.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                >
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function getAudienceLabel(audience: string): string {
  const labels: Record<string, string> = {
    general: 'عمومی',
    business: 'کسب‌وکار',
    academic: 'دانشگاهی',
  };
  return labels[audience] || audience;
}
