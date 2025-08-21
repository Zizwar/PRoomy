-- Demo data for Proomy2 - Test accounts and rooms
-- Run this after the main schema to populate with demo data

-- Insert demo test user
INSERT INTO users (id, username, email, display_name, provider, credits_remaining, theme, language) 
VALUES (
    '550e8400-e29b-41d4-a716-446655440001', 
    'test_user', 
    'test@proomy.dev', 
    'المستخدم التجريبي', 
    'anonymous', 
    5000, 
    'light', 
    'ar'
) ON CONFLICT (username) DO UPDATE SET
    credits_remaining = 5000,
    updated_at = NOW();

-- Insert a registered demo user
INSERT INTO users (id, username, email, display_name, provider, credits_remaining, theme, language) 
VALUES (
    '550e8400-e29b-41d4-a716-446655440002', 
    'registered_user', 
    'registered@proomy.dev', 
    'عضو مسجل تجريبي', 
    'anonymous', 
    10000, 
    'dark', 
    'ar'
) ON CONFLICT (username) DO UPDATE SET
    credits_remaining = 10000,
    updated_at = NOW();

-- Insert additional demo rooms with different specialties
INSERT INTO rooms (
    id,
    name, 
    slug,
    description, 
    system_prompt, 
    agent_name, 
    agent_role, 
    model_id,
    temperature,
    max_tokens,
    is_public,
    allow_anonymous,
    memory_enabled,
    category_id,
    created_by
) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440011',
    'مساعد التصميم الإبداعي',
    'creative-design-assistant',
    'مساعد متخصص في التصميم الجرافيكي والإبداع البصري',
    'أنت مصمم جرافيك محترف ومبدع. تساعد المستخدمين في:
1. تطوير الهوية البصرية للعلامات التجارية
2. اختيار الألوان والخطوط المناسبة  
3. تصميم المطبوعات والمواد التسويقية
4. تقديم النصائح حول أفضل الممارسات في التصميم
5. شرح مبادئ التصميم والتكوين

أجب دائماً باللغة العربية مع تقديم اقتراحات عملية وإبداعية.',
    'مصمم إبداعي',
    'مصمم جرافيك محترف',
    'openai/gpt-4o-mini',
    0.8,
    1500,
    TRUE,
    TRUE,
    TRUE,
    (SELECT id FROM categories WHERE slug = 'writing' LIMIT 1),
    '550e8400-e29b-41d4-a716-446655440001'
),
(
    '550e8400-e29b-41d4-a716-446655440012',
    'مدرب اللياقة الشخصي',
    'fitness-trainer',
    'مدرب لياقة بدنية متخصص في التغذية والتمارين',
    'أنت مدرب لياقة بدنية معتمد وخبير في التغذية الصحية. تساعد المستخدمين في:
1. وضع خطط تمارين مخصصة حسب أهدافهم
2. تقديم نصائح غذائية صحية ومتوازنة
3. متابعة التقدم وتشجيع الاستمرارية
4. شرح أساليب التمرين الآمنة والفعالة
5. الإجابة على الأسئلة الصحية العامة

أجب دائماً باللغة العربية مع التركيز على السلامة والنتائج المستدامة.',
    'كوتش فتنس',
    'مدرب لياقة بدنية معتمد',
    'openai/gpt-3.5-turbo',
    0.6,
    1200,
    TRUE,
    TRUE,
    TRUE,
    (SELECT id FROM categories WHERE slug = 'health' LIMIT 1),
    '550e8400-e29b-41d4-a716-446655440002'
),
(
    '550e8400-e29b-41d4-a716-446655440013',
    'مستشار الأعمال الذكي',
    'business-advisor',
    'مستشار أعمال متخصص في ريادة الأعمال والاستراتيجية',
    'أنت مستشار أعمال خبير في ريادة الأعمال والتخطيط الاستراتيجي. تساعد المستخدمين في:
1. تطوير خطط الأعمال والدراسات التسويقية
2. تحليل السوق وتحديد الفرص الاستثمارية
3. استراتيجيات التسويق الرقمي والنمو
4. إدارة الموارد البشرية والعمليات
5. حل التحديات التجارية والمالية

أجب دائماً باللغة العربية مع تقديم حلول عملية وقابلة للتطبيق.',
    'استشاري أعمال',
    'خبير ريادة الأعمال والاستراتيجية',
    'anthropic/claude-3-sonnet',
    0.7,
    2000,
    TRUE,
    FALSE, -- يتطلب تسجيل دخول
    TRUE,
    (SELECT id FROM categories WHERE slug = 'business' LIMIT 1),
    '550e8400-e29b-41d4-a716-446655440002'
);

