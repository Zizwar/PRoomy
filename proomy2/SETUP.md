# 🚀 Proomy2 - إعداد سريع للاختبار

## 📋 ملفات الإعداد المطلوبة

### 1. قاعدة البيانات Supabase

```bash
# نفذ الملفات بالترتيب في Supabase SQL Editor:
1. supabase-schema.sql  # البنية الأساسية
2. demo-data.sql        # البيانات التجريبية
```

### 2. متغيرات البيئة (.env)

```env
# Database
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Authentication
JWT_SECRET=your-secret-key-here

# OpenRouter AI
OPENROUTER_API_KEY=your_openrouter_key

# Server
PORT=3000
NODE_ENV=development
```

### 3. تشغيل التطبيق

```bash
# تثبيت المتطلبات
npm install

# تشغيل التطبيق
npm run dev

# أو
npm start
```

## 🌐 الروابط المهمة

- **API الأساسي**: `http://localhost:3000`
- **صفحة التجريب**: `http://localhost:3000/demo`
- **التوثيق**: `http://localhost:3000/docs`

## 🔐 حسابات تجريبية

### حساب سريع للاختبار:
- **Username**: `demo`
- **النوع**: دخول مجهول

### حسابات إضافية:
- **Username**: `test_user` (مجهول)
- **Username**: `registered_user` (مسجل)

## 🏠 الغرف التجريبية

1. **غرفة الترحيب**: مساعد عام للاختبار
2. **مساعد البرمجة**: متخصص في التطوير
3. **مساعد التصميم**: تصميم وإبداع
4. **مدرب اللياقة**: صحة ولياقة
5. **مستشار الأعمال**: ريادة الأعمال

## 🧪 اختبار النظام

### Postman Collection:
- استورد `proomy2-postman.json`
- حدد البيئة `Proomy2 Environment`
- اختبر API endpoints

### صفحة الويب:
1. اذهب لـ `/demo`
2. سجل دخول بـ username `demo`
3. جرب الغرف المختلفة
4. اختبر النماذج المتاحة

## 🔧 حل المشاكل الشائعة

### مشكلة قاعدة البيانات:
- تأكد من تنفيذ `supabase-schema.sql` أولاً
- تحقق من متغيرات Supabase في `.env`

### مشكلة OpenRouter:
- تأكد من صحة `OPENROUTER_API_KEY`
- تحقق من الرصيد في حساب OpenRouter

### مشكلة الاتصال:
- تحقق من تشغيل السيرفر على port 3000
- افحص console للأخطاء

## ✅ تحديث مهم - إصلاح UUIDs

تم تحديث ملف `demo-data.sql` لإصلاح خطأ UUID. جميع المعرفات الآن بتنسيق UUID صحيح:
- Users: `550e8400-e29b-41d4-a716-446655440001-099`  
- Rooms: `550e8400-e29b-41d4-a716-446655440011-050`

## 📞 التواصل

للمساعدة أو الاستفسارات:
- GitHub Issues
- التوثيق الكامل في `/docs`