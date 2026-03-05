# Content audit report — user-facing copy

**Date:** March 5, 2025  
**Scope:** InquiriesPage, CaseDetailPage, CasesPage, TemplatesPage, DraftEditorPage, ReportsPage, BenefitsCalculatorPage, SettingsPage, Layout.tsx  
**Criteria:** Consistency, clarity, domain accuracy, tone, accessibility, spec alignment

---

## 1. Copy issues found (file, line, current text, suggested fix)

### Consistency (terminology)

| File | Line | Current | Suggested | Reason |
|------|------|---------|-----------|--------|
| Layout.tsx | 24 | `label: 'Chat'` | `label: 'Inquiries'` | Spec ia-screens.md: nav label is "Inquiries". "Chat" vs "Inquiries" vs "Conversations" creates confusion. |
| InquiriesPage.tsx | 92 | `Chat` (page title when denied) | `Inquiries` | Align with nav and spec screen name "Inquiries / Chat history". |
| InquiriesPage.tsx | 93 | `Chat is available to Case handlers...` | `Inquiries are available to Case handlers and above.` | Same concept, consistent term. |
| InquiriesPage.tsx | 108 | `Conversations` (section header) | Keep or use "Inquiries" | Left panel shows both case-linked and chat-only items; "Conversations" is acceptable but spec uses "Inquiries" for the screen. Consider: "Inquiries" for nav/screen, "Conversations" for list items (chat threads). |
| CasesPage.tsx | 67 | `Search by case ID or topic...` | `Search by keyword or topic` | Spec content-and-copy.md: "Search by keyword or topic". "Case ID" is valid but spec is authoritative. |
| DraftEditorPage | 211 | `DialogDescription: Choose destination and privacy designation.` | `Choose destination and privacy designation.` | Spec uses "Privacy designation" — label in form says "Privacy" (see below). |
| DraftEditorPage | 228 | `Label: Privacy` | `Label: Privacy designation` | Spec content-and-copy.md: "Privacy designation". |
| BenefitsCalculatorPage | 78 | `Duty station` | `Location` | Spec key-screens.md and content-and-copy.md: "Location". "Duty station" is IMF-aligned but breaks spec consistency. Recommend spec update if "Duty station" is preferred domain term. |
| BenefitsCalculatorPage | 94 | `Applicable policy` | `Policy` | Spec: "Policy". Shorter, consistent. |
| Layout.tsx | 99 | `Soon` (disabled agent) | `Coming soon` | Spec validation-edge-cases.md: "coming soon". |

### Clarity (placeholders, empty states, buttons)

| File | Line | Current | Suggested | Reason |
|------|------|---------|-----------|--------|
| InquiriesPage.tsx | 183 | `aria-label="Resize"` | `aria-label="Resize conversation list"` | More descriptive for screen readers. |
| InquiriesPage.tsx | 205 | `aria-label="Ask HR Robin"` | `aria-label="Ask HR Robin"` | Good. Consider "Message to ask HR Robin" if input purpose needs more context. |
| InquiriesPage.tsx | 307 | `aria-label="Chat input"` | `aria-label="Ask HR Robin follow-up"` | Clarifies this is for follow-up in a conversation. |
| CaseDetailPage | 265 | `aria-label="Chat input"` | `aria-label="Ask HR Robin about this case"` | Matches placeholder; more specific. |
| CaseDetailPage | 230 | `Close` / `Preview` (toggle) | Keep | Clear. "Collapse" could be alternative for "Close" when expanded. |
| DraftEditorPage | 136 | `Regenerate` | `Regenerate draft` | Spec content-and-copy.md: "Regenerate draft". |
| DraftEditorPage | 112 | `Draft saved successfully.` | `Draft saved. You can continue editing or go to the case.` | Spec validation-edge-cases.md F7: exact success message. |
| DraftEditorPage | 238 | `Confirm` | `Save` or `Confirm` | Spec says "Save" for Save/Send modal. "Confirm" is generic; "Save" is clearer. |
| ReportsPage | 96 | `New summary` | `Summarize open cases` | Spec key-screens.md ref 5.png: "Summarize open cases". |
| ReportsPage | 169 | `Enhance` | `Enhance with AI` | Spec key-screens.md: "Enhance with AI". |
| ReportsPage | 172 | `Versions` | `Version history` | Spec: "Version history". |
| BenefitsCalculatorPage | 114 | `Calculate allowances` | `Calculate` | Spec content-and-copy.md: "Calculate". Shorter; "allowances" implied by context. |
| BenefitsCalculatorPage | 23 | `Available to Case handlers and above.` | `The Benefits Calculator is available to Case handlers and above.` | Clearer subject; matches pattern of other permission messages. |

### Domain accuracy (IMF HR)

| File | Line | Current | Suggested | Reason |
|------|------|---------|-----------|--------|
| CaseDetailPage | 169 | `Research completed — 94% confidence` | Keep | Good. Domain-aligned. |
| ReportsPage | 100 | `Research completed · 97% confidence` | Keep | Good. |
| BenefitsCalculatorPage | 134 | `Per HR Policy 4.2 §3.1 — Brussels headquarters rate` | `Per HR Policy 4.2 §3.1 for Brussels HQ` | Spec content-and-copy.md: "for Brussels HQ". Minor. |
| BenefitsCalculatorPage | 152 | `Eligible dependents — enrollment and fee documentation required` | `Eligible dependents; submit enrollment and fee documentation` | Spec content-and-copy.md. Semicolon and "submit" align with policy language. |
| CaseDetailPage | 37 | `Medical certification 2024-0891` | Keep | Domain-aligned. |
| TemplatesPage | 24 | `snippet` content | Keep | Policy references and precedent IDs are IMF-aligned. |

