import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useRole } from '@/context/RoleContext'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Sparkles, FileDown, Copy, Share2, X, PlusCircle, History, BookOpen, GitBranch, TrendingUp, TrendingDown, AlertCircle, CheckCircle, ArrowRight, Check, RotateCcw } from 'lucide-react'

const kpiCards = [
  { label: 'Employees affected', value: '112', change: '-8%', trend: 'down' as const, accent: 'from-blue-500/10 to-blue-600/5' },
  { label: 'Avg resolution', value: '6 hrs', change: '-15%', trend: 'down' as const, accent: 'from-violet-500/10 to-violet-600/5' },
  { label: 'Resolution rate', value: '58%', change: '+5%', trend: 'up' as const, accent: 'from-emerald-500/10 to-emerald-600/5' },
  { label: 'Tickets analyzed', value: '236', change: '-3%', trend: 'down' as const, accent: 'from-amber-500/10 to-amber-600/5' },
  { label: 'Escalation rate', value: '22%', change: '-1%', trend: 'down' as const, accent: 'from-rose-500/10 to-rose-600/5' },
  { label: 'SLA breach rate', value: '45%', change: '-18%', trend: 'down' as const, accent: 'from-slate-500/10 to-slate-600/5' },
]

const keyIssues = [
  { text: 'Parental leave extension requests', count: 23, severity: 'high' },
  { text: 'Remote work policy queries', count: 18, severity: 'medium' },
  { text: 'Overseas assignment allowance', count: 15, severity: 'medium' },
  { text: 'Telework exceptions during travel', count: 12, severity: 'low' },
]

const reportContentText = `IMF AIDA — Weekly HR Summary Report\nPeriod: February 26 – March 5, 2025\n\nExecutive Summary\nEmployees affected: 112 (-8%). Avg resolution time: 6 hrs (-15%). Resolution rate: 58% (+5%). Tickets analyzed: 236 (-3%).\n\nOverview\nThis week focused on parental leave extension requests and remote work policy queries, impacting HR case handlers and policy reviewers.\n\nRecommendations\nUpdate FAQ: Parental Leave Extensions; Remote Work Policy Quick Reference.`

const versionHistory = [
  { label: 'Current (Mar 5, 2025 14:32)', date: '2025-03-05T14:32:00', current: true },
  { label: 'Mar 5, 2025 10:15', date: '2025-03-05T10:15:00', current: false },
  { label: 'Feb 28, 2025 16:00', date: '2025-02-28T16:00:00', current: false },
]

const citationLinks = [
  { title: 'HR Policy 4.2 — Overseas assignment allowance', url: 'https://docs.imf.org/hr/policy-4-2' },
  { title: 'HR Policy 3.1 — Remote work and telework', url: 'https://docs.imf.org/hr/policy-3-1' },
  { title: 'Precedent C-2024-0891 — Parental leave extension', url: '/cases/C-2024-0891' },
  { title: 'Precedent C-2024-0902 — Brussels HQ assignment', url: '/cases/C-2024-0902' },
  { title: 'Weekly case snapshot (Feb 26 – Mar 5, 2025)', url: 'https://docs.imf.org/hr/snapshots/2025-w9' },
]

