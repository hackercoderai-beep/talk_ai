import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AgentErrorView } from "@/components/helpers/agent-error-view";
import { AgentLoadingView } from "@/components/helpers/agent-loading-view";
import { loadSearchParams } from "@/modules/agents/params";
import { AgentView } from "@/modules/agents/ui/agents-view";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import { getQueryClient, trpc } from "@/trpc/server";

type Props = {
  searchParams: Promise<SearchParams>;
};

async function AgentsPageContent(props: Props) {
  const filters = await loadSearchParams(props.searchParams);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    }),
  );

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

export default function AgentsPage(props: Props) {
  return (
    <Suspense fallback={<AgentLoadingView />}>
      <AgentsPageContent searchParams={props.searchParams} />
    </Suspense>
  );
}
