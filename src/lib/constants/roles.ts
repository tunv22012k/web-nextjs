export const ROLES = {
  USER: '01',
  SALESMAN: '02',
  ADMIN: '03',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const ROLE_ROUTES = {
  [ROLES.USER]: {
    login: '/auth/login',
    register: '/auth/register',
    dashboard: '/user/dashboard',
  },
  [ROLES.SALESMAN]: {
    login: '/auth/salesman/login',
    register: '/auth/salesman/register',
    dashboard: '/salesman/dashboard',
  },
  [ROLES.ADMIN]: {
    login: '/auth/admin/login',
    dashboard: '/admin/dashboard',
  },
} as const;

export const ALLOWED_REGISTER_ROLES = [ROLES.USER, ROLES.SALESMAN] as const; 