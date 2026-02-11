import { NextResponse } from 'next/server';
import { getFAQContent, findRelevantContent } from '@/lib/chat/mdx-loader';
import OpenAI from 'openai';
import { CHATBOT_CONFIG } from '@/config/chatbot';

// Initialize OpenAI Client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 1. Search Knowledge Base
    const faqs = getFAQContent();
    const relevantContext = findRelevantContent(message, faqs);

    // 2. Prepare System Prompt
    const systemPrompt = `
${CHATBOT_CONFIG.systemPrompt}

Context:
${relevantContext || "No relevant context found."}
    `;

    // 3. Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Cost-effective and fast
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.1, // Low temperature for factual consistency
    });

    const responseText = completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";

    // Simple heuristic: If response mentions "contact support" or similar, suggest intake
    // Or if context was not used.
    let action = undefined;
    if (!relevantContext || responseText.toLowerCase().includes('contact support')) {
        action = 'intake';
    }

    return NextResponse.json({ 
      response: responseText,
      contextUsed: !!relevantContext,
      action
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
