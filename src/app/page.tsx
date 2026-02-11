'use client';

import { Github, MessageSquare, Shield, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      {/* Navigation */}
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
              <MessageSquare size={18} />
            </span>
            WebAssist
          </div>
          <Link
            href="https://github.com/RW2023/webassist"
            target="_blank"
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            <Github size={18} />
            <span className="hidden sm:inline">View on GitHub</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="group mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6">
              Turn your content into an <br className="hidden sm:block" />
              <span className="relative inline-block text-blue-600">
                interactive assistant
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              This is a <strong>Next.js Chatbot Template</strong> designed to help developers quickly integrate AI assistance into their applications. It grounds answers in your MDX content and provides a seamless fallback to a developer contact form.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="https://github.com/RW2023/webassist"
                target="_blank"
                className="flex items-center gap-2 rounded-full bg-black px-8 py-3 text-base font-medium text-white shadow-lg shadow-black/20 transition-all hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl"
              >
                <Github size={20} />
                Star on GitHub
              </Link>
              <button
                onClick={() => document.querySelector('[aria-label="Toggle chat"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}
                className="flex items-center gap-2 rounded-full px-8 py-3 text-base font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Try the Demo <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-gray-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/50 transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Instant Answers</h3>
                <p className="mt-2 text-gray-600">
                  Uses your existing MDX/Markdown content as a knowledge base. No external vector DB required for simple use cases.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/50 transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No Hallucinations</h3>
                <p className="mt-2 text-gray-600">
                  Strictly grounded in your content. If the bot doesn't know, it admits it and offers a human fallback immediately.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/50 transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Smart Fallback</h3>
                <p className="mt-2 text-gray-600">
                  Seamlessly transitions from chat to a structured intake form when user needs complex help, delivering structured data to your team.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center text-gray-500 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} WebAssist. Open source and ready to fork.</p>
        </div>
      </footer>
    </div>
  );
}
