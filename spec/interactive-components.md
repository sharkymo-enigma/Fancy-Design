# Interactive components — clickability and actions (Phase 1)

**Purpose:** Single source of truth for **every** clickable/actionable UI element. Each must have a defined **on-action outcome** (navigation, function, or state change). All micro-states (hover, focus, disabled, loading, error, empty) and macro flows must be 100% complete before code build. **Build gate:** No implementation until every row below is implemented and wired.

**Confidence:** 95%

---

## How this file is structured

- **Per screen:** Table of interactive elements: Component | Action type | On click/action → Outcome | Micro-states | Flow(s).
- **Micro-states:** For each control type: default, hover, focus, disabled, loading, error, empty — and what the user can do next in each state.
- **Macro-flow coverage:** Map each flow step to the exact control(s) that trigger it.

---

## 1. Case list / search (`/cases` or `/`)

| # | Component | Action type | On click/action → Outcome | Micro-states | Flow |
|---|-----------|-------------|---------------------------|--------------|------|
| 1.1 | **Nav: Cases** | Link/button | Navigate to `/cases` (stay if already here) | default, hover, focus, active (current page) | Entry for F2, F3 |
| 1.2 | **Nav: Ingestion** | Link/button | Navigate to `/ingestion` | default, hover, focus | F1, F10 entry |
| 1.3 | **Nav: Benefits Calculator** | Link/button | Navigate to `/benefits-calculator` | default, hover, focus | F9 entry |
| 1.4 | **Nav: Audit Trail** | Link/button | Navigate to `/audit-trail` | default, hover, focus | F11 entry |
| 1.5 | **Nav: Settings** | Link/button | Navigate to `/settings` | default, hover, focus; hidden/disabled for non-Admin | — |
| 1.6 | **Search input** | Input + submit (Enter or button) | Apply search; refresh table with filtered results; focus stays in input or moves to table | default, focus, disabled; empty → show all or "Enter to search" | F2 |
| 1.7 | **Topic filter dropdown** | Dropdown select | Set filter; refresh table by topic/policy area | default, focus, open, disabled; empty option = All | F2 |
| 1.8 | **Urgency filter dropdown** | Dropdown select | Set filter; refresh table by urgency | default, focus, open, disabled; empty option = All | F2 |
| 1.9 | **Policy area filter dropdown** | Dropdown select | Set filter; refresh table by policy area | default, focus, open, disabled; empty option = All | F2 |
| 1.10 | **Precedent filter dropdown** | Dropdown select | Set filter; refresh table by precedent match (Yes/No/All) | default, focus, open, disabled | F2 |
| 1.11 | **Case table row** (or row click area) | Row click / "Open" button | Navigate to `/cases/:id` (Case detail) | default, hover, focus (keyboard), selected (optional) | F3 |
| 1.12 | **Open button** (per row, if used) | Button | Same as row click → `/cases/:id` | default, hover, focus, disabled | F3 |
| 1.13 | **Clear filters** (empty state CTA) | Button/link | Clear all filters; refresh table; show full list | default, hover, focus | F2 |
| 1.14 | **Adjust search** (empty state CTA) | Button/link | Focus search input or clear search; refresh table | default, hover, focus | F2 |

**Micro-states (Case list):** Loading → Spinner or skeleton table; table not clickable until loaded. Empty results → message + Clear filters / Adjust search + Nav. Error (e.g. API) → MessageBar + Retry + Nav.

---

## 2. Case detail (`/cases/:id`)

| # | Component | Action type | On click/action → Outcome | Micro-states | Flow |
|---|-----------|-------------|---------------------------|--------------|------|
| 2.1 | **Nav** (all primary) | Same as §1.1–1.5 | Same outcomes | Same | — |
| 2.2 | **Back to Cases** | Button/link | Navigate to `/cases` | default, hover, focus | F3 exit |
| 2.3 | **Generate draft** | Button | Start draft generation; show loading (live region "Generating draft…"); on success → navigate to `/cases/:id/draft`; on error → MessageBar + Retry + View case | default, hover, focus, **loading** (disabled), **disabled** (Viewer) | F4 |
| 2.4 | **Breadcrumb: Cases** (if present) | Link | Navigate to `/cases` | default, hover, focus | F3 exit |

