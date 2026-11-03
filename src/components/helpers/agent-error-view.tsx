import { OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  agentName?: string;
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export function AgentErrorView({
  agentName,
  title = "Failed to load the information.",
  description = agentName
    ? `Error loading information for Agent ${agentName}`
    : "Error loading information",
  onRetry,
}: Props) {
  return (
    <div className="flex flex-1 items-center justify-center px-8 py-4">
      <div className="flex flex-col items-center justify-center gap-y-6 rounded-lg bg-background p-10 shadow-sm">
        <OctagonAlertIcon className="text-destructive" />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="font-medium text-lg">{title}</h6>
          <p className="text-sm">{description}</p>
        </div>
        {onRetry ? (
          <Button onClick={onRetry} variant="outline">
            Try again
          </Button>
        ) : null}
      </div>
    </div>
  );
}
