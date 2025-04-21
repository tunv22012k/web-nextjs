'use client';

import LoginForm from "@/components/auth/LoginForm";
import { ROLES } from "@/lib/constants/roles";
import { getMessages } from "@/lib/messages";

export default function SalesmanLoginPage() {
  const messages = getMessages();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {messages.auth.login.role["02"]}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hoặc{' '}
            <a href="/auth/salesman/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              {messages.auth.register.role["02"]}
            </a>
          </p>
        </div>
        <LoginForm role={ROLES.SALESMAN} />
      </div>
    </div>
  );
} 