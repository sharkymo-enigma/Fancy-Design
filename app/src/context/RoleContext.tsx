import { createContext, useContext, useState, useMemo, type ReactNode } from 'react'

export type Role = 'viewer' | 'case_handler' | 'reviewer' | 'admin'

type RoleContextValue = {
  role: Role
  setRole: (r: Role) => void
  canViewCases: boolean
  canViewInquiries: boolean
  canViewReports: boolean
  canIngest: boolean
  canViewBenefits: boolean
  canViewAuditTrail: boolean
  canAccessSettings: boolean
  canGenerateDraft: boolean
  canEditDraft: boolean
  canSaveSend: boolean
  canSMEValidate: boolean
  canManageUsersAndRoles: boolean
  canManageRepositories: boolean
  roleLabel: string
}

const RoleContext = createContext<RoleContextValue | null>(null)

const permissionMatrix: Record<Role, Record<keyof Omit<RoleContextValue, 'role' | 'setRole' | 'roleLabel'>, boolean>> = {
  viewer: {
    canViewCases: true,
    canViewInquiries: false,
    canViewReports: false,
    canIngest: false,
    canViewBenefits: false,
    canViewAuditTrail: true,
    canAccessSettings: true,
    canGenerateDraft: false,
    canEditDraft: false,
    canSaveSend: false,
    canSMEValidate: false,
    canManageUsersAndRoles: false,
    canManageRepositories: false,
  },
  case_handler: {
    canViewCases: true,
    canViewInquiries: true,
    canViewReports: true,
    canIngest: true,
    canViewBenefits: true,
    canViewAuditTrail: true,
    canAccessSettings: true,
    canGenerateDraft: true,
    canEditDraft: true,
    canSaveSend: true,
    canSMEValidate: false,
    canManageUsersAndRoles: false,
    canManageRepositories: false,
  },
  reviewer: {
    canViewCases: true,
    canViewInquiries: true,
    canViewReports: true,
    canIngest: true,
    canViewBenefits: true,
    canViewAuditTrail: true,
    canAccessSettings: true,
    canGenerateDraft: true,
    canEditDraft: true,
    canSaveSend: true,
    canSMEValidate: true,
    canManageUsersAndRoles: false,
    canManageRepositories: false,
  },
  admin: {
    canViewCases: true,
    canViewInquiries: true,
    canViewReports: true,
    canIngest: true,
    canViewBenefits: true,
    canViewAuditTrail: true,
    canAccessSettings: true,
    canGenerateDraft: true,
    canEditDraft: true,
    canSaveSend: true,
    canSMEValidate: true,
    canManageUsersAndRoles: true,
    canManageRepositories: true,
  },
}

const roleLabels: Record<Role, string> = {
  viewer: 'Viewer',
  case_handler: 'Case handler',
  reviewer: 'Reviewer / SME',
  admin: 'Admin',
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('case_handler')
  const value = useMemo(() => {
    const perms = permissionMatrix[role]
    return {
      role,
      setRole,
      roleLabel: roleLabels[role],
      ...perms,
    }
  }, [role])
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be used within RoleProvider')
  return ctx
}
