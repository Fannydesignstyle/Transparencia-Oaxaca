import ZAI from 'z-ai-web-dev-sdk';

async function testChat() {
  try {
    console.log('Iniciando prueba de chat...');
    const zai = await ZAI.create();
    console.log('ZAI instance created successfully');

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.'
        },
        {
          role: 'user',
          content: 'Hello! Please respond with "API is working correctly!"'
        }
      ],
    });

    console.log('Full API Response:', completion);
    const messageContent = completion.choices[0]?.message?.content;
    if (messageContent) {
      console.log('Assistant says:', messageContent);
    }

  } catch (error) {
    console.error('Error occurred:', error.message);
    if (error.cause) {
      console.error('Cause:', error.cause);
    }
  }
}

testChat();