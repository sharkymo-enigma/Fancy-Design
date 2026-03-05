import { useState, useEffect, useRef, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Star, Clock, Share2, Printer, Send, ExternalLink, ChevronRight, Copy, Check, BookOpen, Sparkles, FileText, X, MessageCircle, Target, Lock, ChevronDown, AlertTriangle, User, Briefcase, Mail, MapPin, Calendar, FileCheck, Hash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useRole } from '@/context/RoleContext'
import { useRightRail } from '@/context/RightRailContext'
import { getCaseById, getPrecedentsForCase, getCaseContext } from '@/data/syntheticData'
import type { PrecedentCard } from '@/data/syntheticData'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import { SidebarContext, SIDEBAR_COLLAPSED, SIDEBAR_EXPANDED } from '@/layout/Layout'

const statusConfig: Record<string, { dot: string; bg: string; text: string; label: string }> = {
  'New': { dot: 'bg-purple-500', bg: 'bg-purple-50', text: 'text-purple-700', label: 'New' },
  'In Progress': { dot: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', label: 'In Progress' },
  'Pending Review': { dot: 'bg-amber-400', bg: 'bg-amber-50', text: 'text-amber-700', label: 'Pending Review' },
  'Resolved': { dot: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Resolved' },
  'Closed': { dot: 'bg-slate-300', bg: 'bg-slate-50', text: 'text-slate-500', label: 'Closed' },
}

interface CaseChatMsg {
  id: string
  role: 'user' | 'assistant'
  content: string
  functionCall?: { name: string; result: string }
  recommendations?: AIRecommendation[]
  timestamp: string
}

interface AIRecommendation {
  id: string
  title: string
  answer: string
  confidence: number
  sources: string[]
  applied?: boolean
}

export function CaseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { canGenerateDraft, role } = useRole()
  const isViewer = role === 'viewer'
  const { setContent: setRightRailContent } = useRightRail()
  const { expanded: sidebarExpanded } = useContext(SidebarContext)
  const sidebarWidth = sidebarExpanded ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED
  const caseRow = id ? getCaseById(id) : undefined
  const precedentCategories = id ? getPrecedentsForCase(id) : []
  const caseContext = id ? getCaseContext(id) : undefined
  const [expandedPrecedent, setExpandedPrecedent] = useState<string | null>(null)
  const [templateIds, setTemplateIds] = useState<Set<string>>(new Set())
  const [chatValue, setChatValue] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [starred, setStarred] = useState(false)
  const [shareToast, setShareToast] = useState(false)
  const [smeOverrideOpen, setSmeOverrideOpen] = useState(false)
  const [smeReason, setSmeReason] = useState('')

  const [caseChatMsgs, setCaseChatMsgs] = useState<CaseChatMsg[]>([])
  const [isChatThinking, setIsChatThinking] = useState(false)
  const [caseConfidence, setCaseConfidence] = useState(94)
  const [chatExpanded, setChatExpanded] = useState(true)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const allPrecedents = precedentCategories.flatMap((c) => c.precedents)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [caseChatMsgs, isChatThinking])

  const supportingDocs = [
    { label: 'Medical certification 2024-0891', href: 'https://docs.imf.org/hr/medical-cert-2024-0891' },
    { label: 'HR Policy 6.2.2 (excerpt)', href: 'https://docs.imf.org/hr/policy-6-2-2' },
  ]
  const citedPolicies = [
    { label: 'HR Policy 6.2.2', href: 'https://docs.imf.org/hr/policy-6-2-2' },
    { label: 'HR Policy 4.1', href: 'https://docs.imf.org/hr/policy-4-1' },
  ]

  useEffect(() => {
    if (!caseRow) { setRightRailContent(null); return }
    setRightRailContent(
      <div className="p-5 flex flex-col gap-5">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Actions</h2>
          {canGenerateDraft ? (
            <div className="space-y-2">
              <Button className="cursor-pointer w-full justify-center rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white h-10" onClick={() => navigate(`/cases/${caseRow.id}/draft`)}>
                <Sparkles className="size-3.5 mr-1.5" /> Generate draft response
              </Button>
              <Button variant="outline" className="cursor-pointer w-full justify-center rounded-xl h-10" onClick={() => navigate(`/cases/${caseRow.id}/draft?type=request`)}>
                Generate draft request
              </Button>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground m-0">Generate draft is available to Case handlers and above.</p>
          )}
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Documents</h2>
          <div className="space-y-1">
            {supportingDocs.map((d) => (
              <button key={d.label} onClick={() => window.open(d.href, '_blank', 'noopener')} className="flex items-center gap-2 text-xs text-primary hover:underline py-1.5 cursor-pointer bg-transparent border-0 text-left w-full">
                <BookOpen className="size-3 shrink-0" />
                {d.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Cited policies</h2>
          <div className="space-y-1">
            {citedPolicies.map((p) => (
              <button key={p.label} onClick={() => window.open(p.href, '_blank', 'noopener')} className="block text-xs text-primary hover:underline py-1 cursor-pointer bg-transparent border-0 text-left w-full">
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
    return () => setRightRailContent(null)
  }, [caseRow, canGenerateDraft, navigate, setRightRailContent])

  if (!caseRow) {
    return (
      <div className="app-page">
        <p>Case not found.</p>
        <Link to="/cases"><Button variant="secondary" className="cursor-pointer">Back to Cases</Button></Link>
      </div>
    )
  }

  const toggleTemplate = (precedentId: string) => {
    setTemplateIds((prev) => {
      const next = new Set(prev)
      if (next.has(precedentId)) next.delete(precedentId)
      else next.add(precedentId)
      return next
    })
  }

  const copyReference = (card: PrecedentCard) => {
    const text = `${card.caseId}${card.policyRef ? ` — ${card.policyRef}` : ''}`
    navigator.clipboard.writeText(text)
    setCopiedId(card.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleStar = () => {
    setStarred((prev) => !prev)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/cases/${caseRow.id}`)
    setShareToast(true)
    setTimeout(() => setShareToast(false), 2000)
  }

  const handleCaseChatSend = () => {
    if (!chatValue.trim() || isChatThinking) return
    const userMsg: CaseChatMsg = {
      id: `cm-${Date.now()}`,
      role: 'user',
      content: chatValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setCaseChatMsgs((prev) => [...prev, userMsg])
    const question = chatValue
    setChatValue('')
    setIsChatThinking(true)

    setTimeout(() => {
      const precedentNames = allPrecedents.map((p) => p.caseId)
      const aiMsg: CaseChatMsg = {
        id: `cm-${Date.now() + 1}`,
        role: 'assistant',
        content: `Based on ${caseRow.policyArea} and ${allPrecedents.length} relevant precedent${allPrecedents.length !== 1 ? 's' : ''}, here are three recommended approaches for "${question.slice(0, 60)}${question.length > 60 ? '...' : ''}":`,
        functionCall: {
          name: 'analyze_case_context',
          result: `Analyzed ${caseRow.id}: ${caseRow.topic}. Policy: ${caseRow.policyArea}. Precedents: ${precedentNames.join(', ') || 'None'}.`,
        },
        recommendations: [
          {
            id: `rec-${Date.now()}-1`,
            title: 'Standard policy application',
            answer: `Apply ${caseRow.policyArea} directly following established criteria. ${precedentNames.length > 0 ? `Reference ${precedentNames.slice(0, 2).join(' and ')} for consistent decision-making.` : 'No direct precedents — apply policy guidelines as stated.'} This approach aligns with standard practice and minimizes review time.`,
            confidence: 92,
            sources: [caseRow.policyArea, ...precedentNames.slice(0, 2)],
          },
          {
            id: `rec-${Date.now()}-2`,
            title: 'Extended review with exceptions',
            answer: `Consider exceptional circumstances that may warrant deviation from standard ${caseRow.policyArea} application. Request additional documentation from the employee and escalate to Reviewer/SME for sign-off under the extended review process.`,
            confidence: 85,
            sources: [caseRow.policyArea + ' §3.2', 'SME Review Protocol'],
          },
          {
            id: `rec-${Date.now()}-3`,
            title: 'Precedent-based composite response',
            answer: `Combine elements from ${precedentNames[0] ?? 'closest precedent'} and current policy guidelines to create a comprehensive response. Cite exact policy sections, document the rationale, and update the case resolution log.`,
            confidence: 78,
            sources: precedentNames.length > 0 ? [precedentNames[0], caseRow.policyArea] : [caseRow.policyArea],
          },
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setCaseChatMsgs((prev) => [...prev, aiMsg])
      setIsChatThinking(false)
    }, 2000)
  }

  const handleApplyRecommendation = (msgId: string, recId: string, rec: AIRecommendation) => {
    setCaseChatMsgs((prev) =>
      prev.map((msg) =>
        msg.id === msgId
          ? { ...msg, recommendations: msg.recommendations?.map((r) => (r.id === recId ? { ...r, applied: true } : r)) }
          : msg
      )
    )
    const newConfidence = Math.min(98, caseConfidence + Math.floor(rec.confidence / 15))
    setCaseConfidence(newConfidence)
    const applyMsg: CaseChatMsg = {
      id: `cm-${Date.now()}`,
      role: 'assistant',
      content: `Applied "${rec.title}" to this conversation. AI confidence updated to ${newConfidence}%. You can ask follow-up questions or generate a draft response using this recommendation.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setCaseChatMsgs((prev) => [...prev, applyMsg])
  }

  const handleGenerateFromRec = (rec: AIRecommendation) => {
    navigate(`/cases/${caseRow.id}/draft`, {
      state: {
        templateIdList: Array.from(templateIds),
        recommendedAnswer: rec.answer,
        recommendedTitle: rec.title,
        recommendedConfidence: rec.confidence,
      },
    })
  }

  const handleSmeOverride = () => {
    if (!smeReason.trim()) return
    setCaseChatMsgs((prev) => [
      ...prev,
      {
        id: `cm-${Date.now()}`,
        role: 'assistant',
        content: `SME override applied. Reason: "${smeReason}". Confidence adjusted. This override has been logged to the audit trail.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setCaseConfidence((prev) => Math.max(60, prev - 10))
    setSmeOverrideOpen(false)
    setSmeReason('')
  }

  const urgencyBadge = (u: string) => {
    const cls = u === 'High' ? 'badge-high' : u === 'Medium' ? 'badge-medium' : 'badge-low'
    return <span className={`badge ${cls}`}>{u}</span>
  }

  const sc = statusConfig[caseRow.status] ?? statusConfig['In Progress']

  const selectedNames = allPrecedents.filter((p) => templateIds.has(p.id)).map((p) => p.caseId)

  return (
    <div className="app-page pb-24">
      {isViewer && (
        <Alert className="mb-4 border-amber-200 bg-amber-50 rounded-2xl">
          <AlertDescription className="text-amber-800 text-xs">View-only mode. Edit and generate draft require Case handler role or above.</AlertDescription>
        </Alert>
      )}

      {shareToast && (
        <div className="fixed top-4 right-4 z-50 rounded-2xl bg-emerald-600 text-white px-4 py-2.5 text-sm font-medium shadow-lg animate-in fade-in slide-in-from-top-2">
          Link copied to clipboard
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
        <Link to="/cases" className="hover:text-foreground transition-colors no-underline text-muted-foreground">Cases</Link>
        <ChevronRight className="size-3" />
        <span className="text-foreground font-medium">{caseRow.id}</span>
      </div>

      {/* Case header */}
      <div className="rounded-2xl border border-border bg-white shadow-card p-5 mb-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-lg font-bold text-foreground m-0">{caseRow.id}</h1>
              {urgencyBadge(caseRow.urgency)}
              <span className={cn('badge', sc.bg, sc.text)}>
                <span className={cn('size-1.5 rounded-full', sc.dot)} />
                {sc.label}
              </span>
            </div>
            <p className="text-sm text-muted-foreground m-0">{caseRow.topic}</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground flex-wrap">
              <span>{caseRow.policyArea}</span>
              <span className="text-border">|</span>
              <span>Updated {caseRow.updated}</span>
              <span className="text-border">|</span>
              <span>Assigned to {caseRow.assignee}</span>
              <span className="text-border">|</span>
              <span className={`badge ${caseRow.precedentMatch.startsWith('Yes') ? 'badge-yes' : 'badge-no'}`}>{caseRow.precedentMatch}</span>
            </div>
          </div>
          <div className="flex gap-1 items-center flex-wrap shrink-0">
            <Button variant="ghost" size="sm" className={cn('cursor-pointer h-8 w-8 p-0 rounded-lg', starred && 'text-amber-500')} title={starred ? 'Remove favorite' : 'Add favorite'} onClick={handleStar}>
              <Star className={cn('size-3.5', starred && 'fill-amber-500')} />
            </Button>
            <Button variant="ghost" size="sm" className="cursor-pointer h-8 w-8 p-0 rounded-lg" title="View history" onClick={() => navigate('/audit-trail')}>
              <Clock className="size-3.5" />
            </Button>
            <Button variant="ghost" size="sm" className={cn('cursor-pointer h-8 w-8 p-0 rounded-lg', shareToast && 'text-emerald-500')} title="Share link" onClick={handleShare}>
              <Share2 className="size-3.5" />
            </Button>
            <Button variant="ghost" size="sm" className="cursor-pointer h-8 w-8 p-0 rounded-lg hidden sm:flex" title="Print" onClick={() => window.print()}><Printer className="size-3.5" /></Button>
            <Button variant="outline" size="sm" className="cursor-pointer rounded-lg text-xs h-8 ml-1 hidden sm:flex" onClick={() => window.open('https://servicenow.example.com/case/' + caseRow.id, '_blank')}>
              <ExternalLink className="size-3 mr-1" /> ServiceNow
            </Button>
          </div>
        </div>
      </div>

      {/* Research status */}
      <div className="mb-4 rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-emerald-800">Research completed</span>
        </div>
        <div className="flex items-center gap-2">
          <Target className="size-3 text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-700">{caseConfidence}% confidence</span>
        </div>
      </div>

      {/* Employee & Request details */}
      {caseContext && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Employee details */}
          <div className="rounded-2xl border border-border bg-white shadow-card overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10"><User className="size-4 text-primary" /></div>
              <h2 className="text-sm font-semibold text-foreground m-0">Employee details</h2>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  {caseContext.employee.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{caseContext.employee.name}</div>
                  <div className="text-xs text-muted-foreground">{caseContext.employee.grade} · {caseContext.employee.department}</div>
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                <div>
                  <dt className="text-muted-foreground flex items-center gap-1 mb-0.5"><Hash className="size-3" /> Staff ID</dt>
                  <dd className="m-0 font-medium text-foreground">{caseContext.employee.staffId}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground flex items-center gap-1 mb-0.5"><MapPin className="size-3" /> Duty station</dt>
                  <dd className="m-0 font-medium text-foreground">{caseContext.employee.dutyStation}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground flex items-center gap-1 mb-0.5"><Briefcase className="size-3" /> Contract</dt>
                  <dd className="m-0 font-medium text-foreground">{caseContext.employee.contractType}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground flex items-center gap-1 mb-0.5"><Calendar className="size-3" /> Join date</dt>
                  <dd className="m-0 font-medium text-foreground">{new Date(caseContext.employee.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground flex items-center gap-1 mb-0.5"><User className="size-3" /> Supervisor</dt>
                  <dd className="m-0 font-medium text-foreground">{caseContext.employee.supervisor}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground flex items-center gap-1 mb-0.5"><Mail className="size-3" /> Email</dt>
                  <dd className="m-0 font-medium text-foreground">
                    <button className="text-primary hover:underline cursor-pointer bg-transparent border-0 p-0 text-xs font-medium" onClick={() => window.open(`mailto:${caseContext.employee.email}`)}>
                      {caseContext.employee.email}
                    </button>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Request details */}
          <div className="rounded-2xl border border-border bg-white shadow-card overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10"><FileCheck className="size-4 text-primary" /></div>
              <h2 className="text-sm font-semibold text-foreground m-0">Request details</h2>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-foreground">{caseContext.request.requestType}</span>
                <span className="badge bg-muted text-muted-foreground">{caseContext.request.channel}</span>
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed m-0 mb-4">{caseContext.request.description}</p>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs mb-4">
                <div>
                  <dt className="text-muted-foreground mb-0.5">Date submitted</dt>
                  <dd className="m-0 font-medium text-foreground">{new Date(caseContext.request.dateSubmitted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-0.5">Effective date</dt>
                  <dd className="m-0 font-medium text-foreground">{new Date(caseContext.request.effectiveDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-muted-foreground mb-0.5">Source ticket</dt>
                  <dd className="m-0 font-medium">
                    <button className="text-primary hover:underline cursor-pointer bg-transparent border-0 p-0 text-xs font-medium flex items-center gap-1" onClick={() => window.open(`https://imf.service-now.com/nav_to.do?uri=incident.do?sysparm_query=number=${caseContext.request.sourceTicket}`, '_blank')}>
                      <ExternalLink className="size-3" /> {caseContext.request.sourceTicket}
                    </button>
                  </dd>
                </div>
              </dl>
              {caseContext.request.documentsAttached.length > 0 && (
                <div>
                  <dt className="text-xs text-muted-foreground mb-1.5">Documents attached</dt>
                  <div className="space-y-1">
                    {caseContext.request.documentsAttached.map((doc) => (
                      <div key={doc} className="flex items-center gap-2 text-xs text-foreground bg-muted/30 rounded-lg px-3 py-1.5">
                        <FileText className="size-3 text-muted-foreground shrink-0" />
                        <span className="truncate">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Precedent research */}
      {precedentCategories.length > 0 ? (
        <div className="rounded-2xl border border-border bg-white shadow-card overflow-hidden mb-4">
          <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground m-0">Precedent research</h2>
            {templateIds.size > 0 && (
              <span className="text-[11px] font-medium text-primary">{templateIds.size} selected as template{templateIds.size > 1 ? 's' : ''}</span>
            )}
          </div>
          <div className="p-4">
            <Accordion type="single" collapsible defaultValue={precedentCategories[0]?.id ?? ''}>
              {precedentCategories.map((cat) => (
                <AccordionItem key={cat.id} value={cat.id}>
                  <AccordionTrigger className="text-sm">{cat.title}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2.5">
                      {cat.precedents.map((card) => {
                        const isExpanded = expandedPrecedent === card.id
                        const isSelected = templateIds.has(card.id)
                        return (
                          <div
                            key={card.id}
                            className={cn(
                              'rounded-xl border p-3.5 transition-all',
                              isSelected
                                ? 'border-primary/30 bg-primary/[0.03] ring-1 ring-primary/10'
                                : 'border-border bg-muted/10'
                            )}
                          >
                            <div className="flex justify-between items-start gap-2 flex-wrap">
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <button className="text-sm font-medium text-primary hover:underline cursor-pointer bg-transparent border-0 p-0" onClick={() => navigate(`/cases/${card.caseId}`)}>
                                    {card.caseId}
                                  </button>
                                  {isSelected && (
                                    <span className="badge bg-primary/10 text-primary">
                                      <FileText className="size-2.5" /> Selected as template
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5 m-0">{card.summary}</p>
                                {card.policyRef && <span className="text-[11px] text-primary/70">{card.policyRef}</span>}
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <Button variant="ghost" size="sm" className="cursor-pointer h-7 text-[11px] rounded-md" onClick={() => copyReference(card)}>
                                  {copiedId === card.id ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                                </Button>
                                <div className="flex items-center gap-1.5">
                                  <Checkbox id={`tpl-${card.id}`} checked={isSelected} onCheckedChange={() => toggleTemplate(card.id)} className="size-3.5" />
                                  <Label htmlFor={`tpl-${card.id}`} className="text-[11px] cursor-pointer">Use as template</Label>
                                </div>
                                <Button variant="ghost" size="sm" className="cursor-pointer h-7 text-[11px] rounded-md" onClick={() => setExpandedPrecedent(isExpanded ? null : card.id)}>
                                  {isExpanded ? 'Close' : 'Preview'}
                                </Button>
                              </div>
                            </div>
                            {isExpanded && (
                              <div className="mt-2.5 pt-2.5 border-t border-border text-xs text-muted-foreground">
                                <p className="m-0 mb-1"><strong className="text-foreground">Decision:</strong> {card.summary}</p>
                                <p className="m-0 mb-1"><strong className="text-foreground">Policy basis:</strong> {card.policyRef ?? 'N/A'}</p>
                                <p className="m-0"><strong className="text-foreground">Documents:</strong> {card.documentRef ?? 'No additional documents'}</p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border p-8 text-center mb-4">
          <p className="text-sm text-muted-foreground m-0">No precedents for this case. You can still generate a draft.</p>
        </div>
      )}

      {/* In-context AI chat — Ask HR Robin about this case */}
      <div className="rounded-2xl border border-border bg-white shadow-card overflow-hidden">
        <button
          type="button"
          onClick={() => setChatExpanded((prev) => !prev)}
          className="w-full flex items-center justify-between gap-3 px-5 py-4 border-b border-border bg-gradient-to-r from-primary/[0.03] to-transparent cursor-pointer hover:from-primary/[0.06] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm">
              <MessageCircle className="size-3.5" />
            </span>
            <div className="text-left">
              <span className="text-sm font-semibold text-foreground block">Ask HR Robin about this case</span>
              <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <Lock className="size-2.5" /> Private session
                {caseChatMsgs.length > 0 && <> · {caseChatMsgs.filter((m) => m.role === 'user').length} message{caseChatMsgs.filter((m) => m.role === 'user').length !== 1 ? 's' : ''}</>}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200">
              <Target className="size-3 text-emerald-600" />
              <span className="text-[11px] font-semibold text-emerald-700">{caseConfidence}%</span>
            </div>
            <ChevronDown className={cn('size-4 text-muted-foreground transition-transform', chatExpanded && 'rotate-180')} />
          </div>
        </button>

        {chatExpanded && (
          <div className="flex flex-col">
            {/* Chat thread */}
            <div className="max-h-[420px] overflow-auto px-5 py-4 space-y-4">
              {caseChatMsgs.length === 0 && !isChatThinking && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Sparkles className="size-8 text-primary/20 mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">Ask questions about this case, get AI-powered recommendations.</p>
                  <p className="text-[11px] text-muted-foreground/60">Each answer includes a confidence score. You can apply recommendations to the conversation or generate a draft directly.</p>
                  <div className="flex gap-2 mt-4 flex-wrap justify-center">
                    <button className="text-[11px] text-muted-foreground hover:text-primary bg-muted hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer" onClick={() => setChatValue(`What is the recommended approach for ${caseRow.topic}?`)}>
                      Recommended approach
                    </button>
                    <button className="text-[11px] text-muted-foreground hover:text-primary bg-muted hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer" onClick={() => setChatValue(`Summarize precedents for ${caseRow.policyArea}`)}>
                      Summarize precedents
                    </button>
                    <button className="text-[11px] text-muted-foreground hover:text-primary bg-muted hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer" onClick={() => setChatValue('What exceptions or edge cases should I consider?')}>
                      Edge cases
                    </button>
                  </div>
                </div>
              )}

              {caseChatMsgs.map((msg) => (
                <div key={msg.id}>
                  <div className={cn('flex gap-2.5', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                    {msg.role === 'assistant' && (
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white mt-0.5">
                        <Sparkles className="size-3" />
                      </span>
                    )}
                    <div className={cn(
                      'rounded-2xl text-[13px] leading-relaxed',
                      msg.role === 'user'
                        ? 'max-w-[75%] bg-primary text-white rounded-br-md px-4 py-2.5'
                        : 'max-w-[90%] bg-white border border-border shadow-xs rounded-bl-md px-4 py-2.5'
                    )}>
                      {msg.functionCall && (
                        <div className="mb-2.5 rounded-xl bg-gradient-to-br from-muted/80 to-muted/40 border border-border overflow-hidden">
                          <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/60 bg-muted/30">
                            <span className="text-[11px] font-semibold text-primary">{msg.functionCall.name}</span>
                          </div>
                          <div className="px-3 py-2 text-[11px] text-muted-foreground font-mono">{msg.functionCall.result}</div>
                        </div>
                      )}
                      {msg.content && <p className="m-0 whitespace-pre-wrap">{msg.content}</p>}
                      {msg.timestamp && (
                        <div className={cn('text-[10px] mt-1.5', msg.role === 'user' ? 'text-white/60' : 'text-muted-foreground')}>{msg.timestamp}</div>
                      )}
                    </div>
                    {msg.role === 'user' && (
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-foreground text-[11px] font-semibold mt-0.5">J</span>
                    )}
                  </div>

                  {/* AI recommendation cards */}
                  {msg.recommendations && msg.recommendations.length > 0 && (
                    <div className="ml-9 mt-3 space-y-2">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1.5">
                        <Sparkles className="size-2.5" /> AI Recommendations
                      </div>
                      {msg.recommendations.map((rec) => (
                        <div
                          key={rec.id}
                          className={cn(
                            'rounded-xl border p-3.5 transition-all',
                            rec.applied
                              ? 'border-emerald-200 bg-emerald-50/50'
                              : 'border-border bg-white hover:border-primary/20 hover:shadow-sm'
                          )}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              {rec.applied ? (
                                <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500 shrink-0">
                                  <Check className="size-3 text-white" />
                                </span>
                              ) : (
                                <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 shrink-0">
                                  <Target className="size-3 text-primary" />
                                </span>
                              )}
                              <span className="text-[13px] font-medium text-foreground">{rec.title}</span>
                            </div>
                            <div className={cn(
                              'px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0',
                              rec.confidence >= 90 ? 'bg-emerald-100 text-emerald-700' :
                              rec.confidence >= 80 ? 'bg-blue-100 text-blue-700' :
                              'bg-amber-100 text-amber-700'
                            )}>
                              {rec.confidence}% match
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground m-0 mb-2 leading-relaxed">{rec.answer}</p>
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex gap-1 flex-wrap">
                              {rec.sources.filter(Boolean).map((src) => (
                                <span key={src} className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{src}</span>
                              ))}
                            </div>
                            {!rec.applied && canGenerateDraft && (
                              <div className="flex gap-1.5 shrink-0">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="cursor-pointer h-7 text-[11px] rounded-lg gap-1"
                                  onClick={() => handleApplyRecommendation(msg.id, rec.id, rec)}
                                >
                                  <Check className="size-3" /> Apply to chat
                                </Button>
                                <Button
                                  size="sm"
                                  className="cursor-pointer h-7 text-[11px] rounded-lg gap-1 bg-gradient-to-r from-primary to-blue-600 text-white"
                                  onClick={() => handleGenerateFromRec(rec)}
                                >
                                  <FileText className="size-3" /> Generate draft
                                </Button>
                              </div>
                            )}
                            {rec.applied && (
                              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                                <Check className="size-3" /> Applied
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isChatThinking && (
                <div className="flex gap-2.5 justify-start">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <Sparkles className="size-3 animate-pulse" />
                  </span>
                  <div className="rounded-2xl rounded-bl-md bg-white border border-border shadow-xs px-4 py-3">
                    <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                      <span className="flex gap-1">
                        <span className="size-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="size-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="size-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                      HR Robin is analyzing this case...
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* SME override panel */}
            {role === 'reviewer' || role === 'admin' ? (
              smeOverrideOpen ? (
                <div className="px-5 py-3 border-t border-amber-200 bg-amber-50/50">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-amber-800 m-0 mb-1">SME Override — provide rationale</p>
                      <textarea
                        value={smeReason}
                        onChange={(e) => setSmeReason(e.target.value)}
                        placeholder="Explain why the AI recommendation should be overridden..."
                        className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-xs min-h-[60px] resize-none focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" className="cursor-pointer h-7 text-[11px] rounded-lg bg-amber-600 hover:bg-amber-700 text-white" onClick={handleSmeOverride} disabled={!smeReason.trim()}>
                          Confirm override
                        </Button>
                        <Button size="sm" variant="ghost" className="cursor-pointer h-7 text-[11px] rounded-lg text-amber-700" onClick={() => { setSmeOverrideOpen(false); setSmeReason('') }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            ) : null}

            {/* Chat input */}
            <div className="px-5 py-3 border-t border-border bg-muted/10">
              <div className="flex items-center gap-2">
                {(role === 'reviewer' || role === 'admin') && caseChatMsgs.length > 0 && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="cursor-pointer h-10 text-[11px] rounded-xl shrink-0 border-amber-200 text-amber-700 hover:bg-amber-50"
                    onClick={() => setSmeOverrideOpen((prev) => !prev)}
                  >
                    <AlertTriangle className="size-3 mr-1" /> SME Override
                  </Button>
                )}
                <div className="relative flex-1">
                  <Input
                    placeholder={caseChatMsgs.length === 0 ? 'Ask a question about this case...' : 'Ask a follow-up question...'}
                    value={chatValue}
                    onChange={(e) => setChatValue(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleCaseChatSend() } }}
                    className="pr-12 h-10 rounded-xl bg-white border-border text-sm"
                    aria-label="Ask HR Robin about this case"
                    disabled={isChatThinking}
                  />
                  <Button
                    size="icon"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 size-7 rounded-lg cursor-pointer bg-primary text-white disabled:opacity-40"
                    aria-label="Send message"
                    onClick={handleCaseChatSend}
                    disabled={!chatValue.trim() || isChatThinking}
                  >
                    <Send className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky action bar — appears when templates are selected */}
      {templateIds.size > 0 && canGenerateDraft && (
        <div className="fixed bottom-0 right-0 z-40 border-t border-border bg-white/95 backdrop-blur-sm shadow-lg px-4 sm:px-6 py-3 hidden md:block" style={{ left: `${sidebarWidth}px`, transition: 'left 200ms cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <FileText className="size-4 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground">
                  {templateIds.size} precedent{templateIds.size > 1 ? 's' : ''} selected
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  {selectedNames.join(', ')} — will be used as reference{templateIds.size > 1 ? 's' : ''} in the draft
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer text-muted-foreground rounded-lg h-9"
                onClick={() => setTemplateIds(new Set())}
              >
                <X className="size-3 mr-1" /> Clear
              </Button>
              <Button
                className="cursor-pointer rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white h-9 px-5 gap-1.5 shadow-sm"
                onClick={() => navigate(`/cases/${caseRow.id}/draft`, { state: { templateIdList: Array.from(templateIds) } })}
              >
                <Sparkles className="size-3.5" />
                Generate draft with {templateIds.size} template{templateIds.size > 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
