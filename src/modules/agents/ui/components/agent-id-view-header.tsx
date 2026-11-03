import Link from "next/link";
import { type ComponentProps, useCallback } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AGENTS_PAGE_PATH } from "@/constants";

type Props = {
  agentId: string;
  agentName: string;
};

/** Render the breadcrumb header for a single agent without any dead action menu items. */
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
    </div>
  );
}
