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
- `src/components/Contact.tsx` — contact links + pure-frontend form + footer

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
- The contact form is intentionally frontend-only (no backend); the footer shows direct
  email/phone links for real outreach.
