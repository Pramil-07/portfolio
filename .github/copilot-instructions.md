# AI Coding Agent Instructions (Portfolio)

These instructions help AI agents work productively in this codebase. Focus on the patterns actually used here and keep changes minimal, TypeScript-first.

## Big Picture
- React + TypeScript + Vite single-page app. Entry via [src/main.tsx](src/main.tsx) rendering [src/App.tsx](src/App.tsx).
- Sections are composed in `App` from [src/secitons/*](src/secitons) (intentional folder name). Navigation anchors in `navLinks` must match section `id`s.
- Styling uses Tailwind CSS v4 via the Vite plugin. Global styles in [src/index.css](src/index.css) and [assets/index.css](assets/index.css).
- Visual/3D features use `three`, `@react-three/fiber`, `@react-three/drei`, GSAP, and Lottie.
- Static data (texts, images, transformations) lives in [src/constants/index.ts](src/constants/index.ts) and drives multiple sections.

## Conventions & Patterns
- Prefer `.tsx` over `.js`. Where both exist, treat TypeScript as the source of truth (e.g., [src/App.tsx](src/App.tsx), [src/components/*/*.tsx](src/components)).
- Assets: place runtime files under [public](public). Reference via absolute paths (e.g., `/images/...`, `/animations/...`, `/models/...`). See usage in `words`, `logoIconsList`, `techStackImgs` in [src/constants/index.ts](src/constants/index.ts).
- Section anchors: `navLinks` in [src/constants/index.ts](src/constants/index.ts) include `#work`, `#experience`, `#skills`, `#testimonials`. Ensure corresponding sections expose matching `id`s.
- 3D icon entries in `techStackIcons` store `scale` and `rotation` arrays. Keep transform data in constants; components read and apply them.
- Module format is ESM (`"type": "module"`). Use standard `import`/`export`, not `require`.
- Keep data-driven UI: extend cards/logos/testimonials by editing constants; avoid hardcoding in components.

## Build, Run, Lint
- Dev: `npm run dev` (Vite dev server).
- Build: `npm run build` (TypeScript build + Vite bundle).
- Preview: `npm run preview` (serves the built app).
- Lint: `npm run lint`.
- Production serve (static): `npm start` (serves `dist` via `serve`).

## Directory Cues
- Sections: [src/secitons](src/secitons) — `Hero`, `ShowcaseSection`, `LogoShowcase`, `FeatureCards`, `Experience`, `TechStack`, `Testimonials`, `Contact`, `Footer`.
- Components: [src/components](src/components) — reusable UI plus `HeroModels` and `models/*` for three.js scenes.
- Assets: [public/images](public/images), [public/animations](public/animations), [public/models](public/models). `assets/` also exists, but runtime references use `public` with absolute paths.
- Config: [vite.config.ts](vite.config.ts) (React + Tailwind plugin), [eslint.config.js](eslint.config.js), TypeScript configs in root.

## External Integrations
- `@emailjs/browser` likely used in `Contact` for email forms.
- `react-hot-toast` for notifications; `gsap` for animations; `lottie-react` for JSON animations.
- `react-responsive` for media queries.

## Examples
- Add a new logo: append `{ imgPath: "/images/logos/company-logo-12.png" }` to `logoIconsList` in [src/constants/index.ts](src/constants/index.ts); place the image under `public/images/logos`.
- Add a tech icon: append an object to `techStackIcons` with `name`, `modelPath`, `scale: [x,y,z]`, `rotation: [rx, ry, rz]`; place the asset under `public/images` or `public/models` and reference with an absolute path.
- Add a section: create a component under [src/secitons](src/secitons), ensure it renders with an `id` matching a `navLinks` entry, and add it to [src/App.tsx](src/App.tsx).

## Guardrails
- Maintain TypeScript types (see [src/constants/types.ts](src/constants/types.ts)). Keep transforms (`scale`, `rotation`) as arrays.
- When importing assets, prefer absolute `/...` paths to leverage Vite `public` handling.
- Avoid introducing global state libraries unless aligning with existing patterns; current state management is local/component-driven.
- Keep changes focused; do not refactor directory names (e.g., `secitons`) without explicit instruction.
