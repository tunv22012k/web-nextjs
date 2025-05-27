import Cookies from 'js-cookie';

export interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export const cookieHelper = {
  set: (name: string, value: string, options: CookieOptions = {}) => {
    Cookies.set(name, value, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      ...options,
    });
  },

  get: (name: string) => {
    return Cookies.get(name);
  },

  delete: (name: string, options: CookieOptions = {}) => {
    Cookies.remove(name, options);
  },
}; 