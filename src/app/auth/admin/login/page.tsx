'use client';

import LoginForm from "@/components/auth/LoginForm";
import { ROLES } from "@/lib/constants/roles";
import { getMessages } from "@/lib/messages";

export default function AdminLoginPage() {
  const messages = getMessages();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {messages.auth.login.role["03"]}
          </h2>
        </div>
        <LoginForm role={ROLES.ADMIN} />
      </div>
    </div>
  );
} 