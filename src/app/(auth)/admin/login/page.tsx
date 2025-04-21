'use client';

import LoginForm from "@/components/auth/LoginForm";
import { ROLES } from "@/lib/constants/roles";
import { getMessages } from "@/lib/messages";
import styles from './page.module.css';

export default function AdminLoginPage() {
  const messages = getMessages();

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div>
          <h2 className={styles.loginTitle}>
            {messages.auth.login.role["03"]}
          </h2>
        </div>
        <LoginForm role={ROLES.ADMIN} />
      </div>
    </div>
  );
} 