**Micro-states (Case detail):** Viewer: Generate draft hidden or disabled. Loading (Generate draft): button shows Spinner, disabled; live region announces. Error: MessageBar + Retry + View case; Nav available.

---

## 3. Draft editor (`/cases/:id/draft`)

| # | Component | Action type | On click/action → Outcome | Micro-states | Flow |
|---|-----------|-------------|---------------------------|--------------|------|
| 3.1 | **Nav** (all primary) | Same as §1.1–1.5 | Same outcomes | Same | — |
| 3.2 | **View case** | Button/link | Navigate to `/cases/:id` (top link and footer button) | default, hover, focus | F4–F7 exit |
| 3.3 | **Draft content (TextArea / rich editor)** | Input/edit | User edits text; state updated; unsaved indicator if needed | default, focus, disabled (read-only for Viewer), error (validation) | F6 |
| 3.4 | **Regenerate draft** | Button | Trigger regeneration; loading "Generating draft…"; on success → replace draft content and citations; on error → MessageBar + Retry | default, hover, focus, **loading** (disabled), **disabled** (Viewer) | F6 |
| 3.5 | **Citation link** (each) | Link | Open cited document in new tab or pop-up (4.7.2); user can close tab/pop-up to return | default, hover, focus; missing link → "Source link unavailable" (non-clickable or disabled) | F5 |
| 3.6 | **Save or Send** | Button | Open Save/Send modal (or inline destination selector) | default, hover, focus, **disabled** (Viewer) | F7 |
| 3.7 | **Privacy designation** | Dropdown/selector | Set privacy designation for document (4.11.3); state stored for Save/Send | default, focus, open, disabled | F7 |
| 3.8 | **Save/Send modal: Destination** | Dropdown/input | Select repository or email destination; required before Confirm | default, focus, open, error (required) | F7 |
| 3.9 | **Save/Send modal: Confirm** | Button | Submit save/send; on success → close modal + success MessageBar "Draft saved. You can continue editing or go to the case." + "Continue editing" / "View case" / "Cases list"; on error → MessageBar + retry in modal | default, hover, focus, **loading** (disabled) | F7 |
| 3.10 | **Save/Send modal: Cancel** | Button | Close modal; stay in Draft editor | default, hover, focus | F7 |
| 3.11 | **Success message: Continue editing** (primary) | Button | Close message; stay on Draft editor | default, hover, focus | F7 |
| 3.12 | **Success message: View case** | Button/link | Navigate to `/cases/:id` | default, hover, focus | F7 |
| 3.13 | **Success message: Cases list** | Button/link | Navigate to `/cases` | default, hover, focus | F7 |
| 3.14 | **SME sign-off / Override** (Reviewer, Admin) | Button/control | Record sign-off or override with reason; update state; audit log; stay on Draft editor or Case detail | default, hover, focus | F8 |

**Micro-states (Draft editor):** No draft yet → message + "View case" (to generate from Case detail). Loading (Regenerate): Spinner + live region; Regenerate disabled. Policy compliance warning: MessageBar + Continue editing / Edit / Send anyway. Save/Send error: MessageBar in modal + fix destination + retry; Cancel always closes modal.

---

## 4. Ingestion / config (`/ingestion`)

