import { ErrorView } from "@/components/helpers/error-view";

export default function AgentNotFound() {
  return (
    <ErrorView
      description="This agent may have been deleted or you may not have access."
      title="Agent not found"
    />
  );
}
