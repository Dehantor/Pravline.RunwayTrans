import type { Access, PayloadRequest } from 'payload'

export type UserRole = 'admin' | 'moderator' | 'office-manager'

export const ROLE_OPTIONS: { label: string; value: UserRole }[] = [
  {
    label: 'Администратор',
    value: 'admin',
  },
  {
    label: 'Модератор',
    value: 'moderator',
  },
  {
    label: 'Офис-менеджер',
    value: 'office-manager',
  },
]

const getUserRoles = (user: unknown): UserRole[] => {
  const roles = (user as { roles?: unknown } | null | undefined)?.roles

  if (!Array.isArray(roles)) {
    return []
  }

  return roles.filter((role): role is UserRole =>
    ROLE_OPTIONS.some((option) => option.value === role),
  )
}

export const userHasRole = (user: unknown, allowedRoles: UserRole[]): boolean => {
  const roles = getUserRoles(user)

  return roles.some((role) => allowedRoles.includes(role))
}

export const isAdminUser = (user: unknown): boolean => userHasRole(user, ['admin'])

export const canUseAdminPanel = ({ req: { user } }: { req: PayloadRequest }): boolean => {
  return userHasRole(user, ['admin', 'moderator', 'office-manager'])
}

export const adminOnly: Access = ({ req: { user } }) => {
  return isAdminUser(user)
}

export const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isAdminUser(user)) return true

  return {
    id: {
      equals: user.id,
    },
  }
}

export const canEditContent: Access = ({ req: { user } }) => {
  return userHasRole(user, ['admin', 'moderator'])
}

export const canManageApplications: Access = ({ req: { user } }) => {
  return userHasRole(user, ['admin', 'office-manager'])
}

export const canEditContentOrPublished: Access = ({ req: { user } }) => {
  if (userHasRole(user, ['admin', 'moderator'])) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
