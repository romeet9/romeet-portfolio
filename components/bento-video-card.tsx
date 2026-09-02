"use client";

import * as React from "react";
import { useVideos, VideoSlot } from "@/components/video-context";

interface BentoVideoCardProps {
  slot: VideoSlot;
  defaultSrc?: string;
  title: string;
  badgeLabel?: string;
  aspectClass: string;
}

export function BentoVideoCard({
  slot,
  defaultSrc = "",
  title,
  badgeLabel,
  aspectClass,
}: BentoVideoCardProps) {
  const { config, uploadVideo } = useVideos();
  const slotData = config[slot];
  const videoSrc = slotData?.src || defaultSrc;
  const isDev = process.env.NODE_ENV === "development";

  const [isDragging, setIsDragging] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const displayLabel = badgeLabel || title;

  const handleDrop = async (e: React.DragEvent) => {
    if (!isDev) return;
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type.startsWith("video/") || file.name.endsWith(".webm") || file.name.endsWith(".mp4"))) {
      setIsUploading(true);
      await uploadVideo(slot, file);
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      await uploadVideo(slot, file);
      setIsUploading(false);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        if (!isDev) return;
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`group [font-synthesis:none] wrap-anywhere flex items-center rounded-[27px] p-1 self-stretch bg-[#232323] border border-solid transition-all duration-300 antialiased text-xs/4 ${
        isDragging ? "border-purple-500 scale-[1.01]" : "border-[#383838] hover:border-white/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
      }`}
    >
      <div
        className={`relative w-full ${aspectClass} overflow-hidden rounded-[22px] bg-[#131313] border border-solid border-[#FFFFFF1A] flex items-center justify-center`}
      >
        {isDev && (
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,.webm,.mp4,.mov"
            className="hidden"
            onChange={handleFileChange}
          />
        )}

        {/* Fixed top-right project label & dev replace button */}
        <button
          type="button"
          onClick={() => isDev && fileInputRef.current?.click()}
          className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-white/90 text-[11px] font-medium shadow-lg transition-all ${
            isDev ? "cursor-pointer hover:bg-black/90 hover:border-white/40 hover:scale-105" : "cursor-default"
          }`}
          title={isDev ? `Click to replace video for "${displayLabel}"` : displayLabel}
        >
          <div className="size-1.5 rounded-full bg-white/60 shrink-0" />
          <span>{displayLabel}</span>
        </button>

        {videoSrc ? (
          <video
            key={videoSrc}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover rounded-[22px]"
          />
        ) : (
          <div
            onClick={() => isDev && fileInputRef.current?.click()}
            className="cursor-pointer h-full w-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#1a1a1a] to-[#121212] hover:from-[#222] hover:to-[#171717] transition-colors rounded-[22px]"
          >
            <div className="size-10 rounded-full bg-white/10 flex items-center justify-center mb-3 text-white/70 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <div className="font-['Instrument_Sans',system-ui,sans-serif] text-white text-[15px] font-medium mb-1">
              {displayLabel}
            </div>
            <div className="font-['Instrument_Sans',system-ui,sans-serif] text-white/50 text-[12px]">
              {isUploading ? "Uploading video..." : "Click or drag & drop video"}
            </div>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center z-20 gap-2">
            <div className="size-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <span className="text-white text-xs font-medium">Uploading video...</span>
          </div>
        )}
      </div>
    </div>
  );
}