| # | Component | Action type | On click/action → Outcome | Micro-states | Flow |
|---|-----------|-------------|---------------------------|--------------|------|
| 4.1 | **Nav** (all primary) | Same as §1.1–1.5 | Same outcomes | Same | — |
| 4.2 | **Add source** | Button | Open Add source form or modal; user fills type, location, schedule; Submit adds source to list; Cancel closes | default, hover, focus, **disabled** (Viewer) | F1 |
| 4.3 | **Add source form: Source type** | Dropdown | Select type (ServiceNow, OneDrive/SharePoint, Excel, Outlook, Nexus, PeopleSoft) | default, focus, open | F1 |
| 4.4 | **Add source form: Location** | Input | Enter path or URL | default, focus, error (required) | F1 |
| 4.5 | **Add source form: Schedule** | Dropdown/input | Optional schedule | default, focus, open | F1 |
| 4.6 | **Add source form: Submit** | Button | Save source; close form; refresh list; on error → MessageBar + Retry/Cancel | default, hover, focus, **loading** (disabled) | F1 |
| 4.7 | **Add source form: Cancel** | Button | Close form; no save | default, hover, focus | F1 |
| 4.8 | **Run now** (per source or global) | Button | Trigger ingestion; status → Running then Completed/Failed; on error → MessageBar + Retry | default, hover, focus, **loading** (disabled while running) | F1 |
| 4.9 | **Schedule** (per source, if applicable) | Button/dropdown | Set or edit schedule; save | default, hover, focus, open | F1 |
| 4.10 | **Refresh** | Button | Refresh source list and status | default, hover, focus | F1 |
| 4.11 | **Edit source** (per row, if present) | Button/link | Open edit form; same as Add with pre-filled values; Submit/Cancel | default, hover, focus; disabled for Viewer | F1 |
| 4.12 | **Upload / paste email** (F10) | Button + file input or paste area | Upload .msg/.eml or paste content; metadata extracted; display for review; user can edit via prompts; Ingest → Cases | default, hover, focus, **loading** (processing), error (file type) | F10 |

**Micro-states (Ingestion):** No sources → "Add source" CTA + Nav. Running → Run now disabled; status "Running". Failed → MessageBar + Retry + Nav.

---

## 5. Benefits Calculator (`/benefits-calculator`)

| # | Component | Action type | On click/action → Outcome | Micro-states | Flow |
|---|-----------|-------------|---------------------------|--------------|------|
| 5.1 | **Nav** (all primary) | Same as §1.1–1.5 | Same outcomes | Same | — |
| 5.2 | **Country** | Select dropdown | Select country (Belgium, France, United Kingdom, United States, Singapore); validate on blur/submit | default, focus, open, error (required) | F9 |
| 5.3 | **Salary (USD)** | Input (number) | Enter amount; validate; anomaly flag (4.5.2) | default, focus, error (required/invalid/anomaly) | F9 |
| 5.4 | **Location** | Select dropdown | Select assignment location (Brussels (headquarters), Washington D.C., London, Paris, Singapore, Remote (home country)) | default, focus, open, error (required) | F9 |
| 5.5 | **Policy** | Select dropdown | Select policy (Overseas assignment 2024, Remote work and telework, Parental leave, Education allowance, Housing allowance) | default, focus, open, error (required) | F9 |
| 5.6 | **Calculate** | Button | Validate inputs; if valid → run calculation; show result in result area; if invalid/anomaly → MessageBar + fix inputs | default, hover, focus, **loading** (disabled), **disabled** (until required filled) | F9 |
| 5.7 | **Result area** (two styled cards) | Display only | No click; shows Housing allowance (2,400 EUR/month) and Education allowance (12,000 EUR/year) as styled cards with policy references and contextual note | — | F9 |

**Micro-states (Benefits Calculator):** Validation error → MessageBar + fix + Calculate again. Anomaly → MessageBar "Anomaly detected; please verify inputs." Nav always available.

---

## 6. Audit Trail (`/audit-trail`)

