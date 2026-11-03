"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { AgentErrorView } from "@/components/helpers/agent-error-view";
import { AgentLoadingView } from "@/components/helpers/agent-loading-view";

type Props = {
  agentId: string;
};

const ClientOnlyAgentQuery = dynamic(
  () =>
    import("@/modules/agents/ui/components/agent-detail-query-view").then(
      (module) => module.AgentDetailQueryView
    ),
  {
    loading: () => <AgentLoadingView />,
    ssr: false,
  }
);

function AgentDetailErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return <AgentErrorView onRetry={resetErrorBoundary} />;
}

export function AgentIdView({ agentId }: Props) {
  return (
    <ErrorBoundary FallbackComponent={AgentDetailErrorFallback}>
      <Suspense fallback={<AgentLoadingView />}>
        <ClientOnlyAgentQuery agentId={agentId} />
      </Suspense>
    </ErrorBoundary>
  );
}
