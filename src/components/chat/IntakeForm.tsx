'use client';

import { useState } from 'react';
import { Send, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface IntakeFormProps {
  onCancel: () => void;
  onSubmitSuccess: () => void;
}

export function IntakeForm({ onCancel, onSubmitSuccess }: IntakeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Replace with your Formspree Endpoint or API Route
      // For now, we simulate a successful submission
      // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', ...);

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating network

      // if (!response.ok) throw new Error('Submission failed');

      onSubmitSuccess();
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex h-full flex-col bg-white p-4"
    >
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={onCancel}
          className="rounded-full p-1 hover:bg-gray-100"
          type="button"
        >
          <ArrowLeft size={20} />
        </button>
        <h3 className="font-semibold">Contact Support</h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">Name</label>
          <input
            required
            type="text"
            name="name"
            id="name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input
            required
            type="email"
            name="email"
            id="email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="jane@example.com"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">Message</label>
          <textarea
            required
            name="message"
            id="message"
            className="h-full max-h-[150px] w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="How can we help?"
          />
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            <>
              Send Message <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
