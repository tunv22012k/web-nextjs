'use client';

import LoginForm from "@/components/auth/LoginForm";
import { ROLES } from "@/lib/constants/roles";
import { getMessages } from "@/lib/messages";
import styles from './page.module.css';

export default function SalesmanLoginPage() {
  const messages = getMessages();

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
        <LoginForm role={ROLES.SALESMAN} />
      </div>
    </div>
  );
} 