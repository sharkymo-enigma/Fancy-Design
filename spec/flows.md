# User flows

**Purpose:** Single source of truth for all user flows. Each flow has steps, decision points, **entry and exit screens**, and **interactive elements** that trigger each step. Flows must never dead-end: every path offers a clear next step. **Every control used in a flow must be clickable and wired** — see `spec/interactive-components.md` for the full inventory. No code build until 100% complete.

**Confidence:** 90% (evidence-based: F1–F16 wired; F15 Ask HR Robin + F16 Template selection→draft added; F10 email ingestion basic — see spec/confidence-assessment.md)

---

## How this file is structured

- Flow index — Flow ID, name, use case, trigger, roles, **entry screen**, **exit screen(s)**.
- One section per flow — Trigger, roles, entry, steps, decision points, **exit / next steps (no dead ends)**.

---

## Flow index (Phase 1: HR Robin)

| Id | Flow name | Use case | Trigger | Roles | Entry screen | Exit screen(s) |
|----|------------|----------|---------|-------|--------------|----------------|
| F1 | Ingest documents | HR Robin | Upload / connect repository / paste | Case handler+ | Ingestion | Ingestion (status) or Cases |
| F2 | Search and filter | HR Robin | User runs search or applies filters | All | Case list | Case list (results) |
| F3 | View case and precedent match | HR Robin | Open case from list | All | Case list | Case detail |
| F4 | Generate draft | HR Robin | User clicks Generate draft | Case handler+ | Case detail | Draft editor |
| F5 | View citations and sources | HR Robin | View draft / citations | All | Draft editor | Draft editor or Citation view (pop-up/tab) |
| F6 | Review and edit draft | HR Robin | Edit inline or prompt; regenerate | Case handler+, SME | Draft editor | Draft editor (updated) |
| F7 | Save or send output | HR Robin | Save/Send from draft | Case handler+ | Draft editor | Success + Continue editing / View case / Cases list |
| F8 | SME validation / override | RAI | Reviewer signs off or overrides | Reviewer, Admin | Case detail / Draft editor | Case detail or Draft editor (state updated) |
| F9 | Allowance calculation | HR Robin | User inputs; Calculate | Case handler+ | Benefits Calculator | Benefits Calculator (result) |
| F10 | Email ingestion | HR Robin | Upload .msg/.eml or paste | Case handler+ | Ingestion | Ingestion (review) or Case list |
| F11 | Audit trail view / export | All | Open audit; filter; export | All | Audit Trail | Audit Trail (filtered) or exported file |
| F12 | Admin / role management | HR Robin | Admin configures roles and repository | Admin | Settings | Settings or Nav to any screen |
| F13 | Summarize open cases for weekly meeting | HR Robin | User clicks "Summarize open cases" button (ref 5.png) | Case handler+ | Reports (`/reports`) | Reports view (report content); Save to File / Copy / Share / Close; Version history / Citations / Provenance overlays; KPI / Key issue / Recommendation links |
| F14 | Generate draft from precedent UI | HR Robin | User clicks "Generate draft response email" or "Generate draft request" on Case detail (ref 4.png) | Case handler+ | Case detail with precedent research | Draft editor or draft panel; View case; Nav |

| F15 | Ask HR Robin (conversational AI entry) | HR Robin | User clicks "Ask HR Robin" in sidebar | All with inquiry access | Chat (new conversation) | Chat (ongoing) or Case detail (linked case) |
| F16 | Template selection → draft generation from precedents | HR Robin | User checks "Use as template" on precedent cards | Case handler+ | Case detail (precedent research) | Draft editor (with selected templates as reference) |

**No flow ends in a dead end:** Every exit leads to a named screen or explicit next action (see per-flow sections).

---

## F1 — Ingest documents

**Trigger:** User uploads files, connects repository (ServiceNow, OneDrive/SharePoint, Excel, Outlook, Nexus, PeopleSoft), or triggers ad hoc/scheduled detection.

