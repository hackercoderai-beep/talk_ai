"use client";

import { useCallback } from "react";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { AgentForm } from "@/modules/agents/ui/components/agent-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NewAgentDialog(props: Props) {
  const handleClose = useCallback(
    () => props.onOpenChange(false),
    [props.onOpenChange]
  );

  return (
    <ResponsiveDialog
      description="Give your agent a name and instructions. Its avatar updates as you type."
      onOpenChange={props.onOpenChange}
      open={props.open}
      title="Create an agent"
    >
      <AgentForm onCancel={handleClose} onSuccess={handleClose} />
    </ResponsiveDialog>
  );
}
