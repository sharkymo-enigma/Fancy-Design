# Design spec – Fluent 2 (Fluent UI React v9)

**Purpose:** Single source of truth for visual and interaction design: tokens, components, states, accessibility. **Reference screens:** reference/3.png, reference/4.png, reference/5.png — when present, wireframe agent extracts layout, composition, and components from these images and updates key-screens.md and this artefact. IMF POC: 100% WCAG 2.1 AA (Appendix G, E).

**Confidence:** 90% (evidence-based: IMF branding applied; status indicator system; notification badges; template selection highlight; sticky action bar — see spec/confidence-assessment.md)

---

## How this file is structured

- § 1 Tokens — Typography, spacing, color (Fluent 2).
- § 2 Components — Component list; patterns and states; **layout regions from reference images when available**.
- § 3 Validation and error handling — MessageBar; no dead-end error states.
- § 4 Accessibility (WCAG 2.1 AA).
- § 5 Reference screens — 3.png, 4.png, 5.png for HR Robin key screens.
- § 6 Project overrides — IMF/brand if any.

---

## Design system reference

- **Preferred (production):** Fluent 2 Design System / Fluent UI React v9 — https://react.fluentui.dev/ ; https://fluent2.microsoft.design/
- **Phase 1 implementation (current build):** Tailwind v4 + custom theme tokens. Moodboard-driven modern fintech dashboard aesthetic (reference/image (9).png). Inter (headings + body), primary **#4461F2** (vibrant blue), background #F0F4F8, text #1A1D2B. Icon-only sidebar (72px, dark navy #0A0F1E) + full-width top header bar with search, notifications, role toggle. Custom type scale (`--text-2xs` through `--text-3xl`), shadow-card system, rounded-2xl cards. Components: shadcn-style primitives (Button, Input, Select, Table, Card, Dialog, Alert). Role-based views; 4.5:1 contrast, transitions 150ms. Production may migrate to Fluent 2 per preferred reference.

---

## 1. Tokens

Use Fluent 2 theme tokens. No one-off values unless in § 6.

| Category | Fluent 2 reference | Phase 1 build (IMF) | Notes |
|----------|---------------------|---------------------|--------|
| Typography | Type ramp: caption1, body1, subtitle1, title1, title2, title3, largeTitle | Custom type scale: `--text-2xs` … `--text-3xl`; line heights `--leading-tight/snug/normal/relaxed`. Poppins (headings), Open Sans (body). | Map to Fluent ramp on migration. |
| Color | Semantic: neutral, brand, danger, success, warning | IMF palette: primary #004C97, background #F5F7FA, foreground #1a1a2e, destructive #C53030. See § 6 full table. | 4.5:1 contrast (text), 3:1 (large/UI) WCAG 2.1 AA. |
| Spacing | 2px base: 2, 4, 6, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64, 80, 96 | — | Padding, gaps, margins. |
| Border radius | small, medium, large, round | — | Per component. |

---

## 2. Components

All from `@fluentui/react-components`. Use for actions, forms, data display, feedback, layout, navigation. **When reference/3.png, 4.png, 5.png are present, wireframe agent maps layout regions and components from those images to this inventory.**

| Component | Fluent 2 source | Variants / sizes | States |
|-----------|-----------------|------------------|--------|
| Button | `Button` | primary, secondary, outline, subtle, transparent; small, medium, large | default, hover, focus, disabled, loading |
| Link | `Link` | inline, standalone; default, subtle | default, hover, focus, disabled |
| Input | `Input` | size; type text, search, date, file | default, focus, disabled, error |
| Label | `Label` | required indicator | — |
| Dropdown | `Dropdown` | single/multi; size | default, focus, disabled, error, open |
| Textarea | `Textarea` | resize | default, focus, disabled, error |
| DataGrid / Table | `DataGrid` or `Table` | sortable, selectable | default, row hover, selected, loading. Focus order: filters → grid → actions. |
| MessageBar | `MessageBar` | intent: info, warning, error, success | — |
| Spinner | `Spinner` | size: tiny to extra-large | — |
| Dialog | `Dialog` | modal / non-modal | open (focus trap, escape to close) |
| Breadcrumb | `Breadcrumb` | — | default, focus |
| **Accordion** | Fluent 2 Accordion (or equivalent) | expand/collapse | default, expanded, collapsed; used for precedent categories (ref 4.png) |
| **Tabs** | Fluent 2 TabList/Tab | e.g. All, Case, Chat, Open, Closed | default, selected; used for chat filters (ref 4.png) |
| **Chat input** | Input + optional attach/voice/send | placeholder "Ask me about HR policies, precedents, or cases..." | default, focus, disabled; Tools button opens overlay |
| **Report toolbar** | Button group | Save to File (dropdown), Copy, Share, Close; Enhance with AI; formatting (Bold, Italic, etc.); Version history, Citations, Provenance | Each button wired per interactive-components.md § 10 |
| **KPI card** | Card (clickable optional) | Metric + trend + percentage | default, hover; click → drill-down to case list or overlay |
| **Recommendation button** | Button/link | e.g. "Update FAQ: Parental Leave"; "Remote Work Policy Quick Reference" | Navigate to policy/FAQ or open document; Back/Close returns |

