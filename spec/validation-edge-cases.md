# Edge cases and validation rules

**Purpose:** Validations, error messages, empty states, permission behaviour, edge-case behaviour per flow/screen. **Rule:** Every error and empty state must offer a clear next step (retry, back, clear filters, nav) — no dead ends. **Micro-states (loading, disabled, error, empty)** must each have a defined user action; see `spec/interactive-components.md` Micro-states summary. No code build until 100% complete. IMF POC: RAI, testing (Appendix G), policy/citation validation.

**Confidence:** 88% (evidence-based: empty states with CTAs; notification indicators; status system; template selection edge cases; unread clearing; anomaly detection and compliance checks not yet wired — see spec/confidence-assessment.md)

---

## How this file is structured

- Success metrics and KPIs (UI implications).
- Field-level validation — Rules and error copy.
- Error presentation — Fluent 2 MessageBar or inline; always include next step.
- Empty states — Screen/component × message × CTA (path forward).
- Permission-based behaviour — Element × condition × behaviour.
- Edge cases by flow/screen — Condition | Expected behaviour | Next step.

---

## Success metrics and KPIs (UI implications)

| KPI / requirement | Required UI behaviour |
|-------------------|------------------------|
| RAI: human oversight | All AI drafts require human review; SME validation and override visible and auditable. |
| RAI: citation correctness | Citations and sources with draft; verifiable links; consistency check (4.7.3); compliance flagged (4.7.4). |
| RAI: explainability | Explainability artifacts; confidence/rationale where AI recommends. |
| 100% audit trail | Log every user and system action; expose in Audit Trail; filter and export. |
| Input validation / anomaly | Validate inputs (e.g. Benefits Calculator); flag anomalies (4.5.2). |
| WCAG 2.1 AA | Full compliance; information hierarchy, colorway, assistive technology. |

---

## Field-level validation

| Field / context | Rule | Error message | Next step (no dead end) |
|-----------------|------|---------------|--------------------------|
| Draft (policy compliance) | Consistency check vs Fund policies | "Potential policy compliance issue: [summary]. Please review." | Continue editing; fix or acknowledge; Save/Send or View case. |
| Citation | Required when draft references sources | Display citation list; missing link → "Source link unavailable." | Show list; user can still Save or Back. |
| Benefits Calculator inputs | Required; Country, Location, Policy are select dropdowns (predefined options); Salary is text/number input. All required before Calculate enabled. | "Please select a [country/location/policy]." (dropdown) / "Please provide salary." (text) / "Anomaly detected; please verify." | MessageBar + fix inputs (select from dropdown or correct salary) + Calculate again. |
| Save/send destination | Required when user saves or sends | "Please select a destination." | MessageBar + select destination + retry. |
| Ingestion file type | Unsupported format on upload | "File type not supported." | MessageBar + Retry or Back to Ingestion. |

---

## Error presentation (Phase 1)

Use Fluent 2 **MessageBar** (intent: error, warning, success, info) or inline error beside control; `aria-describedby` / `aria-invalid`. **Every error state must include:** (1) clear message, (2) actionable next step: Retry, Back, Clear filters, or Nav. No screen that shows only an error with no way forward.

---

## Regulatory warnings (HR Robin Phase 1)

| Context | Trigger | Message (MessageBar warning) | Next step |
|---------|---------|------------------------------|-----------|
| Draft vs policy | Consistency check flags conflict (4.7.4) | "Potential policy compliance issue: [summary]. Please review before sending." | Review draft; edit or Send anyway; or View case. |
| Benefits Calculator | Anomaly detected (4.5.2) | "Anomaly detected; please verify inputs." | Fix inputs; Calculate again. |
| Ingestion | Source unreachable or auth failed | "Source unavailable. Check configuration or try again later." | Retry; or Back to Ingestion; Nav. |

---

## Empty states (always provide CTA — no dead end)