export function ReportsPage() {
  const { canViewReports } = useRole()
  const [overlay, setOverlay] = useState<'versions' | 'citations' | 'provenance' | 'share' | null>(null)
  const [reportListItems, setReportListItems] = useState([
    { id: '1', title: 'Weekly HR Summary', date: 'Mar 5, 2025', active: true },
    { id: '2', title: 'Weekly HR Summary', date: 'Feb 28, 2025', active: false },
    { id: '3', title: 'Open cases snapshot', date: 'Feb 21, 2025', active: false },
  ])
  const [selectedReportId, setSelectedReportId] = useState('1')
  const [summarizing, setSummarizing] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState(false)
  const [enhancing, setEnhancing] = useState(false)
  const [enhanceDone, setEnhanceDone] = useState(false)
  const [restoredVersion, setRestoredVersion] = useState<string | null>(null)
  const [reportInput, setReportInput] = useState('')
  const [reportChatMsgs, setReportChatMsgs] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([])
  const navigate = useNavigate()

  if (!canViewReports) {
    return (
      <div className="app-page">
        <h1 className="app-page-title">Reports</h1>
        <p className="app-page-desc">Reports are available to Case handlers and above.</p>
        <Link to="/cases"><Button className="cursor-pointer">Go to Cases</Button></Link>
      </div>
    )
  }

  const handleSummarize = () => {
    setSummarizing(true)
    setTimeout(() => {
      const newId = String(Date.now())
      setReportListItems((prev) => [
        { id: newId, title: 'Weekly HR Summary', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), active: true },
        ...prev.map((r) => ({ ...r, active: false })),
      ])
      setSelectedReportId(newId)
      setSummarizing(false)
    }, 1500)
  }

  const handleSaveToFile = (format: 'PDF' | 'Word') => {
    const blob = new Blob([reportContentText], { type: format === 'PDF' ? 'application/pdf' : 'application/msword' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `imf-aida-weekly-hr-summary.${format === 'PDF' ? 'pdf' : 'doc'}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reportContentText)
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2000)
    } catch { /* */ }
  }

  const handleEnhance = () => {
    setEnhancing(true)
    setEnhanceDone(false)
    setTimeout(() => {
      setEnhancing(false)
      setEnhanceDone(true)
      setTimeout(() => setEnhanceDone(false), 3000)
    }, 2000)
  }

  const handleRestoreVersion = (label: string) => {
    setRestoredVersion(label)
    setTimeout(() => {
      setRestoredVersion(null)
      setOverlay(null)
    }, 1500)
  }

  const handleReportChat = () => {
    if (!reportInput.trim()) return
    const question = reportInput
    setReportChatMsgs((prev) => [...prev, { role: 'user', content: question }])
    setReportInput('')
    setTimeout(() => {
      setReportChatMsgs((prev) => [
        ...prev,
        { role: 'assistant', content: `Based on this week's data: ${question.toLowerCase().includes('trend') ? 'Resolution rates are trending up at +5%, while escalation rates continue to drop.' : 'The majority of cases this week involved parental leave and remote work policy areas. Average resolution time improved by 15%.'}` },
      ])
    }, 1000)
  }

  return (
    <div className="app-page">
      <div className="flex flex-col md:flex-row gap-4 md:gap-5 min-h-0 md:min-h-[calc(100vh-6rem)]">
        {/* Left panel */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-3">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 px-4 py-3 text-[13px] font-semibold text-white shadow-sm transition-all cursor-pointer disabled:opacity-60"
            onClick={handleSummarize}
            disabled={summarizing}
          >
            <PlusCircle className="size-4 shrink-0" />
            {summarizing ? 'Generating...' : 'New summary'}
          </button>
          <div className="flex items-center gap-2 text-xs text-emerald-600 px-1">
            <CheckCircle className="size-3.5" aria-hidden />
            Research completed · 97% confidence
          </div>

          <div className="mt-2">
            <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-1 mb-2">Reports</div>
            <div className="space-y-1">
              {reportListItems.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedReportId(r.id)}
                  className={cn(
                    'w-full text-left px-3 py-2.5 rounded-lg border transition-all cursor-pointer',
                    selectedReportId === r.id
                      ? 'border-primary/20 bg-primary/[0.04] shadow-xs'
                      : 'border-transparent hover:bg-muted/60'
                  )}
                >
                  <span className="text-[13px] font-medium block truncate text-foreground">{r.title}</span>
                  <span className="text-[11px] text-muted-foreground">{r.date}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-border space-y-2">
            {reportChatMsgs.length > 0 && (
              <div className="max-h-32 overflow-auto space-y-1.5 mb-2">
                {reportChatMsgs.map((msg, i) => (
                  <div key={i} className={cn('text-[11px] px-2 py-1 rounded-lg', msg.role === 'user' ? 'bg-primary/10 text-primary ml-4' : 'bg-muted text-foreground mr-4')}>
                    {msg.content}
                  </div>
                ))}
              </div>
            )}
            <div className="relative">
              <Input
                placeholder="Ask about this report..."
                aria-label="Report chat"
                className="rounded-lg bg-muted/30 border-border text-xs h-9 pr-8"
                value={reportInput}
                onChange={(e) => setReportInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleReportChat() } }}
              />
              <button
                className="absolute right-1.5 top-1/2 -translate-y-1/2 size-6 flex items-center justify-center rounded text-primary hover:bg-primary/10 cursor-pointer transition-colors disabled:opacity-30"
                onClick={handleReportChat}
                disabled={!reportInput.trim()}
              >
                <Sparkles className="size-3" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main report */}
        <article className="flex-1 min-w-0 rounded-2xl border border-border bg-white shadow-card overflow-hidden flex flex-col">
          {/* Header */}
          <header className="shrink-0 gradient-header px-6 py-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-lg font-bold text-white m-0 flex items-center gap-2">
                  <Sparkles className="size-4" aria-hidden />
                  Weekly HR Summary Report
                </h1>
                <p className="text-xs text-white/60 m-0 mt-1">HR Robin · Feb 26 – Mar 5, 2025</p>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" className="cursor-pointer rounded-lg bg-white/10 hover:bg-white/20 text-white border-0 text-xs h-8">
                      <FileDown className="size-3.5 mr-1" /> Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer" onClick={() => handleSaveToFile('PDF')}>PDF</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => handleSaveToFile('Word')}>Word</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" className="cursor-pointer rounded-lg bg-white/10 hover:bg-white/20 text-white border-0 text-xs h-8" onClick={handleCopy}>
                  <Copy className="size-3.5 mr-1" /> {copyFeedback ? 'Copied!' : 'Copy'}
                </Button>
                <Button size="sm" className="cursor-pointer rounded-lg bg-white/10 hover:bg-white/20 text-white border-0 text-xs h-8" onClick={() => setOverlay('share')}>
                  <Share2 className="size-3.5 mr-1" /> Share
                </Button>
              </div>
            </div>
            <div className="flex gap-1.5 mt-4 flex-wrap">
              <Button
                size="sm"
                className="cursor-pointer rounded-lg bg-white/15 hover:bg-white/25 text-white border-0 text-xs h-7 px-2.5 disabled:opacity-50"
                onClick={handleEnhance}
                disabled={enhancing}
              >
                <Sparkles className={cn('size-3 mr-1', enhancing && 'animate-pulse')} />
                {enhancing ? 'Enhancing...' : enhanceDone ? 'Enhanced!' : 'Enhance'}
              </Button>
              <Button size="sm" className="cursor-pointer rounded-lg bg-white/10 hover:bg-white/20 text-white border-0 text-xs h-7 px-2.5" onClick={() => setOverlay('versions')}>
                <History className="size-3 mr-1" /> Versions
              </Button>
              <Button size="sm" className="cursor-pointer rounded-lg bg-white/10 hover:bg-white/20 text-white border-0 text-xs h-7 px-2.5" onClick={() => setOverlay('citations')}>
                <BookOpen className="size-3 mr-1" /> Citations
              </Button>
              <Button size="sm" className="cursor-pointer rounded-lg bg-white/10 hover:bg-white/20 text-white border-0 text-xs h-7 px-2.5" onClick={() => setOverlay('provenance')}>
                <GitBranch className="size-3 mr-1" /> Provenance
              </Button>
            </div>
          </header>

          <div className="flex-1 overflow-auto p-6">
            {enhanceDone && (
              <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 flex items-center gap-2 text-xs text-emerald-700">
                <Check className="size-3.5 shrink-0" />
                Report enhanced with additional context and trend analysis.
              </div>
            )}

            {/* KPIs */}
            <section className="mb-7">
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Executive summary</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
                {kpiCards.map((k) => (
                  <div
                    key={k.label}
                    onClick={() => navigate('/cases')}
                    className="kpi-card"
                  >
                    <div className="text-[11px] font-medium text-muted-foreground mb-1">{k.label}</div>
                    <div className="text-xl font-bold text-foreground">{k.value}</div>
                    <div className={cn('text-[11px] font-medium flex items-center gap-1 mt-1', k.trend === 'up' ? 'text-emerald-600' : 'text-muted-foreground')}>
                      {k.trend === 'up' ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                      {k.change}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Overview */}
            <section className="mb-7">
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Overview</h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                This week focused on <strong>parental leave extension requests</strong> and <strong>remote work policy queries</strong>, impacting HR case handlers and policy reviewers. Resolving the overseas assignment allowance backlog remains a priority for Q2.
              </p>
            </section>

            {/* Key issues */}
            <section className="mb-7">
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Key issues</h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {keyIssues.map((issue) => (
                  <button
                    key={issue.text}
                    className="flex items-center gap-3 rounded-xl border border-border bg-white p-3.5 text-left transition-all hover:shadow-sm hover:border-primary/20 cursor-pointer group"
                    onClick={() => navigate('/cases')}
                  >
                    <AlertCircle className={cn('size-4 shrink-0', issue.severity === 'high' ? 'text-red-500' : issue.severity === 'medium' ? 'text-amber-500' : 'text-slate-400')} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-foreground">{issue.text}</div>
                      <div className="text-[11px] text-muted-foreground">{issue.count} cases</div>
                    </div>
                    <ArrowRight className="size-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </section>

            {/* Recommendations */}
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Recommendations</h2>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="cursor-pointer rounded-lg text-xs" onClick={() => navigate('/templates')}>
                  Update FAQ: Parental Leave Extensions
                </Button>
                <Button variant="outline" size="sm" className="cursor-pointer rounded-lg text-xs" onClick={() => navigate('/templates')}>
                  Remote Work Policy Quick Reference
                </Button>
              </div>
            </section>
          </div>
        </article>
      </div>

      {/* Overlay */}
      {overlay && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000] backdrop-blur-sm" onClick={() => setOverlay(null)}>
          <div className="glass-overlay max-w-lg w-full mx-4 p-6 max-h-[85vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold m-0">
                {overlay === 'share' ? 'Share report' : overlay === 'versions' ? 'Version history' : overlay === 'citations' ? 'Citations' : 'Provenance'}
              </h3>
              <button onClick={() => setOverlay(null)} className="flex size-8 items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors" aria-label="Close">
                <X className="size-4" />
              </button>
            </div>
            {overlay === 'versions' && (
              <div className="space-y-2">
                {versionHistory.map((v) => (
                  <div key={v.label} className="flex items-center justify-between py-2.5 px-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
                    <span className="text-sm">{v.label}</span>
                    <div className="flex items-center gap-2">
                      {v.current && <span className="badge badge-yes">Current</span>}
                      {!v.current && (
                        restoredVersion === v.label ? (
                          <span className="text-xs text-emerald-600 font-medium flex items-center gap-1"><Check className="size-3" /> Restored</span>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="cursor-pointer h-7 text-xs rounded-md gap-1"
                            onClick={() => handleRestoreVersion(v.label)}
                          >
                            <RotateCcw className="size-3" /> Restore
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {overlay === 'citations' && (
              <div className="space-y-2">
                {citationLinks.map((c) => (
                  <button
                    key={c.title}
                    className="block w-full text-left text-sm text-primary hover:underline cursor-pointer py-1.5 bg-transparent border-0"
                    onClick={() => {
                      if (c.url.startsWith('/')) navigate(c.url)
                      else window.open(c.url, '_blank', 'noopener')
                      setOverlay(null)
                    }}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            )}
            {overlay === 'provenance' && (
              <dl className="text-sm space-y-3">
                <div><dt className="text-muted-foreground text-xs">Source</dt><dd className="m-0 font-medium">HR case data (ServiceNow)</dd></div>
                <div><dt className="text-muted-foreground text-xs">Scope</dt><dd className="m-0 font-medium">Feb 26 – Mar 5, 2025</dd></div>
                <div><dt className="text-muted-foreground text-xs">Generated by</dt><dd className="m-0 font-medium">HR Robin (IMF AIDA)</dd></div>
                <div><dt className="text-muted-foreground text-xs">Confidence</dt><dd className="m-0 font-medium text-emerald-600">97% — Research completed</dd></div>
              </dl>
            )}
            {overlay === 'share' && (
              <div>
                <p className="text-sm text-muted-foreground mb-3">Share via email or copy link.</p>
                <Button size="sm" className="cursor-pointer rounded-lg" onClick={() => { navigator.clipboard.writeText(window.location.href); setOverlay(null) }}>
                  Copy link
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
