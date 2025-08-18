// Core Types for Proomy2 AI Chat System
import { z } from 'zod';

// Database Models
export interface User {
  id: string;
  username: string;
  email?: string;
  avatar_url?: string;
  display_name?: string;
  bio?: string;
  provider: 'google' | 'github' | 'discord' | 'anonymous';
  total_messages: number;
  total_tokens_used: number;
  credits_remaining: number;
  preferred_model: string;
  theme: 'light' | 'dark';
  language: 'ar' | 'en' | 'fr';
  is_online: boolean;
  last_seen: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Room {
  id: string;
  name: string;
  slug: string;
  description?: string;
  avatar_url?: string;
  category_id?: string;
  system_prompt: string;
  personality_traits?: Record<string, number>;
  agent_name: string;
  agent_role?: string;
  model_id: string;
  temperature: number;
  max_tokens: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  is_public: boolean;
  max_participants: number;
  require_auth: boolean;
  allow_anonymous: boolean;
  moderation_enabled: boolean;
  memory_enabled: boolean;
  search_enabled: boolean;
  function_calling_enabled: boolean;
  image_analysis_enabled: boolean;
  created_by: string;
  moderators: string[];
  total_messages: number;
  total_participants: number;
  avg_response_time?: number;
  satisfaction_rating?: number;
  status: 'active' | 'paused' | 'archived';
  is_featured: boolean;
  created_at: Date;
  updated_at: Date;
  last_message_at?: Date;
}

export interface Message {
  id: string;
  room_id: string;
  user_id?: string;
  content: string;
  content_type: 'text' | 'image' | 'file' | 'system';
  metadata?: Record<string, any>;
  is_ai_response: boolean;
  parent_message_id?: string;
  model_used?: string;
  tokens_used?: number;
  processing_time?: number;
  confidence_score?: number;
  has_attachments: boolean;
  is_edited: boolean;
  edit_history?: any;
  reactions: Record<string, string[]>;
  reply_count: number;
  is_flagged: boolean;
  flagged_reason?: string;
  moderation_score?: number;
  created_at: Date;
  updated_at: Date;
}

export interface AIModel {
  id: string;
  name: string;
  display_name: string;
  provider: 'openrouter' | 'openai' | 'anthropic' | 'google';
  description?: string;
  max_tokens: number;
  cost_per_1k_tokens?: number;
  supports_streaming: boolean;
  supports_function_calling: boolean;
  context_window: number;
  is_active: boolean;
}

export interface ConversationSession {
  id: string;
  room_id: string;
  user_id: string;
  title?: string;
  message_count: number;
  token_count: number;
  started_at: Date;
  ended_at?: Date;
  summary?: string;
  key_topics?: string[];
  sentiment_score?: number;
}

// API Request/Response Types

// Auth
export const LoginRequestSchema = z.object({
  provider: z.enum(['google', 'github', 'anonymous']),
  token: z.string().optional(),
  username: z.string().optional(),
});

export const AuthResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    username: z.string(),
    avatar_url: z.string().optional(),
    display_name: z.string().optional(),
  }),
  token: z.string(),
  expires_at: z.string(),
});

// Rooms
export const CreateRoomRequestSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  system_prompt: z.string().min(10),
  agent_name: z.string().default('المساعد'),
  agent_role: z.string().optional(),
  model_id: z.string().default('gpt-3.5-turbo'),
  temperature: z.number().min(0).max(2).default(0.7),
  max_tokens: z.number().min(50).max(4000).default(1000),
  is_public: z.boolean().default(true),
  category_id: z.string().optional(),
  personality_traits: z.record(z.number()).optional(),
  memory_enabled: z.boolean().default(true),
  search_enabled: z.boolean().default(false),
});

export const UpdateRoomRequestSchema = CreateRoomRequestSchema.partial().omit({
  name: true,
});

export const RoomListResponseSchema = z.object({
  rooms: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    avatar_url: z.string().optional(),
    agent_name: z.string(),
    total_messages: z.number(),
    total_participants: z.number(),
    last_message_at: z.string().optional(),
    status: z.string(),
    is_featured: z.boolean(),
  })),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

// Messages
export const SendMessageRequestSchema = z.object({
  content: z.string().min(1).max(4000),
  parent_message_id: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export const MessageResponseSchema = z.object({
  id: z.string(),
  content: z.string(),
  user_id: z.string().optional(),
  is_ai_response: z.boolean(),
  model_used: z.string().optional(),
  tokens_used: z.number().optional(),
  processing_time: z.number().optional(),
  reactions: z.record(z.array(z.string())),
  created_at: z.string(),
  user: z.object({
    username: z.string(),
    avatar_url: z.string().optional(),
    display_name: z.string().optional(),
  }).optional(),
});

export const MessagesListResponseSchema = z.object({
  messages: z.array(MessageResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  session_id: z.string().optional(),
});

// AI Models
export const ModelListResponseSchema = z.object({
  models: z.array(z.object({
    id: z.string(),
    name: z.string(),
    display_name: z.string(),
    provider: z.string(),
    description: z.string().optional(),
    max_tokens: z.number(),
    context_window: z.number(),
    supports_streaming: z.boolean(),
    is_active: z.boolean(),
  })),
});

// User API Keys
export const AddUserKeyRequestSchema = z.object({
  provider: z.enum(['openrouter', 'openai', 'anthropic', 'google']),
  key: z.string().min(10),
  key_name: z.string().optional(),
});

// Real-time Events
export interface TypingEvent {
  type: 'typing';
  room_id: string;
  user_id: string;
  username: string;
  is_typing: boolean;
}

export interface MessageEvent {
  type: 'message';
  room_id: string;
  message: Message & {
    user?: Pick<User, 'username' | 'avatar_url' | 'display_name'>;
  };
}

export interface UserJoinEvent {
  type: 'user_join';
  room_id: string;
  user: Pick<User, 'id' | 'username' | 'avatar_url' | 'display_name'>;
}

export interface UserLeaveEvent {
  type: 'user_leave';
  room_id: string;
  user_id: string;
}

export type RealtimeEvent = TypingEvent | MessageEvent | UserJoinEvent | UserLeaveEvent;

// Error Types
export interface APIError {
  error: string;
  message: string;
  code?: string;
  details?: any;
}

// Pagination
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// Filters
export interface RoomFilters extends PaginationQuery {
  category_id?: string;
  status?: 'active' | 'paused' | 'archived';
  is_public?: boolean;
  search?: string;
}

export interface MessageFilters extends PaginationQuery {
  user_id?: string;
  is_ai_response?: boolean;
  content_type?: string;
  date_from?: string;
  date_to?: string;
}

// Type exports for Zod schemas
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type CreateRoomRequest = z.infer<typeof CreateRoomRequestSchema>;
export type UpdateRoomRequest = z.infer<typeof UpdateRoomRequestSchema>;
export type SendMessageRequest = z.infer<typeof SendMessageRequestSchema>;
export type AddUserKeyRequest = z.infer<typeof AddUserKeyRequestSchema>;