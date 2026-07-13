import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * A small square icon tile — the accent that gives each card its identity.
 * Shared by the case-study KPI cards and the dashboard's, so the two read as
 * the same component rather than two takes on the same idea.
 */
export function IconChip({
  icon: Icon,
  className,
  iconClassName,
  ...props
}: {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
} & React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-lg border bg-muted/50 text-foreground shadow-xs",
        className,
      )}
      {...props}
    >
      <Icon className={cn("size-4", iconClassName)} />
    </span>
  );
}
