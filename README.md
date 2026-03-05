# Spec-driven design development

This project uses a **pragmatic spec-driven design development** approach: a single source of truth (the spec) plus a minimal set of UX artefacts sufficient to execute complex enterprise applications across domains.

## Folder structure

```
├── app/                    # Application codebase (Vite + React + TypeScript)
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level pages
│   │   ├── hooks/          # Custom hooks
│   │   ├── types/          # Shared types (align with spec/data-entities.md)
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── spec/                   # UX artefact files (single source of truth)
│   ├── scope.md
│   ├── roles-permissions.md
│   ├── flows.md
│   ├── ia-screens.md
│   ├── design-spec.md
│   ├── key-screens.md
│   ├── data-entities.md
│   └── validation-edge-cases.md
├── knowledge-base/         # User/stakeholder findings (input for analyst agent)
├── .cursor/
│   ├── rules/              # Spec-driven design rule
│   └── skills/             # Analyst agent, Spec pack
└── README.md
```

## Running the application

From the project root:

```bash
cd app
npm install
npm run dev
```

Then open http://localhost:5173. Build for production: `npm run build`; preview build: `npm run preview`.

## Spec pack (8 artefacts)

All product and UX decisions live under `spec/` in one file per artefact:

| File | Purpose |
|------|---------|
| `spec/scope.md` | Product/scope – what we're building, for whom, success criteria, in/out of scope, domain context, stakeholders |
| `spec/roles-permissions.md` | Roles and permission matrix/rules |
| `spec/flows.md` | Core user flows (task flows) with steps and decision points |
| `spec/ia-screens.md` | Information architecture / screen list |
| `spec/design-spec.md` | Design spec or design system reference (tokens, components, states) |
| `spec/key-screens.md` | Key screen specs – only non-obvious or complex screens |
| `spec/data-entities.md` | Data/entity overview – main entities, attributes, relationships |
| `spec/validation-edge-cases.md` | Edge cases, validation rules, empty states, permission-based behaviour |

Edit these files directly or use the **Spec pack** skill in Cursor to keep them consistent.

## Knowledge base

- **Single folder**: This project uses **only** the folder **`knowledge-base/`** as the knowledge base (the Teams shared folder). Add all user/stakeholder findings there. **Only** the analyst skill connects to and retrieves information from it.
- **Workflow**: UX researcher/designer adds content → trigger the **Analyst agent** (e.g. "analyse knowledge-base" or "analyse this document") → review the agent’s proposed understanding → confirm → the agent parses the relevant information into the correct `spec/` files.

See `knowledge-base/README.md` for connection options (e.g. symlink to Teams/SharePoint).

## Using the agents in Cursor

- **Analyst agent**: The only agent that reads from the knowledge base. **Kick-start extraction** by saying e.g. "I've dropped new files in the knowledge base", "new content in KB", "extract knowledge base", or "sync from the knowledge base". The agent immediately lists and reads `knowledge-base/`, extracts to all 8 spec artefacts, proposes, asks for review, and (after you confirm) updates the spec files.
- **Spec pack**: Use when you want to edit or extend the spec, add a flow/role/screen, or cross-check that flows, IA, and validation are aligned. Say e.g. "add this to scope", "add a new flow", "update the spec", or "are flows and screen list in sync?"

## Rule

The Cursor rule **Spec-driven design** (`.cursor/rules/spec-driven-design.mdc`) is always applied: it describes the 8 artefact types, the single-source-of-truth principle, and the KB → agent → review → spec flow. Keep product/UX decisions in the spec, not scattered in code or ad-hoc docs.
