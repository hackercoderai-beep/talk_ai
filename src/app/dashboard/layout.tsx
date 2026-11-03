import type { ReactNode } from "react";
import { Suspense } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
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
        <Suspense fallback={null}>
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
