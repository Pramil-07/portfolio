# Agent Project Dossier: `portfolio`

Last updated: 2026-04-21

## 1) Project Overview

This repository is a personal portfolio web app for Pramil Dhungana.

It is a full-stack deployment with:
- A React + TypeScript + Vite frontend (`src/`)
- A Node + Express + TypeScript backend (`server/`)

The backend serves both:
- API endpoints under `/api/*`
- The built SPA from `dist/`

Core features:
- Animated portfolio sections (hero, projects, experience, skills, testimonials, contact)
- Contact form via EmailJS
- AI chat widget in hero section backed by a server-side Gemini integration

## 2) Tech Stack

### Frontend
- React 19
- TypeScript
- Vite 7
- Tailwind CSS v4 (`@tailwindcss/vite`)
- GSAP + ScrollTrigger
- Lottie (`lottie-react`)
- `react-hot-toast` for feedback

### Backend
- Node.js
- Express 5
- TypeScript
- Zod (request/env validation)
- express-rate-limit
- dotenv

### Deployment shape
- Single process app (`node server/dist/index.js`)
- `Procfile`: `web: node server/dist/index.js`
- Static frontend served by Express from root `dist/`

## 3) Repo Layout

- `src/main.tsx`: Frontend bootstrap
- `src/App.tsx`: Top-level section composition
- `src/sections/*`: Main page sections
- `src/components/*`: Reusable UI (includes `HeroChat.tsx`)
- `src/constants/*`: Content and typed data structures
- `server/src/index.ts`: Express app bootstrap and route mounting
- `server/src/routes/chat.ts`: `POST /api/ai/chat`
- `server/src/routes/health.ts`: `GET /api/health`
- `server/src/config/env.ts`: server env schema and validation
- `.env.example`: full env contract template

## 4) Runtime Architecture

### Frontend flow
- `App` renders sections in order and lazy-loads non-critical sections.
- `HeroChat` calls:
  - `POST ${VITE_API_BASE_URL}/api/ai/chat`
  - If `VITE_API_BASE_URL` is empty in production, same-origin is used.

### Backend flow
- `server/src/index.ts` mounts:
  - `GET /api/health`
  - `POST /api/ai/chat`
- `/api/ai/chat` pipeline:
  1. rate limit middleware
  2. request body validation (Zod)
  3. prompt generation + Gemini call
  4. normalized JSON response `{ reply, meta }`
- Non-API routes fallback to `dist/index.html` for SPA navigation.

## 5) Environment Contract

## Frontend (`VITE_*`)
- `VITE_APP_EMAILJS_SERVICE_ID`
- `VITE_APP_EMAILJS_TEMPLATE_ID`
- `VITE_APP_EMAILJS_PUBLIC_KEY`
- `VITE_API_BASE_URL` (optional; empty means same-origin in production)
- `VITE_PROFILE_NAME`
- `VITE_PROFILE_TITLE`
- `VITE_PROFILE_INITIALS`

Note: Contact form also accepts fallback names:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

These are build-time vars for Vite. They must exist before running frontend build.

## Backend (server-only)
- `PORT` (default `3000`)
- `GEMINI_API_KEY` (required)
- `GEMINI_MODEL` (default `gemini-2.5-flash-lite`)
- `AI_SYSTEM_PROMPT` (required)
- `AI_PROFILE_CONTEXT` (required)
- `AI_MAX_INPUT_CHARS` (default `1000`)
- `AI_RATE_LIMIT_WINDOW_MS` (default `60000`)
- `AI_RATE_LIMIT_MAX` (default `20`)

## 6) API Contract

## `GET /api/health`
Returns:
```json
{
  "status": "ok",
  "uptimeSeconds": 123
}
```

## `POST /api/ai/chat`
Request:
```json
{
  "message": "Tell me about your experience",
  "history": [
    { "role": "user", "text": "Hi" },
    { "role": "ai", "text": "Hello!" }
  ]
}
```

Success:
```json
{
  "reply": "Concise response...",
  "meta": { "model": "gemini-2.5-flash-lite", "provider": "gemini" }
}
```

Error statuses:
- `400` invalid payload
- `429` rate limited
- `502` provider unavailable
- `500` unexpected error

## 7) Scripts

## Root
- `npm run dev`: Vite dev server
- `npm run dev:server`: server dev watcher
- `npm run build:client`: build frontend
- `npm run build:server`: build backend
- `npm run build`: build client + server
- `npm run preview`: preview frontend build
- `npm run start`: start Express server from `server/dist`
- `npm run heroku-postbuild`: install server deps + build

## Server
- `npm --prefix server run dev`
- `npm --prefix server run build`
- `npm --prefix server run start`

## 8) Local Runbook

1. Install dependencies:
```bash
npm install
npm --prefix server install
```

2. Set env vars from `.env.example`.

3. Dev mode (two terminals):
```bash
npm run dev:server
npm run dev
```

4. Production-like local run:
```bash
npm run build
npm start
```

## 9) Deployment Notes

- Deployment target is a single Node web process.
- Build must run with frontend `VITE_*` env vars already defined.
- Express serves both API and SPA.
- `Procfile` points to `server/dist/index.js`.

## 10) Known Risks / Gotchas

- Node version: Vite 7 requires modern Node (20.19+ or 22.12+). Using older Node can break builds.
- EmailJS: if service/template/public key is missing at build time, contact form shows configuration errors.
- This project is content-heavy; many UI elements depend on data in `src/constants/index.ts` and assets in `public/`.

## 11) Recommended Agent Workflow

When working on this repo:
1. Check `src/constants/index.ts` and `public/` together for content/asset consistency.
2. Run `npm run lint` and `npm run build` after meaningful changes.
3. If editing chat/backend behavior, verify both:
   - `POST /api/ai/chat` response shape
   - `src/components/HeroChat.tsx` expectations
4. If editing contact flow, verify env names and EmailJS configuration.

