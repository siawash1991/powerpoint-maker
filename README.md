# 🎯 ساخت پرزنتیشن فارسی با هوش مصنوعی

پلتفرم ساخت پرزنتیشن حرفه‌ای با استفاده از هوش مصنوعی Claude و export به PowerPoint

## ✨ ویژگی‌ها

- 🤖 **تولید خودکار محتوا**: استفاده از Claude AI برای تولید outline پرزنتیشن
- 🎨 **طراحی حرفه‌ای**: رابط کاربری زیبا و مدرن با Tailwind CSS
- 📝 **پشتیبانی کامل از فارسی**: RTL support و فونت Vazirmatn
- 📊 **Export به PowerPoint**: دانلود مستقیم فایل .pptx
- 🎭 **انواع layout**: Title, Content, Two-Column, Conclusion
- ⚙️ **قابل تنظیم**: انتخاب تعداد اسلاید (5-20) و نوع مخاطب

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها

- Node.js 18 یا بالاتر
- npm یا yarn
- API Key از [Anthropic](https://console.anthropic.com/)

### مراحل نصب

1. **Clone کردن پروژه**
```bash
git clone <repository-url>
cd powerpoint-maker
```

2. **نصب dependencies**
```bash
npm install
```

3. **تنظیم API Key**

فایل `.env.local` را ویرایش کنید و API Key خود را وارد کنید:

```env
ANTHROPIC_API_KEY=your_api_key_here
```

4. **اجرای پروژه**
```bash
npm run dev
```

5. **باز کردن در مرورگر**

به آدرس [http://localhost:3000](http://localhost:3000) بروید

## 📁 ساختار پروژه

```
src/
├── app/
│   ├── api/
│   │   ├── generate/       # API برای تولید outline
│   │   └── export/         # API برای export به PowerPoint
│   ├── page.tsx            # صفحه اصلی
│   ├── layout.tsx          # Layout کلی (RTL + فونت فارسی)
│   └── globals.css
├── components/
│   ├── PresentationForm.tsx    # فرم ورودی
│   └── SlidePreview.tsx        # نمایش پیش‌نمایش اسلایدها
├── lib/
│   ├── claude.ts           # Service برای Claude API
│   └── pptx.ts            # Service برای تولید PowerPoint
└── types/
    └── presentation.ts     # TypeScript types
```

## 🎯 نحوه استفاده

1. موضوع پرزنتیشن خود را وارد کنید (مثلاً: "معرفی استارتاپ من")
2. تعداد اسلایدها را انتخاب کنید (5 تا 20)
3. نوع مخاطب را مشخص کنید (عمومی، کسب‌وکار، دانشگاهی)
4. روی دکمه "ساخت پرزنتیشن" کلیک کنید
5. پس از تولید، پیش‌نمایش را مشاهده کنید
6. روی "دانلود PowerPoint" کلیک کنید

## 🛠️ تکنولوژی‌های استفاده شده

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **AI**: Claude 3.5 Sonnet (Anthropic)
- **Export**: pptxgenjs
- **Font**: Vazirmatn (Google Fonts)

## 📝 API Endpoints

### POST `/api/generate`
تولید outline پرزنتیشن

**Request Body:**
```json
{
  "topic": "موضوع پرزنتیشن",
  "slideCount": 10,
  "audience": "general"
}
```

**Response:**
```json
{
  "outline": {
    "title": "عنوان پرزنتیشن",
    "topic": "موضوع",
    "slides": [...],
    "slideCount": 10,
    "audience": "general"
  }
}
```

### POST `/api/export`
Export کردن به PowerPoint

**Request Body:**
```json
{
  "outline": { ... }
}
```

**Response:** فایل .pptx

## 🎨 سفارشی‌سازی

### تغییر رنگ‌بندی PowerPoint

فایل `src/lib/pptx.ts` را ویرایش کنید:

```typescript
const COLORS = {
  primary: '4F46E5',    // رنگ اصلی
  secondary: '7C3AED',  // رنگ ثانویه
  // ...
};
```

### تغییر Prompt برای Claude

فایل `src/lib/claude.ts` را ویرایش کنید و prompt را سفارشی کنید.

## 🐛 رفع مشکلات

### Error: API key not configured
- مطمئن شوید فایل `.env.local` را ساخته‌اید
- API Key را از Anthropic Console دریافت کنید

### فونت فارسی نمایش داده نمی‌شود
- Cache مرورگر را پاک کنید
- Dev server را restart کنید

## 🤝 مشارکت

مشارکت‌های شما خوش‌آمد است! لطفاً:
1. Fork کنید
2. Branch جدید بسازید
3. تغییرات را commit کنید
4. Pull Request بفرستید

## 📄 لایسنس

MIT License

## 🙏 تشکر

- [Anthropic](https://anthropic.com) برای Claude API
- [Next.js](https://nextjs.org) برای framework عالی
- [pptxgenjs](https://gitbrent.github.io/PptxGenJS/) برای کتابخانه PowerPoint

---

**ساخته شده با ❤️ و Claude AI**
