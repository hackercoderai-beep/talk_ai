import { revalidateLogic } from "@tanstack/react-form";
import { z } from "zod";
import { useAppForm } from "@/components/form";

export const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignInValues = z.infer<typeof formSchema>;

const defaultValues: SignInValues = {
  email: "",
  password: "",
};

export const placeholderValues = {
  email: "tim.cook@apple.com",
  password: "••••••••",
};

export function useSignInForm(
  onSubmit: (data: SignInValues) => Promise<void> | void
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
