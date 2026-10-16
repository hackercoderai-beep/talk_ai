"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useCallback, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import {
  type AuthErrorLike,
  getAuthErrorMessage,
} from "@/constants/auth-errors";
import {
  placeholderValues,
  type SignInValues,
  useSignInForm,
} from "@/constants/schemas/form/sign-in";
import { authClient } from "@/lib/auth-client";

export function SignInForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const onSocial = useCallback(async (provider: "github" | "google") => {
    setIsPending(true);

    try {
      await toast.promise(
        (async () => {
          const { data, error } = await authClient.signIn.social({
            callbackURL: "/dashboard",
            provider,
          });

          if (error) {
            throw error;
          }

          return data;
        })(),
        {
          error: (error: AuthErrorLike) => ({
            description: getAuthErrorMessage(error, "sign-in"),
            title: "Sign in failed",
          }),
          loading: {
            description: "Redirecting to your provider",
            title: "Signing in...",
          },
          success: {
            description: "Continue with your provider to finish signing in",
            title: "Redirecting...",
          },
        }
      );
    } catch {
      // Error toast is already shown by toast.promise
      setIsPending(false);
    }
  }, []);
  const handleGoogleSignIn = useCallback(() => onSocial("google"), [onSocial]);
  const handleGitHubSignIn = useCallback(() => onSocial("github"), [onSocial]);

  async function onSubmit(formData: SignInValues) {
    try {
      await toast.promise(
        (async () => {
          const { data, error } = await authClient.signIn.email({
            callbackURL: "/dashboard",
            email: formData.email,
            password: formData.password,
            rememberMe: false,
          });

          if (error) {
            throw error;
          }

          return data;
        })(),
        {
          error: (error: AuthErrorLike) => ({
            description: getAuthErrorMessage(error, "sign-in"),
            title: "Sign in failed",
          }),
          loading: {
            description: "Verifying your credentials",
            title: "Signing in...",
          },
          success: {
            description: "You are now signed in — taking you to your dashboard",
            title: "Welcome back",
          },
        }
      );

      router.push("/dashboard");
    } catch {
      // Error toast is already shown by toast.promise
    }
  }

  const form = useSignInForm(onSubmit);
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
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Login to continue</CardDescription>
      </CardHeader>

      <CardContent>
        <FieldGroup className="min-h-4xl bg-background">
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

          <form.AppForm>
            <div className="flex w-full items-center justify-between gap-2">
              <form.SubmitButton
                className="w-full flex-1"
                submittingChildren="Signing in..."
              >
                Sign In
              </form.SubmitButton>
            </div>
          </form.AppForm>
        </FieldGroup>

        <Divider />

        <div className="flex w-full items-center justify-center gap-2">
          <Button
            aria-label="Continue with Google"
            className="flex-1"
            disabled={isPending}
            onClick={handleGoogleSignIn}
            type="button"
            variant="outline"
          >
            <FaGoogle className="size-3" />
          </Button>
          <Button
            aria-label="Continue with GitHub"
            className="flex-1"
            disabled={isPending}
            onClick={handleGitHubSignIn}
            type="button"
            variant="outline"
          >
            <FaGithub />
          </Button>
        </div>

        <p className="my-4 text-center text-muted-foreground text-sm">
          Don&apos;t have an account?{" "}
          <Link
            className="font-medium underline underline-offset-4 hover:text-foreground"
            href="/sign-up"
          >
            Create an account
          </Link>
        </p>
      </CardContent>
    </form>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 overflow-hidden">
      <Separator />
      <p className="shrink-0 text-muted-foreground">Or continue with</p>
      <Separator />
    </div>
  );
}
