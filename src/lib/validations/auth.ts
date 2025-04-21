import { z } from "zod";
import { getMessages } from "@/lib/messages";
import { ROLES } from "@/lib/constants/roles";

// Get messages for current locale
const messages = getMessages();

// Regex patterns
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

// Common validation messages
export const ValidationMessages = {
  required: "Trường này là bắt buộc",
  email: {
    invalid: "Email không hợp lệ",
    required: "Email là bắt buộc",
  },
  password: {
    required: "Mật khẩu là bắt buộc",
    min: "Mật khẩu phải có ít nhất 8 ký tự",
    pattern: "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số",
  },
  phone: {
    pattern: "Số điện thoại không hợp lệ",
  },
  name: {
    required: "Họ tên là bắt buộc",
    min: "Họ tên phải có ít nhất 2 ký tự",
    max: "Họ tên không được quá 50 ký tự",
  },
  role: {
    invalid: "Vai trò không hợp lệ",
  },
};

// Base schemas
export const emailSchema = z.string().email(messages.auth.validation.email.invalid);
export const passwordSchema = z
  .string()
  .min(8, messages.auth.validation.password.min)
  .regex(PASSWORD_REGEX, messages.auth.validation.password.pattern);
export const phoneSchema = z
  .string()
  .regex(PHONE_REGEX, messages.auth.validation.phone.pattern)
  .optional();
export const nameSchema = z
  .string()
  .min(2, messages.auth.validation.name.min)
  .max(50, messages.auth.validation.name.max);
export const roleSchema = z.enum([ROLES.USER, ROLES.SALESMAN, ROLES.ADMIN], {
  errorMap: () => ({ message: messages.auth.validation.role.invalid }),
});

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, messages.auth.validation.password.required),
  role: roleSchema,
  remember: z.boolean().optional(),
});

// Register schema
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    name: nameSchema,
    phone: phoneSchema,
    role: z.enum([ROLES.USER, ROLES.SALESMAN], {
      errorMap: () => ({ message: messages.auth.validation.role.invalid }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: messages.auth.validation.password.confirm,
    path: ["confirmPassword"],
  });

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: emailSchema,
  role: roleSchema,
});

// Reset password schema
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: messages.auth.validation.password.confirm,
    path: ["confirmPassword"],
  });

// Types
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>; 