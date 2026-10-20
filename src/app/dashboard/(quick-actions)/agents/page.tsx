import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AgentErrorView } from "@/components/helpers/agent-error-view";
import { AgentLoadingView } from "@/components/helpers/agent-loading-view";
import { AgentView } from "@/modules/agents/ui/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";

export default function AgentsPage() {
  return (
    <ErrorBoundary
      fallback={
        <AgentErrorView
          description="Failed to load agent information."
          title="Error Loading Agents"
        />
      }
    >
      <Suspense
        fallback={
          <main className="flex min-h-screen items-center justify-center bg-background">
            <AgentLoadingView
              description="Please wait while we load the agent information."
              title="Loading Agents"
            />
          </main>
        }
      >
        <AgentsContent />
      </Suspense>
    </ErrorBoundary>
  );
}

async function AgentsContent() {
  const queryClient = getQueryClient();
  await queryClient.query(trpc.agents.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AgentView />
    </HydrationBoundary>
  );
}
