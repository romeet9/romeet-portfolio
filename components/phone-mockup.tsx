import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * An iPhone mockup: a rendered PNG (frame + screen baked in, transparent
 * outside). Defaults to the Edge CRM Add Case export; pass `src` to use a
 * different screen per slot.
 */
export function PhoneMockup({
  label = "App screen mockup",
  state,
  src = "/mockups/iphone-17.png",
  className,
}: {
  /** Accessible description of the screen. */
  label?: string;
  /** Small caption tag, e.g. "Before" / "After". */
  state?: string;
  /** Mockup image path. */
  src?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "mx-auto flex w-full max-w-[248px] flex-col items-center gap-3",
        className,
      )}
    >
      <Image
        src={src}
        alt={label}
        width={1350}
        height={2760}
        sizes="248px"
        className="h-auto w-full select-none drop-shadow-[0_16px_36px_rgba(0,0,0,0.20)] dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.14)]"
      />
      {state && (
        <figcaption className="rounded-full border bg-background px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
          {state}
        </figcaption>
      )}
    </figure>
  );
}
