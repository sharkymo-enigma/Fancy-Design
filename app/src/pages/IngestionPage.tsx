import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRole } from '@/context/RoleContext'
import { Database, Plus, RefreshCw, Play, CheckCircle2, Clock, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const SOURCE_TYPES = ['ServiceNow', 'OneDrive/SharePoint', 'Excel', 'Outlook', 'Nexus', 'PeopleSoft']
const SCHEDULE_OPTIONS = ['Manual only', 'Every hour', 'Daily 06:00', 'Weekly Sunday 06:00']

interface IngestionSource {
  id: string; name: string; type: string; location: string; schedule: string; lastRun: string; status: 'Completed' | 'Running' | 'Failed' | 'Never'
}

const initialSources: IngestionSource[] = [
  { id: '1', name: 'HR Policy SharePoint', type: 'SharePoint', location: '/sites/HR/Policies', schedule: 'Daily 06:00', lastRun: '2025-03-04 06:00', status: 'Completed' },
  { id: '2', name: 'ServiceNow HR cases', type: 'ServiceNow', location: 'imf.service-now.com', schedule: 'Every hour', lastRun: '2025-03-04 05:30', status: 'Completed' },
]

export function IngestionPage() {
  const { canIngest } = useRole()
  const [sources, setSources] = useState<IngestionSource[]>(initialSources)
  const [addOpen, setAddOpen] = useState(false)
  const [runningId, setRunningId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formName, setFormName] = useState('')
  const [formType, setFormType] = useState(SOURCE_TYPES[0])
  const [formLocation, setFormLocation] = useState('')
  const [formSchedule, setFormSchedule] = useState(SCHEDULE_OPTIONS[0])
  const [formSubmitting, setFormSubmitting] = useState(false)

  if (!canIngest) {
    return (
      <div className="app-page">
        <h1 className="app-page-title">Ingestion</h1>
        <p className="app-page-desc">Available to Case handlers and above.</p>
        <Link to="/cases"><Button variant="secondary" className="cursor-pointer">Go to Cases</Button></Link>
      </div>
    )
  }

  const handleAddSource = () => {
    if (!formLocation.trim()) { setError('Location is required.'); return }
    setFormSubmitting(true); setError(null)
    setTimeout(() => {
      setSources((prev) => [...prev, { id: String(Date.now()), name: formName || `${formType} source`, type: formType, location: formLocation, schedule: formSchedule, lastRun: '—', status: 'Never' }])
      setFormSubmitting(false); setAddOpen(false); setFormName(''); setFormLocation(''); setFormType(SOURCE_TYPES[0]); setFormSchedule(SCHEDULE_OPTIONS[0])
    }, 500)
  }

  const handleRunNow = (id: string) => {
    setRunningId(id); setError(null)
    setSources((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'Running' as const } : s)))
    setTimeout(() => {
      setSources((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'Completed', lastRun: new Date().toISOString().slice(0, 16).replace('T', ' ') } : s)))
      setRunningId(null)
    }, 2000)
  }

  const statusIcon = (s: string) => {
    if (s === 'Completed') return <CheckCircle2 className="size-3.5 text-emerald-500" />
    if (s === 'Running') return <Loader2 className="size-3.5 text-blue-500 animate-spin" />
    if (s === 'Failed') return <AlertCircle className="size-3.5 text-red-500" />
    return <Clock className="size-3.5 text-muted-foreground" />
  }

  return (
    <div className="app-page">
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div>
          <h1 className="app-page-title flex items-center gap-2">
            <Database className="size-5 text-primary" />
            Ingestion
          </h1>
          <p className="app-page-desc mb-0">Configure and run document ingestion from connected sources.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="cursor-pointer rounded-xl gap-1.5 h-9" onClick={() => { setAddOpen(true); setError(null) }}>
            <Plus className="size-3.5" /> Add source
          </Button>
          <Button variant="outline" size="sm" className="cursor-pointer rounded-xl gap-1.5 h-9" onClick={() => setSources((prev) => prev.map((s) => ({ ...s, lastRun: s.lastRun === '—' ? '—' : new Date().toISOString().slice(0, 16).replace('T', ' ') })))}>
            <RefreshCw className="size-3.5" /> Refresh
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4 rounded-xl">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {sources.map((s) => (
          <div key={s.id} className="rounded-2xl border border-border bg-white shadow-card p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-semibold text-foreground">{s.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.type} · {s.location}</div>
              </div>
              <div className="flex items-center gap-1.5">
                {statusIcon(s.status)}
                <span className={cn('text-[11px] font-medium', s.status === 'Completed' ? 'text-emerald-600' : s.status === 'Running' ? 'text-blue-600' : s.status === 'Failed' ? 'text-red-600' : 'text-muted-foreground')}>
                  {s.status}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="text-[11px] text-muted-foreground">
                Schedule: {s.schedule} · Last: {s.lastRun}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer rounded-lg gap-1.5 text-xs h-7 shrink-0"
                disabled={s.status === 'Running' || runningId !== null}
                onClick={() => handleRunNow(s.id)}
              >
                <Play className="size-3" />
                {s.status === 'Running' ? 'Running...' : 'Run now'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {sources.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <Database className="size-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-3">No sources configured.</p>
          <Button size="sm" className="cursor-pointer rounded-lg" onClick={() => setAddOpen(true)}>Add source</Button>
        </div>
      )}

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Add source</DialogTitle>
            <DialogDescription>Configure a new ingestion source.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-1.5">
              <Label className="text-xs">Source name</Label>
              <Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. HR Policy SharePoint" className="h-10 rounded-lg bg-muted/20" />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">Type</Label>
              <select value={formType} onChange={(e) => setFormType(e.target.value)} className="flex h-10 w-full rounded-lg border border-border bg-muted/20 px-3 py-1 text-sm cursor-pointer">
                {SOURCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">Location (required)</Label>
              <Input value={formLocation} onChange={(e) => setFormLocation(e.target.value)} placeholder="Path or URL" className="h-10 rounded-lg bg-muted/20" />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">Schedule</Label>
              <select value={formSchedule} onChange={(e) => setFormSchedule(e.target.value)} className="flex h-10 w-full rounded-lg border border-border bg-muted/20 px-3 py-1 text-sm cursor-pointer">
                {SCHEDULE_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="cursor-pointer rounded-lg" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button className="cursor-pointer rounded-lg" onClick={handleAddSource} disabled={formSubmitting}>
              {formSubmitting ? 'Adding...' : 'Add source'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
