'use client';

import { LoginForm } from "@/components/auth/LoginForm";
import { messages } from "@/lib/messages/vi";
import styles from './page.module.css';

export default function SalesmanLoginPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div>
          <h2 className={styles.loginTitle}>
            {messages.auth.login.role["02"]}
          </h2>
          <p className={styles.loginSubtitle}>
            Hoặc{' '}
            <a href="/auth/salesman/register" className={styles.loginLink}>
              {messages.auth.register.role["02"]}
            </a>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
} 