**Roles:** Case handler, Reviewer, Admin. Viewer: no ingest.

**Entry:** Ingestion / config (Nav Ingestion or direct route).

**Interactive elements used (must be wired):** Nav Ingestion; Add source (opens form); Add source form (Source type, Location, Schedule, Submit, Cancel); Run now; Schedule; Refresh; Edit source (if present). See interactive-components.md § 4.

**Steps:** 1. Select source (upload vs repository). 2. Configure or select location (4.1.x). 3. System detects, retrieves, ingests; optional routine/ad hoc refresh (4.1.7). 4. Content appears in search/case list.

**Decision points:** Source type; permissions; repository availability. If failure → show error (MessageBar) + "Retry" / "Back to Ingestion".

**Exit / next steps (no dead end):** Ingestion (status shown) **or** navigate to Cases to see new content. Always: Nav to Cases, Ingestion, Benefits Calculator, Audit Trail, Settings available.

---

## F2 — Search and filter

**Trigger:** User runs search or applies filters (topic, urgency, policy area, precedent).

**Roles:** All.

**Entry:** Case list (Nav Cases or `/cases`).

**Interactive elements used (must be wired):** Search input (submit/Enter); Topic, Urgency, Policy area, Precedent filter dropdowns; table refresh on change; Clear filters / Adjust search (empty state). See interactive-components.md § 1.

**Steps:** 1. Enter keyword or select filters. 2. Results in table; click row/link → Case detail (F3).

**Exit / next steps:** Case list (results). Empty results → message + "Clear filters" / "Adjust search". Always: Open case (F3) or use nav.

---

## F3 — View case and precedent match

**Trigger:** User opens case from list.

**Roles:** All.

**Entry:** Case list.

**Interactive elements used (must be wired):** Case table row click or Open button → navigate to `/cases/:id`; Back to Cases; Generate draft (Case handler+); Nav. See interactive-components.md § 1 (row), § 2 (Case detail).

**Steps:** 1. Click case row/link. 2. Case detail with precedent match, policy relevance. 3. Case handler+: "Generate draft" → F4. Viewer: no Generate draft.

**Exit / next steps (no dead end):** "Back to Cases" → Case list. "Generate draft" → F4 (Draft editor). Nav always available.

---

## F4 — Generate draft

**Trigger:** User clicks Generate draft on Case detail.

**Roles:** Case handler+.

**Entry:** Case detail (`/cases/:id`).

**Interactive elements used (must be wired):** Generate draft button (loading state, live region, then navigate to `/cases/:id/draft`); on error: MessageBar + Retry + View case; Nav. See interactive-components.md § 2.

**Steps:** 1. System generates draft (policy + precedent). 2. Draft editor opens with content and citations (F5). Loading: live region "Generating draft…" then "Draft ready" or error.

**Exit / next steps:** Draft editor (F5, F6, F7). Error → MessageBar + "Retry" / "View case". Never leave user without Back or Nav.

---

## F5 — View citations and sources

**Trigger:** View draft; citations listed.

**Roles:** All.

**Entry:** Draft editor (or Case detail when draft exists).

**Interactive elements used (must be wired):** Each citation link → open in new tab or pop-up; user closes tab/pop-up to return. Missing link → "Source link unavailable" (non-clickable). See interactive-components.md § 3.

**Steps:** 1. Citation list with document title, link. 2. Click citation → separate tab or pop-up (4.7.2). 3. Return to Draft editor or close tab/pop-up.

**Exit / next steps:** Back to Draft editor; or close modal/tab. No dead end.

---

## F6 — Review and edit draft

**Trigger:** Edit inline or enter prompt; regenerate.

**Roles:** Case handler+, SME.

**Entry:** Draft editor.

**Interactive elements used (must be wired):** Draft TextArea/editor (edit); Regenerate button (loading, then updated content); compliance MessageBar (stay/edit/Send); View case; Save/Send; Nav. See interactive-components.md § 3.

