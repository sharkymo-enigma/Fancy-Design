# Content and copy — microcopy, notifications, sample data (Phase 1: HR Robin)

**Purpose:** Single source of truth for UI copy, notifications, and synthetic data for HR Robin Phase 1. Domain-aligned (IMF/HR: case, precedent, draft, citation, Benefits Calculator, ingestion, audit). Use with `spec/validation-edge-cases.md` (validation messages) and `spec/key-screens.md` (layout). **Feedback:** Fluent 2 **MessageBar** (intent: error, warning, success, info) or inline error text; no shadcn Alert/Toast for Phase 1.

---

## 1. Microcopy by screen (HR Robin only)

### Case list / search

| Element | Copy |
|--------|------|
| Page/screen title | Cases |
| Search label | Search cases |
| Search placeholder | Search by keyword or topic |
| Filter labels | Topic, Urgency, Policy area, Precedent |
| Table columns | Case ID, Topic, Urgency, Policy area, Precedent match, Updated |
| Primary action | Generate draft |
| Row action | Open |
| Empty (no results) | No cases match your search or filters. |
| Empty CTA | Clear filters; new search |

### Case detail

| Element | Copy |
|--------|------|
| Section: Case detail | Case detail |
| Section: Precedent match | Precedent match |
| Section: Policy relevance | Policy relevance |
| Primary action | Generate draft |

### Draft editor + citations

| Element | Copy |
|--------|------|
| Page title | Draft editor |
| Section: Draft content | Draft content |
| Section: Citations | Citations |
| Top link (→ Case detail) | View case |
| Buttons | Regenerate draft, Save or send, Edit |
| Footer button (→ Case detail) | View case |
| Citation list columns | Document title, Source link |
| Privacy designation label | Privacy designation |
| Save success message | Draft saved. You can continue editing or go to the case. |
| Save success CTA (primary) | Continue editing |
| Save success CTA (secondary) | View case |
| Save success CTA (tertiary) | Cases list |
| Empty (no draft) | No draft yet. Generate a draft from policy and precedent. |
| Empty CTA | Generate draft |
| Empty (citations) | No sources cited for this draft. |

### Ingestion / config

| Element | Copy |
|--------|------|
| Page/screen title | Ingestion |
| Section title | Ingestion sources |
| Table columns | Source name, Type, Location, Last run, Status |
| Buttons | Add source, Run now, Schedule, Refresh |
| Form: Source type label | Source type |
| Form: Location label | Location |
| Form: Location placeholder | Path or URL |
| Form: Schedule label | Schedule (optional) |
| Status values | Idle, Running, Completed, Failed |
| Empty (no sources) | No sources configured. Add a repository or upload. |
| Empty CTA | Add source |

### Benefits Calculator

| Element | Copy |
|--------|------|
| Page/screen title | Benefits Calculator |
| Page description | Enter country, salary, location, and policy to calculate allowance. |
| Label: Country | Country |
| Component: Country | Select dropdown (Belgium, France, United Kingdom, United States, Singapore) |
| Label: Salary | Salary (USD) |
| Placeholder: Salary | Enter amount |
| Label: Location | Location |
| Component: Location | Select dropdown (Brussels (headquarters), Washington D.C., London, Paris, Singapore, Remote (home country)) |
| Label: Policy | Policy |
| Component: Policy | Select dropdown (Overseas assignment 2024, Remote work and telework, Parental leave, Education allowance, Housing allowance) |
| Button | Calculate |
| Result section title | Estimated allowances |
| Result card 1 title | Housing allowance |
| Result card 1 value | 2,400 EUR/month |
| Result card 1 note | Per HR Policy 4.2 §3.1 for Brussels HQ |
| Result card 2 title | Education allowance |
| Result card 2 value | 12,000 EUR/year |
| Result card 2 note | Eligible dependents; submit enrollment and fee documentation |
| Result contextual note | Based on {country}, {location}, and {policy}. Verify against current HR Policy before finalizing. |

### Audit Trail

| Element | Copy |
|--------|------|
| Page/screen title | Audit Trail |
| Filter labels | Date range, User, Action type |
| Placeholders (filters) | From, To, Select user, Select action |
| Table columns | Timestamp, User, Action, Details |
| Button | Export |
| Empty (no entries) | No audit entries for selected filters. |
| Empty CTA | Adjust filters |

### Export / send (modal or screen)

| Element | Copy |
|--------|------|
| Title | Save or send |
| Label: Destination | Destination |
| Placeholder / helper | Select save location or send via email |
| Buttons | Save, Send, Cancel |

### Settings / Admin

| Element | Copy |
|--------|------|
| Page/screen title | Settings |
| Sections | Users and roles; Ingestion config (Admin) |

---

## 2. Notifications and feedback (MessageBar / inline)

Use Fluent 2 **MessageBar** (intent: success, error, warning, info) or inline error text. All form controls: visible Label or aria-label; errors with `aria-describedby` / `aria-invalid`.

