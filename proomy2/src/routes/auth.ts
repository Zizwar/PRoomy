import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { LoginRequestSchema, AuthResponseSchema } from '@/types';
import supabase from '@/lib/supabase';

const auth = new Hono();

// Anonymous login - creates a temporary user
auth.post('/anonymous', 
  zValidator('json', LoginRequestSchema.omit({ provider: true, token: true })),
  async (c) => {
    try {
      const { username } = c.req.valid('json');
      
      if (!username || username.trim().length < 2) {
        return c.json({ error: 'Username must be at least 2 characters' }, 400);
      }

      // Check if username already exists
      const existingUser = await supabase.getUserByUsername(username);
      if (existingUser && existingUser.provider !== 'anonymous') {
        return c.json({ error: 'Username already taken' }, 409);
      }

      let user;
      
      if (existingUser) {
        // Update existing anonymous user
        user = await supabase.updateUser(existingUser.id, {
          is_online: true,
          last_seen: new Date(),
        });
      } else {
        // Create new anonymous user
        user = await supabase.createUser({
          id: uuidv4(),
          username: username.trim(),
          display_name: username.trim(),
          provider: 'anonymous',
          avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${username}`,
          total_messages: 0,
          total_tokens_used: 0,
          credits_remaining: 100, // Limited credits for anonymous users
          preferred_model: 'gpt-3.5-turbo',
          theme: 'light',
          language: 'ar',
          is_online: true,
          last_seen: new Date(),
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );

      const response: AuthResponseSchema = {
        user: {
          id: user.id,
          username: user.username,
          avatar_url: user.avatar_url,
          display_name: user.display_name,
        },
        token,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };

      return c.json(response);
    } catch (error: any) {
      console.error('Anonymous login error:', error);
      return c.json({ error: 'Registration failed', message: error.message }, 500);
    }
  }
);

// Regular signup with email
auth.post('/register', 
  zValidator('json', z.object({
    username: z.string().min(2),
    email: z.string().email()
  })),
  async (c) => {
    try {
      const { username, email } = c.req.valid('json');
      
      if (!username || username.trim().length < 2) {
        return c.json({ error: 'Username must be at least 2 characters' }, 400);
      }

      if (!email || !email.includes('@')) {
        return c.json({ error: 'Valid email is required' }, 400);
      }

      // Check if username or email already exists
      const existingUser = await supabase.getUserByUsername(username);
      if (existingUser) {
        return c.json({ error: 'Username already taken' }, 409);
      }

      const existingEmail = await supabase.getUserByEmail(email);
      if (existingEmail) {
        return c.json({ error: 'Email already registered' }, 409);
      }

      // Create new registered user
      const user = await supabase.createUser({
        id: uuidv4(),
        username: username.trim(),
        email: email.trim().toLowerCase(),
        display_name: username.trim(),
        provider: 'email',
        avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${username}`,
        total_messages: 0,
        total_tokens_used: 0,
        credits_remaining: 1000, // More credits for registered users
        preferred_model: 'gpt-3.5-turbo',
        theme: 'light',
        language: 'ar',
        is_online: true,
        last_seen: new Date(),
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET!,
        { expiresIn: '30d' } // Longer expiry for registered users
      );

      const response: AuthResponseSchema = {
        user: {
          id: user.id,
          username: user.username,
          avatar_url: user.avatar_url,
          display_name: user.display_name,
        },
        token,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };

      return c.json(response);
    } catch (error: any) {
      console.error('Registration error:', error);
      return c.json({ error: 'Registration failed', message: error.message }, 500);
    }
  }
);

// OAuth login placeholder (for future implementation)
auth.post('/oauth/:provider',
  zValidator('param', LoginRequestSchema.pick({ provider: true })),
  async (c) => {
    const { provider } = c.req.valid('param');
    
    // This would integrate with OAuth providers like Google, GitHub
    // For now, return a placeholder response
    return c.json({
      error: 'OAuth not implemented yet',
      message: `${provider} OAuth integration coming soon`,
    }, 501);
  }
);

// Token refresh
auth.post('/refresh', async (c) => {
  const authHeader = c.req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return c.json({ error: 'Token required' }, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await supabase.getUserById(decoded.userId);

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    // Generate new token
    const newToken = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    return c.json({
      token: newToken,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401);
  }
});

// Logout
auth.post('/logout', async (c) => {
  const authHeader = c.req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      // Set user as offline
      await supabase.updateUser(decoded.userId, {
        is_online: false,
        last_seen: new Date(),
      });
    } catch (error) {
      // Token is invalid, but that's fine for logout
    }
  }

  return c.json({ message: 'Logged out successfully' });
});

// Get current user info
auth.get('/me', async (c) => {
  const authHeader = c.req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return c.json({ error: 'Token required' }, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await supabase.getUserById(decoded.userId);

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        display_name: user.display_name,
        avatar_url: user.avatar_url,
        bio: user.bio,
        total_messages: user.total_messages,
        credits_remaining: user.credits_remaining,
        preferred_model: user.preferred_model,
        theme: user.theme,
        language: user.language,
        is_online: user.is_online,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401);
  }
});

export default auth;