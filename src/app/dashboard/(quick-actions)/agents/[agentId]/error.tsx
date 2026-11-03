"use client";

import { useEffect } from "react";
import { AgentErrorView } from "@/components/helpers/agent-error-view";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AgentDetailError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <AgentErrorView onRetry={reset} />;
}
