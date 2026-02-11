import { useState, useEffect, useCallback } from 'react';

export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  action?: 'intake';
};

export type ChatState = {
  messages: Message[];
  isOpen: boolean;
  isLoading: boolean;
  userApiKey?: string;
  accessPassword?: string;
};

const STORAGE_KEY = 'chat_storage_v1';

export function useChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userApiKey, setUserApiKey] = useState<string | undefined>(undefined);
  const [accessPassword, setAccessPassword] = useState<string | undefined>(undefined);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.messages || []);
        setIsOpen(parsed.isOpen || false);
        setUserApiKey(parsed.userApiKey || undefined);
        setAccessPassword(parsed.accessPassword || undefined);
      } catch (e) {
        console.error('Failed to load chat history', e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    // Only save if we have messages or state changed
    // Debouncing could be added here if needed
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, isOpen, userApiKey, accessPassword }));
  }, [messages, isOpen, userApiKey, accessPassword]);

  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), []);

  const addMessage = useCallback((role: Message['role'], content: string, action?: Message['action']) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role,
      content,
      action,
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
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (userApiKey) {
        headers['x-openai-api-key'] = userApiKey;
      }

      if (accessPassword) {
        headers['x-access-password'] = accessPassword;
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      addMessage('assistant', data.response, data.action); // Pass action if present
    } catch (error) {
      console.error('Failed to send message:', error);
      addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [addMessage, userApiKey, accessPassword]);

  return {
    isOpen,
    toggleChat,
    messages,
    isLoading,
    sendMessage,
    clearChat,
    addMessage,
    userApiKey,
    setUserApiKey,
    accessPassword,
    setAccessPassword,
  };
}
