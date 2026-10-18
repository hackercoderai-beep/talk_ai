import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { authenticated } from "@/hooks/use-authenticated";
import DashboardView from "@/modules/dashboard/views/ui";

async function AuthenticatedDashboard() {
  const session = await authenticated();
  return <DashboardView session={session} />;
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-background">
          <Spinner />
        </main>
      }
    >
      <AuthenticatedDashboard />
    </Suspense>
  );
}
