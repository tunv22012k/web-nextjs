'use client';

import { RegisterForm } from "@/components/auth/RegisterForm";
import { USER_ROUTES } from "@/lib/constants/routes";
import styles from './page.module.css';

export default function RegisterPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div>
          <h2 className={styles.loginTitle}>
            Đăng kí tài khoản
          </h2>
          <p className={styles.loginSubtitle}>
            Hoặc{' '}
            <a href={USER_ROUTES.login} className={styles.loginLink}>
              Đăng nhập
            </a>
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
} 