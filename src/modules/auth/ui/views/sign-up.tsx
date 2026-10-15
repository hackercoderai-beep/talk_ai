"use client";

import Link from "next/link";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { SignUpForm } from "@/modules/auth/forms/sign-up";

export function SignUpView() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0 min-w-xl min-h-xl">
        <CardContent className="grid md:grid-cols-2 p-0">
          <div className="md:col-span-1 py-4 px-0">
            <SignUpForm />
          </div>
          <div className="bg-linear-to-br from-emerald-600 to-emerald-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <img src="/logo.svg" alt="Logo" className="h-[100px] w-[100px] object-contain drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]" />
            <p className="text-2xl font-semibold text-white drop-shadow-lg">
              Talk AI
            </p>
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium underline underline-offset-4 hover:text-foreground">
          Sign in
        </Link>
      </p>
    </div>
  );
}
