export function buildMainPrompt(topic, numSlides, theme, language) {
  return `
شما یک متخصص طراحی ارائه‌های حرفه‌ای هستید که باید یک ارائه PowerPoint فارسی تولید کنید.

## اطلاعات ورودی

**موضوع ارائه**: ${topic}
**تعداد اسلایدها**: ${numSlides}
**تم انتخابی**: ${theme.name}
**رنگ‌بندی تم**:
- Primary: ${theme.colors.primary}
- Secondary: ${theme.colors.secondary}
- Accent: ${theme.colors.accent}
- Surface: ${theme.colors.surface}
- Text: ${theme.colors.text}
- Muted: ${theme.colors.muted}

## قوانین مهم HTML

### 1. ساختار HTML
- همه اسلایدها باید دقیقاً با ابعاد 960px × 540px باشند
- متن فقط داخل <p>, <h1>-<h6>, <ul>, <ol> مجاز است
- از فونت Arial استفاده کنید
- استفاده از inline styles

### 2. RTL و فارسی
- تمام اسلایدها باید dir="rtl" داشته باشند
- تمام متون باید به فارسی باشند
- استفاده از text-align: right برای متون

### 3. محتوای اسلاید
- هر اسلاید نباید بیش از 5 نقطه یا 2-3 پاراگراف داشته باشد
- عناوین باید کوتاه و واضح باشند
- از فضای سفید به‌خوبی استفاده کنید

## نمونه Layout ها

### Title Slide (اسلاید عنوان)
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      width: 960px;
      height: 540px;
      overflow: hidden;
      direction: rtl;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
    }
  </style>
</head>
<body>
  <h1 style="color: white; font-size: 72px; margin: 20px;">عنوان اصلی</h1>
  <p style="color: white; font-size: 24px; opacity: 0.9;">زیرعنوان</p>
</body>
</html>

### Content with Bullets
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      width: 960px;
      height: 540px;
      overflow: hidden;
      direction: rtl;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 40px;
      background: ${theme.colors.surface};
    }
    h2 {
      color: ${theme.colors.primary};
      border-right: 6px solid ${theme.colors.accent};
      padding-right: 20px;
      margin-bottom: 30px;
    }
    ul {
      font-size: 24px;
      line-height: 1.8;
      color: ${theme.colors.text};
    }
  </style>
</head>
<body>
  <h2>عنوان اسلاید</h2>
  <ul>
    <li>نکته اول</li>
    <li>نکته دوم</li>
    <li>نکته سوم</li>
  </ul>
</body>
</html>

### Two Column Layout
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      width: 960px;
      height: 540px;
      overflow: hidden;
      direction: rtl;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 40px;
      background: white;
    }
    h2 {
      color: ${theme.colors.primary};
      margin-bottom: 30px;
    }
    .columns {
      display: flex;
      gap: 30px;
    }
    .column {
      flex: 1;
      padding: 30px;
      background: #f5f5f5;
      border-radius: 12px;
    }
    .column h3 {
      color: ${theme.colors.accent};
      margin-bottom: 15px;
    }
  </style>
</head>
<body>
  <h2>عنوان اسلاید</h2>
  <div class="columns">
    <div class="column">
      <h3>ستون اول</h3>
      <ul>
        <li>نکته اول</li>
        <li>نکته دوم</li>
      </ul>
    </div>
    <div class="column">
      <h3>ستون دوم</h3>
      <ul>
        <li>نکته اول</li>
        <li>نکته دوم</li>
      </ul>
    </div>
  </div>
</body>
</html>

## ساختار اسلایدها

اسلاید اول: عنوان (Title slide با background gradient)
اسلایدهای میانی: محتوا (Content slides با bullet points یا دو ستونه)
اسلاید آخر: جمع‌بندی (Conclusion slide)

## خروجی مورد انتظار

خروجی را به‌صورت JSON خالص (بدون markdown یا code block) بدهید:

{
  "presentationTitle": "عنوان ارائه به فارسی",
  "slides": [
    {
      "slideNumber": 1,
      "layout": "title",
      "htmlContent": "<!DOCTYPE html>..."
    },
    {
      "slideNumber": 2,
      "layout": "content-bullets",
      "htmlContent": "<!DOCTYPE html>..."
    }
  ]
}

## نکات مهم:
1. همه متون باید فارسی باشند
2. همه اسلایدها باید RTL باشند
3. از رنگ‌های تم استفاده کنید
4. محتوا باید مرتبط با موضوع "${topic}" باشد
5. دقیقاً ${numSlides} اسلاید بسازید
6. HTML باید valid و کامل باشد
7. از فونت Arial استفاده کنید
8. خروجی فقط JSON باشد، بدون markdown

حالا لطفاً ارائه را تولید کنید و فقط JSON خالص برگردانید.
`.trim();
}
