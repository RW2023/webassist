import { useState, useEffect, useCallback } from 'react';

export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type ChatState = {
  messages: Message[];
  isOpen: boolean;
  isLoading: boolean;
};

const STORAGE_KEY = 'chat_storage_v1';

export function useChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.messages || []);
        setIsOpen(parsed.isOpen || false);
      } catch (e) {
        console.error('Failed to load chat history', e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    // Only save if we have messages or state changed
    // Debouncing could be added here if needed
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, isOpen }));
  }, [messages, isOpen]);

  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), []);

  const addMessage = useCallback((role: Message['role'], content: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role,
      content,
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    addMessage('user', content);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      addMessage('assistant', data.response); // Assuming API returns { response: string }
    } catch (error) {
      console.error('Failed to send message:', error);
      addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [addMessage]);

  return {
    isOpen,
    toggleChat,
    messages,
    isLoading,
    sendMessage,
    clearChat,
    addMessage, // Exporting for flexibility
  };
}
