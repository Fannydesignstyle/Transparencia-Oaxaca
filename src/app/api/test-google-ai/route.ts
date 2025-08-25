import { NextRequest, NextResponse } from 'next/server';
import { chatWithGemini, generateText } from '@/lib/google-ai';

export async function GET(request: NextRequest) {
  try {
    // Test simple text generation
    console.log('🔄 Testing Google AI (Gemini) connection...');
    
    const testResponse = await generateText(
      'Hello! Please respond with "Google AI API is working correctly!"'
    );

    console.log('✅ Google AI test successful:', testResponse);

    return NextResponse.json({
      success: true,
      message: 'Google AI API test successful',
      response: testResponse,
      provider: 'Google AI (Gemini)'
    });

  } catch (error) {
    console.error('❌ Google AI API test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Google AI API test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      provider: 'Google AI (Gemini)'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, systemPrompt } = body;

    if (!message) {
      return NextResponse.json({
        success: false,
        message: 'Message is required'
      }, { status: 400 });
    }

    const response = await chatWithGemini(
      message,
      systemPrompt || 'You are a helpful assistant for the Transparencia Oaxaca platform.'
    );

    return NextResponse.json({
      success: true,
      message: 'Chat completion successful',
      response: response,
      provider: 'Google AI (Gemini)'
    });

  } catch (error) {
    console.error('❌ Google AI chat completion failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Chat completion failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      provider: 'Google AI (Gemini)'
    }, { status: 500 });
  }
}