| Screen / component | Message | CTA / next step |
|--------------------|---------|------------------|
| Case list (no results) | "No cases match your search or filters." | "Clear filters" or "Adjust search"; Nav to Ingestion, Benefits Calculator, Audit Trail, Settings. |
| Draft editor (no draft yet) | "No draft generated yet." | "Generate draft" (from Case detail) or "View case". |
| Audit Trail (no rows) | "No audit entries match your filters." | "Clear filters" or adjust; Nav. |
| Ingestion (no sources) | "No sources configured." | "Add source" (Admin/Case handler); Nav. |
| Citation list (empty) | "No citations for this draft." | Continue editing or Save; View case. |

---

## Permission-based behaviour

| Element | Condition | Behaviour | Next step if blocked |
|---------|-----------|-----------|----------------------|
| Generate draft | Viewer | Hidden or disabled | Viewer can still view case; Back to Cases; Nav. |
| Edit draft / Save/Send | Viewer | Hidden or disabled | View only; View case; Nav. |
| Ingestion config | Non-Admin | Read-only or hidden | Nav to Cases, Benefits Calculator, Audit Trail. |
| Settings / Admin | Non-Admin | Hidden or read-only | Nav to permitted screens. |

---

## Edge cases by flow/screen

| Flow / screen | Condition | Expected behaviour | Next step (no dead end) |
|---------------|-----------|--------------------|--------------------------|
| F4 Generate draft | API/system error | MessageBar "Draft generation failed." | "Retry" or "View case"; Nav. |
| F7 Save/Send | No destination selected | MessageBar "Please select a destination." | Select destination; retry. |
| F7 Save/Send | Success | Success message: "Draft saved. You can continue editing or go to the case." | "Continue editing" (primary/default — stays in draft) / "View case" / "Cases list"; Nav. |
| F7 Save/Send | User clicks "Continue editing" after save | Modal closes; user stays in Draft editor with saved content. Default action. | Continue editing; Save/Send again; View case; Nav. |
| F9 Benefits Calculator | Invalid or anomaly | MessageBar or inline validation. | Fix inputs; Calculate again; Nav. |
| F9 Benefits Calculator | No country/location/policy selected (empty dropdown) | Calculate button disabled until all required dropdowns have a selection. Inline validation on submit attempt: "Please select a [country/location/policy]." | Select from dropdown; Calculate again. |
| F9 Benefits Calculator | Results display (happy path) | Styled benefit cards (e.g. "Housing: 2,400 EUR/month", "Education: 12,000 EUR/year") with contextual note referencing selected country, location, and policy. | Stay on screen; change inputs and recalculate; Nav. |
| F2 Search | No results | Empty state message. | Clear filters; adjust search; Nav. |
| F11 Audit Trail | No rows / filter too strict | Empty state message. | Clear filters; Nav. |
| **Agent selector** (sidebar) | User opens agent dropdown | Dropdown shows 4 agents: HR Robin (active, selectable), Policy Pete (disabled, "(coming soon)"), Finance Fox (disabled, "(coming soon)"), Compliance Cal (disabled, "(coming soon)"). | Click HR Robin → closes dropdown, no change. Click disabled agent → nothing happens (no navigation, no error). Click outside → closes dropdown. |
| **Agent selector** (sidebar) | User clicks a disabled "coming soon" agent | No action; agent remains disabled; dropdown stays open or closes per interaction model. No error message shown. | User selects HR Robin or clicks outside to dismiss. |
| **Chat section** (sidebar) | User navigates to `/inquiries` or `/reports` | Chat history section (All/Case/Chat/Open/Closed tabs + chat list) is **not rendered**. Sidebar shows nav and context-specific elements only. | Use sidebar nav; no chat list available on these screens. |
| **Chat section** (sidebar) | User navigates to `/cases/:id` | Chat history section renders in sidebar with filter tabs and chat list. | Interact with chat list; filter by tab; Nav. |
| **Version history overlay** (Reports) | User opens Version history | Overlay lists saved versions (e.g. "Current (Mar 5, 2025 14:32)", "Mar 5, 2025 10:15", "Feb 28, 2025 16:00"); select → restore/view that version. | Select version or **Close** overlay; stay on report. |
| **Citations overlay** (Reports / Draft) | User opens Citations | Overlay lists cited sources (e.g. HR Policy 4.2, HR Policy 3.1, Precedent C-2024-0891, C-2024-0902, Weekly case snapshot); link → open source. | Open source (tab/overlay) or **Close**; return to report/draft. |
| **Provenance overlay** (Reports) | User opens Provenance | Overlay shows: Source (ServiceNow), Scope (date range), Generated by (HR Robin), Confidence (97%). | **Close** overlay; stay on report. |
| **Share overlay** (Case or Report) | User clicks Share | Overlay: email, copy link, etc. | **Share** or **Cancel**; overlay closes; stay on screen. |
| **Tools overlay** (chat input) | User clicks Tools | Overlay: commands, attachments, integrations | Select tool or **Cancel**; overlay closes. |
| **Precedent detail overlay** | User clicks Open case on precedent card | Overlay or navigate to precedent case | **Close** or Back; return to case detail. |
| **External (ServiceNow)** | User clicks View/Open in ServiceNow | New browser tab to ServiceNow | User returns via browser; current screen unchanged. |
| **Notification badges (sidebar)** | New cases or unread chat messages | Cases nav shows count of new cases (blue circle badge); Chat nav shows count of unread messages (blue circle badge). Badges update on navigation. | User clicks nav item to view; badges decrement on view. |
| **Status indicators (conversations)** | Each conversation has a status | Status dot: blue (active), amber (waiting), emerald (resolved), slate (closed). Shown in conversation list and chat header. | User sees status at a glance; filter by Active/Resolved tabs. |
| **Status indicators (cases)** | Each case has a lifecycle status | Status badge with dot: purple (New), blue (In Progress), amber (Pending Review), emerald (Resolved), slate (Closed). Shown in case cards and case detail header. | User filters by status; status is visible in card layout. |
| **Unread message indicator (chat)** | Conversation has unread messages | Blue circle badge with unread count on conversation list item. | User opens conversation to read; badge clears. |
| **New case indicator** | Case is newly created | Blue dot in top-right corner of case card with white ring. | User opens case; dot clears. |
| **Template selection sticky bar** | User selects 1+ precedents as template | Sticky action bar at bottom: "N precedent(s) selected" + precedent IDs + "Clear" + "Generate draft with N template(s)". Bar has white/blur background, shadow. | Click "Generate draft" → Draft editor. Click "Clear" → deselects all, bar disappears. |
| **Selected precedent card** | Precedent card checked as template | Card border changes to primary/30, bg to primary/3%, ring-1 ring-primary/10. "Selected as template" badge appears. | Uncheck → reverts to default. |
| **"Ask HR Robin" button** | User clicks sidebar button | Navigates to `/inquiries` with newChat state. Empty state shows HR Robin capabilities and quick suggestions. | Type to start conversation or click suggestion chip. |
| **Recently used template** | Template was used recently | Card has primary/20 border (vs default border); "Recently used" badge with clock icon; "Last used: [time]" text. | User can still copy or use in case. |
| **Template "Use in a case" action** | User clicks "Use in a case" on template card | Navigates to `/cases` with `templateId` state, so user can select which case to apply the template to. | User selects a case; template context is available for draft generation. |

---

## Micro-states: next step required (build gate)

Every UI state must have a user-actionable next step. Implementation must wire:

| State | Required next step(s) | Reference |
|-------|----------------------|-----------|
| **Loading** (e.g. Generate draft, Run now, Export) | Wait; or Cancel/Back if offered; **Nav remains clickable** | interactive-components.md § 2, 3, 4, 6, 8 |
| **Disabled** (Viewer, or loading) | User uses Nav or other enabled control; **never stuck** | interactive-components.md Micro-states summary |
| **Error** (validation, API) | MessageBar + **Retry** and/or **Back** and/or **fix input**; **Nav remains** | Field-level validation table above; interactive-components.md § 3, 4, 5, 8 |
| **Empty** (no results, no sources, no draft) | **CTA button/link** (Clear filters, Add source, View case, Adjust search) + **Nav** | Empty states table above; interactive-components.md § 1, 3, 4, 6 |

No screen may show only an error or empty message without at least one clickable CTA or Nav.

---

## Hardcoded strings (for implementation)

Use spec-driven copy above for MessageBar and empty states. All controls: visible Label or aria-label. Errors: associate with control via aria-describedby / aria-invalid.
