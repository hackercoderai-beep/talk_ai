"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { SignInForm } from "@/modules/auth/forms/sign-in";

export function SignInView() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="min-h-xl min-w-xl overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="px-0 py-4 md:col-span-1">
            <SignInForm />
          </div>
          <div
            className={
              "relative hidden flex-col items-center justify-center gap-y-4 bg-linear-to-br from-emerald-600 to-emerald-900 md:flex"
            }
          >
            <Image
              alt="Logo"
              className={
                "object-contain drop-shadow [0_0_20px_rgba(16,185,129,0.4)]"
              }
              height={100}
              src="/logo.svg"
              width={100}
            />
            <p className="font-semibold text-2xl text-white drop-shadow-lg">
              Talk AI
            </p>
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-muted-foreground text-xs">
        By clicking continue, you agree to our{" "}
        <a
          className="font-medium underline underline-offset-4 hover:text-foreground"
          href="/terms"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          className="font-medium underline underline-offset-4 hover:text-foreground"
          href="/privacy"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
