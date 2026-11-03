import { Suspense } from "react";
import { AgentLoadingView } from "@/components/helpers/agent-loading-view";
import { AgentIdView } from "@/modules/agents/ui/agents-id-view";

type Props = {
  params: Promise<{ agentId: string }>;
};

async function AgentWithIdContent(props: Props) {
  const { agentId } = await props.params;

  return <AgentIdView agentId={agentId} />;
}

export default function AgentWithIdPage(props: Props) {
  return (
    <Suspense fallback={<AgentLoadingView />}>
      <AgentWithIdContent params={props.params} />
    </Suspense>
  );
}
