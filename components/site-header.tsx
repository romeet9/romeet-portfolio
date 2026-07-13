import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-4 lg:gap-3 lg:px-6">
        {/* Identity — it used to live in the sidebar header. */}
        <Avatar className="size-8 rounded-lg">
          <AvatarImage src="/about/romeet.jpg" alt="Romeet Chatterjee" />
          <AvatarFallback className="rounded-lg">RC</AvatarFallback>
        </Avatar>
        <div className="grid text-sm leading-tight">
          <span className="truncate font-medium">Romeet Chatterjee</span>
          <span className="truncate text-xs text-muted-foreground">
            AI Product Designer
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Badge
            variant="outline"
            className="hidden gap-1.5 text-muted-foreground sm:flex"
          >
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Available for roles
          </Badge>
          <Button
            size="sm"
            nativeButton={false}
            render={<a href="mailto:chatterjeeromeet9@gmail.com" />}
          >
            Hire me
          </Button>
        </div>
      </div>
    </header>
  );
}
