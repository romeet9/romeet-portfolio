"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
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
  BriefcaseIcon,
  MailIcon,
  FileTextIcon,
  CodeIcon,
  Link2Icon,
} from "lucide-react";

const navMain = [
  { title: "Overview", url: "/", icon: LayoutDashboardIcon },
  { title: "Case studies", url: "/case-studies", icon: PencilRulerIcon },
  { title: "Vibe Coded Projects", url: "/projects", icon: FolderIcon },
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
        <NavUser />
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
    </Sidebar>
  );
}
