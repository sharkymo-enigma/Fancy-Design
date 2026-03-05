# App (Figma to Code POC)

Runnable prototype driven by the spec in `/spec`.

## Stack

- **Vite** – build and dev server
- **React 18** – UI
- **TypeScript** – types
- **React Router** – routing
- **IBM Carbon Design System** (`@carbon/react`) – design system per `spec/design-spec.md`

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server (http://localhost:5173) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

## Where to add code

- **Pages**: `src/pages/` – one file per route/screen; align with `spec/ia-screens.md`.
- **Components**: `src/components/` – reusable UI; align with `spec/design-spec.md` and `spec/key-screens.md`.
- **Types**: `src/types/` – domain and UI types; align with `spec/data-entities.md`.
- **Styles**: `src/index.css` – tokens (optional); align with `spec/design-spec.md`.

The spec in the repo root is the source of truth; implement screens and flows defined there. Use **Carbon** components and tokens. Populate UI with **synthetic but realistic, domain-specific** data and SME-style naming (see project rule).
