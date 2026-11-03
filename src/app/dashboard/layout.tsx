import type { ReactNode } from "react";
import { Suspense } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { DashboardWelcomeProvider } from "@/modules/dashboard/ui/components/dashboard-welcome-context";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <DashboardWelcomeProvider>
      <SidebarProvider defaultOpen={false}>
        <Suspense
          fallback={
            <div
              aria-hidden="true"
              className="hidden h-screen w-(--sidebar-width) border-r bg-sidebar md:block"
            >
              <Skeleton className="h-full w-full rounded-none bg-sidebar-accent/50" />
            </div>
          }
        >
          <DashboardSidebar />
        </Suspense>
        <main className="flex h-screen w-screen flex-col bg-muted">
          <DashboardNavbar />
          {children}
        </main>
      </SidebarProvider>
    </DashboardWelcomeProvider>
  );
}
