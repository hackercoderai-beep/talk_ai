"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { SignUpForm } from "@/modules/auth/forms/sign-up";

export function SignUpView() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="min-h-xl min-w-xl overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="px-0 py-4 md:col-span-1">
            <SignUpForm />
          </div>
          <div className="relative hidden flex-col items-center justify-center gap-y-4 bg-linear-to-br from-emerald-600 to-emerald-900 md:flex">
            <Image
              alt="Logo"
              className="h-25 w-25 object-contain drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]"
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
      <p className="text-center text-muted-foreground text-sm">
        Already have an account?{" "}
        <Link
          className="font-medium underline underline-offset-4 hover:text-foreground"
          href="/sign-in"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