**Steps:** 1. Inline edit or prompt for revision. 2. Regenerate if needed. 3. Consistency check vs policies (4.7.3); compliance flags (4.7.4) → MessageBar or inline. 4. Optional: Save/Send (F7).

**Exit / next steps:** Stay in Draft editor; or "Save/Send" (F7); or "View case" → Case detail. Nav always available.

---

## F7 — Save or send output

**Trigger:** User clicks Save or Send from Draft editor.

**Roles:** Case handler+.

**Entry:** Draft editor.

**Interactive elements used (must be wired):** Save or Send button → open modal; Destination selector (required); Privacy designation; Confirm (loading, then success or error); Cancel/Close. Success: "Continue editing" (primary) / "View case" / "Cases list". Error: MessageBar in modal + retry. See interactive-components.md § 3, § 8.

**Steps:** 1. Select destination (repository/email). 2. Optional: privacy designation (4.11.3). 3. Confirm. 4. Success → message "Draft saved. You can continue editing or go to the case." with three CTAs: **"Continue editing"** (primary — default, keeps user in draft), **"View case"** (→ Case detail), **"Cases list"** (→ Case list). Error → MessageBar (e.g. "Please select a destination").

**Exit / next steps (no dead end):** Success → "Continue editing" (stays in Draft editor, primary/default action) / "View case" (→ Case detail `/cases/:id`) / "Cases list" (→ Case list `/cases`). Error → MessageBar + fix + retry. Never leave user without next action.

---

## F8 — SME validation / override

**Trigger:** Reviewer signs off or overrides AI recommendation.

**Roles:** Reviewer, Admin.

**Entry:** Case detail or Draft editor.

**Interactive elements used (must be wired):** SME sign-off / Override button or control; record reason if required; state updated; audit logged; stay or Back to Cases; Nav. See interactive-components.md § 3.

**Steps:** 1. Review draft/evidence. 2. Sign off or override with reason. 3. State updated; audit logged.

**Exit / next steps:** Case detail or Draft editor (updated); or Back to Cases. Nav available.

---

## F9 — Allowance calculation (Benefits Calculator)

**Trigger:** User selects country, enters salary, selects location and policy, and clicks Calculate.

**Roles:** Case handler+.

**Entry:** Benefits Calculator (Nav or `/benefits-calculator`).

**Interactive elements used (must be wired):** Country select dropdown (Belgium, France, United Kingdom, United States, Singapore); Salary input (text/number); Location select dropdown (Brussels (headquarters), Washington D.C., London, Paris, Singapore, Remote (home country)); Policy select dropdown (Overseas assignment 2024, Remote work and telework, Parental leave, Education allowance, Housing allowance); Calculate button (loading when running; disabled until required fields filled); result area (styled cards); validation/anomaly MessageBar + fix + Calculate again; Nav. See interactive-components.md § 5.

**Steps:** 1. Select country from dropdown (required). 2. Enter salary (required). 3. Select location from dropdown (required). 4. Select policy from dropdown (required). 5. Click Calculate. 6. Validate; flag anomalies (4.5.2). 7. Results display as **styled benefit cards** (e.g. "Housing: 2,400 EUR/month", "Education: 12,000 EUR/year") with a contextual note referencing the selected country, location, and policy.

**Exit / next steps (no dead end):** Result cards shown on same screen. Validation error → MessageBar + fix. "Back" or Nav to Cases, Ingestion, Audit Trail, Settings.

---

## F10 — Email ingestion

**Trigger:** Upload .msg/.eml or paste email (4.2).

**Roles:** Case handler+.

**Entry:** Ingestion.

**Interactive elements used (must be wired):** Upload button / file input or paste area; metadata display; edit prompts if offered; Ingest action; on error MessageBar + Retry/Back; Nav. See interactive-components.md § 4.

**Steps:** 1. Upload or paste. 2. Metadata extracted (Sender, Date, Subject, Recipients). 3. Display for review; edit via prompts if needed. 4. Ingest → content available in search/cases.

