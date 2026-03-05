# Agent instructions (spec-driven design)

**Purpose:** Instructions for pocket subagents and orchestrator when processing spec artefacts. Ensures **reference wireframes (3.png, 4.png, 5.png)**, **flow completeness**, and **no dead ends**.

---

## Reference images (3.png, 4.png, 5.png)

- **Location:** Place in **reference/** folder (see reference/README.md).
- **Authority:** When present, they are the **authoritative source** for HR Robin Phase 1 key screen layout, composition, and component placement.
- **Wireframe agent:** Must extract layout, regions, and components from these images; map to Fluent 2; connect to flows, IA, and personas; update **spec/key-screens.md** and **spec/design-spec.md** (§ 2, § 5). If images are missing, wireframe agent still performs the flow-completeness pass and reports that reference images are needed for full layout alignment.
- **Design-system agent:** When reference images are used, align component inventory and tokens with the layout derived by the wireframe agent.

---

## Flow completeness and no dead ends

- **Flows** must never dead-end: every flow has explicit **entry** and **exit** screen(s); every exit leads to a named screen or clear next action (Back, Nav, Retry).
- **Screens** must be reachable (via nav or from another screen) and have an **exit path** (nav or back).
- **Personas** (Viewer, Case handler, Reviewer, Admin): each must have at least one valid path through the app; no role may land on a screen with no permitted next action.
- **Error and empty states** must offer a **clear next step** (retry, back, clear filters, nav) — see spec/validation-edge-cases.md.

**Agents that touch flows or screens:** When you find a missing entry/exit, an orphan screen, a dead end, or a persona with no path, **update the relevant artefact** (flows.md, ia-screens.md, roles-permissions.md, key-screens.md, validation-edge-cases.md) or flag for the responsible agent with a precise gap description.

---

## Clickability and build gate (100% complete before code)

- **Every** interactive component (button, link, row click, dropdown, input submit, nav item) must be **clickable and wired** to a defined outcome (navigation, function, or state change).
- **Single source of truth:** **`spec/interactive-components.md`** — full inventory by screen, with on-action outcome, micro-states, and flow(s). Implementation must not start build until every listed component is wired.
- **Micro-states** (default, hover, focus, disabled, loading, error, empty): each must have a defined user next step (see interactive-components.md Micro-states summary and validation-edge-cases.md).
- **Macro flows** (F1–F11): each step must be triggerable by the controls listed in flows.md "Interactive elements used" and in interactive-components.md.
- **Deficiency:** If any control is missing from interactive-components.md or has no defined outcome, **add it** to interactive-components.md and update key-screens.md / flows.md as needed. No code build until 100% complete.

---

## Deficiency handling (which agent updates what)

| Deficiency | Primary artefact(s) to update | Responsible agent |
|------------|------------------------------|---------------------|
| Missing flow entry/exit or dead end | flows.md, validation-edge-cases.md | wireframe-figma-agent, use-case-scenario-agent |
| Orphan screen or missing nav/exit | ia-screens.md, key-screens.md | wireframe-figma-agent, ia-agent |
| Persona has no path or blocked with no next step | roles-permissions.md, flows.md | wireframe-figma-agent, use-case-scenario-agent |
| Missing layout/regions/components from reference images | key-screens.md, design-spec.md | wireframe-figma-agent |
| **Control not clickable / no defined outcome** | **interactive-components.md**, key-screens.md, flows.md | **wireframe-figma-agent**, use-case-scenario-agent |
| Missing or inconsistent labels/copy | key-screens.md, validation-edge-cases.md, content-and-copy.md | content-design-agent |
| Token/component/state gap | design-spec.md, validation-edge-cases.md | design-system-agent |

When in doubt, update the artefact that is the single source of truth for that information (see table). If another agent’s domain is affected, flag a **cross-impact** for that agent.
