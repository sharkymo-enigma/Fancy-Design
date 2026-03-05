import { useState, useEffect, createContext, useContext } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useRole, type Role } from '@/context/RoleContext'
import { useRightRail } from '@/context/RightRailContext'
import { getUnreadCount, getNewCaseCount } from '@/data/syntheticData'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FolderOpen,
  MessageCircle,
  BarChart3,
  Database,
  Calculator,
  ScrollText,
  Settings,
  FileText,
  LayoutDashboard,
  Menu,
  X,
  Search,
  Bell,
  Mail,
} from 'lucide-react'

const SIDEBAR_COLLAPSED = 72
const SIDEBAR_EXPANDED = 240
const USER_FULL_NAME = 'Jordan Smith'
const USER_INITIALS = 'JS'

const SidebarContext = createContext({ expanded: false, toggle: () => {} })

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, can: (_r: ReturnType<typeof useRole>) => true, getBadge: () => 0 },
  { to: '/cases', label: 'Cases', icon: FolderOpen, can: (r: ReturnType<typeof useRole>) => r.canViewCases, getBadge: () => getNewCaseCount() },
  { to: '/inquiries', label: 'Chat', icon: MessageCircle, can: (r: ReturnType<typeof useRole>) => r.canViewInquiries, getBadge: () => getUnreadCount() },
  { to: '/reports', label: 'Reports', icon: BarChart3, can: (r: ReturnType<typeof useRole>) => r.canViewReports, getBadge: () => 0 },
  { to: '/templates', label: 'Templates', icon: FileText, can: (_r: ReturnType<typeof useRole>) => true, getBadge: () => 0 },
  { to: '/benefits-calculator', label: 'Calculator', icon: Calculator, can: (r: ReturnType<typeof useRole>) => r.canViewBenefits, getBadge: () => 0 },
] as const

const adminItems = [
  { to: '/ingestion', label: 'Ingestion', icon: Database, can: (r: ReturnType<typeof useRole>) => r.canIngest },
  { to: '/audit-trail', label: 'Audit Trail', icon: ScrollText, can: (r: ReturnType<typeof useRole>) => r.canViewAuditTrail },
  { to: '/settings', label: 'Settings', icon: Settings, can: (r: ReturnType<typeof useRole>) => r.canAccessSettings },
] as const

const roles: Role[] = ['viewer', 'case_handler', 'reviewer', 'admin']
const roleNames: Record<Role, string> = {
  viewer: 'Viewer',
  case_handler: 'Case handler',
  reviewer: 'Reviewer / SME',
  admin: 'Admin',
}

const IMF_LOGO_URL = 'https://upload.wikimedia.org/wikipedia/commons/8/83/International_Monetary_Fund_initials.png'

