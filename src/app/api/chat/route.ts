import { NextResponse } from 'next/server';
import { getFAQContent, findRelevantcontent } from '@/lib/chat/mdx-loader';
import OpenAI from 'openai';

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
    const relevantContext = findRelevantcontent(message, faqs);

    // 2. Prepare System Prompt
    const systemPrompt = `
You are a helpful and friendly AI assistant for WebAssist.
Your goal is to answer user questions based ONLY on the provided context.

Context:
${relevantContext || "No relevant context found."}

Instructions:
- If the answer is found in the context, answer clearly and concisely.
- If the answer is NOT in the context, politely say "I'm not sure about that" and suggest they contact support.
- Do NOT make up information (hallucinate).
- Keep answers short (under 3 sentences) unless detailed explanation is needed.
- If the context is empty, guide them to use the fallback form.
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
