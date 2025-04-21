'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ROLES } from "@/lib/constants/roles";
import { USER_ROUTES, SALESMAN_ROUTES, ADMIN_ROUTES, AUTH_ROUTES } from "@/lib/constants/routes";
import { getMessages } from "@/lib/messages";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

interface LoginFormProps {
  role: typeof ROLES[keyof typeof ROLES];
}

export default function LoginForm({ role }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState('');
  const messages = getMessages();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormValidation({
    schema: loginSchema,
    defaultValues: {
      email: '',
      password: '',
      role,
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Redirect based on role
        switch (role) {
          case ROLES.USER:
            router.push(USER_ROUTES.dashboard);
            break;
          case ROLES.SALESMAN:
            router.push(SALESMAN_ROUTES.dashboard);
            break;
          case ROLES.ADMIN:
            router.push(ADMIN_ROUTES.dashboard);
            break;
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || messages.auth.login.error);
      }
    } catch {
      setError(messages.auth.login.server_error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      {error && (
        <div className="text-red-500 text-center">{error}</div>
      )}
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <input
            type="email"
            {...register("email")}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            {...register("password")}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Mật khẩu"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("remember")}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Ghi nhớ đăng nhập
          </label>
        </div>

        <div className="text-sm">
          <a href={AUTH_ROUTES.forgotPassword} className="font-medium text-indigo-600 hover:text-indigo-500">
            Quên mật khẩu?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? messages.common.processing : messages.auth.login.role[role]}
        </button>
      </div>
    </form>
  );
} 