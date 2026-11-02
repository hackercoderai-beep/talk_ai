import { SearchIcon } from "lucide-react";
import { type ChangeEvent, useCallback } from "react";

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";

import { DEFAULT_PAGE } from "@/constants";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";

export function AgentsSearchFilter() {
  const [filter, setFilter] = useAgentsFilters();
  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFilter({ search: event.target.value, page: DEFAULT_PAGE });
    },
    [setFilter]
  );

  return (
    <div>
      <InputGroup>
        <InputGroupInput
          placeholder="Filter by name"
          className="h-9 bg-background w-[200px] pl-7"
          value={filter.search}
          onChange={handleSearchChange}
        />
        <InputGroupAddon align="inline-end">
          <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
