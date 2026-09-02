import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "content", "videos-config.json");
const VIDEOS_DIR = path.join(process.cwd(), "public", "videos");

async function getConfig() {
  try {
    const data = await fs.readFile(CONFIG_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return {
      socials: { slot: "socials", title: "Socials", aspect: "aspect-[406/296]", src: "" },
      prototypes: { slot: "prototypes", title: "Next.js & SwiftUI", aspect: "aspect-[406/296]", src: "" },
      experience: { slot: "experience", title: "Experience", aspect: "aspect-square", src: "/videos/animo-focus-slider-720p.webm" },
      tools: { slot: "tools", title: "Most used Tools", aspect: "aspect-square", src: "" },
    };
  }
}

export async function GET() {
  const config = await getConfig();
  return NextResponse.json({ config });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const slot = formData.get("slot") as string;
    const file = formData.get("file") as File;

    if (!slot || !file) {
      return NextResponse.json({ error: "Missing slot or file" }, { status: 400 });
    }

    await fs.mkdir(VIDEOS_DIR, { recursive: true });

    // Determine extension from file name
    const ext = path.extname(file.name) || ".webm";
    const filename = `${slot}${ext}`;
    const filePath = path.join(VIDEOS_DIR, filename);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    const config = await getConfig();
    const src = `/videos/${filename}?t=${Date.now()}`;

    if (config[slot]) {
      config[slot].src = src;
    } else {
      config[slot] = {
        slot,
        title: slot,
        aspect: slot === "socials" || slot === "prototypes" ? "aspect-[406/296]" : "aspect-square",
        src,
      };
    }

    await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");

    return NextResponse.json({ success: true, slot, src, config });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to upload video" }, { status: 500 });
  }
}
