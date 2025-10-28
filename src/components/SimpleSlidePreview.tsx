'use client';

import type { PresentationData } from '@/lib/slideGenerator';

interface SimpleSlidePreviewProps {
  presentation: PresentationData;
  onExport: () => void;
  onReset: () => void;
}

export function SimpleSlidePreview({ presentation, onExport, onReset }: SimpleSlidePreviewProps) {
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          ← متن جدید
        </button>
        <button
          onClick={onExport}
          className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-teal-700 transition-all shadow-lg"
        >
          📥 دانلود PowerPoint
        </button>
      </div>

      {/* Presentation Title */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {presentation.title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {presentation.slides.length} اسلاید
        </p>
      </div>

      {/* Slides Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {presentation.slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all hover:scale-[1.02] ${
              slide.type === 'title'
                ? 'bg-gradient-to-br from-blue-600 to-purple-600'
                : slide.type === 'conclusion'
                ? 'bg-gradient-to-br from-purple-600 to-pink-600'
                : ''
            }`}
          >
            {/* Slide Number */}
            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-900">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                اسلاید {index + 1}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {slide.type === 'title' ? 'عنوان' : slide.type === 'conclusion' ? 'جمع‌بندی' : 'محتوا'}
              </span>
            </div>

            {/* Slide Content */}
            <div
              className={`p-6 ${
                slide.type === 'title' || slide.type === 'conclusion'
                  ? 'text-white'
                  : 'text-gray-900 dark:text-white'
              }`}
              style={{ minHeight: '200px' }}
            >
              {/* Title */}
              <h3
                className={`font-bold mb-4 ${
                  slide.type === 'title'
                    ? 'text-2xl text-center'
                    : slide.type === 'conclusion'
                    ? 'text-xl text-center'
                    : 'text-lg text-right'
                }`}
              >
                {slide.title}
              </h3>

              {/* Content */}
              {slide.content.length > 0 && (
                <ul
                  className={`space-y-2 ${
                    slide.type === 'title' || slide.type === 'conclusion' ? 'text-center' : 'text-right'
                  }`}
                >
                  {slide.content.map((line, i) => (
                    <li
                      key={i}
                      className={`${
                        slide.type === 'title'
                          ? 'text-sm opacity-90'
                          : slide.type === 'conclusion'
                          ? 'text-base opacity-90'
                          : 'text-sm'
                      }`}
                    >
                      {slide.type === 'content' && '• '}
                      {line}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Export Button (Bottom) */}
      <div className="flex justify-center">
        <button
          onClick={onExport}
          className="px-12 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold text-lg rounded-lg hover:from-green-700 hover:to-teal-700 transition-all shadow-lg transform hover:scale-[1.02]"
        >
          📥 دانلود PowerPoint
        </button>
      </div>
    </div>
  );
}
