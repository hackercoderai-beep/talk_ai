type Props = {
  params: Promise<{ meetingId: string }>;
};

export async function MeetingPageContent({ params }: Props) {
  const { meetingId } = await params;

  return (
    <div className="px-6 py-4">
      <p>Meeting Page of {meetingId}</p>
    </div>
  );
}
