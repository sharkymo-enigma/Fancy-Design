import { useRole } from '@/context/RoleContext'
import { cn } from '@/lib/utils'

/**
 * Role-based view banner: shows current role and read-only state for Viewer.
 * Keeps role-based views visible and explicit per spec/roles-permissions.md.
 */
export function RoleBanner({ className }: { className?: string }) {
  const { roleLabel, role } = useRole()
  const isViewer = role === 'viewer'

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors duration-200',
        isViewer
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200'
          : 'bg-primary/5 border-primary/20 text-foreground',
        className
      )}
    >
      <span className="tabular-nums">Viewing as: {roleLabel}</span>
      {isViewer && (
        <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-300">
          <span aria-hidden>—</span>
          Read-only
        </span>
      )}
    </div>
  )
}
