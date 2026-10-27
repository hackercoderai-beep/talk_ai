import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AgentErrorView } from "@/components/helpers/agent-error-view";
import { AgentLoadingView } from "@/components/helpers/agent-loading-view";
import { AgentView } from "@/modules/agents/ui/agents-view";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import { getQueryClient, trpc } from "@/trpc/server";

export default async function AgentsPage() {
  const queryClient = getQueryClient();
  await queryClient.query(trpc.agents.getMany.queryOptions());
  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentLoadingView />}>
          <ErrorBoundary fallback={<AgentErrorView />}>
            <AgentView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
