# Interview Question Generator

AI-powered interview question generator. Enter any job title and get 3 thoughtful interview questions tailored to that role.

Built with [Next.js](https://nextjs.org) and the [OpenRouter](https://openrouter.ai) API.

## Getting Started

1. Clone and install dependencies:

```bash
npm install
```

2. Add your OpenRouter API key to `.env.local`:

```
OPENROUTER_API_KEY=sk-or-v1-...
```

3. Start the dev server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000), type a job title, and click **Generate**.

## How it works

- The frontend sends the job title to `/api/generate-questions`
- The server calls OpenRouter's API (`openai/gpt-4o-mini`) with a prompt asking for 3 interview questions
- The response is parsed and displayed as a numbered list

## Deploy

Deploy on [Vercel](https://vercel.com/new) — just add the `OPENROUTER_API_KEY` environment variable in your project settings.
