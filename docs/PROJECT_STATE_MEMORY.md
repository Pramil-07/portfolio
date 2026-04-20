# Project State Memory

Last updated: 2026-04-20

## Current Architecture Snapshot
- Frontend: Vite + React 19 + TypeScript in `src/`.
- Chat UI: `src/components/HeroChat.tsx` integrated in hero section.
- Deployment baseline before backend migration: static `dist` served on Heroku.

## New Target Architecture (Implemented)
- Single Heroku app runs one Node web process.
- Express backend serves:
  - API endpoints under `/api/*`
  - Frontend static files from `dist/`
  - SPA fallback to `dist/index.html`
- Gemini calls are now server-side only.

## Env Contract

| Variable | Scope | Purpose |
|---|---|---|
| `VITE_APP_EMAILJS_TEMPLATE_ID` | Client-safe | EmailJS template ID |
| `VITE_APP_EMAILJS_PUBLIC_KEY` | Client-safe | EmailJS public key |
| `VITE_APP_EMAILJS_SERVICE_ID` | Client-safe | EmailJS service ID |
| `VITE_API_BASE_URL` | Client-safe | Optional frontend API base URL; empty = same origin |
| `VITE_PROFILE_NAME` | Client-safe | Hero chat header display name |
| `VITE_PROFILE_TITLE` | Client-safe | Hero chat header title |
| `VITE_PROFILE_INITIALS` | Client-safe | Hero chat avatar initials |
| `PORT` | Server-only | Express port |
| `GEMINI_API_KEY` | Server-only secret | Gemini API key |
| `GEMINI_MODEL` | Server-only | Gemini model name |
| `AI_SYSTEM_PROMPT` | Server-only | Base system instruction |
| `AI_PROFILE_CONTEXT` | Server-only | Grounding context for assistant |
| `AI_MAX_INPUT_CHARS` | Server-only | Max input chars per request |
| `AI_RATE_LIMIT_WINDOW_MS` | Server-only | Rate limit window |
| `AI_RATE_LIMIT_MAX` | Server-only | Max requests per window |

## API Contract

### `GET /api/health`
- `200` response:
```json
{
  "status": "ok",
  "uptimeSeconds": 123
}
```

### `POST /api/ai/chat`
- Request body:
```json
{
  "message": "Tell me about your experience",
  "history": [
    { "role": "user", "text": "Hi" },
    { "role": "ai", "text": "Hello!" }
  ]
}
```
- Success (`200`):
```json
{
  "reply": "Concise grounded answer...",
  "meta": { "model": "gemini-2.5-flash-lite", "provider": "gemini" }
}
```
- Error status codes:
  - `400`: validation errors
  - `429`: throttled
  - `502`: provider/upstream error
  - `500`: unexpected server error

## Runbook

### Local Development
1. Install root dependencies:
```bash
npm install
```
2. Install server dependencies:
```bash
npm --prefix server install
```
3. Run backend (terminal 1):
```bash
npm run dev:server
```
4. Run frontend (terminal 2):
```bash
npm run dev
```

### Local Build + Run
```bash
npm run build
npm start
```

### Heroku Deployment
1. Set config vars on app:
```bash
heroku config:set GEMINI_API_KEY=... GEMINI_MODEL=gemini-2.5-flash-lite AI_SYSTEM_PROMPT="..." AI_PROFILE_CONTEXT="..." AI_MAX_INPUT_CHARS=1000 AI_RATE_LIMIT_WINDOW_MS=60000 AI_RATE_LIMIT_MAX=20 -a portfolio-07
```
2. Deploy:
```bash
git push heroku <branch>:main
```
3. Verify:
```bash
heroku logs --tail -a portfolio-07
curl https://<your-app>.herokuapp.com/api/health
```

## Decision Log
- Backend stack: Node + Express + TypeScript.
- Provider: Gemini API via server proxy.
- Deployment shape: single Heroku app serving API + SPA.
- Safety baseline: schema validation + IP rate limiting.
- Auth: no user auth in v1 (public endpoint).

## Milestone Log
- [x] 1) Backend scaffold complete.
- [x] 2) Frontend switched to `/api/ai/chat`.
- [ ] 3) Heroku deploy verified.
- [ ] 4) Post-deploy validation complete.
