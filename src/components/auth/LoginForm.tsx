'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/lib/validations/auth';
import { ROLES, ROLE_ROUTES } from '@/lib/constants/roles';
import { getMessages } from '@/lib/messages';
import { api } from '@/lib/api/axios';
import { ApiError } from '@/lib/types/api';
import { cookieHelper } from '@/lib/utils/cookie';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { AxiosError } from 'axios';

interface LoginFormProps {
  role: typeof ROLES[keyof typeof ROLES];
}

export default function LoginForm({ role }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const messages = getMessages();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post(API_ENDPOINTS.auth.login, data);
      const { access_token, refresh_token } = response.data;

      // Set tokens in cookies
      cookieHelper.set('access_token', access_token, {
        expires: 1, // 1 day
      });
      cookieHelper.set('refresh_token', refresh_token, {
        expires: 7, // 7 days
      });

      // Redirect based on role
      router.push(ROLE_ROUTES[role].dashboard);
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      setError(axiosError.response?.data?.message || messages.auth.login.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mật khẩu
        </label>
        <input
          type="password"
          id="password"
          {...register('password')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? messages.common.loading : messages.auth.login.role[role]}
        </button>
      </div>
    </form>
  );
} 