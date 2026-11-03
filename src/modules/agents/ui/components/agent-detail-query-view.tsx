/** biome-ignore-all lint/performance/noJsxPropsBind: temporary could me ignored */
"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { VideoIcon } from "lucide-react";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import {
  AGENT_DETAIL_GC_TIME,
  AGENT_DETAIL_STALE_TIME,
} from "@/modules/agents/constants";
import { AgentIdViewHeader } from "@/modules/agents/ui/components/agent-id-view-header";
import { useTRPC } from "@/trpc/client";

type Props = {
  agentId: string;
};

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
  const agentHasMultipleMeetings = agent.meetingCount > 1;

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
      <AgentIdViewHeader
        agentId={props.agentId}
        agentName={agent.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />
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

          <Badge
            className="4 flex items-center gap-x-2"
            variant="primary-outline"
          >
            <VideoIcon className="size-4" />
            {agent.meetingCount}{" "}
            {agentHasMultipleMeetings ? "meetings" : "meeting"}
          </Badge>

          <div className="flex flex-col gap-y-4">
            <p className="font-semibold text-lg">Instructions</p>
            <p>{agent.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
