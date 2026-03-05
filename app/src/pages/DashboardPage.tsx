import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRole } from '@/context/RoleContext'
import { cases, conversations, auditEntries } from '@/data/syntheticData'
import { USER_FULL_NAME } from '@/layout/Layout'
import {
  Sparkles,
  ArrowRight,
  FolderOpen,
  MessageCircle,
  Clock,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  FileText,
  Activity,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Sun,
  Sunset,
  Moon,
  Flame,
  Heart,
  Coffee,
  Leaf,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const statusDot: Record<string, string> = {
  'New': 'bg-purple-500',
  'In Progress': 'bg-blue-500',
  'Pending Review': 'bg-amber-400',
  'Resolved': 'bg-emerald-500',
  'Closed': 'bg-slate-300',
}

const encouragements = [
  { text: 'Every case you close makes a real difference for someone.', icon: Heart, color: 'text-rose-400' },
  { text: 'Consistency is your superpower — keep it up.', icon: Flame, color: 'text-orange-400' },
  { text: 'Take a moment to stretch and breathe if you need it.', icon: Coffee, color: 'text-amber-500' },
  { text: 'Your thoroughness is what makes this team strong.', icon: Leaf, color: 'text-emerald-500' },
  { text: 'Complex cases build expertise — you\'re growing every day.', icon: Sparkles, color: 'text-primary' },
]

export function DashboardPage() {
  const navigate = useNavigate()
  const roleCtx = useRole()
  const firstName = USER_FULL_NAME.split(' ')[0]

  const myCases = cases.filter((c) => c.assignee === 'J. Smith')
  const highUrgency = cases.filter((c) => c.urgency === 'High' && c.status !== 'Resolved' && c.status !== 'Closed')
  const pendingReview = cases.filter((c) => c.status === 'Pending Review')
  const newCases = cases.filter((c) => c.isNew)
  const unreadChats = conversations.filter((c) => c.unread > 0)
  const recentActivity = auditEntries.slice(0, 4)
  const resolvedCount = cases.filter(c => c.status === 'Resolved').length
  const closedCount = cases.filter(c => c.status === 'Closed').length
  const totalHandled = resolvedCount + closedCount
  const totalCases = cases.length
  const progressPct = totalCases > 0 ? Math.round((totalHandled / totalCases) * 100) : 0

  const [encourageIdx, setEncourageIdx] = useState(() => Math.floor(Math.random() * encouragements.length))

  useEffect(() => {
    const interval = setInterval(() => {
      setEncourageIdx(prev => (prev + 1) % encouragements.length)
    }, 20000)
    return () => clearInterval(interval)
  }, [])

  const currentEncouragement = encouragements[encourageIdx]
  const EncourageIcon = currentEncouragement.icon

  const { greeting, subGreeting, GreetingIcon } = (() => {
    const h = new Date().getHours()
    if (h < 12) return {
      greeting: 'Good morning',
      subGreeting: 'Here\'s what\'s on your plate today.',
      GreetingIcon: Sun,
    }
    if (h < 17) return {
      greeting: 'Good afternoon',
      subGreeting: 'Hope your day is going well. Here\'s your overview.',
      GreetingIcon: Sunset,
    }
    return {
      greeting: 'Good evening',
      subGreeting: 'Wrapping up? Here\'s where things stand.',
      GreetingIcon: Moon,
    }
  })()

  const hasUrgentWork = highUrgency.length > 0 || newCases.length > 0 || unreadChats.length > 0
  const allCaughtUp = !hasUrgentWork

  return (
    <div className="app-page">
      {/* Greeting row */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6 mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <GreetingIcon className="size-5 text-amber-400 anim-float" />
            <h1 className="text-xl sm:text-2xl font-bold text-foreground m-0">
              {greeting}, {firstName}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground m-0">
            {subGreeting}
            {' '}
            <span className="text-foreground/60">
              {myCases.length} active case{myCases.length !== 1 ? 's' : ''}
              {highUrgency.length > 0 && <> · <span className="text-red-500 font-medium">{highUrgency.length} need attention</span></>}
              {pendingReview.length > 0 && roleCtx.role === 'reviewer' && <> · <span className="text-amber-600 font-medium">{pendingReview.length} awaiting your review</span></>}
            </span>
          </p>
        </div>
      </div>

      {/* KPI cards — staggered entrance */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 stagger-enter">
        <Link to="/cases" className="no-underline group">
          <div className="bg-white rounded-2xl border border-border p-5 shadow-card hover:shadow-md hover:border-primary/20 transition-all hover:-translate-y-0.5 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 icon-lift">
                <FolderOpen className="size-5 text-primary" />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                <TrendingUp className="size-3" /> +12%
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{myCases.length}</div>
            <div className="text-xs text-muted-foreground mt-1">Active cases</div>
          </div>
        </Link>

        <Link to="/inquiries" className="no-underline group">
          <div className="bg-white rounded-2xl border border-border p-5 shadow-card hover:shadow-md hover:border-primary/20 transition-all hover:-translate-y-0.5 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 icon-lift">
                <MessageCircle className="size-5 text-blue-500" />
              </div>
              {unreadChats.length > 0 ? (
                <div className="flex items-center gap-1 text-xs font-medium text-red-500">
                  <TrendingDown className="size-3" /> {unreadChats.length} new
                </div>
              ) : (
                <span className="text-xs text-emerald-500 font-medium">All read</span>
              )}
            </div>
            <div className="text-2xl font-bold text-foreground">{unreadChats.reduce((sum, c) => sum + c.unread, 0)}</div>
            <div className="text-xs text-muted-foreground mt-1">Unread messages</div>
          </div>
        </Link>

        {(roleCtx.role === 'reviewer' || roleCtx.role === 'admin') && (
          <Link to="/cases" className="no-underline group">
            <div className="bg-white rounded-2xl border border-border p-5 shadow-card hover:shadow-md hover:border-primary/20 transition-all hover:-translate-y-0.5 cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 icon-lift">
                  <CheckCircle2 className="size-5 text-amber-500" />
                </div>
                <span className="text-xs text-amber-600 font-medium">awaiting</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{pendingReview.length}</div>
              <div className="text-xs text-muted-foreground mt-1">Pending review</div>
            </div>
          </Link>
        )}

        <Link to="/reports" className="no-underline group">
          <div className="bg-white rounded-2xl border border-border p-5 shadow-card hover:shadow-md hover:border-primary/20 transition-all hover:-translate-y-0.5 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 icon-lift">
                <BarChart3 className="size-5 text-emerald-500" />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                <TrendingUp className="size-3" /> +5%
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{resolvedCount}</div>
            <div className="text-xs text-muted-foreground mt-1">Resolved this week</div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Requires attention — left 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className={cn(
                'flex size-8 items-center justify-center rounded-lg',
                hasUrgentWork ? 'bg-amber-50' : 'bg-emerald-50'
              )}>
                {hasUrgentWork
                  ? <AlertTriangle className="size-4 text-amber-500 anim-wiggle" />
                  : <CheckCircle2 className="size-4 text-emerald-500 anim-bounce" />
                }
              </div>
              <h2 className="text-sm font-semibold text-foreground m-0">
                {hasUrgentWork ? 'Needs your attention' : 'Looking good'}
              </h2>
            </div>
            <Link to="/cases" className="text-xs font-medium text-primary hover:text-primary/80 no-underline flex items-center gap-1 cursor-pointer">
              View all <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {newCases.length > 0 && newCases.map((c) => (
              <Link key={`new-${c.id}`} to={`/cases/${c.id}`} className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-muted/30 transition-colors no-underline cursor-pointer group">
                <span className="size-2.5 rounded-full bg-purple-500 shrink-0 anim-breathe" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-primary font-semibold">{c.id}</span>
                    <span className="badge badge-high">{c.urgency}</span>
                    <span className="badge bg-purple-50 text-purple-700">New</span>
                  </div>
                  <div className="text-sm text-foreground truncate mt-0.5">{c.topic}</div>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </Link>
            ))}
            {highUrgency.filter(c => !c.isNew).map((c) => (
              <Link key={`urgent-${c.id}`} to={`/cases/${c.id}`} className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-muted/30 transition-colors no-underline cursor-pointer group">
                <span className={cn('size-2.5 rounded-full shrink-0', statusDot[c.status])} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-primary font-semibold">{c.id}</span>
                    <span className="badge badge-high">{c.urgency}</span>
                  </div>
                  <div className="text-sm text-foreground truncate mt-0.5">{c.topic}</div>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </Link>
            ))}
            {unreadChats.map((c) => (
              <Link key={`chat-${c.id}`} to="/inquiries" className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-muted/30 transition-colors no-underline cursor-pointer group">
                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 shrink-0">
                  <MessageCircle className="size-4 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground font-medium truncate">{c.title}</span>
                    <span className="flex size-4.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">{c.unread}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.lastMessage}</div>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </Link>
            ))}
            {allCaughtUp && (
              <div className="px-5 py-10 text-center">
                <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 mb-3 anim-breathe">
                  <CheckCircle2 className="size-7 text-emerald-400 anim-bounce" />
                </div>
                <p className="text-sm font-medium text-foreground m-0 mb-1">You're all caught up</p>
                <p className="text-xs text-muted-foreground m-0">No urgent items right now. Great work, {firstName}.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Your momentum — progress + encouragement */}
          <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border/50">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 icon-lift">
                  <Flame className="size-4 text-orange-400 anim-float" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground m-0">Your momentum</h2>
                  <p className="text-[11px] text-muted-foreground m-0 mt-0.5">{totalHandled} of {totalCases} cases handled</p>
                </div>
              </div>
            </div>
            <div className="px-5 py-4 space-y-4">
              {/* Progress bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-foreground/70">Completion rate</span>
                  <span className="text-xs font-bold text-emerald-600">{progressPct}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full anim-progress-fill"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2.5 rounded-xl bg-white/80 border border-border/50">
                  <div className="text-lg font-bold text-emerald-600">{resolvedCount}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Resolved</div>
                </div>
                <div className="text-center p-2.5 rounded-xl bg-white/80 border border-border/50">
                  <div className="text-lg font-bold text-blue-500">{myCases.length}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">In progress</div>
                </div>
              </div>

              {/* Rotating encouragement */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/60 border border-border/30">
                <EncourageIcon className={cn('size-4 shrink-0 mt-0.5 anim-float', currentEncouragement.color)} />
                <p className="text-[11px] leading-relaxed text-foreground/70 m-0 italic">
                  "{currentEncouragement.text}"
                </p>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground m-0">Quick actions</h2>
              <p className="text-[11px] text-muted-foreground m-0 mt-0.5">Jump right into what you need</p>
            </div>
            <div className="p-3 space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-11 text-[13px] font-medium cursor-pointer rounded-xl hover:bg-primary/5 group"
                onClick={() => navigate('/inquiries', { state: { newChat: true } })}
              >
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 shrink-0 icon-lift">
                  <Sparkles className="size-4 text-primary anim-twinkle" />
                </div>
                Ask HR Robin
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-11 text-[13px] font-medium cursor-pointer rounded-xl hover:bg-primary/5 group"
                onClick={() => navigate('/cases')}
              >
                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 shrink-0 icon-lift">
                  <FolderOpen className="size-4 text-blue-500" />
                </div>
                Search cases
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-11 text-[13px] font-medium cursor-pointer rounded-xl hover:bg-primary/5 group"
                onClick={() => navigate('/templates')}
              >
                <div className="flex size-8 items-center justify-center rounded-lg bg-violet-50 shrink-0 icon-lift">
                  <FileText className="size-4 text-violet-500" />
                </div>
                Browse templates
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-11 text-[13px] font-medium cursor-pointer rounded-xl hover:bg-primary/5 group"
                onClick={() => navigate('/reports')}
              >
                <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 shrink-0 icon-lift">
                  <BarChart3 className="size-4 text-emerald-500" />
                </div>
                Weekly summary
              </Button>
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <Activity className="size-4 text-muted-foreground" />
                </div>
                <h2 className="text-sm font-semibold text-foreground m-0">Recent activity</h2>
              </div>
              {roleCtx.canViewAuditTrail && (
                <Link to="/audit-trail" className="text-xs font-medium text-primary hover:text-primary/80 no-underline cursor-pointer">
                  Full log
                </Link>
              )}
            </div>
            <div className="divide-y divide-border">
              {recentActivity.map((entry, i) => (
                <div key={i} className="px-5 py-3">
                  <div className="flex items-center gap-2.5 text-xs">
                    <div className="flex size-6 items-center justify-center rounded-full bg-muted shrink-0">
                      <Clock className="size-3 text-muted-foreground" />
                    </div>
                    <span className="text-muted-foreground">{entry.timestamp.split(' ')[1]?.slice(0, 5)}</span>
                    <span className="text-foreground font-medium">{entry.user}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground ml-8.5 mt-0.5 pl-0.5">{entry.action} — {entry.details}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