**Patterns:** Loading (Spinner or skeleton per screen); live regions for draft generation ("Generating draft…" / "Draft ready"); empty states with CTA (per validation-edge-cases); sidebar nav (Fluent 2 primitives). **Interactive (build gate):** Every Button, Link, row click, dropdown selection, and input submit **must** have a defined outcome (navigation, function, or state change) as specified in **`spec/interactive-components.md`**. No implementation of a screen until all its listed interactive elements are wired. Micro-states (hover, focus, disabled, loading, error, empty) per interactive-components.md and validation-edge-cases.md.

---

## 3. Validation and error handling

See `spec/validation-edge-cases.md`. Use **MessageBar** (error, warning, success, info) or inline error; `aria-describedby` / `aria-invalid`. No dead-end errors: every error state offers Retry, Back, or Nav.

---

## 4. Accessibility (WCAG 2.1 AA)

- **Scope:** All phases; information hierarchy; colorway and arrangement for readability/legibility (Appendix G).
- **Assessments:** Reference screens (3.png, 4.png, 5.png) and wireframe assessment; ongoing and final post-remediation.
- **Requirements:** All WCAG 2.1 AA success criteria. Focus order: filters → table/grid → primary actions. All form controls: visible Label or aria-label. Dialogs: focus trap, return focus on close, escape closes.

---

## 5. Reference screens (HR Robin – Phase 1)

- **reference/3.png**, **reference/4.png**, **reference/5.png** are the authoritative reference for HR Robin key screen layout when present.
- **Wireframe agent:** When these images exist, (1) extract layout regions, composition, and components; (2) update key-screens.md with per-screen layout and component placement; (3) update this design-spec § 2 if new components or patterns are identified; (4) connect to flows and IA so no dead ends.
- Place files in `reference/` (see reference/README.md).

---

## 6. Project overrides (Phase 1 — Moodboard-driven)

**Reference:** reference/image (9).png — Modern fintech dashboard moodboard. Primary brand color **#4461F2** (vibrant blue).

The current build applies a modern fintech dashboard aesthetic inspired by the iBank Citi moodboard reference. Typography: **Inter** (headings + body). Layout: icon-only sidebar (72px) + full-width top header. Transitions 150ms; cursor-pointer and hover feedback on interactive elements; 4.5:1 contrast.

### Color palette (Moodboard-aligned)

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | **#4461F2** | Primary actions, brand accent, active nav, links |
| `--primary-foreground` | #FFFFFF | Text on primary backgrounds |
| `--background` | **#F0F4F8** | Page background (light cool gray) |
| `--foreground` | **#1A1D2B** | Body text (dark charcoal) |
| `--secondary` | **#F1F5F9** | Secondary surfaces |
| `--secondary-foreground` | #1A1D2B | Text on secondary |
| `--muted` | **#EFF2F7** | Muted backgrounds, disabled surfaces |
| `--muted-foreground` | #7C8DB5 | Placeholder text, secondary labels |
| `--accent` | **#E8ECF4** | Accent surfaces, hover tints |
| `--accent-foreground` | #1A1D2B | Text on accent |
| `--border` | **#E3E8F0** | Borders, dividers (subtle) |
| `--destructive` | **#EF4444** | Destructive actions, error states |
| `--destructive-foreground` | #FFFFFF | Text on destructive |
| `--ring` | #4461F2 | Focus rings |
| `--sidebar` | **#0A0F1E** | Sidebar background (near-black navy) |

### Chart colors

