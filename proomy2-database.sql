-- Proomy2 Database Schema for Supabase
-- Advanced AI Chat Rooms with Multi-Model Agent System

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table with enhanced features
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    avatar_url TEXT,
    display_name TEXT,
    bio TEXT,
    -- Authentication
    access_token TEXT,
    refresh_token TEXT,
    provider TEXT DEFAULT 'google', -- google, github, discord
    -- API Keys (encrypted)
    openrouter_key TEXT, -- User's personal OpenRouter key
    openai_key TEXT,     -- Personal OpenAI key
    anthropic_key TEXT,  -- Personal Anthropic key
    -- Usage tracking
    total_messages INTEGER DEFAULT 0,
    total_tokens_used INTEGER DEFAULT 0,
    credits_remaining INTEGER DEFAULT 1000, -- Free credits
    -- Settings
    preferred_model TEXT DEFAULT 'gpt-3.5-turbo',
    theme TEXT DEFAULT 'light',
    language TEXT DEFAULT 'ar',
    -- Status
    is_online BOOLEAN DEFAULT false,
    last_seen TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- AI Models configuration
CREATE TABLE ai_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL, -- gpt-4, claude-3, gemini-pro
    display_name TEXT NOT NULL,
    provider TEXT NOT NULL, -- openrouter, openai, anthropic
    description TEXT,
    max_tokens INTEGER DEFAULT 4000,
    cost_per_1k_tokens DECIMAL(10,6), -- Cost tracking
    supports_streaming BOOLEAN DEFAULT true,
    supports_function_calling BOOLEAN DEFAULT false,
    context_window INTEGER DEFAULT 8192,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Room categories for organization
CREATE TABLE room_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT, -- emoji or icon name
    color TEXT DEFAULT '#3b82f6',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enhanced Rooms (Agents) table
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL, -- URL-friendly name
    description TEXT,
    avatar_url TEXT,
    category_id UUID REFERENCES room_categories(id),
    
    -- Agent Configuration
    system_prompt TEXT NOT NULL,
    personality_traits JSONB, -- {"friendly": 0.8, "professional": 0.6}
    agent_name TEXT DEFAULT 'Assistant',
    agent_role TEXT, -- "Software Engineer", "Teacher", "Therapist"
    
    -- AI Model Settings
    model_id UUID REFERENCES ai_models(id),
    temperature DECIMAL(3,2) DEFAULT 0.7,
    max_tokens INTEGER DEFAULT 1000,
    top_p DECIMAL(3,2) DEFAULT 1.0,
    frequency_penalty DECIMAL(3,2) DEFAULT 0.0,
    presence_penalty DECIMAL(3,2) DEFAULT 0.0,
    
    -- Room Settings
    is_public BOOLEAN DEFAULT true,
    max_participants INTEGER DEFAULT 50,
    require_auth BOOLEAN DEFAULT false,
    allow_anonymous BOOLEAN DEFAULT true,
    moderation_enabled BOOLEAN DEFAULT true,
    
    -- Advanced Features
    memory_enabled BOOLEAN DEFAULT true, -- Remember past conversations
    search_enabled BOOLEAN DEFAULT false, -- Vector search capability
    function_calling_enabled BOOLEAN DEFAULT false,
    image_analysis_enabled BOOLEAN DEFAULT false,
    
    -- Creator and Management
    created_by UUID REFERENCES users(id),
    moderators UUID[] DEFAULT '{}', -- Array of user IDs
    
    -- Analytics
    total_messages INTEGER DEFAULT 0,
    total_participants INTEGER DEFAULT 0,
    avg_response_time DECIMAL(10,2), -- in seconds
    satisfaction_rating DECIMAL(3,2), -- 1-5 stars
    
    -- Status
    status TEXT DEFAULT 'active', -- active, paused, archived
    is_featured BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_message_at TIMESTAMP
);

-- Enhanced Messages table with AI features
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    
    -- Message Content
    content TEXT NOT NULL,
    content_type TEXT DEFAULT 'text', -- text, image, file, system
    metadata JSONB, -- {"tokens": 150, "model": "gpt-4", "processing_time": 1.2}
    
    -- AI Response Data (for AI messages)
    is_ai_response BOOLEAN DEFAULT false,
    parent_message_id UUID REFERENCES messages(id), -- Reference to user message
    model_used TEXT,
    tokens_used INTEGER,
    processing_time DECIMAL(10,3), -- seconds
    confidence_score DECIMAL(3,2), -- AI confidence 0-1
    
    -- Message Features
    has_attachments BOOLEAN DEFAULT false,
    is_edited BOOLEAN DEFAULT false,
    edit_history JSONB,
    
    -- Reactions and Engagement
    reactions JSONB DEFAULT '{}', -- {"👍": ["user1", "user2"], "❤️": ["user3"]}
    reply_count INTEGER DEFAULT 0,
    
    -- Moderation
    is_flagged BOOLEAN DEFAULT false,
    flagged_reason TEXT,
    moderation_score DECIMAL(3,2), -- Toxicity score 0-1
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Conversation Sessions for better context management
CREATE TABLE conversation_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    title TEXT, -- Auto-generated summary
    message_count INTEGER DEFAULT 0,
    token_count INTEGER DEFAULT 0,
    started_at TIMESTAMP DEFAULT NOW(),
    ended_at TIMESTAMP,
    summary TEXT, -- AI-generated summary
    key_topics TEXT[], -- Extracted topics
    sentiment_score DECIMAL(3,2) -- Overall sentiment
);

