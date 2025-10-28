'use client';

import { useState } from 'react';
import { generateSampleSlides } from '@/lib/slideGenerator';

interface SlideGeneratorProps {
  onGenerate: (text: string) => void;
  isGenerating: boolean;
}

export function SlideGenerator({ onGenerate, isGenerating }: SlideGeneratorProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onGenerate(text);
    }
  };

  const handleLoadSample = () => {
    const sample = `معرفی محصول جدید

مشکل
ساخت پرزنتیشن وقت‌گیر است
طراحی اسلایدها دشوار است
نیاز به مهارت‌های گرافیکی دارد

راه‌حل ما
تولید خودکار اسلایدها
قالب‌های حرفه‌ای آماده
پشتیبانی کامل از فارسی
خروجی PowerPoint

ویژگی‌ها
🎨 قالب‌های زیبا و متنوع
📊 نمودار و اشکال هندسی
⚡ سرعت بالا
🔒 امن و خصوصی`;

    setText(sample);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Text Input */}
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            متن پرزنتیشن خود را وارد کنید
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="عنوان پرزنتیشن

نکته اول
نکته دوم
نکته سوم

هر پاراگراف به یک اسلاید تبدیل می‌شود..."
            className="w-full h-64 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-right resize-none"
            style={{ direction: 'rtl' }}
            disabled={isGenerating}
          />
          <div className="mt-2 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>{text.length} کاراکتر</span>
            <button
              type="button"
              onClick={handleLoadSample}
              className="text-blue-600 dark:text-blue-400 hover:underline"
              disabled={isGenerating}
            >
              بارگذاری متن نمونه
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
            💡 نکات:
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <li>• اولین خط = عنوان پرزنتیشن</li>
            <li>• هر پاراگراف = یک اسلاید</li>
            <li>• از bullet points استفاده کنید (•، -، *)</li>
            <li>• خطوط خالی برای جدا کردن اسلایدها</li>
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!text.trim() || isGenerating}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          {isGenerating ? (
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
              در حال تولید اسلایدها...
            </span>
          ) : (
            '🚀 ساخت پرزنتیشن'
          )}
        </button>
      </form>
    </div>
  );
}
