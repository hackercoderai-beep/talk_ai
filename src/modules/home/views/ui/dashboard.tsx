"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

type DashboardSession = typeof auth.$Infer.Session;

export default function DashboardView({
  session,
}: {
  session: DashboardSession;
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-4xl px-6">
        <header className="flex h-16 items-center justify-between border-b">
          <span className="font-semibold text-sm">Talk AI</span>
          <Button onClick={handleSignOut} size="sm" variant="ghost">
            Sign out
          </Button>
        </header>

        <section className="py-16">
          <h1 className="font-semibold text-3xl tracking-tight">
            Welcome, {session.user.name}
          </h1>
        </section>
      </div>
    </main>
  );
}
