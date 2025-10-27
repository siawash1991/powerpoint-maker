'use client';

import { useState } from 'react';
import PresentationForm from '@/components/PresentationForm';
import SlidePreview from '@/components/SlidePreview';
import type { PresentationOutline, GenerateResponse } from '@/types/presentation';

export default function Home() {
  const [outline, setOutline] = useState<PresentationOutline | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePresentation = async (data: {
    topic: string;
    slideCount: number;
    audience: string;
  }) => {
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate presentation');
      }

      const result: GenerateResponse = await response.json();
      setOutline(result.outline);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در ساخت پرزنتیشن');
      console.error('Error generating presentation:', err);
    }
  };

  const handleExport = async () => {
    if (!outline) return;

    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ outline }),
      });

      if (!response.ok) {
        throw new Error('Failed to export presentation');
      }

      // Download the file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${outline.title}.pptx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('خطا در دانلود فایل');
      console.error('Error exporting presentation:', err);
    }
  };

  const handleReset = () => {
    setOutline(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            ساخت پرزنتیشن با هوش مصنوعی
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            پرزنتیشن حرفه‌ای خود را در چند ثانیه بسازید
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mb-6 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        {/* Content */}
        {!outline ? (
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
            <PresentationForm onSubmit={handleGeneratePresentation} />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                ← ساخت پرزنتیشن جدید
              </button>
            </div>
            <SlidePreview outline={outline} onExport={handleExport} />
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            ساخته شده با Claude AI
          </p>
        </div>
      </main>
    </div>
  );
}
