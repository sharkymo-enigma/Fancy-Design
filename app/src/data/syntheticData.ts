/**
 * Synthetic data for HR Robin Phase 1 — domain-aligned per spec/data-entities.md.
 */

export type CaseStatus = 'New' | 'In Progress' | 'Pending Review' | 'Resolved' | 'Closed'

export interface CaseRow {
  id: string
  topic: string
  urgency: string
  policyArea: string
  precedentMatch: string
  updated: string
  status: CaseStatus
  assignee: string
  isNew?: boolean
}

export const cases: CaseRow[] = [
  { id: 'C-2025-0142', topic: 'Overseas assignment allowance — Brussels headquarters', urgency: 'High', policyArea: 'HR Policy 4.2', precedentMatch: 'Yes (3 precedents)', updated: '2025-03-04 14:22', status: 'In Progress', assignee: 'J. Smith', isNew: true },
  { id: 'C-2025-0141', topic: 'Relocation expense eligibility — TDY over 30 days', urgency: 'Medium', policyArea: 'HR Policy 4.1', precedentMatch: 'Yes (1 precedent)', updated: '2025-03-04 11:08', status: 'In Progress', assignee: 'J. Smith' },
  { id: 'C-2025-0140', topic: 'Education allowance for dependent — Grade P4 staff', urgency: 'Medium', policyArea: 'HR Policy 4.3', precedentMatch: 'No', updated: '2025-03-03 16:45', status: 'Pending Review', assignee: 'J. Lee' },
  { id: 'C-2025-0139', topic: 'Parental leave extension — medical documentation submitted', urgency: 'High', policyArea: 'HR Policy 6.2.2', precedentMatch: 'Yes (2 precedents)', updated: '2025-03-03 09:12', status: 'New', assignee: 'Unassigned', isNew: true },
  { id: 'C-2025-0138', topic: 'Telework exception during mission travel — Washington', urgency: 'Low', policyArea: 'HR Policy 5.1', precedentMatch: 'No', updated: '2025-03-02 15:30', status: 'Resolved', assignee: 'A. Rivera' },
]

export interface AuditRow {
  timestamp: string
  user: string
  action: string
  details: string
}

export const auditEntries: AuditRow[] = [
  { timestamp: '2025-03-04 14:22:03', user: 'J. Smith', action: 'View case', details: 'Case C-2025-0142' },
  { timestamp: '2025-03-04 14:25:11', user: 'J. Smith', action: 'Generate draft', details: 'Case C-2025-0142' },
  { timestamp: '2025-03-04 14:28:00', user: 'J. Smith', action: 'Edit draft', details: 'Case C-2025-0142' },
  { timestamp: '2025-03-04 11:08:22', user: 'M. Chen', action: 'Run ingestion', details: 'Source: SharePoint HR Policy' },
  { timestamp: '2025-03-04 10:15:44', user: 'A. Rivera', action: 'Export audit', details: 'Date range: 2025-03-01 to 2025-03-04' },
  { timestamp: '2025-03-03 16:45:12', user: 'J. Lee', action: 'View case', details: 'Case C-2025-0140' },
  { timestamp: '2025-03-03 16:50:00', user: 'J. Lee', action: 'Generate draft', details: 'Case C-2025-0140' },
  { timestamp: '2025-03-03 09:12:33', user: 'S. Chen', action: 'Config change', details: 'Repository: ServiceNow HR cases — schedule updated' },
]

export function getCaseById(id: string): CaseRow | undefined {
  return cases.find((c) => c.id === id)
}

export interface PrecedentCategory {
  id: string
  title: string
  precedents: PrecedentCard[]
}

export interface PrecedentCard {
  id: string
  caseId: string
  title: string
  summary: string
  policyRef?: string
  documentRef?: string
}