| # | Component | Action type | On click/action → Outcome | Micro-states | Flow |
|---|-----------|-------------|---------------------------|--------------|------|
| 6.1 | **Nav** (all primary) | Same as §1.1–1.5 | Same outcomes | Same | — |
| 6.2 | **Date range: From** | Input (date) | Set filter; refresh table | default, focus, error | F11 |
| 6.3 | **Date range: To** | Input (date) | Set filter; refresh table | default, focus, error | F11 |
| 6.4 | **User filter** | Dropdown/input | Set filter; refresh table | default, focus, open | F11 |
| 6.5 | **Action type filter** | Dropdown | Set filter; refresh table | default, focus, open | F11 |
| 6.6 | **Export** | Button | Export filtered (or full) audit to file; download starts; stay on screen | default, hover, focus, **loading** (disabled while generating) | F11 |
| 6.7 | **Clear filters** (empty state) | Button/link | Clear filters; refresh table | default, hover, focus | F11 |

**Micro-states (Audit Trail):** Empty (no rows match) → message + Clear filters + Nav. Loading table → Spinner or skeleton. Export loading → button disabled until done.

---

## 7. Settings / Admin (`/settings`)

| # | Component | Action type | On click/action → Outcome | Micro-states | Flow |
|---|-----------|-------------|---------------------------|--------------|------|
| 7.1 | **Nav** (all primary) | Same as §1.1–1.5 | Same outcomes | Same | — |
| 7.2 | **Edit roles** | Button | Open role assignment UI (e.g. user list + role dropdown per user); Save/Cancel | default, hover, focus, **disabled** (non-Admin) | Admin |
| 7.3 | **User list row** (if present) | — | Select user for role edit (or inline dropdown per row) | default, hover, focus | Admin |
| 7.4 | **Role dropdown** (per user) | Dropdown | Change role; Save or auto-save; audit log | default, focus, open | Admin |
| 7.5 | **Repository config** (if present) | Link/button | Open config (may link to Ingestion or dedicated config); Admin only | default, hover, focus | Admin |

**Micro-states (Settings):** Non-Admin: screen read-only or hidden; Nav to other screens. Admin: all controls actionable.

---

## 8. Export / Save or Send (modal or overlay)

| # | Component | Action type | On click/action → Outcome | Micro-states | Flow |
|---|-----------|-------------|---------------------------|--------------|------|
| 8.1 | **Destination selector** | Dropdown/input | Select repository or email; required for Confirm | default, focus, open, error (required) | F7 |
| 8.2 | **Privacy designation** | Dropdown | Set designation (4.11.3) | default, focus, open | F7 |
| 8.3 | **Confirm** | Button | Submit; success → close modal + success message "Draft saved. You can continue editing or go to the case." with Continue editing / View case / Cases list; error → MessageBar in modal + retry | default, hover, focus, **loading** (disabled) | F7 |
| 8.4 | **Cancel** | Button | Close modal; return to Draft editor | default, hover, focus | F7 |
| 8.5 | **Close (X)** (if present) | Button | Same as Cancel | default, hover, focus | F7 |

---

## 9. Case detail with precedent research (from reference/4.png)

**Screen:** Enhanced Case detail or Inquiries with case context. **Route:** `/cases/:id` or `/inquiries?case=:id`. All components below must be clickable with defined outcome and follow-up screen or overlay.

