import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import DashboardView from "@/modules/dashboard/views/ui";

async function AuthenticatedDashboard() {
  return <DashboardView />;
}

export default async function DashboardPage() {
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
