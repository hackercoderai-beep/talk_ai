"use client";

import { Card, CardContent } from "@/components/ui/card";

export function SignInView() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0 min-w-md">
        <CardContent className="grid md:grid-cols-2 p-0">
          <form>Col 1</form>
          <div className="bg-radial from-emerald-700 bg-emerald-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <img src="/logo.png" alt="Logo" className="h-[100px] w-[100px] object-contain" />
            <p className="text-2xl font-semibold text-white">
              Talk AI
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
