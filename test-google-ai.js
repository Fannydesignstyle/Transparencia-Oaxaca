import { generateText, chatWithGemini } from './src/lib/google-ai.ts';

console.log('🚀 Starting Google AI (Gemini) Connection Test');
console.log('================================');

async function testGoogleAI() {
  try {
    console.log('🔄 Testing simple text generation...');
    
    const testResponse = await generateText(
      'Hello! Please respond with "Google AI API is working correctly!"'
    );
    
    console.log('✅ Text generation successful!');
    console.log('📝 Response:', testResponse);
    
    console.log('\n🔄 Testing chat functionality...');
    
    const chatResponse = await chatWithGemini(
      'What is transparency in government?',
      'You are a helpful assistant that explains concepts clearly and concisely.'
    );
    
    console.log('✅ Chat functionality successful!');
    console.log('💬 Chat response:', chatResponse);
    
    console.log('\n🎉 All Google AI tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ Google AI test failed:', error.message);
    return false;
  }
}

testGoogleAI().then((success) => {
  console.log('\n📊 Test Results:');
  console.log('================================');
  if (success) {
    console.log('✅ SUCCESS: Google AI (Gemini) connection is working!');
  } else {
    console.log('❌ FAILED: Google AI connection test failed');
    console.log('💡 Please check your API key and internet connection.');
  }
  console.log('================================');
}).catch((error) => {
  console.error('💥 Critical error during test:', error);
});