# Key screen specs

**Purpose:** Per-screen layout, regions, components, logic, and user flow. **Reference images:** reference/3.png, reference/4.png, reference/5.png. **Wireframe agent:** When these images are present, extract layout, composition, and components from them; map to screens below; connect to flows (flows.md) and IA (ia-screens.md); ensure every screen is interactive and no flow dead-ends. If artefacts are deficient, update the relevant spec file or flag for the responsible agent.

**Confidence:** 90% (evidence-based: core screens wired; Chat rebuilt with status system; Case detail with template selection flow; sticky action bar; notification badges — see spec/confidence-assessment.md)

---

## How this file is structured

- **Interactive components (clickability):** Every clickable/actionable element and its outcome is defined in **`spec/interactive-components.md`**. Implementation must wire every listed component; no build until 100% complete.
- Reference image mapping — Which image (3, 4, 5) maps to which screen(s); layout regions and components derived from images (when present).
- Screen index — Screen name, route.
- Per-screen specs — Layout, components, logic, flows (entry/exit; no dead ends). Each screen's interactive elements are enumerated in interactive-components.md.

---

## Reference image mapping (from reference/4.png and reference/5.png)

| Reference image | Mapped screen(s) | Layout extracted |
|-----------------|------------------|-------------------|
| **reference/4.png** | **Case detail with precedent research** (enhanced Case detail) | Left sidebar: IMF logo, Agent selector (HR Robin selected; Policy Pete, Finance Fox, Compliance Cal disabled with "coming soon"), Nav (New chat, Search, Inquiries, Templates), Chat history with filter tabs (All, Case, Chat, Open, Closed), chat list items, user profile. Main: Case header (request title, case ID), case summary card (View in ServiceNow, ellipsis menu), AI query bubble, Research status (confidence), Precedent categories (accordion), precedent cards (Open case, Copy Reference, Use as Template, Close preview), chat input (Tools, attach, voice, send). Right panel: Case metadata, **Generate draft response email**, **Generate draft request** (e.g. retrieve medical documents), employee/request details, supporting document links, **Cited policies** link. |
| **reference/5.png** | **Reports / Open cases summary** (Weekly HR Summary Report) | Left sidebar: "Open cases summary" context, **Summarize open cases** button (full label "Summarize open cases for weekly HR meeting" in title attribute), Research status, report list ("Weekly HR Summary Report" with arrow and action icons), AI chat input ("Ask about this report…"), Tools button. Main: Report header (title, Last saved), **Save to File** (dropdown), **Copy to Clipboard**, **Share**, **Close**; **Enhance with AI**; formatting toolbar (Bold, Italic, etc.); **Version history**, **Citations**, **Provenance**; Executive Summary (KPI cards), Overview, Key Issues list (HR-contextual: parental leave extension requests, remote work policy queries, overseas assignment allowance, telework exceptions during mission travel), **Recommendations** (e.g. Update FAQ: Parental Leave Extensions, Remote Work Policy Quick Reference). |

All actionable components from these images are defined in **spec/interactive-components.md** § 9 (Case detail — precedent research) and § 10 (Reports / Open cases summary) with intended functions, flows, and follow-up screens or overlays.

---

## Screen index (Phase 1: HR Robin)

| Screen | Route / context |
|--------|------------------|
| Case handling workspace (list + detail + draft) | `/cases`, `/cases/:id`, `/cases/:id/draft` |
| Case detail with precedent research (ref 4.png) | `/cases/:id` (enhanced) or `/inquiries` with case context |
| Inquiries / Chat history | `/inquiries` — chat list, filters; select chat → case or report context |
| Reports / Open cases summary (ref 5.png) | `/reports` or `/reports/summary`; report view with Save/Copy/Share, Enhance with AI, Version history/Citations/Provenance |
| Ingestion / source config | `/ingestion` or `/config` |
| Benefits Calculator | `/benefits-calculator` |
| Draft editor + citations | Draft editor with citation/source view |
| Audit Trail | `/audit-trail` |
| Settings / Admin | `/settings` |

---

## 1. Case handling workspace (list + detail + draft)

**Layout:** List (table) with filters and search; detail pane or full page for case; draft editor as overlay or adjacent panel. Citations alongside or below draft. **Exit paths:** Back to Cases; Nav to Ingestion, Benefits Calculator, Audit Trail, Settings.

