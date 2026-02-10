import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Mock response logic for now
    // In Phase 3, we will integrate the actual retrieval logic
    
    let responseText = "I'm a simple bot for now. I can answer FAQs once fully connected.";

    if (message.toLowerCase().includes('hello')) {
      responseText = "Hi there! How can I help you today?";
    } else if (message.toLowerCase().includes('contact')) {
      responseText = "You can contact support at support@webassist.com.";
    }

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
