import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { connection } from "next/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  MeetingsErrorView,
  MeetingsLoadingView,
  MeetingsView,
} from "@/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";

async function MeetingsPageContent() {
  await connection();

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsLoadingView />}>
        <ErrorBoundary fallback={<MeetingsErrorView />}>
          <MeetingsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}

export default function MeetingsPage() {
  return (
    <Suspense fallback={<MeetingsLoadingView />}>
      <MeetingsPageContent />
    </Suspense>
  );
}
