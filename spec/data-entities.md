# Data / entity overview

**Purpose:** Single source of truth for domain entities, attributes, relationships, validation rules. Used for data simulation, flow payloads, and implementation. Audit log is global per IMF Data Governance.

**Confidence:** 90%

---

## How this file is structured

- Entity index — One line per entity.
- Entities — Entity, description, key attributes, relationships.
- Key validation rules — Attribute-level rules.
- Synthetic data — Domain-aligned sample data (no Lorem ipsum).

---

## Entity index (HR Robin Phase 1)

| Entity | Purpose |
|--------|---------|
| Case / Inquiry | HR case or inquiry; topic, urgency, policy area, precedent match |
| Document | Ingested file or email; source repository, metadata |
| Precedent | Resolved or prior case used for matching and draft generation |
| Policy | Fund policy document or reference |
| Draft | AI-generated draft; links to case, citations, sources |
| Citation | Source reference (document title, repository link) used in a draft |
| User | User identity; network credentials; role |
| AuditLog | Global log of user and system actions (IMF Data Governance) |
| SourceRepository | Configured source (ServiceNow, OneDrive/SharePoint, Nexus, PeopleSoft, Outlook, Excel) |
| BenefitsCalculatorInput/Output | Inputs (country, salary, location, policy); outputs (benefit calculations) |

---

## Entities

| Entity | Description | Key attributes | Relationships |
|--------|-------------|----------------|---------------|
| Case / Inquiry | Case or inquiry handled in the system | id, source, topic, urgency, policyArea, precedentMatch, status, createdAt, updatedAt | → Document, Precedent, Policy, Draft |
| Document | Ingested document or email | id, sourceRepo, path, metadata (sender, date, subject, etc.), contentType | → Case; → Citation |
| Precedent | Prior case or exception used as precedent | id, caseId, relevanceScore, policyArea | → Case, Document |
| Policy | Fund policy reference | id, title, repositoryLink, policyArea | → Case, Draft |
| Draft | Generated draft content | id, caseId, content, modelVersion, createdAt, editedBy | → Case, Citation; citations list |
| Citation | Source cited in a draft | id, draftId, documentId, title, repositoryLink | → Draft, Document |
| User | User identity | id, networkId, role, displayName | → AuditLog, Draft (editedBy) |
| AuditLog | Global audit trail | id, userId, actionType, entityType, entityId, payload, createdAt | → User |
| SourceRepository | Configured ingestion source | id, type, location, schedule, lastRun | — |
| BenefitsCalculatorInput | Inputs for allowance calculation | country, salary, location, policy | → BenefitsCalculatorOutput |
| BenefitsCalculatorOutput | Calculated benefits | amount, breakdown (per policy) | ← BenefitsCalculatorInput |

---

## Key validation rules per entity

| Entity | Attribute | Rule |
|--------|-----------|------|
| Draft | content | Required when draft exists; consistency check vs policies (4.7.3) |
| Citation | documentId, title, repositoryLink | Required for each citation |
| AuditLog | actionType, userId, createdAt | Required for every logged action |
| BenefitsCalculatorInput | country, salary, location, policy | Required; validate and flag anomalies (4.5.2) |

---

## Synthetic data

Use IMF/Fund-aligned terminology. No "Lorem ipsum" or "Test User 1". Sample data for UI and testing:

**Case list (sample rows):** C-2025-0142 | Overseas assignment allowance | High | HR Policy 4.2 | Yes (3 precedents) | 2025-03-04 14:22; C-2025-0141 | Relocation expense eligibility | Medium | HR Policy 4.1 | Yes (1 precedent) | 2025-03-04 11:08; C-2025-0140 | Education allowance—dependent | Medium | HR Policy 4.3 | No | 2025-03-03 16:45.

**Audit Trail (sample rows):** 2025-03-04 14:22:03 | J. Smith | View case | Case C-2025-0142; 2025-03-04 14:25:11 | J. Smith | Generate draft | Case C-2025-0142; 2025-03-04 11:08:22 | M. Chen | Run ingestion | Source: SharePoint HR Policy.

**Benefits Calculator (sample):** Belgium, 120000, Brussels (headquarters), Overseas assignment 2024 → Result cards: Housing allowance: 2,400 EUR/month (per HR Policy 4.2 §3.1 for Brussels HQ); Education allowance: 12,000 EUR/year (eligible dependents; submit enrollment and fee documentation). Contextual note: "Based on Belgium, Brussels (headquarters), and Overseas assignment 2024. Verify against current HR Policy before finalizing." Country options: Belgium, France, United Kingdom, United States, Singapore. Location options: Brussels (headquarters), Washington D.C., London, Paris, Singapore, Remote (home country). Policy options: Overseas assignment 2024, Remote work and telework, Parental leave, Education allowance, Housing allowance.

**Ingestion sources (sample):** HR Policy SharePoint | SharePoint | /sites/HR/Policies | 2025-03-04 06:00 | Completed; ServiceNow HR cases | ServiceNow | imf.service-now.com | 2025-03-04 05:30 | Completed.
