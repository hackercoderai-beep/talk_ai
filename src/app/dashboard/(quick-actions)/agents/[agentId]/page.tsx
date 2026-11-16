import { Suspense } from "react";
import { LoadingView } from "@/components/helpers/loading-view";
import { AgentIdView } from "@/modules/agents/ui/views/agents-id-view";

type Props = {
  params: Promise<{ agentId: string }>;
};

async function AgentWithIdContent(props: Props) {
  const { agentId } = await props.params;

  return <AgentIdView agentId={agentId} />;
}

export default function AgentWithIdPage(props: Props) {
  return (
    <Suspense fallback={<LoadingView />}>
      <AgentWithIdContent params={props.params} />
    </Suspense>
  );
}
