"use client";

import type { auth } from "@/lib/auth";

type DashboardSession = typeof auth.$Infer.Session;

export default function DashboardView({
  session,
}: {
  session: DashboardSession;
}) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full px-6">
        <section className="space-y-6 py-16">
          <h1 className="font-semibold text-3xl tracking-tight">
            Welcome, {session.user.name}
          </h1>
        </section>
      </div>
    </main>
  );
}
