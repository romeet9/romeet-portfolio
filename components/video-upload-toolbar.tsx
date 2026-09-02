"use client";

import * as React from "react";
import { useVideos, VideoSlot } from "@/components/video-context";
import { useLayout } from "@/components/layout-context";

const SLOTS: { key: VideoSlot; label: string; aspect: string }[] = [
  { key: "socials", label: "Social media post", aspect: "Square" },
  { key: "prototypes", label: "Brand design for Go-sats", aspect: "Square" },
  { key: "experience", label: "GPACTS", aspect: "406/461" },
  { key: "tools", label: "Vote IN", aspect: "406/461" },
];

export function VideoUploadToolbar() {
  const { config, uploadVideo } = useVideos();
  const { isRearrangeMode, setIsRearrangeMode, saveLayout, resetLayout, isSaving } = useLayout();
  const [isOpen, setIsOpen] = React.useState(true);
  const [uploadingSlot, setUploadingSlot] = React.useState<string | null>(null);
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);

  const fileInputs = React.useRef<Record<string, HTMLInputElement | null>>({});

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const handleUpload = async (slot: VideoSlot, file: File) => {
    setUploadingSlot(slot);
    setStatusMessage(`Uploading video for ${slot}...`);
    const res = await uploadVideo(slot, file);
    setUploadingSlot(null);
    if (res.success) {
      setStatusMessage(`✓ ${slot} video updated!`);
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage(`✕ Error: ${res.error || "Upload failed"}`);
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  const handleSaveLayout = async () => {
    const success = await saveLayout();
    if (success) {
      setStatusMessage("✓ Card layout saved!");
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage("✕ Failed to save layout");
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const handleResetLayout = async () => {
    if (confirm("Reset card layout to default?")) {
      await resetLayout();
      setStatusMessage("✓ Layout reset to default");
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-3xl font-['Instrument_Sans',system-ui,sans-serif]">
      <div className="bg-[#181818]/95 border border-white/15 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300">
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#222222]/60 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white text-xs font-semibold tracking-wide uppercase">
              Dev Suite
            </span>
            {statusMessage && (
              <span className="text-[11px] text-purple-300 ml-2 animate-fade-in bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                {statusMessage}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Rearrange Mode Toggle */}
            <button
              onClick={() => setIsRearrangeMode(!isRearrangeMode)}
              className={`text-xs font-medium px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                isRearrangeMode
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-900/40"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="5 9 2 12 5 15" />
                <polyline points="9 5 12 2 15 5" />
                <polyline points="15 19 12 22 9 19" />
                <polyline points="19 9 22 12 19 15" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="12" y1="2" x2="12" y2="22" />
              </svg>
              <span>{isRearrangeMode ? "Rearrange: ON" : "Rearrange Cards"}</span>
            </button>

            {isRearrangeMode && (
              <>
                <button
                  disabled={isSaving}
                  onClick={handleSaveLayout}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 shadow-md"
                >
                  <span>{isSaving ? "Saving..." : "Save Order"}</span>
                </button>
                <button
                  onClick={handleResetLayout}
                  className="bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-xs font-medium px-2 py-1 rounded-lg transition-colors"
                  title="Reset to default order"
                >
                  Reset
                </button>
              </>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/60 hover:text-white text-xs font-medium px-2 py-1 rounded-md hover:bg-white/10 transition-colors flex items-center gap-1 ml-1"
            >
              <span>{isOpen ? "Hide" : "Expand"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Expandable video slots grid */}
        {isOpen && (
          <div className="p-3 bg-[#141414]/90">
            {isRearrangeMode && (
              <div className="mb-2 text-[11px] text-purple-300/80 bg-purple-950/30 px-3 py-1.5 rounded-lg border border-purple-800/30 flex items-center gap-2">
                <span>💡</span>
                <span>
                  <strong>Drag & drop cards</strong> directly across columns or use the overlay arrow controls (◀ ▲ ▼ ▶) on each card. Click <strong>Save Order</strong> when done.
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {SLOTS.map((s) => {
                const currentSrc = config[s.key]?.src;
                const hasVideo = !!currentSrc;
                const isCurrentUploading = uploadingSlot === s.key;

                return (
                  <div
                    key={s.key}
                    className="bg-[#202020] border border-white/10 rounded-xl p-2.5 flex flex-col justify-between gap-2 transition-all hover:border-white/20"
                  >
                    <input
                      type="file"
                      accept="video/*,.webm,.mp4,.mov"
                      ref={(el) => {
                        fileInputs.current[s.key] = el;
                      }}
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleUpload(s.key, f);
                      }}
                    />

                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-white text-xs font-medium truncate">
                          {s.label}
                        </span>
                        <span className="text-[10px] text-white/40 uppercase font-mono">
                          {s.aspect}
                        </span>
                      </div>
                      <div className="text-[11px] flex items-center gap-1.5 text-white/50">
                        <div
                          className={`size-1.5 rounded-full ${
                            hasVideo ? "bg-emerald-400" : "bg-amber-400"
                          }`}
                        />
                        <span className="truncate">
                          {hasVideo ? (currentSrc.split("/").pop()?.split("?")[0] || "Loaded") : "No video"}
                        </span>
                      </div>
                    </div>

                    <button
                      disabled={isCurrentUploading}
                      onClick={() => fileInputs.current[s.key]?.click()}
                      className={`w-full py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                        hasVideo
                          ? "bg-white/10 hover:bg-white/20 text-white"
                          : "bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-900/30"
                      } ${isCurrentUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {isCurrentUploading ? (
                        <div className="size-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      )}
                      <span>{hasVideo ? "Replace Video" : "Upload Video"}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
