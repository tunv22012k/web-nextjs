import axios from 'axios';
import { api } from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { LoginFormData } from '@/types/auth';

export const login = async (data: LoginFormData) => {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (error.response?.data?.message || 'Login failed');
    }
    
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (error.response?.data?.error || 'Logout failed');
    }
    throw error;
  }
}; 