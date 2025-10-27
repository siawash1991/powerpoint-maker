'use client';

import { useState } from 'react';
import type { AudienceType } from '@/types/presentation';

interface PresentationFormProps {
  onSubmit: (data: {
    topic: string;
    slideCount: number;
    audience: AudienceType;
  }) => Promise<void>;
}

export default function PresentationForm({ onSubmit }: PresentationFormProps) {
  const [topic, setTopic] = useState('');
  const [slideCount, setSlideCount] = useState(5);
  const [audience, setAudience] = useState<AudienceType>('general');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    try {
      await onSubmit({ topic, slideCount, audience });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
      {/* Topic Input */}
      <div className="space-y-2">
        <label htmlFor="topic" className="block text-sm font-medium text-foreground">
          موضوع پرزنتیشن
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="مثلاً: معرفی استارتاپ من"
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-right"
          required
        />
      </div>

      {/* Slide Count Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="slideCount" className="text-sm font-medium text-foreground">
            تعداد اسلایدها
          </label>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {slideCount}
          </span>
        </div>
        <input
          id="slideCount"
          type="range"
          min="5"
          max="20"
          value={slideCount}
          onChange={(e) => setSlideCount(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>5</span>
          <span>20</span>
        </div>
      </div>

      {/* Audience Type Dropdown */}
      <div className="space-y-2">
        <label htmlFor="audience" className="block text-sm font-medium text-foreground">
          نوع مخاطب
        </label>
        <select
          id="audience"
          value={audience}
          onChange={(e) => setAudience(e.target.value as AudienceType)}
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-right cursor-pointer"
        >
          <option value="general">عمومی</option>
          <option value="business">کسب‌وکار</option>
          <option value="academic">دانشگاهی</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !topic.trim()}
        className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            در حال تولید...
          </span>
        ) : (
          'ساخت پرزنتیشن'
        )}
      </button>
    </form>
  );
}
