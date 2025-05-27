import axios from 'axios';

// Tạo instance axios với cấu hình mặc định
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Quan trọng để gửi cookies
});

// Thêm interceptor để xử lý lỗi chung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Xử lý khi token hết hạn
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
); 