export const precedentCategoriesByCase: Record<string, PrecedentCategory[]> = {
  'C-2025-0142': [
    {
      id: 'med',
      title: 'Medical complications / parental leave extension',
      precedents: [
        { id: 'p1', caseId: 'C-2024-0891', title: 'Parental leave extension — medical complications', summary: 'Approved 4-week extension per HR Policy 6.2.2; medical documentation provided.', policyRef: 'HR Policy 6.2.2', documentRef: 'Medical certification 2024-0891' },
        { id: 'p2', caseId: 'C-2024-0765', title: 'Parental leave — dependent care delay', summary: '2-week extension; cited Policy 6.2.2 and precedent C-2023-1201.', policyRef: 'HR Policy 6.2.2' },
      ],
    },
    {
      id: 'overseas',
      title: 'Overseas assignment allowance',
      precedents: [
        { id: 'p3', caseId: 'C-2024-0902', title: 'Overseas assignment — Brussels HQ', summary: 'Housing 2,400/mo; Education 12,000/yr per HR Policy 4.2.', policyRef: 'HR Policy 4.2' },
      ],
    },
  ],
  'C-2025-0141': [
    {
      id: 'relo',
      title: 'Relocation and expense eligibility',
      precedents: [
        { id: 'p4', caseId: 'C-2024-0902', title: 'Relocation expense — temporary duty', summary: 'Eligibility confirmed for TDY over 30 days per HR Policy 4.1.', policyRef: 'HR Policy 4.1' },
      ],
    },
  ],
}

export function getPrecedentsForCase(caseId: string): PrecedentCategory[] {
  return precedentCategoriesByCase[caseId] ?? []
}

export interface EmployeeDetails {
  name: string
  staffId: string
  grade: string
  department: string
  dutyStation: string
  contractType: string
  joinDate: string
  supervisor: string
  email: string
}

export interface RequestDetails {
  requestType: string
  dateSubmitted: string
  effectiveDate: string
  description: string
  sourceTicket: string
  documentsAttached: string[]
  channel: string
}

export interface CaseContext {
  employee: EmployeeDetails
  request: RequestDetails
}

export const caseContextByCase: Record<string, CaseContext> = {
  'C-2025-0142': {
    employee: {
      name: 'Dr. Amara Okonkwo',
      staffId: 'IMF-48291',
      grade: 'P-4',
      department: 'African Department (AFR)',
      dutyStation: 'Washington, D.C.',
      contractType: 'Fixed-term (3 years)',
      joinDate: '2021-06-15',
      supervisor: 'M. Dupont (D-1)',
      email: 'aokonkwo@imf.org',
    },
    request: {
      requestType: 'Overseas assignment allowance',
      dateSubmitted: '2025-02-28',
      effectiveDate: '2025-04-01',
      description: 'Request for overseas assignment allowance package for reassignment to Brussels headquarters. Includes housing and education allowances for two eligible dependents (ages 8 and 12). Assignment duration: 2 years.',
      sourceTicket: 'SNOW-INC0048291',
      documentsAttached: ['Assignment letter (signed by AFR Director)', 'Dependent eligibility form', 'Brussels housing market assessment'],
      channel: 'ServiceNow',
    },
  },
  'C-2025-0141': {
    employee: {
      name: 'James R. Whitfield',
      staffId: 'IMF-35107',
      grade: 'P-3',
      department: 'Fiscal Affairs Department (FAD)',
      dutyStation: 'Washington, D.C.',
      contractType: 'Fixed-term (5 years)',
      joinDate: '2019-09-01',
      supervisor: 'K. Nakamura (P-5)',
      email: 'jwhitfield@imf.org',
    },
    request: {
      requestType: 'Relocation expense eligibility',
      dateSubmitted: '2025-03-01',
      effectiveDate: '2025-03-15',
      description: 'Requesting clarification on relocation expense eligibility for a temporary duty assignment (TDY) exceeding 30 days to the IMF Singapore Regional Office. Travel has already been approved by department head.',
      sourceTicket: 'SNOW-INC0048305',
      documentsAttached: ['TDY approval memo', 'Travel authorization (TA-2025-0087)'],
      channel: 'ServiceNow',
    },
  },
  'C-2025-0140': {
    employee: {
      name: 'Fatima Al-Hassan',
      staffId: 'IMF-41823',
      grade: 'P-4',
      department: 'Strategy, Policy, and Review Department (SPR)',
      dutyStation: 'Washington, D.C.',
      contractType: 'Open-ended',
      joinDate: '2017-03-20',
      supervisor: 'R. Patel (D-1)',
      email: 'falhassan@imf.org',
    },
    request: {
      requestType: 'Education allowance',
      dateSubmitted: '2025-02-25',
      effectiveDate: '2025-09-01',
      description: 'Education allowance application for dependent child (age 14) enrolling at Sidwell Friends School, Washington D.C. for academic year 2025–2026. Tuition: $52,000/year. Requesting confirmation of maximum reimbursable amount under HR Policy 4.3.',
      sourceTicket: 'SNOW-INC0048198',
      documentsAttached: ['School enrollment confirmation', 'Tuition fee schedule 2025–26', 'Dependent eligibility certificate'],
      channel: 'Email (HR Mailbox)',
    },
  },
  'C-2025-0139': {
    employee: {
      name: 'Lucia Fernández-Mora',
      staffId: 'IMF-39456',
      grade: 'P-3',
      department: 'Western Hemisphere Department (WHD)',
      dutyStation: 'Washington, D.C.',
      contractType: 'Fixed-term (3 years)',
      joinDate: '2022-01-10',
      supervisor: 'T. Bergström (P-5)',
      email: 'lfernandez@imf.org',
    },
    request: {
      requestType: 'Parental leave extension',
      dateSubmitted: '2025-03-02',
      effectiveDate: '2025-03-17',
      description: 'Requesting 4-week extension of parental leave due to medical complications documented by attending physician. Original leave end date: March 16, 2025. Medical certificate attached.',
      sourceTicket: 'SNOW-INC0048412',
      documentsAttached: ['Medical certificate (Dr. K. Williams)', 'Original leave approval', 'HR form PL-EXT-2025'],
      channel: 'ServiceNow',
    },
  },
  'C-2025-0138': {
    employee: {
      name: 'David Osei-Mensah',
      staffId: 'IMF-44012',
      grade: 'P-2',
      department: 'Information Technology Department (ITD)',
      dutyStation: 'Washington, D.C.',
      contractType: 'Fixed-term (2 years)',
      joinDate: '2023-07-01',
      supervisor: 'S. Johansson (P-4)',
      email: 'doseimensah@imf.org',
    },
    request: {
      requestType: 'Telework exception',
      dateSubmitted: '2025-02-20',
      effectiveDate: '2025-03-03',
      description: 'Exception request for telework during mission travel to Washington HQ (March 3–14). Home duty station is Washington but mission requires on-site presence at World Bank for joint IT infrastructure assessment. Requesting approval to telework 2 days during the period.',
      sourceTicket: 'SNOW-INC0048089',
      documentsAttached: ['Mission travel authorization', 'World Bank coordination letter'],
      channel: 'ServiceNow',
    },
  },
}

