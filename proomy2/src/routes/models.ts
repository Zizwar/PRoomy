import { Hono } from 'hono';
import supabase from '@/lib/supabase';
import { openrouter } from '@/lib/openrouter';
import { requireAuth, optionalAuth } from '@/middleware/auth';

const models = new Hono();

// Get all available AI models
models.get('/', optionalAuth, async (c) => {
  try {
    // Get models from database
    const dbModels = await supabase.getAIModels();

    // Optionally fetch fresh data from OpenRouter (can be cached)
    let openRouterModels = [];
    try {
      openRouterModels = await openrouter.getAvailableModels();
    } catch (error) {
      console.warn('Failed to fetch OpenRouter models:', error);
    }

    // Merge and deduplicate models
    const modelsMap = new Map();
    
    // Add database models first
    dbModels.forEach(model => {
      modelsMap.set(model.name, {
        id: model.id,
        name: model.name,
        display_name: model.display_name,
        provider: model.provider,
        description: model.description,
        max_tokens: model.max_tokens,
        cost_per_1k_tokens: model.cost_per_1k_tokens,
        supports_streaming: model.supports_streaming,
        supports_function_calling: model.supports_function_calling,
        context_window: model.context_window,
        is_active: model.is_active,
        source: 'database',
      });
    });

    // Add fresh OpenRouter models (they override database if same name)
    openRouterModels.forEach(model => {
      modelsMap.set(model.name, {
        ...model,
        source: 'openrouter',
      });
    });

    const models = Array.from(modelsMap.values())
      .filter(model => model.is_active)
      .sort((a, b) => a.display_name.localeCompare(b.display_name));

    return c.json({
      models,
      total: models.length,
    });
  } catch (error: any) {
    console.error('Get models error:', error);
    return c.json({ error: 'Failed to fetch models', message: error.message }, 500);
  }
});

// Get specific model details
models.get('/:modelId', optionalAuth, async (c) => {
  try {
    const modelId = c.req.param('modelId');
    
    const model = await supabase.getAIModelById(modelId);
    if (!model) {
      return c.json({ error: 'Model not found' }, 404);
    }

    // Get additional pricing info from OpenRouter if available
    let pricing = null;
    try {
      pricing = await openrouter.getModelPricing(model.name);
    } catch (error) {
      console.warn('Failed to fetch model pricing:', error);
    }

    return c.json({
      model: {
        ...model,
        pricing,
      },
    });
  } catch (error: any) {
    console.error('Get model error:', error);
    return c.json({ error: 'Failed to fetch model', message: error.message }, 500);
  }
});

// Test model with a simple prompt (authenticated users only)
models.post('/:modelId/test', requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const modelId = c.req.param('modelId');
    const body = await c.req.json();
    
    const testPrompt = body.prompt || 'مرحبا، كيف حالك؟';
    const maxTokens = Math.min(body.max_tokens || 100, 500); // Limit test responses

    const model = await supabase.getAIModelById(modelId);
    if (!model) {
      return c.json({ error: 'Model not found' }, 404);
    }

    // Check user's remaining credits
    const userData = await supabase.getUserById(user.id);
    if (!userData || userData.credits_remaining < 10) {
      return c.json({ error: 'Insufficient credits for model test' }, 400);
    }

    const startTime = Date.now();
    
    const response = await openrouter.generateResponse(
      [
        { role: 'system', content: 'أنت مساعد ذكي ومفيد. أجب باختصار وبطريقة ودية.' },
        { role: 'user', content: testPrompt },
      ],
      {
        model: model.name,
        max_tokens: maxTokens,
        temperature: 0.7,
        user_id: user.id,
      }
    );

    const processingTime = Date.now() - startTime;

    // Deduct credits (simplified - in production you'd want more sophisticated billing)
    const creditsUsed = Math.ceil(response.tokens_used / 100); // 1 credit per ~100 tokens
    await supabase.updateUser(user.id, {
      credits_remaining: userData.credits_remaining - creditsUsed,
      total_tokens_used: (userData.total_tokens_used || 0) + response.tokens_used,
    });

    return c.json({
      response: {
        content: response.content,
        model: response.model,
        tokens_used: response.tokens_used,
        processing_time: processingTime,
        credits_used: creditsUsed,
        credits_remaining: userData.credits_remaining - creditsUsed,
      },
    });
  } catch (error: any) {
    console.error('Test model error:', error);
    return c.json({ error: 'Failed to test model', message: error.message }, 500);
  }
});

// Get model usage statistics (for admins or model comparison)
models.get('/:modelId/stats', optionalAuth, async (c) => {
  try {
    const modelId = c.req.param('modelId');
    const model = await supabase.getAIModelById(modelId);
    
    if (!model) {
      return c.json({ error: 'Model not found' }, 404);
    }

    // Get usage stats from usage_analytics table
    const { data: stats, error } = await supabase.getClient()
      .from('usage_analytics')
      .select('*')
      .eq('model_used', model.name)
      .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // Last 30 days

    if (error) throw error;

    const totalUsage = stats?.length || 0;
    const totalTokens = stats?.reduce((sum, stat) => sum + (stat.tokens_used || 0), 0) || 0;
    const avgResponseTime = stats?.reduce((sum, stat) => sum + (stat.response_time || 0), 0) / totalUsage || 0;
    const avgSatisfaction = stats?.reduce((sum, stat) => sum + (stat.user_satisfaction || 0), 0) / totalUsage || 0;

    return c.json({
      model_name: model.display_name,
      stats: {
        total_usage: totalUsage,
        total_tokens: totalTokens,
        avg_response_time: avgResponseTime,
        avg_satisfaction: avgSatisfaction,
        period_days: 30,
      },
    });
  } catch (error: any) {
    console.error('Get model stats error:', error);
    return c.json({ error: 'Failed to fetch model stats', message: error.message }, 500);
  }
});

export default models;