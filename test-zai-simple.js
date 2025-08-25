import ZAI from 'z-ai-web-dev-sdk';

async function testConnection() {
  console.log('🔄 Testing Z-AI connection...');
  
  try {
    const zai = await ZAI.create();
    console.log('✅ ZAI instance created successfully');
    
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
    
    return true;
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    return false;
  }
}

console.log('🚀 Starting Z-AI Connection Test');
console.log('================================');

testConnection().then((success) => {
  console.log('\n📊 Test Results:');
  console.log('================================');
  if (success) {
    console.log('✅ SUCCESS: Z-AI connection is working!');
  } else {
    console.log('❌ FAILED: Z-AI connection test failed');
    console.log('💡 The service might still be deploying. Please try again later.');
  }
  console.log('================================');
}).catch((error) => {
  console.error('💥 Critical error during test:', error);
});