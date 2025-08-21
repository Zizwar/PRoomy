import dotenv from 'dotenv';
dotenv.config();

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { User, Room, Message, AIModel, ConversationSession } from '@/types';

// Database types matching our schema
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at'>>;
      };
      rooms: {
        Row: Room;
        Insert: Omit<Room, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Room, 'id' | 'created_at'>>;
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Message, 'id' | 'created_at'>>;
      };
      ai_models: {
        Row: AIModel;
        Insert: Omit<AIModel, 'id'>;
        Update: Partial<Omit<AIModel, 'id'>>;
      };
      conversation_sessions: {
        Row: ConversationSession;
        Insert: Omit<ConversationSession, 'id' | 'started_at'>;
        Update: Partial<Omit<ConversationSession, 'id' | 'started_at'>>;
      };
    };
  };
}

class SupabaseService {
  private client: SupabaseClient<Database>;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }

    this.client = createClient<Database>(supabaseUrl, supabaseKey);
  }

  getClient(): SupabaseClient<Database> {
    return this.client;
  }

  // User operations
  async getUserById(id: string): Promise<User | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async createUser(userData: Database['public']['Tables']['users']['Insert']): Promise<User> {
    const { data, error } = await this.client
      .from('users')
      .insert(userData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateUser(id: string, updates: Database['public']['Tables']['users']['Update']): Promise<User> {
    const { data, error } = await this.client
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Room operations
  async getRooms(filters: {
    page?: number;
    limit?: number;
    category_id?: string;
    status?: string;
    search?: string;
  } = {}): Promise<{ rooms: Room[]; total: number }> {
    const { page = 1, limit = 20, category_id, status = 'active', search } = filters;
    const offset = (page - 1) * limit;

    let query = this.client
      .from('rooms')
      .select('*', { count: 'exact' })
      .eq('status', status)
      .order('last_message_at', { ascending: false, nullsFirst: false });

    if (category_id) {
      query = query.eq('category_id', category_id);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;
    return { rooms: data || [], total: count || 0 };
  }

  async getRoomById(id: string): Promise<Room | null> {
    const { data, error } = await this.client
      .from('rooms')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getRoomBySlug(slug: string): Promise<Room | null> {
    const { data, error } = await this.client
      .from('rooms')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async createRoom(roomData: Database['public']['Tables']['rooms']['Insert']): Promise<Room> {
    const { data, error } = await this.client
      .from('rooms')
      .insert(roomData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateRoom(id: string, updates: Database['public']['Tables']['rooms']['Update']): Promise<Room> {
    const { data, error } = await this.client
      .from('rooms')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteRoom(id: string, userId: string): Promise<void> {
    const { error } = await this.client
      .from('rooms')
      .update({ status: 'archived' })
      .eq('id', id)
      .eq('created_by', userId);

    if (error) throw error;
  }

  // Message operations
  async getMessages(roomId: string, filters: {
    page?: number;
    limit?: number;
    user_id?: string;
    is_ai_response?: boolean;
  } = {}): Promise<{ messages: (Message & { user?: Partial<User> })[]; total: number }> {
    const { page = 1, limit = 50, user_id, is_ai_response } = filters;
    const offset = (page - 1) * limit;

    let query = this.client
      .from('messages')
      .select(`
        *,
        user:users(username, avatar_url, display_name)
      `, { count: 'exact' })
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });

    if (user_id) {
      query = query.eq('user_id', user_id);
    }

    if (is_ai_response !== undefined) {
      query = query.eq('is_ai_response', is_ai_response);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;
    return { 
      messages: data?.map(msg => ({
        ...msg,
        user: msg.user ? {
          username: (msg.user as any).username,
          avatar_url: (msg.user as any).avatar_url,
          display_name: (msg.user as any).display_name,
        } : undefined
      })) || [], 
      total: count || 0 
    };
  }

  async createMessage(messageData: Database['public']['Tables']['messages']['Insert']): Promise<Message> {
    const { data, error } = await this.client
      .from('messages')
      .insert(messageData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateMessage(id: string, updates: Database['public']['Tables']['messages']['Update']): Promise<Message> {
    const { data, error } = await this.client
      .from('messages')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // AI Models
  async getAIModels(): Promise<AIModel[]> {
    const { data, error } = await this.client
      .from('ai_models')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data || [];
  }

  async getAIModelById(id: string): Promise<AIModel | null> {
    const { data, error } = await this.client
      .from('ai_models')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  // Conversation Sessions
  async createConversationSession(sessionData: Database['public']['Tables']['conversation_sessions']['Insert']): Promise<ConversationSession> {
    const { data, error } = await this.client
      .from('conversation_sessions')
      .insert(sessionData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateConversationSession(id: string, updates: Database['public']['Tables']['conversation_sessions']['Update']): Promise<ConversationSession> {
    const { data, error } = await this.client
      .from('conversation_sessions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Realtime subscriptions
  subscribeToRoom(roomId: string, callback: (payload: any) => void) {
    return this.client
      .channel(`room:${roomId}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `room_id=eq.${roomId}`
        }, 
        callback
      )
      .subscribe();
  }

  subscribeToTyping(roomId: string, callback: (payload: any) => void) {
    return this.client
      .channel(`typing:${roomId}`)
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'typing_indicators',
          filter: `room_id=eq.${roomId}`
        },
        callback
      )
      .subscribe();
  }

  // Typing indicators
  async setTyping(roomId: string, userId: string, isTyping: boolean): Promise<void> {
    if (isTyping) {
      const { error } = await this.client
        .from('typing_indicators')
        .upsert({ room_id: roomId, user_id: userId });
      
      if (error) throw error;
    } else {
      const { error } = await this.client
        .from('typing_indicators')
        .delete()
        .eq('room_id', roomId)
        .eq('user_id', userId);
      
      if (error) throw error;
    }
  }
}

export const supabase = new SupabaseService();
export default supabase;