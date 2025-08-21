import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { v4 as uuidv4 } from 'uuid';
import { 
  CreateRoomRequestSchema, 
  UpdateRoomRequestSchema,
  RoomFilters 
} from '@/types';
import supabase from '@/lib/supabase';
import { requireAuth, optionalAuth } from '@/middleware/auth';

const rooms = new Hono();

// Get all rooms (public endpoint with optional auth)
rooms.get('/', optionalAuth, async (c) => {
  try {
    const query = c.req.query();
    const filters: RoomFilters = {
      page: parseInt(query.page || '1'),
      limit: Math.min(parseInt(query.limit || '20'), 100),
      category_id: query.category_id,
      status: query.status as any || 'active',
      search: query.search,
    };

    const { rooms: roomsList, total } = await supabase.getRooms(filters);

    // Transform rooms for response
    const transformedRooms = roomsList.map(room => ({
      id: room.id,
      name: room.name,
      slug: room.slug,
      description: room.description,
      avatar_url: room.avatar_url,
      agent_name: room.agent_name,
      agent_role: room.agent_role,
      total_messages: room.total_messages,
      total_participants: room.total_participants,
      last_message_at: room.last_message_at ? new Date(room.last_message_at).toISOString() : null,
      status: room.status,
      is_featured: room.is_featured,
      is_public: room.is_public,
      category_id: room.category_id,
      created_at: new Date(room.created_at).toISOString(),
    }));

    return c.json({
      rooms: transformedRooms,
      total,
      page: filters.page,
      limit: filters.limit,
      pages: Math.ceil(total / filters.limit!),
    });
  } catch (error: any) {
    console.error('Get rooms error:', error);
    return c.json({ error: 'Failed to fetch rooms', message: error.message }, 500);
  }
});

// Get room by ID or slug
rooms.get('/:identifier', optionalAuth, async (c) => {
  try {
    const identifier = c.req.param('identifier');
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(identifier);
    
    const room = isUuid 
      ? await supabase.getRoomById(identifier)
      : await supabase.getRoomBySlug(identifier);

    if (!room) {
      return c.json({ error: 'Room not found' }, 404);
    }

    // Check if user has access to private rooms
    if (!room.is_public) {
      const isAuthenticated = c.get('isAuthenticated');
      if (!isAuthenticated) {
        return c.json({ error: 'Room requires authentication' }, 401);
      }
    }

    return c.json({
      room: {
        id: room.id,
        name: room.name,
        slug: room.slug,
        description: room.description,
        avatar_url: room.avatar_url,
        system_prompt: room.system_prompt,
        agent_name: room.agent_name,
        agent_role: room.agent_role,
        personality_traits: room.personality_traits,
        model_id: room.model_id,
        temperature: room.temperature,
        max_tokens: room.max_tokens,
        top_p: room.top_p,
        frequency_penalty: room.frequency_penalty,
        presence_penalty: room.presence_penalty,
        is_public: room.is_public,
        max_participants: room.max_participants,
        require_auth: room.require_auth,
        allow_anonymous: room.allow_anonymous,
        memory_enabled: room.memory_enabled,
        search_enabled: room.search_enabled,
        function_calling_enabled: room.function_calling_enabled,
        total_messages: room.total_messages,
        total_participants: room.total_participants,
        status: room.status,
        created_at: new Date(room.created_at).toISOString(),
        updated_at: room.updated_at.toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Get room error:', error);
    return c.json({ error: 'Failed to fetch room', message: error.message }, 500);
  }
});

// Create new room
rooms.post('/', 
  requireAuth,
  zValidator('json', CreateRoomRequestSchema),
  async (c) => {
    try {
      const user = c.get('user');
      const data = c.req.valid('json');

      // Generate unique slug from name
      const baseSlug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9\u0600-\u06FF]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      let slug = baseSlug;
      let counter = 1;
      
      // Ensure unique slug
      while (await supabase.getRoomBySlug(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      const roomData = {
        id: uuidv4(),
        name: data.name,
        slug,
        description: data.description,
        system_prompt: data.system_prompt,
        agent_name: data.agent_name || 'المساعد',
        agent_role: data.agent_role,
        personality_traits: data.personality_traits,
        model_id: data.model_id || 'gpt-3.5-turbo',
        temperature: data.temperature || 0.7,
        max_tokens: data.max_tokens || 1000,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        is_public: data.is_public !== false,
        max_participants: 50,
        require_auth: false,
        allow_anonymous: true,
        moderation_enabled: true,
        memory_enabled: data.memory_enabled !== false,
        search_enabled: data.search_enabled || false,
        function_calling_enabled: false,
        image_analysis_enabled: false,
        created_by: user.id,
        moderators: [user.id],
        total_messages: 0,
        total_participants: 0,
        status: 'active' as const,
        is_featured: false,
        category_id: data.category_id,
      };

      const room = await supabase.createRoom(roomData);

      return c.json({
        room: {
          id: room.id,
          name: room.name,
          slug: room.slug,
          description: room.description,
          agent_name: room.agent_name,
          status: room.status,
          created_at: new Date(room.created_at).toISOString(),
        },
      }, 201);
    } catch (error: any) {
      console.error('Create room error:', error);
      return c.json({ error: 'Failed to create room', message: error.message }, 500);
    }
  }
);

// Update room
rooms.put('/:id',
  requireAuth,
  zValidator('json', UpdateRoomRequestSchema),
  async (c) => {
    try {
      const user = c.get('user');
      const roomId = c.req.param('id');
      const updates = c.req.valid('json');

      // Check if room exists and user owns it
      const room = await supabase.getRoomById(roomId);
      if (!room) {
        return c.json({ error: 'Room not found' }, 404);
      }

      if (room.created_by !== user.id && !room.moderators.includes(user.id)) {
        return c.json({ error: 'Permission denied' }, 403);
      }

      const updatedRoom = await supabase.updateRoom(roomId, updates);

      return c.json({
        room: {
          id: updatedRoom.id,
          name: updatedRoom.name,
          description: updatedRoom.description,
          system_prompt: updatedRoom.system_prompt,
          agent_name: updatedRoom.agent_name,
          updated_at: updatedRoom.updated_at.toISOString(),
        },
      });
    } catch (error: any) {
      console.error('Update room error:', error);
      return c.json({ error: 'Failed to update room', message: error.message }, 500);
    }
  }
);

// Delete (archive) room
rooms.delete('/:id', requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const roomId = c.req.param('id');

    const room = await supabase.getRoomById(roomId);
    if (!room) {
      return c.json({ error: 'Room not found' }, 404);
    }

    if (room.created_by !== user.id) {
      return c.json({ error: 'Permission denied' }, 403);
    }

    await supabase.deleteRoom(roomId, user.id);

    return c.json({ message: 'Room archived successfully' });
  } catch (error: any) {
    console.error('Delete room error:', error);
    return c.json({ error: 'Failed to delete room', message: error.message }, 500);
  }
});

// Get room categories
rooms.get('/categories/list', async (c) => {
  try {
    const { data, error } = await supabase.getClient()
      .from('room_categories')
      .select('*')
      .order('name');

    if (error) throw error;

    return c.json({
      categories: data || [],
    });
  } catch (error: any) {
    console.error('Get categories error:', error);
    return c.json({ error: 'Failed to fetch categories', message: error.message }, 500);
  }
});

export default rooms;