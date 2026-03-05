# Roles and permissions

**Purpose:** Single source of truth for roles, permission matrix, UI behaviour per role, and audit logging. Source: HR Robin 4.11, Appendix A SOW, Appendix C RAI, IMF Data Governance.

**Confidence:** 89% (evidence-based: roles, nav, gating wired; audit export functional; audit logging UI-only — see spec/confidence-assessment.md)

---

## How this file is structured

- Roles — Role name and description (least to most access).
- Permission matrix — Capability/screen × role (✓ / —).
- UI implementation checklist — Per-role behaviour; every role has at least one entry path and no dead-end screens.
- Audit logging requirements — Per IMF Data Governance.

---

## Roles

| Role | Description |
|------|-------------|
| Viewer | View cases, documents, dashboards, audit trail only; no edit, generate, or admin. |
| Case handler / Analyst | Viewer + ingest, search, view/edit drafts, save/send; no admin. |
| Reviewer / SME | Case handler + validate, sign off, override AI; explainability review. |
| Admin (super-user) | Full access; ingestion config, repositories, user/role management. |

Role-based access uses **network credentials** (HR Robin 4.11.2). RBAC integrated with organizational identity (e.g. Azure AD); MFA for privileged/sensitive access. Users can label generated/saved documents with **IMF privacy designation** (4.11.3). RACI Matrix is a deliverable (SOW §10). Actors: Individual User, SME, Team of SMEs, Multiple Teams (differentiated permissions and human oversight).

## Permission matrix (HR Robin Phase 1)

| Capability / Screen | Viewer | Case handler | Reviewer / SME | Admin |
|---------------------|--------|--------------|----------------|-------|
| View case list, search results | ✓ | ✓ | ✓ | ✓ |
| Ingest documents / email; upload; paste | — | ✓ | ✓ | ✓ |
| Search and filter (keyword, semantic, category) | ✓ | ✓ | ✓ | ✓ |
| View draft; view citations and sources | ✓ | ✓ | ✓ | ✓ |
| Edit draft; regenerate; prompt-based revision | — | ✓ | ✓ | ✓ |
| Save/send generated content; export | — | ✓ | ✓ | ✓ |
| SME validation; override AI; sign-off | — | — | ✓ | ✓ |
| Configure ingestion; repository locations | — | — | — | ✓ |
| User and role management | — | — | — | ✓ |
| Privacy designation on documents | — | ✓ | ✓ | ✓ |
| View audit trail | ✓ | ✓ | ✓ | ✓ |
| Export audit trail | ✓ | ✓ | ✓ | ✓ |

## UI implementation checklist

- **Viewer:** Nav shows Cases, Audit Trail, (Settings read-only or hidden). Case list → Case detail (read-only); no Generate draft / Edit / Save. Audit Trail: view + export. Every screen has a way back (e.g. breadcrumb, nav).
- **Case handler:** Nav: Cases, Ingestion (if permitted), Benefits Calculator, Audit Trail, Settings. Can open case → Generate draft → Draft editor → Save/Send; Ingestion (run/status); Benefits Calculator; Audit Trail. No dead ends: Save/Send → success message + "Continue editing" / "View case" / "Cases list".
- **Reviewer / SME:** Same as Case handler + validation/override actions on draft/case; evidence panels and citation maps visible.
- **Admin:** Full nav; Ingestion config, user/role management; all flows available.

## Audit logging requirements

Log every user and system action per IMF Data Governance (4.11.1). Actions include: view case, generate draft, edit draft, save/send, run ingestion, calculate benefits, export audit, config change, role change. Expose in Audit Trail screen; filter and export.
