# WebAssist

Turn your content into an interactive assistant.

WebAssist is a lightweight, FAQ-first chatbot for Next.js applications. It grounds answers in your own MDX content (no hallucinations), provides a clean UI widget, and gracefully falls back to a structured intake form when it can't help.

## Features

- **🛡️ No Hallucinations:** Answers are strictly grounded in your local Markdown/MDX files.
- **💬 Clean UI:** A modern, responsive chat widget and window built with Tailwind CSS and Framer Motion.
- **📥 Smart Fallback:** Automatically suggests an intake form when confidence is low.
- **💾 Persistent History:** Chats are saved to local storage so users don't lose context.
- **🚀 Ready to Deploy:** Built on Next.js 14+ (App Router) and Vercel.

## Quick Start

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/RW2023/webassist.git
    cd webassist
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000). The chat widget will appear in the bottom-right corner.

## Usage

### Adding Knowledge

Add your FAQ content as `.mdx` or `.md` files in `src/content/faqs/`.
The filename doesn't matter, but the content should be structured with H2 headers for questions:

```markdown
## What are your support hours?
We are available Monday to Friday, 9am to 5pm EST.

## How do I reset my password?
Go to the settings page and click "Reset Password".
```

### Configuration

The chatbot logic lives in `src/app/api/chat/route.ts`. You can customize:
- **Matching Logic:** currently uses a simple keyword match (`mdx-loader.ts`).
- **Confidence Threshold:** adjust when the bot switches to "fallback" mode.
- **Intake Form Destination:** Update `src/components/chat/IntakeForm.tsx` to send data to your actual CRM or email service (e.g., Formspree).

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

## License

MIT
