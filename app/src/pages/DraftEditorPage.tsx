import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRole } from '@/context/RoleContext'
import { getCaseById } from '@/data/syntheticData'
import { ArrowLeft, Sparkles, Send, Shield, CheckCircle2, BookOpen, AlertTriangle } from 'lucide-react'

const sampleDraft = `Draft response for case C-2025-0142 — Overseas assignment allowance (Brussels headquarters)

Based on HR Policy 4.2 and the precedent cases C-2024-0891, C-2024-0902, and C-2024-0765:

1. The employee is eligible for overseas assignment allowance when posted to Brussels (headquarters) under the 2024 policy. Eligibility has been confirmed in precedent C-2024-0902.

2. Housing allowance: 2,400 EUR/month; Education allowance: 12,000 EUR/year for eligible dependents, subject to submission of enrollment and fee documentation per HR Policy 4.2 §3.2.

3. The assignment letter must be updated and signed by the department head before departure. Please ensure the HR Portal profile reflects the new duty station.`

const sampleCitations = [
  { title: 'HR Policy 4.2 — Overseas assignment allowance', link: 'https://docs.imf.org/hr/policy-4-2' },
  { title: 'Precedent C-2024-0902 — Brussels HQ assignment', link: '/cases/C-2024-0902' },
  { title: 'Precedent C-2024-0891 — Parental leave extension', link: '/cases/C-2024-0891' },
]

const DESTINATION_OPTIONS = ['SharePoint — HR Outbox', 'OneDrive — Drafts', 'Email — Send now']
const PRIVACY_OPTIONS = ['Internal', 'Confidential', 'Public']

