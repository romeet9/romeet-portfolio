import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2 rounded-md p-1.5 group-data-[collapsible=icon]:p-0!">
          <Avatar className="size-8 rounded-lg">
            <AvatarImage src="/about/romeet.jpg" alt="Romeet Chatterjee" />
            <AvatarFallback className="rounded-lg">RC</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-medium">Romeet Chatterjee</span>
            <span className="truncate text-xs text-muted-foreground">
              AI Product Designer
            </span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