### Accessibility (missing labels / aria-labels)

| File | Line | Current | Suggested | Reason |
|------|------|---------|-----------|--------|
| InquiriesPage.tsx | 207 | Send button (icon only) | Add `aria-label="Send message"` | Icon-only buttons need accessible names. |
| InquiriesPage.tsx | 309 | Send button (icon only) | Add `aria-label="Send message"` | Same. |
| CaseDetailPage | 267 | Send button (icon only) | Add `aria-label="Send message"` | Same. |
| CaseDetailPage | 160–163 | Favorite, History, Share, Print | Add `aria-label` if `title` is only hint | `title` provides tooltip; `aria-label` improves screen reader support. |
| DraftEditorPage | 148 | Save or send button | Has text; OK | — |
| ReportsPage | 151 | Export dropdown trigger | Add `aria-label="Export report"` | If not already present. |
| BenefitsCalculatorPage | 110 | Calculate button | Add `aria-label="Calculate allowances"` | Redundant with visible text but can help in some contexts. |
| SettingsPage | 66 | Role select | Add `aria-label="Select role for [user name]"` | Improves context for assistive tech. |

### Missing error messages / unclear status

| File | Line | Current | Suggested | Reason |
|------|------|---------|-----------|--------|
| BenefitsCalculatorPage | 32 | `Please provide a valid salary.` | `Please provide a valid salary.` or `Please enter a valid salary amount.` | Spec: "Please provide [country / salary / location / policy]." For salary specifically, current is fine. Consider adding "Salary must be a positive number." for clarity. |
| DraftEditorPage | 74 | `Please select a destination.` | Keep | Matches spec. |
| CaseDetailPage | — | No error state for "Generate draft" failure | Add MessageBar: "Draft generation failed." per spec | Spec validation-edge-cases.md F4. |
| ReportsPage | — | No error for summarize failure | Add MessageBar per spec | If summarize can fail. |

### Spec vs code alignment (Hardcoded strings)

| File | Line | Current | Spec | Action |
|------|------|---------|------|--------|
| CasesPage | 67 | `Search by case ID or topic...` | `Search by keyword or topic` | Update code or spec. |
| DraftEditorPage | 112 | `Draft saved successfully.` | `Draft saved. You can continue editing or go to the case.` | Update code. |
| DraftEditorPage | 218 | `Select destination...` | `Select save location or send via email` | Spec content-and-copy.md placeholder. Consider: "Select destination..." is acceptable shorthand. |
| ReportsPage | 96 | `New summary` | `Summarize open cases` | Update code. |
| ReportsPage | 169 | `Enhance` | `Enhance with AI` | Update code. |
| ReportsPage | 172 | `Versions` | `Version history` | Update code. |
| BenefitsCalculatorPage | 78 | `Duty station` | `Location` | Decide: keep "Duty station" (IMF) and update spec, or use "Location". |
| Layout.tsx | 99 | `Soon` | `Coming soon` | Update code. |

---

## 2. Cross-impacts for other subagents

| Subagent | Impact | Description |
|----------|--------|-------------|
| **IA agent** | Nav label | "Chat" → "Inquiries" affects sidebar and possibly breadcrumbs. Confirm nav label in ia-screens.md is "Inquiries" and update Layout. |
| **Design System agent** | Icon buttons | Send buttons (icon-only) need consistent `aria-label` pattern. Add to component guidelines. |
| **Wireframe / Figma** | Resize handle | "Resize conversation list" may imply wider handle or tooltip; verify layout unchanged. |
| **Use-case / Scenario** | Error states | Draft generation failure, report summarize failure — ensure flows document these and CTAs (Retry, View case). |

---

## 3. Gaps in spec copy definitions

| Gap | Location | Suggested addition |
|-----|----------|---------------------|
| **Inquiries / Chat screen copy** | content-and-copy.md | Add section: Inquiries / Chat — Page title "Inquiries"; empty state "No conversations"; placeholder "e.g. What parental leave precedents exist for medical extensions?"; follow-up placeholder "Ask HR Robin a follow-up..."; quick chips "Parental leave precedents", "Calculate allowances", "Draft a response"; permission denied "Inquiries are available to Case handlers and above." |
| **Conversation status labels** | content-and-copy.md | Add: Active, Waiting, Resolved, Closed (conversation status). |
| **Case status labels** | content-and-copy.md | Add: New, In Progress, Pending Review, Resolved, Closed (case status) — if not already in data-entities. |
| **Save/Send modal** | content-and-copy.md | Confirm: Dialog title "Save or send"; Description "Choose destination and privacy designation."; Confirm button "Save" vs "Confirm". |
| **Reports button labels** | content-and-copy.md | Add: "New summary" vs "Summarize open cases" — spec says latter; document both if "New summary" is kept for brevity. |
| **Benefits Calculator label** | content-and-copy.md | Resolve: "Location" vs "Duty station". If "Duty station" is IMF standard, add to spec. |
| **Hardcoded strings table** | validation-edge-cases.md | Add rows: File \| Current string \| Spec-driven replacement (per content-design-agent instructions). |

---

## 4. Summary

- **Consistency:** 10 issues — mainly "Chat" vs "Inquiries", search placeholder, Benefits Calculator labels.
- **Clarity:** 8 issues — aria-labels, button labels (Regenerate, Confirm, New summary, Enhance, Versions).
- **Domain accuracy:** 2 minor — policy note wording.
- **Accessibility:** 6 issues — icon-only Send buttons, optional role select aria-label.
- **Spec alignment:** 8 hardcoded strings to align with spec.

**Recommended priority:** Fix spec-critical strings (success message, nav label, Reports buttons) first; then accessibility (Send buttons); then terminology consistency.