export function DraftEditorPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { canEditDraft, canSaveSend, canSMEValidate, role } = useRole()
  const isViewer = role === 'viewer'
  const caseRow = id ? getCaseById(id) : undefined
  const [draft, setDraft] = useState(sampleDraft)
  const [isGenerating, setIsGenerating] = useState(false)
  const [message, setMessage] = useState<{ intent: 'info' | 'success' | 'error'; text: string } | null>(null)
  const [signedOff, setSignedOff] = useState(false)
  const [saveSendOpen, setSaveSendOpen] = useState(false)
  const [destination, setDestination] = useState('')
  const [privacy, setPrivacy] = useState('Internal')
  const [saveSendLoading, setSaveSendLoading] = useState(false)
  const [saveSendError, setSaveSendError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [smeOverrideOpen, setSmeOverrideOpen] = useState(false)
  const [smeOverrideReason, setSmeOverrideReason] = useState('')
  const [smeOverrideDone, setSmeOverrideDone] = useState(false)

  if (!caseRow) {
    return (
      <div className="app-page">
        <p>Case not found.</p>
        <Link to="/cases"><Button variant="secondary" className="cursor-pointer">Back to Cases</Button></Link>
      </div>
    )
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setMessage({ intent: 'info', text: 'Generating draft — analyzing precedents and policies...' })
    setTimeout(() => {
      setIsGenerating(false)
      setMessage({ intent: 'success', text: 'Draft ready. Review and edit before saving.' })
    }, 1500)
  }

  const handleSaveSendConfirm = () => {
    if (!destination.trim()) {
      setSaveSendError('Please select a destination.')
      return
    }
    setSaveSendLoading(true)
    setSaveSendError(null)
    setTimeout(() => {
      setSaveSendLoading(false)
      setSaveSendOpen(false)
      setSaveSuccess(true)
    }, 800)
  }

  return (
    <div className="app-page">
      {/* Navigation breadcrumb */}
      <div className="flex items-center gap-2 mb-4">
        <Link to={`/cases/${caseRow.id}`} className="no-underline">
          <Button variant="ghost" size="sm" className="cursor-pointer gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-3.5" />
            {caseRow.id}
          </Button>
        </Link>
        <span className="text-xs text-muted-foreground/40">/</span>
        <span className="text-xs text-foreground font-medium">Draft editor</span>
      </div>

      {isViewer && (
        <Alert className="mb-4 border-amber-200 bg-amber-50 rounded-xl">
          <AlertDescription className="text-amber-800 text-xs">
            View-only mode. Edit and save/send require Case handler role or above.
          </AlertDescription>
        </Alert>
      )}

      {saveSuccess && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
            <span className="text-sm font-medium text-emerald-800">Draft saved. You can continue editing or go to the case.</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" className="cursor-pointer rounded-lg text-xs h-8" onClick={() => setSaveSuccess(false)}>Continue editing</Button>
            <Button size="sm" variant="outline" className="cursor-pointer rounded-lg text-xs h-8" onClick={() => navigate(`/cases/${caseRow.id}`)}>
              View case
            </Button>
            <Button size="sm" variant="outline" className="cursor-pointer rounded-lg text-xs h-8" onClick={() => navigate('/cases')}>
              Cases list
            </Button>
          </div>
        </div>
      )}

      {message && (
        <Alert variant={message.intent === 'error' ? 'destructive' : 'default'} className="mb-4 rounded-xl" role="status" aria-live="polite">
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4">
        {/* Editor */}
        <div className="rounded-2xl border border-border bg-white shadow-card overflow-hidden flex flex-col">
          {/* Toolbar */}
          <div className="shrink-0 flex items-center gap-2 border-b border-border px-5 py-3 flex-wrap">
            {canEditDraft && (
              <Button size="sm" className="cursor-pointer rounded-lg gap-1.5 text-xs h-8 bg-gradient-to-r from-primary to-blue-600 text-white" onClick={handleGenerate} disabled={isGenerating}>
                <Sparkles className="size-3" />
                {isGenerating ? 'Generating...' : 'Regenerate'}
              </Button>
            )}
            {canSMEValidate && (
              <>
                <Button variant="outline" size="sm" className="cursor-pointer rounded-lg gap-1.5 text-xs h-8" onClick={() => setSignedOff(true)} disabled={signedOff}>
                  <Shield className="size-3" />
                  {signedOff ? 'Signed off' : 'Sign off'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer rounded-lg gap-1.5 text-xs h-8 border-amber-200 text-amber-700 hover:bg-amber-50"
                  onClick={() => setSmeOverrideOpen((prev) => !prev)}
                  disabled={smeOverrideDone}
                >
                  <AlertTriangle className="size-3" />
                  {smeOverrideDone ? 'Override logged' : 'SME Override'}
                </Button>
              </>
            )}
            <div className="flex-1" />
            {canSaveSend && (
              <Button size="sm" className="cursor-pointer rounded-lg gap-1.5 text-xs h-8" onClick={() => { setSaveSendError(null); setDestination(''); setSaveSendOpen(true) }}>
                <Send className="size-3" />
                Save or send
              </Button>
            )}
          </div>

          {/* SME override panel */}
          {smeOverrideOpen && canSMEValidate && (
            <div className="px-4 py-3 border-b border-amber-200 bg-amber-50/50">
              <div className="flex items-start gap-2">
                <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-amber-800 m-0 mb-1.5">Override AI recommendation — provide rationale</p>
                  <textarea
                    value={smeOverrideReason}
                    onChange={(e) => setSmeOverrideReason(e.target.value)}
                    placeholder="Explain why the AI-generated draft should be overridden (required for audit trail)..."
                    className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-xs min-h-[56px] resize-none focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      className="cursor-pointer h-7 text-[11px] rounded-lg bg-amber-600 hover:bg-amber-700 text-white"
                      disabled={!smeOverrideReason.trim()}
                      onClick={() => {
                        setSmeOverrideDone(true)
                        setSmeOverrideOpen(false)
                        setMessage({ intent: 'info', text: `SME override recorded: "${smeOverrideReason}". Logged to audit trail.` })
                        setSmeOverrideReason('')
                      }}
                    >
                      Confirm override
                    </Button>
                    <Button size="sm" variant="ghost" className="cursor-pointer h-7 text-[11px] rounded-lg text-amber-700" onClick={() => { setSmeOverrideOpen(false); setSmeOverrideReason('') }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Text area */}
          <div className="flex-1 p-4">
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              readOnly={!canEditDraft}
              rows={16}
              className="w-full min-h-[360px] bg-transparent border-0 shadow-none focus-visible:ring-0 resize-none text-[13px] leading-relaxed p-0"
              aria-label="Draft content"
            />
          </div>
        </div>

        {/* Citations sidebar */}
        <div className="space-y-3">
          <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <BookOpen className="size-3.5" />
              Citations
            </h3>
            <div className="space-y-2">
              {sampleCitations.map((c, i) => (
                <button
                  key={i}
                  className="block w-full text-left text-[13px] text-primary hover:underline cursor-pointer py-1 border-b border-border last:border-0 bg-transparent border-x-0 border-t-0 p-0"
                  onClick={() => {
                    if (c.link.startsWith('/')) navigate(c.link)
                    else window.open(c.link, '_blank', 'noopener')
                  }}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Case info</h3>
            <dl className="text-xs space-y-2">
              <div><dt className="text-muted-foreground">Case</dt><dd className="m-0 font-medium">{caseRow.id}</dd></div>
              <div><dt className="text-muted-foreground">Topic</dt><dd className="m-0 font-medium">{caseRow.topic}</dd></div>
              <div><dt className="text-muted-foreground">Policy</dt><dd className="m-0 font-medium">{caseRow.policyArea}</dd></div>
              <div><dt className="text-muted-foreground">Urgency</dt><dd className="m-0"><span className={`badge ${caseRow.urgency === 'High' ? 'badge-high' : 'badge-medium'}`}>{caseRow.urgency}</span></dd></div>
            </dl>
          </div>
        </div>
      </div>

      {/* Save/Send dialog */}
      <Dialog open={saveSendOpen} onOpenChange={setSaveSendOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Save or send</DialogTitle>
            <DialogDescription>Choose destination and privacy designation.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-1.5">
              <Label htmlFor="save-destination" className="text-xs">Destination</Label>
              <select
                id="save-destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-border bg-muted/20 px-3 py-1 text-sm cursor-pointer"
              >
                <option value="">Select destination...</option>
                {DESTINATION_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              {saveSendError && <p className="text-xs text-destructive">{saveSendError}</p>}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="save-privacy" className="text-xs">Privacy</Label>
              <select
                id="save-privacy"
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-border bg-muted/20 px-3 py-1 text-sm cursor-pointer"
              >
                {PRIVACY_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="cursor-pointer rounded-lg" onClick={() => setSaveSendOpen(false)}>Cancel</Button>
            <Button className="cursor-pointer rounded-lg" onClick={handleSaveSendConfirm} disabled={saveSendLoading}>
              {saveSendLoading ? 'Saving...' : 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
