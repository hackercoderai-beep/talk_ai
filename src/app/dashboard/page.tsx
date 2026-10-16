import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { authenticated } from "@/hooks/use-authenticated";
import DashboardView from "@/modules/home/views/ui/dashboard";

async function AuthenticatedDashboard() {
  await authenticated();
  return <DashboardView />;
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
