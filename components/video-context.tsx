"use client";

import * as React from "react";
import initialConfig from "@/content/videos-config.json";

export type VideoSlot = "socials" | "prototypes" | "experience" | "tools";

export interface VideoSlotInfo {
  slot: string;
  title: string;
  aspect: string;
  src: string;
}

export type VideosConfig = Record<string, VideoSlotInfo>;

interface VideoContextValue {
  config: VideosConfig;
  uploadVideo: (slot: VideoSlot, file: File) => Promise<{ success: boolean; src?: string; error?: string }>;
  refreshConfig: () => Promise<void>;
}

const VideoContext = React.createContext<VideoContextValue | null>(null);

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = React.useState<VideosConfig>(initialConfig as VideosConfig);

  const refreshConfig = React.useCallback(async () => {
    try {
      const res = await fetch("/api/upload-video");
      if (res.ok) {
        const data = await res.json();
        if (data.config) {
          setConfig(data.config);
        }
      }
    } catch {
      // fallback to current state
    }
  }, []);

  React.useEffect(() => {
    refreshConfig();
  }, [refreshConfig]);

  const uploadVideo = React.useCallback(
    async (slot: VideoSlot, file: File) => {
      try {
        const formData = new FormData();
        formData.append("slot", slot);
        formData.append("file", file);

        const res = await fetch("/api/upload-video", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setConfig(data.config);
          return { success: true, src: data.src };
        } else {
          return { success: false, error: data.error || "Upload failed" };
        }
      } catch (err: any) {
        return { success: false, error: err.message || "Network error" };
      }
    },
    []
  );

  return (
    <VideoContext.Provider value={{ config, uploadVideo, refreshConfig }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideos() {
  const ctx = React.useContext(VideoContext);
  if (!ctx) {
    // Fallback if rendered outside provider
    return {
      config: initialConfig as VideosConfig,
      uploadVideo: async () => ({ success: false, error: "No provider" }),
      refreshConfig: async () => {},
    };
  }
  return ctx;
}
