"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isNavItemActive, navLinks, navMain } from "@/lib/nav";
import { cn } from "@/lib/utils";

// Every target is the same circle; only the ring marks the active one.
const dockButton =
  "relative size-10 rounded-full text-muted-foreground hover:text-foreground";

// The variant has to match the primitive's own `data-vertical:self-stretch` for
// cn() to merge it away — a bare `self-center` loses to the attribute selector's
// specificity. Stretch with an explicit height resolves to flex-start, which is
// what left the rule sitting 8px above the icons' centre line.
const dockSeparator = "mx-1 h-6 data-vertical:self-center";

/**
 * The site's only navigation: an icon dock floating at the bottom of the
 * viewport. On small screens the external links live inside the dock
 * itself — tapping the menu grows the pill upward into a rounded rectangle and
 * reveals them, rather than popping a separate panel on top of it.
 */
export function FloatingDock() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const dockRef = React.useRef<HTMLDivElement>(null);

  // Collapse on route change, outside tap, and Escape.
  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!dockRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <TooltipProvider delay={120}>
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 print:hidden"
      >
        <div
          ref={dockRef}
          className={cn(
            "flex flex-col rounded-[29px] border bg-background/80 p-2 shadow-lg shadow-black/10 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 dark:shadow-black/40"
          )}
        >
          {/* The radius is fixed, never animated. The closed dock is 58px tall,
              so 29px already reads as a perfect pill — and interpolating a
              pill's huge radius down to a rectangle's is what made the corners
              warp mid-open. Only the height moves. */}
          {/* The drawer that grows out of the dock. Animating grid-template-rows
              from 0fr to 1fr transitions to the content's real height — `height:
              auto` isn't animatable, and a fixed max-height would either clip or
              ease against dead space. */}
          <div
            id="dock-more"
            className={cn(
              "grid transition-all duration-300 ease-out sm:hidden",
              open
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col px-1 pb-1">
                {navLinks.map((item) => (
                  <a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={open ? undefined : -1}
                    className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <item.icon className="size-[18px]" />
                    {item.title}
                  </a>
                ))}

                <Separator className="mt-1" />
              </div>
            </div>
          </div>

          {/* The icon row — always the dock's bottom edge. */}
          <div className="flex items-center gap-1.5">
            {navMain.map((item) => {
              const active = isNavItemActive(item.url, pathname);
              return (
                <Tooltip key={item.title}>
                  <TooltipTrigger
                    render={
                      // A real <Link> wearing the button's classes — routing the
                      // anchor through the Button primitive suppresses navigation.
                      <Link
                        href={item.url}
                        aria-label={item.title}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon-lg" }),
                          dockButton,
                          active &&
                            "border-foreground/25 bg-muted text-foreground"
                        )}
                      >
                        <item.icon className="size-[18px]" />
                      </Link>
                    }
                  />
                  <TooltipContent>{item.title}</TooltipContent>
                </Tooltip>
              );
            })}

            <Separator orientation="vertical" className={dockSeparator} />

            {/* Desktop: the external links sit in the row itself. */}
            <div className="hidden items-center gap-1.5 sm:flex">
              {navLinks.map((item) => (
                <Tooltip key={item.title}>
                  <TooltipTrigger
                    render={
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.title}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon-lg" }),
                          dockButton
                        )}
                      >
                        <item.icon className="size-[18px]" />
                      </a>
                    }
                  />
                  <TooltipContent>{item.title}</TooltipContent>
                </Tooltip>
              ))}

            </div>

            {/* Mobile: grows the dock instead of opening anything on top of it. */}
            <Button
              variant="ghost"
              size="icon-lg"
              aria-label={open ? "Close menu" : "More"}
              aria-expanded={open}
              aria-controls="dock-more"
              onClick={() => setOpen((v) => !v)}
              className={cn(dockButton, "sm:hidden", open && "text-foreground")}
            >
              {open ? (
                <XIcon className="size-[18px]" />
              ) : (
                <MenuIcon className="size-[18px]" />
              )}
            </Button>
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
}
