"use client";

import { cn } from "cn";
import {
  BotIcon,
  type LucideIcon,
  StarIcon,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/user-button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

type actionList = {
  icon: LucideIcon;
  label: string;
  href: string;
};

const primaryActionList: actionList[] = [
  {
    href: "/dashboard/meetings",
    icon: VideoIcon,
    label: "Meetings",
  },
  {
    href: "/dashboard/agents",
    icon: BotIcon,
    label: "Agents",
  },
];

const secondaryActionList: actionList[] = [
  {
    href: "/upgrade",
    icon: StarIcon,
    label: "Upgrade",
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex w-full items-start justify-center">
        <Link className="flex items-center gap-2 px-2 pt-2" href="/">
          <Image
            alt="talk ai"
            className="size-9"
            height={36}
            src="logo.svg"
            width={36}
          />
          <p className="font-semibold text-2xl text-white group-data-[state=collapsed]:hidden">
            Talk AI
          </p>
        </Link>
      </SidebarHeader>
      <div className="py-2">
        <Separator />
      </div>
      <SidebarContent>
        {/* Primary Quick Actions List */}
        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryActionList.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    className={cn(
                      pathname === item.href ? "bg-sidebar-accent" : ""
                    )}
                    render={<Link href={item.href} />}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-4">
          <Separator />
        </div>

        {/* Secondary Action List */}
        <SidebarGroup>
          <SidebarGroupLabel>Recommended</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryActionList.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    className={cn(
                      pathname === item.href ? "bg-sidebar-accent" : ""
                    )}
                    render={<Link href={item.href} />}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <UserButton />
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
