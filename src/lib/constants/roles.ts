export const ROLES = {
  USER: '01',
  SALESMAN: '02',
  ADMIN: '03',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];