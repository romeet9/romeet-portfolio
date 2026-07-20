import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * The identity bar, styled to match the bottom FloatingDock: it floats away from
 * the top edge with a gap, is constrained to the same max-width and gutters as
 * the page content, and wears the dock's border / translucent blur / shadow.
 *
 * `sticky top-0` with `pt-4` keeps a constant gap above the pill — initially and
 * while it's stuck — and the TopScrim behind it dissolves content that scrolls
 * up underneath, the same way BottomScrim does for the dock.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 lg:px-6">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2 rounded-full border bg-background/80 py-2 pr-2 pl-3 shadow-lg shadow-black/10 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 lg:gap-3 dark:shadow-black/40">
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
          {/* h-7 + rounded-full so the label is the same height and pill shape
              as the "Hire me" CTA next to it. */}
          <Badge
            variant="outline"
            className="hidden h-7 gap-1.5 rounded-full px-3 text-muted-foreground sm:flex"
          >
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Available for roles
          </Badge>
          <Button
            size="sm"
            className="rounded-full"
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
