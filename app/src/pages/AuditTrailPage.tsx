import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { auditEntries } from '@/data/syntheticData'
import { Download, X, Filter, ScrollText } from 'lucide-react'

const ACTION_TYPES = ['View case', 'Generate draft', 'Edit draft', 'Run ingestion', 'Export', 'Config change']

export function AuditTrailPage() {
  const [userFilter, setUserFilter] = useState('')
  const [actionFilter, setActionFilter] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [exporting, setExporting] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = auditEntries.filter((e) => {
    if (userFilter && !e.user.toLowerCase().includes(userFilter.toLowerCase())) return false
    if (actionFilter && e.action !== actionFilter) return false
    const entryDate = e.timestamp.slice(0, 10)
    if (dateFrom && entryDate < dateFrom) return false
    if (dateTo && entryDate > dateTo) return false
    return true
  })

  const hasFilters = userFilter !== '' || actionFilter !== '' || dateFrom !== '' || dateTo !== ''

  const clearFilters = () => { setUserFilter(''); setActionFilter(''); setDateFrom(''); setDateTo('') }

  const handleExport = () => {
    setExporting(true)
    const headers = ['Timestamp', 'User', 'Action', 'Details']
    const rows = filtered.map((e) => [e.timestamp, e.user, e.action, e.details])
    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit-trail-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    setTimeout(() => setExporting(false), 400)
  }

  const actionBadge = (action: string) => {
    const colors: Record<string, string> = {
      'View case': 'bg-blue-50 text-blue-700',
      'Generate draft': 'bg-violet-50 text-violet-700',
      'Edit draft': 'bg-amber-50 text-amber-700',
      'Run ingestion': 'bg-emerald-50 text-emerald-700',
      'Export': 'bg-slate-100 text-slate-600',
      'Config change': 'bg-rose-50 text-rose-700',
    }
    return <span className={`badge ${colors[action] || 'bg-slate-100 text-slate-600'}`}>{action}</span>
  }

  return (
    <div className="app-page">
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div>
          <h1 className="app-page-title flex items-center gap-2">
            <ScrollText className="size-5 text-primary" />
            Audit Trail
          </h1>
          <p className="app-page-desc mb-0">User and system activity log — filter and export per IMF Data Governance.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={showFilters ? 'default' : 'outline'}
            size="sm"
            className="rounded-xl cursor-pointer gap-1.5 h-9"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="size-3.5" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="cursor-pointer rounded-xl gap-1.5 h-9" onClick={handleExport} disabled={exporting}>
            <Download className="size-3.5" />
            {exporting ? 'Exporting...' : 'Export CSV'}
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="flex gap-3 mb-5 items-end flex-wrap p-3 rounded-xl bg-muted/50 border border-border">
          <div className="grid gap-1">
            <label className="text-[11px] font-medium text-muted-foreground">From</label>
            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="min-w-0 sm:min-w-36 h-9 rounded-lg bg-white" />
          </div>
          <div className="grid gap-1">
            <label className="text-[11px] font-medium text-muted-foreground">To</label>
            <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="min-w-0 sm:min-w-36 h-9 rounded-lg bg-white" />
          </div>
          <div className="grid gap-1">
            <label className="text-[11px] font-medium text-muted-foreground">User</label>
            <Input placeholder="Filter by user" value={userFilter} onChange={(e) => setUserFilter(e.target.value)} className="min-w-0 sm:min-w-44 h-9 rounded-lg bg-white" />
          </div>
          <div className="grid gap-1">
            <label className="text-[11px] font-medium text-muted-foreground">Action</label>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="h-9 rounded-lg border border-border bg-white px-3 py-1 text-sm cursor-pointer min-w-0 sm:min-w-[140px]"
            >
              <option value="">All actions</option>
              {ACTION_TYPES.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          {hasFilters && (
            <Button variant="ghost" size="sm" className="cursor-pointer text-muted-foreground h-9" onClick={clearFilters}>
              <X className="size-3.5 mr-1" /> Clear
            </Button>
          )}
        </div>
      )}

      <div className="text-xs text-muted-foreground mb-3">{filtered.length} entries</div>

      <div className="rounded-2xl border border-border bg-white shadow-card overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-border bg-muted/20">
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Timestamp</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">User</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Action</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Details</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0 table-row-hover">
                <td className="px-4 py-2.5 text-xs text-muted-foreground font-mono">{row.timestamp}</td>
                <td className="px-4 py-2.5 text-xs font-medium">{row.user}</td>
                <td className="px-4 py-2.5">{actionBadge(row.action)}</td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-12 text-center mt-3">
          <p className="text-sm text-muted-foreground mb-2">No entries match your filters.</p>
          <Button variant="outline" size="sm" className="cursor-pointer rounded-lg" onClick={clearFilters}>Clear filters</Button>
        </div>
      )}
    </div>
  )
}
