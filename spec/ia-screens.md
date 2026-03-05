# Information architecture / screen list

**Purpose:** Single source of truth for screens: what each shows, primary actions, routes, hierarchy, entry points. Aligned with flows (no dead ends) and reference wireframes (reference/3.png, 4.png, 5.png when present).

**Confidence:** 92% (evidence-based: all screens exist; routes match; notification badges; Ask HR Robin connected; Templates→Cases flow wired — see spec/confidence-assessment.md)

---

## How this file is structured

- Screen list — One row per screen: name, purpose, main content, key actions.
- Navigation, routes, and entry — Screen, route, level, entry point(s). Every screen is reachable; every screen has exit path (nav or back).
- Primary navigation — Phase 1 HR Robin; shared areas.

---

## Screen list (Phase 1: HR Robin E2E only)

| Screen name | Purpose | Main content | Key actions |
|-------------|---------|--------------|-------------|
| Ingestion / config | Configure and run document ingestion | Source selection; schedule; status | Add source; run ingestion; refresh; **Nav** |
| Case list / search | View and find cases and documents | Table of cases; search; filters | Search; filter; open case; **Nav** |
| Case detail | View single case and precedent match | Case content; precedent match; policy relevance | Generate draft (Case handler+); **Back to Cases**; Nav |
| **Case detail with precedent research** (ref 4.png) | Case + precedent cards + AI chat | Case header; precedent accordion/cards; chat input; right panel (metadata, Generate draft email/request, documents, cited policies) | View in ServiceNow; Open case (precedent); Copy Reference; Use as Template; **Generate draft response email**; **Generate draft request**; doc/policy links; **Nav** |
| **Inquiries / Chat history** | Chat list and case context | Two separate panels (left: inquiry list with filter tabs; main: selected conversation/report). Left panel: bordered rounded list with All/Cases/Chats/Active/Resolved tabs (spec equivalent: All/Case/Chat/Open/Closed). Main panel: bordered rounded content area. Chat sidebar with history only appears on case detail pages (`/cases/:id`), **not** on `/inquiries`. | Select chat → load case/report; **Nav** |
| Draft editor | Create and edit AI-generated drafts | Draft content; citations; formatting | Edit; regenerate; Save/Send; **View case**; Nav |
| Citation / source view | View sources used for draft | List of citations; open cited document | Open in new tab / pop-up; **Close / Back to draft** |
| Export / send | Save or send output (modal) | Destination; privacy designation | Save; send; **Cancel → Draft editor** |
| **Reports / Open cases summary** (ref 5.png) | Weekly HR summary report | Summarize open cases button; report list; report content (Save to File, Copy, Share, Close; Enhance with AI; Version history, Citations, Provenance; KPI cards; Key issues (HR-contextual); Recommendations) | Summarize; Save/Copy/Share; **Close** → Cases; Version history/Citations/Provenance overlays; KPI/issue/recommendation links; **Nav** |
| Benefits Calculator | Allowance calculation | Inputs; outputs | Calculate; **Nav** |
| Audit Trail | Log of user and system actions | Filters; table; export | Filter; export; **Nav** |
| Settings / Admin | Repository config; user/role management | User list; role assignment | Edit roles; config (Admin); **Nav** |
| **Templates** | Browse and select response templates | Template cards (category, policy ref, snippet); Copy; Use in a case | Copy; **Use in a case** → Cases; **Nav** |

**Phase 2+:** Ethics, Travel, Surveillance, Safeguards, TA, SEC Board — when prioritised.

## Navigation, routes, and entry (Phase 1)

| Screen | Route | Level | Nav label | Entry point(s) | Exit / never dead-end |
|--------|-------|-------|-----------|----------------|------------------------|
| **Dashboard** | `/` | Primary | Dashboard | Default landing; nav "Dashboard" | Quick ask → Chat; My cases → Cases; Unread → Chat; Quick actions; Nav to all |
| Case list / search | `/cases` | Primary | Cases | Nav "Cases" or Quick action "Search cases" | Open case (F3); Nav to all |
| Case detail | `/cases/:id` | Secondary | — | Row click from Case list | Back to Cases; Generate draft → Draft editor; Nav |
| Case detail with precedent research | `/cases/:id` (enhanced) or `/inquiries` with case | Secondary | — | Case list or Inquiries chat select | Close; View in ServiceNow (external); Generate draft → Draft editor; Nav |
| Inquiries / Chat history | `/inquiries` | Primary | Chat (nav label) | Nav "Chat", "Ask HR Robin" button | Select chat → case/report; Nav to Cases, Reports, etc. |
| Reports / Open cases summary | `/reports` or `/reports/summary` | Primary | Reports (or from Inquiries) | Nav or "Summarize open cases" from context | Close → Cases; Save/Copy/Share; Nav |
| Draft editor | `/cases/:id/draft` or overlay | Secondary | — | Generate draft from Case detail | View case; Save/Send → success; Nav |
| Citation / source view | Part of Draft or panel | Secondary | — | View citations | Close / Back to draft |
| Export / send | Modal from Draft editor | Overlay | — | Save/Send from Draft editor | Cancel → Draft editor; Success → back or list |
| Ingestion / config | `/ingestion` or `/config` | Primary | Ingestion | Nav "Ingestion" | Nav to all |
| Benefits Calculator | `/benefits-calculator` | Primary | Calculator (nav label) | Nav "Calculator" | Nav to all |
| Audit Trail | `/audit-trail` | Primary | Audit Trail | Nav "Audit Trail" | Filter; export; Nav to all |
| Settings / Admin | `/settings` | Primary | Settings | Nav "Settings" (Admin) | Nav to all |
| Templates | `/templates` | Primary | Templates | Nav "Templates" | Use in a case → Cases (⚠️ templateId passed; CasesPage does not consume — flow gap); Nav to all |

## Primary navigation (Phase 1)

- **Phase 1:** HR Robin only. Primary nav (sidebar order): **Cases**, **Chat** (Inquiries), **Reports**, **Templates**, **Calculator** (Benefits Calculator), then System: **Ingestion**, **Audit Trail**, **Settings**. Quick action: single **"Ask HR Robin"** button (gradient, Sparkles icon) above nav — navigates to `/inquiries` with `newChat: true`. Default landing: `/cases` (root redirects to `/cases`).
- **Sidebar** (top to bottom): (1) IMF AIDA logo. (2) Agent selector dropdown — HR Robin (active), Policy Pete, Finance Fox, Compliance Cal (disabled). (3) **"Ask HR Robin"** button (replaces 2×2 quick actions grid). (4) Primary nav links: Cases (badge: new case count), Chat (badge: unread count), Reports, Templates, Calculator. (5) System section: Ingestion, Audit Trail, Settings. (6) Role switcher (bottom). (7) User profile (bottom). Every primary screen is one click from nav. No screen is orphaned.
- **Back / exit:** Case detail and Draft editor have explicit "Back to Cases" / "View case"; report view has Close → Cases; modals have Cancel/Close. Draft save success: "Continue editing" (primary/default) / "View case" / "Cases list". Chat sidebar on case detail provides contextual chat access without navigating away. Flows never dead-end (see flows.md).
