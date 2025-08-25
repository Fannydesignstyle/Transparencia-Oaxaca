import { testConnection } from './src/lib/zai-test.ts';

console.log('🚀 Starting Z-AI Connection Test');
console.log('================================');

testConnection().then((result) => {
  console.log('\n📊 Test Results:');
  console.log('================================');
  if (result.success) {
    console.log('✅ SUCCESS: Z-AI connection is working!');
    console.log('💬 Chat response:', result.chat);
  } else {
    console.log('❌ FAILED: Z-AI connection test failed');
    console.log('🔍 Error:', result.error);
  }
  console.log('================================');
}).catch((error) => {
  console.error('💥 Critical error during test:', error);
});