-- Insert some sample messages for each demo room
INSERT INTO messages (room_id, user_id, content, is_ai_response, model_used, tokens_used) VALUES 
-- Messages for Creative Design Assistant
(
    '550e8400-e29b-41d4-a716-446655440011',
    '550e8400-e29b-41d4-a716-446655440001', 
    'مرحباً! أريد تصميم شعار لمشروع تقني ناشئ. ما هي النصائح الأساسية؟', 
    FALSE, 
    NULL,
    NULL
),
(
    '550e8400-e29b-41d4-a716-446655440011',
    NULL, 
    'مرحباً بك! تصميم شعار لمشروع تقني يحتاج لعدة اعتبارات مهمة:

**🎯 المبادئ الأساسية:**
1. **البساطة**: تجنب التعقيد الزائد
2. **القابلية للتذكر**: يجب أن يكون مميزاً وسهل التذكر
3. **المرونة**: يعمل في جميع الأحجام والخلفيات

**🎨 نصائح التصميم:**
- استخدم ألوان تعكس طبيعة المشروع التقني (أزرق، رمادي، أخضر)
- اختر خطوط عصرية وواضحة
- تجنب الألوان المبهرجة أو المعقدة

**💡 خطوات العمل:**
1. ادرس المنافسين
2. اختر 2-3 مفاهيم مختلفة
3. اختبر الشعار على خلفيات مختلفة
4. اطلب آراء المستخدمين المحتملين

هل لديك اسم المشروع أو مجال عمله المحدد؟', 
    TRUE, 
    'openai/gpt-4o-mini',
    245
),

-- Messages for Fitness Trainer
(
    '550e8400-e29b-41d4-a716-446655440012',
    '550e8400-e29b-41d4-a716-446655440001', 
    'أريد برنامج تمارين للمبتدئين، عمري 25 سنة ووزني 70 كيلو', 
    FALSE, 
    NULL,
    NULL
),
(
    '550e8400-e29b-41d4-a716-446655440012',
    NULL, 
    'ممتاز! هذا وقت مثالي للبدء في رحلة اللياقة البدنية. إليك برنامج للمبتدئين:

**📋 برنامج 3 أيام أسبوعياً:**

**اليوم الأول - الجزء العلوي:**
- تمارين الضغط: 3 مجموعات × 8-12 تكرار
- عقلة مساعدة: 3 × 5-8 تكرار
- تمارين الكتف بالدامبل: 3 × 10 تكرار

**اليوم الثاني - الجزء السفلي:**
- سكوات بوزن الجسم: 3 × 12-15 تكرار
- لانجز: 3 × 10 لكل رجل
- رفع السمانة: 3 × 15 تكرار

**اليوم الثالث - تمارين شاملة:**
- بربي: 3 × 5-8 تكرار
- تمرين البلانك: 3 × 30 ثانية
- مشي سريع: 20-30 دقيقة

**⚠️ نصائح مهمة:**
- ابدأ بأوزان خفيفة
- ركز على الأداء الصحيح
- خذ راحة يوم بين التمارين

هل تحتاج تفاصيل أكثر حول أي تمرين؟', 
    TRUE, 
    'openai/gpt-3.5-turbo',
    189
),

-- Messages for Business Advisor
(
    '550e8400-e29b-41d4-a716-446655440013',
    '550e8400-e29b-41d4-a716-446655440002', 
    'لدي فكرة تطبيق توصيل طعام، كيف أبدأ دراسة الجدوى؟', 
    FALSE, 
    NULL,
    NULL
),
(
    '550e8400-e29b-41d4-a716-446655440013',
    NULL, 
    'فكرة ممتازة! سوق توصيل الطعام نشط جداً. إليك خطة شاملة لدراسة الجدوى:

**📊 1. دراسة السوق:**
- حجم السوق في منطقتك
- تحليل المنافسين (طلبات، هنقرستيشن، كريم ناو)
- احتياجات العملاء غير المُلباة

**💰 2. النموذج المالي:**
- مصادر الدخل: عمولة المطاعم، رسوم التوصيل، إعلانات
- التكاليف: تطوير التطبيق، التسويق، فريق العمل
- نقطة التعادل والربحية

**🎯 3. استراتيجية التميز:**
- ما الذي سيميزك عن المنافسين؟
- توصيل أسرع؟ مطاعم فريدة؟ أسعار أفضل؟

**⚡ 4. متطلبات التنفيذ:**
- فريق التطوير (40-80 ألف ريال)
- رأس مال تشغيلي (100-200 ألف ريال)
- تراخيص وشراكات مع المطاعم

**📈 5. خطة النمو:**
- ابدأ بمنطقة جغرافية محددة
- اختبر وطور المنتج
- توسع تدريجياً

هل تريد التعمق في أي من هذه النقاط؟', 
    TRUE, 
    'anthropic/claude-3-sonnet',
    298
);

