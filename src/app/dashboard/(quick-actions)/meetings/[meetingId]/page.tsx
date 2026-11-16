import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { MeetingPageContent } from "@/modules/meetings/ui/views/meeting-id-view";

type Props = {
  params: Promise<{ meetingId: string }>;
};

export default function MeetingPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <MeetingPageContent params={params} />
    </Suspense>
  );
}
