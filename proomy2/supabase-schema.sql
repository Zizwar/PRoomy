-- Proomy2 AI Chat System - Supabase Database Schema
-- Advanced AI Chat Rooms with Multi-Model Agent System
-- This schema supports real-time messaging, user management, AI models, and more

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create custom types
CREATE TYPE user_provider AS ENUM ('google', 'github', 'discord', 'anonymous');
CREATE TYPE user_theme AS ENUM ('light', 'dark');
CREATE TYPE user_language AS ENUM ('ar', 'en', 'fr');
CREATE TYPE room_status AS ENUM ('active', 'paused', 'archived');
CREATE TYPE content_type AS ENUM ('text', 'image', 'file', 'system');
CREATE TYPE ai_provider AS ENUM ('openrouter', 'openai', 'anthropic', 'google');

-- Users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    avatar_url TEXT,
    display_name VARCHAR(100),
    bio TEXT,
    provider user_provider NOT NULL DEFAULT 'anonymous',
    total_messages INTEGER DEFAULT 0,
    total_tokens_used INTEGER DEFAULT 0,
    credits_remaining INTEGER DEFAULT 1000,
    preferred_model VARCHAR(100) DEFAULT 'openai/gpt-3.5-turbo',
    theme user_theme DEFAULT 'light',
    language user_language DEFAULT 'ar',
    is_online BOOLEAN DEFAULT FALSE,
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table for organizing rooms
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(7), -- hex color
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rooms table
CREATE TABLE rooms (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    avatar_url TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    system_prompt TEXT NOT NULL,
    personality_traits JSONB DEFAULT '{}',
    agent_name VARCHAR(100) NOT NULL DEFAULT 'المساعد',
    agent_role VARCHAR(200),
    model_id VARCHAR(100) NOT NULL DEFAULT 'openai/gpt-3.5-turbo',
    temperature DECIMAL(3,2) DEFAULT 0.7 CHECK (temperature >= 0 AND temperature <= 2),
    max_tokens INTEGER DEFAULT 1000 CHECK (max_tokens >= 50 AND max_tokens <= 4000),
    top_p DECIMAL(3,2) DEFAULT 1.0 CHECK (top_p >= 0 AND top_p <= 1),
    frequency_penalty DECIMAL(3,2) DEFAULT 0.0 CHECK (frequency_penalty >= -2 AND frequency_penalty <= 2),
    presence_penalty DECIMAL(3,2) DEFAULT 0.0 CHECK (presence_penalty >= -2 AND presence_penalty <= 2),
    is_public BOOLEAN DEFAULT TRUE,
    max_participants INTEGER DEFAULT 100,
    require_auth BOOLEAN DEFAULT FALSE,
    allow_anonymous BOOLEAN DEFAULT TRUE,
    moderation_enabled BOOLEAN DEFAULT TRUE,
    memory_enabled BOOLEAN DEFAULT TRUE,
    search_enabled BOOLEAN DEFAULT FALSE,
    function_calling_enabled BOOLEAN DEFAULT FALSE,
    image_analysis_enabled BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    moderators UUID[] DEFAULT '{}',
    total_messages INTEGER DEFAULT 0,
    total_participants INTEGER DEFAULT 0,
    avg_response_time DECIMAL(8,2),
    satisfaction_rating DECIMAL(3,2) CHECK (satisfaction_rating >= 0 AND satisfaction_rating <= 5),
    status room_status DEFAULT 'active',
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_message_at TIMESTAMP WITH TIME ZONE
);

-- Messages table
CREATE TABLE messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    content_type content_type DEFAULT 'text',
    metadata JSONB DEFAULT '{}',
    is_ai_response BOOLEAN DEFAULT FALSE,
    parent_message_id UUID REFERENCES messages(id) ON DELETE SET NULL,
    model_used VARCHAR(100),
    tokens_used INTEGER,
    processing_time DECIMAL(8,2), -- in seconds
    confidence_score DECIMAL(4,3) CHECK (confidence_score >= 0 AND confidence_score <= 1),
    has_attachments BOOLEAN DEFAULT FALSE,
    is_edited BOOLEAN DEFAULT FALSE,
    edit_history JSONB DEFAULT '[]',
    reactions JSONB DEFAULT '{}',
    reply_count INTEGER DEFAULT 0,
    is_flagged BOOLEAN DEFAULT FALSE,
    flagged_reason TEXT,
    moderation_score DECIMAL(4,3) CHECK (moderation_score >= 0 AND moderation_score <= 1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Models table
CREATE TABLE ai_models (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    display_name VARCHAR(200) NOT NULL,
    provider ai_provider NOT NULL,
    description TEXT,
    max_tokens INTEGER NOT NULL,
    cost_per_1k_tokens DECIMAL(10,6),
    supports_streaming BOOLEAN DEFAULT TRUE,
    supports_function_calling BOOLEAN DEFAULT FALSE,
    context_window INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversation Sessions table for analytics
CREATE TABLE conversation_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200),
    message_count INTEGER DEFAULT 0,
    token_count INTEGER DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    summary TEXT,
    key_topics TEXT[],
    sentiment_score DECIMAL(4,3) CHECK (sentiment_score >= -1 AND sentiment_score <= 1)
);

