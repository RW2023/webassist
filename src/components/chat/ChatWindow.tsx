'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, Loader2, User, Bot, HelpCircle, Settings, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import type { Message } from './useChat';
import { IntakeForm } from './IntakeForm';
import { CHATBOT_CONFIG } from '@/config/chatbot';

interface ChatWindowProps {
    messages: Message[];
    isLoading: boolean;
    onSendMessage: (content: string) => void;
    onClose: () => void;
    userApiKey?: string;
    setUserApiKey: (key: string | undefined) => void;
    accessPassword?: string;
    setAccessPassword: (password: string | undefined) => void;
}

export function ChatWindow({
    messages,
    isLoading,
    onSendMessage,
    onClose,
    userApiKey,
    setUserApiKey,
    accessPassword,
    setAccessPassword
}: ChatWindowProps) {
    const [input, setInput] = useState('');
    const [showIntake, setShowIntake] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [tempKey, setTempKey] = useState(userApiKey || '');
    const [tempPassword, setTempPassword] = useState(accessPassword || '');
    const scrollRef = useRef<HTMLDivElement>(null);

    // Update temp states when props change
    useEffect(() => {
        setTempKey(userApiKey || '');
        setTempPassword(accessPassword || '');
    }, [userApiKey, accessPassword]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        onSendMessage(input);
        setInput('');
    };

    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();
        setUserApiKey(tempKey.trim() || undefined);
        setAccessPassword(tempPassword.trim() || undefined);
        setShowSettings(false);
    };

    const handleIntakeSuccess = () => {
        setShowIntake(false);
        onSendMessage(CHATBOT_CONFIG.intake.successMessage);
    };

    if (showIntake) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:w-[400px]"
            >
                <IntakeForm onCancel={() => setShowIntake(false)} onSubmitSuccess={handleIntakeSuccess} />
            </motion.div>
        );
    }

    if (showSettings) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:w-[400px]"
            >
                <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
                    <h3 className="text-sm font-semibold">Settings</h3>
                    <button onClick={() => setShowSettings(false)} className="rounded-full p-1 hover:bg-gray-200">
                        <X size={18} />
                    </button>
                </div>
                <div className="flex-1 p-6 space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                            <Key size={12} /> Bring Your Own Key (Optional)
                        </label>
                        <p className="text-xs text-gray-400">
                            Provide your own OpenAI API key to use the chatbot. If left empty, the developer's key will be used.
                        </p>
                        <form onSubmit={handleSaveSettings} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">OpenAI API Key</label>
                                <input
                                    type="password"
                                    value={tempKey}
                                    onChange={(e) => setTempKey(e.target.value)}
                                    placeholder="sk-..."
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-black focus:outline-none"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Access Password</label>
                                <input
                                    type="password"
                                    value={tempPassword}
                                    onChange={(e) => setTempPassword(e.target.value)}
                                    placeholder="Enter access password"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-black focus:outline-none"
                                />
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button
                                    type="submit"
                                    className="flex-1 rounded-lg bg-black py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                                >
                                    Save Settings
                                </button>
                                {(userApiKey || accessPassword) && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUserApiKey(undefined);
                                            setAccessPassword(undefined);
                                            setShowSettings(false);
                                        }}
                                        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:w-[400px]"
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                        <Bot size={18} />
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <h3 className="font-semibold text-sm">{CHATBOT_CONFIG.name}</h3>
                            {(userApiKey || accessPassword) && (
                                <div
                                    className={clsx(
                                        "h-1.5 w-1.5 rounded-full animate-pulse",
                                        userApiKey ? "bg-green-500" : "bg-blue-500"
                                    )}
                                    title={userApiKey ? "Using your custom API key" : "Access password active"}
                                />
                            )}
                        </div>
                        <button
                            onClick={() => setShowIntake(true)}
                            className="text-xs text-blue-600 hover:underline"
                        >
                            {CHATBOT_CONFIG.fallbackButtonText}
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setShowSettings(true)}
                        className="rounded-full p-1.5 text-gray-500 hover:bg-gray-200"
                        title="Settings"
                    >
                        <Settings size={18} />
                    </button>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1.5 text-gray-500 hover:bg-gray-200"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto bg-gray-50/50 p-4 space-y-4"
            >
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
                        <HelpCircle className="mb-2 h-10 w-10 text-gray-300" />
                        <p className="text-sm">No messages yet.</p>
                        <p className="text-xs">{CHATBOT_CONFIG.welcomeMessage}</p>
                    </div>
                )}

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={clsx(
                            "flex w-full",
                            msg.role === 'user' ? "justify-end" : "justify-start"
                        )}
                    >
                        <div
                            className={clsx(
                                "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                                msg.role === 'user'
                                    ? "bg-black text-white rounded-br-none"
                                    : "bg-white border border-gray-100 text-gray-800 shadow-sm rounded-bl-none"
                            )}
                        >
                            {msg.content}
                            {msg.action === 'intake' && (
                                <button
                                    onClick={() => setShowIntake(true)}
                                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
                                >
                                    {CHATBOT_CONFIG.fallbackButtonText}
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex items-center gap-1 rounded-2xl rounded-bl-none bg-white border border-gray-100 px-4 py-3 shadow-sm">
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></span>
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></span>
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"></span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="border-t bg-white p-3">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={CHATBOT_CONFIG.inputPlaceholder}
                        className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </button>
                </form>
            </div>
        </motion.div>
    );
}