function BrandLogo({ size = 'default' }: { size?: 'default' | 'small' }) {
  const s = size === 'small' ? 'size-7' : 'size-9'
  return (
    <div className={cn('flex items-center justify-center rounded-xl bg-[#002D62] shrink-0 p-1.5', s)}>
      <img
        src={IMF_LOGO_URL}
        alt="IMF"
        className="w-full h-full object-contain brightness-0 invert"
      />
    </div>
  )
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate()
  const roleCtx = useRole()
  const { expanded, toggle } = useContext(SidebarContext)
  const visibleNav = navItems.filter((item) => item.can(roleCtx))
  const visibleAdmin = [...adminItems].filter((item) => item.can(roleCtx))

  const handleNavClick = () => onNavigate?.()

  return (
    <>
      {/* Brand logo + toggle row */}
      <div className={cn(
        'flex items-center pt-4 pb-3 overflow-hidden',
        expanded ? 'px-4 gap-3 justify-between' : 'flex-col gap-2 items-center px-2'
      )}>
        <div className={cn('flex items-center', expanded ? 'gap-3' : '')}>
          <BrandLogo />
          {expanded && (
            <div className="min-w-0 overflow-hidden">
              <div className="text-[13px] font-semibold text-white tracking-tight whitespace-nowrap">IMF AIDA</div>
              <div className="text-[10px] text-white/40 tracking-wide whitespace-nowrap">International Monetary Fund</div>
            </div>
          )}
        </div>
        {/* Toggle chevron — top of sidebar */}
        <button
          type="button"
          onClick={toggle}
          className={cn(
            'flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer shrink-0',
            expanded ? 'size-7' : 'size-7 mt-1'
          )}
          aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          title={expanded ? 'Collapse' : 'Expand'}
        >
          {expanded ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
        </button>
      </div>

      {/* Ask HR Robin quick action */}
      {roleCtx.canViewInquiries && (
        <div className={cn('mb-3', expanded ? 'px-3' : 'flex justify-center')}>
          <button
            type="button"
            onClick={() => { navigate('/inquiries', { state: { newChat: true }, replace: true }); handleNavClick() }}
            className={cn(
              'flex items-center bg-gradient-to-r from-primary/90 to-blue-600 text-white shadow-md shadow-primary/30 transition-all cursor-pointer border border-white/[0.08]',
              expanded
                ? 'w-full gap-2.5 rounded-xl px-4 py-2.5 justify-center text-[13px] font-semibold'
                : 'sidebar-nav-icon !bg-gradient-to-br !from-primary/90 !to-blue-600 !text-white !shadow-md !shadow-primary/30'
            )}
            aria-label="Ask HR Robin"
            title="Ask HR Robin"
          >
            <Sparkles className="size-[18px] shrink-0 anim-twinkle" aria-hidden />
            {expanded && <span className="whitespace-nowrap">Ask HR Robin</span>}
          </button>
        </div>
      )}

      {/* Section label */}
      {expanded && (
        <div className="text-[10px] font-medium text-white/25 uppercase tracking-wider px-5 mb-1">Navigation</div>
      )}

      {/* Main nav */}
      <nav className={cn(
        'flex-1 flex flex-col gap-1 overflow-auto',
        expanded ? 'px-3' : 'items-center px-2'
      )}>
        {visibleNav.map(({ to, label, icon: Icon, getBadge }) => {
          const badgeCount = getBadge()
          return (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={handleNavClick}
              title={expanded ? undefined : label}
              aria-label={label}
              className={({ isActive }) =>
                cn(
                  'no-underline transition-all relative',
                  expanded
                    ? cn(
                        'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium group',
                        isActive
                          ? 'bg-white/[0.12] text-white shadow-sm shadow-black/10'
                          : 'text-white/55 hover:text-white hover:bg-white/[0.06]'
                      )
                    : cn(
                        'sidebar-nav-icon',
                        isActive && 'active'
                      )
                )
              }
            >
              <Icon className="size-[18px] shrink-0" aria-hidden />
              {expanded && <span className="truncate">{label}</span>}
              {badgeCount > 0 && (
                expanded ? (
                  <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm shrink-0">
                    {badgeCount}
                  </span>
                ) : (
                  <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white ring-2 ring-sidebar">
                    {badgeCount}
                  </span>
                )
              )}
              {badgeCount === 0 && expanded && (
                <ChevronRight className="size-3 ml-auto opacity-0 group-hover:opacity-40 transition-opacity shrink-0" aria-hidden />
              )}
            </NavLink>
          )
        })}

        {visibleAdmin.length > 0 && (
          <>
            {expanded ? (
              <div className="text-[10px] font-medium text-white/25 uppercase tracking-wider px-2 mt-4 mb-1">System</div>
            ) : (
              <div className="w-6 border-t border-white/10 my-2" />
            )}
            {visibleAdmin.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={handleNavClick}
                title={expanded ? undefined : label}
                aria-label={label}
                className={({ isActive }) =>
                  cn(
                    'no-underline transition-all',
                    expanded
                      ? cn(
                          'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium group',
                          isActive
                            ? 'bg-white/[0.12] text-white shadow-sm shadow-black/10'
                            : 'text-white/55 hover:text-white hover:bg-white/[0.06]'
                        )
                      : cn(
                          'sidebar-nav-icon',
                          isActive && 'active'
                        )
                  )
                }
              >
                <Icon className="size-[18px] shrink-0" aria-hidden />
                {expanded && <span className="truncate">{label}</span>}
                {expanded && (
                  <ChevronRight className="size-3 ml-auto opacity-0 group-hover:opacity-40 transition-opacity shrink-0" aria-hidden />
                )}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      {/* User avatar at bottom */}
      <div className={cn(
        'border-t border-white/[0.06] pt-3 pb-4',
        expanded ? 'px-3' : 'flex flex-col items-center'
      )}>
        {expanded ? (
          <div className="flex items-center gap-2.5 px-2">
            <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-[11px] font-bold shrink-0">
              {USER_INITIALS}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12px] font-medium text-white/75">{USER_FULL_NAME}</div>
              <div className="truncate text-[10px] text-white/25">{roleCtx.roleLabel}</div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-[11px] font-bold cursor-pointer hover:ring-2 hover:ring-emerald-400/30 transition-all"
            title={`${roleCtx.roleLabel} — ${USER_FULL_NAME}`}
            aria-label="User profile"
          >
            {USER_INITIALS}
          </button>
        )}
      </div>
    </>
  )
}

function TopHeader() {
  const roleCtx = useRole()
  const navigate = useNavigate()
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false)

  return (
    <header className="top-header">
      <div className="flex items-center gap-2.5 mr-auto">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-xs font-bold shrink-0">
            {USER_INITIALS}
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-foreground leading-tight">{USER_FULL_NAME}</div>
            <div className="text-[11px] text-muted-foreground">{roleCtx.roleLabel}</div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50 pointer-events-none" />
          <input
            type="text"
            placeholder="Type here to search..."
            className="w-full h-10 rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
            aria-label="Search"
            onFocus={() => navigate('/cases')}
            readOnly
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell className="size-[18px]" />
        </button>
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer relative"
          aria-label="Messages"
          title="Messages"
          onClick={() => navigate('/inquiries')}
        >
          <Mail className="size-[18px]" />
          {getUnreadCount() > 0 && (
            <span className="absolute top-1 right-1 size-2 rounded-full bg-red-500 ring-2 ring-white" />
          )}
        </button>

        <div className="relative ml-2">
          <button
            type="button"
            onClick={() => setRoleSwitcherOpen((o) => !o)}
            className="flex items-center gap-1.5 h-9 rounded-xl border border-border bg-white px-3 text-xs font-medium text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
            aria-expanded={roleSwitcherOpen}
            aria-label="Switch role"
          >
            {roleCtx.roleLabel}
            <ChevronDown className={cn('size-3 text-muted-foreground transition-transform', roleSwitcherOpen && 'rotate-180')} aria-hidden />
          </button>
          {roleSwitcherOpen && (
            <>
              <div className="fixed inset-0 z-40" aria-hidden onClick={() => setRoleSwitcherOpen(false)} />
              <ul className="absolute right-0 top-full z-50 mt-1.5 glass-overlay p-1.5 min-w-[160px]">
                {roles.map((r) => (
                  <li key={r}>
                    <button
                      type="button"
                      onClick={() => { roleCtx.setRole(r); setRoleSwitcherOpen(false) }}
                      className={cn(
                        'block w-full text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer',
                        roleCtx.role === r ? 'bg-primary text-primary-foreground font-medium' : 'text-foreground hover:bg-accent'
                      )}
                    >
                      {roleNames[r]}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export function Layout() {
  const { content: rightRailContent } = useRightRail()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  const sidebarWidth = sidebarExpanded ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const toggleSidebar = () => setSidebarExpanded((prev) => !prev)

  return (
    <SidebarContext.Provider value={{ expanded: sidebarExpanded, toggle: toggleSidebar }}>
      <div className="flex min-h-screen bg-background text-foreground">
        {/* Mobile top bar */}
        <header
          className="fixed top-0 left-0 right-0 z-40 flex md:hidden items-center justify-between h-14 px-4 bg-sidebar"
        >
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex size-9 items-center justify-center rounded-lg text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <div className="flex items-center gap-2">
            <BrandLogo size="small" />
            <span className="text-[13px] font-semibold text-white">IMF AIDA</span>
          </div>
          <div className="size-9" />
        </header>

        {/* Mobile sidebar overlay — always expanded on mobile */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <SidebarContext.Provider value={{ expanded: true, toggle: () => {} }}>
              <aside
                className="absolute inset-y-0 left-0 flex flex-col bg-sidebar overflow-hidden animate-in slide-in-from-left duration-200"
                style={{ width: SIDEBAR_EXPANDED }}
              >
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-4 right-3 z-10 flex size-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="size-4" />
                </button>
                <SidebarContent onNavigate={() => setMobileMenuOpen(false)} />
              </aside>
            </SidebarContext.Provider>
          </div>
        )}

        {/* Desktop sidebar — collapsible/expandable */}
        <aside
          className="hidden md:flex shrink-0 flex-col bg-sidebar fixed inset-y-0 left-0 z-30 overflow-hidden"
          style={{
            width: sidebarWidth,
            transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <SidebarContent />
        </aside>

        {/* Main area */}
        <div
          className="flex-1 min-w-0 flex flex-col pt-14 md:pt-0"
        >
          <style>{`@media(min-width:768px){.main-area-shift{margin-left:${sidebarWidth}px;transition:margin-left 200ms cubic-bezier(0.4,0,0.2,1)}}`}</style>
          <div className="main-area-shift flex flex-col min-h-screen md:min-h-0">
            <div className="hidden md:block sticky top-0 z-20">
              <TopHeader />
            </div>

            <main className="flex-1 min-w-0 overflow-auto bg-background">
              <Outlet />
            </main>
          </div>
        </div>

        {rightRailContent != null && (
          <aside className="hidden lg:flex w-80 shrink-0 border-l border-border bg-card overflow-auto min-h-screen flex-col">
            {rightRailContent}
          </aside>
        )}
      </div>
    </SidebarContext.Provider>
  )
}

export { SidebarContext, SIDEBAR_COLLAPSED, SIDEBAR_EXPANDED, USER_FULL_NAME, USER_INITIALS }
