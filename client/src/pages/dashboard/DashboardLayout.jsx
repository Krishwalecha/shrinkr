import * as React from "react";

import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useTheme } from "@/context/ThemeContext";
import { PortalProvider } from "@/context/PortalContext";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const { resolvedTheme } = useTheme();
  const [container, setContainer] = React.useState(null);

  return (
    <div
      ref={setContainer}
      className={
        resolvedTheme === "dark"
          ? "dark min-h-svh bg-background text-foreground"
          : "min-h-svh bg-background text-foreground"
      }
    >
      <PortalProvider value={container}>
        <SidebarProvider
          style={{
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          }}
        >
          <AppSidebar variant="inset" />

          <SidebarInset>
            <SiteHeader />

            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <Outlet />
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </PortalProvider>
    </div>
  );
}
