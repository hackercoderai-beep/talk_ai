import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorView } from "@/components/helpers/error-view";
import { LoadingView } from "@/components/helpers/loading-view";
import { loadSearchParams } from "@/modules/agents/params";
import { AgentView } from "@/modules/agents/ui/views/agents-view";
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
        <Suspense fallback={<LoadingView />}>
          <ErrorBoundary fallback={<ErrorView />}>
            <AgentView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}

export default function AgentsPage(props: Props) {
  return (
    <Suspense fallback={<LoadingView />}>
      <AgentsPageContent searchParams={props.searchParams} />
    </Suspense>
  );
}
