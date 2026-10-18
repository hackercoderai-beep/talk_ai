import { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

type Props = {
  children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return <SidebarProvider>
    <DashboardSidebar />
    <main className="flex flex-col h-screen w-screen bg-muted">
      {children}
    </main>
  </SidebarProvider>
}
