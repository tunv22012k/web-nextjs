export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/login',
    LOGOUT: '/logout',
    ME: '/me',
    REFRESH: `/refresh`,
    REGISTER: '/register',
  },
  // Thêm các endpoints khác ở đây
  // Ví dụ:
  // USER: {
  //   PROFILE: '/user/profile',
  //   SETTINGS: '/user/settings',
  // },
} as const; 