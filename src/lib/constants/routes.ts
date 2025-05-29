export const COMMON_ROUTES = {
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  faq: '/faq',
} as const;

export const AUTH_ROUTES = {
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  verifyEmail: '/verify-email',
} as const;

export const USER_ROUTES = {
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  profile: '/user/profile',
  settings: '/user/settings',
  orders: '/user/orders',
  addresses: '/user/addresses',
} as const;

export const SALESMAN_ROUTES = {
  login: '/salesman/login',
  register: '/salesman/register',
  dashboard: '/salesman/dashboard',
  profile: '/salesman/profile',
  settings: '/salesman/settings',
  products: '/salesman/products',
  orders: '/salesman/orders',
  customers: '/salesman/customers',
} as const;

export const ADMIN_ROUTES = {
  login: '/admin/login',
  dashboard: '/admin/dashboard',
  users: '/admin/users',
  salesmen: '/admin/salesmen',
  products: '/admin/products',
  orders: '/admin/orders',
  settings: '/admin/settings',
} as const;

// Type for all routes
export type Route = 
  | typeof COMMON_ROUTES[keyof typeof COMMON_ROUTES]
  | typeof AUTH_ROUTES[keyof typeof AUTH_ROUTES]
  | typeof USER_ROUTES[keyof typeof USER_ROUTES]
  | typeof SALESMAN_ROUTES[keyof typeof SALESMAN_ROUTES]
  | typeof ADMIN_ROUTES[keyof typeof ADMIN_ROUTES]; 