**Components:** DataTable (cases); Search, Filter dropdowns (Topic, Urgency, Policy area, Precedent); Button (Generate draft, Open); TextArea/rich editor (draft); citation links; optional modal for cited document. **Interactive elements (clickability):** See spec/interactive-components.md § 1 (Case list) and § 2 (Case detail). Every control must be wired: search submit, each filter, row/Open → Case detail, Nav, Clear filters / Adjust search (empty state).

**Logic:** Load case → precedent match and relevance → "Generate draft" → draft and citations → edit/regenerate/save. Permission: Case handler+ for edit/generate/save. **No dead end:** Viewer sees Case list and Case detail (read-only) with Back and Nav.

**Flows:** F2 (search) → F3 (view case) → F4 (generate draft) → F5 (citations) → F6 (edit) → F7 (save/send). Every step has next action (Back or Nav).

**Labels:** Search "Search cases", placeholder "Search by keyword or topic"; Filters "Topic", "Urgency", "Policy area", "Precedent"; Table: Case ID, Topic, Urgency, Policy area, Precedent match, Updated; Buttons "Generate draft", "Open"; "Case detail", "Precedent match", "Policy relevance".

---

## 2. Ingestion / source config

**Layout:** List of configured sources; add/edit source; run or schedule; status. **Exit paths:** Nav to Cases, Benefits Calculator, Audit Trail, Settings. After run → status shown; error → MessageBar + Retry.

**Components:** DataTable or list (sources); Form (add source: type, location, schedule); Button (Run now, Schedule, Refresh); Status indicator. **Interactive elements:** See spec/interactive-components.md § 4. Add source, Run now, Schedule, Refresh, Edit source, Upload/paste email — all must be clickable and wired.

**Logic:** Admin/Case handler configures repositories (4.1.x); routine or ad hoc (4.1.7). **No dead end:** Always Nav; failure → Retry or Back.

**Flow:** F1, F10. **Labels:** "Ingestion sources"; columns Source name, Type, Location, Last run, Status; "Add source", "Run now", "Schedule", "Refresh".

---

## 3. Benefits Calculator

**Layout:** Form inputs (country, salary, location, policy); output area with styled result cards; validation messages. **Exit paths:** Nav to all primary screens; result on same screen; error → fix + Calculate again.

**Components:** Select dropdown (Country: Belgium, France, United Kingdom, United States, Singapore); Input number (Salary); Select dropdown (Location: Brussels (headquarters), Washington D.C., London, Paris, Singapore, Remote (home country)); Select dropdown (Policy: Overseas assignment 2024, Remote work and telework, Parental leave, Education allowance, Housing allowance); Button (Calculate); Result display as two styled cards (Housing allowance: 2,400 EUR/month; Education allowance: 12,000 EUR/year) with policy references and contextual note; MessageBar or inline validation (4.5.2 anomaly). **Interactive elements:** See spec/interactive-components.md § 5. Country, Salary, Location, Policy, Calculate — all wired; loading and error states with next step.

**Logic:** Formula from Excel Benefits Calculator; validate; flag anomalies. **No dead end:** Result or error with clear next step.

**Flow:** F9. **Labels:** "Benefits Calculator"; "Country", "Salary (USD)", "Location", "Policy"; "Calculate"; "Estimated allowances".

---

## 4. Draft editor + citations

**Layout:** Draft content (editable); citation list (title, link); optional panel/tab for cited document. Buttons: Regenerate, Save, Send. **Exit paths:** View case; Save/Send opens modal → **Confirm** (success: "Draft saved. You can continue editing or go to the case." with "Continue editing" / "View case" / "Cases list"; error: MessageBar + retry); **Cancel** → close modal, stay in Draft editor; Nav.

**Components:** TextArea or rich text; citation links; modal/tab for cited doc (4.7.2); Buttons (Regenerate, Save, Send); privacy designation (4.11.3). **Interactive elements:** See spec/interactive-components.md § 3 and § 8. View case, Regenerate, each citation link, Save/Send, modal Confirm/Cancel, success CTAs (Continue editing / View case / Cases list), SME sign-off — all wired.

**Logic:** Draft linked to case; consistency check (4.7.3); compliance flags (4.7.4). RAI: human review; SME override. **No dead end:** Save/Send success or error (retry); View case always available.

