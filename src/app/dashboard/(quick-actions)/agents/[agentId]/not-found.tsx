import { AgentErrorView } from "@/components/helpers/agent-error-view";

export default function AgentNotFound() {
  return (
    <AgentErrorView
      description="This agent may have been deleted or you may not have access."
      title="Agent not found"
    />
  );
}
