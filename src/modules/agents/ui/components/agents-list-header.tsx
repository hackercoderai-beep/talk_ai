"use client";

import { PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

export function AgentsListHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = useCallback(() => setIsDialogOpen(true), []);

  return (
    <>
      <NewAgentDialog onOpenChange={setIsDialogOpen} open={isDialogOpen} />
      <div className="flex flex-col gap-y-4 p-4 md:px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl">My Agents</h2>
          <Button onClick={handleOpenDialog}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
      </div>
    </>
  );
}
