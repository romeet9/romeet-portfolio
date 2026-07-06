"use client";

import * as React from "react";
import Link from "next/link";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  PencilRulerIcon,
  FolderIcon,
  ChartNoAxesColumnIcon,
  BriefcaseIcon,
  MailIcon,
  FileTextIcon,
  CodeIcon,
  Link2Icon,
  TerminalIcon,
} from "lucide-react";

const navMain = [
  { title: "Overview", url: "/", icon: LayoutDashboardIcon },
  { title: "Case studies", url: "/case-studies", icon: PencilRulerIcon },
  { title: "Projects", url: "/projects", icon: FolderIcon },
  { title: "Metrics", url: "/metrics", icon: ChartNoAxesColumnIcon },
  { title: "Experience", url: "/experience", icon: BriefcaseIcon },
  { title: "Contact", url: "/contact", icon: MailIcon },
];

const links = [
  { title: "Résumé", url: "/romeet-chatterjee-resume.pdf", icon: FileTextIcon },
  { title: "GitHub", url: "https://github.com/romeet9", icon: CodeIcon },
  { title: "LinkedIn", url: "https://linkedin.com/in/romeet-in", icon: Link2Icon },
];

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <TerminalIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  Romeet Chatterjee
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Portfolio · 2026
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Links</SidebarGroupLabel>
          <SidebarMenu>
            {links.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  render={
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