| Context | Intent | Message |
|---------|--------|---------|
| Draft saved | success | Draft saved. You can continue editing or go to the case. |
| Draft sent | success | Draft sent successfully. |
| Save/send failed | error | Could not save to [destination]. Please try again or choose another location. |
| Policy compliance flag | warning | Potential policy compliance issue: [summary]. Please review before sending. |
| Citation link missing | error | Source link unavailable. |
| Benefits Calculator required field | error | Please provide [country / salary / location / policy]. |
| Benefits Calculator anomaly | warning | Anomaly detected; please verify inputs. |
| No destination selected | error | Please select a destination. |
| No precedent (generate draft) | info | No precedent found; draft may be limited to policy only. |
| Ingestion failed | error | Ingestion failed: [reason]. |
| Source unavailable | error | Source unavailable. Check configuration or try again later. |
| Unsupported file format | error | File type not supported. |

---

## 3. Field names and placeholders (forms)

| Field | Label | Placeholder (if any) |
|-------|-------|----------------------|
| Search (cases) | Search cases | Search by keyword or topic |
| Topic filter | Topic | Select topic |
| Urgency filter | Urgency | Select urgency |
| Policy area filter | Policy area | Select policy area |
| Precedent filter | Precedent | Any / With precedent / None |
| Source type | Source type | Select source type |
| Location (ingestion) | Location | Path or URL |
| Country (Benefits) | Country | Select dropdown: Belgium, France, United Kingdom, United States, Singapore |
| Salary | Salary (USD) | Enter amount |
| Location (Benefits) | Location | Select dropdown: Brussels (headquarters), Washington D.C., London, Paris, Singapore, Remote (home country) |
| Policy (Benefits) | Policy | Select dropdown: Overseas assignment 2024, Remote work and telework, Parental leave, Education allowance, Housing allowance |
| Date range (Audit) | Date range | From – To |
| User (Audit filter) | User | Select user |
| Action type (Audit filter) | Action type | Select action |
| Privacy designation | Privacy designation | Select designation (optional) |
| Save/send destination | Destination | Select save location or send via email |

---

## 4. Data simulation (sample values)

Synthetic, IMF/HR-aligned. Full tables in `spec/data-entities.md` (Case list, Audit Trail, Benefits Calculator, Ingestion sources). Use for tables, dropdowns, and demos.

### Case list sample (abbreviated)

| Case ID | Topic | Urgency | Policy area |
|---------|-------|---------|-------------|
| C-2025-0142 | Overseas assignment allowance | High | HR Policy 4.2 |
| C-2025-0141 | Relocation expense eligibility | Medium | HR Policy 4.1 |

### Benefits Calculator policy options (select dropdown)

- Overseas assignment 2024
- Remote work and telework
- Parental leave
- Education allowance
- Housing allowance

### Benefits Calculator country options (select dropdown)

- Belgium
- France
- United Kingdom
- United States
- Singapore

### Benefits Calculator location options (select dropdown)

- Brussels (headquarters)
- Washington D.C.
- London
- Paris
- Singapore
- Remote (home country)

### Status values (Ingestion)

- Idle, Running, Completed, Failed

---

### Agent selector (sidebar)

| Element | Copy |
|--------|------|
| Aria-label | Select agent |
| Selected agent | HR Robin |
| Agent options | HR Robin (available); Policy Pete (disabled, "coming soon"); Finance Fox (disabled, "coming soon"); Compliance Cal (disabled, "coming soon") |

### Reports key issues (sample)

| Element | Copy |
|--------|------|
| Key issue 1 | Parental leave extension requests (23 cases) |
| Key issue 2 | Remote work policy queries (18 cases) |
| Key issue 3 | Overseas assignment allowance (15 cases) |
| Key issue 4 | Telework exceptions during mission travel (12 cases) |
| Summarize button | Summarize open cases |
| Summarize button title attribute | Summarize open cases for weekly HR meeting |
| Versions button | Version history |
| Report subtitle | IMF AIDA · Last saved Mar 5, 2025 |
| Chat input placeholder (report) | Ask about this report… |

### Reports overlays

| Element | Copy |
|--------|------|
| Version history overlay title | Version history |
| Version history helper | Saved versions of this report. Restore or compare any version. |
| Citations overlay title | Citations |
| Citations helper | Sources and references used to generate this report. |
| Provenance overlay title | Provenance |
| Provenance helper | Data origin and lineage for this report. |
| Provenance — Source | HR case data (ServiceNow), open cases and resolution logs |
| Provenance — Generated by | HR Robin (IMF AIDA) |

### Sidebar navigation labels

| Element | Copy |
|--------|------|
| Quick-action: Search | Search |
| Quick-action: New chat | New chat |
| Quick-action: Inquiries | Inquiries |
| Quick-action: Templates | Templates |

---

## 5. Page description pattern

All `.app-page-desc` elements use one-line display: `white-space: nowrap; text-overflow: ellipsis; overflow: hidden`. Keep page descriptions concise — ideally ≤ 80 characters.

---

*Implementation: Use this file and `spec/validation-edge-cases.md` for all user-facing copy and sample data. All form controls must have visible Label or aria-label; error/feedback via MessageBar or inline text (Fluent 2).*