**Flows:** F4, F5, F6, F7, F8. **Labels:** "Draft editor", "Draft content", "Citations"; "Regenerate draft", "Save or send", "Edit"; "View case" (top link and footer); "Privacy designation"; success: "Continue editing", "View case", "Cases list".

---

## 5. Audit Trail

**Layout:** Filters (date, user, action type); table (timestamp, user, action, details); export. **Exit paths:** Nav to Cases, Ingestion, Benefits Calculator, Settings; export → file download; empty → "Clear filters" or adjust.

**Components:** Filter inputs; DataTable; Export button. Read-only for non-Admin. **Interactive elements:** See spec/interactive-components.md § 6. Date From/To, User filter, Action type filter, Export, Clear filters (empty) — all wired.

**Logic:** All actions per IMF Data Governance (4.11.1); filter and export. **No dead end:** Always Nav; empty state has CTA.

**Flow:** F11. **Labels:** "Audit Trail"; "Date range", "User", "Action type"; columns Timestamp, User, Action, Details; "Export".

---

## 6. Settings / Admin

**Layout:** User list; role assignment; ingestion config (Admin). **Exit paths:** Nav to all screens.

**Components:** Tables/forms per config. **Interactive elements:** See spec/interactive-components.md § 7. Edit roles, user list, role dropdown, repository config — all wired for Admin; non-Admin has Nav only. **No dead end:** Nav always available.

---

## 7. Case detail with precedent research (from reference/4.png)

**Layout:** Left sidebar (IMF wordmark + "International Monetary Fund" subtitle, Agent selector (HR Robin selected; Policy Pete, Finance Fox, Compliance Cal disabled with "coming soon"), Nav: New chat, Search, Inquiries, Templates; Chat history with tabs All/Case/Chat/Open/Closed; chat list; user profile). Main: case header and summary card; AI query bubble; Research completed + confidence; Precedent categories (accordion); precedent cards with Open case, Copy Reference, Use as Template, Close preview. Right panel: Case metadata; **Generate draft response email**; **Generate draft request** (e.g. retrieve medical documents); employee/request details; supporting document links; **Cited policies** link. Bottom: chat input (Tools, attach, voice, send).

**Exit paths:** Back to Cases; View in ServiceNow / Open in ServiceNow (external); Open case (precedent) → precedent detail overlay or Case detail; Generate draft response email → Draft editor; Generate draft request → Draft editor or modal; Close preview → collapse card; Nav.

**Interactive elements:** See spec/interactive-components.md § 9. Every control has a defined outcome and follow-up screen or overlay.

---

## 8. Reports / Open cases summary (from reference/5.png)

**Layout:** Left sidebar: Open cases summary context; **Summarize open cases** button (full label "Summarize open cases for weekly HR meeting" in title attribute); Research status; report list (e.g. Weekly HR Summary Report with action icons); AI chat input ("Ask about this report…"); Tools. Main: Report title and Last saved; **Save to File** (dropdown: PDF, Word); **Copy to Clipboard**; **Share**; **Close**; **Enhance with AI**; formatting toolbar; **Version history**, **Citations**, **Provenance**; Executive Summary (KPI cards); Overview; Key Issues (HR-contextual: Parental leave extension requests (23 cases), Remote work policy queries (18 cases), Overseas assignment allowance (15 cases), Telework exceptions during mission travel (12 cases)); **Recommendations** (e.g. Update FAQ: Parental Leave Extensions, Remote Work Policy Quick Reference).

**Exit paths:** Close → back to Inquiries or Case list; Save to File → file download or destination picker; Share → share modal/dialog; Version history/Citations/Provenance → overlay or side panel; KPI card click → case list filtered or drill-down; Key issue click → case list or case detail; Recommendation button → policy/FAQ view or external link; Nav.

**Interactive elements:** See spec/interactive-components.md § 10.

---

## Wireframe agent: deficiency handling

If during extraction from reference images or flow-audit you find:
- **Missing entry/exit for a screen** → Update ia-screens.md and flows.md with explicit entry/exit.
- **Missing component or region** → Update this file and design-spec.md § 2.
- **Dead end (no next step)** → Add Back/Nav/Retry/CTA to key-screens and validation-edge-cases.md (empty states, error states).
- **Persona cannot complete a task** → Update roles-permissions.md and flows.md (roles, steps).
- **Flow broken or orphan screen** → Update flows.md (exit screen, steps) and ia-screens.md (entry point).
