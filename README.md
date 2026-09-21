# Sandeep Rai — Portfolio

A single-page, purely frontend portfolio for Sandeep Rai, Senior Frontend & AI-Driven App
Engineer. Visual style modeled after the dark, terminal/tech aesthetic of rubenmarcus.dev —
deep charcoal background, glassmorphism cards, monospace accents, subtle glowing highlights,
and Framer Motion-driven entrance animations.

## Stack

- **Next.js 16** (App Router, static/SSG) + **TypeScript**
- **Tailwind CSS v4** — neutral dark palette (`neutral-950` bg / `neutral-800` borders)
- **Framer Motion** — scroll reveals, expandable cards, accordion, animated counters
- **lucide-react** — icons
- Fonts via `next/font/google`: Geist (display), Inter (body), JetBrains Mono (data/code)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing your content

Everything text-based — name, summary, services, metrics, experience, stack, projects,
contact links, and the AGENTS.md snippet — lives in one file: `src/data/resume.ts`.
Edit that file and the whole site updates.

A static machine-readable copy also lives at `public/AGENTS.md` (served at `/AGENTS.md`).

## Sections / components

- `src/components/Navbar.tsx` — sticky blur header with numbered links + mobile menu
- `src/components/Hero.tsx` — availability badge, headline, CTAs, terminal "code" panel
- `src/components/Ticker.tsx` — scrolling status marquee
- `src/components/Services.tsx` — 3 expandable capability cards
- `src/components/Metrics.tsx` — animated counters + past brands badges
- `src/components/Experience.tsx` — interactive accordion timeline with tech + metrics
- `src/components/Stack.tsx` — categorized tech stack grid
- `src/components/Projects.tsx` — selected project cards
- `src/components/AgentsBlock.tsx` — AGENTS.md code box with "Copy" button
- `src/components/Contact.tsx` — contact links + form (posts to `/api/contact`) + footer
- `src/app/api/contact/route.ts` — serverless POST handler that sends a Telegram notification

Design tokens (colors, fonts) are CSS variables in `src/app/globals.css`.

## Deploying

```bash
npm install -g vercel
vercel
```

Or push to GitHub and import at vercel.com/new — Next.js is auto-detected. The page is fully
static-friendly; run `npm run build` to confirm.

## Notes

- Replace `metadataBase` in `src/app/layout.tsx` with your real domain once you have one.
- The contact form posts to `src/app/api/contact/route.ts`, which sends a Telegram
  notification on every submission. It needs `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`
  (see below), so it requires a server runtime — static-only hosts (GitHub Pages or
  `output: "export"`) won't support it.

## Contact form → Telegram notifications

Every form submission is delivered as a plain Telegram message with the visitor's name,
mobile number, email (optional — shown as "Not provided" if omitted), and message.
Setup takes ~3 minutes:

1. In Telegram, message [@BotFather](https://t.me/BotFather) → `/newbot` → copy the token.
2. Open a chat with your new bot and send it any message (a bot can't message you first).
3. Get your chat id:

   ```bash
   curl -s "https://api.telegram.org/bot<TOKEN>/getUpdates"
   ```

   Copy `result[0].message.chat.id` from the response.
4. Copy `.env.example` to `.env.local` and fill in `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`.
   For production, add the same two vars in Vercel (Project → Settings → Environment
   Variables, Production + Preview) and redeploy.

Test locally with:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","mobile":"+91 9876543210","email":"t@example.com","message":"Hello there testing 123"}'
```
