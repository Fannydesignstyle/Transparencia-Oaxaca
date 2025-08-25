// Google AI (Gemini) API utilities
const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY || '';
const GOOGLE_AI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

export interface GeminiMessage {
  role: 'user' | 'model' | 'system';
  content: string;
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
      role: string;
    };
    finishReason: string;
    index: number;
  }>;
  promptFeedback?: {
    safetyRatings: Array<{
      category: string;
      probability: string;
    }>;
  };
}

export async function generateGeminiCompletion(
  messages: GeminiMessage[],
  model: string = 'gemini-pro'
): Promise<GeminiResponse> {
  if (!GOOGLE_AI_API_KEY) {
    throw new Error('Google AI API key is not configured. Please set GOOGLE_AI_API_KEY in your environment variables.');
  }

  try {
    // Convert messages to Gemini format
    const geminiMessages = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const response = await fetch(
      `${GOOGLE_AI_BASE_URL}/models/${model}:generateContent?key=${GOOGLE_AI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: geminiMessages,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_NONE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_NONE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_NONE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_NONE"
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      
      // Handle specific error cases
      if (response.status === 400 && errorData.includes('User location is not supported')) {
        throw new Error('Google AI API is not available in your current region. This is a geographical restriction from Google.');
      }
      
      if (response.status === 404 && errorData.includes('is not found')) {
        throw new Error(`Model ${model} is not available. Please check the model name.`);
      }
      
      throw new Error(`Google AI API request failed: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in Gemini completion:', error);
    throw new Error(`Failed to generate Gemini completion: ${error.message}`);
  }
}

export async function listAvailableModels(): Promise<any[]> {
  if (!GOOGLE_AI_API_KEY) {
    throw new Error('Google AI API key is not configured. Please set GOOGLE_AI_API_KEY in your environment variables.');
  }

  try {
    const response = await fetch(
      `${GOOGLE_AI_BASE_URL}/models?key=${GOOGLE_AI_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      
      if (response.status === 400 && errorData.includes('User location is not supported')) {
        throw new Error('Google AI API is not available in your current region. This is a geographical restriction from Google.');
      }
      
      throw new Error(`Failed to list models: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    return data.models || [];
  } catch (error) {
    console.error('Error listing models:', error);
    throw new Error(`Failed to list models: ${error.message}`);
  }
}

export async function generateGeminiImage(
  prompt: string,
  model: string = 'gemini-pro-vision'
): Promise<string> {
  if (!GOOGLE_AI_API_KEY) {
    throw new Error('Google AI API key is not configured. Please set GOOGLE_AI_API_KEY in your environment variables.');
  }

  try {
    // Note: Gemini doesn't generate images directly, but can analyze and describe images
    // For image generation, you might need a different service
    // This function can be used for image analysis or description
    
    const response = await fetch(
      `${GOOGLE_AI_BASE_URL}/models/${model}:generateContent?key=${GOOGLE_AI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Describe this image in detail: ${prompt}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Google AI API request failed: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const description = data.candidates[0]?.content?.parts[0]?.text || 'No description available';
    
    return description;
  } catch (error) {
    console.error('Error in Gemini image processing:', error);
    throw new Error(`Failed to process image with Gemini: ${error.message}`);
  }
}

// Simple text completion utility
export async function generateText(
  prompt: string,
  model: string = 'gemini-pro'
): Promise<string> {
  const messages: GeminiMessage[] = [
    { role: 'user', content: prompt }
  ];

  const response = await generateGeminiCompletion(messages, model);
  return response.candidates[0]?.content?.parts[0]?.text || 'No response generated';
}

// Chat completion utility
export async function chatWithGemini(
  userMessage: string,
  systemPrompt: string = 'You are a helpful assistant.',
  model: string = 'gemini-pro'
): Promise<string> {
  const messages: GeminiMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMessage }
  ];

  const response = await generateGeminiCompletion(messages, model);
  return response.candidates[0]?.content?.parts[0]?.text || 'No response generated';
}