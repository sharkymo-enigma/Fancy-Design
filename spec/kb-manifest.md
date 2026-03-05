# Knowledge base manifest

Tracks which KB files have been processed by the analyst agent. The perpetual trigger compares this list against `knowledge-base/` to detect new or modified files.

## Processed files

**Cycle:** Fresh workflow run (no Janney/Operations dashboard). IMF AI Use Cases POC (ICRFP 428) only. Phase 1: HR Robin E2E. Extraction validated by UX agent; review document: `spec/review-kb-extraction.md`.

| File | Size | Date processed | Cycle |
|------|------|----------------|-------|
| `Appendix A - AI Use Cases_Statement of Work_Fixed Price- copy 5.md` | — | 2026-03-04 | IMF extraction (fresh) |
| `Appedix 1 - HR Robin Detailed Functional_Requirements_vSOW 4.md` | — | 2026-03-04 | IMF extraction (fresh) |
| `Appendix C- IMF - Responsible Use of AI and Guiding Principles 2.md` | — | 2026-03-04 | IMF extraction (fresh) |
| `Appendix G - Expectations for Independent System Testing_DOA 2.md` | — | 2026-03-04 | IMF extraction (fresh) |
| `Appendix E - Accessibility Non Functional Requirement v1 (3) 2.md` | — | 2026-03-04 | IMF extraction (fresh) |
| `EPAM's Response to RFP 428_ITD AI Use Cases_Fixed Price.md` | — | 2026-03-04 | IMF extraction (fresh, grep only) |

Additional KB files (Appendix B, F, H, I, Appendices 2–7, Q&A) are present in `knowledge-base/` and can be processed when Phase 2+ or integration/security is in scope.
