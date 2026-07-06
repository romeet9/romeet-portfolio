"use client";

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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  EllipsisVerticalIcon,
  FileTextIcon,
  MailIcon,
  CodeIcon,
  Link2Icon,
} from "lucide-react";

export function NavUser() {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />
            }
          >
            <Avatar className="size-8 rounded-lg">
              <AvatarImage src="/about/romeet.jpg" alt="Romeet Chatterjee" />
              <AvatarFallback className="rounded-lg">RC</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Romeet Chatterjee</span>
              <span className="truncate text-xs text-muted-foreground">
                AI Product Designer
              </span>
            </div>
            <EllipsisVerticalIcon className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src="/about/romeet.jpg" alt="Romeet Chatterjee" />
                  <AvatarFallback className="rounded-lg">RC</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Romeet Chatterjee</span>
                  <span className="truncate text-xs text-muted-foreground">
                    chatterjeeromeet9@gmail.com
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                render={
                  <a
                    href="/romeet-chatterjee-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <FileTextIcon />
                Résumé
              </DropdownMenuItem>
              <DropdownMenuItem
                render={<a href="mailto:chatterjeeromeet9@gmail.com" />}
              >
                <MailIcon />
                Email
              </DropdownMenuItem>
              <DropdownMenuItem
                render={
                  <a
                    href="https://github.com/romeet9"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <CodeIcon />
                GitHub
              </DropdownMenuItem>
              <DropdownMenuItem
                render={
                  <a
                    href="https://linkedin.com/in/romeet-in"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <Link2Icon />
                LinkedIn
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
