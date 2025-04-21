'use client';

import LoginForm from "@/components/auth/LoginForm";
import { ROLES } from "@/lib/constants/roles";
import { AUTH_ROUTES } from "@/lib/constants/routes";
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div>
          <h2 className={styles.loginTitle}>
            Đăng nhập vào tài khoản
          </h2>
          <p className={styles.loginSubtitle}>
            Hoặc{' '}
            <a href={AUTH_ROUTES.register} className={styles.loginLink}>
              đăng ký tài khoản mới
            </a>
          </p>
        </div>
        <LoginForm role={ROLES.USER} />
      </div>
    </div>
  );
} 