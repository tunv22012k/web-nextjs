const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_URL}/api/login`,
    register: `${API_URL}/api/register`,
    logout: `${API_URL}/api/logout`,
    user: `${API_URL}/api/user`,
    refresh: `${API_URL}/api/refresh`,
  },
}; 