import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/layout/Layout'
import { DashboardPage } from '@/pages/DashboardPage'
import { CasesPage } from '@/pages/CasesPage'
import { CaseDetailPage } from '@/pages/CaseDetailPage'
import { DraftEditorPage } from '@/pages/DraftEditorPage'
import { InquiriesPage } from '@/pages/InquiriesPage'
import { ReportsPage } from '@/pages/ReportsPage'
import { IngestionPage } from '@/pages/IngestionPage'
import { BenefitsCalculatorPage } from '@/pages/BenefitsCalculatorPage'
import { AuditTrailPage } from '@/pages/AuditTrailPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { TemplatesPage } from '@/pages/TemplatesPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/cases/:id" element={<CaseDetailPage />} />
        <Route path="/cases/:id/draft" element={<DraftEditorPage />} />
        <Route path="/inquiries" element={<InquiriesPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/ingestion" element={<IngestionPage />} />
        <Route path="/benefits-calculator" element={<BenefitsCalculatorPage />} />
        <Route path="/audit-trail" element={<AuditTrailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default App
