"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function AgentView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="p-6">
      <p
        className={
          "wrap-break-word whitespace-pre-wrap font-mono text-muted-foreground text-sm leading-relaxed"
        }
      >
        {JSON.stringify(data, null, 2)}
      </p>
    </div>
  );
}