-- Update room stats based on the messages
UPDATE rooms SET 
    total_messages = (SELECT COUNT(*) FROM messages WHERE room_id = rooms.id),
    last_message_at = (SELECT MAX(created_at) FROM messages WHERE room_id = rooms.id)
WHERE id IN ('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440013');

-- Update user stats
UPDATE users SET 
    total_messages = (SELECT COUNT(*) FROM messages WHERE user_id = users.id AND is_ai_response = FALSE)
WHERE id IN ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002');

-- Create a simple demo login info for easy testing
INSERT INTO users (id, username, email, display_name, provider, credits_remaining, bio) 
VALUES (
    '550e8400-e29b-41d4-a716-446655440099', 
    'demo', 
    'demo@test.com', 
    'حساب تجريبي سريع', 
    'anonymous', 
    1000,
    'حساب للاختبار السريع - اسم المستخدم: demo'
) ON CONFLICT (username) DO UPDATE SET
    credits_remaining = 1000,
    bio = 'حساب للاختبار السريع - اسم المستخدم: demo',
    updated_at = NOW();

-- Insert a simple welcome room for quick testing
INSERT INTO rooms (
    id,
    name, 
    slug,
    description, 
    system_prompt, 
    agent_name, 
    agent_role, 
    model_id,
    temperature,
    max_tokens,
    is_public,
    allow_anonymous,
    memory_enabled,
    is_featured,
    created_by
) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440050',
    'غرفة الترحيب - مساعد عام',
    'welcome-room',
    'مساعد ذكي عام للاختبار والتجريب السريع',
    'أنت مساعد ذكي ودود باللغة العربية. ترحب بالمستخدمين الجدد وتساعدهم في اختبار النظام. 
أجب بطريقة بسيطة وواضحة. اشرح كيف يعمل النظام واعطِ أمثلة على أنواع الأسئلة التي يمكن طرحها.
كن مفيداً ومشجعاً ومرحباً بالأسئلة من أي نوع.',
    'المرشد الرقمي',
    'مساعد ذكي عام',
    'openai/gpt-3.5-turbo',
    0.7,
    1000,
    TRUE,
    TRUE,
    TRUE,
    TRUE, -- Featured room
    '550e8400-e29b-41d4-a716-446655440001'
) ON CONFLICT (id) DO UPDATE SET
    is_featured = TRUE,
    updated_at = NOW();

-- Add a welcome message to the welcome room
INSERT INTO messages (room_id, user_id, content, is_ai_response, model_used, tokens_used) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440050',
    NULL, 
    '🤗 مرحباً بك في Proomy2!

أنا المرشد الرقمي، مساعدك الذكي هنا. هذا النظام يتيح لك:

✨ **المميزات الرئيسية:**
- الدردشة مع مساعدين ذكيين متخصصين
- إنشاء غرف مخصصة حسب احتياجاتك  
- استخدام نماذج ذكاء اصطناعي متنوعة
- الحصول على إجابات دقيقة ومفيدة

🚀 **كيف تبدأ:**
1. اختر غرفة من القائمة أو أنشئ غرفة جديدة
2. اكتب سؤالك أو طلبك
3. احصل على إجابة ذكية ومفصلة

💡 **أمثلة على الأسئلة:**
- "ساعدني في كتابة CV محترف"
- "كيف أتعلم Python؟"
- "أريد خطة تسويق لمشروعي"
- "اعطني وصفة طعام صحية"

جرب أي سؤال تريده! أنا هنا لمساعدتك 😊', 
    TRUE, 
    'openai/gpt-3.5-turbo',
    156
);