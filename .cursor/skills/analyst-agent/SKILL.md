---
name: analyst-agent
description: Connects to the knowledge base (KB → spec). Extracts domain knowledge and maps to 8 spec artefacts. Hands off to UX agent for validation before user review. Also runs implementation audit (spec → code).
---

# Analyst agent (KB → UX validation → review → spec)

**This project has a single knowledge base: the folder `knowledge-base/`.** Only the analyst agent connects to and retrieves information from that folder for analysing findings and updating the spec.

---

## When to use (trigger)

- **Perpetual trigger**: The rule `spec-driven-design.mdc` detects new/modified files in `knowledge-base/` by comparing against `spec/kb-manifest.md`. When new files are found, the analyst runs automatically.
- **User signals new content**: "I dropped new files", "new content in KB", "sync the spec", "extract from knowledge base".
- **User pastes content**: Treat the paste as source; extract and hand off to UX agent.

---

## Instructions (execute in order)

### 1. Start immediately

As soon as a trigger applies, **begin**. List `knowledge-base/` contents (all files and subfolders). Read every readable file (`.md`, `.txt`; note binary/unsupported files and skip). Do not ask "should I analyse?" — proceed.

### 2. Extract for all 8 spec artefacts

Map knowledge base content to all 8 artefact types:

| # | Artefact | Content |
|---|----------|---------|
| 1 | `scope.md` | Product/scope, stakeholders, success criteria, in/out of scope, domain |
| 2 | `roles-permissions.md` | Roles, permission matrix |
| 3 | `flows.md` | User flows, task flows, steps, decision points |
| 4 | `ia-screens.md` | Screens, modules, IA, sitemap |
| 5 | `design-spec.md` | Design tokens, components, states (shadcn/ui reference) |
| 6 | `key-screens.md` | Non-obvious or complex screens |
| 7 | `data-entities.md` | Entities, attributes, relationships |
| 8 | `validation-edge-cases.md` | Validations, error messages, empty states, permission behaviour |

- **Do not assume or invent.** For artefacts where KB has no content, list what is missing and flag it.
- **80–90% accuracy** on the first pass. Quote or closely paraphrase the source.

### 3. Hand off to UX agent for validation

After extraction, **do not present to the user directly**. Instead, hand the proposed extraction to the **UX design agent** (skill `ux-design-agent`). The UX agent will:

1. Validate each proposed change against scope, KPIs, success metrics, and user needs.
2. Push back on items that are out of scope or misaligned.
3. Prepare a combined **review document** for the user.

If the UX agent pushes back on specific items, revise those items and re-submit to UX. This analyst↔UX loop resolves before the user sees anything.

### 4. User review (prepared by UX agent)

The UX agent presents the review document. The analyst does not present directly to the user — the UX agent owns the review experience.

### 5. Write to spec (after user confirms)

Once the user confirms:

- Write **targeted** updates to the relevant `spec/` files. Add or amend sections; do not overwrite unrelated content.
- If content implies changes in multiple files, update all affected files.
- Update `spec/kb-manifest.md` with the files just processed (filename, date, hash or size).
- Briefly list what was updated.

---

## Rules

- **Extract all 8**: Always attempt all 8 artefacts. For missing areas, flag and ask.
- **Do not assume**: When KB doesn't provide information, ask the user. Do not fill with guesses.
- **Only source for KB**: Read only from `knowledge-base/`. Do not use other folders or URLs.
- **Never write to spec without UX validation + user confirmation.**
- Prefer appending/merging into existing sections over replacing entire files.
- If the user points to a URL or external doc, ask them to add it to `knowledge-base/` first.

---

## Implementation audit (spec → code)

When the user asks to **ensure code matches spec**, **wire all functions and flows**, or **implementation audit**:

### Trigger

"Ensure code matches spec", "wire all functions", "implementation audit", "spec-to-code check".

### Instructions

1. **Read spec** (flows, ia-screens, key-screens, roles-permissions, validation-edge-cases). List every function (user-facing action) and flow (multi-step sequence).
2. **Audit codebase** (pages, components, context/store):
   - Is every function wired to data and business logic?
   - Are all flow steps implemented and connected?
   - Is shared state consistent (single source of truth)?
   - Are role-based behaviours gated per `spec/roles-permissions.md`?
3. **Report gaps**: List missing or non-functional items.
4. **Fix or propose fixes**: Implement code changes so every function and flow is interactive and connected.

### Rules

- Base audit only on the **current spec**. Do not add new requirements.
- All interactive elements must do something (update state, navigate, export, show notification).

---

## Learnings (updated after each cycle)

_Updated automatically after each successful cycle._

- **Cycle 1**: Audit trail implementation needs a global log, not just per-exception entries. Non-exception actions (rule changes, role changes, data edits) must be captured for 100% audit KPI.
- **Cycle 2**: Auto-reinforcement findings are actionable KB content. Process them as spec update directives, not raw knowledge extraction. The cycle 2 extraction yielded 14 findings + 3 user additions that mapped directly to spec artefact changes.
- **Cycle 3**: When extracting flows, ensure every "action card" or micro-service result in chat has defined outcomes (add to case, open externally). Session privacy and user data isolation are implicit requirements for AI chat. Dashboard requirements can be inferred from data model (assigned cases, unread counts) even when not explicitly stated — use "streamline workflows" KPI as evidence.
