import { z } from "zod";
import { messages } from "@/lib/messages/vi";
import { ROLES } from "@/lib/constants/roles";

// Regex patterns
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

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
    first_name: nameSchema,
    phone: phoneSchema,
    sex: z.string(),
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