| Slot | Value | Semantic |
|------|-------|----------|
| chart-1 | #4461F2 | Primary blue |
| chart-2 | #22C55E | Green (success/positive) |
| chart-3 | #F59E0B | Amber (warning/caution) |
| chart-4 | #8B5CF6 | Purple (category) |
| chart-5 | #EF4444 | Red (negative/alert) |

### Shadow system

Soft, neutral shadows for cards and elevation:
- `shadow-card`: `0 2px 8px rgb(0 0 0 / 0.04), 0 0 1px rgb(0 0 0 / 0.06)` — default card elevation
- `shadow-md`: `0 4px 12px rgb(0 0 0 / 0.05)` — hover elevation
- `shadow-lg`: `0 8px 24px rgb(0 0 0 / 0.06)` — modal/overlay elevation

### Layout structure

| Region | Description |
|--------|-------------|
| Icon sidebar | 72px wide, `#0A0F1E` background, round icon buttons (44px), active state uses primary color with glow shadow |
| Top header | 68px height, white background, contains: user avatar+name, search bar, notification icons, role toggle pills |
| Main content | Fills remaining space, `#F0F4F8` background, scrollable |
| Right rail | 320px wide (when active), white background, contextual actions |

### Type scale (custom properties)

| Token | Size | Usage |
|-------|------|-------|
| `--text-2xs` | 0.625rem (10px) | Fine print, badges |
| `--text-xs` | 0.75rem (12px) | Captions, metadata |
| `--text-sm` | 0.875rem (14px) | Secondary text, descriptions, `.app-page-desc` |
| `--text-base` | 1rem (16px) | Body text (default) |
| `--text-lg` | 1.125rem (18px) | h4, emphasized body |
| `--text-xl` | 1.25rem (20px) | h3, section headings |
| `--text-2xl` | 1.5rem (24px) | h2, `.app-page-title` |
| `--text-3xl` | 1.875rem (30px) | h1, hero headings |

| Token | Value | Usage |
|-------|-------|-------|
| `--leading-tight` | 1.25 | Headings |
| `--leading-snug` | 1.375 | Compact text |
| `--leading-normal` | 1.5 | Body text (default) |
| `--leading-relaxed` | 1.625 | Descriptions, long-form |

### Additional patterns (Phase 1)

| Pattern | Description |
|---------|-------------|
| **Agent selector dropdown** | Dropdown with avatar/icon + agent name. Items can be **disabled** with "Soon" label — no hover/click, reduced opacity. Only one agent selectable. |
| **Benefit result card** | Rounded border, muted background. Title (uppercase label), value (large semibold number + unit), policy reference note. Used in pairs (e.g. Housing + Education). |
| **"Ask HR Robin" button** | Sidebar gradient button (blue-500 → blue-600) with Sparkles icon. Replaces generic "New conversation" — ties to active agent. Navigates to `/inquiries` with `newChat: true`. |
| **Notification badges (nav)** | Blue circle badges on nav items. Cases shows new case count; Chat shows unread message count. Size-5 circle, 10px bold white text on blue-500 bg. Replaces ChevronRight when badge > 0. |
| **Status indicator system** | Consistent colored dots + badge backgrounds across all pages. New: purple (#8B5CF6 dot, #F5F3FF bg, #6D28D9 text). In Progress: blue (#3B82F6, #EFF6FF, #1D4ED8). Pending Review: amber (#FBBF24, #FFFBEB, #B45309). Resolved: emerald (#10B981, #ECFDF5, #047857). Closed: slate (#94A3B8, #F8FAFC, #64748B). |
| **Conversation status dots** | In chat list: blue (active), amber (waiting), emerald (resolved), slate (closed). Size-2 dot next to title. In header: dot + status badge text. |
| **Unread badge** | Blue circle (size-4.5, 9px bold white text) on conversation list items with unread > 0. Shows exact count. |
| **New case indicator** | Blue dot (size-2.5) in top-right of case card with white ring-2. Indicates case not yet viewed. |
| **Template selection highlight** | Selected precedent card: border-primary/30, bg-primary/3%, ring-1 ring-primary/10. "Selected as template" badge in primary colors. |
| **Sticky action bar** | Fixed bottom bar (white/95%, backdrop-blur, shadow-lg). Appears when 1+ templates selected. Shows count, selected case IDs, "Clear" ghost button, "Generate draft with N template(s)" gradient button. |
| **Recently used template badge** | "Recently used" badge (bg-primary/10, text-primary) with Clock icon. Card border is primary/20 (vs default border). "Last used: [time]" in muted text. |
