"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { EmptyAgentsList } from "@/components/helpers/empty-agents-view";
import { columns } from "@/modules/agents/ui/components/columns";
import { DataTable } from "@/modules/agents/ui/components/data-table";
import { useTRPC } from "@/trpc/client";

export function AgentView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="p-6">
      <DataTable columns={columns} data={data} />
      {data.length === 0 ? (
        <EmptyAgentsList
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
          title="Create your first agent"
        />
      ) : null}
    </div>
  );
}
