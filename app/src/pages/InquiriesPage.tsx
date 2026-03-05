import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRole } from '@/context/RoleContext'
import { conversations, chatThreadsByConversationId } from '@/data/syntheticData'
import type { ConversationItem, ConversationStatus, ChatMessage } from '@/data/syntheticData'
import { cn } from '@/lib/utils'
import { Send, Sparkles, ArrowUpRight, Search, FolderOpen, Lock, Plus, ExternalLink, Check, ArrowLeft } from 'lucide-react'

const tabs = ['All', 'Cases', 'Chats', 'Active', 'Resolved'] as const
type Tab = (typeof tabs)[number]

const statusConfig: Record<ConversationStatus, { color: string; label: string }> = {
  active: { color: 'bg-blue-500', label: 'Active' },
  waiting: { color: 'bg-amber-400', label: 'Waiting' },
  resolved: { color: 'bg-emerald-500', label: 'Resolved' },
  closed: { color: 'bg-slate-300', label: 'Closed' },
}

const MIN_LIST_WIDTH = 240
const MAX_LIST_WIDTH = 380
const DEFAULT_LIST_WIDTH = 300

const SIMULATED_RESPONSES: Record<string, { content: string; functionCall?: { name: string; result: string } }> = {
  default: {
    content: 'Based on IMF HR policies, I\'ve found relevant information. Let me know if you\'d like me to search for more specific details or generate a draft response.',
    functionCall: { name: 'search_knowledge', result: 'Searched HR policy database. Found 3 relevant policy sections and 2 precedent cases.' },
  },
  parental: {
    content: 'Under HR Policy 6.2.2, parental leave extensions of 2–4 weeks are permitted when medical documentation is submitted. Three precedent cases (C-2024-0891, C-2024-0765, C-2023-1201) have approved extensions under these circumstances.',
    functionCall: { name: 'search_precedents', result: 'HR Policy 6.2.2 — Found 3 matching precedents for parental leave extension with medical documentation.' },
  },
  allowance: {
    content: 'Overseas assignment allowance for Brussels HQ includes: Housing: 2,400 EUR/month, Education: 12,000 EUR/year for eligible dependents. Rates are per HR Policy 4.2 and confirmed in precedent C-2024-0902.',
    functionCall: { name: 'benefits_calculator', result: 'Brussels HQ assignment: Housing 2,400/mo, Education 12,000/yr. Source: HR Policy 4.2.' },
  },
  draft: {
    content: 'I\'ve prepared a draft response based on the relevant policies and precedents. You can review and edit it in the Draft Editor, or I can refine it further based on your feedback.',
    functionCall: { name: 'generate_draft', result: 'Draft generated using HR Policy 4.2, precedents C-2024-0902, C-2024-0891. Ready for review.' },
  },
}

function getSimulatedResponse(input: string): typeof SIMULATED_RESPONSES['default'] {
  const lower = input.toLowerCase()
  if (lower.includes('parental') || lower.includes('leave') || lower.includes('extension')) return SIMULATED_RESPONSES['parental']
  if (lower.includes('allowance') || lower.includes('overseas') || lower.includes('brussels') || lower.includes('assignment')) return SIMULATED_RESPONSES['allowance']
  if (lower.includes('draft') || lower.includes('generate') || lower.includes('response')) return SIMULATED_RESPONSES['draft']
  return SIMULATED_RESPONSES['default']
}

