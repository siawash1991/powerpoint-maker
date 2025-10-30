# 🎯 سیستم تولید ارائه PowerPoint فارسی با هوش مصنوعی

یک سیستم کامل Backend با Node.js/Express که با Claude AI ارائه‌های PowerPoint فارسی تولید می‌کند.

## ✨ ویژگی‌ها

- 🤖 **تولید خودکار با Claude AI** - استفاده از Claude Sonnet 4 برای تولید محتوا
- 🎨 **8 تم حرفه‌ای** - از حرفه‌ای آبی تا خلاقانه مرجانی
- 📊 **HTML به PowerPoint** - تبدیل خودکار HTML به فایل .pptx
- 🇮🇷 **پشتیبانی کامل از فارسی** - RTL و فونت مناسب
- ⚡ **RESTful API** - API ساده و قدرتمند
- 📥 **دانلود مستقیم** - فایل PPTX آماده برای دانلود

## 📋 نیازمندی‌ها

- **Node.js**: نسخه 18 یا بالاتر
- **npm**: برای مدیریت پکیج‌ها
- **Claude API Key**: از [console.anthropic.com](https://console.anthropic.com) دریافت کنید

## 🚀 نصب و راه‌اندازی

### 1. کلون کردن پروژه

```bash
git clone <repository-url>
cd powerpoint-maker
```

### 2. نصب Dependencies

```bash
cd backend
npm install
```

### 3. تنظیم API Key

فایل `.env` در پوشه `backend` را ویرایش کنید:

```env
PORT=3001
CLAUDE_API_KEY=your_actual_claude_api_key_here
NODE_ENV=development
```

**نکته**: API Key خود را از [console.anthropic.com](https://console.anthropic.com) دریافت کنید.

### 4. اجرای سرور

```bash
# حالت Development (با nodemon)
npm run dev

# یا حالت Production
npm start
```

سرور روی `http://localhost:3001` اجرا می‌شود.

## 📚 استفاده از API

### Health Check

```bash
curl http://localhost:3001/health
```

**پاسخ:**
```json
{
  "status": "ok",
  "message": "Persian Presentation Builder API is running"
}
```

### تولید ارائه جدید

```bash
curl -X POST http://localhost:3001/api/generate-presentation \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "تاریخچه هوش مصنوعی",
    "numSlides": 5,
    "themeId": "professional-blue"
  }'
```

**پارامترها:**
- `topic` (string, required): موضوع ارائه
- `numSlides` (number, required): تعداد اسلایدها (3-20)
- `themeId` (string, required): شناسه تم (لیست تم‌ها در پایین)
- `language` (string, optional): زبان - پیش‌فرض `fa`

**پاسخ موفق:**
```json
{
  "success": true,
  "presentationId": "pres_1234567890_abc123",
  "title": "تاریخچه هوش مصنوعی",
  "downloadUrl": "/api/download/pres_1234567890_abc123",
  "slides": [
    {
      "slideNumber": 1,
      "layout": "title",
      "previewUrl": "/api/preview/pres_1234567890_abc123/1"
    }
  ]
}
```

### دانلود ارائه

```bash
# دانلود فایل PPTX
curl -O -J http://localhost:3001/api/download/pres_1234567890_abc123
```

### پیش‌نمایش اسلاید

```bash
# مشاهده HTML اسلاید
curl http://localhost:3001/api/preview/pres_1234567890_abc123/1
```

## 🎨 تم‌های موجود

| شناسه | نام | توضیحات |
|------|-----|---------|
| `professional-blue` | حرفه‌ای آبی | مناسب برای ارائه‌های کسب‌وکار |
| `creative-coral` | خلاقانه مرجانی | مناسب برای ارائه‌های خلاقانه |
| `minimal-sage` | مینیمال سبز | ساده و تمیز |
| `bold-red` | پررنگ قرمز | پرانرژی و جذاب |
| `luxury-burgundy` | لوکس زرشکی | مناسب برای ارائه‌های رسمی |
| `dark-purple` | تیره بنفش | مدرن و تکنولوژیک |
| `warm-blush` | گرم صورتی | نرم و دوستانه |
| `vibrant-orange` | پرجنب‌وجوش نارنجی | پرانرژی و مثبت |

## 📁 ساختار پروژه

```
powerpoint-maker/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── presentationController.js
│   │   ├── services/
│   │   │   ├── claudeService.js
│   │   │   ├── pptxService.js
│   │   │   └── fileService.js
│   │   ├── routes/
│   │   │   └── presentationRoutes.js
│   │   ├── config/
│   │   │   └── themes.js
│   │   ├── utils/
│   │   │   ├── validator.js
│   │   │   └── promptBuilder.js
│   │   └── server.js
│   ├── slides/          # HTML slides (generated)
│   ├── outputs/         # PPTX files (generated)
│   ├── public/          # Static files
│   ├── package.json
│   └── .env
├── .gitignore
└── README.md
```

## 🔧 توسعه

### اضافه کردن تم جدید

فایل `backend/src/config/themes.js` را ویرایش کنید:

```javascript
{
  id: 'my-new-theme',
  name: 'تم جدید من',
  description: 'توضیحات تم',
  colors: {
    primary: '#123456',
    secondary: '#654321',
    accent: '#ABCDEF',
    surface: '#FFFFFF',
    text: '#000000',
    muted: '#CCCCCC'
  },
  fonts: { heading: 'Arial', body: 'Arial' }
}
```

### تست محلی

```bash
# تست health check
curl http://localhost:3001/health

# تست تولید ارائه
curl -X POST http://localhost:3001/api/generate-presentation \
  -H "Content-Type: application/json" \
  -d '{"topic":"تست","numSlides":3,"themeId":"professional-blue"}'
```

## ⚠️ نکات مهم

1. **API Key**: حتماً API Key معتبر Claude را تنظیم کنید
2. **حد استفاده**: توجه به محدودیت‌های استفاده از Claude API
3. **هزینه**: هر درخواست هزینه دارد (~$0.01-0.05 بسته به تعداد اسلایدها)
4. **زمان تولید**: تولید ارائه 10-30 ثانیه زمان می‌برد
5. **فایل‌های موقت**: فایل‌های HTML و PPTX در پوشه‌های `slides/` و `outputs/` ذخیره می‌شوند

## 🐛 عیب‌یابی

### خطای "Invalid API Key"
```bash
# بررسی API Key
cat backend/.env | grep CLAUDE_API_KEY

# تست API Key با curl
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":1024,"messages":[{"role":"user","content":"Hello"}]}'
```

### خطای "Cannot find module"
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### پورت در حال استفاده
```bash
# تغییر پورت در .env
echo "PORT=3002" >> backend/.env
```

## 📖 مستندات بیشتر

- [Claude API Documentation](https://docs.anthropic.com/)
- [PptxGenJS Documentation](https://gitbrent.github.io/PptxGenJS/)
- [Express.js Documentation](https://expressjs.com/)

## 🤝 مشارکت

برای مشارکت در پروژه:

1. Fork کنید
2. یک branch جدید بسازید
3. تغییرات خود را commit کنید
4. Pull Request بزنید

## 📄 لایسنس

MIT License - استفاده آزاد برای همه!

## 💬 پشتیبانی

اگر مشکلی دارید:
- Issue باز کنید در GitHub
- مستندات Claude API را بررسی کنید
- لاگ‌های سرور را چک کنید

---

**ساخته شده با ❤️ برای کاربران فارسی‌زبان**
