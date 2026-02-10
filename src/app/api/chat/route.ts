import { NextResponse } from 'next/server';
import { getFAQContent, findRelevantcontent } from '@/lib/chat/mdx-loader';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 1. Search Knowledge Base
    // Note: In a real app, you'd cache getFAQContent() or use a vector DB.
    // For this lightweight version, file system read is fine (Next.js caches in prod).
    const faqs = getFAQContent();
    const relevantContext = findRelevantcontent(message, faqs);

    // 2. Generate Response (Mocked LLM Logic)
    // If context found, answer based on it.
    // If not, trigger fallback/intake suggestion.
    
    let responseText = "";

    if (relevantContext) {
      // Prompt construction logic would go here if calling an LLM API
      // const prompt = `Context: ${relevantContext}\n\nQuestion: ${message}`;
      
      responseText = `Here is what I found:\n\n${relevantContext}\n\nDoes this help?`;
    } else {
      // Fallback
      responseText = "I'm not sure about that. " + 
        "Could you rephrase your question? Or would you like to speak to a human?";
      
      // Hint: The client could detect "speak to a human" to show a button, 
      // or we can explicitly return a flag like { action: 'intake' }
    }

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({ 
      response: responseText,
      contextUsed: !!relevantContext 
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
