// Load environment variables first
import dotenv from 'dotenv';
dotenv.config();

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { compress } from 'hono/compress';
import { secureHeaders } from 'hono/secure-headers';
import { readFileSync } from 'fs';
import { join } from 'path';
import { serve } from '@hono/node-server';

// Import routes
import authRoutes from '@/routes/auth';
import roomsRoutes from '@/routes/rooms';
import messagesRoutes from '@/routes/messages';
import modelsRoutes from '@/routes/models';

// Import middleware
import { authMiddleware } from '@/middleware/auth';

// Initialize Hono app
const app = new Hono();

// Global middleware
app.use('*', logger());
app.use('*', compress());
app.use('*', secureHeaders());

// CORS configuration
app.use('*', cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com', 'https://proomy.app'] // Replace with your actual domains
    : ['http://localhost:1713', 'http://172.104.132.193:1713', 'http://localhost:8080'],
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Serve static files from public directory
app.get('/demo', (c) => {
  try {
    const html = readFileSync(join(process.cwd(), 'public', 'index.html'), 'utf8');
    return c.html(html);
  } catch (error) {
    return c.text('File not found', 404);
  }
});

app.get('/test', (c) => {
  try {
    const html = readFileSync(join(process.cwd(), 'public', 'test.html'), 'utf8');
    return c.html(html);
  } catch (error) {
    return c.text('File not found', 404);
  }
});

// Serve public files directly
app.get('/public/:filename', (c) => {
  const filename = c.req.param('filename');
  try {
    const html = readFileSync(join(process.cwd(), 'public', filename), 'utf8');
    return c.html(html);
  } catch (error) {
    return c.text('File not found', 404);
  }
});

// Auth middleware for API routes only
app.use('/auth/*', authMiddleware);
app.use('/rooms/*', authMiddleware);
app.use('/messages/*', authMiddleware);
app.use('/models/*', authMiddleware);

// Health check
app.get('/', (c) => {
  return c.json({
    message: 'Proomy2 API - Advanced AI Chat Rooms',
    version: '2.0.0',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    demo: '/demo',
    docs: '/docs', // Future: Add API documentation
  });
});

// API Routes
app.route('/auth', authRoutes);
app.route('/rooms', roomsRoutes);
app.route('/messages', messagesRoutes);
app.route('/models', modelsRoutes);

// Real-time endpoints (placeholder for now)
app.get('/realtime/rooms/:roomId', async (c) => {
  // This would typically use Server-Sent Events or WebSocket alternative
  // Since we're using Supabase realtime, this might redirect to Supabase endpoint
  return c.json({
    message: 'Real-time updates available via Supabase client',
    room_id: c.req.param('roomId'),
    channels: [
      `room:${c.req.param('roomId')}`,
      `typing:${c.req.param('roomId')}`,
    ],
  });
});

// Rate limiting info
app.get('/rate-limit', (c) => {
  return c.json({
    message: 'Rate limiting is handled by Supabase and OpenRouter',
    limits: {
      anonymous_users: '100 requests per 15 minutes',
      authenticated_users: '1000 requests per 15 minutes',
      ai_requests: 'Based on credits and API provider limits',
    },
  });
});

// API Documentation placeholder
app.get('/docs', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Proomy2 API Documentation</title>
      <style>
        body { font-family: 'Arial', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .endpoint { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .method { font-weight: bold; color: #007acc; }
        .path { font-family: monospace; background: #eee; padding: 2px 5px; border-radius: 3px; }
        .description { margin-top: 10px; color: #666; }
      </style>
    </head>
    <body>
      <h1>🤖 Proomy2 API Documentation</h1>
      <p>نظام غرف الدردشة الذكية مع الوكلاء المتقدمة</p>
      
      <h2>🔐 Authentication</h2>
      <div class="endpoint">
        <div><span class="method">POST</span> <span class="path">/auth/anonymous</span></div>
        <div class="description">تسجيل دخول مجهول بلا كلمة مرور</div>
      </div>
      
      <h2>🏠 Rooms</h2>
      <div class="endpoint">
        <div><span class="method">GET</span> <span class="path">/rooms</span></div>
        <div class="description">جلب قائمة الغرف المتاحة</div>
      </div>
      
      <div class="endpoint">
        <div><span class="method">POST</span> <span class="path">/rooms</span></div>
        <div class="description">إنشاء غرفة جديدة (يتطلب تسجيل الدخول)</div>
      </div>
      
      <h2>💬 Messages</h2>
      <div class="endpoint">
        <div><span class="method">GET</span> <span class="path">/messages/:roomId</span></div>
        <div class="description">جلب رسائل الغرفة</div>
      </div>
      
      <div class="endpoint">
        <div><span class="method">POST</span> <span class="path">/messages/:roomId</span></div>
        <div class="description">إرسال رسالة جديدة (يتطلب تسجيل الدخول)</div>
      </div>
      
      <h2>🤖 AI Models</h2>
      <div class="endpoint">
        <div><span class="method">GET</span> <span class="path">/models</span></div>
        <div class="description">جلب قائمة النماذج المتاحة</div>
      </div>
      
      <p><strong>لمزيد من التفاصيل:</strong> استخدم Postman collection المرفقة مع المشروع</p>
    </body>
    </html>
  `);
});

// Error handling
app.onError((err, c) => {
  console.error('Server error:', err);
  
  return c.json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    timestamp: new Date().toISOString(),
  }, 500);
});

// 404 handler
app.notFound((c) => {
  return c.json({
    error: 'Not found',
    message: 'The requested endpoint does not exist',
    available_endpoints: [
      '/auth/*',
      '/rooms/*', 
      '/messages/*',
      '/models/*',
    ],
  }, 404);
});

// Start server
const port = parseInt(process.env.PORT || '3000');

console.log(`🚀 Proomy2 API starting on port ${port}`);
console.log(`📚 Documentation available at http://localhost:${port}/docs`);
console.log(`🔗 Health check at http://localhost:${port}/`);

serve({
  fetch: app.fetch,
  port,
}, (info) => {
  console.log(`✅ Server is running on http://localhost:${info.port}`);
});

export default app;