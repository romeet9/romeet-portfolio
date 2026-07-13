"use client";

import { usePathname } from "next/navigation";

/**
 * Replays the page-enter animation on every route change. The pathname key
 * remounts the subtree, which is what restarts the CSS animation — without it
 * React reuses the nodes and nothing replays.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="flex flex-1 flex-col animate-page-enter">
      {children}
    </div>
  );
}
