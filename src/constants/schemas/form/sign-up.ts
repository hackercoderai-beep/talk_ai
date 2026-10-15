import { revalidateLogic } from "@tanstack/react-form";
import { z } from "zod";
import { useAppForm } from "@/components/form";

export const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpValues = z.infer<typeof formSchema>;

const defaultValues: SignUpValues = {
  confirmPassword: "",
  email: "",
  name: "",
  password: "",
};

export const placeholderValues = {
  name: "Tim Cook",
  email: "tim.cook@apple.com",
  password: "••••••••",
  confirmPassword: "••••••••",
};

export function useSignUpForm(
  onSubmit: (data: SignUpValues) => Promise<void> | void
) {
  return useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
    // Validate on first submit, then revalidate on change (docs: dynamic validation)
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: formSchema,
    },
  });
}