-- User API Keys table for custom model access
CREATE TABLE user_api_keys (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider ai_provider NOT NULL,
    key_name VARCHAR(100),
    encrypted_key TEXT NOT NULL, -- Store encrypted API keys
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, provider, key_name)
);

-- Room Participants table (for tracking active users in rooms)
CREATE TABLE room_participants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_typing BOOLEAN DEFAULT FALSE,
    message_count INTEGER DEFAULT 0,
    UNIQUE(room_id, user_id)
);

-- Message Attachments table
CREATE TABLE message_attachments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_size INTEGER NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Message Reactions table
CREATE TABLE message_reactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    emoji VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(message_id, user_id, emoji)
);

-- Create indexes for better performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_provider ON users(provider);
CREATE INDEX idx_users_last_seen ON users(last_seen);

CREATE INDEX idx_rooms_slug ON rooms(slug);
CREATE INDEX idx_rooms_category ON rooms(category_id);
CREATE INDEX idx_rooms_status ON rooms(status);
CREATE INDEX idx_rooms_is_public ON rooms(is_public);
CREATE INDEX idx_rooms_is_featured ON rooms(is_featured);
CREATE INDEX idx_rooms_created_by ON rooms(created_by);
CREATE INDEX idx_rooms_last_message ON rooms(last_message_at);

