import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { SendMessageRequestSchema, MessageFilters } from '@/types';
import supabase from '@/lib/supabase';
import { openrouter, createOpenRouterService } from '@/lib/openrouter';
import { requireAuth, optionalAuth } from '@/middleware/auth';

const messages = new Hono();

// Get messages for a room
messages.get('/:roomId', optionalAuth, async (c) => {
  try {
    const roomId = c.req.param('roomId');
    const query = c.req.query();
    
    const filters: MessageFilters = {
      page: parseInt(query.page || '1'),
      limit: Math.min(parseInt(query.limit || '50'), 100),
      user_id: query.user_id,
      is_ai_response: query.is_ai_response ? query.is_ai_response === 'true' : undefined,
      content_type: query.content_type,
      date_from: query.date_from,
      date_to: query.date_to,
    };

    // Check if room exists and is accessible
    const room = await supabase.getRoomById(roomId);
    if (!room) {
      return c.json({ error: 'Room not found' }, 404);
    }

    if (!room.is_public && room.require_auth) {
      const isAuthenticated = c.get('isAuthenticated');
      if (!isAuthenticated) {
        return c.json({ error: 'Authentication required' }, 401);
      }
    }

    const { messages: messagesList, total } = await supabase.getMessages(roomId, filters);

    // Transform messages for response
    const transformedMessages = messagesList.map(msg => ({
      id: msg.id,
      content: msg.content,
      content_type: msg.content_type,
      is_ai_response: msg.is_ai_response,
      model_used: msg.model_used,
      tokens_used: msg.tokens_used,
      processing_time: msg.processing_time,
      reactions: msg.reactions,
      reply_count: msg.reply_count,
      created_at: msg.created_at.toISOString(),
      user: msg.user ? {
        username: msg.user.username,
        avatar_url: msg.user.avatar_url,
        display_name: msg.user.display_name,
      } : undefined,
    }));

    return c.json({
      messages: transformedMessages,
      total,
      page: filters.page,
      limit: filters.limit,
      room: {
        id: room.id,
        name: room.name,
        agent_name: room.agent_name,
      },
    });
  } catch (error: any) {
    console.error('Get messages error:', error);
    return c.json({ error: 'Failed to fetch messages', message: error.message }, 500);
  }
});

// Send message to room
messages.post('/:roomId',
  requireAuth,
  zValidator('json', SendMessageRequestSchema),
  async (c) => {
    try {
      const user = c.get('user');
      const roomId = c.req.param('roomId');
      const { content, parent_message_id, metadata } = c.req.valid('json');

      // Check if room exists and is accessible
      const room = await supabase.getRoomById(roomId);
      if (!room) {
        return c.json({ error: 'Room not found' }, 404);
      }

      if (room.status !== 'active') {
        return c.json({ error: 'Room is not active' }, 400);
      }

      // Check if user can post (for private rooms or banned users)
      if (room.require_auth && !room.allow_anonymous && user.is_anonymous) {
        return c.json({ error: 'Anonymous users not allowed in this room' }, 403);
      }

      // Create user message
      const userMessage = await supabase.createMessage({
        id: uuidv4(),
        room_id: roomId,
        user_id: user.id,
        content: content.trim(),
        content_type: 'text',
        metadata: metadata || {},
        is_ai_response: false,
        parent_message_id,
        has_attachments: false,
        is_edited: false,
        reactions: {},
        reply_count: 0,
        is_flagged: false,
        moderation_score: 0,
      });

      // Update user stats
      await supabase.updateUser(user.id, {
        total_messages: user.total_messages ? user.total_messages + 1 : 1,
      });

      // Generate AI response if the message doesn't start with @ (opt-out mechanism)
      let aiMessage = null;
      if (!content.startsWith('@') && room.system_prompt) {
        try {
          aiMessage = await generateAIResponse(room, userMessage, user);
        } catch (aiError) {
          console.error('AI response error:', aiError);
          // Don't fail the whole request if AI fails
        }
      }

      const response = {
        message: {
          id: userMessage.id,
          content: userMessage.content,
          is_ai_response: false,
          created_at: userMessage.created_at.toISOString(),
          user: {
            username: user.username,
            avatar_url: user.avatar_url,
            display_name: user.display_name || user.username,
          },
        },
        ai_response: aiMessage ? {
          id: aiMessage.id,
          content: aiMessage.content,
          is_ai_response: true,
          model_used: aiMessage.model_used,
          tokens_used: aiMessage.tokens_used,
          processing_time: aiMessage.processing_time,
          created_at: aiMessage.created_at.toISOString(),
          user: {
            username: room.agent_name,
            avatar_url: room.avatar_url || '/default-ai-avatar.png',
            display_name: room.agent_name,
          },
        } : null,
      };

      return c.json(response, 201);
    } catch (error: any) {
      console.error('Send message error:', error);
      return c.json({ error: 'Failed to send message', message: error.message }, 500);
    }
  }
);

