import { CardCanvas } from "@/components/overview/card-canvas";
import { MediaCard } from "@/components/media-card";

/**
 * The third case study, still in progress. The frame, the ramp and the caption
 * are MediaCard's; what's specific here is the subject — soft rounded "glass"
 * plates receding in perspective, standing in for the Case Detail screen's
 * sections (header, tabs, timeline, attachments, actions) — and the status pill.
 */

// The plates, front to back. Each is dimmer and narrower than the one before it.
const PLATES = [
  "w-[76%] opacity-90",
  "w-[80%] opacity-75",
  "w-[84%] opacity-[0.55]",
  "w-[88%] opacity-40",
  "w-[92%] opacity-25",
  "w-[96%] opacity-[0.12]",
];

function Plates() {
  return (
    <div className="absolute inset-x-0 top-[14%] flex flex-col items-center gap-[3.5%] [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_92%)] [perspective:900px]">
      <div className="flex w-[78%] flex-col items-center gap-[6px] [transform:rotateX(16deg)_rotate(-3deg)] [transform-style:preserve-3d]">
        {PLATES.map((plate, i) => (
          <div
            key={i}
            className={`h-[26px] rounded-[7px] border border-white/[0.18] bg-gradient-to-b from-white/[0.14] to-white/[0.03] shadow-lg shadow-black/40 ${plate}`}
          />
        ))}
      </div>
    </div>
  );
}

function InProgressPill() {
  return (
    <div className="absolute top-5 right-5 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-2.5 py-1 backdrop-blur-md">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/70" />
        <span className="relative inline-flex size-1.5 rounded-full bg-white/90" />
      </span>
      <span className="text-[10px] font-medium tracking-[0.08em] text-white/70 uppercase">
        In progress
      </span>
    </div>
  );
}

export function ComingSoonCaseCard() {
  return (
    <MediaCard
      artwork={
        <CardCanvas>
          <Plates />
        </CardCanvas>
      }
      overlay={<InProgressPill />}
      eyebrow="12 Grids · 2026"
      title="Edge CRM — Case Detail"
      detail="The third screen. Deep case context: timeline, attachments and actions in one view. Currently in the works."
    />
  );
}
