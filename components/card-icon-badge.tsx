import type { LucideIcon } from "lucide-react";

import { IconChip } from "@/components/icon-chip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * The dashboard KPI badge: the same square IconChip the case-study KPI cards
 * use, parked in the card's top-right. The text it replaced survives as the
 * tooltip and the accessible name, so the meaning is still reachable.
 */
export function CardIconBadge({
  icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <IconChip
            icon={icon}
            aria-label={label}
            className="transition-colors hover:bg-muted"
          />
        }
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
