import { OverviewBento } from "@/components/overview-bento";

export default function OverviewPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-4 py-4 md:py-6">
      {/* Hero temporarily disabled per request — the shimmering "AI Product
          Designer" heading, its "Design + build" badge, and the intro note.
          Restore this block (and the Badge + SparklesIcon imports) to bring it
          back. */}

      {/* All eight cards — four KPIs and four tall cards — interleaved as one
          masonry bento so nothing is orphaned and every card keeps its size. */}
      <OverviewBento />
    </div>
  );
}
