"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, logout, register } from '@/services/auth.service';
import { cookieHelper } from '@/lib/utils/cookie';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    // const checkAuth = async () => {
    //   try {
    //     const response = await fetch('/api/auth/me');
    //     if (response.ok) {
    //       const user = await response.json();
    //       setAuthState({ isAuthenticated: true, user });
    //     }
    //   } catch (error) {
    //     setAuthState({ isAuthenticated: false, user: null });
    //   }
    // };

    // checkAuth();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await login({ email, password });
      const { access_token, refresh_token } = data.data;

      // Save tokens to cookies
      cookieHelper.set('access_token', access_token, {
        expires: 1, // 1 day
      });
      cookieHelper.set('refresh_token', refresh_token, {
        expires: 7, // 7 days
      });

      router.push('/');
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();

      // Remove tokens from cookies
      cookieHelper.delete('access_token');
      cookieHelper.delete('refresh_token');

      router.push('/login');
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (email: string, password: string, password_confirmation: string, first_name: string, phone?: string, sex?: string, role?: string) => {
    try {
      await register({ email, password, password_confirmation, first_name, phone, sex, role });
      router.push('/login');
    } catch (error) {
      throw error;
    }
  };

  return {
    handleLogin,
    handleLogout,
    handleRegister,
  };
}; 