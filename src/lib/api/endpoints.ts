export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    ME: '/me',
    REFRESH: `/refresh`,
  },
  // Thêm các endpoints khác ở đây
  // Ví dụ:
  // USER: {
  //   PROFILE: '/user/profile',
  //   SETTINGS: '/user/settings',
  // },
} as const; 