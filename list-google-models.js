const GOOGLE_AI_API_KEY = 'AIzaSyD51XE_X_JTMS5rTYgU1cJC243nAkvxnME';

async function listModels() {
  console.log('🔄 Listing available Google AI models...');
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${GOOGLE_AI_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Google AI API request failed: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('✅ Models retrieved successfully!');
    console.log('📋 Available models:');
    
    if (data.models && data.models.length > 0) {
      data.models.forEach((model, index) => {
        console.log(`${index + 1}. ${model.name}`);
        if (model.supportedGenerationMethods) {
          console.log(`   Methods: ${model.supportedGenerationMethods.join(', ')}`);
        }
      });
    } else {
      console.log('No models found');
    }
    
    return data.models;
    
  } catch (error) {
    console.error('❌ Failed to list models:', error.message);
    return null;
  }
}

console.log('🚀 Listing Google AI Models');
console.log('================================');

listModels().then((models) => {
  console.log('\n📊 Results:');
  console.log('================================');
  if (models && models.length > 0) {
    console.log(`✅ Found ${models.length} available models`);
  } else {
    console.log('❌ No models found or API key invalid');
  }
  console.log('================================');
}).catch((error) => {
  console.error('💥 Critical error during model listing:', error);
});