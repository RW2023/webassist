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
    const customApiKey = req.headers.get('x-openai-api-key');
    const accessPassword = req.headers.get('x-access-password');

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Gated Access Logic:
    const serverAccessPassword = process.env.ACCESS_PASSWORD?.trim();
    const normalizedAccessPassword = accessPassword?.trim();
    const canUseServerKey = serverAccessPassword && normalizedAccessPassword === serverAccessPassword;

    if (!customApiKey && !canUseServerKey) {
      return NextResponse.json(
        { error: 'Unauthorized: Please provide an OpenAI API key or an access password in settings.' },
        { status: 401 }
      );
    }

    // Initialize OpenAI Client dynamically
    const client = new OpenAI({
      apiKey: customApiKey || process.env.OPENAI_API_KEY,
    });

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
    const completion = await client.chat.completions.create({
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
