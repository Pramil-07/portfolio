# Project Context

## Document Control

| Field | Value |
| --- | --- |
| Project | Personal Portfolio Web App |
| Repository | `portfolio` |
| Prepared On | 2026-02-18 |
| Intended Users | Maintainers, contributors, technical reviewers |
| Purpose | Engineering context and onboarding reference |

## 1) System Overview

This repository contains a single-page frontend application built with React, TypeScript, Vite, and Tailwind CSS.  
The app renders a marketing-style personal portfolio with section-based navigation, animation-driven UI, and an EmailJS-powered contact form.

There is no backend service in this repository. All content is frontend-managed via constants and static assets.

## 2) Runtime Architecture

### Entry and Composition
- Entry point: `src/main.tsx`.
- Root composition: `src/App.tsx`.
- `App` renders sections in fixed order:
  `NavBar -> Hero -> Showcase -> Logos -> Feature Cards -> Experience -> Tech Stack -> Testimonials -> Resume/Certifications -> Contact -> Footer`.

### Navigation Model
- Navigation links are defined in `src/constants/index.ts` (`navLinks`).
- Section IDs are hardcoded in section components and expected to match `href` anchors.
- Navigation and CTA behavior is in-page anchor scrolling (no router).

### Data-Driven Content
- Most textual and visual content is centralized in `src/constants/index.ts`.
- Types for these structures are in `src/constants/types.ts`.
- Sections map arrays from constants into cards/lists, reducing hardcoded JSX.

## 3) Directory Map

| Path | Responsibility |
| --- | --- |
| `src/main.tsx` | React app bootstrap |
| `src/App.tsx` | Top-level section orchestration |
| `src/secitons/*` | Screen sections (folder name intentionally misspelled as `secitons`) |
| `src/components/*` | Reusable UI and visuals |
| `src/components/HeroModels/*` | Hero visual components (currently mostly placeholder) |
| `src/components/models/*` | Skill/contact visual components |
| `src/constants/index.ts` | Static content catalog and links |
| `src/constants/types.ts` | Shared TS interfaces |
| `src/index.css` | Global styles, utility classes, animations, theme tokens |
| `public/images` | Primary static image assets |
| `public/models` | 3D/model assets |
| `vite.config.ts` | Vite config (React + Tailwind plugin) |
| `package.json` | Scripts and dependencies |

## 4) Styling and Motion Context

- Tailwind CSS v4 is loaded via `@tailwindcss/vite`.
- `src/index.css` defines:
  - custom theme variables,
  - shared utility/component class groups,
  - keyframes (text slider, marquee),
  - card glow/gradient effects.
- GSAP (`useGSAP`, `ScrollTrigger`) drives reveal/scroll animations for hero, counters, showcase, timeline, and skills.
- Lottie powers the contact section animation (`ContactExperience`).

## 5) Integration Context

### EmailJS
- Used in `src/secitons/Contact.tsx`.
- Client-side form validation is present.
- Uses `emailjs.sendForm(...)` with env-driven IDs/keys.
- Required env keys:
  - `VITE_APP_EMAILJS_SERVICE_ID`
  - `VITE_APP_EMAILJS_TEMPLATE_ID`
  - `VITE_APP_EMAILJS_PUBLIC_KEY`

### Toast Notifications
- `react-hot-toast` used for loading/success/error feedback in contact flow.

## 6) Asset and Content Context

### Current Asset Sources
- All runtime paths use absolute `/images/...` and `/models/...` references into `public`.
- `src/constants/index.ts` is the primary asset index for cards, logos, testimonials, certifications, resume link, and social links.

### Verified Asset Issues
- Missing files referenced by app:
  - `/downloads/Pramil_Dhungana_Resume.pdf`
  - `/images/certifications/aws-cert.png`
  - `/images/certifications/react-cert.png`
  - `/images/logos/django.png`
  - `/images/logos/docker.png`
  - `/images/logos/nextjs.svg`
  - `/images/logos/postgresql.svg`
  - `/images/logos/redis.svg`
- Case mismatch:
  - Referenced `/images/Utsav.jpg`
  - Actual file `public/images/utsav.jpg`

Notes:
- `techStackImgs` contains logo paths that are currently not rendered by active sections.
- Missing `images/logos/*` files are therefore latent risk until that data path is used.

## 7) Build and Tooling Context

### Scripts (`package.json`)
- `dev`: start Vite dev server.
- `build`: `tsc -b && vite build`.
- `lint`: ESLint for entire repo.
- `preview`: local preview server for built output.
- `start`: static serve from `dist`.
- `heroku-postbuild`: build hook for platform deploy.

### Config Notes
- Both `vite.config.ts` and `vite.config.js` exist with equivalent plugin setup.
- `index.html` still contains template-level metadata (`title: portfolio`, favicon: `/vite.svg`).
- `README.md` is template-generated and not project-specific.

## 8) Quality Baseline

### Validation Results (2026-02-18)
- `npm run lint`: failed with 10 issues.
- `npx tsc -b`: passed.
- `npm run build`: blocked in this environment by `esbuild spawn EPERM` during Vite config load.

### Lint Error Classes
- Unused imports/variables.
- Explicit `any` usage.
- Unused mapped index variable.

Primary files with lint failures:
- `src/components/GlowCard.tsx`
- `src/components/HeroModels/HeroLights.tsx`
- `src/components/HeroModels/Room.tsx`
- `src/components/HeroModels/particals.tsx`
- `src/constants/index.ts`
- `src/secitons/Contact.tsx`
- `src/secitons/Footer.tsx`
- `src/secitons/LogoShowcase.tsx`
- `src/secitons/ResumeAndCertifications.tsx`
- `src/secitons/hero.tsx`

## 9) Deployment Context

| File | Role |
| --- | --- |
| `Procfile` | `web: npm start` runtime entry (platform deployment) |
| `static.json` | SPA rewrite config to `index.html` |
| `CNAME` | Custom domain (`pramildhungana.com.np`) |

No CI workflow files were found in `.github/workflows`.

## 10) Codebase Conventions and Observations

- Content-first approach: editing constants changes UI sections quickly.
- Component naming is mostly consistent except the retained `secitons` directory typo.
- Some components indicate partially completed 3D direction (`Room`, `HeroLights`, `Particles` return `null`).
- Footer includes a debug `console.log` of social URLs that should be removed for production cleanliness.

## 11) Recommended Engineering Backlog

### Immediate Stabilization
- Fix lint errors to restore quality gate.
- Restore/remove broken asset references.
- Correct asset path case mismatch.
- Remove debug logging from footer.

### Structural Improvements
- Keep only one Vite config file.
- Update `README.md` to project-specific onboarding/run/deploy instructions.
- Add CI checks (`lint`, `typecheck`, `build`).

### Reliability and UX Enhancements
- Add smoke tests for section render and contact submission behavior.
- Add metadata/SEO tags and social preview assets.
- Add analytics for CTA clicks and contact conversions.

## 12) Onboarding Quickstart

1. Install dependencies: `npm install`.
2. Create/update `.env` with required EmailJS keys.
3. Run development server: `npm run dev`.
4. Run quality checks: `npm run lint` and `npx tsc -b`.
5. Validate static asset references under `public`.
6. Build/preview in a non-restricted local environment: `npm run build`, `npm run preview`.

