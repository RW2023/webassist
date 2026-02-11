/**
 * Chatbot Configuration
 * 
 * Edit this file to customize the chatbot's identity, behavior, and links.
 */
export const CHATBOT_CONFIG = {
  // Identity
  name: "WebAssist",
  description: "Your friendly neighborhood AI assistant.",
  
  // Welcome Message
  welcomeMessage: "Hello! checking in. How can I help you today?",
  
  // System Prompt for AI
  systemPrompt: `
You are a helpful and friendly AI assistant for WebAssist.
Your goal is to answer user questions based ONLY on the provided context.

Instructions:
- If the answer is found in the context, answer clearly and concisely.
- If the answer is NOT in the context, politely say "I'm not sure about that" and suggest they contact support.
- Do NOT make up information (hallucinate).
- If the context is empty, guide them to use the fallback form.
  `,

  // Interface Text
  inputPlaceholder: "Type your question...",
  fallbackButtonText: "Contact Dev",
  
  intake: {
    title: "Contact Developer",
    subtitle: "Send a message directly to the developer.",
    successMessage: "Message sent! We'll get back to you soon.",
    formspreeId: "xbdkelky",
  },

  // Social / Links (used in Landing Page)
  links: {
    github: "https://github.com/RW2023/webassist",
    demo: "https://webassist-demo.vercel.app",
  }
};
