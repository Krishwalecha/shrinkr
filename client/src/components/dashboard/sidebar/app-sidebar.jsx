import * as React from "react";

import { NavMain } from "@/components/dashboard/sidebar/nav-main";
import { NavSecondary } from "@/components/dashboard/sidebar/nav-secondary";
import { NavUser } from "@/components/dashboard/sidebar/nav-user";
import { SidebarThemeToggle } from "@/components/dashboard/sidebar/theme-toggle";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  Settings2Icon,
  MailIcon,
  CirclePlusIcon,
} from "lucide-react";

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/dashboard/overview",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Create New",
      url: "/dashboard/create",
      icon: <CirclePlusIcon />,
    },
    {
      title: "History",
      url: "/dashboard/history",
      icon: <ListIcon />,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: <ChartBarIcon />,
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <Settings2Icon />,
    },
    {
      title: "hello@shrinkr.link",
      url: "mailto:hello@shrinkr.link",
      icon: <MailIcon />,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props} className="border-sidebar-border">
      <SidebarHeader className="h-(--header-height) justify-center border-b border-sidebar-border px-2 py-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-11 px-3 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <a href="/">
                <span className="text-xl font-semibold tracking-tight text-foreground group-data-[collapsible=icon]:hidden">
                  shrinkr.
                </span>

                <span className="hidden text-xl font-semibold tracking-tight text-foreground group-data-[collapsible=icon]:block">
                  s.
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarThemeToggle />

        <SidebarSeparator className="my-1" />

        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
