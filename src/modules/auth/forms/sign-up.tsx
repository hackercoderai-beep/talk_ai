"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useCallback } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import {
  type AuthErrorLike,
  getAuthErrorMessage,
} from "@/constants/auth-errors";
import {
  placeholderValues,
  type SignUpValues,
  useSignUpForm,
} from "@/constants/schemas/form/sign-up";
import { authClient } from "@/lib/auth-client";

export function SignUpForm() {
  const router = useRouter();

  async function onSubmit(formData: SignUpValues) {
    try {
      await toast.promise(
        (async () => {
          const { data, error } = await authClient.signUp.email({
            callbackURL: "/dashboard",
            email: formData.email,
            name: formData.name,
            password: formData.password,
          });

          if (error) {
            throw error;
          }

          return data;
        })(),
        {
          error: (error: AuthErrorLike) => ({
            description: getAuthErrorMessage(error, "sign-up"),
            title: "Sign up failed",
          }),
          loading: {
            description: "Setting up your account",
            title: "Creating account...",
          },
          success: {
            description: "Welcome to Talk AI — taking you to your dashboard",
            title: "Account created",
          },
        }
      );

      router.push("/dashboard");
    } catch {
      // Error toast is already shown by toast.promise
    }
  }

  const form = useSignUpForm(onSubmit);
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      form.handleSubmit();
    },
    [form.handleSubmit]
  );

  return (
    <form className="min-h-lg max-w-lg space-y-4" onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>
          Please fill in your details to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="min-h-4xl bg-background">
          <form.AppField name="name">
            {(field) => (
              <field.Input label="Name" placeholder={placeholderValues.name} />
            )}
          </form.AppField>
          <form.AppField name="email">
            {(field) => (
              <field.Input
                label="Email"
                placeholder={placeholderValues.email}
                type="email"
              />
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <field.Input
                label="Password"
                placeholder={placeholderValues.password}
                type="password"
              />
            )}
          </form.AppField>
          <form.AppField name="confirmPassword">
            {(field) => (
              <field.Input
                label="Confirm Password"
                placeholder={placeholderValues.confirmPassword}
                type="password"
              />
            )}
          </form.AppField>

          <form.AppForm>
            <div className="flex w-full items-center justify-between gap-2">
              <form.SubmitButton
                className="w-full flex-1"
                submittingChildren="Signing up..."
              >
                Sign Up
              </form.SubmitButton>
            </div>
          </form.AppForm>
        </FieldGroup>
      </CardContent>
    </form>
  );
}
