"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function AgentView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  const displayData = JSON.stringify(data);

  return (
    <div className="p-6">
      <p className="max-w-prose">{displayData}</p>
    </div>
  );
}
