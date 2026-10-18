"use client";

import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";

export function UserButton() {
  const router = useRouter();
  const { state } = useSidebar();
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = useCallback(async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          toast.add({
            title: "Signed out successfully",
            type: "success",
          });
        },
      },
    });
  }, [router]);

  if (isPending) {
    return <UserButtonSkeleton />;
  }

  if (session === null) {
    return null;
  }

  return (
    <UserDropdown
      email={session.user.email}
      image={session.user.image}
      isCollapsed={state === "collapsed"}
      name={session.user.name}
      onSignOut={handleSignOut}
    />
  );
}

function UserButtonSkeleton() {
  return (
    <SidebarMenuButton
      aria-hidden="true"
      className="w-full justify-between"
      disabled
      size="lg"
      style={{ paddingInline: "1rem" }}
    >
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <Skeleton className="h-4 flex-1 group-data-[collapsible=icon]:hidden" />
      <Skeleton className="size-5 group-data-[collapsible=icon]:hidden" />
    </SidebarMenuButton>
  );
}

type UserDropdownProps = {
  email: string;
  image?: string | null;
  isCollapsed: boolean;
  name: string;
  onSignOut: () => Promise<void>;
};

function UserDropdown({
  email,
  image,
  isCollapsed,
  name,
  onSignOut,
}: UserDropdownProps) {
  return (
    <SidebarMenuItem className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <SidebarMenuButton
              className="w-full justify-between"
              size="lg"
              style={{ paddingInline: "1rem" }}
            />
          }
        >
          <UserAvatar image={image} name={name} />
          <span className="flex-1 truncate text-left group-data-[collapsible=icon]:hidden">
            {name}
          </span>
          <div className="flex items-center justify-end text-muted-foreground">
            <ChevronDownIcon className="size-5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={isCollapsed ? "start" : "end"}
          className={isCollapsed ? "w-56" : undefined}
          side={isCollapsed ? "right" : "top"}
          sideOffset={isCollapsed ? 8 : 4}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{name}</span>
                <span className="text-muted-foreground text-xs">{email}</span>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="space-y-2">
            <DropdownMenuItem>
              <CreditCardIcon />
              Billing
            </DropdownMenuItem>
            {/* <Separator /> */}
            <DropdownMenuItem onClick={onSignOut} variant="destructive">
              <LogOutIcon />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}

function UserAvatar({
  image,
  name,
}: Pick<UserDropdownProps, "image" | "name">) {
  if (!image) {
    return (
      <GeneratedAvatar
        className="mr-3 size-6"
        seed={name}
        variant="botttsNeutral"
      />
    );
  }

  return (
    <Avatar>
      <AvatarImage alt={name} src={image} />
      <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