export function getCaseContext(caseId: string): CaseContext | undefined {
  return caseContextByCase[caseId]
}

export type ConversationStatus = 'active' | 'waiting' | 'resolved' | 'closed'

export interface ConversationItem {
  id: string
  title: string
  status: ConversationStatus
  linkedCaseId?: string
  type: 'case' | 'chat'
  time: string
  unread: number
  lastMessage: string
}

export const conversations: ConversationItem[] = [
  { id: '1', title: 'Parental leave extension precedents', status: 'active', linkedCaseId: 'C-2025-0142', type: 'case', time: '10:33 AM', unread: 2, lastMessage: 'I can generate a draft response for the current case...' },
  { id: '2', title: 'Remote work policy for Grade P3', status: 'active', linkedCaseId: 'C-2025-0141', type: 'case', time: '9:16 AM', unread: 1, lastMessage: 'Grade P3 staff are eligible for telework up to 2 days...' },
  { id: '3', title: 'Telework exceptions during mission travel', status: 'waiting', type: 'chat', time: 'Yesterday', unread: 0, lastMessage: 'Mission lead and department head must both approve.' },
  { id: '4', title: 'Per diem rates comparison', status: 'resolved', type: 'chat', time: 'Yesterday', unread: 0, lastMessage: 'Brussels: 142 EUR/day. Washington: 298 USD/day.' },
  { id: '5', title: 'Overseas assignment allowance query', status: 'closed', linkedCaseId: 'C-2025-0142', type: 'case', time: 'Last week', unread: 0, lastMessage: 'Draft generated and linked to case C-2025-0142.' },
  { id: '6', title: 'RAI guidelines for draft review', status: 'resolved', type: 'chat', time: 'Yesterday', unread: 0, lastMessage: 'RAI guidelines are in Appendix C of the SOW.' },
]

export function getUnreadCount(): number {
  return conversations.reduce((sum, c) => sum + c.unread, 0)
}

export function getNewCaseCount(): number {
  return cases.filter((c) => c.isNew).length
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  functionCall?: { name: string; result: string }
  timestamp?: string
}

