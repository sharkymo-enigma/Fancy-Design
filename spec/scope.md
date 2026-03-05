# Product / scope spec

**Purpose:** Single source of truth for product scope: what we're building, for whom, success criteria (KPIs), in/out of scope, phases, domain context, and stakeholders.

**Confidence:** 90%

---

## How this file is structured

- What we're building — Product summary.
- For whom — Target users and legal entity.
- Success criteria — KPI table; RAI criteria; qualitative goals.
- Phases — Phasing at a glance.
- In scope / Out of scope — Detailed list; explicit exclusions.
- Domain context — IMF, Fund terminology, compliance.
- Key stakeholders — Who to reference.

---

## What we're building

**IMF AI Use Cases suite (ICRFP 428):** AI-powered solutions for the International Monetary Fund under a fixed-price SOW. Seven use cases: **HR Robin** (HR Information and Repository Miner / Meet Robin); Ethics Office First Draft Response; Travel Policy and Procedures AI Bot; AI-Powered Surveillance and Lending Hub; Safeguards Assessments AI; GenAI for TA Reports; GenAI for Executive (SEC) Board Operations. Phase 1 build = **HR Robin E2E only**. Compliance: IMF Responsible AI (RAI), model governance, security, accessibility (WCAG 2.1 AA), independent testing (Appendix G). **Reference wireframes:** reference/3.png, reference/4.png, reference/5.png — authoritative for HR Robin key screen layout when present.

## For whom

- **IMF (the Fund)** — ITD, HRD, Ethics Office, business owners per use case.
- **Primary users** — HR staff (case handlers, reviewers), SMEs, system administrators; roles vary by use case.
- **Vendor** — Service provider for development, configuration, maintenance.
- Single legal context: International Monetary Fund.

## Success criteria

| KPI / criterion | Target / requirement | UI / product implication |
|-----------------|----------------------|---------------------------|
| Functional acceptance | Full traceability and coverage of requirements and acceptance criteria | Testable flows; positive/negative/exploratory; no dead ends. **Build gate:** No code build until every interactive component in spec/interactive-components.md is wired (clickable with defined outcome); micro- and macro flows 100% complete. |
| Security testing | DAST, SAST, IaC, container, OSS per Appendix G | Secure integrations; no sensitive data exposure in UI. |
| Performance | Meet IMF performance requirements (LRE) | Responsive UI. |
| Accessibility | 100% WCAG 2.1 AA | Colorway, readability, information hierarchy, assistive technology. |
| RAI: accuracy / precision-recall | Vendor-proposed thresholds, documented methodology | Explainability; confidence/rationale where AI recommends. |
| Citation correctness | Verifiable citations and grounding | Citations and source list in drafts. |
| Human oversight | SME validation and override workflows | Review/edit flows; sign-off and escalation. |
| Audit | IMF Data Governance compliance | Full audit trail of user and system actions. |

**Qualitative goals:** Streamline workflows; reduce manual effort and errors; improve quality and consistency; explainable, safe, fair AI; scalability across use cases.

## Phases (at a glance)

| Phase | Scope summary |
|-------|----------------|
| **Phase 1 (current)** | HR Robin E2E only: ingestion, case list/detail, draft editor, citations, Benefits Calculator, audit trail, settings. Reference screens: 3.png, 4.png, 5.png. |
| **Phase 2+** | Ethics, Travel, Surveillance, Safeguards, TA Reports, SEC Board — per Appendices 2–7 when prioritised. |

## In scope

- All use cases in Appendix A §5 and Appendices 1–7; Phase 1 = HR Robin only.
- RAI and model governance per Appendix C; independent testing per Appendix G; role-based access (network credentials); audit trail per IMF Data Governance; privacy designation where required.

## Out of scope

- Broader organizational change management; enterprise-wide process redesign (SOW §5).

## Domain context

International Monetary Fund (IMF). "The Fund" standard terminology. Compliance with IMF Data Governance, security policies (e.g. Appendix B), RAI guiding principles. Integrations with designated IMF systems and repositories (ServiceNow, OneDrive/SharePoint, Nexus, PeopleSoft, Outlook per use case).

## Key stakeholders

IMF ITD, HRD, Ethics Office, business owners per use case; vendor; procurement/RFP as applicable.
