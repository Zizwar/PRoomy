# 🤖 Proomy2 - Advanced AI Chat Rooms

> نظام غرف الدردشة الذكية مع الوكلاء المتقدمة والنماذج المتعددة

## ✨ المميزات الجديدة

- **🚀 نظام الوكلاء الذكي**: كل غرفة = وكيل مخصص مع شخصية وذاكرة
- **🔗 OpenRouter Integration**: دعم GPT-4, Claude, Gemini, DeepSeek في مكان واحد
- **🔐 نظام مفاتيح مرن**: مفاتيح شخصية أو نظام احتياطي
- **⚡ Hono.js**: أداء فائق وسرعة استجابة
- **📊 Supabase**: قاعدة بيانات متقدمة مع Realtime
- **📱 Mobile Ready**: API جاهز للتطبيقات المحمولة

## 🏗️ التقنيات المستخدمة

- **Backend**: Hono.js + TypeScript
- **Database**: Supabase (PostgreSQL)
- **AI Provider**: OpenRouter (متعدد النماذج)
- **Auth**: JWT + Anonymous Login
- **Validation**: Zod
- **Deployment**: Vercel/Deno Deploy Ready

## 🚀 التشغيل السريع

### 1. تحضير البيئة

```bash
# استنساخ المشروع
git clone <your-repo-url>
cd proomy2

# تثبيت المكتبات
npm install

# إعداد متغيرات البيئة
cp .env.example .env
# قم بتعديل .env بمعلوماتك
```

### 2. إعداد قاعدة البيانات

```bash
# في Supabase Dashboard، أنشئ مشروع جديد
# ثم نفذ محتويات ملف: proomy2-database.sql
```

### 3. تشغيل الخادم

```bash
# للتطوير
npm run dev

# للإنتاج
npm run build
npm start
```

🎉 الخادم سيعمل على: `http://localhost:3000`

## 📖 استخدام API

### 🔐 المصادقة

```javascript
// تسجيل دخول مجهول
const response = await fetch('/auth/anonymous', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'اسم_المستخدم' })
});

const { token } = await response.json();

// استخدام التوكن في الطلبات
const headers = { 'Authorization': `Bearer ${token}` };
```

### 🏠 الغرف

```javascript
// جلب الغرف
const rooms = await fetch('/rooms').then(r => r.json());

// إنشاء غرفة جديدة
const newRoom = await fetch('/rooms', {
  method: 'POST',
  headers: { ...headers, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'مساعد البرمجة',
    description: 'وكيل متخصص في البرمجة والتقنية',
    system_prompt: 'أنت مطور خبير في جميع لغات البرمجة...',
    agent_name: 'DevBot',
    model_id: 'gpt-4-turbo',
    temperature: 0.7
  })
});
```

### 💬 الرسائل

```javascript
// إرسال رسالة
const message = await fetch(`/messages/${roomId}`, {
  method: 'POST',
  headers: { ...headers, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    content: 'مرحباً! كيف يمكنني برمجة موقع ويب؟'
  })
});

// ستحصل على رد المستخدم + رد الذكي الاصطناعي
const { message: userMsg, ai_response } = await message.json();
```

### 🤖 النماذج

```javascript
// جلب النماذج المتاحة
const models = await fetch('/models').then(r => r.json());

// تجربة نموذج
const test = await fetch(`/models/${modelId}/test`, {
  method: 'POST',
  headers: { ...headers, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'اختبار سريع',
    max_tokens: 100
  })
});
```

## 🔧 التكوين المتقدم

### متغيرات البيئة

```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenRouter (الأساسي)
OPENROUTER_API_KEY=your_openrouter_key

# مفاتيح احتياطية
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

# الأمان
JWT_SECRET=your_32_character_secret_key
ENCRYPTION_KEY=your_32_character_encryption_key

# الخادم
PORT=3000
NODE_ENV=production
```

### إعداد النماذج

يمكنك إضافة نماذج جديدة عبر قاعدة البيانات:

```sql
INSERT INTO ai_models (name, display_name, provider, max_tokens, context_window) VALUES
('claude-3-haiku', 'Claude 3 Haiku', 'openrouter', 2000, 200000),
('llama-3-70b', 'Llama 3 70B', 'openrouter', 3000, 8192);
```

## 📱 التطبيق المحمول

API جاهز للاستخدام مع تطبيقات Flutter/React Native:

```dart
// مثال Flutter
class ProomyAPI {
  static const baseUrl = 'https://your-api-domain.com';
  
  static Future<List<Room>> getRooms() async {
    final response = await http.get('$baseUrl/rooms');
    // ...
  }
}
```

## 🌐 النشر

### Vercel

```bash
# إعداد متغيرات البيئة في Vercel Dashboard
vercel --prod
```

### Deno Deploy

```bash
# أنشئ مشروع في Deno Deploy
# ربط بـ GitHub repository
# سيتم النشر تلقائياً
```

## 🔄 Real-time Updates

استخدم Supabase client للتحديثات المباشرة:

```javascript
// في التطبيق الأمامي
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// الاستماع للرسائل الجديدة
supabase
  .channel(`room:${roomId}`)
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'messages',
    filter: `room_id=eq.${roomId}`
  }, (payload) => {
    console.log('رسالة جديدة:', payload.new);
  })
  .subscribe();
```

## 🛠️ التطوير

### إضافة endpoints جديدة

```typescript
// في src/routes/custom.ts
import { Hono } from 'hono';
const custom = new Hono();

custom.get('/my-endpoint', async (c) => {
  return c.json({ message: 'Hello World' });
});

export default custom;
```

### إضافة middleware

```typescript
// في src/middleware/custom.ts
export const customMiddleware = async (c: Context, next: Next) => {
  // منطق التحقق
  await next();
};
```

## 🧪 الاختبار

```bash
# تشغيل الاختبارات
npm test

# اختبار API مع Postman
# استورد ملف: proomy2-postman.json
```

## 🐛 استكشاف الأخطاء

### مشاكل شائعة

1. **خطأ في الاتصال بـ Supabase**
   ```bash
   # تحقق من متغيرات البيئة
   echo $SUPABASE_URL
   ```

2. **خطأ في OpenRouter**
   ```bash
   # تحقق من صحة المفتاح
   curl -H "Authorization: Bearer $OPENROUTER_API_KEY" https://openrouter.ai/api/v1/models
   ```

3. **خطأ في JWT**
   ```bash
   # تأكد من أن JWT_SECRET طوله 32 حرف على الأقل
   ```

## 🤝 المساهمة

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📄 الرخصة

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 🔗 الروابط المفيدة

- [Hono.js Documentation](https://hono.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [OpenRouter API](https://openrouter.ai/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📞 الدعم

- **GitHub Issues**: للبلاغات والاقتراحات
- **Discussions**: للنقاشات والأسئلة
- **Email**: support@proomy.app

---

صُنع بـ ❤️ للمجتمع العربي التقني