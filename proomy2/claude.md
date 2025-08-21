# 📮 Postman Collection - دليل البداية السريعة

## 📋 ملاحظات على Postman Collection الحالي:

### ✅ نقاط جيدة:
1. التنظيم ممتاز مع مجلدات واضحة
2. Scripts تلقائية لحفظ التوكنز والمعرفات
3. متغيرات البيئة محددة بشكل جيد
4. أوصاف باللغة العربية مفهومة

### 🔧 تحسينات مطلوبة:

#### 1. إصلاح متغيرات النماذج
```json
// في متغيرات البيئة، أضف:
{
  "key": "model_name", 
  "value": "openai/gpt-3.5-turbo",
  "type": "string"
}
```

#### 2. تحديث طلب Test Model
```json
// في body request لـ Test Model:
{
  "prompt": "مرحباً! اختبار سريع للنموذج مع OpenRouter",
  "max_tokens": 100,
  "temperature": 0.7
}
```

#### 3. إضافة headers للـ Real-time
```json
// للطلبات المباشرة:
{
  "key": "Accept",
  "value": "text/event-stream"
}
```

## 🚀 خطوات البداية السريعة:

### الخطوة 1: إعداد البيئة

1. افتح Postman
2. استورد الملف `proomy2-postman.json`
3. اذهب إلى Environment وحدد `Proomy2 Environment`
4. غير `base_url` إلى URL السيرفر الفعلي

### الخطوة 2: البدء بـ API

#### أ) تسجيل الدخول
```javascript
// 1. انقر على "Anonymous Login"
// 2. غير username في body إلى اسمك
// 3. اضغط Send
// 4. سيتم حفظ التوكن تلقائياً
```

#### ب) جلب الغرف المتاحة
```javascript
// 1. انقر على "Get All Rooms"
// 2. اضغط Send
// 3. ستحصل على قائمة الغرف
// 4. سيتم حفظ أول room_id تلقائياً
```

#### ج) إنشاء غرفة جديدة
```javascript
// 1. انقر على "Create Room"
// 2. عدل body حسب حاجتك:
{
  "name": "مساعد البرمجة المتقدم",
  "description": "وكيل ذكي متخصص في البرمجة والتطوير",
  "system_prompt": "أنت مطور خبير في جميع لغات البرمجة. تساعد المستخدمين في كتابة وتطوير البرامج بطريقة واضحة ومفصلة. أجب دائماً باللغة العربية ما لم يُطلب منك غير ذلك.",
  "agent_name": "DevBot Pro",
  "agent_role": "مطور برمجيات متقدم",
  "model_id": "openai/gpt-4-turbo",
  "temperature": 0.7,
  "max_tokens": 2000,
  "is_public": true,
  "memory_enabled": true
}
```

#### د) إرسال رسالة والحصول على رد AI
```javascript
// 1. انقر على "Send Message"
// 2. تأكد من وجود room_id في الـ URL
// 3. عدل محتوى الرسالة:
{
  "content": "مرحباً! أريد تعلم React.js، من أين أبدأ؟",
  "metadata": {
    "client": "postman",
    "test": true
  }
}
// 4. ستحصل على رد المستخدم + رد AI
```

### الخطوة 3: اختبار النماذج

```javascript
// 1. احصل على قائمة النماذج أولاً
GET /models

// 2. اختر model_id من القائمة
// 3. اختبر النموذج
POST /models/{model_id}/test
{
  "prompt": "اكتب قصيدة قصيرة عن البرمجة",
  "max_tokens": 200
}
```

## 📱 إعداد التطبيق الأمامي:

### React/Next.js Example:

```javascript
// src/lib/api.js
const API_BASE = 'http://localhost:3000';

class ProomyAPI {
  constructor() {
    this.token = localStorage.getItem('proomy_token');
  }

  async anonymousLogin(username) {
    const response = await fetch(`${API_BASE}/auth/anonymous`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });
    
    const data = await response.json();
    if (data.token) {
      this.token = data.token;
      localStorage.setItem('proomy_token', data.token);
    }
    return data;
  }

  async getRooms(page = 1) {
    const response = await fetch(`${API_BASE}/rooms?page=${page}`);
    return response.json();
  }

  async sendMessage(roomId, content) {
    const response = await fetch(`${API_BASE}/messages/${roomId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body: JSON.stringify({ content })
    });
    return response.json();
  }

  async getMessages(roomId, page = 1) {
    const response = await fetch(`${API_BASE}/messages/${roomId}?page=${page}`);
    return response.json();
  }
}

export default new ProomyAPI();
```

### React Component Example:

```jsx
// src/components/ChatRoom.jsx
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import api from '../lib/api';

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Supabase للـ Real-time
  const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    loadMessages();
    
    // استمع للرسائل الجديدة
    const subscription = supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `room_id=eq.${roomId}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();

    return () => subscription.unsubscribe();
  }, [roomId]);

  const loadMessages = async () => {
    try {
      const data = await api.getMessages(roomId);
      setMessages(data.messages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setLoading(true);
    try {
      const response = await api.sendMessage(roomId, newMessage);
      setNewMessage('');
      
      // الرسائل ستظهر عبر الـ Real-time subscription
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-room">
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.is_ai_response ? 'ai' : 'user'}`}>
            <div className="content">{msg.content}</div>
            <div className="meta">
              {msg.user?.display_name || msg.user?.username}
              {msg.is_ai_response && ` • ${msg.model_used} • ${msg.tokens_used} tokens`}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={sendMessage} className="message-form">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="اكتب رسالتك..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !newMessage.trim()}>
          {loading ? 'إرسال...' : 'إرسال'}
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
```

## 🔄 Real-time Integration:

### Supabase Real-time Setup:

```javascript
// src/hooks/useRealtime.js
import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export function useRealtime(roomId, onNewMessage) {
  useEffect(() => {
    const supabase = createClient(
      process.env.REACT_APP_SUPABASE_URL,
      process.env.REACT_APP_SUPABASE_ANON_KEY
    );

    const subscription = supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `room_id=eq.${roomId}`
      }, onNewMessage)
      .subscribe();

    return () => subscription.unsubscribe();
  }, [roomId, onNewMessage]);
}
```

## 📊 Environment Variables لـ Frontend:

```env
# React App
REACT_APP_API_BASE_URL=http://localhost:3000
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

# Next.js
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🧪 Testing Checklist:

- [ ] تسجيل دخول مجهول يعمل
- [ ] جلب الغرف يعمل  
- [ ] إنشاء غرفة جديدة يعمل
- [ ] إرسال رسالة والحصول على رد AI يعمل
- [ ] اختبار النماذج المختلفة يعمل
- [ ] Real-time messages تعمل
- [ ] Error handling يعمل بشكل صحيح

## 🚀 Next Steps:

1. طبق الإصلاحات من ملف claude.md
2. اختبر API مع Postman
3. أنشئ واجهة أمامية بسيطة
4. أضف المزيد من المميزات كـ typing indicators
5. حسن UX وأضف animations