import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

interface UseFormValidationProps<T extends z.ZodType>
  extends Omit<UseFormProps<z.infer<T>>, "resolver"> {
  schema: T;
}

export function useFormValidation<T extends z.ZodType>({
  schema,
  ...formConfig
}: UseFormValidationProps<T>) {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    ...formConfig,
  });
} 