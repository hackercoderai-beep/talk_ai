import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { authenticated } from "@/hooks/use-authenticated";
import DashboardView from "@/modules/dashboard/views/ui";

async function AuthenticatedDashboard({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string | string[] }>;
}) {
  const [session, params] = await Promise.all([authenticated(), searchParams]);
  return (
    <DashboardView session={session} showWelcome={params.welcome === "1"} />
  );
}

export default function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string | string[] }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-background">
          <Spinner />
        </main>
      }
    >
      <AuthenticatedDashboard searchParams={searchParams} />
    </Suspense>
  );
}
