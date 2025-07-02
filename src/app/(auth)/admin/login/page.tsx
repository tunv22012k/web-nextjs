'use client';

import { LoginForm } from "@/components/auth/LoginForm";
import { messages } from "@/lib/messages/vi";
import styles from './page.module.css';

export default function AdminLoginPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div>
          <h2 className={styles.loginTitle}>
            {messages.auth.login.role["03"]}
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
} 