-- User API Keys management (encrypted)
CREATE TABLE user_api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL, -- openrouter, openai, anthropic
    key_name TEXT, -- User-friendly name
    encrypted_key TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    usage_count INTEGER DEFAULT 0,
    last_used TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Usage Analytics
CREATE TABLE usage_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    room_id UUID REFERENCES rooms(id),
    model_used TEXT,
    tokens_used INTEGER,
    cost DECIMAL(10,6),
    response_time DECIMAL(10,3),
    user_satisfaction INTEGER, -- 1-5 rating
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Room participants tracking
CREATE TABLE room_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT NOW(),
    last_active TIMESTAMP DEFAULT NOW(),
    message_count INTEGER DEFAULT 0,
    role TEXT DEFAULT 'member', -- member, moderator, admin
    is_banned BOOLEAN DEFAULT false,
    UNIQUE(room_id, user_id)
);

-- Vector embeddings for search (if needed)
CREATE TABLE message_embeddings (
    message_id UUID PRIMARY KEY REFERENCES messages(id) ON DELETE CASCADE,
    embedding VECTOR(1536), -- OpenAI embedding dimension
    created_at TIMESTAMP DEFAULT NOW()
);

-- Real-time typing indicators
CREATE TABLE typing_indicators (
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    started_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (room_id, user_id)
);

-- Indexes for performance
CREATE INDEX idx_messages_room_created AT ON messages(room_id, created_at DESC);
CREATE INDEX idx_messages_user_id ON messages(user_id);
CREATE INDEX idx_rooms_category ON rooms(category_id);
CREATE INDEX idx_rooms_status ON rooms(status) WHERE status = 'active';
CREATE INDEX idx_usage_analytics_date ON usage_analytics(date DESC);
CREATE INDEX idx_room_participants_room ON room_participants(room_id);

-- Views for common queries
CREATE OR REPLACE VIEW room_stats AS
SELECT 
    r.id,
    r.name,
    r.description,
    r.category_id,
    r.status,
    r.total_messages,
    r.total_participants,
    r.last_message_at,
    c.name as category_name,
    u.username as creator_username,
    COUNT(DISTINCT rp.user_id) as active_participants
FROM rooms r
LEFT JOIN room_categories c ON r.category_id = c.id
LEFT JOIN users u ON r.created_by = u.id
LEFT JOIN room_participants rp ON r.id = rp.room_id
WHERE r.status = 'active'
GROUP BY r.id, c.name, u.username;

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_participants ENABLE ROW LEVEL SECURITY;

-- RLS Policies (basic examples)
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Public rooms are viewable" ON rooms FOR SELECT USING (is_public = true);
CREATE POLICY "Room messages are viewable by participants" ON messages FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM room_participants rp 
        WHERE rp.room_id = messages.room_id 
        AND rp.user_id = auth.uid()
    )
);

-- Realtime subscriptions for Supabase
-- Enable realtime for tables that need live updates
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE typing_indicators;
ALTER PUBLICATION supabase_realtime ADD TABLE room_participants;

-- Insert default data
INSERT INTO room_categories (name, description, icon) VALUES
('عام', 'محادثات عامة ومتنوعة', '💬'),
('تقني', 'مساعدة تقنية وبرمجة', '💻'),
('تعليمي', 'تعلم وتدريس', '📚'),
('إبداعي', 'كتابة وفن وتصميم', '🎨'),
('صحة', 'نصائح صحية ولياقة', '🏥');

INSERT INTO ai_models (name, display_name, provider, description, max_tokens, context_window) VALUES
('gpt-4-turbo', 'GPT-4 Turbo', 'openrouter', 'أقوى نموذج من OpenAI', 4000, 128000),
('gpt-3.5-turbo', 'GPT-3.5 Turbo', 'openrouter', 'نموذج سريع ومتوازن', 2000, 16384),
('claude-3-sonnet', 'Claude 3 Sonnet', 'openrouter', 'نموذج Anthropic المتقدم', 4000, 200000),
('gemini-pro', 'Gemini Pro', 'openrouter', 'نموذج Google المتطور', 3000, 32768),
('deepseek-chat', 'DeepSeek Chat', 'openrouter', 'نموذج صيني قوي ومجاني', 2000, 32768);

-- Functions for automatic updates
CREATE OR REPLACE FUNCTION update_room_last_message()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE rooms 
    SET last_message_at = NEW.created_at,
        total_messages = total_messages + 1
    WHERE id = NEW.room_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_room_last_message
    AFTER INSERT ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_room_last_message();

-- Function to clean old typing indicators
CREATE OR REPLACE FUNCTION cleanup_typing_indicators()
RETURNS void AS $$
BEGIN
    DELETE FROM typing_indicators 
    WHERE started_at < NOW() - INTERVAL '30 seconds';
END;
$$ LANGUAGE plpgsql;