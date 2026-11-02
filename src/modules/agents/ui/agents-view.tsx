"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { EmptyAgentsList } from "@/components/helpers/empty-agents-view";
import { columns } from "@/modules/agents/ui/components/columns";
import { DataTable } from "@/modules/agents/ui/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";
import { DataPagination } from "@/modules/agents/ui/components/agents-table-pagination";

export function AgentView() {
  const [filters, setFilters] = useAgentsFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    }),
  );

  return (
    <div className="p-6">
      <DataTable columns={columns} data={data.items} />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
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
