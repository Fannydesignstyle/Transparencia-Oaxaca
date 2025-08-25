import ZAI from 'z-ai-web-dev-sdk';

// Singleton pattern for ZAI instance
let zaiInstance: any = null;

export async function getZAIInstance() {
  if (!zaiInstance) {
    try {
      zaiInstance = await ZAI.create();
    } catch (error) {
      console.error('Error creating ZAI instance:', error);
      throw new Error('Failed to initialize ZAI SDK');
    }
  }
  return zaiInstance;
}

export async function generateChatCompletion(messages: Array<{role: string, content: string}>) {
  try {
    const zai = await getZAIInstance();
    const completion = await zai.chat.completions.create({
      messages,
      // You can add additional parameters like temperature, max_tokens, etc.
    });
    return completion;
  } catch (error) {
    console.error('Error in chat completion:', error);
    throw new Error('Failed to generate chat completion');
  }
}

export async function generateImage(prompt: string, size: string = '1024x1024') {
  try {
    const zai = await getZAIInstance();
    const response = await zai.images.generations.create({
      prompt,
      size,
    });
    return response;
  } catch (error) {
    console.error('Error in image generation:', error);
    throw new Error('Failed to generate image');
  }
}

export async function webSearch(query: string, num: number = 10) {
  try {
    const zai = await getZAIInstance();
    const searchResult = await zai.functions.invoke("web_search", {
      query,
      num,
    });
    return searchResult;
  } catch (error) {
    console.error('Error in web search:', error);
    throw new Error('Failed to perform web search');
  }
}