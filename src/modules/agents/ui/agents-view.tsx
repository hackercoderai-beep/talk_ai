"use client";

import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { EmptyAgentsList } from "@/components/helpers/empty-agents-view";
import {
  AGENT_DETAIL_GC_TIME,
  AGENT_DETAIL_STALE_TIME,
} from "@/modules/agents/constants";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";
import type { AgentType } from "@/modules/agents/types";
import { columns } from "@/modules/agents/ui/components/columns";
import { DataTable } from "@/modules/agents/ui/components/data-table";
import { DataPagination } from "@/modules/agents/ui/components/table-pagination";
import { useTRPC } from "@/trpc/client";

export function AgentView() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useAgentsFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );
  const handleAgentClick = useCallback(
    (agent: AgentType) => {
      const agentQueryOptions = trpc.agents.getOne.queryOptions(
        { id: agent.id },
        {
          gcTime: AGENT_DETAIL_GC_TIME,
          staleTime: AGENT_DETAIL_STALE_TIME,
        }
      );
      queryClient.setQueryData(agentQueryOptions.queryKey, agent);
      router.push(`/dashboard/agents/${agent.id}`);
    },
    [queryClient, router, trpc]
  );
  const handlePageChange = useCallback(
    (page: number) => setFilters({ page }),
    [setFilters]
  );

  return (
    <div className="p-6">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={handleAgentClick}
      />
      <DataPagination
        onPageChange={handlePageChange}
        page={filters.page}
        totalPages={data.totalPages}
      />
      {data.items.length === 0 ? (
        <EmptyAgentsList
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
          title="Create your first agent"
        />
      ) : null}
    </div>
  );
}
