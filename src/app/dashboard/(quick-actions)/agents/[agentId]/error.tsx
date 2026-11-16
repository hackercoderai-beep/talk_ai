"use client";

import { useEffect } from "react";
import { ErrorView } from "@/components/helpers/error-view";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AgentDetailError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorView onRetry={reset} />;
}
