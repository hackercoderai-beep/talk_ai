"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorView } from "@/components/helpers/error-view";
import { LoadingView } from "@/components/helpers/loading-view";
import { useTRPC } from "@/trpc/client";

export function MeetingsView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div className="w-full min-w-0 max-w-full space-y-10 p-6">
      <p className="font-semibold text-xl">Meetings List</p>
      <pre className="max-w-full overflow-x-auto">
        {JSON.stringify(data?.items, null, 2)}
      </pre>
    </div>
  );
}

export function MeetingsLoadingView() {
  return <LoadingView />;
}

export function MeetingsErrorView() {
  return (
    <ErrorView
      description="Please try again later."
      title="Failed to load meetings"
    />
  );
}