export function InquiriesPage() {
  const { canViewInquiries } = useRole()
  const location = useLocation()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('All')
  const [selectedId, setSelectedId] = useState<string | null>('1')
  const [readIds, setReadIds] = useState<Set<string>>(new Set(['1']))
  const [listWidth, setListWidth] = useState(DEFAULT_LIST_WIDTH)
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, width: DEFAULT_LIST_WIDTH })
  const [inputValue, setInputValue] = useState('')
  const [localMessages, setLocalMessages] = useState<Record<string, ChatMessage[]>>({})
  const [isThinking, setIsThinking] = useState(false)
  const [addedToCase, setAddedToCase] = useState<Set<string>>(new Set())
  const [mobileShowChat, setMobileShowChat] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const isNewChat = (location.state as { newChat?: boolean } | null)?.newChat === true

  useEffect(() => {
    if (isNewChat) {
      setSelectedId(null)
      setInputValue('')
      setMobileShowChat(true)
      window.history.replaceState({}, '', '/inquiries')
    }
  }, [isNewChat])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [localMessages, isThinking])

  const filtered = useMemo(() => {
    switch (tab) {
      case 'Cases': return conversations.filter((c) => c.type === 'case')
      case 'Chats': return conversations.filter((c) => c.type === 'chat')
      case 'Active': return conversations.filter((c) => c.status === 'active' || c.status === 'waiting')
      case 'Resolved': return conversations.filter((c) => c.status === 'resolved' || c.status === 'closed')
      default: return conversations
    }
  }, [tab])

  const tabCounts = useMemo(() => ({
    All: conversations.length,
    Cases: conversations.filter((c) => c.type === 'case').length,
    Chats: conversations.filter((c) => c.type === 'chat').length,
    Active: conversations.filter((c) => c.status === 'active' || c.status === 'waiting').length,
    Resolved: conversations.filter((c) => c.status === 'resolved' || c.status === 'closed').length,
  }), [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging) return
    setListWidth(Math.min(MAX_LIST_WIDTH, Math.max(MIN_LIST_WIDTH, dragStart.width + (e.clientX - dragStart.x))))
  }, [dragging, dragStart])
  const handleMouseUp = useCallback(() => setDragging(false), [])
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setDragStart({ x: e.clientX, width: listWidth })
    setDragging(true)
  }, [listWidth])

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [dragging, handleMouseMove, handleMouseUp])

  const handleSend = (convId: string | null) => {
    if (!inputValue.trim() || isThinking) return
    const threadKey = convId ?? '__new__'
    const userMsg: ChatMessage = {
      id: `lm-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setLocalMessages((prev) => ({
      ...prev,
      [threadKey]: [...(prev[threadKey] ?? []), userMsg],
    }))
    const question = inputValue
    setInputValue('')
    setIsThinking(true)

    setTimeout(() => {
      const sim = getSimulatedResponse(question)
      const aiMsg: ChatMessage = {
        id: `lm-${Date.now() + 1}`,
        role: 'assistant',
        content: sim.content,
        functionCall: sim.functionCall,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setLocalMessages((prev) => ({
        ...prev,
        [threadKey]: [...(prev[threadKey] ?? []), aiMsg],
      }))
      setIsThinking(false)
    }, 1500)
  }

  const handleAddToCase = (msgId: string, _funcName: string) => {
    setAddedToCase((prev) => new Set(prev).add(msgId))
    setTimeout(() => {
      setAddedToCase((prev) => {
        const next = new Set(prev)
        next.delete(msgId)
        return next
      })
    }, 3000)
  }

  const handleSelectConversation = (id: string) => {
    setSelectedId(id)
    setReadIds((prev) => new Set(prev).add(id))
    setMobileShowChat(true)
  }

  if (!canViewInquiries) {
    return (
      <div className="app-page">
        <h1 className="app-page-title">Chat</h1>
        <p className="app-page-desc">Chat is available to Case handlers and above.</p>
        <Link to="/cases"><Button className="cursor-pointer">Go to Cases</Button></Link>
      </div>
    )
  }

  const selectedConv: ConversationItem | null = selectedId ? filtered.find((c) => c.id === selectedId) ?? filtered[0] ?? null : null
  const fallbackConv = filtered[0] ?? null
  const threadKey = selectedId ?? '__new__'
  const baseThread = selectedId && chatThreadsByConversationId[selectedId] ? chatThreadsByConversationId[selectedId] : []
  const extraMessages = localMessages[threadKey] ?? []
  const thread = [...baseThread, ...extraMessages]

  const renderFunctionCard = (msg: ChatMessage, conv?: ConversationItem | null) => (
    <div className="mb-2.5 rounded-xl bg-gradient-to-br from-muted/80 to-muted/40 border border-border overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/60 bg-muted/30 gap-1 flex-wrap">
        <span className="text-[11px] font-semibold text-primary">{msg.functionCall!.name}</span>
        <div className="flex gap-1">
          {addedToCase.has(msg.id) ? (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 flex items-center gap-0.5">
              <Check className="size-2.5" /> Added
            </span>
          ) : (
            <button
              className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer transition-colors flex items-center gap-0.5"
              onClick={() => handleAddToCase(msg.id, msg.functionCall!.name)}
            >
              <Plus className="size-2.5" /> Add to case
            </button>
          )}
          <button
            className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground hover:bg-accent cursor-pointer transition-colors flex items-center gap-0.5"
            onClick={() => {
              if (conv?.linkedCaseId) navigate(`/cases/${conv.linkedCaseId}`)
              else navigate('/cases')
            }}
          >
            <ExternalLink className="size-2.5" /> Open
          </button>
        </div>
      </div>
      <div className="px-3 py-2 text-[11px] text-muted-foreground font-mono break-all">{msg.functionCall!.result}</div>
    </div>
  )

  const renderThinkingIndicator = () => (
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
          HR Robin is researching...
        </div>
      </div>
    </div>
  )

  const renderMessage = (msg: ChatMessage, conv?: ConversationItem | null) => (
    <div key={msg.id} className={cn('flex gap-2.5', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
      {msg.role === 'assistant' && (
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white mt-0.5">
          <Sparkles className="size-3" aria-hidden />
        </span>
      )}
      <div className={cn(
        'rounded-2xl text-[13px] leading-relaxed',
        msg.role === 'user'
          ? 'max-w-[85%] sm:max-w-[75%] bg-primary text-white rounded-br-md px-4 py-2.5'
          : 'max-w-[90%] sm:max-w-[85%] bg-white border border-border shadow-xs rounded-bl-md px-4 py-2.5'
      )}>
        {msg.functionCall && renderFunctionCard(msg, conv)}
        {msg.content && <p className="m-0 whitespace-pre-wrap">{msg.content}</p>}
        {msg.timestamp && <div className={cn('text-[10px] mt-1.5', msg.role === 'user' ? 'text-white/60' : 'text-muted-foreground')}>{msg.timestamp}</div>}
      </div>
      {msg.role === 'user' && (
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-foreground text-[11px] font-semibold mt-0.5">J</span>
      )}
    </div>
  )

  return (
    <div className="flex h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4.25rem)]">
      {/* Conversation list — full width on mobile, fixed width on desktop */}
      <div
        className={cn(
          'flex-col shrink-0 border-r border-border bg-white',
          mobileShowChat ? 'hidden md:flex' : 'flex w-full md:w-auto'
        )}
        style={{ maxWidth: mobileShowChat ? undefined : undefined }}
      >
        <div className="flex flex-col flex-1 md:w-auto" style={{ width: undefined }}>
          <style>{`@media(min-width:768px){.conv-list-panel{width:${listWidth}px!important}}`}</style>
          <div className="conv-list-panel flex flex-col flex-1">
            <div className="p-3 pb-2">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-foreground m-0">Conversations</h2>
                <div className="flex items-center gap-1.5">
                  <Lock className="size-3 text-muted-foreground/40" aria-label="Session-private" />
                  <span className="text-[10px] text-muted-foreground">{filtered.length}</span>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2 bg-muted/60 rounded-lg p-0.5">
                {tabs.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => { setTab(t); const list = t === 'All' ? conversations : conversations.filter((c) => t === 'Cases' ? c.type === 'case' : t === 'Chats' ? c.type === 'chat' : t === 'Active' ? (c.status === 'active' || c.status === 'waiting') : (c.status === 'resolved' || c.status === 'closed')); setSelectedId(list[0]?.id ?? null) }}
                    className={cn(
                      'flex-1 px-1.5 py-1.5 text-[10px] rounded-md font-medium transition-colors cursor-pointer text-center',
                      tab === t ? 'bg-white text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {t}
                    <span className="ml-0.5 text-[9px] opacity-60">{tabCounts[t]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-auto px-2 pb-2 space-y-0.5">
              {filtered.length === 0 ? (
                <div className="py-6 text-center space-y-2">
                  <p className="text-xs text-muted-foreground">No conversations match this filter.</p>
                  <button
                    className="text-xs font-medium text-primary hover:text-primary/80 cursor-pointer transition-colors bg-transparent border-0"
                    onClick={() => { setTab('All'); setSelectedId(conversations[0]?.id ?? null) }}
                  >
                    Show all conversations
                  </button>
                </div>
              ) : (
                filtered.map((item) => {
                  const sc = statusConfig[item.status]
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectConversation(item.id)}
                      className={cn(
                        'w-full text-left px-3 py-2.5 rounded-lg transition-all cursor-pointer relative',
                        selectedId === item.id
                          ? 'bg-primary/[0.06] border border-primary/15'
                          : 'hover:bg-muted/60 border border-transparent'
                      )}
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={cn('size-2 rounded-full shrink-0', sc.color)} title={sc.label} />
                        <span className="text-[13px] font-medium text-foreground truncate leading-snug flex-1">{item.title}</span>
                        {item.unread > 0 && !readIds.has(item.id) && (
                          <span className="flex size-4.5 items-center justify-center rounded-full bg-blue-500 text-[9px] font-bold text-white shrink-0 min-w-[18px] h-[18px] px-1">
                            {item.unread}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 pl-4">
                        {item.linkedCaseId && (
                          <span className="text-[10px] font-medium text-primary/70 bg-primary/[0.06] px-1.5 py-0.5 rounded">{item.linkedCaseId}</span>
                        )}
                        <span className={cn('text-[10px] px-1.5 py-0.5 rounded', item.type === 'case' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500')}>
                          {item.type === 'case' ? 'Case' : 'Chat'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1 pl-4">
                        <span className="text-[10px] text-muted-foreground truncate flex-1">{item.lastMessage}</span>
                        <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{item.time}</span>
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Resize handle — desktop only */}
      <button
        type="button"
        aria-label="Resize conversation list"
        className={cn('hidden md:block w-1 shrink-0 bg-transparent hover:bg-primary/20 transition-colors cursor-col-resize', dragging && 'bg-primary/30')}
        onMouseDown={handleResizeStart}
      />

      {/* Chat area — full width on mobile when active */}
      <div className={cn(
        'flex-1 flex flex-col min-w-0 bg-background',
        !mobileShowChat && 'hidden md:flex'
      )}>
        {selectedId == null && !fallbackConv ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 sm:p-8">
            {/* Mobile back button for new chat */}
            <button className="md:hidden self-start mb-4 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground cursor-pointer bg-transparent border-0" onClick={() => setMobileShowChat(false)}>
              <ArrowLeft className="size-3.5" /> Conversations
            </button>
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-5 mb-5 ai-pulse">
              <Sparkles className="size-10 text-primary" aria-hidden />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-1">Ask HR Robin</h2>
            <p className="text-sm text-muted-foreground max-w-md mb-6">
              Research policies, find precedents, calculate benefits, and generate drafts. Results appear as action cards you can link to any case.
            </p>
            <div className="relative w-full max-w-2xl">
              <Input
                placeholder="e.g. What parental leave precedents exist for medical extensions?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(null) } }}
                className="pr-12 h-12 rounded-2xl bg-white shadow-sm border-border text-sm"
                aria-label="Ask HR Robin"
              />
              <Button
                size="icon"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 size-9 rounded-xl cursor-pointer bg-primary text-white disabled:opacity-40"
                aria-label="Send message"
                onClick={() => handleSend(null)}
                disabled={!inputValue.trim() || isThinking}
              >
                <Send className="size-4" />
              </Button>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap justify-center">
              <button className="text-xs text-muted-foreground hover:text-primary bg-muted hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer" onClick={() => setInputValue('What parental leave precedents exist?')}>
                Parental leave precedents
              </button>
              <button className="text-xs text-muted-foreground hover:text-primary bg-muted hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer" onClick={() => setInputValue('Calculate overseas assignment allowance')}>
                Calculate allowances
              </button>
              <button className="text-xs text-muted-foreground hover:text-primary bg-muted hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer" onClick={() => setInputValue('Draft response for case C-2025-0142')}>
                Draft a response
              </button>
            </div>
            <div className="flex items-center gap-1.5 mt-5 text-[10px] text-muted-foreground/50">
              <Lock className="size-3" />
              Your conversations are private to your session
            </div>

            {(localMessages['__new__']?.length ?? 0) > 0 && (
              <div className="w-full max-w-2xl mt-6 space-y-4 text-left">
                {(localMessages['__new__'] ?? []).map((msg) => renderMessage(msg))}
                {isThinking && renderThinkingIndicator()}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>
        ) : (() => {
          const conv = selectedConv ?? fallbackConv!
          const sc = statusConfig[conv.status]
          return (
            <>
              {/* Header */}
              <div className="shrink-0 border-b border-border bg-white px-3 sm:px-5 py-3 flex items-center justify-between gap-2 sm:gap-3">
                <div className="min-w-0 flex-1 flex items-center gap-2">
                  {/* Mobile back button */}
                  <button className="md:hidden flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition-colors cursor-pointer shrink-0" onClick={() => setMobileShowChat(false)} aria-label="Back to conversations">
                    <ArrowLeft className="size-4" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={cn('size-2 rounded-full shrink-0', sc.color)} />
                      <h3 className="text-sm font-semibold text-foreground m-0 truncate">{conv.title}</h3>
                      <span className={cn('badge hidden sm:inline-flex', conv.status === 'active' ? 'bg-blue-50 text-blue-700' : conv.status === 'waiting' ? 'bg-amber-50 text-amber-700' : conv.status === 'resolved' ? 'bg-emerald-50 text-emerald-700' : 'badge-closed')}>
                        {sc.label}
                      </span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground mt-0.5 pl-4">
                      <Lock className="size-2.5" />
                      <span>Private session</span>
                      <span className="text-border">·</span>
                      <span>{conv.time}</span>
                      {conv.linkedCaseId && (
                        <>
                          <span className="text-border">·</span>
                          <span className="text-primary/70">Linked to {conv.linkedCaseId}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Button variant="outline" size="sm" className="cursor-pointer rounded-lg gap-1 text-xs h-8 hidden sm:flex" onClick={() => navigate('/cases')}>
                    <Search className="size-3" /> Cases
                  </Button>
                  {conv.linkedCaseId && (
                    <Button size="sm" className="cursor-pointer rounded-lg gap-1 text-xs h-8" onClick={() => navigate(`/cases/${conv.linkedCaseId}`)}>
                      <FolderOpen className="size-3" /> <span className="hidden sm:inline">Open case</span> <ArrowUpRight className="size-3" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-auto px-3 sm:px-5 py-4 space-y-4">
                {thread.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Sparkles className="size-8 text-muted-foreground/20 mb-3" />
                    <p className="text-sm text-muted-foreground">No messages yet. Ask HR Robin below.</p>
                  </div>
                ) : (
                  thread.map((msg) => renderMessage(msg, conv))
                )}
                {isThinking && renderThinkingIndicator()}
                <div ref={chatEndRef} />
              </div>

              {/* Full-width input */}
              <div className="shrink-0 border-t border-border bg-white px-3 sm:px-5 py-3">
                <div className="relative">
                  <Input
                    placeholder="Ask HR Robin a follow-up..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(selectedId) } }}
                    className="pr-12 h-12 rounded-xl bg-muted/20 border-border text-sm"
                    aria-label="Ask HR Robin follow-up"
                    disabled={isThinking}
                  />
                  <Button
                    size="icon"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 size-9 rounded-lg cursor-pointer bg-primary text-white disabled:opacity-40"
                    aria-label="Send follow-up"
                    onClick={() => handleSend(selectedId)}
                    disabled={!inputValue.trim() || isThinking}
                  >
                    <Send className="size-4" />
                  </Button>
                </div>
              </div>
            </>
          )
        })()}
      </div>
    </div>
  )
}
