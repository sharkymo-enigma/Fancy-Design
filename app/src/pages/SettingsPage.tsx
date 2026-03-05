import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRole } from '@/context/RoleContext'
import { Settings, Users, Database, User, Shield, Check } from 'lucide-react'

const users = [
  { id: '1', name: 'Alex Rivera', email: 'a.rivera@imf.org', role: 'Case Handler', avatar: 'AR' },
  { id: '2', name: 'Jordan Lee', email: 'j.lee@imf.org', role: 'Supervisor', avatar: 'JL' },
  { id: '3', name: 'Sam Chen', email: 's.chen@imf.org', role: 'Admin', avatar: 'SC' },
  { id: '4', name: 'Morgan Taylor', email: 'm.taylor@imf.org', role: 'Viewer', avatar: 'MT' },
]

const roles = ['Admin', 'Supervisor', 'Case Handler', 'Viewer']

const repositories = [
  { name: 'HR Policy SharePoint', type: 'SharePoint', path: '/sites/HR/Policies', lastSync: '2025-03-05 06:00' },
  { name: 'ServiceNow HR cases', type: 'ServiceNow', path: 'imf.service-now.com', lastSync: '2025-03-05 05:30' },
]

export function SettingsPage() {
  const { canManageUsersAndRoles, canManageRepositories, roleLabel } = useRole()
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [roleValues, setRoleValues] = useState<Record<string, string>>(
    Object.fromEntries(users.map((u) => [u.id, u.role]))
  )

  const roleBadge = (role: string) => {
    const colors: Record<string, string> = {
      Admin: 'bg-violet-50 text-violet-700',
      Supervisor: 'bg-blue-50 text-blue-700',
      'Case Handler': 'bg-emerald-50 text-emerald-700',
      Viewer: 'bg-slate-100 text-slate-600',
    }
    return <span className={`badge ${colors[role] || 'bg-slate-100 text-slate-600'}`}>{role}</span>
  }

  return (
    <div className="app-page">
      <h1 className="app-page-title flex items-center gap-2">
        <Settings className="size-5 text-primary" />
        Settings
      </h1>
      <p className="app-page-desc">
        {canManageUsersAndRoles ? 'Manage users, roles, and repository configuration.' : 'View your profile. User management requires Admin role.'}
      </p>

      {canManageUsersAndRoles && (
        <div className="rounded-2xl border border-border bg-white shadow-card overflow-hidden mb-5">
          <div className="px-5 py-3.5 border-b border-border flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10"><Users className="size-4 text-primary" /></div>
            <h2 className="text-sm font-semibold text-foreground m-0">Users & roles</h2>
          </div>
          <div className="divide-y divide-border">
            {users.map((u) => (
              <div key={u.id} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/20 transition-colors">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                  {u.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{u.name}</div>
                  <div className="text-xs text-muted-foreground">{u.email}</div>
                </div>
                {editingUserId === u.id ? (
                  <div className="flex items-center gap-2">
                    <select
                      value={roleValues[u.id]}
                      onChange={(e) => setRoleValues((prev) => ({ ...prev, [u.id]: e.target.value }))}
                      className="h-8 rounded-lg border border-border bg-white px-2 text-xs cursor-pointer"
                    >
                      {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <Button size="sm" className="cursor-pointer h-7 rounded-md text-xs gap-1" onClick={() => setEditingUserId(null)}>
                      <Check className="size-3" /> Save
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {roleBadge(roleValues[u.id])}
                    <Button variant="ghost" size="sm" className="cursor-pointer h-7 text-xs rounded-md" onClick={() => setEditingUserId(u.id)}>Edit</Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {canManageRepositories && (
        <div className="rounded-2xl border border-border bg-white shadow-card overflow-hidden mb-5">
          <div className="px-5 py-3.5 border-b border-border flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10"><Database className="size-4 text-primary" /></div>
            <h2 className="text-sm font-semibold text-foreground m-0">Repositories</h2>
          </div>
          <div className="divide-y divide-border">
            {repositories.map((r) => (
              <div key={r.name} className="flex items-center gap-3 px-5 py-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.type} · {r.path}</div>
                </div>
                <div className="text-xs text-muted-foreground shrink-0">Last sync: {r.lastSync}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile */}
      <div className="rounded-2xl border border-border bg-white shadow-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10"><User className="size-4 text-primary" /></div>
          <h2 className="text-sm font-semibold text-foreground m-0">Profile</h2>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-4 mb-5">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary text-lg font-bold">JS</div>
            <div>
              <div className="text-base font-semibold text-foreground">Jordan Smith</div>
              <div className="flex items-center gap-2 mt-0.5">
                <Shield className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{roleLabel}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 sm:gap-3 items-start sm:items-center max-w-sm text-sm">
            <Label className="text-xs text-muted-foreground">Email</Label>
            <Input value="j.smith@imf.org" disabled className="bg-muted/30 h-9 rounded-lg" />
            <Label className="text-xs text-muted-foreground">Role</Label>
            <Input value={roleLabel} disabled className="bg-muted/30 h-9 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
