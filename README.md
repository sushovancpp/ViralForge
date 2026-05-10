# AI Social Media Manager

Generate platform-perfect social media content using Groq AI (llama-3.3-70b-versatile).

## Features

- **Instagram Captions** — Engaging hooks, CTAs, and emoji
- **YouTube Titles** — 5 SEO-optimized click-worthy title options
- **LinkedIn Posts** — Professional thought leadership content
- **Hashtag Sets** — 30 strategic hashtags (high/medium/niche volume)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure your Groq API key

Copy the example env file and add your key:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
GROQ_API_KEY=gsk_your_actual_groq_api_key_here
```

Get your free API key at: https://console.groq.com

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Next.js 14** — App Router, API Routes
- **Groq SDK** — Ultra-fast inference
- **Model** — llama-3.3-70b-versatile
- **Tailwind CSS** — Styling
- **TypeScript** — Type safety

## Project Structure

```
social-media-manager/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts      # Groq API handler
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main UI
├── .env.local.example        # Environment template
├── next.config.js
├── tailwind.config.js
└── package.json
```

## Customization

Edit `app/api/generate/route.ts` to:
- Change the AI model (`model` field)
- Adjust prompts per platform (`PLATFORM_PROMPTS`)
- Tune `temperature` (0.7–1.0 for creative content)
