const GOOGLE_AI_API_KEY = 'AIzaSyD51XE_X_JTMS5rTYgU1cJC243nAkvxnME';
const GOOGLE_AI_BASE_URL = 'https://generativelanguage.googleapis.com/v1';

async function testGoogleAI() {
  console.log('🔄 Testing Google AI (Gemini) connection...');
  
  try {
    const response = await fetch(
      `${GOOGLE_AI_BASE_URL}/models/gemini-pro:generateContent?key=${GOOGLE_AI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: 'Hello! Please respond with "Google AI API is working correctly!"'
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 256,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Google AI API request failed: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0]?.content?.parts[0]?.text;
    
    console.log('✅ Google AI test successful!');
    console.log('📝 Response:', generatedText);
    
    return true;
    
  } catch (error) {
    console.error('❌ Google AI test failed:', error.message);
    return false;
  }
}

console.log('🚀 Starting Google AI (Gemini) Connection Test');
console.log('================================');

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