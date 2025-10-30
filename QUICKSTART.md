# 🚀 راهنمای سریع شروع

## 📥 دانلود و نصب (3 دقیقه)

### گام 1: دانلود پروژه

```bash
# اگه قبلاً دانلود کردی، pull کن
git pull origin claude/session-011CUYHCw9r5LQ1utsga9y9G

# اگه اولین باره
git clone <repository-url>
cd powerpoint-maker
```

### گام 2: رفتن به پوشه Backend

```bash
cd backend
```

### گام 3: نصب پکیج‌ها

```bash
npm install
```

این مرحله 1-2 دقیقه طول می‌کشه.

### گام 4: تنظیم API Key

فایل `.env` رو باز کن:

```bash
# در macOS/Linux
nano .env

# یا در ویندوز
notepad .env
```

خط زیر رو پیدا کن:
```
CLAUDE_API_KEY=your_claude_api_key_here
```

`your_claude_api_key_here` رو با API Key واقعی جایگزین کن.

**کجا API Key بگیرم؟**
1. برو به https://console.anthropic.com
2. لاگین کن
3. برو به Settings > API Keys
4. یک Key جدید بساز
5. کپی کن و در .env بذار

### گام 5: اجرای سرور

```bash
npm start
```

یا برای Development با auto-reload:

```bash
npm run dev
```

باید ببینی:
```
🚀 Server is running on http://localhost:3001
📚 API Documentation: http://localhost:3001/api/health
```

---

## 🧪 تست سریع

### تست 1: Health Check

```bash
curl http://localhost:3001/health
```

باید ببینی:
```json
{"status":"ok","message":"Persian Presentation Builder API is running"}
```

### تست 2: تولید ارائه

```bash
curl -X POST http://localhost:3001/api/generate-presentation \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "معرفی محصول جدید",
    "numSlides": 3,
    "themeId": "professional-blue"
  }'
```

این کار 10-20 ثانیه طول می‌کشه.

پاسخ شبیه این خواهد بود:
```json
{
  "success": true,
  "presentationId": "pres_1730304720123_abc456",
  "title": "معرفی محصول جدید",
  "downloadUrl": "/api/download/pres_1730304720123_abc456",
  "slides": [...]
}
```

### تست 3: دانلود فایل

با `presentationId` که گرفتی:

```bash
curl -O -J http://localhost:3001/api/download/pres_1730304720123_abc456
```

فایل `.pptx` دانلود میشه!

---

## 🎨 تم‌های موجود

| شناسه | نام |
|------|-----|
| `professional-blue` | حرفه‌ای آبی |
| `creative-coral` | خلاقانه مرجانی |
| `minimal-sage` | مینیمال سبز |
| `bold-red` | پررنگ قرمز |
| `luxury-burgundy` | لوکس زرشکی |
| `dark-purple` | تیره بنفش |
| `warm-blush` | گرم صورتی |
| `vibrant-orange` | پرجنب‌وجوش نارنجی |

---

## ❓ مشکلات رایج

### خطا: "Invalid API Key"

**راه‌حل**:
```bash
# بررسی API Key
cat .env | grep CLAUDE_API_KEY

# اطمینان از اینکه فضای خالی یا کاراکتر اضافی نداره
```

### خطا: "Port 3001 is already in use"

**راه‌حل**:
```bash
# پورت رو عوض کن
echo "PORT=3002" >> .env

# یا process قدیمی رو kill کن
lsof -ti:3001 | xargs kill -9
```

### خطا: "Cannot find module"

**راه‌حل**:
```bash
# پاک کردن و نصب دوباره
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 مستندات کامل

برای اطلاعات بیشتر `README.md` رو بخون.

---

## 💡 نکات

- هر ارائه حدود $0.01-0.05 هزینه داره
- تولید ارائه 10-30 ثانیه طول می‌کشه
- فایل‌های HTML در `backend/slides/` ذخیره میشن
- فایل‌های PPTX در `backend/outputs/` ذخیره میشن

---

**موفق باشید! 🎉**
