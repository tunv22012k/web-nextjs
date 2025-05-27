"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthState } from '@/types/auth';
import { login, logout } from '@/services/auth.service';

export const useAuth = () => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const user = await response.json();
          setAuthState({ isAuthenticated: true, user });
        }
      } catch (error) {
        setAuthState({ isAuthenticated: false, user: null });
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const user = await login({ email, password });
      setAuthState({ isAuthenticated: true, user });
      router.push('/');
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setAuthState({ isAuthenticated: false, user: null });
      router.push('/login');
    } catch (error) {
      throw error;
    }
  };

  return {
    authState,
    handleLogin,
    handleLogout,
  };
}; 