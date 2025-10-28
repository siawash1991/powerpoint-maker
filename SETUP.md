# 🚀 راهنمای نصب و راه‌اندازی

## قدم 1: نصب Dependencies

```bash
npm install
```

## قدم 2: تنظیم API Key (مهم!)

### 2.1. دریافت API Key

1. به [Anthropic Console](https://console.anthropic.com/) برو
2. اگر اکانت نداری، ثبت‌نام کن (رایگان)
3. وارد Dashboard شو
4. از منوی چپ، به **"API Keys"** برو
5. روی **"Create Key"** کلیک کن
6. یک نام برای Key بذار (مثلاً: "PowerPoint Maker")
7. Key رو کپی کن (فقط یک‌بار نشون داده میشه!)

### 2.2. تنظیم در پروژه

فایل `.env.local` رو ویرایش کن:

```bash
# باز کردن فایل
nano .env.local
# یا
code .env.local
```

خط زیر رو پیدا کن:
```
ANTHROPIC_API_KEY=your_api_key_here
```

و با API Key واقعیت جایگزین کن:
```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**توجه:** API Key باید با `sk-ant-api03-` شروع بشه.

### 2.3. ذخیره و Restart

1. فایل رو ذخیره کن (Ctrl+S)
2. سرور رو restart کن:

```bash
# اگه سرور در حال اجراست، Ctrl+C بزن
# بعد دوباره اجرا کن:
npm run dev
```

## قدم 3: اجرای پروژه

```bash
npm run dev
```

سپس به [http://localhost:3000](http://localhost:3000) برو.

## قدم 4: تست کردن

1. یک موضوع وارد کن (مثلاً: "معرفی استارتاپ من")
2. تنظیمات رو انتخاب کن
3. روی "ساخت پرزنتیشن" کلیک کن
4. منتظر بمون تا پرزنتیشن تولید بشه (15-30 ثانیه)
5. روی "دانلود PowerPoint" کلیک کن

## 🐛 رفع مشکلات

### خطا: "API Key تنظیم نشده است"

**علت:** فایل `.env.local` رو درست تنظیم نکردی.

**راه‌حل:**
1. مطمئن شو فایل `.env.local` در root پروژه هست
2. مطمئن شو API Key رو درست کپی کردی
3. مطمئن شو بدون فاصله اضافی نوشتی
4. سرور رو restart کن (Ctrl+C و دوباره `npm run dev`)

### خطا: "Failed to generate presentation"

**احتمالات:**
1. API Key اشتباهه → دوباره چک کن
2. اینترنت قطعه → وصل شو
3. API limit تموم شده → چک کن در console.anthropic.com

### خطا: "Network error"

**راه‌حل:**
1. اینترنت رو چک کن
2. VPN رو چک کن (اگه فعاله)
3. دوباره امتحان کن

## 💰 هزینه‌ها

- **رایگان:** $5 credit اولیه برای تست
- **هر پرزنتیشن:** حدود 0.01-0.05 دلار (بستگی به تعداد اسلایدها)
- **200 پرزنتیشن:** حدود $10

## 🔒 امنیت

- **هیچ‌وقت** API Key رو commit نکن!
- فایل `.env.local` در `.gitignore` هست و commit نمیشه
- API Key رو با کسی share نکن
- اگه فکر می‌کنی leak شده، فوراً revoke کن در console.anthropic.com

## 📝 نکات مهم

1. **اولین بار:** وقتی اولین بار run می‌کنی، باید حتماً API Key رو set کنی
2. **Restart:** بعد از تغییر `.env.local` حتماً سرور رو restart کن
3. **Placeholder:** `your_api_key_here` یک placeholder هست، باید با key واقعیت جایگزین کنی

## ✅ چک‌لیست

قبل از اجرا، مطمئن شو:

- [ ] Node.js 18+ نصب شده
- [ ] `npm install` اجرا شده
- [ ] فایل `.env.local` موجوده
- [ ] API Key دریافت شده از console.anthropic.com
- [ ] API Key در `.env.local` قرار گرفته
- [ ] سرور restart شده

## 🎯 تست موفق

اگه همه چی درست باشه:
- صفحه بدون خطا load میشه
- بعد از submit، loading نشون داده میشه
- بعد از 15-30 ثانیه، پیش‌نمایش اسلایدها نمایش داده میشه
- دکمه "دانلود PowerPoint" فعال میشه
- فایل .pptx دانلود میشه

## 🆘 کمک بیشتر

اگر مشکلی داری:
1. Console browser رو چک کن (F12)
2. Terminal logs رو بخون
3. مطمئن شو API Key درست copy شده (بدون فاصله اضافی)
4. مطمئن شو سرور restart شده

---

**موفق باشی! 🚀**
