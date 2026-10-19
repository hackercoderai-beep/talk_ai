"use client";

import {
  BookOpenCheckIcon,
  ChevronDownIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { type ReactNode, useCallback } from "react";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { useDashboardWelcome } from "@/modules/dashboard/ui/components/dashboard-welcome-context";

export function UserButton() {
  const router = useRouter();
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  const { setOpen } = useDashboardWelcome();
  const { data: session, isPending } = authClient.useSession();
  const handleShowOnboarding = useCallback(() => setOpen(true), [setOpen]);

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
    <UserMenu
      email={session.user.email}
      image={session.user.image}
      isCollapsed={state === "collapsed"}
      isMobile={isMobile}
      name={session.user.name}
      onShowOnboarding={handleShowOnboarding}
      onSignOut={handleSignOut}
    />
  );
}

type UserMenuProps = {
  email: string;
  image?: string | null;
  isCollapsed: boolean;
  name: string;
  onSignOut: () => Promise<void>;
  onShowOnboarding: () => void;
};

type UserIdentityProps = Pick<UserMenuProps, "image" | "name">;

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

function UserMenu({
  isMobile,
  ...props
}: UserMenuProps & { isMobile: boolean }) {
  return (
    <SidebarMenuItem className="w-full">
      {isMobile ? (
        <MobileUserMenu {...props} />
      ) : (
        <DesktopUserMenu {...props} />
      )}
    </SidebarMenuItem>
  );
}

function DesktopUserMenu({
  email,
  image,
  isCollapsed,
  name,
  onSignOut,
  onShowOnboarding,
}: UserMenuProps) {
  return (
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
        <UserButtonLabel image={image} name={name} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={isCollapsed ? "start" : "end"}
        className={isCollapsed ? "w-56" : undefined}
        side={isCollapsed ? "right" : "top"}
        sideOffset={isCollapsed ? 8 : 4}
      >
        <DesktopUserDetails email={email} name={name} />
        <DropdownMenuSeparator />
        <DesktopUserActions
          onShowOnboarding={onShowOnboarding}
          onSignOut={onSignOut}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DesktopUserDetails({
  email,
  name,
}: Pick<UserMenuProps, "email" | "name">) {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>
        <div className="flex flex-col">
          <span className="font-medium">{name}</span>
          <span className="text-muted-foreground text-xs">{email}</span>
        </div>
      </DropdownMenuLabel>
    </DropdownMenuGroup>
  );
}

function DesktopUserActions({
  onShowOnboarding,
  onSignOut,
}: Pick<UserMenuProps, "onShowOnboarding" | "onSignOut">) {
  return (
    <DropdownMenuGroup className="space-y-2">
      <DropdownMenuItem onClick={onShowOnboarding}>
        <BookOpenCheckIcon />
        Onboarding
      </DropdownMenuItem>
      <DropdownMenuItem>
        <CreditCardIcon />
        Billing
      </DropdownMenuItem>
      <DropdownMenuItem onClick={onSignOut} variant="destructive">
        <LogOutIcon />
        Sign out
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}

function MobileUserMenu({
  email,
  image,
  name,
  onSignOut,
  onShowOnboarding,
}: UserMenuProps) {
  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger
        render={
          <SidebarMenuButton
            className="w-full justify-between"
            size="lg"
            style={{ paddingInline: "1rem" }}
          />
        }
      >
        <UserButtonLabel image={image} name={name} />
      </DrawerTrigger>
      <DrawerContent>
        <MobileUserDetails email={email} image={image} name={name} />
        <MobileUserActions
          onShowOnboarding={onShowOnboarding}
          onSignOut={onSignOut}
        />
      </DrawerContent>
    </Drawer>
  );
}

function MobileUserDetails({
  email,
  image,
  name,
}: Pick<UserMenuProps, "email" | "image" | "name">) {
  return (
    <DrawerHeader className="flex-row items-center gap-3 p-6 pb-4 text-left">
      <UserAvatar className="size-8" image={image} name={name} />
      <div className="min-w-0">
        <DrawerTitle className="truncate">{name}</DrawerTitle>
        <DrawerDescription className="truncate">{email}</DrawerDescription>
      </div>
    </DrawerHeader>
  );
}

function MobileUserActions({
  onShowOnboarding,
  onSignOut,
}: Pick<UserMenuProps, "onShowOnboarding" | "onSignOut">) {
  return (
    <>
      <div className="flex flex-col gap-2 p-4">
        <DrawerAction
          icon={<BookOpenCheckIcon />}
          label="Onboarding"
          onClick={onShowOnboarding}
        />
        <DrawerAction icon={<CreditCardIcon />} label="Billing" />
      </div>
      <DrawerFooter>
        <DrawerAction
          icon={<LogOutIcon />}
          label="Sign out"
          onClick={onSignOut}
          variant="destructive"
        />
      </DrawerFooter>
    </>
  );
}

function DrawerAction({
  icon,
  label,
  onClick,
  variant = "ghost",
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void | Promise<void>;
  variant?: "ghost" | "destructive";
}) {
  return (
    <DrawerClose
      render={
        <Button
          className="h-12 w-full justify-start"
          onClick={onClick}
          variant={variant}
        />
      }
    >
      {icon}
      {label}
    </DrawerClose>
  );
}

function UserButtonLabel({ image, name }: UserIdentityProps) {
  return (
    <>
      <UserAvatar image={image} name={name} />
      <span className="flex-1 truncate text-left group-data-[collapsible=icon]:hidden">
        {name}
      </span>
      <div className="flex items-center justify-end text-muted-foreground">
        <ChevronDownIcon className="size-5" />
      </div>
    </>
  );
}

type UserAvatarProps = UserIdentityProps & {
  className?: string;
};

function UserAvatar({ image, name, className }: UserAvatarProps) {
  if (!image) {
    return (
      <GeneratedAvatar
        className={className ?? "mr-3 size-6"}
        seed={name}
        variant="botttsNeutral"
      />
    );
  }

  return (
    <Avatar className={className}>
      <AvatarImage alt={name} src={image} />
      <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
