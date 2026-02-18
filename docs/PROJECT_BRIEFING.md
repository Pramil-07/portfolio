# Project Briefing

## Document Control

| Field | Value |
| --- | --- |
| Project | Personal Portfolio Web App |
| Repository | `portfolio` |
| Branch | `main` |
| Baseline Commit | `2ff59d5` |
| Prepared On | 2026-02-18 |
| Prepared By | Codex (repository analysis) |
| Audience | Owner, collaborators, recruiters, maintainers |
| Document Purpose | Executive and delivery-level briefing |

## 1) Executive Summary

This project is a single-page React + TypeScript portfolio site for Pramil Dhungana.  
It is content-driven, animation-heavy, and optimized for personal branding, project showcase, and inbound contact via EmailJS.

The codebase is structurally clear and mostly modular, but production readiness is currently **medium** due to lint failures, missing runtime assets, and missing CI/release governance.

## 2) Product Intent and Value

### Primary Goals
- Present professional profile, work history, and technical capabilities.
- Showcase selected projects with external links.
- Build trust with testimonials and certifications.
- Capture inbound leads through a contact form.

### Expected Outcomes
- Stronger personal credibility in hiring/client conversations.
- Higher conversion from visitors to outreach messages.
- Easier ongoing profile/content updates via centralized constants.

## 3) Scope Snapshot

### In Scope (Current)
- Hero + animated counters.
- Work/project showcase.
- Logo marquee and capability cards.
- Experience timeline.
- Skills grid.
- Testimonials.
- Resume download + certifications.
- Contact form with EmailJS integration.
- Footer with social links.

### Out of Scope (Current)
- Backend/API service.
- Authenticated admin or CMS.
- Analytics instrumentation.
- Automated tests (unit/integration/e2e).
- CI workflow enforcement.

## 4) Technical Snapshot

| Area | Current State |
| --- | --- |
| Frontend | React 19 + TypeScript + Vite 7 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) + custom global CSS |
| Animation | GSAP + ScrollTrigger + Lottie |
| Contact Integration | `@emailjs/browser` with Vite env vars |
| Runtime Assets | `public/images`, `public/models` |
| Build/Serve | `vite build`; `serve -s dist` for start command |
| Deployment Hints | `CNAME`, `Procfile`, `static.json` present |

## 5) Delivery Health (As-Is Baseline)

### Command Results
- `npm run lint`: **fails** (10 eslint/type lint errors).
- `npx tsc -b`: **passes**.
- `npm run build`: **failed in this sandbox** with `esbuild spawn EPERM` while loading `vite.config.js` (environment/sandbox restriction likely, not conclusively app-logic failure).

### Documentation Status
- Root `README.md` is still the default Vite template and does not describe this product.
- Project-level operational documentation was missing before this briefing/context package.

## 6) Key Risks and Gaps

| Severity | Risk | Evidence | Impact |
| --- | --- | --- | --- |
| High | Broken resume/certification links | `src/constants/index.ts` references missing assets in `public/downloads` and `public/images/certifications` | Broken user trust and incomplete credentials section |
| High | Lint gate not passing | `npm run lint` reports 10 errors in multiple files | Reduced maintainability and merge confidence |
| Medium | Asset case mismatch for Linux hosts | `/images/Utsav.jpg` vs actual `public/images/utsav.jpg` | Production-only 404 on case-sensitive filesystems |
| Medium | Build verification not reproducible in current environment | `npm run build` blocked by `EPERM` (esbuild spawn) | Uncertain release confidence from current runner |
| Medium | Dead/placeholder code paths | `Room.tsx`, `HeroLights.tsx`, `particals.tsx` return `null`; unused imports and structures | Codebase noise and onboarding confusion |
| Medium | Duplicate config artifact | Both `vite.config.ts` and `vite.config.js` exist | Potential config drift/confusion in tooling |
| Low | Default metadata still present | `index.html` title is `portfolio`, favicon is `/vite.svg` | Branding quality gap |
| Low | No CI workflow found | `.github/workflows` absent | No automated quality gate before deploy |

## 7) Prioritized Action Plan

### P0 (Immediate: 1-2 days)
- Restore missing public assets or remove broken references.
- Fix all lint errors and keep lint green.
- Resolve case-sensitive asset mismatch (`Utsav.jpg`).

### P1 (Short Term: 1 week)
- Consolidate Vite config to one source (`vite.config.ts` recommended).
- Remove or implement placeholder components (`Room`, `HeroLights`, `Particles`).
- Replace default metadata (title, favicon, OG tags).
- Refresh `README.md` with actual setup, env requirements, and deployment steps.

### P2 (Near Term: 2-3 weeks)
- Add CI pipeline (`lint`, `typecheck`, `build`).
- Add lightweight tests for core rendering and contact flow.
- Add analytics/events for CTA tracking and contact conversions.

## 8) Environment Requirements

Required variables (from runtime usage):
- `VITE_APP_EMAILJS_SERVICE_ID`
- `VITE_APP_EMAILJS_TEMPLATE_ID`
- `VITE_APP_EMAILJS_PUBLIC_KEY`

## 9) Release Readiness Assessment

Current readiness level: **Moderate, not yet production-hardened**.

The project is functional and well-positioned for a polished portfolio release, but should complete P0 items before treating the build as fully production-ready.
