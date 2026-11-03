import { MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { type ComponentProps, useCallback } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AGENTS_PAGE_PATH } from "@/constants";

type Props = {
  agentId: string;
  agentName: string;
  onEdit: () => void;
  onRemove: () => void;
};

export function AgentIdViewHeader(props: Props) {
  const renderAgentsLink = useCallback(
    (linkProps: ComponentProps<"a">) => (
      <Link href={AGENTS_PAGE_PATH} {...linkProps}>
        My Agents
      </Link>
    ),
    []
  );

  return (
    <div className="flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center gap-x-2">
          <BreadcrumbItem>
            <BreadcrumbLink
              className="font-medium text-xl"
              render={renderAgentsLink}
            />
          </BreadcrumbItem>
          <BreadcrumbSeparator className="size-xl font-medium" />
          <BreadcrumbItem>
            <span className="font-medium text-xl">{props.agentName}</span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger render={<Button size="icon" variant="ghost" />}>
          <MoreVerticalIcon aria-hidden="true" className="size-5" />
          <span className="sr-only">Agent actions</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={props.onEdit}>
            <PencilIcon className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={props.onRemove} variant="destructive">
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