**Exit / next steps:** Ingestion (status) or Cases. Error → MessageBar + Retry / Back.

---

## F11 — Audit trail view / export

**Trigger:** User opens Audit Trail; optionally filters (date, user, action); exports.

**Roles:** All (read-only; export as per permissions).

**Entry:** Audit Trail (Nav or `/audit-trail`).

**Interactive elements used (must be wired):** Date From/To, User filter, Action type filter (refresh table); Export button (loading then download); Clear filters (empty state); Nav. See interactive-components.md § 6.

**Steps:** 1. View table (timestamp, user, action, details). 2. Filter if needed. 3. Export if needed.

**Exit / next steps:** Stay on Audit Trail (filtered) or file downloaded. Nav to Cases, Ingestion, Benefits Calculator, Settings. Empty state → message + "Clear filters" or adjust. No dead end.

---

## F12 — Admin / role management

**Trigger:** Admin opens Settings to manage user roles or repository config.

**Roles:** Admin only.

**Entry:** Settings (Nav "Settings").

**Interactive elements used (must be wired):** Edit roles (opens role assignment UI); User list row (select user for role edit or inline dropdown per row); Role dropdown (per user); Repository config link/button; Save/Cancel where applicable; Nav. See interactive-components.md § 7.

**Steps:** 1. Open Settings. 2. Edit roles → user list + role dropdown per user; save or auto-save; audit logged. 3. Optional: Repository config (may link to Ingestion or dedicated config).

**Exit / next steps (no dead end):** Stay on Settings or Nav to Cases, Ingestion, Benefits Calculator, Audit Trail. No dead end.

---

## F13 — Summarize open cases for weekly meeting (from reference 5.png)

**Trigger:** User clicks "Summarize open cases" button (full label "Summarize open cases for weekly HR meeting" in title attribute) from Open cases summary context (left sidebar in report flow).

**Roles:** Case handler, Reviewer, Admin.

**Entry:** Reports (`/reports`). Context: Open cases summary. **Note:** The chat section (All/Case/Chat/Open/Closed tabs + chat list) only appears on case detail pages (`/cases/:id`), not on `/inquiries` or `/reports`. The Reports screen has its own sidebar with summarize button, report list, and AI chat input.

**Interactive elements used (must be wired):** "Summarize open cases" button (§10.1); report list item click (§10.2); report action icons (§10.3); Save to File dropdown (§10.6); Copy to Clipboard (§10.7); Share (§10.8); Close (§10.9); Enhance with AI (§10.10); Version history, Citations, Provenance (§10.12–10.14); KPI card, Key issue, Recommendation buttons (§10.15–10.18). See interactive-components.md § 10.

**Steps:** 1. User triggers summarize (button). 2. System generates weekly HR summary report (loading). 3. Report appears in main area (Executive Summary, Overview, Key Issues, Recommendations). 4. User may Save to File (PDF/Word), Copy, Share, Close; open Version history/Citations/Provenance overlays; click KPI/issue/recommendation for drill-down or policy link. 5. **Version history overlay:** Lists saved versions (e.g. "Current (Mar 5, 2025 14:32)", "Mar 5, 2025 10:15", "Feb 28, 2025 16:00"); user selects to restore/view a version or closes overlay. 6. **Citations overlay:** Lists cited sources (e.g. HR Policy 4.2, HR Policy 3.1, Precedent C-2024-0891, C-2024-0902, Weekly case snapshot); user clicks to open source or closes overlay. 7. **Provenance overlay:** Shows Source (ServiceNow), Scope (date range), Generated by (HR Robin), Confidence (97%); user reviews and closes.

**Exit / next steps (no dead end):** Close → return to Cases or Nav. Save/Copy/Share → file or overlay then continue. Overlays (Version history, Citations, Provenance, Share) have Close/Cancel. KPI/issue click → Case list filtered or overlay; Back returns. Recommendation → policy/FAQ view or new tab; Back/Close returns. Nav always available.

