import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';
import supabase from '@/lib/supabase';

export interface AuthUser {
  id: string;
  username: string;
  email?: string;
  avatar_url?: string;
  is_anonymous?: boolean;
}

// Extend Hono's Context type to include user
declare module 'hono' {
  interface ContextVariableMap {
    user: AuthUser;
    isAuthenticated: boolean;
  }
}

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    c.set('isAuthenticated', false);
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await supabase.getUserById(decoded.userId);

    if (!user) {
      c.set('isAuthenticated', false);
      return next();
    }

    c.set('user', {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar_url: user.avatar_url,
      is_anonymous: user.provider === 'anonymous',
    });
    c.set('isAuthenticated', true);

    // Update last_seen
    await supabase.updateUser(user.id, {
      last_seen: new Date(),
      is_online: true,
    });

    return next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    c.set('isAuthenticated', false);
    return next();
  }
};

export const requireAuth = async (c: Context, next: Next) => {
  const isAuthenticated = c.get('isAuthenticated');
  
  if (!isAuthenticated) {
    return c.json({ error: 'Authentication required' }, 401);
  }

  return next();
};

export const optionalAuth = async (c: Context, next: Next) => {
  // This middleware just ensures auth is checked but doesn't require it
  return next();
};