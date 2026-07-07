"use client";

import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

const TITLES: Record<string, string> = {
  "/": "Overview",
  "/case-studies": "Case studies",
  "/projects": "Vibe Coded Projects",
  "/experience": "Experience",
  "/contact": "Contact",
};

function resolveTitle(pathname: string): string {
  if (pathname.startsWith("/case-studies/")) return "Case study";
  if (pathname.startsWith("/projects/")) return "Project detail";
  return TITLES[pathname] ?? "Overview";
}

export function SiteHeader() {
  const pathname = usePathname();
  const title = resolveTitle(pathname);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        <h1 className="text-base font-medium">{title}</h1>

        <div className="ml-auto flex items-center gap-2">
          <Badge
            variant="outline"
            className="hidden gap-1.5 text-muted-foreground sm:flex"
          >
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Available for roles
          </Badge>
          <ModeToggle />
          <Button
            size="sm"
            nativeButton={false} render={<a href="mailto:chatterjeeromeet9@gmail.com" />}
          >
            Hire me
          </Button>
        </div>
      </div>
    </header>
  );
}
