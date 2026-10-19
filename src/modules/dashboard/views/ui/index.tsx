"use client";

import type { auth } from "@/lib/auth";
import { DashboardWelcomeDialog } from "@/modules/dashboard/ui/components/dashboard-welcome-dialog";

type DashboardSession = typeof auth.$Infer.Session;

export default function DashboardView({
  session,
  showWelcome,
}: {
  session: DashboardSession;
  showWelcome: boolean;
}) {
  return (
    <>
      <DashboardWelcomeDialog
        initiallyOpen={showWelcome}
        userId={session.user.id}
        userName={session.user.name}
      />
      <main className="min-h-screen bg-background">
        <div className="mx-auto w-full px-6">
          <section className="space-y-6 py-16">
            <h1 className="font-semibold text-3xl tracking-tight">
              Welcome, {session.user.name}
            </h1>
          </section>
        </div>
      </main>
    </>
  );
}
