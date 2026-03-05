import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cases } from '@/data/syntheticData'
import type { CaseStatus } from '@/data/syntheticData'
import { Search, X, ArrowUpRight, Filter, FolderOpen, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

const statusConfig: Record<CaseStatus, { dot: string; bg: string; text: string }> = {
  'New': { dot: 'bg-purple-500', bg: 'bg-purple-50', text: 'text-purple-700' },
  'In Progress': { dot: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
  'Pending Review': { dot: 'bg-amber-400', bg: 'bg-amber-50', text: 'text-amber-700' },
  'Resolved': { dot: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  'Closed': { dot: 'bg-slate-300', bg: 'bg-slate-50', text: 'text-slate-500' },
}

export function CasesPage() {
  const location = useLocation()
  const templateId = (location.state as { templateId?: string } | null)?.templateId ?? null
  const [search, setSearch] = useState('')
  const [urgencyFilter, setUrgencyFilter] = useState<string>('')
  const [policyAreaFilter, setPolicyAreaFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = cases.filter((c) => {
    if (search && !c.topic.toLowerCase().includes(search.toLowerCase()) && !c.id.toLowerCase().includes(search.toLowerCase())) return false
    if (urgencyFilter && c.urgency !== urgencyFilter) return false
    if (policyAreaFilter && c.policyArea !== policyAreaFilter) return false
    if (statusFilter && c.status !== statusFilter) return false
    return true
  })

  const policyAreaOptions = Array.from(new Set(cases.map((c) => c.policyArea)))
  const urgencyOptions = Array.from(new Set(cases.map((c) => c.urgency)))
  const statusOptions = Array.from(new Set(cases.map((c) => c.status)))
  const hasFilters = search !== '' || urgencyFilter !== '' || policyAreaFilter !== '' || statusFilter !== ''

  const clearFilters = () => { setSearch(''); setUrgencyFilter(''); setPolicyAreaFilter(''); setStatusFilter('') }

  const urgencyBadge = (u: string) => {
    const cls = u === 'High' ? 'badge-high' : u === 'Medium' ? 'badge-medium' : 'badge-low'
    return <span className={`badge ${cls}`}>{u}</span>
  }

  const precedentBadge = (p: string) => {
    const isYes = p.startsWith('Yes')
    return <span className={`badge ${isYes ? 'badge-yes' : 'badge-no'}`}>{p}</span>
  }

  return (
    <div className="app-page">
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div>
          <h1 className="app-page-title flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
              <FolderOpen className="size-5 text-primary" />
            </div>
            Cases
          </h1>
          <p className="app-page-desc mb-0">Search and manage HR cases. Open a case to view precedents and generate draft responses.</p>
        </div>
      </div>

      {templateId && (
        <Alert className="mb-4 border-primary/20 bg-primary/5 rounded-2xl">
          <FileText className="size-4 text-primary" />
          <AlertDescription className="text-sm text-primary">
            Template selected. Choose a case below to generate a draft with this template applied.
          </AlertDescription>
        </Alert>
      )}

      {/* Search and filter bar */}
      <div className="flex gap-2.5 mb-5 items-center flex-wrap">
        <div className="relative flex-1 min-w-0 sm:min-w-[280px] max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50 pointer-events-none" />
          <Input
            placeholder="Search by case ID or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search cases"
            className="pl-10 h-10 rounded-xl bg-white border-border shadow-card"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer" aria-label="Clear search">
              <X className="size-3.5" />
            </button>
          )}
        </div>
        <Button
          variant={showFilters ? 'default' : 'outline'}
          size="sm"
          className="rounded-xl cursor-pointer gap-1.5 h-10"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="size-3.5" />
          Filters
          {hasFilters && <span className="size-1.5 rounded-full bg-white ml-1" />}
        </Button>
        {hasFilters && (
          <Button variant="ghost" size="sm" className="cursor-pointer text-muted-foreground" onClick={clearFilters}>
            <X className="size-3.5 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-5 p-4 rounded-2xl bg-white border border-border shadow-card relative z-20">
          <select
            aria-label="Filter by urgency"
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="h-10 rounded-xl border border-border bg-background px-3 py-1 text-sm cursor-pointer w-full"
          >
            <option value="">All urgencies</option>
            {urgencyOptions.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
          <select
            aria-label="Filter by policy area"
            value={policyAreaFilter}
            onChange={(e) => setPolicyAreaFilter(e.target.value)}
            className="h-10 rounded-xl border border-border bg-background px-3 py-1 text-sm cursor-pointer w-full"
          >
            <option value="">All policy areas</option>
            {policyAreaOptions.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-xl border border-border bg-background px-3 py-1 text-sm cursor-pointer w-full"
          >
            <option value="">All statuses</option>
            {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      )}

      <div className="text-xs text-muted-foreground mb-3">
        {filtered.length} case{filtered.length !== 1 ? 's' : ''} found
      </div>

      {/* Case cards */}
      <div className="flex flex-col gap-2.5">
        {filtered.map((row) => {
          const sc = statusConfig[row.status]
          return (
            <Link
              key={row.id}
              to={`/cases/${row.id}`}
              state={templateId ? { templateId } : undefined}
              className="group flex items-center gap-3.5 sm:gap-4 rounded-2xl border border-border bg-white p-4 sm:p-5 no-underline transition-all hover:shadow-md hover:border-primary/20 cursor-pointer relative shadow-card"
            >
              {row.isNew && (
                <span className="absolute -top-1 -right-1 size-3 rounded-full bg-primary ring-2 ring-white" title="New" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-xs font-mono text-primary font-semibold">{row.id}</span>
                  {urgencyBadge(row.urgency)}
                  <span className={cn('badge', sc.bg, sc.text)}>
                    <span className={cn('size-1.5 rounded-full', sc.dot)} />
                    {row.status}
                  </span>
                  {precedentBadge(row.precedentMatch)}
                </div>
                <div className="text-sm font-medium text-foreground truncate">{row.topic}</div>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span>{row.policyArea}</span>
                  <span className="text-border">|</span>
                  <span>{row.updated}</span>
                  <span className="text-border">|</span>
                  <span>{row.assignee}</span>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center bg-white shadow-card">
          <div className="text-muted-foreground mb-2">No cases match your search or filters.</div>
          <Button variant="outline" size="sm" className="cursor-pointer rounded-xl" onClick={clearFilters}>Clear filters</Button>
        </div>
      )}
    </div>
  )
}
