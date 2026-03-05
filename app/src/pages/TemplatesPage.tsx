import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Copy, FileText, Check, ArrowRight, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Template {
  id: string
  name: string
  description: string
  policyRef: string
  category: string
  snippet: string
  recentlyUsed?: boolean
  lastUsed?: string
}

const templates: Template[] = [
  {
    id: 'overseas-assignment',
    name: 'Overseas assignment allowance',
    description: 'Standard response for eligibility under HR Policy 4.2.',
    policyRef: 'HR Policy 4.2',
    category: 'Allowance',
    snippet: 'Based on HR Policy 4.2 and the precedent cases identified, the employee is eligible for overseas assignment allowance when posted to the designated duty station. Housing allowance: [amount]/month; Education allowance: [amount]/year for dependents, subject to documentation.',
    recentlyUsed: true,
    lastUsed: '2 hours ago',
  },
  {
    id: 'parental-leave-extension',
    name: 'Parental leave extension',
    description: 'Extension request with medical documentation per HR Policy 6.2.2.',
    policyRef: 'HR Policy 6.2.2',
    category: 'Leave',
    snippet: 'Per HR Policy 6.2.2 and the medical documentation provided, a 4-week extension to parental leave is approved. The employee is expected to return on [date]. Please ensure any dependent care arrangements are updated in the system.',
    recentlyUsed: true,
    lastUsed: 'Yesterday',
  },
  {
    id: 'relocation-expense',
    name: 'Relocation expense (TDY)',
    description: 'Eligibility for temporary duty over 30 days per HR Policy 4.1.',
    policyRef: 'HR Policy 4.1',
    category: 'Relocation',
    snippet: 'Eligibility for relocation expenses is confirmed for temporary duty assignments exceeding 30 days per HR Policy 4.1. The following expenses may be claimed: [list]. Please retain receipts and submit via the standard TDY process.',
  },
  {
    id: 'education-allowance-dependent',
    name: 'Education allowance — dependent',
    description: 'Education allowance for dependents under HR Policy 4.3.',
    policyRef: 'HR Policy 4.3',
    category: 'Allowance',
    snippet: 'Under HR Policy 4.3, education allowance for eligible dependents is [amount]/year. Required documentation: proof of enrollment, fee schedule. Submit via the Benefits portal by [deadline].',
  },
  {
    id: 'telework-exception',
    name: 'Telework exception — mission travel',
    description: 'Exception handling for telework during official travel.',
    policyRef: 'HR Policy 5.1',
    category: 'Telework',
    snippet: 'Telework during mission travel is permitted under HR Policy 5.1 when (1) the mission lead approves, and (2) connectivity and deliverables can be met. Please confirm with your department head and document in the travel request.',
  },
]

const categoryColors: Record<string, string> = {
  Allowance: 'bg-blue-50 text-blue-700',
  Leave: 'bg-violet-50 text-violet-700',
  Relocation: 'bg-amber-50 text-amber-700',
  Telework: 'bg-emerald-50 text-emerald-700',
}

export function TemplatesPage() {
  const navigate = useNavigate()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, snippet: string) => {
    navigator.clipboard.writeText(snippet)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleUseTemplate = (templateId: string) => {
    navigate('/cases', { state: { templateId } })
  }

  return (
    <div className="app-page">
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div>
          <h1 className="app-page-title flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            Response Templates
          </h1>
          <p className="app-page-desc mb-0">Pre-built templates for common HR cases. Select a template and choose a case to generate a draft response.</p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((t) => (
          <div
            key={t.id}
            className={cn(
              'rounded-2xl border bg-white shadow-card overflow-hidden flex flex-col transition-all hover:shadow-md group',
              t.recentlyUsed
                ? 'border-primary/20 hover:border-primary/30'
                : 'border-border hover:border-primary/20'
            )}
          >
            <div className="p-4 pb-2">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0 flex-wrap">
                  <span className={`badge ${categoryColors[t.category] || 'bg-slate-100 text-slate-600'}`}>{t.category}</span>
                  <span className="text-[11px] text-primary/60 font-medium">{t.policyRef}</span>
                  {t.recentlyUsed && (
                    <span className="badge bg-primary/10 text-primary">
                      <Clock className="size-2.5" /> Recently used
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleCopy(t.id, t.snippet)}
                  className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-primary cursor-pointer transition-colors shrink-0"
                  aria-label="Copy template"
                >
                  {copiedId === t.id ? <><Check className="size-3 text-emerald-600" /> Copied</> : <><Copy className="size-3" /> Copy</>}
                </button>
              </div>
              <h3 className="text-sm font-semibold text-foreground m-0 mb-1">{t.name}</h3>
              <p className="text-xs text-muted-foreground m-0">{t.description}</p>
              {t.lastUsed && (
                <p className="text-[10px] text-muted-foreground/60 m-0 mt-1">Last used: {t.lastUsed}</p>
              )}
            </div>
            <div className="px-4 pb-2 flex-1">
              <div className="rounded-lg bg-muted/40 border border-border p-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {t.snippet}
              </div>
            </div>
            <div className="px-4 py-3 border-t border-border bg-muted/10">
              <button
                onClick={() => handleUseTemplate(t.id)}
                className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 cursor-pointer transition-colors"
              >
                Use in a case <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