CREATE INDEX idx_messages_room_id ON messages(room_id);
CREATE INDEX idx_messages_user_id ON messages(user_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_messages_is_ai ON messages(is_ai_response);
CREATE INDEX idx_messages_parent ON messages(parent_message_id);

CREATE INDEX idx_sessions_room_user ON conversation_sessions(room_id, user_id);
CREATE INDEX idx_sessions_started ON conversation_sessions(started_at);

CREATE INDEX idx_participants_room ON room_participants(room_id);
CREATE INDEX idx_participants_user ON room_participants(user_id);
CREATE INDEX idx_participants_typing ON room_participants(is_typing) WHERE is_typing = TRUE;

-- Enable RLS (Row Level Security) for better security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_participants ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- RLS Policies for rooms table
CREATE POLICY "Public rooms are viewable by everyone" ON rooms
    FOR SELECT USING (is_public = true OR created_by::text = auth.uid()::text);

CREATE POLICY "Room creators can update their rooms" ON rooms
    FOR UPDATE USING (created_by::text = auth.uid()::text);

CREATE POLICY "Authenticated users can create rooms" ON rooms
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for messages table
CREATE POLICY "Messages in public rooms are viewable by everyone" ON messages
    FOR SELECT USING (
        EXISTS(
            SELECT 1 FROM rooms 
            WHERE rooms.id = messages.room_id 
            AND (rooms.is_public = true OR rooms.created_by::text = auth.uid()::text)
        )
    );

CREATE POLICY "Authenticated users can insert messages" ON messages
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for user_api_keys table
CREATE POLICY "Users can only access their own API keys" ON user_api_keys
    FOR ALL USING (user_id::text = auth.uid()::text);

-- Create functions and triggers for automatic updates

-- Function to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update room stats when messages are added
CREATE OR REPLACE FUNCTION update_room_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE rooms 
        SET 
            total_messages = total_messages + 1,
            last_message_at = NEW.created_at
        WHERE id = NEW.room_id;
        
        UPDATE users 
        SET total_messages = total_messages + 1
        WHERE id = NEW.user_id;
        
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Trigger to update room stats
CREATE TRIGGER update_room_stats_trigger
    AFTER INSERT ON messages
    FOR EACH ROW EXECUTE FUNCTION update_room_stats();

-- Function to generate room slug from name
CREATE OR REPLACE FUNCTION generate_room_slug()
RETURNS TRIGGER AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER := 0;
BEGIN
    -- Generate base slug from name
    base_slug := lower(regexp_replace(NEW.name, '[^a-zA-Z0-9\u0600-\u06FF\u0750-\u077F]+', '-', 'g'));
    base_slug := trim(both '-' from base_slug);
    
    final_slug := base_slug;
    
    -- Check for uniqueness and add counter if needed
    WHILE EXISTS(SELECT 1 FROM rooms WHERE slug = final_slug AND id != COALESCE(NEW.id, uuid_generate_v4())) LOOP
        counter := counter + 1;
        final_slug := base_slug || '-' || counter;
    END LOOP;
    
    NEW.slug := final_slug;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to generate room slug
CREATE TRIGGER generate_room_slug_trigger
    BEFORE INSERT OR UPDATE OF name ON rooms
    FOR EACH ROW EXECUTE FUNCTION generate_room_slug();

-- Insert default categories
INSERT INTO categories (name, slug, description, icon, color) VALUES
('برمجة وتطوير', 'programming', 'غرف متخصصة في البرمجة وتطوير البرمجيات', '💻', '#3B82F6'),
('تعليم وتدريب', 'education', 'غرف تعليمية ومساعدة في الدراسة', '📚', '#10B981'),
('كتابة وإبداع', 'writing', 'غرف للكتابة الإبداعية والتحرير', '✍️', '#8B5CF6'),
('أعمال وتسويق', 'business', 'غرف للاستشارات التجارية والتسويقية', '💼', '#F59E0B'),
('صحة ولياقة', 'health', 'غرف للنصائح الصحية واللياقة البدنية', '🏥', '#EF4444'),
('ترفيه وألعاب', 'entertainment', 'غرف للترفيه والدردشة العامة', '🎮', '#EC4899'),
('تقنية عامة', 'technology', 'مناقشات تقنية عامة وأخبار التكنولوجيا', '⚙️', '#6B7280');

-- Insert default AI models
INSERT INTO ai_models (id, name, display_name, provider, description, max_tokens, cost_per_1k_tokens, supports_streaming, supports_function_calling, context_window) VALUES
('openai/gpt-4o', 'gpt-4o', 'GPT-4o (OpenAI)', 'openrouter', 'أحدث نموذج من OpenAI مع قدرات متقدمة', 4096, 0.005, TRUE, TRUE, 128000),
('openai/gpt-4o-mini', 'gpt-4o-mini', 'GPT-4o Mini (OpenAI)', 'openrouter', 'نسخة مصغرة وسريعة من GPT-4o', 4096, 0.0015, TRUE, TRUE, 128000),
('openai/gpt-3.5-turbo', 'gpt-3.5-turbo', 'GPT-3.5 Turbo (OpenAI)', 'openrouter', 'نموذج سريع ومتوازن للاستخدام العام', 4096, 0.0005, TRUE, TRUE, 16385),
('anthropic/claude-3-haiku', 'claude-3-haiku', 'Claude 3 Haiku (Anthropic)', 'openrouter', 'نموذج سريع وذكي من Anthropic', 4096, 0.00025, TRUE, FALSE, 200000),
('anthropic/claude-3-sonnet', 'claude-3-sonnet', 'Claude 3 Sonnet (Anthropic)', 'openrouter', 'نموذج متوازن بين السرعة والذكاء', 4096, 0.003, TRUE, FALSE, 200000),
('google/gemini-pro', 'gemini-pro', 'Gemini Pro (Google)', 'openrouter', 'نموذج جوجل المتقدم للذكاء الاصطناعي', 4096, 0.000125, TRUE, TRUE, 32768);

-- Insert sample test room
INSERT INTO rooms (
    name, 
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
    category_id
) VALUES (
    'مساعد البرمجة العربي',
    'مساعد ذكي متخصص في البرمجة باللغة العربية',
    'أنت مطور برمجيات خبير تتحدث العربية بطلاقة. مهمتك مساعدة المستخدمين في:
1. كتابة وتطوير البرمجيات بلغات مختلفة
2. حل المشاكل التقنية والأخطاء
3. مراجعة الكود وتحسينه
4. تقديم أفضل الممارسات في البرمجة
5. شرح المفاهيم التقنية بطريقة واضحة

أجب دائماً باللغة العربية مع تقديم أمثلة عملية بالكود عند الحاجة. كن صبوراً ومفصلاً في شروحاتك.',
    'مطور عربي',
    'مطور برمجيات خبير',
    'openai/gpt-3.5-turbo',
    0.7,
    2000,
    TRUE,
    TRUE,
    TRUE,
    (SELECT id FROM categories WHERE slug = 'programming' LIMIT 1)
);

-- Create a test user for demo purposes
INSERT INTO users (username, email, display_name, provider, credits_remaining) VALUES
('demo_user', 'demo@proomy.dev', 'مستخدم تجريبي', 'anonymous', 5000);

-- Create sample messages for the demo room
INSERT INTO messages (room_id, user_id, content, is_ai_response, model_used) VALUES
((SELECT id FROM rooms WHERE name = 'مساعد البرمجة العربي' LIMIT 1), 
 (SELECT id FROM users WHERE username = 'demo_user' LIMIT 1), 
 'مرحباً! أريد تعلم البرمجة، من أين أبدأ؟', 
 FALSE, NULL),

((SELECT id FROM rooms WHERE name = 'مساعد البرمجة العربي' LIMIT 1), 
 NULL, 
 'مرحباً بك! يسعدني مساعدتك في رحلة تعلم البرمجة. إليك خطة مقترحة للمبتدئين:

**1. اختيار لغة البرمجة الأولى:**
- **Python**: سهلة التعلم ومتعددة الاستخدامات
- **JavaScript**: للتطوير على الويب
- **Java**: للتطبيقات المؤسسية

**2. المفاهيم الأساسية:**
- المتغيرات والبيانات
- الشروط والحلقات
- الوظائف (Functions)
- البنى البيانات

**3. موارد التعلم:**
- مواقع تفاعلية مثل Codecademy
- كتب البرمجة للمبتدئين
- مشاريع عملية صغيرة

أي لغة تفضل أن نبدأ بها؟', 
 TRUE, 'openai/gpt-3.5-turbo');

-- Enable real-time subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE room_participants;
ALTER PUBLICATION supabase_realtime ADD TABLE message_reactions;

-- Create a function for anonymous authentication
CREATE OR REPLACE FUNCTION create_anonymous_user(username_param TEXT)
RETURNS TABLE(user_id UUID, access_token TEXT) AS $$
DECLARE
    new_user_id UUID;
    token TEXT;
BEGIN
    -- Check if username already exists
    IF EXISTS(SELECT 1 FROM users WHERE username = username_param) THEN
        RAISE EXCEPTION 'Username already exists';
    END IF;
    
    -- Create new anonymous user
    INSERT INTO users (username, provider, display_name) 
    VALUES (username_param, 'anonymous', username_param)
    RETURNING id INTO new_user_id;
    
    -- Generate a simple token (in production, use proper JWT)
    token := encode(gen_random_bytes(32), 'base64');
    
    RETURN QUERY SELECT new_user_id, token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get room with messages
CREATE OR REPLACE FUNCTION get_room_with_messages(room_id_param UUID, page_param INTEGER DEFAULT 1, limit_param INTEGER DEFAULT 50)
RETURNS JSON AS $$
DECLARE
    room_data JSON;
    messages_data JSON;
    offset_param INTEGER;
BEGIN
    offset_param := (page_param - 1) * limit_param;
    
    -- Get room data
    SELECT json_build_object(
        'id', r.id,
        'name', r.name,
        'description', r.description,
        'agent_name', r.agent_name,
        'agent_role', r.agent_role,
        'total_messages', r.total_messages,
        'total_participants', r.total_participants,
        'is_public', r.is_public,
        'allow_anonymous', r.allow_anonymous
    ) INTO room_data
    FROM rooms r 
    WHERE r.id = room_id_param;
    
    -- Get messages with user info
    SELECT json_agg(
        json_build_object(
            'id', m.id,
            'content', m.content,
            'is_ai_response', m.is_ai_response,
            'model_used', m.model_used,
            'tokens_used', m.tokens_used,
            'created_at', m.created_at,
            'user', CASE 
                WHEN m.user_id IS NOT NULL THEN 
                    json_build_object(
                        'id', u.id,
                        'username', u.username,
                        'display_name', u.display_name,
                        'avatar_url', u.avatar_url
                    )
                ELSE NULL
            END
        ) ORDER BY m.created_at ASC
    ) INTO messages_data
    FROM messages m
    LEFT JOIN users u ON m.user_id = u.id
    WHERE m.room_id = room_id_param
    ORDER BY m.created_at DESC
    LIMIT limit_param OFFSET offset_param;
    
    RETURN json_build_object(
        'room', room_data,
        'messages', COALESCE(messages_data, '[]'::json)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;