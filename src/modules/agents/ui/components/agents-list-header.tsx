"use client";

import { PlusIcon, XCircleIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";
import { AgentsSearchFilter } from "@/modules/agents/ui/components/agents-search-filter";
import { DEFAULT_PAGE } from "@/constants";

export function AgentsListHeader() {
  const [filters, setFilters] = useAgentsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = useCallback(() => setIsDialogOpen(true), []);

  const isAnyFilterModified = !!filters.search;

  function onClearFIlters() {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  }

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
        <div className="flex items-center gap-x-2 p-1">
          <AgentsSearchFilter />
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={onClearFIlters}
            disabled={!isAnyFilterModified}
          >
            <XCircleIcon />
            Clear
          </Button>
        </div>
      </div>
    </>
  );
}