// Add reaction to message
messages.post('/:roomId/:messageId/reactions',
  requireAuth,
  zValidator('json', z.object({ emoji: z.string().min(1) })),
  async (c) => {
    try {
      const user = c.get('user');
      const { roomId, messageId } = c.req.param();
      const { emoji } = c.req.valid('json');

      // Get message and verify it exists in the room
      const { messages: [message] } = await supabase.getMessages(roomId, {
        limit: 1,
      });

      if (!message || message.id !== messageId) {
        return c.json({ error: 'Message not found' }, 404);
      }

      // Add or remove reaction
      const reactions = message.reactions || {};
      if (!reactions[emoji]) {
        reactions[emoji] = [];
      }

      const userIndex = reactions[emoji].indexOf(user.id);
      if (userIndex === -1) {
        reactions[emoji].push(user.id);
      } else {
        reactions[emoji].splice(userIndex, 1);
        if (reactions[emoji].length === 0) {
          delete reactions[emoji];
        }
      }

      await supabase.updateMessage(messageId, { reactions });

      return c.json({ reactions });
    } catch (error: any) {
      console.error('Add reaction error:', error);
      return c.json({ error: 'Failed to add reaction', message: error.message }, 500);
    }
  }
);

// Delete message
messages.delete('/:roomId/:messageId', requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const { roomId, messageId } = c.req.param();

    const { messages: [message] } = await supabase.getMessages(roomId, { limit: 1 });
    if (!message || message.id !== messageId) {
      return c.json({ error: 'Message not found' }, 404);
    }

    // Check if user owns the message or is moderator
    if (message.user_id !== user.id) {
      const room = await supabase.getRoomById(roomId);
      if (!room || (!room.moderators.includes(user.id) && room.created_by !== user.id)) {
        return c.json({ error: 'Permission denied' }, 403);
      }
    }

    // Soft delete by updating content
    await supabase.updateMessage(messageId, {
      content: '[deleted]',
      is_flagged: true,
      flagged_reason: 'deleted_by_user',
    });

    return c.json({ message: 'Message deleted' });
  } catch (error: any) {
    console.error('Delete message error:', error);
    return c.json({ error: 'Failed to delete message', message: error.message }, 500);
  }
});

// Helper function to generate AI response
async function generateAIResponse(room: any, userMessage: any, user: any) {
  try {
    // Get recent conversation history for context
    const { messages: recentMessages } = await supabase.getMessages(room.id, {
      limit: 10,
    });

    // Build conversation history
    const conversationHistory = recentMessages
      .filter(msg => !msg.is_flagged)
      .map(msg => ({
        role: msg.is_ai_response ? 'assistant' as const : 'user' as const,
        content: msg.content,
      }));

    // Add system prompt
    const messages = [
      { role: 'system' as const, content: room.system_prompt },
      ...conversationHistory,
      { role: 'user' as const, content: userMessage.content },
    ];

    // Use user's personal API key if available, otherwise use default
    let aiService = openrouter;
    
    // TODO: Implement user API key retrieval
    // const userApiKey = await getUserApiKey(user.id, 'openrouter');
    // if (userApiKey) {
    //   aiService = createOpenRouterService({ apiKey: userApiKey });
    // }

    const aiResponse = await aiService.generateResponse(messages, {
      model: room.model_id,
      temperature: room.temperature,
      max_tokens: room.max_tokens,
      top_p: room.top_p,
      frequency_penalty: room.frequency_penalty,
      presence_penalty: room.presence_penalty,
      user_id: user.id,
      room_id: room.id,
    });

    // Create AI message in database
    const aiMessage = await supabase.createMessage({
      id: uuidv4(),
      room_id: room.id,
      user_id: null, // AI messages don't have a user_id
      content: aiResponse.content,
      content_type: 'text',
      metadata: {
        model: aiResponse.model,
        tokens: aiResponse.tokens_used,
        processing_time: aiResponse.processing_time,
      },
      is_ai_response: true,
      parent_message_id: userMessage.id,
      model_used: aiResponse.model,
      tokens_used: aiResponse.tokens_used,
      processing_time: aiResponse.processing_time,
      confidence_score: 0.8, // Default confidence
      has_attachments: false,
      is_edited: false,
      reactions: {},
      reply_count: 0,
      is_flagged: false,
    });

    return aiMessage;
  } catch (error) {
    console.error('AI response generation failed:', error);
    throw error;
  }
}

export default messages;