export const chatThreadsByConversationId: Record<string, ChatMessage[]> = {
  '1': [
    { id: 'm1', role: 'user', content: 'What precedents do we have for parental leave extension when medical documentation is provided?', timestamp: 'Today, 10:32' },
    { id: 'm2', role: 'assistant', content: '', functionCall: { name: 'search_precedents', result: 'Found 3 precedents: C-2024-0891, C-2024-0765, C-2023-1201. Policy: HR 6.2.2.' }, timestamp: 'Today, 10:32' },
    { id: 'm3', role: 'assistant', content: 'Based on HR Policy 6.2.2 and the three precedent cases (C-2024-0891, C-2024-0765, C-2023-1201), extensions of 2–4 weeks have been approved when medical documentation is provided. C-2024-0891 is the closest match: 4-week extension with medical certification. I can generate a draft response for the current case if you open it from Cases.', timestamp: 'Today, 10:33' },
  ],
  '2': [
    { id: 'm4', role: 'user', content: 'Remote work policy for Grade P3 — what are the eligibility criteria?', timestamp: 'Today, 09:15' },
    { id: 'm5', role: 'assistant', content: '', functionCall: { name: 'policy_lookup', result: 'HR Policy 5.1 — Telework. Grade P3: eligible for up to 2 days/week when manager-approved; mission travel may require exception.' }, timestamp: 'Today, 09:15' },
    { id: 'm6', role: 'assistant', content: 'Under HR Policy 5.1, Grade P3 staff are eligible for telework up to 2 days per week with manager approval. For mission travel, exceptions are handled case-by-case; the template "Telework exceptions during mission travel" in Templates applies.', timestamp: 'Today, 09:16' },
  ],
  '3': [
    { id: 'm7', role: 'user', content: 'Telework exceptions during mission travel — who approves?', timestamp: 'Yesterday, 16:20' },
    { id: 'm8', role: 'assistant', content: '', functionCall: { name: 'policy_lookup', result: 'HR Policy 5.1 §3.2: Mission lead + department head approval required; document in travel request.' }, timestamp: 'Yesterday, 16:20' },
    { id: 'm9', role: 'assistant', content: 'Mission lead and department head must both approve. Document the exception in the travel request and ensure connectivity/deliverables are confirmed. I can open the relevant template if you\'d like.', timestamp: 'Yesterday, 16:21' },
  ],
  '4': [
    { id: 'm10', role: 'user', content: 'Compare per diem rates for Brussels vs Washington for a 5-day TDY.', timestamp: 'Yesterday, 14:00' },
    { id: 'm11', role: 'assistant', content: '', functionCall: { name: 'benefits_calculator', result: 'Brussels: 142 EUR/day. Washington: 298 USD/day. Source: IMF Travel Policy Annex A.' }, timestamp: 'Yesterday, 14:00' },
    { id: 'm12', role: 'assistant', content: 'Brussels: 142 EUR/day. Washington: 298 USD/day (5-day TDY). Rates from IMF Travel Policy Annex A. For exact totals in local currency, use the Benefits Calculator from the nav.', timestamp: 'Yesterday, 14:01' },
  ],
  '5': [
    { id: 'm13', role: 'user', content: 'Draft response for overseas assignment allowance — case C-2025-0142.', timestamp: 'Last week' },
    { id: 'm14', role: 'assistant', content: '', functionCall: { name: 'generate_draft', result: 'Draft generated. Case C-2025-0142. Citations: HR Policy 4.2, C-2024-0902, C-2024-0891.' }, timestamp: 'Last week' },
    { id: 'm15', role: 'assistant', content: 'Draft generated and linked to case C-2025-0142. It includes housing allowance (2,400/mo), education allowance (12,000/yr), and references HR Policy 4.2 and the precedent cases. Open the case and go to Draft to edit or send.', timestamp: 'Last week' },
  ],
  '6': [
    { id: 'm16', role: 'user', content: 'General policy clarification — where do I find the RAI guidelines for draft review?', timestamp: 'Yesterday, 11:00' },
    { id: 'm17', role: 'assistant', content: '', functionCall: { name: 'search_knowledge', result: 'RAI guidelines: Appendix C of SOW; also in Settings > Compliance for reviewers.' }, timestamp: 'Yesterday, 11:00' },
    { id: 'm18', role: 'assistant', content: 'RAI (Responsible AI) guidelines for draft review are in Appendix C of the SOW. In the app, Reviewers see sign-off and override controls on the Draft editor; the compliance view is available from Settings for admins.', timestamp: 'Yesterday, 11:01' },
  ],
}