| # | Component | Action type | On click/action → Outcome | Follow-up screen / overlay | Flow |
|---|-----------|-------------|---------------------------|----------------------------|------|
| 9.1 | **Agent selector** | Dropdown | Select agent: HR Robin (available), Policy Pete (disabled, "coming soon"), Finance Fox (disabled), Compliance Cal (disabled); refresh context or chat mode | Stay on screen; research/chat context updated | F3, F4 |
| 9.2 | **Nav: New chat** | Button/link | Start new chat; navigate to `/inquiries` or clear chat; optional case selector | Inquiries or Case list | — |
| 9.3 | **Nav: Search** | Button/link | Navigate to Case list (search) or `/cases` | Case list | F2 |
| 9.4 | **Nav: Inquiries** | Button/link | Navigate to `/inquiries` (chat history list) | Inquiries | — |
| 9.5 | **Nav: Templates** | Button/link | Open Templates screen or overlay (document/prompt templates) | Templates overlay or `/templates` | — |
| 9.6 | **Chat filter tabs** (All, Case, Chat, Open, Closed) | Tabs | Filter chat list by type/status; refresh list | Stay on screen; list filtered | — |
| 9.7 | **Chat list item** | Row/link click | Open that chat/case; load case detail and research in main area | Stay on screen; main content updates to selected chat/case | F3 |
| 9.8 | **Chat item tags** (e.g. ##MEDICALCOMPLICATIONS, In Progress) | Link/tag click | Filter by tag or status; or open tag context | Stay on screen; filter or overlay | — |
| 9.9 | **User profile** (bottom left) | Button/link | Open user menu: profile, settings, logout | Dropdown/menu overlay; Settings or logout | — |
| 9.10 | **View in ServiceNow** (case summary card) | Button/link | Open case in ServiceNow in new tab (external) | New browser tab; stay on current screen | — |
| 9.11 | **Ellipsis menu** (case card) | Button | Open context menu: Copy link, Share, Print, etc. | Menu overlay; action runs then menu closes | — |
| 9.12 | **Open in ServiceNow** (top right) | Button/link | Same as 9.10 — open case in ServiceNow (external) | New tab | — |
| 9.13 | **Star (favorite)** | Button | Toggle case favorite; state saved | Stay on screen; visual toggle | — |
| 9.14 | **Clock (history)** | Button | Open case history overlay or panel | Overlay/panel: case activity log; Close → back | — |
| 9.15 | **Share** | Button | Open share dialog (email, link, copy link) | Share overlay; Cancel/Share then close | — |
| 9.16 | **Print** | Button | Print current case view or open print dialog | Print dialog or print preview | — |
| 9.17 | **Expand/collapse** | Button | Expand or collapse right panel or section | Stay on screen; layout toggles | — |
| 9.18 | **Close (X)** | Button | Close case view; navigate to Case list or Inquiries | `/cases` or `/inquiries` | F3 exit |
| 9.19 | **Precedent accordion** (e.g. Medical complications) | Accordion | Expand/collapse precedent category; show/hide case cards | Stay on screen | F3 |
| 9.20 | **Open case** (on precedent card) | Link/button | Open that precedent case in overlay or navigate to Case detail for that case | Overlay (precedent detail) or `/cases/:precedentId`; Close/Back returns | F3, F5 |
| 9.21 | **Copy Reference** (precedent card) | Link/button | Copy precedent reference (e.g. case ID, citation) to clipboard; optional toast "Copied" | Stay on screen; clipboard updated | — |
| 9.22 | **Use as Template** | Checkbox/toggle | Mark precedent as template for current case; applied when generating draft | Stay on screen; state saved; used in F4 | F4 |
| 9.23 | **Close preview** (precedent card) | Button | Collapse or close expanded precedent card | Stay on screen | — |
| 9.24 | **Chat input** (Ask me about HR policies...) | Input + send | Send message to AI; response appears in thread; may trigger research refresh | Stay on screen; new message/response added | F6 (prompt-based revision) |
| 9.25 | **Tools** (chat input) | Button | Open Tools overlay: commands, attachments, integrations | Overlay; select tool or Cancel | — |
| 9.26 | **Attach** (chat input) | Button | Open file picker or paste; attach file to chat | File picker or paste area; file attached to message | — |
| 9.27 | **Voice input** (microphone) | Button | Start voice input; speech-to-text into chat input | Stay on screen; transcript in input | — |
| 9.28 | **Send** (chat input) | Button | Same as 9.24 — send message | Stay on screen | — |
| 9.29 | **Generate draft response email** | Button | Generate draft response email from case + precedents; loading then navigate to Draft editor or open draft in panel | Draft editor `/cases/:id/draft` or draft panel; View case | F4 |
| 9.30 | **Generate draft request** (e.g. retrieve medical documents) | Button | Generate draft request (e.g. for documents); loading then Draft editor or modal | Draft editor or modal; Close/View case | F4 variant |
| 9.31 | **Supporting document link** (each) | Link | Open document in new tab or preview overlay | New tab or overlay; Close returns | F5 |
| 9.32 | **Cited policies** link (e.g. HR Policy 6.2.2) | Link | Open policy document in new tab or overlay | New tab or overlay; Close returns | F5 |

**Micro-states:** Loading (Generate draft buttons): Spinner, disabled; then navigate or show draft. Error: MessageBar + Retry + View case; Nav available.

---

## 10. Reports / Open cases summary (from reference/5.png)

**Screen:** Reports or Open cases summary. **Route:** `/reports` or `/reports/summary`. All components below must be clickable with defined outcome and follow-up.

| # | Component | Action type | On click/action → Outcome | Follow-up screen / overlay | Flow |
|---|-----------|-------------|---------------------------|----------------------------|------|
| 10.1 | **Summarize open cases** (title attribute: "Summarize open cases for weekly HR meeting") | Button | Generate or refresh weekly summary report; loading then report content appears in main area | Stay on screen; main area shows report (F13) | F13 |
| 10.2 | **Report list item** (e.g. Weekly HR Summary Report) | Row/link click | Select report; load report content in main area; arrow indicates active | Stay on screen; main content updates | F13 |
| 10.3 | **Report list item action icons** (e.g. print, share, download) | Button (each icon) | Print / Share / Download that report | Print dialog; Share overlay; file download | F7, F13 |
| 10.4 | **AI chat input** (Ask me about HR policies...) | Input + send | Send message; response in chat thread or inline | Stay on screen; response displayed | — |
| 10.5 | **Tools** (chat) | Button | Open Tools overlay for chat | Overlay; Cancel or select | — |
| 10.6 | **Save to File** (dropdown) | Button + dropdown | Open dropdown: Save as PDF, Save as Word; select → save file or destination picker | File download or Save destination modal; then close | F7 |
| 10.7 | **Copy to Clipboard** | Button | Copy report content to clipboard; toast "Copied" | Stay on screen | — |
| 10.8 | **Share** | Button | Open share overlay (email, link, copy link) | Share overlay; Cancel/Share → close | — |
| 10.9 | **Close** (report view) | Button | Close report view; return to Inquiries or Case list | `/inquiries` or `/cases` | F13 exit |
| 10.10 | **Enhance with AI** | Button | Trigger AI enhancement of report content; loading then updated content | Stay on screen; content replaced or diff shown | F6 variant |
| 10.11 | **Formatting toolbar** (Bold, Italic, Underline, List, etc.) | Buttons | Apply formatting to selected text or cursor position | Stay on screen | F6 |
| 10.12 | **Version history** | Button | Open Version history overlay: list of saved versions with dates; select → restore or view | Overlay; Select version or Close | — |
| 10.13 | **Citations** | Button | Open Citations overlay or panel: list of sources used in report | Overlay/panel; link click → open source; Close | F5 |
| 10.14 | **Provenance** | Button | Open Provenance overlay: data origin, lineage | Overlay; Close | — |
| 10.15 | **KPI card** (e.g. EMPLOYEES AFFECTED, RESOLUTION RATE) | Card click (optional) | Drill down to filtered case list or detail for that metric | Case list with filter or drill-down overlay; Back returns | F2, F3 |
| 10.16 | **Key issue bullet** (e.g. Parental leave extension requests (23 cases)) | Link/click | Filter case list by that issue or open case list for that issue | Case list filtered or overlay; Back returns | F2 |
| 10.17 | **Recommendation button** (e.g. Update FAQ: Parental Leave) | Button/link | Navigate to FAQ/policy editor or open policy document in new tab | Policy/FAQ screen or new tab; Back/Close returns | — |
| 10.18 | **Recommendation button** (e.g. Remote Work Policy Quick Reference) | Button/link | Open Remote Work Policy document or quick reference overlay | New tab or overlay; Close returns | — |

**Micro-states:** Loading (Summarize, Enhance with AI): Spinner, disabled; then content updated. Empty report list: "Summarize open cases..." CTA + Nav.

---

## Micro-states summary (all screens)

| State | Behaviour | User can always |
|-------|-----------|------------------|
| **default** | Control ready for interaction | Click/activate per table above |
| **hover** | Visual feedback (Fluent 2) | Same as default |
| **focus** | Focus ring; keyboard nav | Activate with Enter/Space; Tab to next |
| **disabled** | Control not available (e.g. Viewer, loading) | Use Nav or other enabled control; never stuck |
| **loading** | Operation in progress (e.g. Generate draft, Run now, Export) | Wait; or Cancel/Back if offered; Nav remains |
| **error** | Validation or API error | MessageBar + Retry/Back/Clear/fix + Nav |
| **empty** | No data (no results, no sources, no draft) | CTA (Clear filters, Add source, View case) + Nav |

---

## Macro-flow coverage (F1–F11)

| Flow | Entry control(s) | Step controls | Exit control(s) |
|------|------------------|---------------|-----------------|
| F1 | Nav Ingestion; Add source | Add form (type, location, schedule), Submit; Run now; Refresh | Nav to Cases; Retry/Back on error |
| F2 | Nav Cases; Search input; Filter dropdowns | Apply search/filters; table refreshes | Row click → F3; Clear filters (empty); Nav |
| F3 | Row click / Open (Case list) | — | Back to Cases; Generate draft → F4; Nav |
| F4 | Generate draft (Case detail) | Loading state; live region | Navigate to Draft editor; Retry/Back on error |
| F5 | Citation links (Draft editor) | Open in new tab/pop-up | Close tab/pop-up → back to Draft editor |
| F6 | Draft text edit; Regenerate | Edit; Regenerate (loading); compliance MessageBar | Save/Send → F7; View case; Nav |
| F7 | Save or Send (Draft editor) | Modal: Destination, Privacy, Confirm, Cancel | Success: Continue editing / View case / Cases list; Error: retry in modal; Cancel → Draft editor |
| F8 | SME sign-off / Override (Draft or Case detail) | Record sign-off/override | Stay on screen or Back to Cases; Nav |
| F9 | Nav Benefits Calculator; Country, Salary, Location, Policy; Calculate | Result displayed | Nav; error → fix + Calculate again |
| F10 | Nav Ingestion; Upload/paste email | Metadata review; edit prompts; Ingest | Ingestion status or Nav to Cases; Retry on error |
| F11 | Nav Audit Trail; Date/User/Action filters; Export | Table view; filter refresh | Export → file; Clear filters (empty); Nav |
| F12 | Nav Settings (Admin) | Edit roles; User list; Role dropdown; Repository config | Stay on Settings or Nav to any screen |
| F13 | Summarize open cases for weekly meeting | §10.1 Summarize button; report list item | Report view; Save to File, Copy, Share, Close; Version history/Citations/Provenance; KPI/Key issue/Recommendation links | Close → Inquiries/Cases; Nav |
| F14 | Generate draft (precedent UI) | §9.29 Generate draft response email; §9.30 Generate draft request | Loading → Draft editor or panel | Draft editor; View case; Nav |

---

## Build gate (implementation checklist)

Before starting code build, verify:

- [ ] Every component in this document has a corresponding click/handler in the app (navigation, state update, or API call).
- [ ] Every micro-state (loading, error, empty, disabled) has UI and a next step (no dead end).
- [ ] Every macro flow (F1–F14) can be executed end-to-end using only the controls above.
- [ ] Nav items are present on every screen and route to the correct path.
- [ ] Back / Cancel / Clear filters / Retry buttons are implemented and wired.
- [ ] MessageBar (or equivalent) is used for errors with Retry/Back/Nav as specified.
- [ ] Role-based disabling (Viewer, Case handler, Reviewer, Admin) is applied per permission matrix.

**Any deficiency must be added to this document and the related spec artefact (key-screens, flows, validation-edge-cases) before build.**
