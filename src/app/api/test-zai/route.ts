import { NextRequest, NextResponse } from 'next/server';
import { generateChatCompletion } from '@/lib/zai';

export async function GET(request: NextRequest) {
  try {
    // Test the ZAI API connection
    const response = await generateChatCompletion([
      {
        role: 'system',
        content: 'You are a helpful assistant.'
      },
      {
        role: 'user',
        content: 'Hello! Please respond with "Z-AI API is working correctly!"'
      }
    ]);

    const messageContent = response.choices[0]?.message?.content;
    
    return NextResponse.json({
      success: true,
      message: 'Z-AI API test successful',
      response: messageContent
    });
  } catch (error) {
    console.error('Z-AI API test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Z-AI API test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}