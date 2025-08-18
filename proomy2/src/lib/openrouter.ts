import OpenAI from 'openai';
import { AIModel } from '@/types';

interface OpenRouterConfig {
  apiKey: string;
  baseURL?: string;
  defaultModel?: string;
  maxRetries?: number;
  timeout?: number;
}

export class OpenRouterService {
  private client: OpenAI;
  private config: OpenRouterConfig;

  constructor(config: OpenRouterConfig) {
    this.config = {
      baseURL: 'https://openrouter.ai/api/v1',
      defaultModel: 'gpt-3.5-turbo',
      maxRetries: 3,
      timeout: 30000,
      ...config,
    };

    this.client = new OpenAI({
      apiKey: this.config.apiKey,
      baseURL: this.config.baseURL,
      maxRetries: this.config.maxRetries,
      timeout: this.config.timeout,
    });
  }

  async generateResponse(
    messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
    options: {
      model?: string;
      temperature?: number;
      max_tokens?: number;
      top_p?: number;
      frequency_penalty?: number;
      presence_penalty?: number;
      stream?: boolean;
      user_id?: string;
      room_id?: string;
    } = {}
  ): Promise<{
    content: string;
    model: string;
    tokens_used: number;
    processing_time: number;
    finish_reason: string;
  }> {
    const startTime = Date.now();
    
    try {
      const completion = await this.client.chat.completions.create({
        model: options.model || this.config.defaultModel,
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.max_tokens ?? 1000,
        top_p: options.top_p ?? 1,
        frequency_penalty: options.frequency_penalty ?? 0,
        presence_penalty: options.presence_penalty ?? 0,
        stream: false, // We'll handle streaming separately if needed
        user: options.user_id,
      });

      const processingTime = (Date.now() - startTime) / 1000;
      const choice = completion.choices[0];

      return {
        content: choice.message?.content || '',
        model: completion.model,
        tokens_used: completion.usage?.total_tokens || 0,
        processing_time: processingTime,
        finish_reason: choice.finish_reason || 'stop',
      };
    } catch (error: any) {
      console.error('OpenRouter API Error:', error);
      throw new Error(`AI Response Error: ${error.message || 'Unknown error'}`);
    }
  }

  async generateStreamResponse(
    messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
    options: {
      model?: string;
      temperature?: number;
      max_tokens?: number;
      top_p?: number;
      frequency_penalty?: number;
      presence_penalty?: number;
      user_id?: string;
    } = {}
  ): Promise<AsyncIterable<{
    content: string;
    done: boolean;
    model?: string;
    tokens_used?: number;
  }>> {
    const stream = await this.client.chat.completions.create({
      model: options.model || this.config.defaultModel,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 1000,
      top_p: options.top_p ?? 1,
      frequency_penalty: options.frequency_penalty ?? 0,
      presence_penalty: options.presence_penalty ?? 0,
      stream: true,
      user: options.user_id,
    });

    return {
      async *[Symbol.asyncIterator]() {
        for await (const chunk of stream) {
          const choice = chunk.choices[0];
          if (choice) {
            yield {
              content: choice.delta?.content || '',
              done: choice.finish_reason !== null,
              model: chunk.model,
              tokens_used: (chunk as any).usage?.total_tokens,
            };
          }
        }
      },
    };
  }

  // Get available models from OpenRouter
  async getAvailableModels(): Promise<AIModel[]> {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/models', {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Transform OpenRouter model format to our format
      return data.data?.map((model: any) => ({
        id: model.id,
        name: model.id,
        display_name: model.name || model.id,
        provider: 'openrouter',
        description: model.description,
        max_tokens: model.context_length || 4000,
        cost_per_1k_tokens: model.pricing?.prompt || 0,
        supports_streaming: true, // Most OpenRouter models support streaming
        supports_function_calling: model.supports_function_calling || false,
        context_window: model.context_length || 4000,
        is_active: true,
      })) || [];
    } catch (error) {
      console.error('Error fetching OpenRouter models:', error);
      return [];
    }
  }

  // Validate API key
  async validateApiKey(apiKey?: string): Promise<boolean> {
    const testKey = apiKey || this.config.apiKey;
    
    try {
      const testClient = new OpenAI({
        apiKey: testKey,
        baseURL: this.config.baseURL,
        timeout: 5000,
      });

      await testClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      });

      return true;
    } catch (error) {
      console.error('API key validation failed:', error);
      return false;
    }
  }

  // Estimate token count (rough approximation)
  estimateTokens(text: string): number {
    // Rough approximation: 1 token ≈ 4 characters for English, 2-3 for Arabic
    const arabicPattern = /[\u0600-\u06FF]/g;
    const arabicChars = (text.match(arabicPattern) || []).length;
    const englishChars = text.length - arabicChars;
    
    return Math.ceil((englishChars / 4) + (arabicChars / 2.5));
  }

  // Get model pricing info
  async getModelPricing(modelName: string): Promise<{
    prompt_cost: number;
    completion_cost: number;
  } | null> {
    try {
      const response = await fetch(`https://openrouter.ai/api/v1/models/${modelName}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      if (!response.ok) return null;

      const model = await response.json();
      return {
        prompt_cost: model.pricing?.prompt || 0,
        completion_cost: model.pricing?.completion || 0,
      };
    } catch (error) {
      console.error('Error fetching model pricing:', error);
      return null;
    }
  }
}

// Factory function to create OpenRouter service with different configurations
export function createOpenRouterService(config: Partial<OpenRouterConfig> = {}): OpenRouterService {
  const apiKey = config.apiKey || process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenRouter API key is required');
  }

  return new OpenRouterService({
    apiKey,
    ...config,
  });
}

// Singleton instance for default usage
export const openrouter = createOpenRouterService();

export default OpenRouterService;