import ZAI from 'z-ai-web-dev-sdk';

// Singleton pattern for ZAI instance
let zaiInstance: any = null;

export async function getZAIInstance() {
  if (!zaiInstance) {
    try {
      zaiInstance = await ZAI.create();
      console.log('✅ ZAI instance created successfully');
    } catch (error) {
      console.error('❌ Error creating ZAI instance:', error);
      throw new Error('Failed to initialize ZAI SDK');
    }
  }
  return zaiInstance;
}

export async function testConnection() {
  try {
    console.log('🔄 Testing Z-AI connection...');
    const zai = await getZAIInstance();
    
    // Test chat completion
    console.log('💬 Testing chat completion...');
    const chatResponse = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.'
        },
        {
          role: 'user',
          content: 'Hello! Please respond with "Connection test successful!"'
        }
      ],
    });

    const chatMessage = chatResponse.choices[0]?.message?.content;
    console.log('✅ Chat test successful:', chatMessage);

    // Test image generation
    console.log('🎨 Testing image generation...');
    try {
      const imageResponse = await zai.images.generations.create({
        prompt: 'A simple test image',
        size: '1024x1024'
      });
      console.log('✅ Image generation test successful');
    } catch (imageError) {
      console.log('⚠️  Image generation test failed:', imageError.message);
    }

    // Test web search
    console.log('🔍 Testing web search...');
    try {
      const searchResponse = await zai.functions.invoke("web_search", {
        query: "test query",
        num: 1
      });
      console.log('✅ Web search test successful');
    } catch (searchError) {
      console.log('⚠️  Web search test failed:', searchError.message);
    }

    return {
      success: true,
      chat: chatMessage,
      message: 'All tests completed'
    };

  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    return {
      success: false,
      error: error.message,
      message: 'Connection test failed'
    };
  }
}

// Export the original functions with error handling
export async function generateChatCompletion(messages: Array<{role: string, content: string}>) {
  try {
    const zai = await getZAIInstance();
    const completion = await zai.chat.completions.create({
      messages,
    });
    return completion;
  } catch (error) {
    console.error('Error in chat completion:', error);
    throw new Error('Failed to generate chat completion: ' + error.message);
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
    throw new Error('Failed to generate image: ' + error.message);
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
    throw new Error('Failed to perform web search: ' + error.message);
  }
}