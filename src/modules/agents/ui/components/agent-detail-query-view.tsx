/** biome-ignore-all lint/performance/noJsxPropsBind: temporary could me ignored */
"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
  AGENT_DETAIL_GC_TIME,
  AGENT_DETAIL_STALE_TIME,
} from "@/modules/agents/constants";
import { AgentIdViewHeader } from "@/modules/agents/ui/components/agent-id-view-header";
import { useTRPC } from "@/trpc/client";

type Props = {
  agentId: string;
};

/** Render the detail panel for an agent while preserving the query cache and loading state. */
export function AgentDetailQueryView(props: Props) {
  const trpc = useTRPC();
  const { data: agent } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions(
      { id: props.agentId },
      {
        gcTime: AGENT_DETAIL_GC_TIME,
        staleTime: AGENT_DETAIL_STALE_TIME,
      }
    )
  );

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
      <AgentIdViewHeader agentId={props.agentId} agentName={agent.name} />
      <div className="rounded-lg border bg-background">
        <div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar
              className="size-10 rounded-full"
              seed={agent.name}
              variant="botttsNeutral"
            />
            <h2 className="font-semibold text-2xl">{agent.name}</h2>
          </div>

          <div className="flex flex-col gap-y-4">
            <p className="font-semibold text-lg">Instructions</p>
            <p className="whitespace-pre-wrap">{agent.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