---

## F14 — Generate draft from precedent UI (from reference 4.png)

**Trigger:** User clicks "Generate draft response email" or "Generate draft request" (e.g. retrieve medical documents) on Case detail with precedent research.

**Roles:** Case handler, Reviewer, Admin.

**Entry:** Case detail with precedent research (`/cases/:id` enhanced or Inquiries with case context).

**Interactive elements used (must be wired):** "Generate draft response email" button (§9.29); "Generate draft request" button (§9.30). Loading state then navigate to Draft editor or open draft in panel. See interactive-components.md § 9.

**Steps:** 1. User clicks Generate draft response email (or Generate draft request). 2. System generates draft using case + precedents (and optional "Use as Template" selections). 3. Loading: live region "Generating draft…". 4. On success: navigate to Draft editor (`/cases/:id/draft`) or show draft in panel. 5. User can edit, regenerate, Save/Send (F6, F7).

**Exit / next steps (no dead end):** Draft editor with View case and Nav. On error: MessageBar + Retry + View case; Nav available.

---

## F15 — Ask HR Robin (conversational AI entry)

**Trigger:** User clicks "Ask HR Robin" button in sidebar (replaces generic "New conversation"). The button is tied to the active agent (HR Robin); clicking it creates a new conversation with HR Robin context.

**Roles:** All with inquiry access (Case handler+, Reviewer, Admin).

**Entry:** Any screen (sidebar button visible globally).

**Interactive elements used (must be wired):** "Ask HR Robin" button (sidebar — gradient button with Sparkles icon); Chat input (empty state); Quick suggestion chips ("Parental leave precedents", "Calculate allowances", "Draft a response"). See interactive-components.md.

**Steps:** 1. User clicks "Ask HR Robin" in sidebar. 2. Navigates to `/inquiries` with `newChat: true` state. 3. Empty state shows: HR Robin sparkle icon (pulsing), "Ask HR Robin" title, description of capabilities, input field, quick suggestion chips. 4. User types or clicks a suggestion. 5. Conversation created; thread begins.

**Exit / next steps (no dead end):** Conversation thread; or click suggestion → pre-fills input. From active conversation: "Open case" (if linked), "Cases" shortcut, Nav. Always: sidebar nav available.

---

## F16 — Template selection → draft generation from precedents

**Trigger:** User checks "Use as template" checkbox on one or more precedent cards in Case detail.

**Roles:** Case handler+.

**Entry:** Case detail with precedent research (`/cases/:id`).

**Interactive elements used (must be wired):** "Use as template" checkbox per precedent card; selected card visual state (blue border + "Selected as template" badge); sticky action bar at bottom (appears on first selection); "Generate draft with N templates" button (navigates to draft editor); "Clear" button (deselects all); count indicator in precedent research header.

**Steps:** 1. User views precedent research on case detail. 2. User checks "Use as template" on one or more precedent cards. 3. Selected cards highlight with blue border and "Selected as template" badge. 4. Sticky action bar appears at bottom: "[N] precedent(s) selected" with case IDs listed, "Clear" and "Generate draft with N template(s)" buttons. 5. User clicks "Generate draft with N template(s)". 6. System navigates to draft editor with selected precedents as reference context.

**Decision points:** Zero selections → no action bar. One or more → action bar with count. User can toggle selections. Clear resets all.

**Exit / next steps (no dead end):** "Generate draft" → Draft editor (F4). "Clear" → action bar disappears, cards deselect. Nav always available.

---

## Flow completeness rules (for wireframe / implementation)

- Every flow has **explicit entry and exit** (see table and sections).
- Every screen reachable from nav or another screen; **no screen is unreachable**.
- Every error and empty state has a **clear next step** (retry, back, clear filters, nav).
- Personas: Viewer, Case handler, Reviewer, Admin — each has at least one entry path and no dead-end path through their permitted screens.
