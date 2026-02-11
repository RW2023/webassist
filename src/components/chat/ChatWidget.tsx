'use client';

import { MessageCircle, X } from 'lucide-react';
import { useChat } from './useChat';
import { ChatWindow } from './ChatWindow';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

export function ChatWidget() {
    const {
        isOpen,
        toggleChat,
        messages,
        isLoading,
        sendMessage,
        userApiKey,
        setUserApiKey,
        accessPassword,
        setAccessPassword
    } = useChat();

    return (
        <>
            <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
                <AnimatePresence>
                    {isOpen && (
                        <ChatWindow
                            messages={messages}
                            isLoading={isLoading}
                            onSendMessage={sendMessage}
                            onClose={toggleChat}
                            userApiKey={userApiKey}
                            setUserApiKey={setUserApiKey}
                            accessPassword={accessPassword}
                            setAccessPassword={setAccessPassword}
                        />
                    )}
                </AnimatePresence>

                <button
                    onClick={toggleChat}
                    className={clsx(
                        "flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95",
                        isOpen ? "bg-gray-200 text-gray-800" : "bg-black text-white hover:bg-gray-800"
                    )}
                    aria-label={isOpen ? "Close chat" : "Open chat"}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
                </button>
            </div>
        </>
    );
}
