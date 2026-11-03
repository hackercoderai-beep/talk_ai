"use client";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { TRPCClientError } from "@trpc/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import AgentNotFound from "@/app/dashboard/(quick-actions)/agents/[agentId]/not-found";
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

/** Present a recovery path for transient failures and redirect unauthorized users back to sign in. */
function AgentDetailErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const router = useRouter();
  const errorCode = (() => {
    if (error instanceof TRPCClientError) {
      return error.data?.code;
    }

    const errorRecord = error as { data?: { code?: string } } | undefined;

    if (
      errorRecord &&
      typeof errorRecord === "object" &&
      "data" in errorRecord &&
      errorRecord.data &&
      typeof errorRecord.data === "object" &&
      "code" in errorRecord.data &&
      typeof errorRecord.data.code === "string"
    ) {
      return errorRecord.data.code;
    }
  })();

  useEffect(() => {
    if (errorCode === "UNAUTHORIZED") {
      router.replace("/sign-in");
    }
  }, [errorCode, router]);

  if (errorCode === "NOT_FOUND") {
    return <AgentNotFound />;
  }

  if (errorCode === "UNAUTHORIZED") {
    return null;
  }

  return <AgentErrorView onRetry={resetErrorBoundary} />;
}

export function AgentIdView({ agentId }: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          FallbackComponent={AgentDetailErrorFallback}
          onReset={reset}
        >
          <Suspense fallback={<AgentLoadingView />}>
            <ClientOnlyAgentQuery agentId={agentId} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
