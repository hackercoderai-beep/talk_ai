"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import type { AgentType } from "@/modules/agents/types";
import type { DataTableFeatures } from "@/modules/agents/ui/components/data-table-features";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, AgentType>();

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-4">
          <GeneratedAvatar
            className="size-6"
            seed={row.original.name}
            variant="botttsNeutral"
          />
          <span className="font-semibold capitalize">{row.original.name}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="size-4 text-muted-foreground" />
            <span className="max-w-[250px] truncate text-muted-foreground text-sm capitalize">
              {row.original.instructions}
            </span>
          </div>
        </div>
      </div>
    ),
    header: "Agent Name",
  }),
  columnHelper.display({
    cell: () => (
      <Badge variant={"outline"}>
        <VideoIcon className="" />
        {"5 meetings"}
      </Badge>
    ),
    header: "Meetings",
    id: "meetingCount",
  }),
]);
